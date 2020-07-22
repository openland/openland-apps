import { StoredMessage } from './StoredMessage';
import { ChatNewMessageFragment } from 'openland-api/spacex.types';
import { OpenlandClient } from 'openland-api/spacex';

export function convertMessage(src: ChatNewMessageFragment): StoredMessage {
    return {
        id: src.id,
        seq: src.seq!,
        sender: src.sender.id,
        text: src.message,
        fallback: src.fallback
    };
}

export interface MessagesApi {
    loadMessage(id: string): Promise<StoredMessage | null>;
    loadMessagesBefore(id: string, before: string, limit: number): Promise<{ hasMore: boolean, messages: StoredMessage[] } | null>;
    loadMessagesAfter(id: string, after: string, limit: number): Promise<{ hasMore: boolean, messages: StoredMessage[] } | null>;

    loadLastRead(id: string): Promise<string | null>;
    loadChatState(id: string): Promise<string>;
    loadChatAccess(id: string): Promise<boolean>;

    loadDialogsState(): Promise<string>;
}

export class MessagesApiClient implements MessagesApi {
    readonly client: OpenlandClient;

    constructor(client: OpenlandClient) {
        this.client = client;
    }

    loadLastRead = async (id: string) => {
        let res = await this.client.queryChatNewReadLastRead({ chatId: id }, { fetchPolicy: 'network-only' });
        if (res.message) {
            return res.message.id;
        } else {
            return null;
        }
    }

    loadMessage = async (id: string) => {
        let message = await this.client.queryChatNewGetMessage({ id: id }, { fetchPolicy: 'network-only' });
        if (message.message) {
            return convertMessage(message.message);
        } else {
            return null;
        }
    }

    loadMessagesBefore = async (chatId: string, before: string, limit: number) => {
        let response = (await this.client.queryChatNewLoadBefore({ chatId: chatId, before: before, limit: limit }, { fetchPolicy: 'network-only' })).batch;
        if (!response) {
            return null;
        }
        return {
            messages: response.messages.map((v) => convertMessage(v)).reverse(),
            hasMore: response.haveMoreBackward || false
        };
    }

    loadMessagesAfter = async (chatId: string, after: string, limit: number) => {
        let response = (await this.client.queryChatNewLoadAfter({ chatId: chatId, after: after, limit: limit }, { fetchPolicy: 'network-only' })).batch;
        if (!response) {
            return null;
        }
        return {
            messages: response.messages.map((v) => convertMessage(v)).reverse(),
            hasMore: response.haveMoreForward || false
        };
    }

    loadChatState = async (chatId: string) => {
        return ((await this.client.queryChatNewChatState({ chatId }, { fetchPolicy: 'network-only' })).state.state)!;
    }

    loadChatAccess = async (chatId: string): Promise<boolean> => {
        // TODO: Implement
        return true;
    }

    //
    // Dialogs
    //

    loadDialogsState = async () => {
        return (await this.client.queryChatNewDialogsState({ fetchPolicy: 'network-only' })).state.state!;
    }

}