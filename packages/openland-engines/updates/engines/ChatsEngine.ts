import { UpdatesEngine } from './../UpdatesEngine';
import { ChatCounterState, counterReducer } from './../counters/ChatCounterState';
import { OpenlandClient } from 'openland-api/spacex';
import { Persistence, Transaction } from 'openland-engines/persistence/Persistence';
import { ShortSequenceChat, ShortUpdate } from 'openland-api/spacex.types';

export class ChatsEngine {
    readonly client: OpenlandClient;
    readonly persistence: Persistence;
    readonly engine: UpdatesEngine;
    readonly me: string;

    private chats = new Map<string, {
        sequence: string,
        counters: ChatCounterState
    }>();

    constructor(me: string, client: OpenlandClient, persistence: Persistence, engine: UpdatesEngine) {
        this.client = client;
        this.persistence = persistence;
        this.me = me;
        this.engine = engine;
    }

    async onSequenceRestart(tx: Transaction, state: ShortSequenceChat) {
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
                } : { type: 'empty' }
            });
        } else {
            console.warn(state);
            let st = this.chats.get(state.cid)!;
            if (state.states && state.states.seq) {
                st.counters = counterReducer(st.counters, { type: 'server-state', seq: state.states.seq, readSeq: state.states.readSeq, counter: state.states.counter });
                console.warn(st);
            }
        }
    }

    async onUpdate(tx: Transaction, update: ShortUpdate) {
        if (update.__typename === 'UpdateChatRead') {
            // TODO: Handle
            console.log('[engine] chat read: ' + JSON.stringify(update));

            let state = this.chats.get(update.cid)!;
            if (!state) {
                return;
            }

            // Invalidate sequence
            await this.engine.invalidateSequence(tx, state.sequence);
        } else if (update.__typename === 'UpdateChatMessage') {
            let state = this.chats.get(update.cid)!;
            if (!state) {
                return;
            }
            if (update.message.sender.id !== this.me) {
                state.counters = counterReducer(state.counters, { type: 'message-add', seq: update.message.seq! });
                console.warn(state);
            }
        } else if (update.__typename === 'UpdateChatMessageDeleted') {
            let state = this.chats.get(update.cid)!;
            if (!state) {
                return;
            }
            state.counters = counterReducer(state.counters, { type: 'message-remove', seq: update.seq });
            console.warn(state);
        }
    }

    async onDialogsLoaded() {
        // console.log('[engine] loaded unread: ' + JSON.stringify(this.counters));
    }
}