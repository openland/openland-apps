import { MessengerEngine } from '../MessengerEngine';
import { ChatReadMutation, ChatHistoryQuery } from 'openland-api';
import { backoff } from 'openland-y-utils/timer';
import { SequenceWatcher } from '../core/SequenceWatcher';
import { MessageFull } from 'openland-api/fragments/MessageFull';
import { UserShort } from 'openland-api/fragments/UserShort';
import gql from 'graphql-tag';
import { MessageFullFragment, UserShortFragment } from 'openland-api/Types';
import { ConversationState, Day, MessageGroup } from './ConversationState';
import { PendingMessage, isPendingMessage, isServerMessage, UploadingFile, ModelMessage } from './types';
import { MessageSendHandler } from './MessageSender';
import { func } from '../../../node_modules/@types/prop-types';
import { DataSource, DataSourceItem } from 'openland-y-utils/DataSource';
import { DataSourceLogger } from 'openland-y-utils/DataSourceLogger';

const CHAT_SUBSCRIPTION = gql`
  subscription ChatSubscription($conversationId: ID!, $seq: Int!) {
    event: alphaChatSubscribe(conversationId: $conversationId, fromSeq: $seq) {
      seq
      ... on ConversationEventMessage {
        message {
            ...MessageFull
        }
      }
    }
  }
  ${MessageFull}
  ${UserShort}
`;

export interface ConversationStateHandler {
    onConversationUpdated(state: ConversationState): void;
    onMessageSend(): void;
}

const CONVERSATION_PAGE_SIZE = 30;

export interface DataSourceMessageItem {
    key: string;
    date: number;
    isOut: boolean;
    senderId: string;
    senderName: string;
    senderPhoto?: string;
    text?: string;
    file?: {
        fileName: string,
        fileId: string,
        fileSize: number,
        isImage: boolean,
        isGif: boolean,
        imageSize?: { width: number, height: number }
    };
    isSending: boolean;
    compact: boolean;
}

export function convertMessage(src: MessageFullFragment, engine: MessengerEngine, next?: DataSourceMessageItem): DataSourceMessageItem {
    return {
        key: src.repeatKey || src.id,
        date: parseInt(src.date, 10),
        isOut: src.sender.id === engine.user.id,
        senderId: src.sender.id,
        senderName: src.sender.name,
        senderPhoto: src.sender.picture ? src.sender.picture : undefined,
        text: src.message ? src.message : undefined,
        file: src.file ? {
            fileName: src.fileMetadata!!.name,
            fileId: src.file,
            fileSize: src.fileMetadata!!.size,
            isImage: src.fileMetadata!!.isImage,
            isGif: src.fileMetadata!!.isImage && src.fileMetadata!!.imageFormat === 'GIF',
            imageSize: src.fileMetadata!!.isImage ? { width: src.fileMetadata!!.imageWidth!!, height: src.fileMetadata!!.imageHeight!! } : undefined
        } : undefined,
        isSending: false,
        compact: next ? next.senderId === src.sender.id : false
    };
}

export class ConversationEngine implements MessageSendHandler {
    readonly engine: MessengerEngine;
    readonly conversationId: string;
    readonly dataSource: DataSource<DataSourceMessageItem>;
    private readonly dataSourceLogger: DataSourceLogger<DataSourceMessageItem>;
    historyFullyLoaded?: boolean;

    private isStarted = false;
    private watcher: SequenceWatcher | null = null;
    private isOpen = false;
    private messages: (MessageFullFragment | PendingMessage)[] = [];
    private state: ConversationState;
    private lastTopMessageRead: string | null = null;
    private listeners: ConversationStateHandler[] = [];
    private loadingHistory?: string = undefined;

    constructor(engine: MessengerEngine, conversationId: string) {
        this.engine = engine;
        this.conversationId = conversationId;
        this.state = new ConversationState(true, [], [], undefined, false, false);
        this.dataSource = new DataSource(() => {
            this.loadBefore();
        });
        this.dataSourceLogger = new DataSourceLogger('conv:' + conversationId, this.dataSource);
    }

    start = async () => {
        if (this.isStarted) {
            throw Error('ConversationEngine already started!');
        }
        this.isStarted = true;
        console.info('Loading initial state for ' + this.conversationId);
        let initialChat = await backoff(async () => {
            try {
                return await this.engine.client.client.query({
                    query: ChatHistoryQuery.document,
                    variables: {
                        conversationId: this.conversationId
                    }
                });
            } catch (e) {
                console.warn(e);
                throw e;
            }
        });
        if (!this.isStarted) {
            return;
        }
        this.messages = [...(initialChat.data as any).messages.messages];
        this.messages.reverse();

        this.state = new ConversationState(false, this.messages, this.groupMessages(this.messages), this.state.typing, this.state.loadingHistory, this.state.historyFullyLoaded);
        this.historyFullyLoaded = this.messages.length < CONVERSATION_PAGE_SIZE;
        let seq = (initialChat.data as any).messages.seq as number;
        console.info('Initial state for ' + this.conversationId + ' loaded with seq #' + seq);
        this.watcher = new SequenceWatcher('chat:' + this.conversationId, CHAT_SUBSCRIPTION, seq, { conversationId: this.conversationId }, this.updateHandler, this.engine.client);
        this.onMessagesUpdated();

        // Update Data Source
        let dsItems: DataSourceMessageItem[] = [];
        let next: DataSourceMessageItem | undefined;
        let sourceFragments = [...(initialChat.data as any).messages.messages as MessageFullFragment[]];
        for (let v of sourceFragments) {
            let conv = convertMessage(v, this.engine, next);
            dsItems.push(conv);
            next = conv;
        }
        this.dataSource.initialize(dsItems, this.historyFullyLoaded);
    }

    onOpen = () => {
        this.isOpen = true;
        this.markReadIfNeeded();
    }

    onClosed = () => {
        this.isOpen = false;
    }

    getState = () => {
        return this.state;
    }

    // 

    loadBefore = async (id?: string) => {
        if (id === undefined) {
            let serverMessages = this.messages.filter(m => isServerMessage(m));
            let first = serverMessages[0];
            if (!first) {
                return;
            }
            id = (first as MessageFullFragment).id;
        }
        if (this.loadingHistory === undefined) {
            this.loadingHistory = id;
            this.state = new ConversationState(false, this.messages, this.groupMessages(this.messages), this.state.typing, true, this.state.historyFullyLoaded);
            this.onMessagesUpdated();
            let loaded = await backoff(() => this.engine.client.client.query({
                query: ChatHistoryQuery.document,
                variables: { conversationId: this.conversationId, before: id },
                fetchPolicy: 'network-only'
            }));

            let history = [...(loaded.data as any).messages.messages].filter((remote: MessageFullFragment) => this.messages.findIndex(local => isServerMessage(local) && local.id === remote.id) === -1);
            history.reverse();

            this.messages = [...history, ...this.messages];
            this.historyFullyLoaded = history.length < CONVERSATION_PAGE_SIZE;
            this.state = new ConversationState(false, this.messages, this.groupMessages(this.messages), this.state.typing, false, this.historyFullyLoaded);
            this.onMessagesUpdated();
            this.loadingHistory = undefined;

            // Data Source
            let dsItems: DataSourceMessageItem[] = [];
            let next: DataSourceMessageItem | undefined;
            let sourceFragments = [...(loaded.data as any).messages.messages as MessageFullFragment[]];
            for (let v of sourceFragments) {
                let conv = convertMessage(v, this.engine, next);
                dsItems.push(conv);
                next = conv;
            }
            this.dataSource.loadedMore(dsItems, this.historyFullyLoaded);
        }
    }

    sendMessage = (text: string) => {
        if (text.trim().length > 0) {
            let message = text.trim();
            let date = (new Date().getTime()).toString();
            let key = this.engine.sender.sendMessage(this.conversationId, message, this);
            let msgs = { date, key, message, progress: 0, file: null, failed: false } as PendingMessage;
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
    }

    sendFile = (file: UploadingFile) => {
        (async () => {
            let info = await file.fetchInfo();
            let name = info.name || 'image.jpg';
            let date = (new Date().getTime()).toString();
            let key = this.engine.sender.sendFile(this.conversationId, file, this);
            let pmsg = { date, key, file: name, progress: 0, message: null, failed: false } as PendingMessage;
            this.messages = [...this.messages, { date, key, file: name, progress: 0, message: null, failed: false } as PendingMessage];
            this.state = new ConversationState(false, this.messages, this.groupMessages(this.messages), this.state.typing, this.state.loadingHistory, this.state.historyFullyLoaded);
            this.onMessagesUpdated();

            // Data Source
            this.appendMessage(pmsg);

            // Notify
            for (let l of this.listeners) {
                l.onMessageSend();
            }
        })();
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
    }

    subscribe = (listener: ConversationStateHandler) => {
        this.listeners.push(listener);
        listener.onConversationUpdated(this.state);
        return () => {
            let index = this.listeners.indexOf(listener);
            if (index < 0) {
                console.warn('Double unsubscribe detected!');
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

    private onMessagesUpdated = () => {
        console.log('Messages updated');
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
            this.engine.client.client.mutate({
                mutation: ChatReadMutation.document,
                variables: {
                    conversationId: this.conversationId,
                    messageId: id
                }
            });
        }
    }

    private updateHandler = async (event: any) => {
        if (event.__typename === 'ConversationEventMessage') {
            // Handle message
            console.info('Received new message');
            // Write message to store
            let data = this.engine.client.client.readQuery({
                query: ChatHistoryQuery.document,
                variables: { conversationId: this.conversationId }
            });
            (data as any).messages.seq = event.seq;
            (data as any).messages.messages = [event.message, ...(data as any).messages.messages];
            this.engine.client.client.writeQuery({
                query: ChatHistoryQuery.document,
                variables: { conversationId: this.conversationId },
                data: data
            });
            if (event.message.repeatKey) {
                // Try to replace message inplace
                let existing = this.messages.findIndex((v) => isPendingMessage(v) && v.key === event.message.repeatKey);
                if (existing >= 0) {
                    let msgs = [...this.messages];
                    msgs[existing] = {
                        ...event.message,
                        date: msgs[existing].date
                    };
                    this.messages = msgs;
                } else {
                    this.messages = [...this.messages.filter((v) => isServerMessage(v) || v.key !== event.message.repeatKey), event.message];
                }
            } else {
                this.messages = [...this.messages, event.message];
            }
            this.state = new ConversationState(false, this.messages, this.groupMessages(this.messages), this.state.typing, this.state.loadingHistory, this.state.historyFullyLoaded);
            this.onMessagesUpdated();

            // Add to datasource
            this.appendMessage(event.message);
        } else {
            console.warn('Received unknown message');
        }
        return undefined;
    }

    private appendMessage = (src: ModelMessage) => {
        let prev: DataSourceMessageItem | undefined;
        if (this.dataSource.getSize() > 0) {
            prev = this.dataSource.getAt(0);
        }
        let conv: DataSourceMessageItem;
        if (isServerMessage(src)) {
            conv = convertMessage(src, this.engine, undefined);
        } else {
            conv = {
                key: src.key,
                date: parseInt(src.date, 10),
                senderId: this.engine.user.id,
                senderName: this.engine.user.name,
                senderPhoto: this.engine.user.picture ? this.engine.user.picture : undefined,
                isOut: true,
                isSending: true,
                text: src.message ? src.message : undefined,
                compact: false
            };
        }
        if (this.dataSource.hasItem(conv.key)) {
            let ex = this.dataSource.getItem(conv.key);
            let converted = {
                ...conv,
                compact: ex!!.compact // Do not update compact value
            };
            this.dataSource.updateItem(converted);
        } else {
            if (prev && prev.compact === false && prev.senderId === conv.senderId) {
                this.dataSource.updateItem({ ...prev!!, compact: true });
                this.dataSource.addItem(conv, 0);
            } else {
                this.dataSource.addItem(conv, 0);
            }
        }
    }

    private groupMessages = (src: ModelMessage[]) => {
        let res: Day[] = [];
        let currentDay: Day | undefined;
        let currentGroup: MessageGroup | undefined;

        let prevDate: string | undefined;
        let prevMessageDate: number | undefined = undefined;
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
        let prepareSenderIfNeeded = (sender: UserShortFragment, message: ModelMessage, date: number) => {
            let day = prepareDateIfNeeded(date);
            if (prevMessageSender === sender.id && prevMessageDate !== undefined) {
                // 10 sec
                if (prevMessageDate - date < 10000 && currentCollapsed < 10) {
                    prevMessageDate = date;
                    currentCollapsed++;
                    return currentGroup!!;
                }
            }

            prevMessageDate = date;
            prevMessageSender = sender.id;
            currentCollapsed = 0;
            currentGroup = {
                key: isServerMessage(message) ? 'msg-' + message.id : 'msg-pending-' + message.key,
                sender,
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