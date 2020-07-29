import { WireMessage } from './WireMessage';
import { GraphqlActiveSubscription } from '@openland/spacex';
import { MessagesApi, convertMessage } from './MessagesApi';
import { Persistence, Transaction } from './persistence/Persistence';
import { AsyncLock } from '@openland/patterns';
import {
    DialogUpdateFragment,
    NewChatUpdateFragment,
    NewChatUpdateFragment_ChatMessageReceived,
    NewChatUpdateFragment_ChatMessageUpdated,
    NewChatUpdateFragment_ChatMessageDeleted
} from 'openland-api/spacex.types';
import { OpenlandClient } from 'openland-api/spacex';

export interface MessagesChatUpdates {
    received: { message: WireMessage, repeatKey: string | null }[];
    updated: WireMessage[];
    deleted: string[];
}

export class MessagesUpdates {

    static open(persistence: Persistence, api: MessagesApi, client: OpenlandClient) {
        return new MessagesUpdates(persistence, api, client);
    }

    //
    // Callbacks
    //

    onDialogsUpdates?: (updates: DialogUpdateFragment[], tx: Transaction) => Promise<void>;
    onChatGotAccess?: (id: string, tx: Transaction) => Promise<void>;
    onChatLostAccess?: (id: string, tx: Transaction) => Promise<void>;
    onChatUpdates?: (id: string, updates: MessagesChatUpdates, tx: Transaction) => Promise<void>;

    private readonly api: MessagesApi;
    private readonly client: OpenlandClient;
    private readonly persistence: Persistence;
    private readonly updatesLock = new AsyncLock();
    private started = false;
    private dialogsState!: string;
    private dialogsSubscription: GraphqlActiveSubscription<any> | null = null;
    private chatStateLock = new AsyncLock();
    private chatStates = new Map<string, string>();
    private chatAccess = new Map<string, boolean>();
    private chatNeeded = new Set<string>();
    private chatSubscriptions = new Map<string, GraphqlActiveSubscription<any>>();

    private constructor(persistence: Persistence, api: MessagesApi, client: OpenlandClient) {
        this.persistence = persistence;
        this.client = client;
        this.api = api;
    }

    start = () => {
        if (this.started) {
            throw Error('Already started');
        }
        this.started = true;
        this.init();
    }

    needChat = (id: string) => {
        if (this.chatNeeded.has(id)) {
            return;
        }
        this.chatNeeded.add(id);
        this.loadChatIfNeeded(id);
    }

    private async init() {

        // Load dialogs state
        let state = await this.persistence.readKey('dialogs.state');
        if (!state) {
            console.log('Fetching state for dialogs...');
            state = await this.api.loadDialogsState();
            await this.persistence.inTx(async (tx) => {
                tx.write('dialogs.state', state);
            });
            console.log('Fetched state ' + state);
        } else {
            console.log('Found persisted state');
        }
        this.dialogsState = state;

        // Subscribe for dialogs
        this.resubscribeForDialogs();
    }

    //
    // Dialogs
    //

    private resubscribeForDialogs = () => {
        // Immediatelly unsubscribe from current subscription
        if (this.dialogsSubscription) {
            this.dialogsSubscription.destroy();
            this.dialogsSubscription = null;
        }
        this.dialogsSubscription = this.client.subscribeDialogsWatch({ state: this.dialogsState }, (d) => {
            // Automatically resubscribe for dialogs when subscription stopped
            if (d.type === 'stopped') {
                this.resubscribeForDialogs();
            } else {
                let updates = d.message.event.__typename === 'DialogUpdateBatch' ? d.message.event.updates : [d.message.event.update];
                let state = d.message.event.state;

                // Save cursor in memory but not persist it yet
                this.dialogsState = state;

                // Apply dialogs update
                this.updatesLock.inLock(async () => {
                    await this.persistence.inTx(async (tx) => {
                        await this.handleDialogsUpdates(updates, tx);
                        tx.write('dialogs.state', state);
                    });
                });
            }
        });
    }

    private handleDialogsUpdates = async (updates: DialogUpdateFragment[], tx: Transaction) => {
        if (this.onDialogsUpdates) {
            await this.onDialogsUpdates(updates, tx);
        }
    }

    private handleChatUpdates = async (id: string, updates: NewChatUpdateFragment[], tx: Transaction) => {
        let received = updates.filter((v): v is NewChatUpdateFragment_ChatMessageReceived => v.__typename === 'ChatMessageReceived');
        let updated = updates.filter((v): v is NewChatUpdateFragment_ChatMessageUpdated => v.__typename === 'ChatMessageUpdated');
        let deleted = updates.filter((v): v is NewChatUpdateFragment_ChatMessageDeleted => v.__typename === 'ChatMessageDeleted');
        if (received.length > 0 || updated.length > 0 || deleted.length > 0) {

            let mappedDeleted: string[] = [];
            let mappedReceived: { repeatKey: string | null, message: WireMessage }[] = [];
            let mappedUpdated: WireMessage[] = [];

            // Collapse events if needed.
            // NOTE: Order is important
            let handled = new Set<string>();
            for (let r of deleted) {
                if (!handled.has(r.message.id)) {
                    handled.add(r.message.id);
                    mappedDeleted.push(r.message.id);
                }
            }
            for (let r of received) {
                if (!handled.has(r.message.id)) {
                    handled.add(r.message.id);
                    mappedReceived.push({ repeatKey: r.repeatKey, message: convertMessage(r.message) });
                }
            }
            for (let r of updated) {
                if (!handled.has(r.message.id)) {
                    handled.add(r.message.id);
                    mappedUpdated.push(convertMessage(r.message));
                }
            }

            // Handle updates
            let update: MessagesChatUpdates = {
                received: mappedReceived,
                updated: mappedUpdated,
                deleted: mappedDeleted
            };
            if (this.onChatUpdates) {
                await this.onChatUpdates(id, update, tx);
            }
        }
    }

    private handleChatGotAccess = async (id: string, tx: Transaction) => {
        tx.write('chats.access.' + id, 'true');
        this.chatAccess.set(id, true);
        if (this.onChatGotAccess) {
            await this.onChatGotAccess(id, tx);
        }
        this.startChatSubscription(id);
    }

    private handleChatLostAccess = async (id: string, tx: Transaction) => {
        tx.write('chats.access.' + id, 'false');
        this.chatAccess.set(id, false);
        if (this.onChatLostAccess) {
            await this.onChatLostAccess(id, tx);
        }
        this.stopChatSubscription(id);
    }

    //
    // Load Chat State
    //

    private loadChatIfNeeded = (id: string) => {
        this.chatStateLock.inLock(async () => {

            // If already loaded
            if (this.chatStates.has(id) && this.chatAccess.has(id)) {
                return;
            }

            console.log('starting chat ' + id);

            // Load chat state
            let state = await this.persistence.readKey('chats.state.' + id);
            if (!state) {
                state = await this.api.loadChatState(id);
                await this.persistence.inTx(async (tx) => {
                    tx.write('chats.state.' + id, state);
                });
            }

            console.log('[' + id + ']: state loaded');

            // Load access state
            let accessRaw = await this.persistence.readKey('chats.access.' + id);
            let hasAccess: boolean;
            if (accessRaw !== 'false' && accessRaw !== 'true') {
                let loadedHasAccess = await this.api.loadChatAccess(id);
                hasAccess = await this.persistence.inTx(async (tx) => {
                    // NOTE: Do not ovewrite existing flag in case of race condition
                    let ex = await tx.read('chats.access.' + id);
                    if (ex !== 'false' && ex !== 'true') {
                        tx.write('chats.access.' + id, loadedHasAccess ? 'true' : 'false');
                        if (loadedHasAccess) {
                            if (this.onChatGotAccess) {
                                await this.onChatGotAccess(id, tx);
                            }
                        } else {
                            if (this.onChatLostAccess) {
                                await this.onChatLostAccess(id, tx);
                            }
                        }
                        return loadedHasAccess;
                    } else {
                        return ex === 'true';
                    }
                });
            } else {
                hasAccess = accessRaw === 'true';
            }

            console.log('[' + id + ']: has access: ' + hasAccess);

            // Cache state and access
            this.chatStates.set(id, state);
            this.chatAccess.set(id, hasAccess);

            // Start subscription if needed
            if (hasAccess) {
                this.startChatSubscription(id);
            }
        });
    }

    //
    // Start/Stop Chat Subscription
    //

    private startChatSubscription = (id: string) => {
        // Ignore already started
        if (this.chatSubscriptions.has(id)) {
            return;
        }
        if (!this.chatStates.has(id)) {
            return;
        }

        // Get state
        let startState = this.chatStates.get(id);

        // Subscribe
        let subscription = this.client.subscribeNewChatUpdates({ state: startState, chatId: id }, (d) => {
            if (d.type === 'stopped') {
                // Automatically restart subscription
                this.chatSubscriptions.delete(id);
                this.startChatSubscription(id);
            } else {
                let updates = d.message.event.__typename === 'ChatUpdateBatch' ? d.message.event.updates : [d.message.event.update];
                let state = d.message.event.state;
                this.chatStates.set(id, state);

                // Handle updates
                this.updatesLock.inLock(async () => {
                    await this.persistence.inTx(async (tx) => {
                        await this.handleChatUpdates(id, updates, tx);
                        tx.write('chat.state.' + id, state);
                    });
                });
            }
        });
        this.chatSubscriptions.set(id, subscription);
    }

    private stopChatSubscription = (id: string) => {
        let subscription = this.chatSubscriptions.get(id);
        this.chatSubscriptions.delete(id);
        if (subscription) {
            subscription.destroy();
        }
    }
}