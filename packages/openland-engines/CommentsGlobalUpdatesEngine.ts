import { MessengerEngine } from './MessengerEngine';
import { OpenlandClient } from 'openland-api/OpenlandClient';
import { createLogger } from 'mental-log';
import * as Types from 'openland-api/Types';
import { AppVisibility } from 'openland-y-runtime/AppVisibility';
import { SequenceModernWatcher } from './core/SequenceModernWatcher';

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
    handleSeqUpdated: (seq: number) => void;
    handleEvent: (event: Types.CommentGlobalUpdateFragment) => any;
    reportSeqIfNeeded: () => void;
}

export class CommentsGlobalUpdatesEngine implements SequenceHolder {
    readonly engine: MessengerEngine;
    readonly client: OpenlandClient;
    readonly isMocked: boolean;
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

        (async () => {
            const state =
                (await options.engine.options.store.readKey('comments_global_updates_state')) || '';

            this.watcher = new SequenceModernWatcher(
                'notificationCenter',
                options.engine.client.subscribeCommentUpdatesGlobal({ state }),
                options.engine.client.client,
                this.handleEvent,
                this.handleSeqUpdated,
                undefined,
                state,
                async st => {
                    await this.engine.options.store.writeKey('comments_global_updates_state', st);
                },
            );
        })();

        AppVisibility.watch(this.handleVisibleChanged);
        this.handleVisibleChanged(AppVisibility.isVisible);
    }

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
            this.engine.notificationCenter.handleCommentSubscriptionUpdate(event);
        } else {
            log.log('Unhandled update');
        }
    };
}
