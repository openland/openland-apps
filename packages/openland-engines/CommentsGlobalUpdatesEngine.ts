import { MessengerEngine } from './MessengerEngine';
import { OpenlandClient } from 'openland-api/OpenlandClient';
import { createLogger } from 'mental-log';
import * as Types from 'openland-api/Types';
import { SequenceModernWatcher } from './core/SequenceModernWatcher';
import { NotificationCenterEngine } from './NotificationCenterEngine';

const log = createLogger('Engine-CommentsGlobalUpdatesEngine');

type CommentsGlobalUpdatesEngineOptions = {
    engine: MessengerEngine;
    notificationCenterEngine: NotificationCenterEngine;
    mocked?: boolean;
};

export class CommentsGlobalUpdatesEngine {
    private readonly options: CommentsGlobalUpdatesEngineOptions;
    private watcher: SequenceModernWatcher<
        Types.CommentUpdatesGlobal,
        Types.CommentUpdatesGlobalVariables
    > | null = null;

    constructor(options: CommentsGlobalUpdatesEngineOptions) {
        this.options = options;
        (async () => {
            const state =
                (await options.engine.options.store.readKey('comments_global_updates_state'));

            this.watcher = new SequenceModernWatcher(
                'commentsGlobalUpdatesEngine',
                options.engine.client.subscribeCommentUpdatesGlobal({ state }),
                options.engine.client.client,
                this.handleEvent,
                undefined,
                undefined,
                state,
                async st => {
                    await this.options.engine.options.store.writeKey('comments_global_updates_state', st);
                },
            );
        })();
    }

    handleEvent = async (event: Types.CommentGlobalUpdateFragment) => {
        log.log('Event Recieved: ' + event.__typename);

        if (event.__typename === 'CommentPeerUpdated') {
            await this.options.notificationCenterEngine.handleCommentSubscriptionUpdate(event);
        } else {
            log.log('Unhandled update');
        }
    };
}
