import { DialogsEngine } from './DialogsEngine';
import { HistoryTracker, historyTrackerReducer, historyTrackerIsWithinKnown } from './counters/HistoryTracker';
import { UpdatesEngine } from '../UpdatesEngine';
import { ChatCounterState, counterReducer } from './counters/ChatCounterState';
import { Transaction } from 'openland-engines/persistence/Persistence';
import { ShortSequenceChat, ShortUpdate } from 'openland-api/spacex.types';

export class CountersEngine {
    readonly updates: UpdatesEngine;
    readonly dialogs: DialogsEngine;
    readonly me: string;

    private chats = new Map<string, {
        sequence: string,
        counters: ChatCounterState,
        history: HistoryTracker
    }>();

    constructor(me: string, updates: UpdatesEngine, dialogs: DialogsEngine) {
        this.me = me;
        this.updates = updates;
        this.dialogs = dialogs;
    }

    async onSequenceRestart(tx: Transaction, pts: number, state: ShortSequenceChat) {
        if (!this.chats.has(state.cid)) {
            this.chats.set(state.cid, {
                sequence: state.id,
                counters: state.states && state.states.seq ? {
                    type: 'generic',
                    counter: state.states.counter,
                    readSeq: state.states.readSeq,

                    serverCounter: state.states.counter,
                    serverMaxSeq: state.states.seq,
                    serverReadSeq: state.states.readSeq,
                    serverUnreadMessages: []
                } : { type: 'empty' },
                history:
                    (state.states && state.states.seq)
                        ? {
                            pts, lastMessagesSeq: state.states.seq, lastMessages: []
                        } : {
                            pts, lastMessagesSeq: 0, lastMessages: []
                        }
            });
            if (state.states && state.states.seq) {
                this.dialogs.onCounterUpdate(tx, state.cid, { unread: state.states.counter, mentions: state.states.mentions });
            }
        } else {
            let st = this.chats.get(state.cid)!;
            if (state.states && state.states.seq) {
                st.counters = counterReducer(st.counters, { type: 'server-state', seq: state.states.seq, readSeq: state.states.readSeq, counter: state.states.counter });
                st.history = historyTrackerReducer(st.history, { type: 'reset', seq: state.states.seq, pts: pts });
                if (st.counters.type === 'generic') {
                    this.dialogs.onCounterUpdate(tx, state.cid, { unread: st.counters.counter, mentions: 0 });
                }
            }
        }
    }

    async onUpdate(tx: Transaction, pts: number, update: ShortUpdate) {
        if (update.__typename === 'UpdateChatRead') {
            // TODO: Handle
            console.log('[engine] chat read: ' + JSON.stringify(update));

            let state = this.chats.get(update.cid)!;
            if (!state) {
                return;
            }

            // Invalidate sequence
            if (state.counters.type === 'empty') {
                await this.updates.invalidate(tx, state.sequence);
            } else {
                if (historyTrackerIsWithinKnown(state.history, { from: state.counters.serverReadSeq, to: update.seq })) {
                    state.counters = counterReducer(state.counters, { type: 'read', readSeq: update.seq });
                    if (state.counters.type === 'generic') {
                        this.dialogs.onCounterUpdate(tx, update.cid, { unread: state.counters.counter, mentions: 0 });
                    }
                } else {
                    await this.updates.invalidate(tx, state.sequence);
                }
            }
        } else if (update.__typename === 'UpdateChatMessage') {
            let state = this.chats.get(update.cid)!;
            if (!state) {
                return;
            }
            if (update.message.sender.id !== this.me) {
                state.counters = counterReducer(state.counters, { type: 'message-add', seq: update.message.seq! });
                state.history = historyTrackerReducer(state.history, { type: 'message-add', seq: update.message.seq!, pts });
                if (state.counters.type === 'generic') {
                    this.dialogs.onCounterUpdate(tx, update.cid, { unread: state.counters.counter, mentions: 0 });
                }
            }
        } else if (update.__typename === 'UpdateChatMessageDeleted') {
            let state = this.chats.get(update.cid)!;
            if (!state) {
                return;
            }
            state.counters = counterReducer(state.counters, { type: 'message-remove', seq: update.seq });
            state.history = historyTrackerReducer(state.history, { type: 'message-remove', seq: update.seq, pts });
            if (state.counters.type === 'generic') {
                this.dialogs.onCounterUpdate(tx, update.cid, { unread: state.counters.counter, mentions: 0 });
            }
        }
    }
}