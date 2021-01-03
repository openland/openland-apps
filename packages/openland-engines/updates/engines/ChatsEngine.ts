import { ChatCounterState, counterReducer } from './../counters/ChatCounterState';
import { OpenlandClient } from 'openland-api/spacex';
import { Persistence, Transaction } from 'openland-engines/persistence/Persistence';
import { ShortSequenceChat, ShortUpdate } from 'openland-api/spacex.types';

export class ChatsEngine {
    readonly client: OpenlandClient;
    readonly persistence: Persistence;
    private me: string;
    private counters = {
        messagesUnread: 0,
        messagesMentions: 0,
        chatUnread: 0,
        chatMentions: 0
    };

    private chats = new Map<string, {
        counters: ChatCounterState
    }>();

    constructor(me: string, client: OpenlandClient, persistence: Persistence) {
        this.client = client;
        this.persistence = persistence;
        this.me = me;
    }

    async onSequenceStart(tx: Transaction, state: ShortSequenceChat) {
        this.chats.set(state.cid, {
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

        if (state.states) {
            if (state.states.counter > 0) {
                this.counters.messagesUnread += state.states.counter;
                this.counters.chatUnread++;
            }
            if (state.states.mentions > 0) {
                this.counters.messagesMentions += state.states.mentions;
                this.counters.chatMentions++;
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

            state.counters = counterReducer(state.counters, { type: 'optimistic-read', readSeq: update.seq });
            console.warn(state);
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
        console.log('[engine] loaded unread: ' + JSON.stringify(this.counters));
    }
}