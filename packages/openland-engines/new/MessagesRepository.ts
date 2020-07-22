import { Persistence, Transaction } from './Persistence';
import { StoredMessage } from './StoredMessage';
import { SparseIndex } from './SparseIndex';
import { AsyncLock } from '@openland/patterns';

export class MessagesRepository {

    static open(id: string, persistence: Persistence) {
        return new MessagesRepository(id, persistence);
    }

    readonly id: string;
    readonly persistence: Persistence;

    private _index!: SparseIndex;
    private _values = new Map<string, StoredMessage>();
    private _deleted = new Set<string>();

    private constructor(id: string, persistence: Persistence) {
        this.id = id;
        this.persistence = persistence;
    }

    writeBatch = async (args: {
        minSeq: number | null,
        maxSeq: number | null,
        messages: StoredMessage[]
    }, tx: Transaction) => {
        await this.loadIndexIfNeeded(tx);

        // Update cache
        for (let i of args.messages.filter((v) => !this._values.has(v.id))) {
            // Load not loaded values
            if (!this._values.has(i.id)) {
                let existing = await this.persistence.readKey('chat.' + this.id + '.msg.' + i.id);
                if (existing) {
                    this._values.set(i.id, JSON.parse(existing));
                }
            }

            // Apply values if not exist already
            if (!this._values.has(i.id)) {
                this._values.set(i.id, i);
                tx.write('chat.' + this.id + '.msg.' + i.id, JSON.stringify(i));
            }
        }

        // Apply to index
        let filtered = args.messages.filter((v) => !this._index.isInIndex(v.id) && !this._deleted.has(v.id));
        this._index.apply({
            min: args.minSeq !== null ? args.minSeq : SparseIndex.MIN,
            max: args.maxSeq !== null ? args.maxSeq : SparseIndex.MAX,
            items: filtered.map((v) => ({ id: v.id, sortKey: v.seq }))
        });
        tx.write('chat.' + this.id + '.index', JSON.stringify(this._index.state));
    }

    handleMessageReceived = async (message: StoredMessage, tx: Transaction) => {
        await this.loadIndexIfNeeded(tx);

        this._values.set(message.id, message);
        tx.write('chat.' + this.id + '.msg.' + message.id, JSON.stringify(message));

        // Persist to index
        if (!this._index.isInIndex(message.id) && !this._deleted.has(message.id)) {
            this._index.apply({ min: message.seq, max: SparseIndex.MAX, items: [{ id: message.id, sortKey: message.seq }] });
            tx.write('chat.' + this.id + '.index', JSON.stringify(this._index.state));
        }
    }

    handleMessageUpdated = async (message: StoredMessage, tx: Transaction) => {
        await this.loadIndexIfNeeded(tx);

        if (!this._deleted.has(message.id)) {
            this._values.set(message.id, message);
            tx.write('chat.' + this.id + '.msg.' + message.id, JSON.stringify(message));
        }
    }

    handleMessageDeleted = async (id: string, tx: Transaction) => {
        await this.loadIndexIfNeeded(tx);

        if (!this._deleted.has(id)) {
            this._deleted.add(id);
            if (this._index.isInIndex(id)) {
                this._index.delete([id]);
                tx.write('chat.' + this.id + '.index', JSON.stringify(this._index.state));
            }
        }
    }

    //
    // Read Operations
    //

    readAfter = async (args: { after: number, limit: number }, tx: Transaction) => {
        await this.loadIndexIfNeeded(tx);

        let after = this._index.readAfter({ after: args.after, limit: args.limit });
        if (!after) {
            return null;
        } else {

            // Load not loaded values
            for (let i of after.items) {
                if (!this._values.has(i.id)) {
                    let existing = await tx.read('chat.' + this.id + '.msg.' + i.id);
                    if (existing) {
                        this._values.set(i.id, JSON.parse(existing));
                    } else {
                        throw Error('Internal error');
                    }
                }
            }

            return {
                items: after.items.map((v) => this._values.get(v.id)!),
                completed: after.completed
            };
        }
    }

    readBySeq = async (seq: number, tx: Transaction) => {
        await this.loadIndexIfNeeded(tx);

        let id = this._index.getIdBySortKey(seq);
        if (!id) {
            return null;
        }
        if (!this._values.has(id)) {
            let existing = await this.persistence.readKey('chat.' + this.id + '.msg.' + id);
            if (existing) {
                this._values.set(id, JSON.parse(existing));
            } else {
                throw Error('Internal error');
            }
        }
        return this._values.get(id)!;
    }

    readById = async (id: string, tx: Transaction) => {
        await this.loadIndexIfNeeded(tx);

        if (!this._index.isInIndex(id)) {
            return null;
        }
        if (!this._values.has(id)) {
            let existing = await this.persistence.readKey('chat.' + this.id + '.msg.' + id);
            if (existing) {
                this._values.set(id, JSON.parse(existing));
            } else {
                throw Error('Internal error');
            }
        }
        return this._values.get(id)!;
    }

    readBefore = async (args: { before: number, limit: number }, tx: Transaction) => {
        await this.loadIndexIfNeeded(tx);

        let after = this._index.readBefore({ before: args.before, limit: args.limit });
        if (!after) {
            return null;
        } else {

            // Load not loaded values
            for (let i of after.items) {
                if (!this._values.has(i.id)) {
                    let existing = await this.persistence.readKey('chat.' + this.id + '.msg.' + i.id);
                    if (existing) {
                        this._values.set(i.id, JSON.parse(existing));
                    } else {
                        throw Error('Internal error');
                    }
                }
            }

            return {
                items: after.items.map((v) => this._values.get(v.id)!),
                completed: after.completed
            };
        }
    }

    private loadIndexIfNeeded = async (tx: Transaction) => {
        if (!this._index) {
            let state = SparseIndex.EMPTY;
            let persistedState = await this.persistence.readKey('chat.' + this.id + '.index');
            if (persistedState) {
                state = JSON.parse(persistedState);
            }
            this._index = new SparseIndex(state);
        }
    }
}