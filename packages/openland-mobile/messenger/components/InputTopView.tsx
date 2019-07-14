import * as React from 'react';
import { View, Text, TouchableWithoutFeedback, Image } from 'react-native';
import { TypeStyles, RadiusStyles } from 'openland-mobile/styles/AppStyles';
import { ThemeContext } from 'openland-mobile/themes/ThemeContext';

interface InputTopViewProps {
    title: string;
    text: string;
    icon: NodeRequire;
    onClearPress: () => void;
}

export const InputTopView = (props: InputTopViewProps) => {
    const { title, text, icon, onClearPress } = props;
    const theme = React.useContext(ThemeContext);

    return (
        <View paddingVertical={8} paddingLeft={16} flexDirection="row">
            <View marginRight={16} alignItems="center" justifyContent="center">
                <Image source={icon} style={{ tintColor: theme.foregroundSecondary, width: 24, height: 24 }} />
            </View>
            <View flexGrow={1} flexShrink={1}>
                <Text style={{ ...TypeStyles.label1, color: theme.foregroundPrimary }} ellipsizeMode="tail" numberOfLines={1} allowFontScaling={false}>{title}</Text>
                <Text style={{ ...TypeStyles.subhead, color: theme.foregroundSecondary }} ellipsizeMode="tail" numberOfLines={1} allowFontScaling={false}>{text}</Text>
            </View>
            <TouchableWithoutFeedback onPress={onClearPress}>
                <View width={56} alignItems="center" justifyContent="center">
                    <View width={24} height={24} borderRadius={RadiusStyles.medium} backgroundColor={theme.backgroundInverted} alignItems="center" justifyContent="center">
                        <Image source={require('assets/ic-input-clear-16.png')} style={{ tintColor: theme.foregroundTertiary, width: 16, height: 16 }} />
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </View>
    );
};