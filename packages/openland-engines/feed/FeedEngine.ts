import { MessengerEngine } from '../MessengerEngine';
import { OpenlandClient } from 'openland-api/OpenlandClient';
import { DataSource } from 'openland-y-utils/DataSource';
import { createLogger } from 'mental-log';
import * as Types from 'openland-api/Types';
import { SequenceModernWatcher } from '../core/SequenceModernWatcher';
import { backoff } from 'openland-y-utils/timer';
import { DataSourceFeedItem } from './types';
import { convertItems, convertPost } from './convert';
import UUID from 'uuid/v4';
import { AppConfig } from 'openland-y-runtime/AppConfig';
import { InitFeedQuery, FeedLoadMoreQuery } from 'openland-api';

const log = createLogger('Engine-Feed');

export class FeedEngine {
    readonly engine: MessengerEngine;
    readonly client: OpenlandClient;
    readonly dataSource: DataSource<DataSourceFeedItem>;
    // tslint:disable-next-line
    private watcher: SequenceModernWatcher<Types.FeedUpdates, {}> | null = null;
    private lastCursor: string | null = null;
    private fullyLoaded: boolean = false;
    private loading: boolean = false;
    drafts: Types.FeedChannelFull | null = null;

    constructor(engine: MessengerEngine) {
        this.engine = engine;
        this.client = this.engine.client;

        this.dataSource = new DataSource(() => {
            this.load();
        }, () => []);

        if (AppConfig.isNonProduction()) {
            this.init();
        }
    }

    private init = async () => {
        log.log('Init');

        this.loading = true;

        const initData = await backoff(async () => {
            try {
                return (await this.engine.client.client.query(InitFeedQuery, { first: this.engine.options.feedBatchSize }, { fetchPolicy: 'network-only' }));
            } catch (e) {
                log.warn(e);
                throw e;
            }
        });

        const initialFeed = initData.feed;
        this.drafts = initData.drafts;

        this.lastCursor = initialFeed.cursor;
        this.fullyLoaded = typeof this.lastCursor !== 'string';

        const dsItems = convertItems(initialFeed.items, this.engine);

        this.watcher = new SequenceModernWatcher('feed', this.engine.client.subscribeFeedUpdates({}), this.engine.client.client, this.handleEvent, undefined, {});

        this.dataSource.initialize(dsItems, this.fullyLoaded, true);

        this.loading = false;
    }

    private load = async () => {
        log.log('Load');

        if (this.fullyLoaded || this.loading) {
            return;
        }

        this.loading = true;

        const loaded = (await backoff(() => this.engine.client.client.query(FeedLoadMoreQuery, { first: this.engine.options.feedBatchSize, after: this.lastCursor }, { fetchPolicy: 'network-only' }))).feed;

        this.lastCursor = loaded.cursor;
        this.fullyLoaded = typeof this.lastCursor !== 'string';
        this.loading = false;

        const dsItems = convertItems(loaded.items, this.engine);

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
        } else if (event.__typename === 'FeedRebuildNeeded') {
            const resetedFeed = event.feed;

            this.loading = true;

            this.lastCursor = resetedFeed.cursor;
            this.fullyLoaded = typeof this.lastCursor !== 'string';

            const dsItems = convertItems(resetedFeed.items, this.engine);

            this.dataSource.initialize(dsItems, this.fullyLoaded, true, undefined, true);

            this.loading = false;

            return;
        } else {
            log.log('Unhandled update');
        }
    }

    createPost = async (channel: string, slides: Types.SlideInput[]) => {
        const repeatKey = UUID();

        await backoff(async () => {
            await this.engine.client.mutateFeedCreatePost({ channel, slides, repeatKey });
        });
    }

    editPost = async (id: string, slides: Types.SlideInput[]) => {
        await backoff(async () => {
            await this.engine.client.mutateFeedEditPost({ feedItemId: id, slides });
        });
    }
}