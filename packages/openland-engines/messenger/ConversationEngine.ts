import { MessengerEngine } from '../MessengerEngine';
import { RoomReadMutation, RoomQuery, ChatInitQuery, ChatInitFromUnreadQuery, MessagesBatchQuery } from 'openland-api';
import { backoff, delay } from 'openland-y-utils/timer';
import { UserBadge, FullMessage, FullMessage_GeneralMessage_reactions, FullMessage_ServiceMessage_serviceMetadata, FullMessage_GeneralMessage_attachments, FullMessage_GeneralMessage_spans, UserShort, DialogUpdateFragment_DialogPeerUpdated_peer } from 'openland-api/Types';
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
import { ReactionReduced } from 'openland-engines/reactions/types';
import { reduceReactions } from 'openland-engines/reactions/reduceReactions';
import { getReactionsLabel } from 'openland-engines/reactions/getReactionsLabel';
import { AppConfig } from 'openland-y-runtime/AppConfig';

const log = createLogger('Engine-Messages');

export interface ConversationStateHandler {
    onConversationUpdated(state: ConversationState): void;
    onMessageSend(): void;
    onChatLostAccess(): void;
}

const timeGroup = 1000 * 60 * 60;
let loadToUnread = false;

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
    senderBadge?: UserBadge;
    text?: string;
    title?: string;
    isEdited?: boolean;
    reply?: DataSourceMessageItem[];
    source: Types.FullMessage_GeneralMessage_source_MessageSourceChat | null;
    reactions: FullMessage_GeneralMessage_reactions[];
    attachments?: (FullMessage_GeneralMessage_attachments & { uri?: string })[];
    spans?: FullMessage_GeneralMessage_spans[];
    isSending: boolean;
    attachTop: boolean;
    attachBottom: boolean;
    serviceMetaData?: FullMessage_ServiceMessage_serviceMetadata;
    isService?: boolean;
    progress?: number;
    commentsCount: number;
    fallback: string;
    textSpans: Span[];
    failed?: boolean;
    reactionsReduced: ReactionReduced[];
    reactionsLabel: string;

    // legacy
    isSubscribedMessageComments?: boolean;
    replyQuoteText?: string | null;
    peerRootId?: string;
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

export function convertMessage(src: FullMessage & { repeatKey?: string }, chaId: string, engine: MessengerEngine, prev?: FullMessage, next?: FullMessage): DataSourceMessageItem {
    const generalMessage = src.__typename === 'GeneralMessage' ? src : undefined;
    const serviceMessage = src.__typename === 'ServiceMessage' ? src : undefined;

    const reply = generalMessage && generalMessage.quotedMessages ? generalMessage.quotedMessages.sort((a, b) => a.date - b.date).map(m => convertMessage(m as Types.FullMessage, chaId, engine)) : undefined;

    const generalMessageSourceChat = generalMessage && generalMessage.source && generalMessage.source.__typename === 'MessageSourceChat' ? generalMessage.source : null;

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
        senderBadge: src.senderBadge || undefined,
        sender: src.sender,
        text: src.message || undefined,
        isSending: false,
        attachTop: next ? (next.sender.id === src.sender.id) && isSameDate(next.date, src.date) && (src.date - next.date < timeGroup) && ((next.__typename === 'ServiceMessage') === (src.__typename === 'ServiceMessage')) : false,
        attachBottom: prev ? prev.sender.id === src.sender.id && isSameDate(prev.date, src.date) && (prev.date - src.date < timeGroup) && ((prev.__typename === 'ServiceMessage') === (src.__typename === 'ServiceMessage')) : false,
        reactions: generalMessage ? generalMessage.reactions : [],
        serviceMetaData: serviceMessage && serviceMessage.serviceMetadata || undefined,
        isService: !!serviceMessage,
        attachments: generalMessage && generalMessage.attachments,
        reply,
        source: generalMessageSourceChat,
        isEdited: generalMessage && generalMessage.edited,
        spans: src.spans || [],
        commentsCount: generalMessage ? generalMessage.commentsCount : 0,
        fallback: src.fallback || src.message || '',
        textSpans: src.message ? processSpans(src.message, src.spans) : [],
        reactionsReduced: generalMessage ? reduceReactions(generalMessage.reactions || [], engine.user.id) : [],
        reactionsLabel: generalMessage ? getReactionsLabel(generalMessage.reactions || [], engine.user.id) : '',
    };
}

export function convertMessageBack(src: DataSourceMessageItem): Types.FullMessage {
    let res = {
        __typename: src.isService ? 'ServiceMessage' : 'GeneralMessage' as any,
        id: src.id!,
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
        reactions: [],
        source: src.source
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
    };
};

const createNewMessageDividerSourceItem = (messageId: string): DataSourceNewDividerItem => {
    return {
        type: 'new_divider',
        date: undefined,
        key: 'new_divider-' + messageId,
    };
};

export class ConversationEngine implements MessageSendHandler {
    readonly engine: MessengerEngine;
    readonly conversationId: string;
    readonly dataSource: DataSource<DataSourceMessageItem | DataSourceDateItem | DataSourceNewDividerItem>;
    // private readonly dataSourceLogger: DataSourceLogger<DataSourceMessageItem | DataSourceDateItem | DataSourceNewDividerItem>;
    historyFullyLoaded?: boolean;
    forwardFullyLoaded?: boolean;

    private isStarted = false;
    private watcher: SequenceModernWatcher<Types.ChatWatch, Types.ChatWatchVariables> | null = null;
    private isOpen = false;
    private messages: (FullMessage | PendingMessage)[] = [];
    private state: ConversationState;
    private lastTopMessageRead: string | null = null;
    lastReadedDividerMessageId?: string;
    private listeners: ConversationStateHandler[] = [];
    private loadingHistory?: string = undefined;
    private loadingForward?: string = undefined;
    private localMessagesMap = new Map<string, string>();
    readonly messagesActionsStateEngine: MessagesActionsStateEngine;
    readonly onNewMessage: (event: Types.ChatUpdateFragment_ChatMessageReceived, cid: string) => void;

    role?: Types.RoomMemberRole | null;
    canEdit?: boolean;
    canPin?: boolean;
    canSendMessage?: boolean;
    isChannel?: boolean;
    isPrivate?: boolean;
    user?: Types.ChatInit_room_PrivateRoom_user;
    badge?: UserBadge;

    constructor(engine: MessengerEngine, conversationId: string, onNewMessage: (event: Types.ChatUpdateFragment_ChatMessageReceived, cid: string) => void) {
        loadToUnread = AppConfig.getPlatform() === 'desktop';
        this.engine = engine;
        this.conversationId = conversationId;

        this.state = new ConversationState(true, [], [], undefined, false, false, false, false);
        this.dataSource = new DataSource(() => {
            this.load('backward');
        }, () => {
            this.load('forward');
        });
        // this.dataSourceLogger = new DataSourceLogger('conv:' + conversationId, this.dataSource);

        this.messagesActionsStateEngine = new MessagesActionsStateEngine();
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
                let history;
                if (loadToUnread) {
                    history = await this.engine.client.client.query(ChatInitFromUnreadQuery, { chatId: this.conversationId, first: this.engine.options.conversationBatchSize }, { fetchPolicy: 'network-only' });
                    history = { ...history, messages: history.gammaMessages!.messages };
                    this.historyFullyLoaded = !history.gammaMessages!.haveMoreBackward;
                    this.forwardFullyLoaded = !history.gammaMessages!.haveMoreForward;
                } else {
                    history = await this.engine.client.client.query(ChatInitQuery, { chatId: this.conversationId, first: this.engine.options.conversationBatchSize }, { fetchPolicy: 'network-only' });
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

        this.lastReadedDividerMessageId = initialChat.lastReadedMessage && initialChat.lastReadedMessage.id || undefined;

        this.messages = messages;

        this.role = initialChat.room && initialChat.room.__typename === 'SharedRoom' && initialChat.room.role || null;
        this.badge = initialChat.room && initialChat.room.myBadge || undefined;
        this.canEdit = initialChat.room && initialChat.room.__typename === 'SharedRoom' && initialChat.room.canEdit || false;
        this.canPin = this.canEdit || (initialChat.room && initialChat.room.__typename === 'PrivateRoom') || false;
        this.canSendMessage = (initialChat.room && initialChat.room.__typename === 'SharedRoom' && initialChat.room.kind !== 'INTERNAL') ? initialChat.room.canSendMessage :
            (initialChat.room && initialChat.room.__typename === 'PrivateRoom') ? !initialChat.room.user.isBot :
                true;
        this.isChannel = initialChat.room && initialChat.room.__typename === 'SharedRoom' ? initialChat.room.isChannel : false;
        this.isPrivate = initialChat.room && initialChat.room.__typename === 'PrivateRoom' ? true : false;
        let forwardBufferId = this.conversationId;
        if (initialChat.room && initialChat.room.__typename === 'PrivateRoom') {
            this.user = initialChat.room.user;
            forwardBufferId = this.user.id;
        }

        let buffered = this.engine.forwardBuffer.get(forwardBufferId);
        if (buffered) {
            this.messagesActionsStateEngine.forward(buffered);
            this.engine.forwardBuffer.delete(forwardBufferId);
        }

        this.state = new ConversationState(false, messages, this.groupMessages(messages), this.state.typing, this.state.loadingHistory, !!this.historyFullyLoaded, this.state.loadingForward, !!this.forwardFullyLoaded);
        log.log('Initial state for ' + this.conversationId);
        let startSubscription = !loadToUnread || (messages.length && this.lastReadedDividerMessageId === messages[messages.length - 1].id);
        if (startSubscription) {
            console.warn(`started ${this.conversationId} Subscription on start`);
            this.watcher = new SequenceModernWatcher('chat:' + this.conversationId, this.engine.client.subscribeChatWatch({ chatId: this.conversationId, state: initialChat.state.state }), this.engine.client.client, this.updateHandler, undefined, { chatId: this.conversationId }, initialChat.state.state);
        }
        this.onMessagesUpdated();

        // Update Data Source
        let dsItems: (DataSourceMessageItem | DataSourceDateItem | DataSourceNewDividerItem)[] = [];
        let sourceFragments = messages as FullMessage[];
        let prevDate: string | undefined;
        let newMessagesDivider: DataSourceNewDividerItem | undefined;
        for (let i = sourceFragments.length - 1; i >= 0; i--) {

            if (loadToUnread) {
                // append unread mark
                if (sourceFragments[i].id === this.lastReadedDividerMessageId && i !== sourceFragments.length - 1) {
                    // Alert.alert(sourceFragments[i].id);
                    newMessagesDivider = createNewMessageDividerSourceItem(sourceFragments[i].id);
                    dsItems.push(newMessagesDivider);
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

        this.dataSource.initialize(dsItems, !!this.historyFullyLoaded, !!this.forwardFullyLoaded);
        if (loadToUnread) {
            if (newMessagesDivider) {
                this.dataSource.requestScrollToKey(newMessagesDivider.key);
            }
        }

    }

    onOpen = () => {
        this.isOpen = true;
        this.markReadIfNeeded();
    }

    onClosed = () => {
        this.isOpen = false;
        if (loadToUnread) {
            (async () => {
                await delay(300);
                if (this.isOpen) {
                    return;
                }
                if (this.lastReadedDividerMessageId) {
                    let dividerKey = createNewMessageDividerSourceItem(this.lastReadedDividerMessageId).key;
                    if (this.dataSource.hasItem(dividerKey)) {
                        if (this.lastTopMessageRead) {
                            let targetIndex = this.dataSource.findIndex(this.lastTopMessageRead);
                            if (targetIndex) {
                                this.dataSource.moveItem(dividerKey, targetIndex);
                            }
                        }
                    } else {
                        this.lastReadedDividerMessageId = undefined;
                    }

                }
            })();
        }
    }

    getState = () => {
        return this.state;
    }

    // 

    // loadBefore = async () => {
    //     await this.load('backward');
    // }
    // loadAfter = async () => {
    //     await this.load('forward');
    // }
    load = async (direction: 'forward' | 'backward') => {
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
        console.warn(direction, id);

        if (direction === 'backward') {
            this.loadingHistory = id;
        } else {
            this.loadingForward = id;
        }
        this.state = {
            ...this.state,
            loading: true,
            loadingHistory: direction === 'backward' ? true : this.state.loadingHistory,
            loadingForward: direction === 'forward' ? true : this.state.loadingForward
        };
        this.onMessagesUpdated();
        let loaded = await backoff(() => this.engine.client.client.query(MessagesBatchQuery, { chatId: this.conversationId, first: this.engine.options.conversationBatchSize, ...direction === 'backward' ? { before: id } : { after: id } }));

        let batch = [...(loaded.gammaMessages!.messages as any as FullMessage[])].filter((remote: FullMessage) => this.messages.findIndex(local => isServerMessage(local) && local.id === remote.id) === -1);
        batch.reverse();

        this.messages = [...(direction === 'backward' ? batch : []), ...this.messages, ...(direction === 'forward' ? batch : [])];
        this.historyFullyLoaded = loaded.gammaMessages!.haveMoreBackward !== null ? !loaded.gammaMessages!.haveMoreBackward : this.historyFullyLoaded;
        this.forwardFullyLoaded = loaded.gammaMessages!.haveMoreForward !== null ? !loaded.gammaMessages!.haveMoreForward : this.forwardFullyLoaded;
        // this.state = new ConversationState(false, this.messages, this.groupMessages(this.messages), this.state.typing, false, this.historyFullyLoaded);
        this.state = {
            ...this.state,
            loading: false,
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
        if (this.dataSource.getSize() > 0) {
            prevDate = (this.dataSource.getAt(this.dataSource.getSize() - 1) as DataSourceMessageItem).date + '';
        }
        let sourceFragments = [...loaded.gammaMessages!.messages];
        for (let i = 0; i < sourceFragments.length; i++) {
            if (loadToUnread) {
                // append unread mark
                if (sourceFragments[i].id === this.lastReadedDividerMessageId && i !== sourceFragments.length - 1) {
                    // Alert.alert(sourceFragments[i].id);
                    dsItems.push(createNewMessageDividerSourceItem(sourceFragments[i].id));
                }
            }

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
        if (direction === 'backward') {
            this.dataSource.loadedMore(dsItems, !!this.historyFullyLoaded);
        } else {
            this.dataSource.loadedMoreForward(dsItems, !!this.forwardFullyLoaded);
            if (!this.watcher && this.forwardFullyLoaded) {
                console.warn(`started ${this.conversationId} Subscription on loaded forward`);
                this.watcher = new SequenceModernWatcher('chat:' + this.conversationId, this.engine.client.subscribeChatWatch({ chatId: this.conversationId, state: loaded.state.state }), this.engine.client.client, this.updateHandler, undefined, { chatId: this.conversationId }, loaded.state.state);
            }
        }
    }

    loic = (text: string) => {
        if (AppConfig.isNonProduction() && text.startsWith('/loic ')) {
            let count = Number.parseInt(text.replace('/loic ', ''), 10);
            let interval = setInterval(() => {
                if (count--) {
                    this.sendMessage(count + '', []);
                } else {
                    clearInterval(interval);
                }
            }, 500);
        }
    }

    sendMessage = (text: string, mentions: MentionToSend[] | null) => {
        let message = text.trim();
        let date = (new Date().getTime()).toString();

        let messagesActionsState = this.messagesActionsStateEngine.getState();
        let quoted;

        if (['reply', 'forward'].includes(messagesActionsState.action || '')) {
            quoted = this.messagesActionsStateEngine.getState().messages;
            this.messagesActionsStateEngine.clear();
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
            quoted: quoted ? quoted.map(q => ({ ...q, reply: undefined })) : undefined
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

        this.loic(text);
    }

    sendFile = (file: UploadingFile) => {
        let messagesActionsState = this.messagesActionsStateEngine.getState();
        let quoted;

        if (['reply', 'forward'].includes(messagesActionsState.action || '')) {
            quoted = this.messagesActionsStateEngine.getState().messages;
            this.messagesActionsStateEngine.clear();
        }

        let key = this.engine.sender.sendFile(this.conversationId, file, this, (quoted || []).map(q => q.id!));
        (async () => {
            let info = await file.fetchInfo();
            console.warn(info);
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
            this.state = { ...this.state, messages: this.messages, messagesPrepprocessed: this.groupMessages(this.messages) };
            this.onMessagesUpdated();
            this.engine.sender.retryMessage(key, this);
        }
    }

    cancelMessage = (key: string) => {
        let ex = this.messages.find((v) => isPendingMessage(v) && v.key === key);
        if (ex) {
            this.messages = this.messages.filter((v) => isServerMessage(v) || v.key !== key);
            this.state = { ...this.state, messages: this.messages, messagesPrepprocessed: this.groupMessages(this.messages) };
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
            this.state = { ...this.state, messages: this.messages, messagesPrepprocessed: this.groupMessages(this.messages) };
            this.onMessagesUpdated();
        }

        let old = this.dataSource.getItem(key);
        if (old && old.type === 'message') {
            let updated = { ...old, progress };
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

    handlePeerUpdated = async (peer: DialogUpdateFragment_DialogPeerUpdated_peer) => {
        await this.engine.client.client.updateQuery((data) => {
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
        // let id: string | null = null;
        // for (let i = this.messages.length - 1; i >= 0; i--) {
        //     let msg = this.messages[i];
        //     if (!isPendingMessage(msg)) {
        //         id = msg.id;
        //         break;
        //     }
        // }
        // if (id !== null && id !== this.lastTopMessageRead) {
        //     this.lastTopMessageRead = id;
        //     this.engine.client.client.mutate(RoomReadMutation, {
        //         id: this.conversationId,
        //         mid: id
        //     });
        // }
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
            let id = this.localMessagesMap.get(event.message.id) || event.message.id;
            if (this.dataSource.hasItem(id)) {
                this.dataSource.removeItem(id);
            }

        } else if (event.__typename === 'ChatMessageUpdated') {
            // Handle message
            log.log('Received edit message');

            // Write message to store
            this.messages = this.messages.map((m: any) => m.id !== event.message.id ? m : event.message);

            this.state = { ...this.state, messages: this.messages, messagesPrepprocessed: this.groupMessages(this.messages) };
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
        let scrollTo: string | undefined = undefined;
        let conv: DataSourceMessageItem;
        if (isServerMessage(src)) {
            if (loadToUnread && !this.lastReadedDividerMessageId && prev && this.lastTopMessageRead && !this.isOpen && !src.sender.isYou) {
                let divider = createNewMessageDividerSourceItem(this.lastTopMessageRead);
                scrollTo = divider.key;
                this.dataSource.addItem(divider, 0);
                this.lastReadedDividerMessageId = this.lastTopMessageRead;
            }
            conv = convertMessage(src, this.conversationId, this.engine, undefined);

            conv.attachTop = false;
            if (prev && prev.type === 'message') {
                conv.attachTop = prev.senderId === src.sender.id && !!prev.serviceMetaData === !!(src.__typename === 'ServiceMessage');
                if (prev.isService && !prev.serviceMetaData && src.__typename === 'GeneralMessage' && prev.senderId === src.sender.id) {
                    conv.attachTop = false;
                }
            }
        } else {
            let p = src as PendingMessage;
            let reply = p.quoted ? (p.quoted.sort((a, b) => a.date - b.date)) : undefined;
            conv = {
                type: 'message',
                chatId: this.conversationId,
                key: src.key,
                date: parseInt(src.date, 10),
                senderId: this.engine.user.id,
                senderName: this.engine.user.name,
                sender: this.engine.user,
                senderPhoto: this.engine.user.photo ? this.engine.user.photo : undefined,
                senderBadge: this.badge,
                isOut: true,
                isSending: true,
                text: src.message ? src.message : undefined,
                attachBottom: false,
                spans: src.spans,
                commentsCount: 0,
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
                source: null,
                attachTop: prev && prev.type === 'message' ? prev.senderId === this.engine.user.id && !prev.serviceMetaData && !prev.isService : false,
                textSpans: src.message ? processSpans(src.message, src.spans) : [],
                reactions: [],
                fallback: src.message || '',
                reactionsReduced: [],
                reactionsLabel: '',
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
                const dateToAdd = createDateDataSourceItem(new Date(conv.date));
                if (!this.dataSource.hasItem(dateToAdd.key) && (!prev || prev.date && !isSameIntDate(prev.date, conv.date))) {
                    this.dataSource.addItem(dateToAdd, 0);
                    conv.attachTop = false;
                }
            }

            this.dataSource.addItem(conv, 0);
        }
        if (loadToUnread && scrollTo) {
            this.dataSource.requestScrollToKey(scrollTo);
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