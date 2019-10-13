import { requireNativeComponent, StyleProp, ViewStyle } from 'react-native';

export const AndroidSplashView = requireNativeComponent<{ style?: StyleProp<ViewStyle> }>('AndroidSplashView');