import { UserShortFragment } from 'openland-api/Types';
import { ModelMessage } from './types';

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
    readonly loadingHistory?: boolean;
    readonly messages: ModelMessage[];
    readonly messagesPrepprocessed: Day[];
    readonly typing?: string;

    constructor(loading: boolean, messages: ModelMessage[], messagesPrepprocessed: Day[], typing?: string, loadingHistory?: boolean) {
        this.loading = loading;
        this.messages = messages;
        this.messagesPrepprocessed = messagesPrepprocessed;
        this.typing = typing;
        this.loadingHistory = loadingHistory;
    }
}