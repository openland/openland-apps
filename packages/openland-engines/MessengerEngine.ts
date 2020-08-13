import * as React from 'react';
import { MessageSender } from './messenger/MessageSender';
import { ConversationEngine } from './messenger/ConversationEngine';
import { DialogSequenceEngine } from './messenger/DialogSequenceEngine';
import { UserShort, ChatUpdateFragment_ChatMessageReceived, TypingType } from 'openland-api/spacex.types';
import { NotificationsEngine } from './NotificationsEngine';
import { CreateEntityEngine } from './createEntity/CreateEntityState';
import { NotificationCenterEngine } from './NotificationCenterEngine';
import { AppVisibility } from 'openland-y-runtime/AppVisibility';
import { TypingEngine, TypingsWatcher } from './messenger/Typings';
import { OnlineWatcher } from './messenger/Online';
import { DialogListEngine } from './messenger/DialogListEngine';
import { OnlineReportEngine } from './OnlineReportEngine';
import { OpenlandClient } from 'openland-api/spacex';
import { CallsEngine } from './CallsEngine';
import { createLogger } from 'mental-log';
import { UserStorageEngine } from './UserStorageEngine';
import { EngineOptions } from './EnginesOptions';
import { InMemoryKeyValueStore } from 'openland-y-utils/InMemoryKeyValueStore';
import { WalletEngine } from './wallet/WalletEngine';

const log = createLogger('Engine');

export class MessengerEngine {
    readonly client: OpenlandClient;
    readonly sender: MessageSender;
    readonly dialogList: DialogListEngine;
    readonly notificationCenter: NotificationCenterEngine;
    readonly dialogSequence: DialogSequenceEngine;
    readonly onlineReporter: OnlineReportEngine;
    readonly user: UserShort;
    readonly notifications: NotificationsEngine;
    readonly calls: CallsEngine;
    readonly userStorage: UserStorageEngine;
    readonly options: EngineOptions;
    readonly activeConversations = new Map<string, ConversationEngine>();
    readonly wallet: WalletEngine;
    private readonly createEntityState: CreateEntityEngine;
    private readonly activeUserConversations = new Map<string, ConversationEngine>();
    private readonly mountedConversations = new Map<string, { count: number; unread: number }>();
    private readonly activeTypings = new Map<string, TypingEngine>();
    // private readonly activeOnlines = new Map<string, OnlineWatcher>();

    private isVisible = true;
    private close: any = null;
    private loadingPromise: Promise<void>;
    private typingsWatcher: TypingsWatcher;
    private onlineWatcher: OnlineWatcher;

    constructor(client: OpenlandClient, user: UserShort, platform: string, options?: Partial<EngineOptions>) {
        console.log('------------ MessengerEngine initialized ----------');
        this.options = {
            conversationBatchSize: options && options.conversationBatchSize ? options.conversationBatchSize : 15,
            feedBatchSize: options && options.feedBatchSize ? options.feedBatchSize : 15,
            store: options && options.store ? options.store : new InMemoryKeyValueStore()
        };
        this.client = client;
        this.user = user;
        this.calls = new CallsEngine(this);
        this.userStorage = new UserStorageEngine(this);

        // Onlines
        this.onlineWatcher = new OnlineWatcher(this.client);

        this.dialogList = new DialogListEngine(this);
        this.notificationCenter = new NotificationCenterEngine(this);

        this.dialogSequence = new DialogSequenceEngine(this);
        this.sender = new MessageSender(client);

        // Create entity
        this.createEntityState = new CreateEntityEngine();

        // Visibility
        AppVisibility.watch(this.handleVisibleChanged);
        this.handleVisibleChanged(AppVisibility.isVisible);

        // Notifications
        this.notifications = new NotificationsEngine(this);

        // Typings
        this.typingsWatcher = new TypingsWatcher(this.client, this.handleTyping, this.user.id);

        // Online reporter
        this.onlineReporter = new OnlineReportEngine(this, platform);

        // Wallet
        this.wallet = new WalletEngine(this);

        // Starting
        this.loadingPromise = this.loadingSequence();
        log.log('MessengerEngine started');
    }

    private loadingSequence = async () => {
        await this.dialogSequence.start();

        // After sequence
        this.onlineReporter.onReady();
        this.typingsWatcher.onReady();
    }

    handleTyping = (
        conversationId: string,
        data?: {
            typing: string;
            users: { userName: string; userPic: string | null; userId: string; typingType: TypingType; }[];
            typingType: TypingType;
        },
    ) => {
        this.getTypings(conversationId).onTyping(data, conversationId);
        this.getTypings('global_typings').onTyping(data, conversationId);
    }

    awaitLoading() {
        return this.loadingPromise;
    }

    destroy() {
        this.dialogSequence.destroy();
        this.onlineReporter.destroy();
        AppVisibility.unwatch(this.handleVisibleChanged);
    }

    removeConversation(conversationId: string) {
        if (this.activeConversations.has(conversationId)) {
            const conversationToDestroy = this.activeConversations.get(conversationId)!!;
            if (conversationToDestroy.user) {
                this.activeUserConversations.delete(conversationToDestroy.user.id);
            }
            conversationToDestroy.destroy();
            this.activeConversations.delete(conversationId);
        }
    }

    handleNewMessage = (message: ChatUpdateFragment_ChatMessageReceived, cid: string) => {
        this.typingsWatcher.clearTyping(cid, message.message.sender.id);
    }

    getEntityState() {
        return this.createEntityState;
    }

    getConversation(conversationId: string) {
        if (!this.activeConversations.has(conversationId)) {
            let engine = new ConversationEngine(this, conversationId, this.handleNewMessage);
            this.activeConversations.set(conversationId, engine);
            (async () => {
                await engine.start();
                if (engine.user) {
                    this.activeUserConversations.set(engine.user.id, engine);
                }
            })();
        }
        return this.activeConversations.get(conversationId)!!;
    }

    getActiveConversation(id: string) {
        return this.activeConversations.get(id) || this.activeUserConversations.get(id);
    }

    getTypings(conversationId?: string) {
        if (conversationId) {
            if (!this.activeTypings.has(conversationId)) {
                let engine = new TypingEngine();
                this.activeTypings.set(conversationId, engine);
            }
            return this.activeTypings.get(conversationId)!!;
        } else {
            if (!this.activeTypings.has('global_typings')) {
                let engine = new TypingEngine();
                this.activeTypings.set('global_typings', engine);
            }
            return this.activeTypings.get('global_typings')!!;
        }
    }

    getOnlines() {
        return this.onlineWatcher;
    }

    mountConversation(conversationId: string): () => void {
        if (this.mountedConversations.has(conversationId)) {
            this.mountedConversations.get(conversationId)!!.count++;
        } else {
            if (this.isVisible) {
                this.handleConversationVisible(conversationId);
            }
            this.mountedConversations.set(conversationId, { count: 1, unread: 0 });
        }
        return () => {
            let ex = this.mountedConversations.get(conversationId);
            if (ex) {
                if (ex.count === 1) {
                    this.mountedConversations.delete(conversationId);
                    if (this.isVisible) {
                        this.handleConversationHidden(conversationId);
                    }
                } else {
                    ex.count--;
                }
            }
        };
    }

    private handleConversationVisible = (conversationId: string) => {
        this.getConversation(conversationId).onOpen();
        this.dialogSequence.onConversationVisible(conversationId);
    }

    private handleConversationHidden = (conversationId: string) => {
        this.getConversation(conversationId).onClosed();
        this.dialogSequence.onConversationHidden(conversationId);
    }

    private handleVisibleChanged = (isVisible: boolean) => {
        if (this.isVisible === isVisible) {
            return;
        }
        this.isVisible = isVisible;
        if (this.isVisible) {
            if (this.close) {
                this.close.close();
                this.close = null;
            }
            for (let m of this.mountedConversations) {
                this.handleConversationVisible(m[0]);
            }
        } else {
            for (let m of this.mountedConversations) {
                this.handleConversationHidden(m[0]);
            }
        }

        if (this.onlineReporter) {
            this.onlineReporter.onVisible(isVisible);
        }
    }
}

export const MessengerContext = React.createContext<MessengerEngine>(undefined as any);