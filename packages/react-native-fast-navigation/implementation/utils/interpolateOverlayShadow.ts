import { Animated } from 'react-native';

export function interpolateOverlayShadow(value: Animated.AnimatedInterpolation) {
    return value.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 0.2],
        extrapolate: 'clamp'
    });
}