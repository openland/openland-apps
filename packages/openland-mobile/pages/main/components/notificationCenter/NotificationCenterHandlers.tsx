import * as React from 'react';
import { Alert } from 'openland-mobile/components/AlertBlanket';
import { ActionSheetBuilder } from 'openland-mobile/components/ActionSheet';

class NotificationCenterHandlersClass {
    handlePress = (id: string) => {
        Alert.alert('onPress: ' + id);
    }

    handleLongPress = (id: string) => {
        const builder = new ActionSheetBuilder();

        builder.action('Turn off notifications', () => {
            // ignore
        });

        builder.show();
    }
}

export const NotificationCenterHandlers = new NotificationCenterHandlersClass();