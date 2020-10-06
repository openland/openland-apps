import { createFifoQueue } from 'openland-y-utils/Queue';
import { MessengerEngine } from '../MessengerEngine';
import { MessageReactionType } from 'openland-api/spacex.types';
import { sequenceWatcher } from 'openland-api/sequenceWatcher';
import { backoff, delay } from 'openland-y-utils/timer';
import {
    UserBadge,
    FullMessage,
    MessageSpan,
    MessageSender,
    FullMessage_GeneralMessage_source,
    FullMessage_StickerMessage_source,
    MessageReactionCounter,
    MessageAttachments,
    ServiceMessageMetadata,
    FullMessage_GeneralMessage,
    FullMessage_StickerMessage,
    DialogUpdateFragment_DialogPeerUpdated_peer,
} from 'openland-api/spacex.types';
import { ConversationState, Day, MessageGroup } from './ConversationState';
import { PendingMessage, isPendingMessage, isServerMessage, UploadingFile, ModelMessage } from './types';
import { MessageSendHandler, MentionToSend, MAX_FILES_PER_MESSAGE } from './MessageSender';
import { DataSource } from 'openland-y-utils/DataSource';
import { prepareLegacyMentions } from 'openland-engines/legacy/legacymentions';
import * as Types from 'openland-api/spacex.types';
import { createLogger } from 'mental-log';
import { SharedMediaEngine, SharedMediaItemType } from 'openland-engines/messenger/SharedMediaEngine';
import { prepareLegacySpans, findSpans } from 'openland-y-utils/findSpans';
import { Span } from 'openland-y-utils/spans/Span';
import { processSpans } from 'openland-y-utils/spans/processSpans';
import { AppConfig } from 'openland-y-runtime/AppConfig';
import { GraphqlActiveSubscription } from '@openland/spacex';
import { LocalImage } from 'openland-engines/messenger/types';

const log = createLogger('Engine-Messages');

export interface ConversationStateHandler {
    onConversationUpdated(state: ConversationState): void;
    onMessageSend(file?: UploadingFile, localImage?: LocalImage): void;
    onChatLostAccess(): void;
}

const timeGroup = 1000 * 60 * 60;

type DataSourceMessageSourceT = FullMessage_GeneralMessage_source | FullMessage_StickerMessage_source;

export type PendingAttachProps = { uri?: string, key?: string, filePreview?: string | null, progress?: number };

export interface DataSourceMessageItem {
    chatId: string;
    type: 'message';
    key: string;
    id?: string;
    seq: null | number;
    date: number;
    isOut: boolean;
    sender: MessageSender;
    senderBadge?: UserBadge;
    text?: string;
    isEdited?: boolean;
    reply?: DataSourceMessageItem[];
    source?: DataSourceMessageSourceT | null;
    reactionCounters: MessageReactionCounter[];
    attachments?: (MessageAttachments & PendingAttachProps)[];
    spans?: MessageSpan[];
    isSending: boolean;
    attachTop: boolean;
    attachBottom: boolean;
    serviceMetaData?: ServiceMessageMetadata;
    isService?: boolean;
    commentsCount: number;
    fallback: string;
    textSpans: Span[];
    failed?: boolean;
    sticker?: Types.StickerFragment;
    overrideAvatar?: Types.FullMessage_GeneralMessage_overrideAvatar | null;
    overrideName?: string | null;

    // legacy
    isSubscribedMessageComments?: boolean;
    replyQuoteText?: string | null;
    peerRootId?: string;
    peerRootType?: 'CommentPeerRootMessage' | 'CommentPeerRootFeedItem' | 'CommentPeerRootPost';
    notificationId?: string;
    notificationType?: 'new_comment' | 'unsupported';
    room?: Types.RoomNano;
}

export interface DataSourceDateItem {
    type: 'date';
    key: string;
    date: number;
    month: number;
    year: number;
}

export interface DataSourceNewDividerItem {
    key: string;
    type: 'new_divider';
    date: undefined;
}

const getReplies = (src: FullMessage_GeneralMessage | FullMessage_StickerMessage | undefined, chaId: string, engine: MessengerEngine) => {
    return src && src.quotedMessages ? src.quotedMessages.sort((a, b) => a.date - b.date).map(m => convertMessage(m as FullMessage, chaId, engine)) : undefined;
};

const getSourceChat = (src: FullMessage_GeneralMessage | FullMessage_StickerMessage | undefined) => {
    return src && src.source && src.source.__typename === 'MessageSourceChat' ? src.source : undefined;
};

const getCommentsCount = (src: FullMessage_GeneralMessage | FullMessage_StickerMessage | undefined) => {
    return src ? src.commentsCount : 0;
};

const getOverrides = (src: FullMessage | undefined) => {
    return src ? (src.__typename === 'GeneralMessage' || src.__typename === 'StickerMessage' ? { overrideAvatar: src.overrideAvatar, overrideName: src.overrideName } : {}) : {};
};

const getCanReply = (room: Types.ChatInit_room | Types.ChatInitFromUnread_room | null) => {
    return room && (room.__typename === 'PrivateRoom' || room.repliesEnabled) || false;
};

type RecursivePartial<T> = {
    [P in keyof T]?: RecursivePartial<T[P]>;
};

export function convertPartialMessage(src: RecursivePartial<FullMessage> & { id: string }, chatId: string, engine: MessengerEngine): DataSourceMessageItem {
    const genericGeneralMessage: FullMessage = {
        __typename: "GeneralMessage",
        id: 'will_be_overriten',
        seq: null,
        sender: {} as any,
        attachments: [],
        date: null,
        fallback: "Unknow message type",
        senderBadge: null,
        edited: false,
        message: null,
        source: null,
        commentsCount: 0,
        quotedMessages: [],
        reactionCounters: [],
        spans: [],
        overrideAvatar: null,
        overrideName: null
    };
    return convertMessage({ ...genericGeneralMessage, ...src as FullMessage }, chatId, engine);
}

export function convertMessage(src: FullMessage & { repeatKey?: string }, chatId: string, engine: MessengerEngine, prev?: FullMessage, next?: FullMessage): DataSourceMessageItem {
    const generalMessage = src.__typename === 'GeneralMessage' ? src : undefined;
    const serviceMessage = src.__typename === 'ServiceMessage' ? src : undefined;
    const stickerMessage = src.__typename === 'StickerMessage' ? src : undefined;

    return {
        chatId,
        type: 'message',
        id: src.id,
        seq: src.seq,
        key: src.repeatKey || src.id,
        date: parseInt(src.date, 10),
        isOut: src.sender.id === engine.user.id,
        senderBadge: src.senderBadge || undefined,
        sender: src.sender,
        text: src.message || undefined,
        isSending: false,
        attachTop: next ? (next.sender.id === src.sender.id) && isSameDate(next.date, src.date) && (src.date - next.date < timeGroup) && ((next.__typename === 'ServiceMessage') === (src.__typename === 'ServiceMessage')) : false,
        attachBottom: prev ? prev.sender.id === src.sender.id && isSameDate(prev.date, src.date) && (prev.date - src.date < timeGroup) && ((prev.__typename === 'ServiceMessage') === (src.__typename === 'ServiceMessage')) : false,
        reactionCounters: generalMessage ? generalMessage.reactionCounters : stickerMessage ? stickerMessage.reactionCounters : [],
        serviceMetaData: serviceMessage && serviceMessage.serviceMetadata || undefined,
        isService: !!serviceMessage,
        attachments: generalMessage && generalMessage.attachments,
        reply: getReplies(generalMessage || stickerMessage, chatId, engine),
        source: getSourceChat(generalMessage || stickerMessage),
        isEdited: generalMessage && generalMessage.edited,
        spans: src.spans || [],
        commentsCount: getCommentsCount(generalMessage || stickerMessage),
        fallback: src.fallback || src.message || '',
        textSpans: src.message ? processSpans(src.message, src.spans) : [],
        sticker: stickerMessage ? stickerMessage.sticker : undefined,
        ...getOverrides(src)
    };
}

export function convertMessageBack(src: DataSourceMessageItem): Types.FullMessage {
    let res = {
        __typename: src.isService ? 'ServiceMessage' as 'ServiceMessage' : !!src.sticker ? 'StickerMessage' : 'GeneralMessage' as any,
        id: src.id!,
        seq: src.seq,
        date: src.date,
        message: src.text || null,
        fallback: src.fallback || 'unknown message type',
        sender: src.sender,
        senderBadge: src.senderBadge || null,
        spans: src.spans || [],
        commentsCount: src.commentsCount || 0,
        attachments: src.attachments || [],
        edited: !!src.isEdited,
        quotedMessages: [],
        reactionCounters: [],
        source: src.source || null,
        sticker: src.sticker,
        overrideAvatar: src.overrideAvatar || null,
        overrideName: src.overrideName || null
    };

    return res;
}

function isSameIntDate(a1: number, b1: number) {
    let a2 = new Date(a1);
    let b2 = new Date(b1);
    return (a2.getFullYear() === b2.getFullYear() && a2.getMonth() === b2.getMonth() && a2.getDate() === b2.getDate());
}

export function isSameDate(a: string, b: string) {
    let a1 = parseInt(a, 10);
    let b1 = parseInt(b, 10);
    return isSameIntDate(a1, b1);
}

const createDateDataSourceItem = (date: Date): DataSourceDateItem => {
    return {
        type: 'date',
        key: 'date-' + date.getFullYear() + '-' + date.getMonth() + '-' + date.getDate(),
        date: date.getDate(),
        month: date.getMonth(),
        year: date.getFullYear()
    };
};

const createNewMessageDividerSourceItem = (messageId: string): DataSourceNewDividerItem => {
    return {
        type: 'new_divider',
        date: undefined,
        key: 'new_divider-' + messageId,
    };
};

export const PENDING_MESSAGE_ATTACH_ID = 'pending_message_attach_file_id';
export const isPendingAttach = (message: DataSourceMessageItem) => message.attachments
    && message.attachments[0]
    && message.attachments[0].__typename === 'MessageAttachmentFile'
    && message.attachments[0].id === PENDING_MESSAGE_ATTACH_ID;

export class ConversationEngine implements MessageSendHandler {
    readonly engine: MessengerEngine;
    readonly conversationId: string;
    readonly dataSource: DataSource<DataSourceMessageItem | DataSourceDateItem | DataSourceNewDividerItem>;
    // private readonly dataSourceLogger: DataSourceLogger<DataSourceMessageItem | DataSourceDateItem | DataSourceNewDividerItem>;
    historyFullyLoaded?: boolean;
    forwardFullyLoaded?: boolean;

    private isStarted = false;
    private isStarting = false;
    private gen = 0;
    private loadFrom: 'unread' | 'end' = 'unread';
    private watcher: GraphqlActiveSubscription<Types.ChatWatch> | null = null;
    private updateQueue = createFifoQueue<Types.ChatWatch_event_ChatUpdateBatch_updates>();
    private isOpen = false;
    private messages: ModelMessage[] = [];
    private state: ConversationState;
    private lastTopMessageRead: string | null = null;
    lastReadedDividerMessageId?: string;
    private listeners: ConversationStateHandler[] = [];
    private loadingHistory?: string = undefined;
    private loadingForward?: string = undefined;
    private localMessagesMap = new Map<string, string>();
    private sharedMediaEngines: Record<SharedMediaItemType, SharedMediaEngine> | {};
    readonly onNewMessage: (event: Types.ChatUpdateFragment_ChatMessageReceived, cid: string) => void;

    role?: Types.RoomMemberRole | null;
    canEdit?: boolean;
    canPin?: boolean;
    canReply?: boolean;
    pinId: string | null;
    canSendMessage?: boolean;
    isChannel?: boolean;
    isPrivate?: boolean;
    user?: Types.ChatInit_room_PrivateRoom_user;
    badge?: UserBadge;
    isSavedMessage?: boolean;

    constructor(engine: MessengerEngine, conversationId: string, onNewMessage: (event: Types.ChatUpdateFragment_ChatMessageReceived, cid: string) => void) {
        this.engine = engine;
        this.conversationId = conversationId;
        this.pinId = null;
        this.state = new ConversationState(true, [], [], undefined, false, false, false, false);
        this.dataSource = new DataSource(() => {
            this.load('backward');
        }, () => {
            this.load('forward');
        });
        // this.dataSourceLogger = new DataSourceLogger('conv:' + conversationId, this.dataSource);

        this.sharedMediaEngines = {};
        this.onNewMessage = onNewMessage;

        (async () => {
            while (true) {
                let m = await this.updateQueue.get();
                await backoff(() => this.updateHandler(m));
            }
        })();
    }

    restart = async (from: 'end' | 'unread') => {
        if (this.isStarting) {
            return;
        }
        this.isStarted = false;
        this.isStarting = true;
        this.historyFullyLoaded = false;
        this.forwardFullyLoaded = false;
        this.lastTopMessageRead = null;
        this.lastReadedDividerMessageId = undefined;
        this.loadingHistory = undefined;
        this.loadingForward = undefined;
        this.gen++;
        this.loadFrom = from;
        await this.start(true);
    }

    start = async (reset?: boolean) => {
        if (this.isStarted) {
            throw Error('ConversationEngine already started!');
        }
        this.isStarting = true;
        this.isStarted = true;
        log.log('Loading initial state for ' + this.conversationId);
        let initialChat = await backoff(async () => {
            try {
                let history;
                if (this.loadFrom === 'unread') {
                    history = await this.engine.client.queryChatInitFromUnread({ chatId: this.conversationId, first: this.engine.options.conversationBatchSize }, { fetchPolicy: 'network-only' });
                    history = { ...history, messages: history.gammaMessages!.messages };
                    this.historyFullyLoaded = !history.gammaMessages!.haveMoreBackward;
                    this.forwardFullyLoaded = !history.gammaMessages!.haveMoreForward;
                } else {
                    history = await this.engine.client.queryChatInit({ chatId: this.conversationId, first: this.engine.options.conversationBatchSize }, { fetchPolicy: 'network-only' });
                    this.historyFullyLoaded = this.historyFullyLoaded || history.messages.length < this.engine.options.conversationBatchSize;
                    this.forwardFullyLoaded = true;
                }
                return history;
            } catch (e) {
                log.warn(e);
                throw e;
            }
        });
        if (!this.isStarted) {
            return;
        }
        let messages = [...(initialChat).messages];
        messages.reverse();
        this.messages = messages;
        this.pinId = (initialChat.room && initialChat.room.pinnedMessage) ? initialChat.room.pinnedMessage.id : null;
        this.role = initialChat.room && initialChat.room.__typename === 'SharedRoom' && initialChat.room.role || null;
        this.badge = initialChat.room && initialChat.room.myBadge || undefined;
        this.canEdit = ((initialChat.room && initialChat.room.__typename === 'SharedRoom' && initialChat.room.canEdit) || AppConfig.isSuperAdmin()) || false;
        this.canPin = this.canEdit || (initialChat.room && initialChat.room.__typename === 'PrivateRoom') || false;
        this.canReply = getCanReply(initialChat.room);
        this.canSendMessage = (initialChat.room && initialChat.room.__typename === 'SharedRoom' && initialChat.room.kind !== 'INTERNAL') ? initialChat.room.canSendMessage :
            (initialChat.room && initialChat.room.__typename === 'PrivateRoom') ? !initialChat.room.user.isBot :
                true;
        this.isChannel = initialChat.room && initialChat.room.__typename === 'SharedRoom' ? initialChat.room.isChannel : false;
        this.isPrivate = initialChat.room && initialChat.room.__typename === 'PrivateRoom' ? true : false;
        if (initialChat.room && initialChat.room.__typename === 'PrivateRoom') {
            this.user = initialChat.room.user;
            this.isSavedMessage = initialChat.room.user.id === this.engine.user.id;
        }

        this.state = new ConversationState(false, messages, this.groupMessages(messages), this.state.typing, this.state.loadingHistory, !!this.historyFullyLoaded, this.state.loadingForward, !!this.forwardFullyLoaded);
        log.log('Initial state for ' + this.conversationId);
        let startSubscription = this.forwardFullyLoaded;
        if (startSubscription) {
            sequenceWatcher<Types.ChatWatch>(initialChat.state.state, (state, handler) => this.engine.client.subscribeChatWatch({ chatId: this.conversationId, state }, handler), this.updateBaseHandler);
        }
        this.onMessagesUpdated();

        // Update Data Source
        let dsItems: (DataSourceMessageItem | DataSourceDateItem | DataSourceNewDividerItem)[] = [];
        let sourceFragments = messages as FullMessage[];
        let prevDate: string | undefined;
        let newMessagesDivider: DataSourceNewDividerItem | undefined;
        let anchor;
        for (let i = sourceFragments.length - 1; i >= 0; i--) {

            if (this.loadFrom === 'unread') {
                // append unread mark
                if ((initialChat.lastReadedMessage && initialChat.lastReadedMessage.id) && sourceFragments[i].id === (initialChat.lastReadedMessage && initialChat.lastReadedMessage.id) && i !== sourceFragments.length - 1) {
                    // Alert.alert(sourceFragments[i].id);
                    newMessagesDivider = createNewMessageDividerSourceItem(sourceFragments[i].id);
                    anchor = newMessagesDivider.key;
                    dsItems.push(newMessagesDivider);
                    this.lastReadedDividerMessageId = initialChat.lastReadedMessage && initialChat.lastReadedMessage.id;
                }
            }

            // Append new date if needed
            if (prevDate && !isSameDate(prevDate, sourceFragments[i].date)) {
                let d = new Date(parseInt(prevDate, 10));
                dsItems.push(createDateDataSourceItem(d));
            }

            dsItems.push(convertMessage(sourceFragments[i], this.conversationId, this.engine, sourceFragments[i + 1], sourceFragments[i - 1]));
            prevDate = sourceFragments[i].date;
        }

        if (this.historyFullyLoaded && prevDate) {
            let d = new Date(parseInt(prevDate, 10));
            dsItems.push(createDateDataSourceItem(d));
        }

        this.dataSource.initialize(dsItems, !!this.historyFullyLoaded, !!this.forwardFullyLoaded, anchor, reset);
        if (newMessagesDivider) {
            this.dataSource.requestScrollToKey(newMessagesDivider.key);
        }

        this.isStarting = false;
    }

    moveOrDeletelastReadedDivider = () => {
        if (!this.isOpen && this.lastReadedDividerMessageId) {
            let dividerKey = createNewMessageDividerSourceItem(this.lastReadedDividerMessageId).key;
            if (this.dataSource.hasItem(dividerKey)) {
                this.dataSource.removeItem(dividerKey);
                this.lastReadedDividerMessageId = undefined;
                if (this.lastTopMessageRead) {
                    let divider = createNewMessageDividerSourceItem(this.lastTopMessageRead);
                    let targetIndex = this.dataSource.findIndex(this.lastTopMessageRead);
                    if ((targetIndex > 0 || !this.forwardFullyLoaded) && !this.dataSource.hasItem(divider.key)) {
                        this.dataSource.addItem(divider, targetIndex, true);
                        this.lastReadedDividerMessageId = this.lastTopMessageRead;
                    }
                }
            }
        }
    }

    getSharedMedia(type: SharedMediaItemType) {
        if (!this.sharedMediaEngines[type]) {
            const engine = new SharedMediaEngine(this.engine.client, this.conversationId, type);
            engine.start();
            this.sharedMediaEngines[type] = engine;
        }
        return this.sharedMediaEngines[type];
    }

    destroySharedMedia() {
        if (Object.keys(this.sharedMediaEngines).length > 0) {
            Object.values(this.sharedMediaEngines).forEach(engine => engine.destroy());
        }
        this.sharedMediaEngines = {};
    }

    onOpen = () => {
        this.isOpen = true;
        this.markReadIfNeeded();
    }

    onClosed = () => {
        this.isOpen = false;
        (async () => {
            await delay(300);
            if (this.isOpen) {
                return;
            }
            this.moveOrDeletelastReadedDivider();
        })();
    }

    getState = () => {
        return this.state;
    }

    load = async (direction: 'forward' | 'backward') => {
        if (!this.isStarted || this.isStarting) {
            return;
        }
        if (
            (direction === 'backward' && (this.historyFullyLoaded || this.loadingHistory)) ||
            (direction === 'forward' && (this.forwardFullyLoaded || this.loadingForward))
        ) {
            return;
        }
        let serverMessages = this.messages.filter(m => isServerMessage(m));
        let cursor = serverMessages[direction === 'backward' ? 0 : serverMessages.length - 1];
        if (!cursor) {
            return;
        }
        let id = (cursor as FullMessage).id;

        if (direction === 'backward') {
            this.loadingHistory = id;
        } else {
            this.loadingForward = id;
        }
        this.state = {
            ...this.state,
            loadingHistory: direction === 'backward' ? true : this.state.loadingHistory,
            loadingForward: direction === 'forward' ? true : this.state.loadingForward
        };
        this.onMessagesUpdated();
        let gen = this.gen;
        let loaded = await backoff(() => this.engine.client.queryMessagesBatch({ chatId: this.conversationId, first: this.engine.options.conversationBatchSize, ...direction === 'backward' ? { before: id } : { after: id } }));
        if (gen !== this.gen) {
            return;
        }
        let batch = [...(loaded.gammaMessages!.messages as any as FullMessage[])].filter((remote: FullMessage) => this.messages.findIndex(local => isServerMessage(local) && local.id === remote.id) === -1);
        batch.reverse();

        this.messages = [...(direction === 'backward' ? batch : []), ...this.messages, ...(direction === 'forward' ? batch : [])];
        this.historyFullyLoaded = loaded.gammaMessages!.haveMoreBackward !== null ? !loaded.gammaMessages!.haveMoreBackward : this.historyFullyLoaded;
        this.forwardFullyLoaded = loaded.gammaMessages!.haveMoreForward !== null ? !loaded.gammaMessages!.haveMoreForward : this.forwardFullyLoaded;
        // this.state = new ConversationState(false, this.messages, this.groupMessages(this.messages), this.state.typing, false, this.historyFullyLoaded);
        this.state = {
            ...this.state,
            messages: this.messages,
            messagesPrepprocessed: this.groupMessages(this.messages),
            loadingHistory: direction === 'backward' ? true : this.state.loadingHistory,
            loadingForward: direction === 'forward' ? true : this.state.loadingForward,
            historyFullyLoaded: !!this.historyFullyLoaded,
            forwardFullyLoaded: !!this.forwardFullyLoaded,
        };
        this.onMessagesUpdated();
        if (direction === 'backward') {
            this.loadingHistory = undefined;
        } else {
            this.loadingForward = undefined;
        }

        // Data Source
        let dsItems: (DataSourceMessageItem | DataSourceDateItem | DataSourceNewDividerItem)[] = [];
        let prevDate: string | undefined;
        if (this.dataSource.getSize() > 0 && direction === 'backward') {
            prevDate = (this.dataSource.getAt(this.dataSource.getSize() - 1) as DataSourceMessageItem).date + '';
        }
        let sourceFragments = [...loaded.gammaMessages!.messages];
        for (let i = 0; i < sourceFragments.length; i++) {
            // append unread mark
            if (sourceFragments[i].id === this.lastReadedDividerMessageId && i !== sourceFragments.length - 1) {
                // Alert.alert(sourceFragments[i].id);
                dsItems.push(createNewMessageDividerSourceItem(sourceFragments[i].id));
            }

            if (prevDate && !isSameDate(prevDate, sourceFragments[i].date)) {
                let d = new Date(parseInt(prevDate, 10));
                dsItems.push(createDateDataSourceItem(d));
            }

            dsItems.push(convertMessage(sourceFragments[i] as any, this.conversationId, this.engine, sourceFragments[i - 1] as any, sourceFragments[i + 1] as any));
            prevDate = sourceFragments[i].date;
        }

        if (direction === 'backward') {
            if (this.historyFullyLoaded && prevDate) {
                let d = new Date(parseInt(prevDate, 10));
                dsItems.push(createDateDataSourceItem(d));
            }
            this.dataSource.loadedMore(dsItems, !!this.historyFullyLoaded);
        } else {
            if (this.dataSource.getSize()) {
                let lastDate = (this.dataSource.getAt(0) as DataSourceMessageItem).date + '';
                if (prevDate && !isSameDate(prevDate, lastDate)) {
                    let d = new Date(parseInt(prevDate, 10));
                    dsItems.push(createDateDataSourceItem(d));
                }
            }

            this.dataSource.loadedMoreForward(dsItems, !!this.forwardFullyLoaded);
            if (!this.watcher && this.forwardFullyLoaded) {
                sequenceWatcher<Types.ChatWatch>(loaded.state.state, (state, handler) => this.engine.client.subscribeChatWatch({ chatId: this.conversationId, state }, handler), this.updateBaseHandler);
            }
        }
    }

    loic = (text: string) => {
        if (AppConfig.isNonProduction() && text.startsWith('/loic ')) {
            let count = Number.parseInt(text.replace('/loic ', ''), 10);
            let interval = setInterval(() => {
                if (count--) {
                    this.sendMessage(count + '', [], undefined);
                } else {
                    clearInterval(interval);
                }
            }, 500);
        }
    }

    sendMessage = (text: string, mentions: MentionToSend[] | null, quotedMessages: DataSourceMessageItem[] | undefined) => {
        let message = text.trim();
        let date = (new Date().getTime()).toString();
        let quoted = quotedMessages || [];
        let styledSpans = findSpans(message);

        let key = this.engine.sender.sendMessage({
            conversationId: this.conversationId,
            message,
            mentions,
            callback: this,
            quoted: quoted.map(q => q.id!),
            spans: styledSpans
        });

        // temp fix, right way is to reload chat from bottom
        if (this.forwardFullyLoaded) {
            let spans = [...prepareLegacyMentions(message, mentions || []), ...prepareLegacySpans(styledSpans)];

            let msgs = {
                date,
                key,
                local: true,
                message,
                progress: 0,
                file: null,
                isImage: false,
                failed: false,
                spans,
                quoted: quoted.map(q => ({ ...q, reply: undefined })),
                sticker: null
            };

            this.messages = [...this.messages, msgs];
            this.state = { ...this.state, messages: this.messages, messagesPrepprocessed: this.groupMessages(this.messages) };
            this.onMessagesUpdated();

            // Data Source
            this.appendMessage(msgs);

            // Notify
            for (let l of this.listeners) {
                l.onMessageSend();
            }
        } else {
            this.restart('end');
        }

        this.loic(text);
        return key;
    }

    sendFile = (file: UploadingFile, localImage: LocalImage | undefined, quotedMessages: DataSourceMessageItem[] | undefined) => {
        let quoted = quotedMessages || [];

        let key = this.engine.sender.sendFile(this.conversationId, file, this, quoted.map(q => q.id!));
        (async () => {
            let info = await file.fetchInfo();
            let name = info.name || 'image.jpg';
            let date = (new Date().getTime()).toString();
            let pmsg = {
                date,
                key,
                filesMeta: [{
                    key,
                    file: name,
                    progress: 0,
                    fileSize: info.fileSize,
                    uri: info.uri,
                    imageSize: info.imageSize,
                    isImage: !!info.isImage,
                    filePreview: localImage && localImage.src || '',
                }],
                message: null,
                failed: false,
                quoted,
            } as PendingMessage;
            this.messages = [...this.messages, { ...pmsg } as PendingMessage];
            this.state = { ...this.state, messages: this.messages, messagesPrepprocessed: this.groupMessages(this.messages) };

            this.onMessagesUpdated();

            // Data Source
            this.appendMessage(pmsg);

            // Notify
            for (let l of this.listeners) {
                l.onMessageSend(file, localImage);
            }
        })();
        return key;
    }

    sendFiles = ({
        files,
        text = '',
        mentions = [],
        quotedMessages,
    }: {
        files: { file: UploadingFile, localImage?: LocalImage | undefined }[],
        text: string | undefined,
        mentions: MentionToSend[] | undefined,
        quotedMessages: DataSourceMessageItem[] | undefined
    }) => {
        let quoted = quotedMessages || [];
        let message = text.trim();
        let styledSpans = findSpans(message);
        let filesToSend = files.slice(0, MAX_FILES_PER_MESSAGE);

        let { key, filesKeys } = this.engine.sender.sendFiles({
            conversationId: this.conversationId,
            files: filesToSend.map(x => x.file),
            callback: this,
            quoted: quoted.map(q => q.id!),
            message,
            mentions,
            spans: styledSpans
        });
        (async () => {
            let filesInfo = await Promise.all(filesToSend.map(x => x.file.fetchInfo()));
            let filesMeta: PendingMessage['filesMeta'] = filesInfo.map((info, i) => {
                let width = filesToSend[i].localImage?.width;
                let height = filesToSend[i].localImage?.height;
                return {
                    key: filesKeys[i],
                    file: info.name || 'image.jpg',
                    progress: 0,
                    fileSize: info.fileSize,
                    uri: info.uri,
                    imageSize: info.imageSize || ((width && height) ? { width, height } : undefined),
                    isImage: !!info.isImage,
                    filePreview: filesToSend[i].localImage?.src || '',
                };
            });

            let date = (new Date().getTime()).toString();
            let spans = [...prepareLegacyMentions(message, mentions || []), ...prepareLegacySpans(styledSpans)];
            let pmsg = {
                date,
                key,
                progress: 0,
                message,
                failed: false,
                sticker: null,
                spans,
                filesMeta,
                quoted,
            } as PendingMessage;
            this.messages = [...this.messages, { ...pmsg } as PendingMessage];
            this.state = { ...this.state, messages: this.messages, messagesPrepprocessed: this.groupMessages(this.messages) };

            this.onMessagesUpdated();

            // Data Source
            this.appendMessage(pmsg);

            // Notify
            for (let l of this.listeners) {
                l.onMessageSend(filesToSend[0].file, filesToSend[0].localImage);
            }
        })();
        return { key, filesKeys };
    }

    sendSticker = (sticker: Types.StickerFragment, quotedMessages: DataSourceMessageItem[] | undefined) => {
        let date = (new Date().getTime()).toString();
        let quoted = quotedMessages || [];

        let key = this.engine.sender.sendSticker({
            conversationId: this.conversationId,
            sticker: sticker,
            quoted: quoted.map(q => q.id!),
            callback: this
        });

        (async () => {
            let pmsg = {
                date,
                key,
                message: null,
                failed: false,
                quoted: quoted.map(q => ({ ...q, reply: undefined })),
                sticker: sticker
            } as PendingMessage;
            this.messages = [...this.messages, { ...pmsg } as PendingMessage];
            this.state = { ...this.state, messages: this.messages, messagesPrepprocessed: this.groupMessages(this.messages) };

            this.onMessagesUpdated();

            // Data Source
            this.appendMessage(pmsg);

            // Notify
            for (let l of this.listeners) {
                l.onMessageSend();
            }
        })();
        return key;
    }

    onFailed = (key: string) => {
        // Handle failed
        let ex = this.messages.find((v) => isPendingMessage(v) && v.key === key);
        if (ex) {
            this.messages = this.messages.map((v) => {
                if (isPendingMessage(v) && v.key === key) {
                    return {
                        ...v,
                        failed: true
                    } as PendingMessage;
                } else {
                    return v;
                }
            });
            this.state = { ...this.state, messages: this.messages, messagesPrepprocessed: this.groupMessages(this.messages) };
            this.onMessagesUpdated();
        }

        let exDs = this.dataSource.getItem(key);
        if (exDs) {
            // TODO: implement reply
            this.dataSource.removeItem(key);
        }
    }

    onCompleted = (key: string) => {
        // Handle completed
        // Dothing: wait for sequence to take care
    }

    onFileProgress = (key: string, messageKey: string, progress: number) => {
        let ex = this.messages.find((v) => isPendingMessage(v) && v.key === messageKey);
        if (ex) {
            this.messages = this.messages.map((v) => {
                if (isPendingMessage(v) && v.key === messageKey) {
                    return {
                        ...v,
                        filesMeta: (v.filesMeta || []).reduce((acc, x) => {
                            if (x.key === key) {
                                acc!.push({ ...x, progress });
                            } else {
                                acc!.push(x);
                            }
                            return acc;
                        }, [] as PendingMessage["filesMeta"])
                    } as PendingMessage;
                } else {
                    return v;
                }
            });
            this.state = { ...this.state, messages: this.messages, messagesPrepprocessed: this.groupMessages(this.messages) };
            this.onMessagesUpdated();
        }

        let old = this.dataSource.getItem(messageKey);
        if (old && old.type === 'message') {
            let updated = {
                ...old,
                attachments: (old.attachments || []).reduce((acc, x) => {
                    if (x.__typename === 'MessageAttachmentFile' && x.key === key) {
                        acc!.push({ ...x, progress });
                    } else {
                        acc!.push(x);
                    }
                    return acc;
                }, [] as DataSourceMessageItem["attachments"])
            };
            this.dataSource.updateItem(updated);
        }
    }

    subscribe = (listener: ConversationStateHandler) => {
        this.listeners.push(listener);
        listener.onConversationUpdated(this.state);
        return () => {
            let index = this.listeners.indexOf(listener);
            if (index < 0) {
                log.warn('Double unsubscribe detected!');
            } else {
                this.listeners.splice(index, 1);
            }
        };
    }

    destroy = () => {
        if (!this.isStarted) {
            throw Error('ConversationEngine not started!');
        }
        this.isStarted = false;
        if (this.watcher) {
            this.watcher!!.destroy();
        }
    }

    handleMuteUpdated = async (mute: boolean) => {
        await this.engine.client.updateRoomChat({ id: this.conversationId }, (data) => {
            if (data.room) {
                data.room.settings.mute = mute;
                return data;
            }
            return null;
        });
    }

    handlePeerUpdated = async (peer: DialogUpdateFragment_DialogPeerUpdated_peer) => {
        await this.engine.client.updateRoomChat({ id: this.conversationId }, (data) => {
            if (data.room) {
                if (peer.__typename === 'SharedRoom' && data.room.__typename === 'SharedRoom') {
                    data.room.title = peer.title;
                    data.room.photo = peer.photo;
                    return data;
                }
                if (peer.__typename === 'PrivateRoom' && data.room.__typename === 'PrivateRoom') {
                    data.room.user.name = peer.user.name;
                    data.room.user.photo = peer.user.photo;
                    return data;
                }
            }

            return null;
        });
    }

    private onMessagesUpdated = () => {
        log.log('Messages updated');
        if (this.isOpen) {
            this.markReadIfNeeded();
        }
        for (let l of this.listeners) {
            l.onConversationUpdated(this.state);
        }
    }

    onMessageReadEvent = async (messageId: string) => {
        if (!this.isOpen && this.lastTopMessageRead !== messageId) {
            this.restart("unread");
        }
    }

    private markReadIfNeeded = () => {
        let id: string | null = null;
        for (let i = this.messages.length - 1; i >= 0; i--) {
            let msg = this.messages[i];
            if (!isPendingMessage(msg)) {
                id = msg.id;
                break;
            }
        }
        if (id !== null && id !== this.lastTopMessageRead) {
            this.lastTopMessageRead = id;
            this.engine.client.mutateRoomRead({
                id: this.conversationId,
                mid: id
            });

            this.moveOrDeletelastReadedDivider();
        }
    }

    private updateBaseHandler = (update: Types.ChatWatch): string | null => {
        if (update.event.__typename === 'ChatUpdateBatch') {
            for (let u of update.event.updates) {
                this.updateQueue.post(u);
            }
            return update.event.state;
        } else if (update.event.__typename === 'ChatUpdateSingle') {
            this.updateQueue.post(update.event.update);
            return update.event.state;
        }
        return null;
    }

    private updateHandler = async (event: any) => {
        // console.log('ConversationEngine', event);
        if (event.__typename === 'ChatMessageReceived') {
            // Handle message
            log.log('Received new message');
            this.onNewMessage(event, this.conversationId);

            // Write message to store
            let local = false;
            if (event.repeatKey) {
                if (this.localMessagesMap.get(event.message.id)) {
                    console.warn("DUPLICATE EVENT:", event);
                    return;
                }
                // Try to replace message inplace
                let existing = this.messages.findIndex((v) => isPendingMessage(v) && v.key === event.repeatKey);
                if (existing >= 0) {
                    local = true;
                    let msgs = [...this.messages];
                    msgs[existing] = {
                        ...event.message,
                        key: event.repeatKey,
                        attachments: (msgs[existing] as any).attachments,
                        date: msgs[existing].date
                    };
                    this.messages = msgs.sort((a: FullMessage, b: FullMessage) => (a && b && a.seq && b.seq) ? a.seq - b.seq : 1);
                    this.localMessagesMap.set(event.message.id, event.repeatKey);
                    event.message.local = true;
                } else {
                    this.messages = [...this.messages, event.message];
                }
            } else {
                this.messages = [...this.messages, event.message];
            }
            this.state = { ...this.state, messages: this.messages, messagesPrepprocessed: this.groupMessages(this.messages) };
            this.onMessagesUpdated();

            // Add to datasource
            this.appendMessage({ ...event.message, repeatKey: local ? event.repeatKey : undefined });
        } else if (event.__typename === 'ChatMessageDeleted') {
            // Handle message
            log.log('Received delete message');
            this.messages = this.messages.filter((m: any) => m.id !== event.message.id);

            this.state = { ...this.state, messages: this.messages, messagesPrepprocessed: this.groupMessages(this.messages) };
            this.onMessagesUpdated();

            // Remove from datasource
            let key = this.getMessageKeyById(event.message.id);
            this.removeMessage(key);

        } else if (event.__typename === 'ChatMessageUpdated') {
            // Handle message
            log.log('Received edit message');

            // Write message to store
            this.messages = this.messages.map((m: ModelMessage) => ((m as FullMessage).id !== event.message.id) ? m : event.message);

            this.state = { ...this.state, messages: this.messages, messagesPrepprocessed: this.groupMessages(this.messages) };
            this.onMessagesUpdated();

            // Update in datasource
            let conv = convertMessage(event.message, this.conversationId, this.engine);
            conv.key = this.getMessageKeyById(event.message.id);
            let old = this.dataSource.getItem(conv.key);
            conv.attachTop = old ? (old as DataSourceMessageItem).attachTop : conv.attachTop;
            conv.attachBottom = old ? (old as DataSourceMessageItem).attachBottom : conv.attachBottom;
            this.dataSource.updateItem(conv);
        } else if (event.__typename === 'ChatLostAccess') {
            for (let l of this.listeners) {
                l.onChatLostAccess();
            }
        } else if (event.__typename === 'ChatUpdated') {
            this.pinId = (event.chat && event.chat.pinnedMessage) ? event.chat.pinnedMessage.id : null;
            this.canReply = getCanReply(event.chat.room);
        } else {
            log.warn('Received unknown message');
        }
        return undefined;
    }

    private appendMessage = (src: ModelMessage) => {
        let prev: DataSourceMessageItem | DataSourceDateItem | DataSourceNewDividerItem | undefined;
        if (this.dataSource.getSize() > 0) {
            prev = this.dataSource.getAt(0);
        }
        let scrollTo: string | undefined = undefined;
        let conv: DataSourceMessageItem;
        if (isServerMessage(src)) {
            if (!this.lastReadedDividerMessageId && prev && this.lastTopMessageRead && !this.isOpen && src.sender.id !== this.engine.user.id) {
                let divider = createNewMessageDividerSourceItem(this.lastTopMessageRead);
                scrollTo = divider.key;
                this.dataSource.addItem(divider, 0, true);
                this.lastReadedDividerMessageId = this.lastTopMessageRead;
            }
            conv = convertMessage(src, this.conversationId, this.engine, undefined);

            conv.attachTop = false;
            if (prev && prev.type === 'message') {
                conv.attachTop = prev.sender.id === src.sender.id && !!prev.serviceMetaData === !!(src.__typename === 'ServiceMessage');
                if (prev.isService && !prev.serviceMetaData && src.__typename === 'GeneralMessage' && prev.sender.id === src.sender.id) {
                    conv.attachTop = false;
                }
            }
        } else {
            let p = src as PendingMessage;
            let reply = p.quoted ? (p.quoted.sort((a, b) => a.date - b.date)) : undefined;
            conv = {
                seq: (prev && prev.type === 'message' && prev.seq) ? prev.seq + 1 : null,
                type: 'message',
                chatId: this.conversationId,
                key: src.key,
                date: parseInt(src.date, 10),
                sender: this.engine.user,
                senderBadge: this.badge,
                isOut: true,
                isSending: true,
                text: src.message ? src.message : undefined,
                attachBottom: false,
                spans: src.spans,
                commentsCount: 0,
                attachments: p.filesMeta ? p.filesMeta.map(fileInfo => ({
                    __typename: "MessageAttachmentFile",
                    id: PENDING_MESSAGE_ATTACH_ID,
                    key: fileInfo.key,
                    uri: fileInfo.uri,
                    fileId: '',
                    fallback: 'Document',
                    filePreview: fileInfo.filePreview || '',
                    fileMetadata: {
                        __typename: 'FileMetadata',
                        mimeType: '',
                        imageFormat: '',
                        name: fileInfo.file || 'image.png',
                        size: fileInfo.fileSize || 0,
                        isImage: !!fileInfo.isImage,
                        imageWidth: fileInfo.imageSize && fileInfo.imageSize.width || 0,
                        imageHeight: fileInfo.imageSize && fileInfo.imageSize.height || 0,
                    }
                })) : undefined,
                reply,
                source: undefined,
                attachTop: prev && prev.type === 'message' ? prev.sender.id === this.engine.user.id && !prev.serviceMetaData && !prev.isService : false,
                textSpans: src.message ? processSpans(src.message, src.spans) : [],
                reactionCounters: [],
                fallback: src.message || '',
                sticker: src.sticker || undefined,
            };
        }
        if (this.dataSource.hasItem(conv.key)) {
            let ex = this.dataSource.getItem(conv.key) as DataSourceMessageItem;

            // Do not remove local url for attachments
            if (conv.attachments && conv.attachments.length && ex.attachments && ex.attachments.length && ex.attachments[0].uri) {
                conv.attachments[0].uri = ex.attachments[0].uri;
                if (ex.attachments[0].filePreview) {
                    conv.attachments[0].filePreview = ex.attachments[0].filePreview;
                }
            }

            let converted = {
                ...conv,
                attachBottom: ex!!.attachBottom, // Do not update compact value
                attachTop: ex!!.attachTop // Do not update compact value
            };
            this.dataSource.updateItem(converted);
        } else {
            if (prev && prev.type === 'message' && prev.sender.id === conv.sender.id && (!!prev.serviceMetaData === !!conv.serviceMetaData)) {
                // same sender and prev not service
                let dateChanged = prev.date && !isSameIntDate(prev.date, conv.date);
                let prevMessageTooOld = prev.date && (conv.date - prev.date > timeGroup);

                if (dateChanged) {
                    this.dataSource.addItem(createDateDataSourceItem(new Date(conv.date)), 0);
                }
                if (dateChanged || prevMessageTooOld) {
                    conv.attachTop = false;
                } else {
                    this.dataSource.updateItem({
                        ...prev!!,
                        attachBottom: true
                    });
                }
            } else {
                // sander changed or sevice
                const dateToAdd = createDateDataSourceItem(new Date(conv.date));
                if (!this.dataSource.hasItem(dateToAdd.key) && (!prev || prev.date && !isSameIntDate(prev.date, conv.date))) {
                    this.dataSource.addItem(dateToAdd, 0);
                    conv.attachTop = false;
                }
            }
            this.dataSource.addItem(conv, 0);
        }
        if (scrollTo) {
            this.dataSource.requestScrollToKey(scrollTo);
        }
    }

    private removeMessage = (id: string) => {
        if (this.dataSource.hasItem(id)) {
            const index = this.dataSource.findIndex(id);
            const prev = index === 0 ? null : this.dataSource.getAt(index - 1);
            const next = index === this.dataSource.getSize() - 1 ? null : this.dataSource.getAt(index + 1);
            const isPrevMessage = prev && prev.type === 'message';

            if (next && next.type !== 'message' && !isPrevMessage) {
                this.dataSource.removeItem(next.key);
            }

            const current = this.dataSource.getAt(index) as DataSourceMessageItem;

            if (prev && prev.type === 'message' && current.sender.id === prev.sender.id) {
                const newPrev = { ...prev, attachTop: current.attachTop };
                this.dataSource.updateItem(newPrev);
            }

            if (next && next.type === 'message' && current.sender.id === next.sender.id) {
                const newNext = { ...next, attachBottom: current.attachBottom };
                this.dataSource.updateItem(newNext);
            }

            this.dataSource.removeItem(id);
        }
    }

    private groupMessages = (src: ModelMessage[]) => {
        let res: Day[] = [];
        let currentDay: Day | undefined;
        let currentGroup: MessageGroup | undefined;

        let prevDate: string | undefined;
        let prevMessageDate: number | undefined = undefined;
        let prevMessageIsService: boolean | undefined = undefined;
        let prevMessageSender: string | undefined = undefined;
        let currentCollapsed = 0;

        //
        // Start a new day
        //
        let prepareDateIfNeeded = (date: number) => {
            let dt = new Date(date);
            let dstr = dt.getFullYear() + '-' + dt.getMonth() + '-' + dt.getDate();
            if (dstr !== prevDate) {
                currentDay = { day: dt.getDate(), month: dt.getMonth(), year: dt.getFullYear(), key: 'date-' + dstr, messages: [] };
                res.push(currentDay);
                prevMessageDate = undefined;
                prevMessageSender = undefined;
                currentCollapsed = 0;
            }
            prevDate = dstr;
            return currentDay!!;
        };

        //
        // Start a new sender group
        //
        let prepareSenderIfNeeded = (sender: MessageSender, message: ModelMessage, date: number) => {
            let day = prepareDateIfNeeded(date);
            let isService = isServerMessage(message) && message.__typename === 'ServiceMessage';
            if (prevMessageSender === sender.id && prevMessageDate !== undefined && isService === prevMessageIsService) {
                // 10 sec
                if ((date - prevMessageDate < timeGroup) && currentCollapsed < 10) {
                    prevMessageDate = date;
                    currentCollapsed++;
                    return currentGroup!!;
                }
            }

            prevMessageIsService = isService;
            prevMessageDate = date;
            prevMessageSender = sender.id;
            currentCollapsed = 0;
            currentGroup = {
                key: isServerMessage(message) ? 'msg-' + message.id : 'msg-pending-' + message.key,
                sender: sender,
                messages: []
            };
            day.messages.push(currentGroup);
            return currentGroup!!;
        };

        //
        // Process All messages
        //
        for (let m of src) {
            let sender = isServerMessage(m) ? m.sender : this.engine.user;
            let group = prepareSenderIfNeeded(sender, m, parseInt(m.date, 10));
            group.messages.push(m);
        }

        return res;
    }

    setReaction = (messageKey: string, reaction: MessageReactionType) => {
        const oldMessage = this.dataSource.getItem(messageKey) as DataSourceMessageItem;

        const existingReaction = !!oldMessage.reactionCounters.find(i => i.reaction === reaction);

        const newReactions = [] as MessageReactionCounter[];
        if (existingReaction) {
            oldMessage.reactionCounters.map(r => {
                if (r.reaction === reaction) {
                    newReactions.push({
                        reaction,
                        setByMe: true,
                        count: r.count + 1,
                        __typename: "ReactionCounter",
                    });
                } else {
                    newReactions.push(r);
                }
            });
        } else {
            newReactions.push(
                ...oldMessage.reactionCounters,
                { reaction, setByMe: true, count: 1, __typename: "ReactionCounter" }
            );
        }

        const newMessage = {
            ...oldMessage,
            reactionCounters: newReactions,
        };
        this.dataSource.updateItem(newMessage);
    }

    unsetReaction = (messageKey: string, reaction: MessageReactionType) => {
        const oldMessage = this.dataSource.getItem(messageKey) as DataSourceMessageItem;

        const newReactions = [] as MessageReactionCounter[];

        oldMessage.reactionCounters.map(r => {
            if (r.reaction === reaction && r.count - 1 !== 0) {
                newReactions.push({
                    reaction,
                    setByMe: false,
                    count: r.count - 1,
                    __typename: "ReactionCounter",
                });
            } else if (r.reaction !== reaction) {
                newReactions.push(r);
            }
        });

        const newMessage = {
            ...oldMessage,
            reactionCounters: newReactions,
        };
        this.dataSource.updateItem(newMessage);
    }

    getMessageKeyById = (id: string) => this.localMessagesMap.get(id) || id;
}
