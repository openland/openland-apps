import { requireNativeComponent, StyleProp, ViewStyle } from 'react-native';

export const ASKeyboardTracker = requireNativeComponent<{ style?: StyleProp<ViewStyle> }>('RNAsyncKeyboardView');