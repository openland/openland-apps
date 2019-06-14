import * as React from 'react';
import { Alert } from 'openland-mobile/components/AlertBlanket';
import { ActionSheetBuilder } from 'openland-mobile/components/ActionSheet';
import { NotificationsDataSourceItemStored } from 'openland-engines/NotificationCenterEngine';

class NotificationCenterHandlersClass {
    handlePress = (id: string, item: NotificationsDataSourceItemStored) => {
        Alert.alert('onPress: ' + id);
    }

    handleLongPress = (id: string, item: NotificationsDataSourceItemStored) => {
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