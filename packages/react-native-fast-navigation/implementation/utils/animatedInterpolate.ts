import { Animated } from 'react-native';

export function animatedInterpolate(value: Animated.AnimatedInterpolation, a: Animated.AnimatedInterpolation | number, b: Animated.AnimatedInterpolation | number) {
    return Animated.add(
        Animated.multiply(value, b),
        Animated.multiply(Animated.add(1, Animated.multiply(value, -1)), a));
}