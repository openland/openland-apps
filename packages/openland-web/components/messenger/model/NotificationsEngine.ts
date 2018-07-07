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
        let conversationId = msg.conversationId;
        var audio = new Audio('/static/sounds/notification.mp3');
        audio.play();
        this.notifications.displayNotification('New Message', 'You got new message!', '/mail/' + conversationId);
    }
}