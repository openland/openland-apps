import { MessengerRuntime } from 'openland-messenger/MessengerRuntime';
import { Badge } from './utils/Badge';

export class WebMessengerRuntime implements MessengerRuntime {

    private badge = new Badge();

    constructor() {
        this.badge.init();
    }
    
    onBadgeChanged(counter: number) {
        //
    }

    displayNotification(title: string, body: string, chatId: string, image?: string) {
        //
    }
}