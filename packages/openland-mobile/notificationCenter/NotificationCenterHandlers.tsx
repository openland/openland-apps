import { ActionSheetBuilder } from 'openland-mobile/components/ActionSheet';
import { NotificationsDataSourceItem } from 'openland-engines/NotificationCenterEngine';
import { getClient } from 'openland-mobile/utils/graphqlClient';
import { CommentSubscriptionType } from 'openland-api/spacex.types';
import { getMessenger } from 'openland-mobile/utils/messenger';
import Toast from 'openland-mobile/components/Toast';

class NotificationCenterHandlersClass {
    handlePress = (id: string, item: NotificationsDataSourceItem) => {
        const { peerRootId, peerRootType } = item;

        if (peerRootType === 'CommentPeerRootMessage') {
            getMessenger().history.navigationManager.push('Message', { messageId: peerRootId });
        } else if (peerRootType === 'CommentPeerRootFeedItem') {
            getMessenger().history.navigationManager.push('FeedItem', { feedItemId: peerRootId });
        }
    }

    toggleSubscription = async (peerRootId: string, isSubscribed: boolean | undefined) => {
        const client = getClient();
        const loader = Toast.loader();
        loader.show();
        try {
            if (isSubscribed) {
                await client.mutateUnSubscribeFromComments({ peerId: peerRootId });
            } else {
                await client.mutateSubscribeToComments({ peerId: peerRootId, type: CommentSubscriptionType.ALL });
            }
            Toast.showSuccess(isSubscribed ? 'Unfollowed' : 'Followed');
        } catch (e) {
            console.warn(e);
        } finally {
            loader.hide();
        }
    }

    handleLongPress = (id: string, item: NotificationsDataSourceItem) => {
        const builder = new ActionSheetBuilder();

        if (item.notificationType !== 'unsupported' && item.peerRootId) {
            builder.action(
                item.isSubscribedMessageComments ? 'Unfollow thread' : 'Follow thread',
                () => this.toggleSubscription(item.peerRootId!, item.isSubscribedMessageComments),
                false,
                item.isSubscribedMessageComments ? require('assets/ic-follow-off-24.png') : require('assets/ic-follow-24.png')
            );
        }

        builder.action('Clear', async () => {
            await this.deleteNotifications([id]);
        }, false, require('assets/ic-delete-24.png'));

        builder.show(true);
    }

    handleReplyPress = (id: string, item: NotificationsDataSourceItem) => {
        const { peerRootId, peerRootType } = item;

        if (peerRootType === 'CommentPeerRootMessage') {
            getMessenger().history.navigationManager.push('Message', {
                messageId: peerRootId,
                highlightId: item.id
            });
        } else if (peerRootType === 'CommentPeerRootFeedItem') {
            getMessenger().history.navigationManager.push('FeedItem', {
                feedItemId: peerRootId,
                highlightId: item.id
            });
        }
    }

    private deleteNotifications = async (ids: string[]) => {
        const client = getClient();

        const loader = Toast.loader();
        loader.show();

        try {
            for (let id of ids) {
                await client.mutateDeleteNotification({ notificationId: id });
            }
        } catch (e) {
            console.warn(e);
        } finally {
            loader.hide();
        }
    }
}

export const NotificationCenterHandlers = new NotificationCenterHandlersClass();