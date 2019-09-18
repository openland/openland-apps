import { ActionSheetBuilder } from 'openland-mobile/components/ActionSheet';
import { NotificationsDataSourceItem } from 'openland-engines/NotificationCenterEngine';
import { getClient } from 'openland-mobile/utils/graphqlClient';
import { startLoader, stopLoader } from 'openland-mobile/components/ZGlobalLoader';
import { CommentSubscriptionType } from 'openland-api/Types';
import { getMessenger } from 'openland-mobile/utils/messenger';

class NotificationCenterHandlersClass {
    handlePress = (id: string, item: NotificationsDataSourceItem) => {
        const { peerRootId, peerRootType } = item;

        if (peerRootType === 'CommentPeerRootMessage') {
            getMessenger().history.navigationManager.push('Message', { messageId: peerRootId });
        } else if (peerRootType === 'CommentPeerRootFeedItem') {
            getMessenger().history.navigationManager.push('FeedItem', { feedItemId: peerRootId });
        }
    }

    handleLongPress = (id: string, item: NotificationsDataSourceItem) => {
        const client = getClient();
        const builder = new ActionSheetBuilder();

        if (item.notificationType !== 'unsupported' && item.peerRootType === 'CommentPeerRootMessage') {
            builder.action(item.isSubscribedMessageComments ? 'Unfollow thread' : 'Follow thread', async () => {
                startLoader();

                try {
                    if (item.isSubscribedMessageComments) {
                        await client.mutateUnSubscribeMessageComments({ messageId: item.peerRootId!! });
                    } else {
                        await client.mutateSubscribeMessageComments({ messageId: item.peerRootId!!, type: CommentSubscriptionType.ALL });
                    }
                } catch (e) {
                    console.warn(e);
                } finally {
                    stopLoader();
                }
            }, false, item.isSubscribedMessageComments ? require('assets/ic-follow-off-24.png') : require('assets/ic-follow-24.png'));
        }

        builder.action('Clear', async () => {
            await this.deleteNotifications([id]);
        }, false, require('assets/ic-delete-24.png'));

        builder.show(true);
    }

    handleManagePress = (items: NotificationsDataSourceItem[]) => {
        const builder = new ActionSheetBuilder();

        builder.action('Clear all', async () => {
            await this.deleteNotifications(items.map(item => item.key));
        }, false, require('assets/ic-delete-24.png'));

        builder.show();
    }

    handleReplyPress = (id: string, item: NotificationsDataSourceItem) => {
        const { peerRootId, peerRootType } = item;

        if (peerRootType === 'CommentPeerRootMessage') {
            getMessenger().history.navigationManager.push('Message', {
                messageId: peerRootId,
                highlightCommentId: item.id
            });
        } else if (peerRootType === 'CommentPeerRootFeedItem') {
            getMessenger().history.navigationManager.push('FeedItem', {
                feedItemId: peerRootId,
                highlightCommentId: item.id
            });
        }
    }

    private deleteNotifications = async (ids: string[]) => {
        const client = getClient();

        startLoader();

        try {
            for (let id of ids) {
                await client.mutateDeleteNotification({ notificationId: id });
            }
        } catch (e) {
            console.warn(e);
        } finally {
            stopLoader();
        }
    }
}

export const NotificationCenterHandlers = new NotificationCenterHandlersClass();