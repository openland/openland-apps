import React from 'react';
import { Animated, Easing, Platform, ActivityIndicator, View } from 'react-native';

type LoaderSpinnerSize = 'small' | 'medium' | 'large';

export interface LoaderSpinnerProps {
    size?: 'small' | 'medium' | 'large';
    color?: string;
}

const loaderSize: { [key in LoaderSpinnerSize]: number } = {
    small: 16,
    medium: 24,
    large: 32
};

const loaderIcon: { [key in LoaderSpinnerSize]: NodeRequire } = {
    small: require('assets/ic-loader-16.png'),
    medium: require('assets/ic-loader-24.png'),
    large: require('assets/ic-loader-32.png')
};

export function LoaderSpinnerIOS({ size = 'medium', color }: LoaderSpinnerProps) {
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

    return <Animated.Image style={[{ transform: [{ rotate }], width: loaderSize[size], height: loaderSize[size] }, !!color && { tintColor: color }]} source={loaderIcon[size]} />;
}

export const LoaderSpinnerAndroid = ({ size = 'medium', color }: LoaderSpinnerProps) => (
    <ActivityIndicator color={color || '#C4C7CC'} size={loaderSize[size]} />
);

export const LoaderSpinner = Platform.OS === 'ios' ? LoaderSpinnerIOS : LoaderSpinnerAndroid;

export const LoaderSpinnerWrapped = React.memo(() => (
    <View style={{ height: 56, alignItems: 'center', justifyContent: 'center' }}>
        <LoaderSpinner />
    </View>
));