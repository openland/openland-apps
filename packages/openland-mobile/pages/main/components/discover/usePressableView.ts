import * as React from 'react';
import { Animated } from 'react-native';

interface ReturnedProps {
    handlePressIn: () => void;
    handlePressOut: () => void;
    delayPressIn: number;
    styles: any;
}
export const usePressableView = (): ReturnedProps => {
    const animation = React.useRef(new Animated.Value(0)).current;
    const handlePressIn = () => {
        Animated.timing(animation, {
            toValue: 1,
            duration: 150,
            useNativeDriver: true
        }).start();
    };
    const handlePressOut = () => {
        Animated.timing(animation, {
            toValue: 0,
            duration: 150,
            useNativeDriver: true
        }).start();
    };
    const transform = [{
        scale: animation.interpolate({
            inputRange: [0, 1],
            outputRange: [1, 0.95],
        })
    }];
    const styles = {
        position: 'relative',
        transform,
    };
    const delayPressIn = 100;
    return ({
        handlePressIn,
        handlePressOut,
        styles,
        delayPressIn,
    });
};