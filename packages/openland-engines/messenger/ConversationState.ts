import { MessageFullFragment, UserShortFragment } from 'openland-api/Types';
import { PendingMessage, ModelMessage } from './types';

export interface Day {
    key: string;
    day: number;
    month: number;
    year: number;
    messages: MessageGroup[];
}

export interface MessageGroup {
    key: string;
    sender: UserShortFragment;
    messages: ModelMessage[];
}

export class ConversationState {
    readonly loading: boolean;
    readonly messages: ModelMessage[];
    readonly messagesPrepprocessed: Day[];

    constructor(loading: boolean, messages: ModelMessage[], messagesPrepprocessed: Day[]) {
        this.loading = loading;
        this.messages = messages;
        this.messagesPrepprocessed = messagesPrepprocessed;
    }
}