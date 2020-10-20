import { PersistenceProvider } from './PersistenceProvider';
import { AsyncLock } from '@openland/patterns';

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

    read = (key: string): Promise<string | null> => {
        return this.holder.read(key);
    }
}

export class Persistence {
    private persistence: PersistenceProvider;
    private lock = new AsyncLock();
    private writeLock = new AsyncLock();

    constructor(persistence: PersistenceProvider) {
        this.persistence = persistence;
    }

    read = async (key: string): Promise<string | null> => {
        let res = await this.lock.inLock(() => this.persistence.readKeys([key]));
        return res[0];
    }

    inTx = async <T>(handler: (tx: Transaction) => Promise<T>) => {
        return await this.writeLock.inLock(async () => {
            let holder = new TransactionHolder(this);
            let tx = new Transaction(holder);
            let res = await handler(tx);
            let completed = holder.complete();
            if (completed.length > 0) {
                await this.lock.inLock(() => this.persistence.writeKeys(completed));
            }
            return res;
        });
    }
}