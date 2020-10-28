import { delay } from 'openland-y-utils/timer';
import { AsyncLock } from '@openland/patterns';
import { KeyValueStore } from 'openland-y-utils/KeyValueStore';

class TransactionHolder {
    private persistence: Persistence;
    private completed = false;
    private writes = new Map<string, string | null>();

    constructor(persistence: Persistence) {
        this.persistence = persistence;
    }

    write(key: string, value: string | null) {
        if (this.completed) {
            throw Error('Transaction already completed');
        }
        this.writes.set(key, value);
    }

    read = async (key: string): Promise<string | null> => {
        if (this.completed) {
            throw Error('Transaction already completed');
        }
        let ex = this.writes.get(key);
        if (ex !== undefined) {
            return ex;
        }
        let r = await this.persistence.read(key);
        if (this.completed) {
            throw Error('Transaction already completed');
        }
        return r;
    }

    complete() {
        if (this.completed) {
            throw Error('Transaction already completed');
        }
        this.completed = true;
        let res: { key: string, value: string | null }[] = [];
        for (let e of this.writes.entries()) {
            res.push({ key: e[0], value: e[1] });
        }
        return res;
    }
}

export class Transaction {
    private holder: TransactionHolder;

    constructor(holder: TransactionHolder) {
        this.holder = holder;
    }

    write = (key: string, value: string | null) => {
        this.holder.write(key, value);
    }

    writeBoolean(key: string, value: boolean) {
        this.write(key, value ? 'true' : 'false');
    }

    writeInt(key: string, value: number) {
        if (!Number.isSafeInteger(value)) {
            throw Error('Value is not integer');
        }
        this.write(key, value.toString());
    }

    writeJson(key: string, value: any) {
        this.write(key, JSON.stringify(value));
    }

    read = (key: string): Promise<string | null> => {
        return this.holder.read(key);
    }

    async readBoolean(key: string): Promise<boolean | null> {
        let res = await this.read(key);
        if (res === null) {
            return null;
        } else if (res === 'true') {
            return true;
        } else {
            return false;
        }
    }

    async readInt(key: string): Promise<number | null> {
        let res = await this.read(key);
        if (res === null) {
            return null;
        } else {
            return Number.parseInt(res, 10);
        }
    }

    async readJson<T extends {} = {}>(key: string): Promise<T | null> {
        let res = await this.read(key);
        if (res === null) {
            return null;
        } else {
            return JSON.parse(res) as T;
        }
    }
}

export class Persistence {
    private store: KeyValueStore;

    private readRequested = false;
    private readRequests = new Map<string, ((value: string | null) => void)[]>();
    private readLock = new AsyncLock();

    private writeLock = new AsyncLock();

    constructor(store: KeyValueStore) {
        this.store = store;
    }

    async read(key: string): Promise<string | null> {
        return new Promise<string | null>(resolve => {
            let ex = this.readRequests.get(key);
            if (ex) {
                ex.push(resolve);
            } else {
                this.readRequests.set(key, [resolve]);
            }
            this.requestReadIfNeeded();
        });
    }

    async readBoolean(key: string): Promise<boolean | null> {
        let res = await this.read(key);
        if (res === null) {
            return null;
        } else if (res === 'true') {
            return true;
        } else {
            return false;
        }
    }

    async readInt(key: string): Promise<number | null> {
        let res = await this.read(key);
        if (res === null) {
            return null;
        } else {
            return Number.parseInt(res, 10);
        }
    }

    async readJson<T extends {} = {}>(key: string): Promise<T | null> {
        let res = await this.read(key);
        if (res === null) {
            return null;
        } else {
            return JSON.parse(res) as T;
        }
    }

    private requestReadIfNeeded() {
        if (this.readRequested) {
            return;
        }
        if (this.readRequests.size === 0) {
            return;
        }
        this.readRequested = true;
        (async () => {
            await delay(10);
            let keys = [...this.readRequests.keys()];
            let values = await this.readLock.inLock(() => this.store.readKeys(keys));
            for (let i = 0; i < keys.length; i++) {
                let v = values[i];
                let callbacks = this.readRequests.get(v.key)!;
                this.readRequests.delete(v.key);
                for (let c of callbacks) {
                    try {
                        c(v.value);
                    } catch (e) {
                        console.warn(e);
                    }
                }
            }
            this.readRequested = false;
            this.requestReadIfNeeded();
        })();
    }

    async inTx<T>(handler: (tx: Transaction) => Promise<T>) {
        return await this.writeLock.inLock(async () => {
            let holder = new TransactionHolder(this);
            let tx = new Transaction(holder);
            let res = await handler(tx);
            let completed = holder.complete();
            if (completed.length > 0) {
                await this.readLock.inLock(() => this.store.writeKeys(completed));
            }
            return res;
        });
    }
}