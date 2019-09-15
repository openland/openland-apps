import { MessengerEngine } from '../MessengerEngine';
import { OpenlandClient } from 'openland-api/OpenlandClient';
import { DataSource, DataSourceItem } from 'openland-y-utils/DataSource';
import { createLogger } from 'mental-log';
import * as Types from 'openland-api/Types';
import { SequenceModernWatcher } from '../core/SequenceModernWatcher';
import { backoff } from 'openland-y-utils/timer';
import { FeedQuery } from 'openland-api';
import { Span } from 'openland-y-utils/spans/Span';
import { ReactionReduced } from 'openland-engines/reactions/types';
import { processSpans } from 'openland-y-utils/spans/processSpans';
import { reduceReactions } from 'openland-engines/reactions/reduceReactions';
import { getReactionsLabel } from 'openland-engines/reactions/getReactionsLabel';
import { AppConfig } from 'openland-y-runtime/AppConfig';
import { isSameDate } from 'openland-engines/messenger/ConversationEngine';

const log = createLogger('Engine-Feed');

export interface DataSourceFeedPostItem extends DataSourceItem {
    type: 'post';
    id: string;
    date: number;
    author: Types.FeedPostAuthorFragment;
    text?: string;
    edited: boolean;
    reactions: Types.FeedItemFull_reactions[];
    attachments: Types.FeedItemFull_attachments[];
    spans: Types.FeedItemFull_spans[];
    commentsCount: number;
    fallback: string;
    textSpans: Span[];
    reactionsReduced: ReactionReduced[];
    reactionsLabel: string;
}

export interface DataSourceFeedDateItem extends DataSourceItem {
    type: 'date';
    label: string;
}

export type DataSourceFeedItem = DataSourceFeedPostItem | DataSourceFeedDateItem;

const convertPost = (src: Types.Feed_feed_items, engine: MessengerEngine): DataSourceFeedPostItem => {
    return {
        type: 'post',
        key: src.id,
        id: src.id,
        date: parseInt(src.date, 10),
        author: src.author,
        text: src.message || undefined,
        reactions: src.reactions,
        attachments: src.attachments,
        edited: src.edited,
        spans: src.spans,
        commentsCount: src.commentsCount,
        fallback: src.fallback || src.message || '',
        textSpans: src.message ? processSpans(src.message, src.spans) : [],
        reactionsReduced: reduceReactions(src.reactions, engine.user.id),
        reactionsLabel: getReactionsLabel(src.reactions, engine.user.id),
    };
};

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const convertDate = (src: string): DataSourceFeedDateItem => {
    const date = new Date(parseInt(src, 10));
    const day = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear();

    let now = new Date();
    let label = 'Today';
    if (now.getFullYear() === year) {
        if (now.getMonth() === month && now.getDate() - 1 === day) {
            label = 'Yesterday';
        } else if (now.getMonth() !== month || now.getDate() !== day) {
            label = months[month] + ' ' + day;
        }
    } else {
        label = year + ', ' + months[month] + ' ' + date;
    }

    return {
        type: 'date',
        key: `date-${year}-${month}-${day}`,
        label
    };
};

const convertDSitems = (items: Types.Feed_feed_items[], engine: MessengerEngine): DataSourceFeedItem[] => {
    const dsItems: DataSourceFeedItem[] = [];
    let prevDate: string | undefined;

    items.map((i) => {
        if (prevDate && !isSameDate(prevDate, i.date)) {
            dsItems.push(convertDate(i.date));
        }

        const converted = convertPost(i, engine);
        dsItems.push(converted);

        prevDate = i.date;
    });

    return dsItems;
};

export class FeedEngine {
    readonly engine: MessengerEngine;
    readonly client: OpenlandClient;
    readonly dataSource: DataSource<DataSourceFeedItem>;
    // tslint:disable-next-line
    private watcher: SequenceModernWatcher<Types.FeedUpdates, {}> | null = null;
    private lastCursor: string | null = null;
    private fullyLoaded: boolean = false;
    private loading: boolean = false;

    constructor(engine: MessengerEngine) {
        this.engine = engine;
        this.client = this.engine.client;

        this.dataSource = new DataSource(() => {
            this.load();
        }, () => []);

        if (AppConfig.isNonProduction()) {
            (async () => {
                await this.init();
            })();
        }
    }

    private init = async () => {
        log.log('Init');

        this.loading = true;

        const initialFeed = await backoff(async () => {
            try {
                return (await this.engine.client.client.query(FeedQuery, { first: this.engine.options.feedBatchSize }, { fetchPolicy: 'network-only' })).feed;
            } catch (e) {
                log.warn(e);
                throw e;
            }
        });

        this.lastCursor = initialFeed.cursor;
        this.fullyLoaded = typeof this.lastCursor !== 'string';

        const dsItems = convertDSitems(initialFeed.items, this.engine);

        this.watcher = new SequenceModernWatcher('feed', this.engine.client.subscribeFeedUpdates(), this.engine.client.client, this.handleEvent, undefined, undefined, undefined, undefined);

        this.dataSource.initialize(dsItems, this.fullyLoaded, true);

        this.loading = false;
    }

    private load = async () => {
        log.log('Load');

        if (this.fullyLoaded || this.loading) {
            return;
        }

        this.loading = true;

        const loaded = (await backoff(() => this.engine.client.client.query(FeedQuery, { first: this.engine.options.feedBatchSize, after: this.lastCursor }))).feed;

        this.lastCursor = loaded.cursor;
        this.fullyLoaded = typeof this.lastCursor !== 'string';
        this.loading = false;

        const dsItems = convertDSitems(loaded.items, this.engine);

        this.dataSource.loadedMore(dsItems, this.fullyLoaded);
    }

    private handleEvent = (event: Types.FeedUpdateFragment) => {
        log.log('Event Recieved: ' + event.__typename);

        if (event.__typename === 'FeedItemReceived') {
            let converted;

            if (event.item.__typename === 'FeedPost') {
                converted = convertPost(event.item, this.engine);
            }

            if (converted) {
                this.dataSource.addItem(converted, 0);
            }

            return;
        } else if (event.__typename === 'FeedItemUpdated') {
            let converted;

            if (event.item.__typename === 'FeedPost') {
                converted = convertPost(event.item, this.engine);
            }

            if (converted) {
                if (this.dataSource.hasItem(converted.key)) {
                    this.dataSource.updateItem(converted);
                }
            }

            return;
        } else if (event.__typename === 'FeedItemDeleted') {
            if (this.dataSource.hasItem(event.item.id)) {
                this.dataSource.removeItem(event.item.id);
            }

            return;
        } else {
            log.log('Unhandled update');
        }
    }
}