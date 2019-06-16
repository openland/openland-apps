import * as React from 'react';
import { ThemeContext } from 'openland-mobile/themes/ThemeContext';
import { XMemo } from 'openland-y-utils/XMemo';
import { Image, Text } from 'react-native';
import { ASSafeAreaView } from 'react-native-async-view/ASSafeAreaView';

export const NotificationCenterEmpty = XMemo((props) => {
    let theme = React.useContext(ThemeContext);

    return (
        <ASSafeAreaView flexGrow={1} paddingHorizontal={48} alignItems="center" justifyContent="center">
            <Image source={theme.imageEmpty} style={{ width: 224, height: 224, marginBottom: 30 }} />
            <Text style={{ fontSize: 15, color: theme.textLabelColor, textAlign: 'center' }} allowFontScaling={false}>
                Comments in threads you are involved in will be right here
            </Text>
        </ASSafeAreaView>
    );
});