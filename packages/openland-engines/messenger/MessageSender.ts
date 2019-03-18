import UUID from 'uuid/v4';
import { UploadingFile, UploadStatus } from './types';
import { UserShort } from 'openland-api/Types';
import { OpenlandClient } from 'openland-api/OpenlandClient';
export interface MessageSendHandler {
    onProgress(key: string, progress: number): void;
    onCompleted(key: string): void;
    onFailed(key: string): void;
}

type MessageBodyT = {
    conversationId: string;
    message: string | null;
    file: string | null;
    replyMessages: string[] | null;
    mentions: UserShort[] | null;
};

export class MessageSender {
    private client: OpenlandClient;
    private uploadedFiles = new Map<string, string>();
    private pending = new Map<string, MessageBodyT>();

    constructor(client: OpenlandClient) {
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
        mentions: UserShort[] | null;
        callback: MessageSendHandler;
    }) {
        message = message.trim();
        if (message.length === 0) {
            throw Error('Message can\'t be empty');
        }
        let key = UUID();

        this.doSendMessage({
            file: null,
            mentions,
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
        message,
        mentions
    }: {
        conversationId: string;
        message: string;
        mentions: UserShort[] | null;
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
                mentions,
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

        const { mentions: mentionsToStrings, ...restMessageBody } = messageBody;
        (async () => {
            let start = Date.now();
            try {
                await this.client.mutateSendMessage({
                    repeatKey: key,
                    mentions: mentionsToStrings ? mentionsToStrings.map(({ id }) => id) : null,
                    message,
                    file,
                    replyMessages,
                    room: conversationId
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
