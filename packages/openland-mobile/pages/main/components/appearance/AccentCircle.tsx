import * as React from 'react';
import { View, TouchableOpacity, Image, LayoutChangeEvent } from 'react-native';
import { ThemeContext } from 'openland-mobile/themes/ThemeContext';
import { isPad } from 'openland-mobile/pages/Root';

interface AccentCircleProps {
    color: string;
    checked: boolean;
    onPress: () => void;
}

export const AccentCircle = React.memo((props: AccentCircleProps) => {
    const { color, checked, onPress } = props;
    const theme = React.useContext(ThemeContext);

    const [height, setHeight] = React.useState(0);
    const onLayout = React.useCallback((e: LayoutChangeEvent) => {
        setHeight(e.nativeEvent.layout.width - 16);
    }, []);

    return (
        <View width={isPad ? '12.5%' : '25%'} padding={8} onLayout={onLayout}>
            <TouchableOpacity onPress={onPress} activeOpacity={0.64}>
                <View height={height} borderRadius={height / 2} backgroundColor={color} alignItems="center" justifyContent="center">
                    {checked && (
                        <Image
                            source={require('assets/ic-done-24.png')}
                            style={{
                                width: 24,
                                height: 24,
                                tintColor: color === theme.foregroundContrast ? theme.backgroundPrimary : theme.foregroundContrast
                            }}
                        />
                    )}
                </View>
            </TouchableOpacity>
        </View>
    );
});