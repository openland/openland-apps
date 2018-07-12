import { MessengerEngine } from './MessengerEngine';
import { Notifications } from './utils/Notifications';
import { Badge } from './utils/Badge';
import { PushEngine } from './PushEngine';
import gql from '../../../../../node_modules/graphql-tag';
import { backoff } from 'openland-x-utils/timer';

const FetchPushSettings = gql`
    query FetchPushSettings {
        pushSettings {
            webPushKey
        }
    }
`;

const RegisterPush = gql`
    mutation RegisterPush($endpoint: String!) {
        registerWebPush(endpoint: $endpoint)
    }
`;

export class NotificationsEngine {
    readonly notifications: Notifications;
    readonly engine: MessengerEngine;
    readonly badge: Badge;
    readonly push: PushEngine;
    private isVisible = true;

    constructor(engine: MessengerEngine) {
        this.engine = engine;
        this.notifications = new Notifications(this.handleGranted);
        this.badge = new Badge();
        this.badge.init();
        this.push = new PushEngine(this.handlePushRegistration);
    }

    handleGranted = () => {
        (async () => {
            let settings = await backoff(async () => await this.engine.client.query({
                query: FetchPushSettings
            }));
            let key = (settings.data as any).pushSettings.webPushKey;
            if (key) {
                this.push.startPush({ applicationKey: key });
            } else {
                this.push.startPush({});
            }
        })();
    }

    handlePushRegistration = (endpoint: string) => {
        backoff(async () => await this.engine.client.mutate({
            mutation: RegisterPush,
            variables: {
                endpoint
            }
        }));
    }

    handleVisibleChanged = (isVisible: boolean) => {
        this.isVisible = isVisible;
        if (this.isVisible) {
            this.badge.badge(0);
        }
    }

    handleGlobalCounterChanged = (counter: number) => {
        if (!this.isVisible) {
            this.badge.badge(counter);
        }
    }

    handleIncomingMessage = (msg: any) => {
        let conversationId = msg.conversation.flexibleId;
        var audio = new Audio('/static/sounds/notification.mp3');
        audio.play();
        if (msg.message.message) {
            this.notifications.displayNotification('New Message', msg.message.sender.name + ': ' + msg.message.message, '/mail/' + conversationId, msg.message.sender.picture);
        } else {
            this.notifications.displayNotification('New Message', msg.message.sender.name + ': <file>', '/mail/' + conversationId, msg.message.sender.picture);
        }
    }
}