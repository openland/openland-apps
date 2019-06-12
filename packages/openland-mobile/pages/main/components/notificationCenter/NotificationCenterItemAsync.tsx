import * as React from 'react';
import { ASFlex } from 'react-native-async-view/ASFlex';
import { ASText } from 'react-native-async-view/ASText';
import { DialogDataSourceItem } from 'openland-engines/messenger/DialogListEngine';
import { useThemeGlobal } from 'openland-mobile/themes/ThemeContext';
import { AppTheme } from 'openland-mobile/themes/themes';
import { XMemo } from 'openland-y-utils/XMemo';

interface NotificationCenterItemAsyncProps {
    item: DialogDataSourceItem; // temp
    
    onPress?: (id: string) => void;
    onLongPress?: (id: string) => void;
}

const NotificationCenterItemAsyncRender = XMemo<NotificationCenterItemAsyncProps & { theme: AppTheme }>((props) => {
    const { theme, item } = props;

    const handlePress = React.useCallback(() => {
        if (props.onPress) {
            props.onPress(item.key);
        }
    }, [item.key]);

    const handleLongPress = React.useCallback(() => {
        if (props.onLongPress) {
            props.onLongPress(item.key);
        }
    }, [item.key]);

    return (
        <ASFlex
            onPress={handlePress}
            onLongPress={handleLongPress}
        >
            <ASText color={theme.textColor}>{item.title}</ASText>
        </ASFlex>
    );
});

export const NotificationCenterItemAsync = XMemo<NotificationCenterItemAsyncProps>((props) => {
    let theme = useThemeGlobal();

    return <NotificationCenterItemAsyncRender theme={theme} {...props} />;
});