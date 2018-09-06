import { Animated, Dimensions, Platform } from 'react-native';

export function interpolateContent(value: Animated.AnimatedInterpolation) {
    let w = Dimensions.get('window').width;
    if (Platform.OS === 'ios') {
        return value.interpolate({
            inputRange: [-1, 0, 1],
            outputRange: [w, 0, -w * 0.3],
            extrapolate: 'clamp'
        });
    } else {
        return value.interpolate({
            inputRange: [-1, 0],
            outputRange: [w, 0],
            extrapolate: 'clamp'
        });
    }
}