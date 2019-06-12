import * as React from 'react';
import { XMemo } from 'openland-y-utils/XMemo';
import { Text, View, Platform } from 'react-native';
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
            <View flexDirection="row" flexGrow={1}>
                <View width={36} justifyContent="center">
                    <View style={{ height: 36, width: 36, backgroundColor: theme.accentColor, opacity: 0.1, borderRadius: 18 }} />
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