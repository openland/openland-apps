import * as React from 'react';
import { MessageSender } from './messenger/MessageSender';
import { ConversationEngine } from './messenger/ConversationEngine';
import { GlobalStateEngine } from './messenger/GlobalStateEngine';
import { UserShort } from 'openland-api/Types';
import { NotificationsEngine } from './NotificationsEngine';
import { OpenApolloClient } from 'openland-y-graphql/apolloClient';
import { AppVisibility } from 'openland-y-runtime/AppVisibility';
import { TypingEngine, TypingsWatcher } from './messenger/Typings';
import { OnlineWatcher } from './messenger/Online';
import { DialogListEngine } from './messenger/DialogListEngine';
import { CallEngine } from './messenger/CallEngine';
import { OnlineReportEngine } from './OnlineReportEngine';

export class MessengerEngine {

    readonly client: OpenApolloClient;
    readonly sender: MessageSender;
    readonly dialogList: DialogListEngine;
    readonly global: GlobalStateEngine;
    readonly onlineReporter: OnlineReportEngine;
    readonly user: UserShort;
    readonly notifications: NotificationsEngine;
    readonly calls: CallEngine;
    private readonly activeConversations = new Map<string, ConversationEngine>();
    private readonly mountedConversations = new Map<string, { count: number, unread: number }>();
    private readonly activeTypings = new Map<string, TypingEngine>();
    // private readonly activeOnlines = new Map<string, OnlineWatcher>();

    private isVisible = true;
    private close: any = null;
    private loadingPromise: Promise<void>;
    private typingsWatcher?: TypingsWatcher;
    private onlineWatcher: OnlineWatcher;

    constructor(client: OpenApolloClient, user: UserShort) {
        // Onlines
        this.onlineWatcher = new OnlineWatcher(client);

        this.client = client;
        this.user = user;

        this.dialogList = new DialogListEngine(this, (data) => {
            this.onlineWatcher.onDialogListChange(data);
        });

        this.global = new GlobalStateEngine(this);
        this.sender = new MessageSender(client);

        // Visibility
        AppVisibility.watch(this.handleVisibleChanged);
        this.handleVisibleChanged(AppVisibility.isVisible);

        // Notifications
        this.notifications = new NotificationsEngine(this);

        // Typings
        this.typingsWatcher = new TypingsWatcher(this.client, this.handleTyping, this.user.id);

        // Online reporter
        this.onlineReporter = new OnlineReportEngine(this);

        // Calls
        this.calls = new CallEngine(this);

        // Starting
        this.loadingPromise = this.loadingSequence();
        console.info('MessengerEngine started');
    }

    private loadingSequence = async () => {
        await this.global.start();
        await this.calls.start();
    }

    handleTyping = (conversationId: string, data?: { typing: string, users: { userName: string, userPic: string | null, userId: string }[] }) => {
        this.getTypings(conversationId).onTyping(data, conversationId);
        this.getTypings('global_typings').onTyping(data, conversationId);
    }

    awaitLoading() {
        return this.loadingPromise;
    }

    destroy() {
        this.global.destroy();
        this.onlineReporter.destroy();
        AppVisibility.unwatch(this.handleVisibleChanged);
    }

    getConversation(conversationId: string) {
        if (!this.activeConversations.has(conversationId)) {
            let engine = new ConversationEngine(this, conversationId);
            this.activeConversations.set(conversationId, engine);
            engine.start();
        }
        return this.activeConversations.get(conversationId)!!;
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
        this.global.onConversationVisible(conversationId);
    }

    private handleConversationHidden = (conversationId: string) => {
        this.getConversation(conversationId).onClosed();
        this.global.onConversationHidden(conversationId);
    }

    private handleVisibleChanged = (isVisible: boolean) => {
        if (this.isVisible === isVisible) {
            return;
        }
        this.isVisible = isVisible;
        this.global.onVisible(isVisible);
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