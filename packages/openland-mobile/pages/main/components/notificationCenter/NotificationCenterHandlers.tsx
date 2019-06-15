import * as React from 'react';
import { Alert } from 'openland-mobile/components/AlertBlanket';
import { ActionSheetBuilder } from 'openland-mobile/components/ActionSheet';
import { NotificationsDataSourceItem } from 'openland-engines/NotificationCenterEngine';

class NotificationCenterHandlersClass {
    handlePress = (id: string, item: NotificationsDataSourceItem) => {
        Alert.alert('onPress: ' + id);
    }

    handleLongPress = (id: string, item: NotificationsDataSourceItem) => {
        const builder = new ActionSheetBuilder();

        builder.action('Turn off notifications', () => {
            // ignore
        });

        builder.action('Remove this notification', () => {
            // ignore
        });

        builder.show();
    }
}

export const NotificationCenterHandlers = new NotificationCenterHandlersClass();