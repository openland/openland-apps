import { WireMessage } from './WireMessage';

export interface MessageView {

    readonly closed: boolean;
    close(): void;

    onMessagesLostAccess(): void;
    onMessagesGotAccess(): void;
    onMessagesReceived(messages: { repeatKey: string | null, message: WireMessage }[]): void;
    onMessagesUpdated(messages: WireMessage[]): void;
    onMessagesDeleted(messages: string[]): void;
}