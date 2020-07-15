import { PersistenceProvider } from './PersistenceProvider';
import { AsyncLock } from '@openland/patterns';

class Transaction {
    private completed = false;
    private keys = new Map<string, string | null>();

    write(key: string, value: string | null) {
        if (this.completed) {
            throw Error('Transaction already completed');
        }
        this.keys.set(key, value);
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
        return res;
    }
}

export class Persistence {
    private persistence: PersistenceProvider;
    private transaction: Transaction | null = null;
    private lock = new AsyncLock();

    constructor(persistence: PersistenceProvider) {
        this.persistence = persistence;
    }

    readKey = async (key: string): Promise<string | null> => {
        let res = await this.lock.inLock(() => this.persistence.readKeys([key]));
        return res[0];
    }

    startTransaction = () => {
        if (this.transaction) {
            throw Error('Transaction already started');
        }
        this.transaction = new Transaction();
    }

    write(key: string, value: string | null) {
        if (!this.transaction) {
            throw Error('Transaction is not started');
        }
        this.transaction.write(key, value);
    }

    commitTransaction = async () => {
        if (!this.transaction) {
            throw Error('Transaction is not started');
        }
        let completed = this.transaction.complete();
        this.transaction = null;
        if (completed.length > 0) {
            this.lock.inLock(() => this.persistence.writeKeys(completed));
        }
    }
}