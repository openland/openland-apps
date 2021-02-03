import { delay } from 'openland-y-utils/timer';
import { AsyncLock } from '@openland/patterns';
import { KeyValueStore } from 'openland-y-utils/KeyValueStore';

class PersistenceCache {
    private cache = new Map<string, any | null>();

    write(key: string, value: any | null) {
        this.cache.set(key, value);
    }
    read(key: string): any | null | undefined {
        if (this.cache.has(key)) {
            return this.cache.get(key)!;
        } else {
            return undefined;
        }
    }
}

class TransactionHolder {
    readonly persistence: Persistence;
    readonly cache: PersistenceCache;
    private completed = false;
    private writes = new Map<string, any | null>();
    private prewarmedKeys = new Set<string>();
    private doRead: (key: string) => Promise<any | null>;

    constructor(persistence: Persistence, cache: PersistenceCache, read: (key: string) => Promise<any | null>) {
        this.persistence = persistence;
        this.cache = cache;
        this.doRead = read;
    }

    write(key: string, value: any | null) {
        if (this.completed) {
            throw Error('Transaction already completed');
        }
        this.writes.set(key, value);
        this.cache.write(key, value);
    }

    read = async (key: string): Promise<any | null> => {
        if (this.completed) {
            throw Error('Transaction already completed');
        }

        // Check cache
        let ex = this.cache.read(key);
        if (ex !== undefined) {
            return ex;
        }

        // Read from persistence
        let r = await this.doRead(key);
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
            res.push({ key: e[0], value: e[1] !== null ? JSON.stringify(e[1]) : null });
        }
        return res;
    }
}

export class Transaction {
    private holder: TransactionHolder;

    get persistence() {
        return this.holder.persistence;
    }

    constructor(holder: TransactionHolder) {
        this.holder = holder;
    }

    //
    // Writes
    //

    writeString = (key: string, value: string | null) => {
        this.holder.write(key, value);
    }

    writeBoolean = (key: string, value: boolean) => {
        this.holder.write(key, value);
    }

    writeInt = (key: string, value: number) => {
        if (!Number.isSafeInteger(value)) {
            throw Error('Value is not integer');
        }
        this.holder.write(key, value);
    }

    writeJson = (key: string, value: any) => {
        this.holder.write(key, value);
    }

    clear = (key: string) => {
        this.holder.write(key, null);
    }

    //
    // Reads
    //

    readString = async (key: string): Promise<string | null> => {
        let res = await this.holder.read(key);
        if (res !== null) {
            if (typeof res !== 'string') {
                return null;
            } else {
                return res;
            }
        } else {
            return null;
        }
    }

    readBoolean = async (key: string): Promise<boolean | null> => {
        let res = await this.holder.read(key);
        if (res === null) {
            return null;
        } else if (res === 'true') {
            return true;
        } else {
            return false;
        }
    }

    readInt = async (key: string): Promise<number | null> => {
        let res = await this.holder.read(key);
        if (res === null) {
            return null;
        } else {
            if (typeof res !== 'number') {
                return null;
            } else {
                return res;
            }
        }
    }

    readJson = async <T extends {} = {}>(key: string): Promise<T | null> => {
        let res = await this.holder.read(key);
        if (res === null) {
            return null;
        } else {
            return res as T;
        }
    }
}

export class Persistence {
    private store: KeyValueStore;

    private cache = new PersistenceCache();
    private readRequested = false;
    private readRequests = new Map<string, ((value: any | null) => void)[]>();
    private readLock = new AsyncLock();
    private writeLock = new AsyncLock();

    constructor(store: KeyValueStore) {
        this.store = store;
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
            // await delay(10);
            let keys = [...this.readRequests.keys()];
            let values = await this.readLock.inLock(() => this.store.readKeys(keys));
            for (let i = 0; i < keys.length; i++) {
                let v = values[i];
                let callbacks = this.readRequests.get(v.key)!;
                this.readRequests.delete(v.key);
                this.cache.write(v.key, v.value ? JSON.parse(v.value) : null);

                for (let c of callbacks) {
                    try {
                        c(v.value ? JSON.parse(v.value) : null);
                    } catch (e) {
                        console.warn(e);
                    }
                }
            }
            this.readRequested = false;
            this.requestReadIfNeeded();
        })();
    }

    private read = (key: string): Promise<any | null> => {
        return new Promise<any | null>(resolve => {
            let ex = this.readRequests.get(key);
            if (ex) {
                ex.push(resolve);
            } else {
                this.readRequests.set(key, [resolve]);
            }
            this.requestReadIfNeeded();
        });
    }

    async inTx<T>(handler: (tx: Transaction) => Promise<T>) {
        return await this.writeLock.inLock(async () => {
            let holder = new TransactionHolder(this, this.cache, this.read);
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