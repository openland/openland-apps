import * as React from 'react';
import { MessageSender } from './messenger/MessageSender';
import { ConversationEngine } from './messenger/ConversationEngine';
import { GlobalStateEngine } from './messenger/GlobalStateEngine';
import { UserShortFragment } from 'openland-api/Types';
import { NotificationsEngine } from './NotificationsEngine';
import { OpenApolloClient } from 'openland-y-graphql/apolloClient';
import { AppVisibility } from 'openland-y-runtime/AppVisibility';
export class MessengerEngine {
    readonly client: OpenApolloClient;
    readonly sender: MessageSender;
    readonly global: GlobalStateEngine;
    readonly user: UserShortFragment;
    readonly notifications: NotificationsEngine;
    private readonly activeConversations = new Map<string, ConversationEngine>();
    private readonly mountedConversations = new Map<string, { count: number, unread: number }>();

    private isVisible = true;
    private close: any = null;

    constructor(client: OpenApolloClient, user: UserShortFragment) {
        this.client = client;
        this.user = user;
        this.global = new GlobalStateEngine(this);
        this.sender = new MessageSender(client);
        
        // Visibility
        AppVisibility.watch(this.handleVisibleChanged);
        this.handleVisibleChanged(AppVisibility.isVisible);

        // Notifications
        this.notifications = new NotificationsEngine(this);

        // Starting
        this.global.start(this.notifications.handleGlobalCounterChanged, this.notifications.handleIncomingMessage);
        console.warn('MessengerEngine started');
    }

    destroy() {
        this.global.destroy();
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
    }
}

export const MessengerContext = React.createContext<MessengerEngine>(undefined as any);