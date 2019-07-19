import * as React from 'react';
import { Text, Image, View, Platform } from 'react-native';
import { STouchable } from 'react-native-s/STouchable';
import { XMemo } from 'openland-y-utils/XMemo';
import { TypeStyles } from 'openland-mobile/styles/AppStyles';

export const ActionButton = XMemo<{ title: string, icon?: any, iconColor?: string, accentColor?: string, onPress?: () => void }>(props => {
    const { title, iconColor, accentColor, icon, onPress } = props;
    const size = Platform.OS === 'ios' ? 44 : 48;

    if (icon) {
        return (
            <STouchable onPress={onPress}>
                <View style={{ width: size, height: size, alignItems: 'center', justifyContent: 'center' }}>
                    <Image source={icon} style={{ width: 24, height: 24, tintColor: iconColor || '#78808F' }} resizeMode="contain" />
                </View>
            </STouchable>
        );
    }

    return (
        <STouchable onPress={onPress}>
            <View style={{ height: size, alignItems: 'center', justifyContent: 'center' }}>
                <Text style={[TypeStyles.label1, { marginLeft: 12, marginRight: 12, color: accentColor || '#78808F' }]} allowFontScaling={false}>
                    {title}
                </Text>
            </View>
        </STouchable>
    );
});

export const ActionButtonView = XMemo<{ onPress?: () => void; children?: any }>((props) => (
    <STouchable style={{ alignItems: 'center', justifyContent: 'center', height: Platform.OS === 'ios' ? 44 : 48 }} onPress={props.onPress}>
        {props.children}
    </STouchable>
));