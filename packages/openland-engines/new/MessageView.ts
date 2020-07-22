import { StoredMessage } from './StoredMessage';

export interface MessageView {

    readonly closed: boolean;
    close(): void;

    onMessagesLostAccess(): void;
    onMessagesGotAccess(): void;
    onMessagesReceived(messages: { repeatKey: string | null, message: StoredMessage }[]): void;
    onMessagesUpdated(messages: StoredMessage[]): void;
    onMessagesDeleted(messages: string[]): void;
}