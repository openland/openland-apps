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

    private readonly repo: MessagesRepository;
    private readonly persistence: Persistence;
    private readonly api: MessagesApi;
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
        // (async () => {
        //     let message = await this.repo.readById(id);
        //     if (!message) {

        //     }
        //     // let message = 
        // })();

        return source;
        // (async () => {
        //     let center = await this.repo.readBySeq(seq);
        //     let before = await this.repo.readBefore({ before: seq, limit: 20 });
        //     let after = await this.repo.readAfter({ after: seq, limit: 20 });
        //     //
        // })();
    }
}