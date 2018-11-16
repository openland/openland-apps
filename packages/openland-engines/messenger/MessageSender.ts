import UUID from 'uuid/v4';
import { SendMessageMutation } from 'openland-api/SendMessageMutation';
import { OpenApolloClient } from 'openland-y-graphql/apolloClient';
import { UploadingFile, UploadStatus } from './types';

export interface MessageSendHandler {
    onProgress(key: string, progress: number): void;
    onCompleted(key: string): void;
    onFailed(key: string): void;
}

type MessageBodyT = {
    conversationId: string;
    message: string | null;
    file: string | null;
    replyMessages: number[] | null;
    mentions: number[] | null;
};

export class MessageSender {
    private client: OpenApolloClient;
    private uploadedFiles = new Map<string, string>();
    private pending = new Map<string, MessageBodyT>();

    constructor(client: OpenApolloClient) {
        this.client = client;
    }

    async sendFileDirect(conversationId: string, uuid: string) {
        await new Promise<void>((resolver, reject) => {
            this.doSendMessage({
                message: null,
                replyMessages: null,
                mentions: null,
                conversationId,
                file: uuid,
                key: UUID(),
                callback: {
                    onProgress(key: string, progress: number) {
                        //
                    },
                    onCompleted(key: string) {
                        resolver();
                    },
                    onFailed(key: string) {
                        reject();
                    }
                }
            });
        });
    }

    sendFile(
        conversationId: string,
        file: UploadingFile,
        callback: MessageSendHandler
    ) {
        let key = UUID();
        (async () => {
            try {
                if (!this.uploadedFiles.has(key)) {
                    let res = await new Promise<string>((resolver, reject) => {
                        file.watch(state => {
                            if (state.status === UploadStatus.FAILED) {
                                reject();
                            } else if (
                                state.status === UploadStatus.UPLOADING
                            ) {
                                callback.onProgress(key, state.progress!!);
                            } else if (
                                state.status === UploadStatus.COMPLETED
                            ) {
                                resolver(state.uuid!!);
                            }
                        });
                    });
                    this.uploadedFiles.set(key, res);
                }
            } catch (e) {
                callback.onFailed(key);
            }
            this.doSendMessage({
                file: this.uploadedFiles.get(key)!!,
                mentions: null,
                replyMessages: null,
                message: null,
                conversationId,
                key,
                callback
            });
        })();
        return key;
    }

    sendMessage({
        conversationId,
        message,
        mentions,
        callback
    }: {
        conversationId: string;
        message: string;
        mentions: number[] | null;
        callback: MessageSendHandler;
    }) {
        message = message.trim();
        if (message.length === 0) {
            throw Error('Message can\'t be empty');
        }
        let key = UUID();

        this.doSendMessage({
            file: null,
            mentions: mentions,
            replyMessages: null,
            conversationId,
            message,
            key,
            callback
        });
        return key;
    }

    async sendMessageAsync({
        conversationId,
        message
    }: {
        conversationId: string;
        message: string;
    }) {
        await new Promise<string>((resolve, reject) => {
            let handler: MessageSendHandler = {
                onCompleted: (key: string) => {
                    resolve();
                },
                onFailed: () => {
                    reject();
                },
                onProgress: () => {
                    // Ignore
                }
            };
            this.sendMessage({
                conversationId,
                message,
                mentions: null,
                callback: handler
            });
        });
    }

    retryMessage(key: string, callback: MessageSendHandler) {
        let messageBody = this.pending.get(key);
        if (messageBody) {
            this.doSendMessage({
                ...messageBody,
                key,
                callback
            });
        }
    }

    private doSendMessage({
        conversationId,
        message,
        file,
        replyMessages,
        mentions,
        key,
        callback
    }: MessageBodyT & {
        key: string;
        callback: MessageSendHandler;
    }) {
        const messageBody = {
            room: conversationId,
            message,
            file,
            conversationId,
            replyMessages,
            mentions
        };

        this.pending.set(key, messageBody);
        (async () => {
            let start = Date.now();
            try {
                await this.client.client.mutate({
                    mutation: SendMessageMutation.document,
                    variables: {
                        repeatKey: key,
                        ...messageBody
                    }
                });
            } catch (e) {
                if (
                    e.graphQLErrors &&
                    e.graphQLErrors.find((v: any) => v.doubleInvoke === true)
                ) {
                    // Ignore
                } else {
                    // Just ignore for now
                    console.warn(e);
                    callback.onFailed(key);
                    return;
                }
            }
            console.log('Message sent in ' + (Date.now() - start) + ' ms');
            this.pending.delete(key);
            callback.onCompleted(key);
        })();
    }
}
