import * as React from 'react';
import { ApolloClient } from 'apollo-client';
import { backoff } from 'openland-x-utils/timer';
import { Badge } from '../utils/Badge';
import { MessageSender } from './MessageSender';
import { ConversationEngine } from './ConversationEngine';
import { Visibility } from '../utils/Visibility';
import { GlobalStateEngine } from './GlobalStateEngine';
import { Router } from '../../../routes';

export class MessengerEngine {
    readonly client: ApolloClient<{}>;
    readonly sender: MessageSender;
    readonly global: GlobalStateEngine;
    private readonly visibility: Visibility;
    private readonly badge: Badge;
    private readonly activeConversations = new Map<string, ConversationEngine>();
    private readonly mountedConversations = new Map<string, { count: number, unread: number }>();

    private isVisible = true;
    private notify = backoff(() => import('notifyjs'));
    private close: any = null;

    constructor(client: ApolloClient<{}>) {
        this.client = client;
        this.global = new GlobalStateEngine(this);
        this.sender = new MessageSender(client);
        this.visibility = new Visibility(this.handleVisibleChanged);
        this.badge = new Badge();

        this.badge.init();
        this.notify.then((v) => {
            if ((v as any).needsPermission && (v as any).isSupported()) {
                (v as any).requestPermission();
            }
        });
        this.global.start(this.handleGlobalCounterChanged, this.handleIncomingMessage);
        console.warn('MessengerEngine started');
    }

    destroy() {
        this.global.destroy();
        this.visibility.destroy();
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

    private handleGlobalCounterChanged = (counter: number) => {
        if (this.isVisible) {
            this.badge.badge(counter);
        }
    }

    private handleIncomingMessage = (msg: any) => {
        let conversationId = msg.conversationId;
        var audio = new Audio('/static/sounds/notification.mp3');
        audio.play();
        this.notify.then((v) => {
            if (!(v as any).needsPermission) {
                if (this.close) {
                    this.close.close();
                    this.close = null;
                }
                let not = new (v as any)('New Message', {
                    body: 'You got new message!',
                    notifyClick: () => {
                        if (this.close) {
                            this.close.close();
                            this.close = null;
                        }
                        Router.replaceRoute('/mail/' + conversationId);
                        window.focus();
                    }
                });
                this.close = not;
                not.show();
            }
        });

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
        if (this.isVisible) {
            if (this.close) {
                this.close.close();
                this.close = null;
            }
            for (let m of this.mountedConversations) {
                this.handleConversationVisible(m[0]);
            }
            this.badge.badge(0);
        } else {
            for (let m of this.mountedConversations) {
                this.handleConversationVisible(m[0]);
            }
        }
    }
}

export const MessengerContext = React.createContext<MessengerEngine>(undefined as any);