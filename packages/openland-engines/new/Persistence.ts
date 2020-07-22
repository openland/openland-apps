import { PersistenceProvider } from './PersistenceProvider';
import { AsyncLock } from '@openland/patterns';

class TransactionHolder {
    private completed = false;
    private keys = new Map<string, string | null>();
    private persistence: Persistence;
    private handlers: (() => void)[] = [];

    constructor(persistence: Persistence) {
        this.persistence = persistence;
    }

    afterTransaction(handler: () => void) {
        if (this.completed) {
            throw Error('Transaction already completed');
        }
        this.handlers.push(handler);
    }

    write = (key: string, value: string | null) => {
        if (this.completed) {
            throw Error('Transaction already completed');
        }
        this.keys.set(key, value);
    }

    read = async (key: string): Promise<string | null> => {
        if (this.keys.has(key)) {
            return this.keys.get(key)!;
        }
        return this.persistence.readKey(key);
    }

    cancel() {
        if (this.completed) {
            throw Error('Transaction already completed');
        }
        this.completed = true;
        this.keys.clear();
    }

    complete() {
        if (this.completed) {
            throw Error('Transaction already completed');
        }
        this.completed = true;
        let res: { key: string, value: string | null }[] = [];
        for (let e of this.keys.entries()) {
            res.push({ key: e[0], value: e[1] });
        }
        return { changes: res, handlers: [...this.handlers] };
    }
}

export interface Transaction {
    write(key: string, value: string | null): void;
    read(key: string): Promise<string | null>;
    afterTransaction(handler: () => void): void;
}

export class Persistence {
    private persistence: PersistenceProvider;
    private transaction: TransactionHolder | null = null;
    private lock = new AsyncLock();
    private txLock = new AsyncLock();

    constructor(persistence: PersistenceProvider) {
        this.persistence = persistence;
    }

    readKey = async (key: string): Promise<string | null> => {
        let res = await this.lock.inLock(() => this.persistence.readKeys([key]));
        return res[0];
    }

    async inTx<T>(handler: (handler: Transaction) => Promise<T>): Promise<T> {
        return await this.txLock.inLock(async () => {
            if (this.transaction) {
                throw Error('Transaction already started');
            }
            let holder = new TransactionHolder(this);
            this.transaction = holder;
            try {
                let res = await handler(holder);
                let completed = this.transaction.complete();
                this.transaction = null;
                if (completed.changes.length > 0) {
                    await this.lock.inLock(() => this.persistence.writeKeys(completed.changes));
                }
                for (let h of completed.handlers) {
                    h();
                }
                return res;
            } finally {
                // Cancel transaction
                this.transaction = null;
            }
        });
    }
}