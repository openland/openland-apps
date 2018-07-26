import UUID from 'uuid/v4';
import { SendMessageMutation } from 'openland-api/SendMessageMutation';
import { OpenApolloClient } from 'openland-y-graphql/apolloClient';
import { UploadingFile, UploadStatus } from './types';

export interface MessageSendHandler {
    onProgress(key: string, progress: number): void;
    onCompleted(key: string): void;
    onFailed(key: string): void;
}

export class MessageSender {
    private client: OpenApolloClient;
    private uploadedFiles = new Map<string, string>();
    private pending = new Map<string, { file: string | null, message: string | null, conversationId: string }>();

    constructor(client: OpenApolloClient) {
        this.client = client;
    }

    sendFile(conversationId: string, file: UploadingFile, callback: MessageSendHandler) {
        let key = UUID();
        (async () => {
            try {
                if (!this.uploadedFiles.has(key)) {
                    let res = await new Promise<string>((resolver, reject) => {
                        file.watch((state) => {
                            if (state.status === UploadStatus.FAILED) {
                                reject();
                            } else if (state.status === UploadStatus.UPLOADING) {
                                callback.onProgress(key, state.progress!!);
                            } else if (state.status === UploadStatus.COMPLETED) {
                                resolver(state.uuid!!);
                            }
                        });
                    });
                    this.uploadedFiles.set(key, res);
                }
            } catch (e) {
                callback.onFailed(key);
            }
            this.doSendMessage(conversationId, null, this.uploadedFiles.get(key)!!, key, callback);
        })();
        return key;
    }

    sendMessage(conversationId: string, message: string, callback: MessageSendHandler) {
        message = message.trim();
        if (message.length === 0) {
            throw Error('Message can\'t be empty');
        }
        let key = UUID();
        this.doSendMessage(conversationId, message, null, key, callback);
        return key;
    }

    async sendMessageAsync(conversationId: string, message: string) {
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
            this.sendMessage(conversationId, message, handler);
        });
    }

    retryMessage(key: string, callback: MessageSendHandler) {
        let text = this.pending.get(key);
        if (text) {
            this.doSendMessage(text.conversationId, text.message, text.file, key, callback);
        }
    }

    private doSendMessage(conversationId: string, message: string | null, file: string | null, key: string, callback: MessageSendHandler) {
        this.pending.set(key, { conversationId, message, file });
        (async () => {
            try {
                await this.client.client.mutate({
                    mutation: SendMessageMutation.document,
                    variables: {
                        message: message,
                        file: file,
                        repeatKey: key,
                        conversationId: conversationId
                    }
                });
            } catch (e) {
                if (e.graphQLErrors && e.graphQLErrors.find((v: any) => v.doubleInvoke === true)) {
                    // Ignore
                } else {
                    // Just ignore for now
                    console.warn(e);
                    callback.onFailed(key);
                    return;
                }
            }
            this.pending.delete(key);
            callback.onCompleted(key);
        })();
    }
}