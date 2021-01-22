import UUID from 'uuid/v4';
import { FileMetadata, UploadingFile, UploadStatus } from './types';
import {
    MentionInput,
    FileAttachmentInput,
    MessageSpanInput,
    MyStickers_stickers_packs_stickers,
    StickerFragment,
    MessageSpan_MessageSpanRoomMention_room_SharedRoom,
    MessageSpan_MessageSpanOrganizationMention_organization,
    MessageSpan_MessageSpanUserMention_user,
    // ChatMentionSearch_mentions_globalItems,
} from 'openland-api/spacex.types';
import { OpenlandClient } from 'openland-api/spacex';
import { prepareLegacyMentionsForSend } from 'openland-engines/legacy/legacymentions';
import { Priority } from 'openland-api/Priority';

type ChatMentionT = MessageSpan_MessageSpanRoomMention_room_SharedRoom | MessageSpan_MessageSpanOrganizationMention_organization | MessageSpan_MessageSpanUserMention_user;

export type MentionToSend = ChatMentionT | { __typename: 'AllMention' };

export interface MessageSendHandler {
    onFileProgress(key: string, messageKey: string, progress: number): void;
    onCompleted(key: string): void;
    onFailed(key: string): void;
}

export const MAX_FILES_PER_MESSAGE = 4;

type MessageBodyT = {
    conversationId: string;
    message: string | null;
    fileAttachments: FileAttachmentInput[] | null;
    replyMessages: string[] | null;
    mentions: MentionInput[] | null;
    quoted?: string[];
    spans: MessageSpanInput[] | null;
    sticker: MyStickers_stickers_packs_stickers | null;
};

export class MessageSender {
    private client: OpenlandClient;
    private uploadedFiles = new Map<string, { id: string, meta: FileMetadata }>();
    private pending = new Map<string, MessageBodyT>();

    constructor(client: OpenlandClient) {
        this.client = client;
    }

    sendFile(
        conversationId: string,
        file: UploadingFile,
        callback: MessageSendHandler,
        quoted?: string[],
    ) {
        console.log('MessageSender sendFile');
        let key = UUID();

        (async () => {
            try {
                if (!this.uploadedFiles.has(key)) {
                    let [id, meta] = await Promise.all([
                        new Promise<string>((resolver, reject) => {
                            file.watch(state => {
                                if (state.status === UploadStatus.FAILED) {
                                    reject();
                                } else if (state.status === UploadStatus.UPLOADING) {
                                    callback.onFileProgress(key, key, state.progress!!);
                                } else if (state.status === UploadStatus.COMPLETED) {
                                    resolver(state.uuid!!);
                                }
                            });
                        }),
                        file.fetchInfo()
                    ]);
                    this.uploadedFiles.set(key, { id, meta });
                }
            } catch (e) {
                callback.onFailed(key);
            }
            this.doSendMessage({
                fileAttachments: [{ fileId: this.uploadedFiles.get(key)!!.id }],
                mentions: null,
                replyMessages: quoted || null,
                message: null,
                conversationId,
                key,
                callback,
                spans: null,
                sticker: null,
            });
        })();
        return key;
    }

    sendFiles({
        conversationId,
        files,
        callback,
        quoted,
        message,
        mentions,
        spans
    }: {
        conversationId: string,
        files: UploadingFile[],
        message: string;
        mentions: MentionToSend[] | null;
        callback: MessageSendHandler;
        quoted?: string[];
        spans: MessageSpanInput[] | null;
    }) {
        console.log('MessageSender sendFiles');
        let fileIds: string[] = [];
        let parentKey = UUID();
        let promises = files.slice(0, MAX_FILES_PER_MESSAGE).map(file => {
            let key = UUID();
            fileIds.push(key);
            let p = Promise.all([
                new Promise<string>((resolver, reject) => {
                    file.watch(state => {
                        if (state.status === UploadStatus.FAILED) {
                            reject();
                        } else if (state.status === UploadStatus.UPLOADING) {
                            callback.onFileProgress(key, parentKey, state.progress!!);
                        } else if (state.status === UploadStatus.COMPLETED) {
                            resolver(state.uuid!!);
                        }
                    });
                }),
                file.fetchInfo()
            ]);
            return p.then(([id, meta]) => {
                if (!this.uploadedFiles.has(key)) {
                    this.uploadedFiles.set(key, { id, meta });
                }
            }).catch(e => {
                callback.onFailed(key);
            });
        });
        Promise.all(promises).then(() => {
            this.doSendMessage({
                fileAttachments: fileIds.map(x => ({ fileId: this.uploadedFiles.get(x)!!.id })),
                mentions: prepareLegacyMentionsForSend(message, mentions || []),
                replyMessages: quoted || null,
                message,
                conversationId,
                key: parentKey,
                callback,
                spans,
                sticker: null,
            });
        });
        return { key: parentKey, filesKeys: fileIds };
    }

    shareFile(conversationId: string, fileId: string) {
        console.log('MessageSender shareFile');
        (async () => {
            await this.client.queryRoomPico({
                id: conversationId
            }).then((data) => {
                if (data.room) {
                    this.client.mutateSendMessage({
                        chatId: data.room.id,
                        fileAttachments: [{ fileId: fileId }],
                    });
                }
            }).catch(e => {
                if (e.graphQLErrors && e.graphQLErrors.find((v: any) => v.doubleInvoke === true)) {
                    // Ignore
                } else {
                    // Just ignore for now
                    console.warn(e);
                    return;
                }
            });
        })();
    }

    sendSticker({
        conversationId,
        sticker,
        quoted,
        callback,
    }: {
        conversationId: string;
        sticker: StickerFragment;
        quoted: string[];
        callback: MessageSendHandler;
    }) {
        let key = UUID();

        const messageBody = {
            room: conversationId,
            message: null,
            fileAttachments: null,
            conversationId,
            replyMessages: null,
            mentions: null,
            spans: null,
            sticker,
        };

        this.pending.set(key, messageBody);

        (async () => {
            let start = Date.now();
            try {
                await this.client.mutateSendSticker({
                    chatId: conversationId,
                    stickerId: sticker.id,
                    replyMessages: quoted || null,
                    repeatKey: key,
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
            console.log('sticker sent in ' + (Date.now() - start) + ' ms');

            this.pending.delete(key);
            callback.onCompleted(key);
        })();

        return key;
    }

    sendMessage({
        conversationId,
        message,
        mentions,
        callback,
        quoted,
        spans,
    }: {
        conversationId: string;
        message: string;
        mentions: MentionToSend[] | null;
        callback: MessageSendHandler;
        quoted?: string[];
        spans: MessageSpanInput[] | null;
    }) {
        message = message.trim();
        if (message.length === 0 && (!quoted || (quoted && quoted.length === 0))) {
            throw Error("Message can't be empty");
        }
        let key = UUID();

        this.doSendMessage({
            fileAttachments: null,
            mentions: prepareLegacyMentionsForSend(message, mentions || []),
            conversationId,
            message,
            key,
            callback,
            replyMessages: quoted || null,
            spans,
            sticker: null,
        });
        return key;
    }

    retryMessage(key: string, callback: MessageSendHandler) {
        let messageBody = this.pending.get(key);
        if (messageBody) {
            this.doSendMessage({
                ...messageBody,
                key,
                callback,
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
        spans,
        sticker,
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
            spans,
            sticker,
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
                    spans: spans,
                }, { priority: Priority.LOW });
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
            console.log('Message sent in ' + (Date.now() - start) + ' ms');

            this.pending.delete(key);
            callback.onCompleted(key);
        })();
    }
}
