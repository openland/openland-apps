import { StoredMap } from './storage/StoredMap';
import { DialogsEngine } from './DialogsEngine';
import { HistoryTracker, historyTrackerReducer, historyTrackerIsWithinKnown } from './counters/HistoryTracker';
import { UpdatesEngine } from '../UpdatesEngine';
import { ChatCounterState, counterReducer, ChatCounterAction } from './counters/ChatCounterState';
import { Transaction } from 'openland-engines/persistence/Persistence';
import { ShortSequenceChat, ShortUpdate } from 'openland-api/spacex.types';

export class CountersEngine {
    readonly updates: UpdatesEngine;
    readonly dialogs: DialogsEngine;
    readonly me: string;

    private chats = new StoredMap<{
        readonly counters: ChatCounterState,
        readonly history: HistoryTracker
    }>('counters');

    constructor(me: string, updates: UpdatesEngine, dialogs: DialogsEngine) {
        this.me = me;
        this.updates = updates;
        this.dialogs = dialogs;
    }

    async onSequenceRestart(tx: Transaction, pts: number, state: ShortSequenceChat, lost: boolean) {
        let current = await this.chats.get(tx, state.cid);
        if (!current) {
            this.chats.set(tx, state.cid, {
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
            if (state.states) {
                await this.dialogs.onCounterUpdate(tx, state.cid, { unread: state.states.counter, mentions: state.states.mentions });
            }
        } else {
            if (state.topMessage && state.states) {
                let countersAction: ChatCounterAction = { type: 'server-state', seq: state.topMessage.seq!, readSeq: state.states.readSeq, counter: state.states.counter, mentions: state.states.mentions, lost };
                let counters = counterReducer(current.counters, countersAction);
                console.log('[updates]: counters: reducer ', current.counters, countersAction, counters);
                let history = historyTrackerReducer(current.history, { type: 'reset', seq: state.topMessage.seq!, pts: pts });
                this.chats.set(tx, state.cid, {
                    ...current,
                    counters,
                    history
                });
                if (counters.type === 'generic') {
                    await this.dialogs.onCounterUpdate(tx, state.cid, { unread: counters.counter, mentions: counters.mentions });
                } else {
                    await this.dialogs.onCounterUpdate(tx, state.cid, { unread: 0, mentions: 0 });
                }
            }
        }
    }

    async onUpdate(tx: Transaction, pts: number, update: ShortUpdate) {
        if (update.__typename === 'UpdateChatRead') {
            console.log('[updates]: chat read: ', update);
            let state = await this.chats.getOrFail(tx, update.cid);

            // Invalidate sequence
            if (state.counters.type === 'empty') {
                console.log('[updates]: chat read: invalidate since empty');
                await this.updates.chats.invalidate(tx, update.cid);
            } else {
                if (historyTrackerIsWithinKnown(state.history, { from: state.counters.serverReadSeq, to: update.seq })) {
                    console.log('[updates]: chat read: history is within known');
                    let countersAction: ChatCounterAction = { type: 'read', readSeq: update.seq };
                    let counters = counterReducer(state.counters, countersAction);
                    console.log('[updates]: counters: reducer ', state.counters, countersAction, counters);
                    this.chats.set(tx, update.cid, { ...state, counters });
                    if (counters.type === 'generic') {
                        await this.dialogs.onCounterUpdate(tx, update.cid, { unread: counters.counter, mentions: counters.mentions });
                    } else {
                        await this.dialogs.onCounterUpdate(tx, update.cid, { unread: 0, mentions: 0 });
                    }
                } else {
                    console.log('[updates]: chat read: invalidate since outside of known i');
                    await this.updates.chats.invalidate(tx, update.cid);
                }
            }
        } else if (update.__typename === 'UpdateChatMessage') {
            let state = await this.chats.getOrFail(tx, update.cid);

            if (update.message.sender.id !== this.me) {
                let hasMention = false;
                if (update.message.__typename === 'GeneralMessage') {
                    hasMention = update.message.isMentioned;
                } else if (update.message.__typename === 'ServiceMessage') {
                    hasMention = update.message.isMentioned;
                }
                let countersAction: ChatCounterAction = { type: 'message-add', seq: update.message.seq!, hasMention };
                let counters = counterReducer(state.counters, countersAction);
                console.log('[updates]: counters: reducer ', state.counters, countersAction, counters);
                let history = historyTrackerReducer(state.history, { type: 'update', pts });
                this.chats.set(tx, update.cid, { ...state, counters, history });
                if (counters.type === 'generic') {
                    await this.dialogs.onCounterUpdate(tx, update.cid, { unread: counters.counter, mentions: counters.mentions });
                } else {
                    await this.dialogs.onCounterUpdate(tx, update.cid, { unread: 0, mentions: 0 });
                }
            }
        } else if (update.__typename === 'UpdateChatMessageDeleted') {
            let state = await this.chats.getOrFail(tx, update.cid);
            let countersAction: ChatCounterAction = { type: 'message-remove', seq: update.seq };
            let counters = counterReducer(state.counters, countersAction);
            console.log('[updates]: counters: reducer ', state.counters, countersAction, counters);
            let history = historyTrackerReducer(state.history, { type: 'update', pts });
            this.chats.set(tx, update.cid, { ...state, counters, history });
            if (counters.type === 'generic') {
                await this.dialogs.onCounterUpdate(tx, update.cid, { unread: counters.counter, mentions: counters.mentions });
            } else {
                await this.dialogs.onCounterUpdate(tx, update.cid, { unread: 0, mentions: 0 });
            }
        }
    }
}