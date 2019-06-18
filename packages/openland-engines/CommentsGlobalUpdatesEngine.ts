import { MessengerEngine } from './MessengerEngine';
import { OpenlandClient } from 'openland-api/OpenlandClient';
import { createLogger } from 'mental-log';
import * as Types from 'openland-api/Types';
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

export class CommentsGlobalUpdatesEngine {
    readonly engine: MessengerEngine;
    readonly client: OpenlandClient;
    readonly isMocked: boolean;
    private watcher: SequenceModernWatcher<
        Types.CommentUpdatesGlobal,
        Types.CommentUpdatesGlobalVariables
    > | null = null;

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
                undefined,
                undefined,
                state,
                async st => {
                    await this.engine.options.store.writeKey('comments_global_updates_state', st);
                },
            );
        })();
    }

    handleEvent = async (event: Types.CommentGlobalUpdateFragment) => {
        log.log('Event Recieved: ' + event.__typename);

        if (event.__typename === 'CommentPeerUpdated') {
            this.engine.notificationCenter.handleCommentSubscriptionUpdate(event);
        } else {
            log.log('Unhandled update');
        }
    };
}
