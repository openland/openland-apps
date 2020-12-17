import { OpenlandClient } from 'openland-api/spacex';
import { Persistence, Transaction } from 'openland-engines/persistence/Persistence';
import { ShortSequenceChat, ShortUpdate } from 'openland-api/spacex.types';

type ChatState = {
    unread: number,
    mentions: number,
    seq: number,
    total: number
};

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
        state: ChatState | null,
        draft: {
            version: number,
            date: number,
            message: string | null
        } | null
    }>();

    constructor(me: string, client: OpenlandClient, persistence: Persistence) {
        this.client = client;
        this.persistence = persistence;
        this.me = me;
    }

    async onSequenceStart(tx: Transaction, state: ShortSequenceChat) {
        this.chats.set(state.cid, {
            state: state.states ? {
                unread: state.states.counter,
                mentions: state.states.mentions,
                seq: state.states.seq,
                total: state.states.total
            } : null,
            draft: state.draft ? {
                version: state.draft.version,
                date: parseInt(state.draft.date, 10),
                message: state.draft.message
            } : null
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
        if (update.__typename === 'UpdateChatDraftChanged') {
            let ex = this.chats.get(update.cid);
            if (!ex) {
                return; // Should not happen
            }
            if (!ex.draft || ex.draft.version < update.version) {
                ex.draft = {
                    version: update.version,
                    date: parseInt(update.date, 10),
                    message: update.draft
                };
            }
            console.log('[engine] draft update: ' + JSON.stringify(update));
        } else if (update.__typename === 'UpdateChatRead') {
            // TODO: Handle
            console.log('[engine] chat read: ' + JSON.stringify(update));
        } else if (update.__typename === 'UpdateChatMessage') {
            let state = this.chats.get(update.cid)!.state;
            if (!state) {
                return;
            }

            if (update.message.sender.id === this.me) {
                // If outgoing message
                let updated: ChatState = {
                    seq: state.seq,
                    total: state.total + 1,
                    mentions: state.mentions,
                    unread: state.unread
                };
                this.chats.get(update.cid)!.state = updated;
            } else {

                // Increment counter
                if (update.message.seq! > state.seq) {
                    let updated: ChatState = {
                        seq: state.seq,
                        total: state.total + 1,
                        mentions: state.mentions,
                        unread: state.unread + 1
                    };
                    this.chats.get(update.cid)!.state = updated;
                    this.counters.messagesUnread++;
                    if (state.unread === 0) {
                        this.counters.chatUnread++;
                    }
                    console.log('[engine] unread: ' + JSON.stringify(this.counters));
                } else {
                    let updated: ChatState = {
                        seq: state.seq,
                        total: state.total + 1,
                        mentions: state.mentions,
                        unread: state.unread
                    };
                    this.chats.get(update.cid)!.state = updated;
                }
            }
        } else if (update.__typename === 'UpdateChatMessageDeleted') {
            // TODO: Handle
            console.log('[engine] deleted: ' + JSON.stringify(update));
        }
    }

    async onDialogsLoaded() {
        console.log('[engine] loaded unread: ' + JSON.stringify(this.counters));
    }
}