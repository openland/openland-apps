import * as React from 'react';
import { ASFlex } from 'react-native-async-view/ASFlex';
import { ASText } from 'react-native-async-view/ASText';
import { useThemeGlobal } from 'openland-mobile/themes/ThemeContext';
import { AppTheme } from 'openland-mobile/themes/themes';
import { XMemo } from 'openland-y-utils/XMemo';
import { NotificationsDataSourceItemStored } from 'openland-engines/NotificationCenterEngine';

interface NotificationCenterItemAsyncProps {
    item: NotificationsDataSourceItemStored;
    
    onPress?: (id: string, item: NotificationsDataSourceItemStored) => void;
    onLongPress?: (id: string, item: NotificationsDataSourceItemStored) => void;
}

const NotificationCenterItemAsyncRender = XMemo<NotificationCenterItemAsyncProps & { theme: AppTheme }>((props) => {
    const { theme, item } = props;

    const handlePress = React.useCallback(() => {
        if (props.onPress) {
            props.onPress(item.key, item);
        }
    }, [item.key]);

    const handleLongPress = React.useCallback(() => {
        if (props.onLongPress) {
            props.onLongPress(item.key, item);
        }
    }, [item.key]);

    return (
        <ASFlex
            onPress={handlePress}
            onLongPress={handleLongPress}
        >
            <ASText color={theme.textColor}>{JSON.stringify(item)}</ASText>
        </ASFlex>
    );
});

export const NotificationCenterItemAsync = XMemo<NotificationCenterItemAsyncProps>((props) => {
    let theme = useThemeGlobal();

    console.warn('boom', props.item);

    return <NotificationCenterItemAsyncRender theme={theme} {...props} />;
});