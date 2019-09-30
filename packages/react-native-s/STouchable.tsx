import * as React from 'react';
import { TouchableNativeFeedback, TouchableOpacity, View, Platform, ViewStyle, Insets } from 'react-native';

interface STouchableProps {
    onPress?: () => void;
    style?: ViewStyle;
    hitSlop?: Insets;
    disabled?: boolean;
    children: any;
}

export const STouchable = React.memo((props: STouchableProps) => {
    const { onPress, style, hitSlop, disabled, children } = props;

    if (Platform.OS === 'android' && Platform.Version >= 21) {
        return (
            <TouchableNativeFeedback disabled={disabled} onPress={onPress} hitSlop={hitSlop} background={TouchableNativeFeedback.Ripple('rgba(0, 0, 0, .24)', true)} delayPressIn={0}>
                <View style={style}>
                    {children}
                </View>
            </TouchableNativeFeedback>
        );
    }
    return (
        <TouchableOpacity disabled={disabled} onPress={onPress} style={style} hitSlop={hitSlop} delayPressIn={0}>
            {children}
        </TouchableOpacity>
    );
});