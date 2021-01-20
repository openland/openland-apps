import { UpdateMessage } from './../../../openland-api/spacex.types';
import { LatestMessagesHistory, messagesHistoryReducer } from './history/LatestMessagesHistory';
import { UpdatesEngine } from 'openland-engines/updates/UpdatesEngine';
import { Transaction } from 'openland-engines/persistence/Persistence';
import { DialogsEngine } from './DialogsEngine';
import { ShortSequenceChat, ShortUpdate } from 'openland-api/spacex.types';

export class HistoryEngine {
    readonly dialogs: DialogsEngine;
    readonly updates: UpdatesEngine;
    readonly messages = new Map<string, UpdateMessage | null>();
    readonly latestMessages = new Map<string, LatestMessagesHistory>();

    constructor(dialogs: DialogsEngine, updates: UpdatesEngine) {
        this.dialogs = dialogs;
        this.updates = updates;
    }

    async onSequenceRestart(tx: Transaction, pts: number, state: ShortSequenceChat) {

        // Persist message
        if (state.topMessage) {
            await this.applyMessage(tx, state.topMessage);
        }

        // Persist list
        let msg = this.latestMessages.get(state.cid);
        if (!msg) {
            msg = { type: 'empty', pts: pts - 1 };
        }

        if (state.topMessage) {
            msg = messagesHistoryReducer(msg, { type: 'reset', seq: state.topMessage.seq!, pts, topMessage: state.topMessage ? state.topMessage.id : null });
        }
        this.latestMessages.set(state.cid, msg);
        await this.notifyTopMessage(tx, state.cid, msg);
    }

    async onUpdate(tx: Transaction, pts: number, update: ShortUpdate) {

        // Persist message
        if (update.__typename === 'UpdateChatMessage') {
            await this.applyMessage(tx, update.message);
        } else if (update.__typename === 'UpdateChatMessageDeleted') {
            await this.deleteMessage(tx, update.mid);
        }

        // Persist list
        if (update.__typename === 'UpdateChatMessage') {
            let msg = this.latestMessages.get(update.cid)!;
            if (!msg) {
                return;
            }
            let exTop: string | null = null;
            if (msg.type === 'generic') {
                exTop = msg.lastMessages[msg.lastMessages.length - 1];
            }
            msg = messagesHistoryReducer(msg, { type: 'message', seq: update.message.seq!, pts, message: update.message.id });
            this.latestMessages.set(update.cid, msg);
            let exTop2: string | null = null;
            if (msg.type === 'generic') {
                exTop2 = msg.lastMessages[msg.lastMessages.length - 1];
            }
            if (exTop !== exTop2 || exTop === update.message.id) {
                await this.notifyTopMessage(tx, update.cid, msg);
            }
        } else if (update.__typename === 'UpdateChatMessageDeleted') {
            let msg = this.latestMessages.get(update.cid)!;
            if (!msg) {
                return;
            }
            let exTop: string | null = null;
            if (msg.type === 'generic') {
                exTop = msg.lastMessages[msg.lastMessages.length - 1];
            }
            msg = messagesHistoryReducer(msg, { type: 'message-delete', seq: update.seq, pts, message: update.mid });
            this.latestMessages.set(update.cid, msg);
            let exTop2: string | null = null;
            if (msg.type === 'generic') {
                exTop2 = msg.lastMessages[msg.lastMessages.length - 1];
            }
            if (exTop !== exTop2) {
                if (!exTop2) {
                    await this.updates.chats.invalidate(tx, update.cid);
                    return;
                }
                await this.notifyTopMessage(tx, update.cid, msg);
            }
        }
    }

    private applyMessage = async (tx: Transaction, message: UpdateMessage) => {
        this.messages.set(message.id, message);
    }

    private deleteMessage = async (tx: Transaction, id: string) => {
        this.messages.delete(id);
    }

    private notifyTopMessage = async (tx: Transaction, id: string, state: LatestMessagesHistory) => {
        // Update top message in dialogs
        if (state.type === 'empty') {
            await this.dialogs.onTopMessageUpdate(tx, id, null);
        } else {
            await this.dialogs.onTopMessageUpdate(tx, id, this.messages.get(state.lastMessages[state.lastMessages.length - 1])!);
        }
    }
}