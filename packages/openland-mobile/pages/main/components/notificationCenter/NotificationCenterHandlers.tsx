import * as React from 'react';
import { Alert } from 'openland-mobile/components/AlertBlanket';
import { ActionSheetBuilder } from 'openland-mobile/components/ActionSheet';
import { NotificationsDataSourceItem } from 'openland-engines/NotificationCenterEngine';
import { getClient } from 'openland-mobile/utils/graphqlClient';
import { startLoader, stopLoader } from 'openland-mobile/components/ZGlobalLoader';
import { CommentSubscriptionType } from 'openland-api/Types';

class NotificationCenterHandlersClass {
    handlePress = (id: string, item: NotificationsDataSourceItem) => {
        Alert.alert('onPress: ' + id);
    }

    handleLongPress = (id: string, item: NotificationsDataSourceItem) => {
        const client = getClient();
        const builder = new ActionSheetBuilder();

        builder.action(item.isSubscribedMessageComments ? 'Turn off notifications' : 'Turn on notifications', async () => {
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
        });

        builder.action('Remove this notification', async () => {
            startLoader();

            try {
                await client.mutateDeleteNotification({ notificationId: id });
            } catch (e) {
                console.warn(e);
            } finally {
                stopLoader();
            }
        });

        builder.show();
    }
}

export const NotificationCenterHandlers = new NotificationCenterHandlersClass();