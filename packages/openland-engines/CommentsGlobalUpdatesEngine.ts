import { MessengerEngine } from './MessengerEngine';
import { OpenlandClient } from 'openland-api/OpenlandClient';
import { DataSource } from 'openland-y-utils/DataSource';
import { createLogger } from 'mental-log';
import { DataSourceStored, DataSourceStoredProvider } from 'openland-y-utils/DataSourceStored';
import * as Types from 'openland-api/Types';
import { NotificationCenterState } from './NotificationCenterState';
import { MyNotificationCenterMarkSeqReadMutation } from 'openland-api';
import { backoff } from 'openland-y-utils/timer';
import { AppVisibility } from 'openland-y-runtime/AppVisibility';
import { SequenceModernWatcher } from './core/SequenceModernWatcher';
import { CommentsGlobalUpdatesStateHandler } from './CommentsGlobalUpdatesState';

const log = createLogger('Engine-CommentsGlobalUpdatesEngine');

type CommentsGlobalUpdatesEngineOptions = {
    engine: MessengerEngine;
    mocked?: boolean;
};

export interface CommentsNotificationsDataSourceItem {
    type: 'comments_notification';
    key: string;
}

interface SequenceHolder {
    handleStateProcessed: (a: string) => Promise<void>;
    handleSeqUpdated: (seq: number) => void;
    handleEvent: (event: Types.CommentGlobalUpdateFragment) => any;
    reportSeqIfNeeded: () => void;
}

export class CommentsGlobalUpdatesEngine implements SequenceHolder {
    readonly engine: MessengerEngine;
    readonly client: OpenlandClient;
    readonly isMocked: boolean;
    readonly _dataSourceStored: DataSourceStored<CommentsNotificationsDataSourceItem>;
    readonly dataSource: DataSource<CommentsNotificationsDataSourceItem>;
    private state: NotificationCenterState;
    private listeners: CommentsGlobalUpdatesStateHandler[] = [];
    private isVisible: boolean = true;
    private watcher: SequenceModernWatcher<
        Types.CommentUpdatesGlobal,
        Types.CommentUpdatesGlobalVariables
    > | null = null;
    private maxSeq = 0;
    private lastReportedSeq = 0;

    constructor(options: CommentsGlobalUpdatesEngineOptions) {
        this.engine = options.engine;
        this.client = this.engine.client;
        this.isMocked = !!options.engine.options.mocked;
        this.state = new NotificationCenterState(true, []);

        let provider: DataSourceStoredProvider<CommentsNotificationsDataSourceItem> = {
            loadMore: async (cursor?: string) => {
                log.log('loadMore (cursor: ' + cursor + ')');

                const commentGlobalUpdatesState = await this.engine.client.queryCommentGlobalUpdatesState();
                const state = commentGlobalUpdatesState.commentGlobalUpdatesState.state;
                const items: any = [];

                this.onNotificationsUpdated();

                return {
                    items,
                    cursor: cursor,
                    state: state!!,
                };
            },
            onStarted: (state: string) => {
                log.log('onStarted');

                this.watcher = new SequenceModernWatcher(
                    'notificationCenter',
                    this.engine.client.subscribeCommentUpdatesGlobal({ state }),
                    this.engine.client.client,
                    this.handleEvent,
                    this.handleSeqUpdated,
                    undefined,
                    state,
                    async st => {
                        await this.handleStateProcessed(st);
                    },
                );

                this.onNotificationsUpdated();
            },
        };

        this._dataSourceStored = new DataSourceStored(
            'comments_notifications',
            options.engine.options.store,
            20,
            provider,
        );

        this.dataSource = this._dataSourceStored.dataSource;

        AppVisibility.watch(this.handleVisibleChanged);
        this.handleVisibleChanged(AppVisibility.isVisible);
    }

    handleStateProcessed = async (state: string) => {
        await this._dataSourceStored.updateState(state);
    };

    getState = () => {
        return this.state;
    };

    subscribe = (listener: CommentsGlobalUpdatesStateHandler) => {
        this.listeners.push(listener);

        listener.onStateUpdated(this.state);

        return () => {
            let index = this.listeners.indexOf(listener);
            if (index < 0) {
                log.warn('Double unsubscribe detected!');
            } else {
                this.listeners.splice(index, 1);
            }
        };
    };

    private onNotificationsUpdated = () => {
        for (let l of this.listeners) {
            l.onStateUpdated(this.state);
        }
    };

    handleVisibleChanged = (isVisible: boolean) => {
        if (this.isVisible === isVisible) {
            return;
        }

        this.isVisible = isVisible;

        this.reportSeqIfNeeded();
    };

    handleSeqUpdated = (seq: number) => {
        this.maxSeq = Math.max(seq, this.maxSeq);

        this.reportSeqIfNeeded();
    };

    reportSeqIfNeeded = () => {
        // TODO no mutation to read seq for CommentsNotifications
        // if (this.isVisible && this.lastReportedSeq < this.maxSeq) {
        //     this.lastReportedSeq = this.maxSeq;
        //     let seq = this.maxSeq;
        //     (async () => {
        //         backoff(() =>
        //             this.engine.client.client.mutate(MyNotificationCenterMarkSeqReadMutation, {
        //                 seq,
        //             }),
        //         );
        //     })();
        // }
    };

    handleEvent = async (event: Types.CommentGlobalUpdateFragment) => {
        log.log('Event Recieved: ' + event.__typename);

        if (event.__typename === 'CommentPeerUpdated') {
            console.log(event);
            // const convertedNotification = convertNotification(event.notification);

            // if (convertedNotification) {
            //     await this._dataSourceStored.addItem(convertedNotification, 0);

            //     this.notifications = [convertedNotification, ...this.notifications];
            //     this.state = new NotificationCenterState(false, this.notifications);

            //     this.onNotificationsUpdated();
            // }
        } else {
            log.log('Unhandled update');
        }
    };
}
