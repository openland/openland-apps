import * as React from 'react';
import { XMemo } from 'openland-y-utils/XMemo';
import { Text, View, Platform, Image } from 'react-native';
import { SHeaderView } from 'react-native-s/SHeaderView';
import { TextStyles } from 'openland-mobile/styles/AppStyles';
import { AppTheme } from 'openland-mobile/themes/themes';
import { SHeader } from 'react-native-s/SHeader';

export const NotificationCenterHeader = XMemo<{ theme: AppTheme }>((props) => {
    const { theme } = props;

    if (Platform.OS === 'android') {
        return <SHeader title="Comments" />
    }

    return (
        <SHeaderView>
            <View flexDirection="row" flexGrow={1} alignItems="center">
                <View width={36} height={36} justifyContent="center" alignItems="center">
                    <View style={{ position: 'absolute', top: 0, left: 0, bottom: 0, right: 0, height: 36, width: 36, backgroundColor: theme.accentColor, opacity: 0.1, borderRadius: 18 }} />
                    <Image source={require('assets/ic-comment-channel-22.png')} style={{ width: 22, height: 22, tintColor: theme.accentColor }} />
                </View>
                <View paddingLeft={12} flexGrow={1} justifyContent="center">
                    <Text style={{ color: props.theme.textColor, fontSize: 16, fontWeight: TextStyles.weight.medium }}>
                        Comments
                    </Text>
                </View>
            </View>
        </SHeaderView>
    );
});