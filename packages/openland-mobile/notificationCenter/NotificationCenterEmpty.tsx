import * as React from 'react';
import { ThemeContext } from 'openland-mobile/themes/ThemeContext';
import { XMemo } from 'openland-y-utils/XMemo';
import { Image, Text } from 'react-native';
import { ASSafeAreaView } from 'react-native-async-view/ASSafeAreaView';
import { TypeStyles } from 'openland-mobile/styles/AppStyles';

export const NotificationCenterEmpty = XMemo((props) => {
    let theme = React.useContext(ThemeContext);

    return (
        <ASSafeAreaView flexGrow={1} paddingHorizontal={48} alignItems="center" justifyContent="center">
            <Image source={theme.type === 'Light' ? require('assets/img-empty.png') : require('assets/img-empty-dark.png')} style={{ width: 224, height: 224, marginBottom: 30 }} />
            <Text style={{ ...TypeStyles.body, color: theme.foregroundSecondary, textAlign: 'center' }} allowFontScaling={false}>
                Comments in threads you are involved in will be right here
            </Text>
        </ASSafeAreaView>
    );
});