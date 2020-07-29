import { backoff, delay } from 'openland-y-utils/timer';
import * as React from 'react';
import { MessagesStore } from './MessagesStore';
import { WireMessage } from './WireMessage';
import { MessageView } from './MessageView';

export type MessageViewSnapshotLoadFrom =
    | { type: 'message', id: string }
    | { type: 'latest' };

export type Snapshot =
    | { type: 'loading' }
    | { type: 'no-access' }
    | { type: 'messages', focusSeq: number | null, hasMoreNext: boolean, hasMorePrev: boolean, messages: WireMessage[] };

export class MessageViewSnapshot implements MessageView {
    private _closed = false;
    private _onClosed: () => void;
    private store: MessagesStore;
    private loadFrom: MessageViewSnapshotLoadFrom;
    private _inited = false;
    private _state: Snapshot = { type: 'loading' };
    private _started = false;
    private _messages: WireMessage[] = [];
    private _minSeq: number = 0;
    private _maxSeq: number = 0;
    private _focusSeq: number | null = null;

    private _listeners: ((src: Snapshot) => void)[] = [];
    private _loadingNext = false;
    private _loadingPrev = false;

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
        this.setState({
            type: 'messages',
            focusSeq: this._focusSeq,
            messages: this._messages,
            hasMoreNext: this._maxSeq !== Number.MAX_SAFE_INTEGER,
            hasMorePrev: this._minSeq !== Number.MIN_SAFE_INTEGER
        });
    }

    private doInit() {
        if (this.loadFrom.type === 'message') {
            let id = this.loadFrom.id;
            backoff(async () => {
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
                        this._focusSeq = cachedMessage.seq;
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
            });
        } else if (this.loadFrom.type === 'latest') {
            backoff(async () => {
                while (true) {
                    if (this._closed) {
                        return;
                    }

                    let loaded = await this.store.persistence.inTx(async (tx) => {
                        let cachedMessage = await this.store.loadCachedLatest(tx);
                        if (cachedMessage === undefined) {
                            return false;
                        }

                        // Empty chat
                        if (cachedMessage === null) {
                            this._messages = [];
                            this._maxSeq = Number.MAX_SAFE_INTEGER;
                            this._minSeq = Number.MIN_SAFE_INTEGER;
                            this._started = true;
                            return true;
                        } else {

                            let prev = await this.store.loadCachedBefore(cachedMessage.seq, tx);
                            if (!prev || (!prev.completed && prev.items.length < 20)) {
                                return false;
                            }

                            this._messages = [...prev.items, cachedMessage];
                            this._minSeq = cachedMessage.seq;
                            if (prev.completed) {
                                this._minSeq = Number.MIN_SAFE_INTEGER;
                            } else {
                                for (let m of prev.items) {
                                    this._minSeq = Math.min(m.seq, this._minSeq);
                                }
                            }
                            this._maxSeq = Number.MAX_SAFE_INTEGER;
                            this._started = true;
                            this.setMessagesState();
                            return true;
                        }
                    });

                    // Loaded needed
                    if (!loaded) {
                        let message = await this.store.loadLatest();
                        if (this._closed) {
                            return;
                        }
                        if (message) {
                            let prev = await this.store.loadBefore(message.id);
                            if (!prev) {
                                this.setState({ type: 'no-access' });
                                this.close();
                                return;
                            }
                        }
                    } else {
                        break;
                    }
                }
            });
        }
    }

    //
    // Loading
    //

    requestLoadNextIfNeeded = () => {
        if (this._loadingNext) {
            return;
        }
        if (this._closed) {
            return;
        }
        if (this._maxSeq === Number.MAX_SAFE_INTEGER) {
            return;
        }
        this._loadingNext = true;
        backoff(async () => {
            while (true) {
                if (this._closed) {
                    return;
                }
                let loaded = await this.store.persistence.inTx(async (tx) => {
                    let after = await this.store.loadCachedAfter(this._maxSeq, tx);
                    if (!after || (after.items.length === 0) && !after.completed) {
                        return false;
                    }
                    this._messages = [...this._messages, ...after.items];
                    if (after.completed) {
                        this._maxSeq = Number.MAX_SAFE_INTEGER;
                    } else {
                        for (let i of after.items) {
                            this._maxSeq = Math.max(i.seq, this._minSeq);
                        }
                    }
                    this.setMessagesState();
                    return true;
                });

                if (!loaded) {
                    await this.store.loadAfter(this._messages[this._messages.length - 1].id);
                } else {
                    break;
                }
            }

            // Mark as loaded
            this._loadingNext = false;
        });
    }

    requestLoadPrevIfNeeded = () => {
        if (this._loadingPrev) {
            return;
        }
        if (this._closed) {
            return;
        }
        if (this._minSeq === Number.MIN_SAFE_INTEGER) {
            return;
        }
        this._loadingPrev = true;
        backoff(async () => {
            while (true) {
                if (this._closed) {
                    return;
                }
                let loaded = await this.store.persistence.inTx(async (tx) => {
                    let before = await this.store.loadCachedBefore(this._minSeq, tx);
                    if (!before || (before.items.length === 0) && !before.completed) {
                        return false;
                    }
                    this._messages = [...before.items, ...this._messages];
                    if (before.completed) {
                        this._minSeq = Number.MIN_SAFE_INTEGER;
                    } else {
                        for (let i of before.items) {
                            this._minSeq = Math.min(i.seq, this._minSeq);
                        }
                    }
                    this.setMessagesState();
                    return true;
                });

                if (!loaded) {
                    await this.store.loadBefore(this._messages[0].id);
                } else {
                    break;
                }
            }

            // Mark as loaded
            this._loadingPrev = false;
        });
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

    //
    // Updates
    //

    onMessagesReceived(messages: { repeatKey: string | null, message: WireMessage }[]) {
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
    onMessagesUpdated(messages: WireMessage[]) {
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