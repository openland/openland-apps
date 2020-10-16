import { MessengerEngine } from '../MessengerEngine';
import { backoff } from 'openland-y-utils/timer';
import {
    FullMessage,
    FullMessage_GeneralMessage,
    FullMessage_StickerMessage, MessagesSearchFull_messagesSearch,
} from 'openland-api/spacex.types';
import { DataSource } from 'openland-y-utils/DataSource';
import { createLogger } from 'mental-log';
import { ServerSpan } from 'openland-y-utils/spans/Span';
import { processSpans } from 'openland-y-utils/spans/processSpans';
import { convertMessage, DataSourceDateItem, DataSourceMessageItem, isSameDate } from './ConversationEngine';
import { ChatSearchState } from './ChatSearchState';

const log = createLogger('Engine-Messages');

const timeGroup = 1000 * 60 * 60;

const getReplies = (src: FullMessage_GeneralMessage | FullMessage_StickerMessage | undefined, chaId: string, engine: MessengerEngine) => {
    return src && src.quotedMessages ? src.quotedMessages.sort((a, b) => a.date - b.date).map(m => convertMessage(m as FullMessage, chaId, engine)) : undefined;
};

const getSourceChat = (src: FullMessage_GeneralMessage | FullMessage_StickerMessage | undefined) => {
    return src && src.source && src.source.__typename === 'MessageSourceChat' ? src.source : undefined;
};
//
const getCommentsCount = (src: FullMessage_GeneralMessage | FullMessage_StickerMessage | undefined) => {
    return src ? src.commentsCount : 0;
};

const getOverrides = (src: FullMessage | undefined) => {
    return src ? (src.__typename === 'GeneralMessage' || src.__typename === 'StickerMessage' ? { overrideAvatar: src.overrideAvatar, overrideName: src.overrideName } : {}) : {};
};

const constructVariables = (query: string, chatId: string, after?: string | null) => ({
    query: JSON.stringify({
        $and: [{ text: query }, { isService: false }],
    }),
    sort: JSON.stringify([{ createdAt: { order: 'desc' } }]),
    cid: chatId,
    first: 20,
    after,
});

const getCursor = (data: MessagesSearchFull_messagesSearch) => {
    if (data.pageInfo.hasNextPage && data.edges.length) {
        return data.edges[data.edges.length - 1].cursor;
    }

    return null;
};

export function convertSearchMessage(src: FullMessage_GeneralMessage & { repeatKey?: string }, chatId: string, engine: MessengerEngine, query: string, prev?: FullMessage_GeneralMessage, next?: FullMessage_GeneralMessage): DataSourceMessageItem {
    let highlightedSpans: ServerSpan[] = [];

    if (src.message) {
        const message = src.message.toLowerCase();
        const highlightOffset = message.indexOf(query.toLowerCase());
        const splittedParts = query.toLowerCase().split(/@+/);

        if (splittedParts.length > 1) {
            const indices: number[] = [];
            let index = 0;

            if (splittedParts[0].length > 0) {
                highlightedSpans.push({
                    __typename: 'MessageSpanSearchHighlight',
                    offset: highlightOffset,
                    length: splittedParts[0].length
                });
            }
            splittedParts.shift();
            splittedParts.forEach(part => {
                    const foundIndex = message.indexOf(part, index);
                    indices.push(foundIndex);
                    index = foundIndex + part.length;
            });

            indices.forEach((item, i) => {
               highlightedSpans.push({ __typename: "MessageSpanSearchHighlight", offset: item, length: splittedParts[i].trim().length});
            });
        } else {
            highlightedSpans.push({ __typename: "MessageSpanSearchHighlight", offset: highlightOffset, length: query.length });
        }
    }

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
        attachTop: next ? (next.sender.id === src.sender.id) && isSameDate(next.date, src.date) && (src.date - next.date < timeGroup) : false,
        attachBottom: prev ? prev.sender.id === src.sender.id && isSameDate(prev.date, src.date) && (prev.date - src.date < timeGroup) : false,
        reactionCounters: src.reactionCounters,
        attachments: src.attachments,
        reply: getReplies(src, chatId, engine),
        source: getSourceChat(src),
        isEdited: src.edited,
        spans: src.spans || [],
        commentsCount: getCommentsCount(src),
        fallback: src.fallback || src.message || '',
        textSpans: src.message ? processSpans(src.message, [...src.spans, ...highlightedSpans]) : [],
        ...getOverrides(src)
    };
}

export const createDateDataSourceItem = (date: Date): DataSourceDateItem => {
    return {
        type: 'date',
        key: 'date-' + date.getFullYear() + '-' + date.getMonth() + '-' + date.getDate(),
        date: date.getDate(),
        month: date.getMonth(),
        year: date.getFullYear()
    };
};

export class ChatSearchEngine {
    readonly engine: MessengerEngine;
    readonly conversationId: string;
    readonly dataSource: DataSource<DataSourceMessageItem | DataSourceDateItem>;

    private historyFullyLoaded: boolean;
    private query: string;
    private cursor: string | null;
    private state: ChatSearchState;
    private loading: boolean;
    private stateHandler: ((state: ChatSearchState) => void) | null = null;

    constructor(engine: MessengerEngine, conversationId: string) {
        this.engine = engine;
        this.conversationId = conversationId;
        this.loading = false;
        this.historyFullyLoaded = false;
        this.cursor = null;
        this.query = '';
        this.state = new ChatSearchState(this.loading, this.historyFullyLoaded);
        this.dataSource = new DataSource(() => this.loadHistory());
    }

    subscribe = (stateHandler: (state: ChatSearchState) => void) => {
        this.stateHandler = stateHandler;
    }

    getState = () => {
        return this.state;
    }

    loadQuery = async (query: string) => {
        this.query = query;
        this.loading = true;
        this.state = new ChatSearchState(this.loading, this.historyFullyLoaded);
        this.onStateUpdated();

        const messagesSearch = await backoff(async () => {
            try {
                const loaded = (await this.engine.client.queryMessagesSearchFull(
                    constructVariables(this.query, this.conversationId),
                    { fetchPolicy: 'network-only' },
                )).messagesSearch;
                this.historyFullyLoaded = !loaded.pageInfo.hasNextPage;
                this.cursor = getCursor(loaded);
                return loaded;
            } catch (e) {
                log.warn(e);
                throw e;
            }
        });
        const sourceFragments = messagesSearch.edges.reverse().map((edge) => edge.node.message) as FullMessage_GeneralMessage[];
        const dsItems: (DataSourceMessageItem | DataSourceDateItem)[] = [];
        let prevDate: string | undefined;

        for (let i = sourceFragments.length - 1; i >= 0; i--) {
            if (prevDate && !isSameDate(prevDate, sourceFragments[i].date)) {
                const d = new Date(parseInt(prevDate, 10));
                dsItems.push(createDateDataSourceItem(d));
            }

            dsItems.push(convertSearchMessage(sourceFragments[i], this.conversationId, this.engine, this.query, sourceFragments[i + 1], sourceFragments[i - 1]));
            prevDate = sourceFragments[i].date;
        }

        if (this.historyFullyLoaded && prevDate) {
            const d = new Date(parseInt(prevDate, 10));
            dsItems.push(createDateDataSourceItem(d));
        }

        this.dataSource.initialize(dsItems, this.historyFullyLoaded, true);

        this.loading = false;
        this.state = new ChatSearchState(this.loading, this.historyFullyLoaded);
        this.onStateUpdated();
    }

    loadHistory = async () => {
        if (this.historyFullyLoaded || this.loading || !this.cursor) {
            return;
        }
        this.loading = true;
        this.state = new ChatSearchState(this.loading, this.historyFullyLoaded);
        this.onStateUpdated();

        const messagesSearch = await backoff(async () => {
            try {
                const loaded = (await this.engine.client.queryMessagesSearchFull(
                    constructVariables(this.query, this.conversationId, this.cursor),
                    { fetchPolicy: 'network-only' },
                )).messagesSearch;
                this.historyFullyLoaded = !loaded.pageInfo.hasNextPage;
                this.cursor = getCursor(loaded);
                return loaded;
            } catch (e) {
                log.warn(e);
                throw e;
            }
        });

        const sourceFragments = messagesSearch.edges.reverse().map((edge) => edge.node.message) as FullMessage_GeneralMessage[];
        const dsItems: (DataSourceMessageItem | DataSourceDateItem)[] = [];
        let prevDate: string | undefined;

        if (this.dataSource.getSize() > 0) {
            prevDate = (this.dataSource.getAt(this.dataSource.getSize() - 1) as DataSourceMessageItem).date + '';
        }
        for (let i = sourceFragments.length - 1; i >= 0; i--) {
            if (prevDate && !isSameDate(prevDate, sourceFragments[i].date)) {
                const d = new Date(parseInt(prevDate, 10));
                dsItems.push(createDateDataSourceItem(d));
            }

            dsItems.push(convertSearchMessage(sourceFragments[i], this.conversationId, this.engine, this.query, sourceFragments[i + 1], sourceFragments[i - 1]));
            prevDate = sourceFragments[i].date;
        }

        if (this.historyFullyLoaded && prevDate) {
            const d = new Date(parseInt(prevDate, 10));
            dsItems.push(createDateDataSourceItem(d));
        }

        this.dataSource.loadedMore(dsItems, this.historyFullyLoaded);

        this.loading = false;
        this.state = new ChatSearchState(this.loading, this.historyFullyLoaded);
        this.onStateUpdated();
    }

    private onStateUpdated = () => {
        if (this.stateHandler) {
            this.stateHandler(this.state);
        }
    }
}
