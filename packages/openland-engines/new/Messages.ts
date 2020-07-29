import { MessagesStore } from 'openland-engines/new/MessagesStore';
import { Persistence, Transaction } from './persistence/Persistence';
import { MessagesApi, MessagesApiClient } from './MessagesApi';
import { MessagesUpdates, MessagesChatUpdates } from './MessagesUpdates';
import { DialogUpdateFragment } from 'openland-api/spacex.types';
import { OpenlandClient } from 'openland-api/spacex';

export class Messages {

    readonly api: MessagesApi;
    readonly persistence: Persistence;
    private readonly updates: MessagesUpdates;
    private readonly stores = new Map<string, MessagesStore>();

    constructor(client: OpenlandClient, persistence: Persistence) {
        this.api = new MessagesApiClient(client);
        this.persistence = persistence;
        this.updates = MessagesUpdates.open(persistence, this.api, client);
        this.updates.onChatUpdates = this.onChatUpdates;
        this.updates.onDialogsUpdates = this.onDialogsUpdates;
        this.updates.onChatGotAccess = this.onChatGotAccess;
        this.updates.onChatLostAccess = this.onChatLostAccess;
        this.updates.start();
    }

    //
    // Stores
    //

    getStore = (id: string) => {
        let store = this.stores.get(id);
        if (!store) {
            store = MessagesStore.open(id, this.persistence, this.api);
            this.stores.set(id, store);

            //
            // `this.updates.needChat` MUST be called to get access mode.
            // Without calling this all store operations would hang.
            //

            this.updates.needChat(id);
        }
        return store;
    }

    //
    // Updates
    //

    private onDialogsUpdates = async (updates: DialogUpdateFragment[], tx: Transaction) => {
        // TODO: Implement
    }
    private onChatGotAccess = async (id: string, tx: Transaction) => {
        let store = this.getStore(id);
        await store.onMessagesGotAccess(tx);
    }
    private onChatLostAccess = async (id: string, tx: Transaction) => {
        let store = this.getStore(id);
        await store.onMessagesLostAccess(tx);
    }
    private onChatUpdates = async (id: string, updates: MessagesChatUpdates, tx: Transaction) => {
        let store = this.getStore(id);
        if (updates.received.length > 0) {
            await store.onMessagesReceived(updates.received, tx);
        }
        if (updates.updated.length > 0) {
            await store.onMessagesUpdated(updates.updated, tx);
        }
        if (updates.deleted.length > 0) {
            await store.onMessagesDeleted(updates.deleted, tx);
        }
    }
}