import { MessageFullFragment } from 'openland-api/Types';

export class ConversationState {
    readonly loading: boolean;
    readonly messages: MessageFullFragment[];
    constructor(loading: boolean, messages: MessageFullFragment[]) {
        this.loading = loading;
        this.messages = messages;
    }
}