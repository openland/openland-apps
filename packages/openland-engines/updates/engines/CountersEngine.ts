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
                counters: state.topMessage && state.states ? {
                    type: 'generic',
                    counter: state.states.counter,
                    mentions: state.states.mentions,
                    readSeq: state.states.readSeq,

                    serverCounter: state.states.counter,
                    serverMentions: state.states.mentions,
                    serverMaxSeq: state.topMessage.seq!,
                    serverReadSeq: state.states.readSeq,
                    serverUnreadMessages: [],
                    serverUnreadMentions: []
                } : { type: 'empty' },
                history:
                    (state.topMessage && state.states)
                        ? {
                            pts, lastMessagesSeq: state.topMessage.seq!
                        } : {
                            pts, lastMessagesSeq: 0
                        }
            });
            if (state.topMessage && state.states) {
                this.dialogs.onCounterUpdate(tx, state.cid, { unread: state.states.counter, mentions: state.states.mentions });
            }
        } else {
            let st = this.chats.get(state.cid)!;
            if (state.topMessage && state.states) {
                st.counters = counterReducer(st.counters, { type: 'server-state', seq: state.topMessage.seq!, readSeq: state.states.readSeq, counter: state.states.counter, mentions: state.states.mentions });
                st.history = historyTrackerReducer(st.history, { type: 'reset', seq: state.topMessage.seq!, pts: pts });
                if (st.counters.type === 'generic') {
                    this.dialogs.onCounterUpdate(tx, state.cid, { unread: st.counters.counter, mentions: st.counters.mentions });
                }
            }
        }
    }

    async onUpdate(tx: Transaction, pts: number, update: ShortUpdate) {
        if (update.__typename === 'UpdateChatRead') {
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
                        this.dialogs.onCounterUpdate(tx, update.cid, { unread: state.counters.counter, mentions: state.counters.mentions });
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
                let hasMention = false;
                if (update.message.__typename === 'GeneralMessage') {
                    hasMention = update.message.isMentioned;
                } else if (update.message.__typename === 'ServiceMessage') {
                    hasMention = update.message.isMentioned;
                }
                state.counters = counterReducer(state.counters, { type: 'message-add', seq: update.message.seq!, hasMention });
                state.history = historyTrackerReducer(state.history, { type: 'update', pts });
                if (state.counters.type === 'generic') {
                    this.dialogs.onCounterUpdate(tx, update.cid, { unread: state.counters.counter, mentions: state.counters.mentions });
                }
            }
        } else if (update.__typename === 'UpdateChatMessageDeleted') {
            let state = this.chats.get(update.cid)!;
            if (!state) {
                return;
            }
            state.counters = counterReducer(state.counters, { type: 'message-remove', seq: update.seq });
            state.history = historyTrackerReducer(state.history, { type: 'update', pts });
            if (state.counters.type === 'generic') {
                this.dialogs.onCounterUpdate(tx, update.cid, { unread: state.counters.counter, mentions: state.counters.mentions });
            }
        }
    }
}