import { MessageFullFragment } from 'openland-api/Types';
import { PendingMessage } from './types';

export class ConversationState {
    readonly loading: boolean;
    readonly messages: (MessageFullFragment | PendingMessage)[];
    constructor(loading: boolean, messages: (MessageFullFragment | PendingMessage)[]) {
        this.loading = loading;
        this.messages = messages;
    }
}