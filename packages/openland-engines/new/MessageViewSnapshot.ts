import * as React from 'react';
import { MessagesStore } from './MessagesStore';
import { MessageView } from './MessageView';
import { Message } from './Message';

export type MessageViewSnapshotLoadFrom =
    | { type: 'message', id: string }
    | { type: 'latest' };

export type Snapshot =
    | { type: 'loading' }
    | { type: 'no-access' }
    | { type: 'messages', focusSeq: number | null, hasMoreNext: boolean, hasMorePrev: boolean, messages: Message[] };

export class MessageViewSnapshot implements MessageView {
    private _closed = false;
    private _onClosed: () => void;
    private store: MessagesStore;
    private loadFrom: MessageViewSnapshotLoadFrom;
    private _inited = false;
    private _state: Snapshot = { type: 'loading' };
    private _started = false;
    private _messages: Message[] = [];

    private _minId: string | null = null;
    private _minSeq: number | null = null;
    private _maxId: string | null = null;
    private _maxSeq: number | null = null;

    private _focusSeq: number | null = null;
    private _loadCancel: (() => void) | null = null;

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
            this._loadCancel = this.store.loadFromMessage(this.loadFrom.id, (ev) => {
                if (this._closed) {
                    return;
                }
                if (!ev) {
                    this.setState({ type: 'no-access' });
                    this.close();
                    return;
                }

                this._messages = ev.messages;
                if (ev.hasAfter) {
                    this._maxSeq = null;
                    this._maxId = null;
                    for (let m of ev.messages) {
                        if (m.state === 'sent') {
                            if (this._maxSeq === null || this._maxSeq < m.seq) {
                                this._maxSeq = m.seq;
                                this._maxId = m.id;
                            }
                        }
                    }
                } else {
                    this._maxSeq = Number.MAX_SAFE_INTEGER;
                    this._maxId = null;
                }
                if (ev.hasBefore) {
                    this._minSeq = null;
                    this._minId = null;
                    for (let m of ev.messages) {
                        if (m.state === 'sent') {
                            if (this._minSeq === null || this._minSeq > m.seq) {
                                this._minSeq = m.seq;
                                this._minId = m.id;
                            }
                        }
                    }
                } else {
                    this._minSeq = Number.MAX_SAFE_INTEGER;
                    this._minId = null;
                }
                this._started = true;
                this.setMessagesState();
            });

        } else if (this.loadFrom.type === 'latest') {
            this._loadCancel = this.store.loadFromLatest((ev) => {
                if (this._closed) {
                    return;
                }

                this._messages = ev.messages;
                if (ev.hasBefore) {
                    this._minSeq = null;
                    this._minId = null;
                    for (let m of ev.messages) {
                        if (m.state === 'sent') {
                            if (this._minSeq === null || this._minSeq > m.seq) {
                                this._minSeq = m.seq;
                                this._minId = m.id;
                            }
                        }
                    }
                } else {
                    this._minSeq = Number.MAX_SAFE_INTEGER;
                    this._minId = null;
                }
                this._maxSeq = Number.MAX_SAFE_INTEGER;
                this._maxId = null;
                this._started = true;
                this.setMessagesState();
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
        if (!this._started) {
            return;
        }
        if (this._maxSeq === Number.MAX_SAFE_INTEGER || this._maxSeq === null /* Actually not possible if view loaded */) {
            return;
        }
        this._loadingNext = true;
        this.store.loadAfter({ seq: this._maxSeq!, id: this._maxId! }, (args) => {
            if (this._closed) {
                return;
            }
            if (!args) {
                this.setState({ type: 'no-access' });
                this.close();
                return;
            }

            this._messages = [...this._messages, ...args.messages];
            if (args.hasAfter) {
                for (let m of args.messages) {
                    if (m.state === 'sent') {
                        if (this._maxSeq === null || this._maxSeq < m.seq) {
                            this._maxSeq = m.seq;
                            this._maxId = m.id;
                        }
                    }
                }
            } else {
                this._maxSeq = Number.MAX_SAFE_INTEGER;
                this._maxId = null;
            }
            this.setMessagesState();

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
        if (!this._started) {
            return;
        }
        if (this._minSeq === Number.MIN_SAFE_INTEGER) {
            return;
        }
        this._loadingPrev = true;

        this.store.loadBefore(this._minId ? { id: this._minId!, seq: this._minSeq! } : null, (args) => {
            if (this._closed) {
                return;
            }
            if (!args) {
                this.setState({ type: 'no-access' });
                this.close();
                return;
            }

            this._messages = [...args.messages, ...this._messages];
            if (args.hasBefore) {
                for (let m of args.messages) {
                    if (m.state === 'sent') {
                        if (this._minSeq === null || this._minSeq > m.seq) {
                            this._minSeq = m.seq;
                            this._minId = m.id;
                        }
                    }
                }
            } else {
                this._minSeq = Number.MIN_SAFE_INTEGER;
                this._minId = null;
            }
            this.setMessagesState();

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

        if (this._loadCancel) {
            this._loadCancel();
            this._loadCancel = null;
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
            if (this._loadCancel) {
                this._loadCancel();
                this._loadCancel = null;
            }
            this.doInit();
        }
    }

    //
    // Updates
    //

    onMessagesReceived(messages: Message[]) {
        if (this._closed) {
            return;
        }
        if (!this._started) {
            return;
        }

        // If loaded to begining
        if (this._maxSeq === Number.MAX_SAFE_INTEGER) {
            // Use spread operators to create new array for maintaining immutability principle
            this._messages = [...this._messages, ...messages];
            this.setMessagesState();
        }
    }
    onMessagesUpdated(messages: Message[]) {
        if (this._closed) {
            return;
        }
        if (!this._started) {
            return;
        }

        // Merge updated messages
        let hasChanges = false;
        for (let m of messages) {
            let existing = this._messages.findIndex((v) => v.key === m.key);
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
            let existing = this._messages.findIndex((v) => v.key === m);
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