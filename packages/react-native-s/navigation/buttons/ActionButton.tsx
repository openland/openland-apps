import * as React from 'react';
import { Text, Image, View, Platform } from 'react-native';
import { STouchable } from 'react-native-s/STouchable';
import { TextStyles } from 'openland-mobile/styles/AppStyles';

interface ActionButtonProps {
    title: string;
    icon?: any;
    iconColor?: string;
    accentColor?: string;
    onPress?: () => void;
    disabled?: boolean;
}

export const ActionButton = React.memo((props: ActionButtonProps) => {
    const { title, iconColor, accentColor, icon, onPress, disabled } = props;
    const size = Platform.OS === 'ios' ? 44 : 48;

    if (icon) {
        return (
            <STouchable onPress={onPress} disabled={disabled}>
                <View style={{ width: size, height: size, alignItems: 'center', justifyContent: 'center' }}>
                    <Image source={icon} style={{ width: 24, height: 24, tintColor: iconColor }} resizeMode="contain" fadeDuration={0} />
                </View>
            </STouchable>
        );
    }

    return (
        <STouchable onPress={onPress} disabled={disabled}>
            <View style={{ height: size, alignItems: 'center', justifyContent: 'center' }}>
                <Text style={[TextStyles.Label1, { marginLeft: 12, marginRight: 12, color: disabled ? iconColor : accentColor }]} allowFontScaling={false}>
                    {title}
                </Text>
            </View>
        </STouchable>
    );
});

interface ActionButtonViewProps {
    onPress?: () => void;
    children?: any;
}

export const ActionButtonView = React.memo((props: ActionButtonViewProps) => (
    <STouchable style={{ alignItems: 'center', justifyContent: 'center', height: Platform.OS === 'ios' ? 44 : 48 }} onPress={props.onPress}>
        {props.children}
    </STouchable>
));