import * as React from 'react';
import { MessagesStore } from './MessagesStore';
import { StoredMessage } from './StoredMessage';
import { MessageView } from './MessageView';

export type MessageViewSnapshotLoadFrom =
    | { type: 'message', id: string }
    | { type: 'end' };

export type Snapshot =
    | { type: 'loading' }
    | { type: 'no-access' }
    | { type: 'messages', hasMoreNext: boolean, hasMorePrev: boolean, messages: StoredMessage[] };

export class MessageViewSnapshot implements MessageView {
    private _closed = false;
    private _onClosed: () => void;
    private store: MessagesStore;
    private loadFrom: MessageViewSnapshotLoadFrom;
    private _inited = false;
    private _state: Snapshot = { type: 'loading' };
    private _started = false;
    private _messages: StoredMessage[] = [];
    private _minSeq: number = 0;
    private _maxSeq: number = 0;
    private _listeners: ((src: Snapshot) => void)[] = [];

    constructor(store: MessagesStore, loadFrom: MessageViewSnapshotLoadFrom, onClosed: () => void) {
        this.store = store;
        this.loadFrom = loadFrom;
        this._onClosed = onClosed;
    }

    //
    // State
    //

    get state() {
        return this._state;
    }

    useState() {
        let initialState = React.useMemo(() => this._state, []);
        let [s, setS] = React.useState(initialState);
        React.useEffect(() => {
            if (this._state !== initialState) {
                setS(this._state);
            }
            this._listeners.push(setS);
            return () => {
                var index = this._listeners.indexOf(setS);
                if (index >= 0) {
                    this._listeners.splice(index, 1);
                }
            };
        }, []);
        return s;
    }

    private setState(state: Snapshot) {
        if (this._closed) {
            return;
        }
        this._state = state;

        // Notify
        for (let l of this._listeners) {
            l(state);
        }
    }

    private setMessagesState() {
        this.setState({ type: 'messages', messages: this._messages, hasMoreNext: this._maxSeq !== Number.MAX_SAFE_INTEGER, hasMorePrev: this._minSeq !== Number.MIN_SAFE_INTEGER });
    }

    private doInit() {
        if (this.loadFrom.type === 'message') {
            let id = this.loadFrom.id;
            (async () => {
                while (true) {
                    if (this._closed) {
                        return;
                    }
                    let loaded = await this.store.persistence.inTx(async (tx) => {
                        let cachedMessage = await this.store.loadCachedMessage(id, tx);
                        if (!cachedMessage) {
                            return false;
                        }
                        let next = await this.store.loadCachedAfter(cachedMessage.seq, tx);
                        if (!next || (!next.completed && next.items.length < 20)) {
                            return false;
                        }
                        let prev = await this.store.loadCachedBefore(cachedMessage.seq, tx);
                        if (!prev || (!prev.completed && prev.items.length < 20)) {
                            return false;
                        }

                        // Set initial state
                        this._messages = [...prev.items, cachedMessage, ...next.items];
                        this._started = true;
                        // Max Seq
                        this._maxSeq = cachedMessage.seq;
                        if (next.completed) {
                            this._maxSeq = Number.MAX_SAFE_INTEGER;
                        } else {
                            for (let m of next.items) {
                                this._maxSeq = Math.max(m.seq, this._maxSeq);
                            }
                        }
                        // Min Seq
                        this._minSeq = cachedMessage.seq;
                        if (prev.completed) {
                            this._minSeq = Number.MIN_SAFE_INTEGER;
                        } else {
                            for (let m of prev.items) {
                                this._minSeq = Math.min(m.seq, this._minSeq);
                            }
                        }

                        this.setMessagesState();

                        return true;
                    });

                    if (!loaded) {
                        // Prev Messages
                        let message = await this.store.loadMessage(id);
                        if (this._closed) {
                            return;
                        }
                        if (!message) {
                            this.setState({ type: 'no-access' });
                            this.close();
                            return;
                        }

                        // Prev Messages
                        let prev = await this.store.loadBefore(id);
                        if (this._closed) {
                            return;
                        }
                        if (!prev) {
                            this.setState({ type: 'no-access' });
                            this.close();
                            return;
                        }

                        // Next Messages
                        let next = await this.store.loadAfter(id);
                        if (this._closed) {
                            return;
                        }
                        if (!next) {
                            this.setState({ type: 'no-access' });
                            this.close();
                            return;
                        }
                    } else {
                        break;
                    }
                }
            })();
        }
    }

    //
    // Closing
    //

    get closed(): boolean {
        return this._closed;
    }
    close() {
        if (!this._closed) {
            this._closed = true;
            this._onClosed();
        }
    }

    //
    // Access Updates
    //

    onMessagesLostAccess() {
        if (this._closed) {
            return;
        }

        this.setState({ type: 'no-access' });
        this.close();
    }
    onMessagesGotAccess() {
        if (this._closed) {
            return;
        }

        if (!this._inited) {
            this._inited = true;
            this.doInit();
        }
    }
    onMessagesReceived(messages: { repeatKey: string | null, message: StoredMessage }[]) {
        if (this._closed) {
            return;
        }
        if (!this._started) {
            return;
        }

        // If loaded to begining
        if (this._maxSeq === Number.MAX_SAFE_INTEGER) {
            // Use spread operators to create new array for maintaining immutability principle
            this._messages = [...this._messages, ...messages.map((v) => v.message)];
            this.setMessagesState();
        }
    }
    onMessagesUpdated(messages: StoredMessage[]) {
        if (this._closed) {
            return;
        }
        if (!this._started) {
            return;
        }

        // Merge updated messages
        let hasChanges = false;
        for (let m of messages) {
            let existing = this._messages.findIndex((v) => v.id === m.id);
            if (existing >= 0) {
                this._messages[existing] = m;
                hasChanges = true;
            }
        }
        if (hasChanges) {
            this.setMessagesState();
        }
    }

    onMessagesDeleted(messages: string[]) {
        if (this._closed) {
            return;
        }
        if (!this._started) {
            return;
        }

        // Delete messages
        let hasChanges = false;
        for (let m of messages) {
            let existing = this._messages.findIndex((v) => v.id === m);
            if (existing >= 0) {
                this._messages.splice(existing, 1);
                hasChanges = true;
            }
        }
        if (hasChanges) {
            this.setMessagesState();
        }
    }
}