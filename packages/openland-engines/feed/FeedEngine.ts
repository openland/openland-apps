import { MessengerEngine } from '../MessengerEngine';
import { OpenlandClient } from 'openland-api/OpenlandClient';
import { DataSource, DataSourceItem } from 'openland-y-utils/DataSource';
import { createLogger } from 'mental-log';
import * as Types from 'openland-api/Types';
import { SequenceModernWatcher } from '../core/SequenceModernWatcher';
import { backoff } from 'openland-y-utils/timer';
import { FeedQuery } from 'openland-api';

const log = createLogger('Engine-Feed');

export interface FeedDataSourceItem extends DataSourceItem {
    id: string;
    content: Types.Feed_feed_items_content | null;
}

export const convertPost = (src: Types.Feed_feed_items): FeedDataSourceItem => {
    return {
        key: src.id,
        id: src.id,
        content: src.content
    };
};

export class FeedEngine {
    readonly engine: MessengerEngine;
    readonly client: OpenlandClient;
    readonly dataSource: DataSource<FeedDataSourceItem>;
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

        (async () => {
            await this.init();
        })();
    }

    private init = async () => {
        log.log('Init');

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

        const dsItems: FeedDataSourceItem[] = [];

        initialFeed.items.map((i) => {
            const converted = convertPost(i);

            dsItems.push(converted);
        });

        this.watcher = new SequenceModernWatcher('feed', this.engine.client.subscribeFeedUpdates(), this.engine.client.client, this.handleEvent, undefined, undefined, undefined, undefined);

        this.dataSource.initialize(dsItems, this.fullyLoaded, true);

        console.warn('boom', dsItems);
    }

    private load = async () => {
        log.log('Load');

        if (this.fullyLoaded || this.loading) {
            return;
        }

        // this.loading = true;

        // const loaded = (await backoff(() => this.engine.client.client.query(FeedQuery, { first: this.engine.options.feedBatchSize, after: this.lastCursor }))).feed;

        // this.lastCursor = loaded.cursor;
        // this.fullyLoaded = typeof this.lastCursor !== 'string';
        // this.loading = false;

        // const dsItems: FeedDataSourceItem[] = [];

        // loaded.items.map((i) => {
        //     const converted = convertPost(i);

        //     dsItems.push(converted);
        // });

        // this.dataSource.loadedMore(dsItems, this.fullyLoaded);
    }

    private handleEvent = async (event: Types.FeedUpdateFragment) => {
        log.log('Event Recieved: ' + event.__typename);
    }
}