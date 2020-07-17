import { backoff } from 'openland-y-utils/timer';
import { randomKey } from 'openland-y-utils/randomKey';
import { MessagesApi } from './MessagesApi';
import { Persistence } from './Persistence';
import { MessagesRepository } from './MessagesRepository';
import { AsyncLock } from '@openland/patterns';

export type MessagesState =
    | { type: 'loading' }
    | { type: 'no-access' }
    | { type: 'messages' };

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

    update(state: MessagesState) {
        if (this._closed) {
            return;
        }
        this._state = state;
        if (this.onUpdated) {
            this.onUpdated(state);
        }
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
                if (!message) {
                    let msg = await this.api.loadMessage(id);
                    if (source.closed) {
                        return;
                    }
                    if (!msg) {
                        source.update({ type: 'no-access' });
                        source.close();
                        return;
                    } else {
                        this.persistence.startTransaction();
                        await this.repo.writeBatch({ minSeq: msg.seq, maxSeq: msg.seq, messages: [msg] });
                        await this.persistence.commitTransaction();
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
                    let minSeq = message.seq;
                    if (!loaded.hasMore) {
                        minSeq = Number.MIN_SAFE_INTEGER;
                    } else {
                        for (let m of loaded.messages) {
                            minSeq = Math.min(m.seq, minSeq);
                        }
                    }

                    // Note: maxSeq is the seq of the message that we are using as cursor not the max seq of batch
                    this.persistence.startTransaction();
                    await this.repo.writeBatch({ minSeq, maxSeq: message.seq, messages: loaded.messages });
                    await this.persistence.commitTransaction();
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
                    let maxSeq = message.seq;
                    if (!loaded.hasMore) {
                        maxSeq = Number.MAX_SAFE_INTEGER;
                    } else {
                        for (let m of loaded.messages) {
                            maxSeq = Math.max(m.seq, maxSeq);
                        }
                    }

                    // Note: minSeq is the seq of the message that we are using as cursor not the min seq of batch
                    this.persistence.startTransaction();
                    await this.repo.writeBatch({ minSeq: message.seq, maxSeq, messages: loaded.messages });
                    await this.persistence.commitTransaction();
                    continue;
                }

                let messages = [...before.items, message, ...after.items];
                console.warn({ messages, hasMoreNext: !after.completed, hasMorePrev: !before.completed });
                return;
            }
        });

        return source;
    }
}