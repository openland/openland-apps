import { StoredMessage } from './StoredMessage';
import { backoff } from 'openland-y-utils/timer';
import { randomKey } from 'openland-y-utils/randomKey';
import { MessagesApi } from './MessagesApi';
import { Persistence } from './Persistence';
import { MessagesRepository } from './MessagesRepository';
import { AsyncLock } from '@openland/patterns';

export type MessagesState =
    | { type: 'loading' }
    | { type: 'no-access' }
    | { type: 'messages', messages: StoredMessage[], hasMoreNext: boolean, hasMorePrev: boolean };

export interface MessagesSource {
    readonly state: MessagesState;
    readonly closed: boolean;
    onUpdated: ((state: MessagesState) => void) | undefined;
    close(): void;
}

class MessageSourceHolder implements MessagesSource {

    readonly id: string;
    onUpdated: ((state: MessagesState) => void) | undefined = undefined;

    private _state: MessagesState;
    private _onClose: () => void;
    private _closed = false;
    private _inited = false;
    private _minSeq = -1;
    private _maxSeq = -1;

    constructor(id: string, state: MessagesState, onClose: () => void) {
        this.id = id;
        this._state = state;
        this._onClose = onClose;
    }

    get state() {
        return this._state;
    }

    get closed() {
        return this._closed;
    }

    get minSeq() {
        return this._minSeq;
    }

    get maxSeq() {
        return this._maxSeq;
    }

    init(state: MessagesState, minSeq: number, maxSeq: number) {
        if (this._closed) {
            return;
        }
        if (this._inited) {
            return;
        }
        this._inited = true;
        this._minSeq = minSeq;
        this._maxSeq = maxSeq;
        this._state = state;
        if (this.onUpdated) {
            this.onUpdated(state);
        }
    }

    abort(state: MessagesState) {
        if (this._closed) {
            return;
        }
        this._state = state;
        if (this.onUpdated) {
            this.onUpdated(state);
        }
        this.close();
    }

    close() {
        if (this._closed) {
            return;
        }
        this._closed = true;
        this._onClose();
    }
}

export class MessagesStore {

    static open(id: string, persistence: Persistence, api: MessagesApi) {
        let repo = MessagesRepository.open(id, persistence);
        return new MessagesStore(repo, persistence, api);
    }

    // @ts-ignore
    private readonly repo: MessagesRepository;
    // @ts-ignore
    private readonly persistence: Persistence;
    // @ts-ignore
    private readonly api: MessagesApi;
    // @ts-ignore
    private readonly queryLock = new AsyncLock();
    private readonly sources = new Map<string, MessageSourceHolder>();

    private constructor(repo: MessagesRepository, persistence: Persistence, api: MessagesApi) {
        this.repo = repo;
        this.persistence = persistence;
        this.api = api;
    }

    createSourceAt = (id: string): MessagesSource => {
        // Create Message Source
        let sourceId = randomKey();
        let source = new MessageSourceHolder(sourceId, { type: 'loading' }, () => {
            this.sources.delete(sourceId);
        });
        this.sources.set(sourceId, source);

        // Init source
        backoff(async () => {
            while (true) {

                // Fast exit
                if (source.closed) {
                    return;
                }

                // Resolve message
                let message = await this.repo.readById(id);
                if (source.closed) {
                    return;
                }

                if (!message) {
                    let msg = await this.api.loadMessage(id);
                    if (source.closed) {
                        return;
                    }
                    if (!msg) {
                        source.abort({ type: 'no-access' });
                        return;
                    } else {
                        await this.persistence.inTx(async (tx) => {
                            await this.repo.writeBatch({ minSeq: msg!.seq, maxSeq: msg!.seq, messages: [msg!] }, tx);
                        });
                        continue;
                    }
                }

                // Resolve previous
                let before = await this.repo.readBefore({ before: message.seq, limit: 20 });
                if (source.closed) {
                    return;
                }

                // If previous not loaded
                if (!before || (before.items.length < 20 && !before.completed)) {
                    let loaded = await this.api.loadMessagesBefore(this.repo.id, message.id, 20);
                    if (source.closed) {
                        return;
                    }
                    let batchMinSeq = message.seq;
                    if (!loaded.hasMore) {
                        batchMinSeq = Number.MIN_SAFE_INTEGER;
                    } else {
                        for (let m of loaded.messages) {
                            batchMinSeq = Math.min(m.seq, batchMinSeq);
                        }
                    }

                    // Note: maxSeq is the seq of the message that we are using as cursor not the max seq of batch
                    await this.persistence.inTx(async (tx) => {
                        await this.repo.writeBatch({ minSeq: batchMinSeq, maxSeq: message!.seq, messages: loaded.messages }, tx);
                    });
                    continue;
                }

                // Resolve after
                let after = await this.repo.readAfter({ after: message.seq, limit: 20 });
                if (source.closed) {
                    return;
                }

                // If previous not loaded
                if (!after || (after.items.length < 20 && !after.completed)) {
                    let loaded = await this.api.loadMessagesAfter(this.repo.id, message.id, 20);
                    if (source.closed) {
                        return;
                    }
                    let batchMaxSeq = message.seq;
                    if (!loaded.hasMore) {
                        batchMaxSeq = Number.MAX_SAFE_INTEGER;
                    } else {
                        for (let m of loaded.messages) {
                            batchMaxSeq = Math.max(m.seq, batchMaxSeq);
                        }
                    }

                    // Note: minSeq is the seq of the message that we are using as cursor not the min seq of batch
                    await this.persistence.inTx(async (tx) => {
                        await this.repo.writeBatch({ minSeq: message!.seq, maxSeq: batchMaxSeq, messages: loaded.messages }, tx);
                    });
                    continue;
                }

                // Initial Messages
                let messages = [...before.items, message, ...after.items];

                // Max Seq
                let maxSeq = message.seq;
                if (after.completed) {
                    maxSeq = Number.MAX_SAFE_INTEGER;
                } else {
                    for (let m of after.items) {
                        maxSeq = Math.max(m.seq, maxSeq);
                    }
                }

                // Min Seq
                let minSeq = message.seq;
                if (before.completed) {
                    minSeq = Number.MIN_SAFE_INTEGER;
                } else {
                    for (let m of before.items) {
                        minSeq = Math.min(m.seq, minSeq);
                    }
                }
                source.init({ type: 'messages', messages, hasMoreNext: !after.completed, hasMorePrev: !before.completed }, minSeq, maxSeq);
                return;
            }
        });

        return source;
    }
}