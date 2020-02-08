import { UserShort } from 'openland-api/spacex.types';
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
    sender: UserShort;
    messages: ModelMessage[];
}

export class ConversationState {
    readonly loading: boolean;
    readonly loadingHistory: boolean;
    readonly historyFullyLoaded: boolean;
    readonly messages: ModelMessage[];
    readonly messagesPrepprocessed: Day[];
    readonly typing: string | undefined;
    readonly loadingForward: boolean;
    readonly forwardFullyLoaded: boolean;

    constructor(loading: boolean, messages: ModelMessage[], messagesPrepprocessed: Day[], typing: string | undefined, loadingHistory: boolean, historyFullyLoaded: boolean, loadingForward: boolean, forwardFullyLoaded: boolean) {
        this.loading = loading;
        this.messages = messages;
        this.messagesPrepprocessed = messagesPrepprocessed;
        this.typing = typing;
        this.loadingHistory = loadingHistory;
        this.historyFullyLoaded = historyFullyLoaded;
        this.loadingForward = loadingForward;
        this.forwardFullyLoaded = forwardFullyLoaded;
    }
}