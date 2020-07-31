import { Message } from './Message';

export interface MessageView {

    readonly closed: boolean;
    close(): void;

    onMessagesLostAccess(): void;
    onMessagesGotAccess(): void;
    onMessagesReceived(messages: Message[]): void;
    onMessagesUpdated(messages: Message[]): void;
    onMessagesDeleted(messages: string[]): void;
}