import React from 'react';
import { Animated, Easing, Platform, ActivityIndicator } from 'react-native';

export interface LoaderSpinnerProps {
    size?: 'small' | 'large';
    color?: string;
}

export function LoaderSpinnerIOS({ size = 'small', color }: LoaderSpinnerProps) {
    const rotateValue = React.useRef(new Animated.Value(0)).current;

    React.useEffect(() => {
        Animated.loop(
            Animated.timing(rotateValue, {
                toValue: 1,
                duration: 1000,
                easing: Easing.linear,
                useNativeDriver: true,
            }),
            { iterations: -1 },
        ).start();
    }, []);

    const rotate = rotateValue.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg'],
    });

    const isSmall = size === 'small';
    const loaderIcon = isSmall
        ? require('assets/ic-loader-22.png')
        : require('assets/ic-loader-32.png');

    return <Animated.Image style={[{ transform: [{ rotate }] }, !!color && { tintColor: color }]} source={loaderIcon} />;
}

export const LoaderSpinnerAndroid = ({ size = 'small', color }: LoaderSpinnerProps) => (
    <ActivityIndicator color={color || '#C4C7CC'} size={size} />
);

export default Platform.OS === 'ios' ? LoaderSpinnerIOS : LoaderSpinnerAndroid;
