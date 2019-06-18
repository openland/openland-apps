import { MessengerEngine } from '../MessengerEngine';
import { RoomReadMutation, ChatHistoryQuery, RoomQuery, ChatInitQuery } from 'openland-api';
import { backoff } from 'openland-y-utils/timer';
import { FullMessage, FullMessage_GeneralMessage_reactions, FullMessage_ServiceMessage_serviceMetadata, FullMessage_GeneralMessage_quotedMessages, FullMessage_GeneralMessage_attachments, FullMessage_GeneralMessage_spans, UserShort } from 'openland-api/Types';
import { ConversationState, Day, MessageGroup } from './ConversationState';
import { PendingMessage, isPendingMessage, isServerMessage, UploadingFile, ModelMessage } from './types';
import { MessageSendHandler, MentionToSend } from './MessageSender';
import { DataSource } from 'openland-y-utils/DataSource';
import { SequenceModernWatcher } from 'openland-engines/core/SequenceModernWatcher';
import { prepareLegacyMentions } from 'openland-engines/legacy/legacymentions';
import * as Types from 'openland-api/Types';
import { createLogger } from 'mental-log';
import { MessagesActionsStateEngine } from './MessagesActionsState';
import { prepareLegacySpans, findSpans } from 'openland-y-utils/findSpans';
import { Span } from 'openland-y-utils/spans/Span';
import { processSpans } from 'openland-y-utils/spans/processSpans';
import { Alert } from 'openland-mobile/components/AlertBlanket';

const log = createLogger('Engine-Messages');

export interface ConversationStateHandler {
    onConversationUpdated(state: ConversationState): void;
    onMessageSend(): void;
    onChatLostAccess(): void;
}

const timeGroup = 1000 * 60 * 60;

export interface DataSourceMessageItem {
    chatId: string;
    type: 'message';
    key: string;
    id?: string;
    date: number;
    isOut: boolean;
    sender: UserShort;
    senderId: string;
    senderName: string;
    senderPhoto?: string;
    text?: string;
    title?: string;
    isEdited?: boolean;
    reply?: FullMessage_GeneralMessage_quotedMessages[];
    reactions?: FullMessage_GeneralMessage_reactions[];
    attachments?: (FullMessage_GeneralMessage_attachments & { uri?: string })[];
    spans?: FullMessage_GeneralMessage_spans[];
    isSending: boolean;
    attachTop: boolean;
    attachBottom: boolean;
    serviceMetaData?: FullMessage_ServiceMessage_serviceMetadata;
    isService?: boolean;
    progress?: number;
    commentsCount: number | null;
    fallback?: string;
    textSpans: Span[];
    replyTextSpans: Span[][];

    // legacy
    isSubscribedMessageComments?: boolean;
    replyQuoteText?: string | null;
    peerRootId?: string;
    notificationId?: string;
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
    date: undefined
}

export function convertMessage(src: FullMessage & { repeatKey?: string }, chaId: string, engine: MessengerEngine, prev?: FullMessage, next?: FullMessage): DataSourceMessageItem {
    let generalMessage = src.__typename === 'GeneralMessage' ? src : undefined;
    let serviceMessage = src.__typename === 'ServiceMessage' ? src : undefined;

    let reply = generalMessage && generalMessage.quotedMessages ? generalMessage.quotedMessages.sort((a, b) => a.date - b.date) : undefined;
    let replyTextSpans = reply ? reply.map(r => processSpans(r.message || '', r.spans)) : []

    return {
        chatId: chaId,
        type: 'message',
        id: src.id,
        key: src.repeatKey || src.id,
        date: parseInt(src.date, 10),
        isOut: src.sender.id === engine.user.id,
        senderId: src.sender.id,
        senderName: src.sender.name,
        senderPhoto: src.sender.photo || undefined,
        sender: src.sender,
        text: src.message || undefined,
        isSending: false,
        attachTop: next ? (next.sender.id === src.sender.id) && isSameDate(next.date, src.date) && (src.date - next.date < timeGroup) && ((next.__typename === 'ServiceMessage') === (src.__typename === 'ServiceMessage')) : false,
        attachBottom: prev ? prev.sender.id === src.sender.id && isSameDate(prev.date, src.date) && (prev.date - src.date < timeGroup) && ((prev.__typename === 'ServiceMessage') === (src.__typename === 'ServiceMessage')) : false,
        reactions: generalMessage && generalMessage.reactions,
        serviceMetaData: serviceMessage && serviceMessage.serviceMetadata || undefined,
        isService: !!serviceMessage,
        attachments: generalMessage && generalMessage.attachments,
        reply,
        replyTextSpans,
        isEdited: generalMessage && generalMessage.edited,
        spans: src.spans || [],
        commentsCount: generalMessage ? generalMessage.commentsCount : null,
        fallback: src.fallback || undefined,
        textSpans: src.message ? processSpans(src.message, src.spans) : []
    };
}

export function convertMessageBack(src: DataSourceMessageItem): Types.Message_message {
    let res = {
        __typename: src.isService ? 'ServiceMessage' : 'GeneralMessage' as any,
        id: src.id!,
        date: src.date,
        message: src.text || null,
        fallback: src.fallback || 'unknown message type',
        sender: src.sender,
        spans: src.spans || [],
        commentsCount: src.commentsCount || 0,
        attachments: src.attachments || [],
        edited: !!src.isEdited,
        quotedMessages: [],
        reactions: [],
    };

    return res;
}

function isSameIntDate(a1: number, b1: number) {
    let a2 = new Date(a1);
    let b2 = new Date(b1);
    return (a2.getFullYear() === b2.getFullYear() && a2.getMonth() === b2.getMonth() && a2.getDate() === b2.getDate());
}

function isSameDate(a: string, b: string) {
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
    }
}

const createNewMessageDividerSourceItem = (messageId: string): DataSourceNewDividerItem => {
    return {
        type: 'new_divider',
        date: undefined,
        key: 'new_divider-' + messageId,
    }
}

export class ConversationEngine implements MessageSendHandler {
    readonly engine: MessengerEngine;
    readonly conversationId: string;
    readonly dataSource: DataSource<DataSourceMessageItem | DataSourceDateItem | DataSourceNewDividerItem>;
    // private readonly dataSourceLogger: DataSourceLogger<DataSourceMessageItem | DataSourceDateItem | DataSourceNewDividerItem>;
    historyFullyLoaded?: boolean;

    private isStarted = false;
    private watcher: SequenceModernWatcher<Types.ChatWatch, Types.ChatWatchVariables> | null = null;
    private isOpen = false;
    private messages: (FullMessage | PendingMessage)[] = [];
    private state: ConversationState;
    private lastTopMessageRead: string | null = null;
    private lastReadedDividerMessageId?: string;
    private listeners: ConversationStateHandler[] = [];
    private loadingHistory?: string = undefined;
    private localMessagesMap = new Map<string, string>();
    readonly messagesActionsState: MessagesActionsStateEngine;
    readonly onNewMessage: (event: Types.ChatUpdateFragment_ChatMessageReceived, cid: string) => void;

    role?: Types.RoomMemberRole | null;
    canEdit?: boolean;
    canPin?: boolean;
    canSendMessage?: boolean;
    isChannel?: boolean;
    isPrivate?: boolean;
    user?: Types.ChatInit_room_PrivateRoom_user

    constructor(engine: MessengerEngine, conversationId: string, onNewMessage: (event: Types.ChatUpdateFragment_ChatMessageReceived, cid: string) => void) {
        this.engine = engine;
        this.conversationId = conversationId;

        this.state = new ConversationState(true, [], [], undefined, false, false);
        this.dataSource = new DataSource(() => {
            this.loadBefore();
        });
        // this.dataSourceLogger = new DataSourceLogger('conv:' + conversationId, this.dataSource);

        this.messagesActionsState = new MessagesActionsStateEngine();
        this.onNewMessage = onNewMessage;
    }

    start = async () => {
        if (this.isStarted) {
            throw Error('ConversationEngine already started!');
        }
        this.isStarted = true;
        log.log('Loading initial state for ' + this.conversationId);
        let initialChat = await backoff(async () => {
            try {
                let history = await this.engine.client.client.query(ChatInitQuery, { chatId: this.conversationId, first: this.engine.options.conversationBatchSize }, { fetchPolicy: 'network-only' });
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

        this.lastReadedDividerMessageId = initialChat.lastReadedMessage && initialChat.lastReadedMessage.id || undefined;
        let pagesToload = 1;

        while (messages.length > 0 && ((!messages.find(m => isServerMessage(m) && m.id === this.lastReadedDividerMessageId)) || pagesToload--)) {
            let serverMessages = messages.filter(m => isServerMessage(m));
            let first = serverMessages[0];
            if (!first) {
                break;
            }
            let loaded = await backoff(() => this.engine.client.client.query(ChatHistoryQuery, { chatId: this.conversationId, before: (first as Types.FullMessage_GeneralMessage).id, first: 40 }));
            let batch = [...loaded.messages];
            batch.reverse();
            messages.unshift(...batch);
        }

        this.messages = messages;

        this.role = initialChat.room && initialChat.room.__typename === 'SharedRoom' && initialChat.room.role || null;
        this.canEdit = initialChat.room && initialChat.room.__typename === 'SharedRoom' && initialChat.room.canEdit || false;
        this.canPin = this.canEdit || (initialChat.room && initialChat.room.__typename === 'PrivateRoom') || false;
        this.canSendMessage = initialChat.room && initialChat.room.__typename === 'SharedRoom' && initialChat.room.kind !== 'INTERNAL' ? initialChat.room.canSendMessage : true;
        this.isChannel = initialChat.room && initialChat.room.__typename === 'SharedRoom' ? initialChat.room.isChannel : false;
        this.isPrivate = initialChat.room && initialChat.room.__typename === 'PrivateRoom' ? true : false;
        if (initialChat.room && initialChat.room.__typename === 'PrivateRoom') {
            this.user = initialChat.room.user
        }

        this.state = new ConversationState(false, messages, this.groupMessages(messages), this.state.typing, this.state.loadingHistory, this.state.historyFullyLoaded);
        this.historyFullyLoaded = messages.length < this.engine.options.conversationBatchSize;
        log.log('Initial state for ' + this.conversationId);
        this.watcher = new SequenceModernWatcher('chat:' + this.conversationId, this.engine.client.subscribeChatWatch({ chatId: this.conversationId, state: initialChat.state.state }), this.engine.client.client, this.updateHandler, undefined, { chatId: this.conversationId }, initialChat.state.state);
        this.onMessagesUpdated();

        // Update Data Source
        let dsItems: (DataSourceMessageItem | DataSourceDateItem | DataSourceNewDividerItem)[] = [];
        let sourceFragments = messages as FullMessage[];
        let prevDate: string | undefined;
        for (let i = 0; i < sourceFragments.length; i++) {

            // append unread mark
            if (sourceFragments[i].id === this.lastReadedDividerMessageId) {
                // Alert.alert(sourceFragments[i].id);
                dsItems.push(createNewMessageDividerSourceItem(sourceFragments[i].id));
                this.lastReadedDividerMessageId = sourceFragments[i].id;
            }

            // Append new date if needed
            if (prevDate && !isSameDate(prevDate, sourceFragments[i].date)) {
                let d = new Date(parseInt(prevDate, 10));
                dsItems.push(createDateDataSourceItem(d));
            }

            dsItems.push(convertMessage(sourceFragments[i], this.conversationId, this.engine, sourceFragments[i - 1], sourceFragments[i + 1]));
            prevDate = sourceFragments[i].date;
        }

        if (this.historyFullyLoaded && prevDate) {
            let d = new Date(parseInt(prevDate, 10));
            dsItems.push(createDateDataSourceItem(d));
        }

        this.dataSource.initialize(dsItems, this.historyFullyLoaded);
    }

    onOpen = () => {
        this.isOpen = true;
        this.markReadIfNeeded();
    }

    onClosed = () => {
        this.isOpen = false;
        if (this.lastReadedDividerMessageId) {
            let toDelete = createNewMessageDividerSourceItem(this.lastReadedDividerMessageId);
            if (this.dataSource.hasItem(toDelete.key)) {
                this.dataSource.removeItem(toDelete.key);
                this.lastReadedDividerMessageId = undefined;
            }
        }
    }

    getState = () => {
        return this.state;
    }

    // 

    loadBefore = async (id?: string) => {
        if (this.historyFullyLoaded) {
            return
        }
        if (id === undefined) {
            let serverMessages = this.messages.filter(m => isServerMessage(m));
            let first = serverMessages[0];
            if (!first) {
                return;
            }
            id = (first as FullMessage).id;
        }
        if (this.loadingHistory === undefined) {
            this.loadingHistory = id;
            this.state = new ConversationState(false, this.messages, this.groupMessages(this.messages), this.state.typing, true, this.state.historyFullyLoaded);
            this.onMessagesUpdated();
            let loaded = await backoff(() => this.engine.client.client.query(ChatHistoryQuery, { chatId: this.conversationId, before: id, first: this.engine.options.conversationBatchSize }));

            let history = [...(loaded.messages as any as FullMessage[])].filter((remote: FullMessage) => this.messages.findIndex(local => isServerMessage(local) && local.id === remote.id) === -1);
            history.reverse();

            this.messages = [...history, ...this.messages];
            this.historyFullyLoaded = history.length < this.engine.options.conversationBatchSize;
            this.state = new ConversationState(false, this.messages, this.groupMessages(this.messages), this.state.typing, false, this.historyFullyLoaded);
            this.onMessagesUpdated();
            this.loadingHistory = undefined;

            // Data Source
            let dsItems: (DataSourceMessageItem | DataSourceDateItem | DataSourceNewDividerItem)[] = [];
            let prevDate: string | undefined;
            if (this.dataSource.getSize() > 0) {
                prevDate = (this.dataSource.getAt(this.dataSource.getSize() - 1) as DataSourceMessageItem).date + '';
            }
            let sourceFragments = [...loaded.messages];
            for (let i = 0; i < sourceFragments.length; i++) {
                if (prevDate && !isSameDate(prevDate, sourceFragments[i].date)) {
                    let d = new Date(parseInt(prevDate, 10));
                    dsItems.push(createDateDataSourceItem(d));
                }

                dsItems.push(convertMessage(sourceFragments[i] as any, this.conversationId, this.engine, sourceFragments[i - 1] as any, sourceFragments[i + 1] as any));
                prevDate = sourceFragments[i].date;
            }
            if (this.historyFullyLoaded && prevDate) {
                let d = new Date(parseInt(prevDate, 10));
                dsItems.push(createDateDataSourceItem(d));
            }
            this.dataSource.loadedMore(dsItems, this.historyFullyLoaded);
        }
    }

    sendMessage = (text: string, mentions: MentionToSend[] | null) => {
        let message = text.trim();
        let date = (new Date().getTime()).toString();

        let messagesActionsState = this.messagesActionsState.getState();
        let quoted;

        if (['reply', 'forward'].includes(messagesActionsState.action || '')) {
            quoted = this.messagesActionsState.getState().messages;
            this.messagesActionsState.clear();
        }

        let styledSpans = findSpans(message);

        let key = this.engine.sender.sendMessage({
            conversationId: this.conversationId,
            message,
            mentions,
            callback: this,
            quoted: (quoted || []).map(q => q.id!),
            spans: styledSpans
        });
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
            quoted
        };

        this.messages = [...this.messages, msgs];
        this.state = new ConversationState(false, this.messages, this.groupMessages(this.messages), this.state.typing, this.state.loadingHistory, this.state.historyFullyLoaded);
        this.onMessagesUpdated();

        // Data Source
        this.appendMessage(msgs);

        // Notify
        for (let l of this.listeners) {
            l.onMessageSend();
        }
    }

    sendFile = (file: UploadingFile) => {
        let messagesActionsState = this.messagesActionsState.getState();
        let quoted;

        if (['reply', 'forward'].includes(messagesActionsState.action || '')) {
            quoted = this.messagesActionsState.getState().messages;
            this.messagesActionsState.clear();
        }

        let key = this.engine.sender.sendFile(this.conversationId, file, this, (quoted || []).map(q => q.id!));
        (async () => {
            let info = await file.fetchInfo();
            let name = info.name || 'image.jpg';
            let date = (new Date().getTime()).toString();
            let pmsg = {
                date,
                key,
                file: name,
                uri: info.uri,
                fileSize: info.fileSize,
                progress: 0,
                message: null,
                failed: false,
                isImage: !!info.isImage,
                imageSize: info.imageSize,
                quoted
            } as PendingMessage;
            console.log(pmsg);
            this.messages = [...this.messages, { ...pmsg } as PendingMessage];
            this.state = new ConversationState(false, this.messages, this.groupMessages(this.messages), this.state.typing, this.state.loadingHistory, this.state.historyFullyLoaded);
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

    retryMessage = (key: string) => {
        let ex = this.messages.find((v) => isPendingMessage(v) && v.key === key);
        if (ex) {
            this.messages = this.messages.map((v) => {
                if (isPendingMessage(v) && v.key === key) {
                    return {
                        ...v,
                        failed: false
                    } as PendingMessage;
                } else {
                    return v;
                }
            });
            this.state = new ConversationState(false, this.messages, this.groupMessages(this.messages), this.state.typing, this.state.loadingHistory, this.state.historyFullyLoaded);
            this.onMessagesUpdated();
            this.engine.sender.retryMessage(key, this);
        }
    }

    cancelMessage = (key: string) => {
        let ex = this.messages.find((v) => isPendingMessage(v) && v.key === key);
        if (ex) {
            this.messages = this.messages.filter((v) => isServerMessage(v) || v.key !== key);
            this.state = new ConversationState(false, this.messages, this.groupMessages(this.messages), this.state.typing, this.state.loadingHistory, this.state.historyFullyLoaded);
            this.onMessagesUpdated();
        }
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
            this.state = new ConversationState(false, this.messages, this.groupMessages(this.messages), this.state.typing, this.state.loadingHistory, this.state.historyFullyLoaded);
            this.onMessagesUpdated();
        }
    }

    onCompleted = (key: string) => {
        // Handle completed
        // Dothing: wait for sequence to take care
    }

    onProgress = (key: string, progress: number) => {
        let ex = this.messages.find((v) => isPendingMessage(v) && v.key === key);
        if (ex) {
            this.messages = this.messages.map((v) => {
                if (isPendingMessage(v) && v.key === key) {
                    return {
                        ...v,
                        progress: progress
                    } as PendingMessage;
                } else {
                    return v;
                }
            });
            this.state = new ConversationState(false, this.messages, this.groupMessages(this.messages), this.state.typing, this.state.loadingHistory, this.state.historyFullyLoaded);
            this.onMessagesUpdated();
        }

        let old = this.dataSource.getItem(key);
        if (old && old.type === 'message') {
            let updated = { ...old, progress }
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
        await this.engine.client.client.updateQuery((data) => {
            if (data.room) {
                data.room.settings.mute = mute;
                return data;
            }
            return null;
        }, RoomQuery, { id: this.conversationId });
    }

    handleTitleUpdated = async (title: string) => {
        await this.engine.client.client.updateQuery((data) => {
            if (data.room && data.room.__typename === 'SharedRoom') {
                data.room.title = title;
                return data;
            }
            return null;
        }, RoomQuery, { id: this.conversationId });
    }

    handlePhotoUpdated = async (photo: string) => {
        await this.engine.client.client.updateQuery((data) => {
            if (data.room && data.room.__typename === 'SharedRoom') {
                data.room.photo = photo;
                return data;
            }
            return null;
        }, RoomQuery, { id: this.conversationId });
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
            this.engine.client.client.mutate(RoomReadMutation, {
                id: this.conversationId,
                mid: id
            });
        }
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
                // Try to replace message inplace
                let existing = this.messages.findIndex((v) => isPendingMessage(v) && v.key === event.repeatKey);
                if (existing >= 0) {
                    local = true;
                    let msgs = [...this.messages];
                    msgs[existing] = {
                        ...event.message,
                        __typename: undefined,
                        key: event.repeatKey,
                        attachments: (msgs[existing] as any).attachments,
                        date: msgs[existing].date
                    };
                    this.messages = msgs;
                    this.localMessagesMap.set(event.message.id, event.repeatKey);
                    event.message.local = true;
                } else {
                    this.messages = [...this.messages.filter((v) => isServerMessage(v) || v.key !== event.repeatKey), event.message];
                }
            } else {
                this.messages = [...this.messages, event.message];
            }
            this.state = new ConversationState(false, this.messages, this.groupMessages(this.messages), this.state.typing, this.state.loadingHistory, this.state.historyFullyLoaded);
            this.onMessagesUpdated();

            // Add to datasource
            this.appendMessage({ ...event.message, repeatKey: local ? event.repeatKey : undefined });
        } else if (event.__typename === 'ChatMessageDeleted') {
            // Handle message
            log.log('Received delete message');
            this.messages = this.messages.filter((m: any) => m.id !== event.message.id);

            this.state = new ConversationState(false, this.messages, this.groupMessages(this.messages), this.state.typing, this.state.loadingHistory, this.state.historyFullyLoaded);
            this.onMessagesUpdated();

            // Remove from datasource
            let id = this.localMessagesMap.get(event.message.id) || event.message.id;
            if (this.dataSource.hasItem(id)) {
                this.dataSource.removeItem(id);
            }

        } else if (event.__typename === 'ChatMessageUpdated') {
            // Handle message
            log.log('Received edit message');

            // Write message to store
            this.messages = this.messages.map((m: any) => m.id !== event.message.id ? m : event.message);

            this.state = new ConversationState(false, this.messages, this.groupMessages(this.messages), this.state.typing, this.state.loadingHistory, this.state.historyFullyLoaded);
            this.onMessagesUpdated();

            // Update in datasource
            let conv = convertMessage(event.message, this.conversationId, this.engine);
            conv.key = this.localMessagesMap.get(event.message.id) || event.message.id;
            let old = this.dataSource.getItem(conv.key);
            conv.attachTop = old ? (old as DataSourceMessageItem).attachTop : conv.attachTop;
            conv.attachBottom = old ? (old as DataSourceMessageItem).attachBottom : conv.attachBottom;
            this.dataSource.updateItem(conv);
        } else if (event.__typename === 'ChatLostAccess') {
            for (let l of this.listeners) {
                l.onChatLostAccess();
            }
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
        let conv: DataSourceMessageItem;
        if (isServerMessage(src)) {
            if (!this.lastReadedDividerMessageId && prev && this.lastTopMessageRead) {
                this.dataSource.addItem(createNewMessageDividerSourceItem(this.lastTopMessageRead), 0);
                this.lastReadedDividerMessageId = this.lastTopMessageRead;
            }
            conv = convertMessage(src, this.conversationId, this.engine, undefined);

            conv.attachTop = prev && prev.type === 'message' ? prev.senderId === src.sender.id && !!prev.serviceMetaData === !!(src.__typename === 'ServiceMessage') : false;
        } else {
            let p = src as PendingMessage;
            let reply = p.quoted ? (p.quoted.map(convertMessageBack).sort((a, b) => a.date - b.date) as Types.Message_message_GeneralMessage_quotedMessages[]) : undefined;
            let replyTextSpans = reply ? reply.map(r => processSpans(r.message || '', r.spans)) : []

            conv = {
                type: 'message',
                chatId: this.conversationId,
                key: src.key,
                date: parseInt(src.date, 10),
                senderId: this.engine.user.id,
                senderName: this.engine.user.name,
                sender: this.engine.user,
                senderPhoto: this.engine.user.photo ? this.engine.user.photo : undefined,
                isOut: true,
                isSending: true,
                text: src.message ? src.message : undefined,
                attachBottom: false,
                spans: src.spans,
                commentsCount: null,
                attachments: p.uri ? [{
                    __typename: "MessageAttachmentFile",
                    id: 'pending_message_attach_file_id',
                    uri: p.uri,
                    fileId: '',
                    fallback: 'Document',
                    filePreview: '',
                    fileMetadata: {
                        __typename: 'FileMetadata',
                        mimeType: '',
                        imageFormat: '',
                        name: p.file || 'image.png',
                        size: p.fileSize || 0,
                        isImage: !!p.isImage,
                        imageWidth: p.imageSize && p.imageSize.width || 0,
                        imageHeight: p.imageSize && p.imageSize.height || 0,
                    }
                }] : undefined,
                reply,
                replyTextSpans,
                attachTop: prev && prev.type === 'message' ? prev.senderId === this.engine.user.id && !prev.serviceMetaData && !prev.isService : false,
                textSpans: src.message ? processSpans(src.message, src.spans) : []
            };
        }
        if (this.dataSource.hasItem(conv.key)) {
            let ex = this.dataSource.getItem(conv.key) as DataSourceMessageItem;
            let converted = {
                ...conv,
                attachBottom: ex!!.attachBottom, // Do not update compact value
                attachTop: ex!!.attachTop // Do not update compact value
            };
            this.dataSource.updateItem(converted);
        } else {
            if (prev && prev.type === 'message' && prev.senderId === conv.senderId && (!!prev.serviceMetaData === !!conv.serviceMetaData)) {
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
                const dateToAdd = createDateDataSourceItem(new Date(conv.date))
                if (!this.dataSource.hasItem(dateToAdd.key) && (!prev || prev.date && !isSameIntDate(prev.date, conv.date))) {
                    this.dataSource.addItem(dateToAdd, 0);
                    conv.attachTop = false;
                }
            }

            this.dataSource.addItem(conv, 0);
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
        let prepareSenderIfNeeded = (sender: UserShort, message: ModelMessage, date: number) => {
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
}