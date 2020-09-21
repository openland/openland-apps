import * as React from 'react';
import { Animated, View, Text, TouchableWithoutFeedback, Image } from 'react-native';
import { TextStyles, RadiusStyles } from 'openland-mobile/styles/AppStyles';
import { ThemeContext } from 'openland-mobile/themes/ThemeContext';

interface InputTopViewProps {
    title: string;
    text: string;
    textColor?: string;
    leftElement?: JSX.Element;
    icon: NodeRequire;
    onClearPress: () => void;
    isClosing?: boolean;
}

export const InputTopView = (props: InputTopViewProps) => {
    const { title, text, icon, textColor, leftElement, isClosing, onClearPress } = props;
    const theme = React.useContext(ThemeContext);
    const fadeAnim = React.useRef(new Animated.Value(1)).current;
    React.useEffect(() => {
        if (isClosing) {
            Animated.timing(
                fadeAnim,
                {
                    toValue: 0,
                    duration: 150,
                }
            ).start();
        }
    }, [isClosing]);

    return (
        <Animated.View height={isClosing ? 0 : undefined} paddingVertical={8} paddingLeft={16} flexDirection="row" style={{ opacity: fadeAnim }}>
            <View marginRight={16} alignItems="center" justifyContent="center">
                <Image source={icon} style={{ tintColor: theme.foregroundSecondary, width: 24, height: 24 }} />
            </View>
            <View flexDirection="row" flexGrow={1} flexShrink={1}>
                {leftElement}
                <View flexGrow={1} flexShrink={1}>
                    <Text style={{ ...TextStyles.Label2, color: theme.foregroundPrimary, height: 20 }} ellipsizeMode="tail" numberOfLines={1} allowFontScaling={false}>{title}</Text>
                    <Text style={{ ...TextStyles.Subhead, color: textColor || theme.foregroundSecondary, marginTop: 2, height: 20 }} ellipsizeMode="tail" numberOfLines={1} allowFontScaling={false}>{text}</Text>
                </View>
            </View>
            <TouchableWithoutFeedback onPress={onClearPress}>
                <View width={56} alignItems="center" justifyContent="center">
                    <View width={24} height={24} borderRadius={RadiusStyles.Medium} backgroundColor={theme.backgroundTertiaryTrans} alignItems="center" justifyContent="center">
                        <Image source={require('assets/ic-close-16.png')} style={{ tintColor: theme.foregroundSecondary, width: 16, height: 16 }} />
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </Animated.View>
    );
};