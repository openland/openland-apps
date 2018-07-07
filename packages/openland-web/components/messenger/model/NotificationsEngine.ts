import { MessengerEngine } from './MessengerEngine';
import { Notifications } from './utils/Notifications';
import { Badge } from './utils/Badge';

export class NotificationsEngine {
    notifications = new Notifications();
    readonly engine: MessengerEngine;
    readonly badge: Badge;
    private isVisible = true;

    constructor(engine: MessengerEngine) {
        this.engine = engine;
        this.badge = new Badge();
        this.badge.init();
    }

    handleVisibleChanged = (isVisible: boolean) => {
        this.isVisible = isVisible;
        if (this.isVisible) {
            this.badge.badge(0);
        }
    }

    handleGlobalCounterChanged = (counter: number) => {
        if (this.isVisible) {
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