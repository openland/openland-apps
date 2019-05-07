import UUID from 'uuid/v4';
import { UploadingFile, UploadStatus } from './types';
import { UserShort, MentionInput, FileAttachmentInput } from 'openland-api/Types';
import { OpenlandClient } from 'openland-api/OpenlandClient';
import { Track } from 'openland-engines/Tracking';
import { prepareLegacyMentions, prepareLegacyMentionsForSend } from 'openland-engines/legacy/legacymentions';
export interface MessageSendHandler {
    onProgress(key: string, progress: number): void;
    onCompleted(key: string): void;
    onFailed(key: string): void;
}

type MessageBodyT = {
    conversationId: string;
    message: string | null;
    fileAttachments: FileAttachmentInput[] | null;
    replyMessages: string[] | null;
    mentions: MentionInput[] | null;
    quoted?: string[];
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
                fileAttachments: [{ fileId: uuid }],
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
        console.log('MessageSender sendFile');
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
                fileAttachments: [{ fileId: this.uploadedFiles.get(key)!! }],
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
        callback,
        quoted,
    }: {
        conversationId: string;
        message: string;
        mentions: UserShort[] | null;
        callback: MessageSendHandler;
        quoted?: string[];
    }) {
        message = message.trim();
        if (message.length === 0 && (!quoted || (quoted && quoted.length === 0))) {
            throw Error('Message can\'t be empty');
        }
        let key = UUID();

        this.doSendMessage({
            fileAttachments: null,
            mentions: prepareLegacyMentionsForSend(message, mentions || []),
            conversationId,
            message,
            key,
            callback,
            replyMessages: quoted || null
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
        fileAttachments,
        replyMessages,
        mentions,
        key,
        callback,
    }: MessageBodyT & {
        key: string;
        callback: MessageSendHandler;
    }) {
        const messageBody = {
            room: conversationId,
            message,
            fileAttachments,
            conversationId,
            replyMessages,
            mentions,
        };

        this.pending.set(key, messageBody);

        (async () => {
            let start = Date.now();
            try {
                await this.client.mutateSendMessage({
                    repeatKey: key,
                    mentions,
                    message,
                    fileAttachments,
                    replyMessages,
                    chatId: conversationId,
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
