
import { requireNativeComponent, StyleProp, ViewStyle } from 'react-native';

export const AsyncDisplayNodeNative = requireNativeComponent<{ style?: StyleProp<ViewStyle>, config?: string }>('AsyncDisplayNode');
export const AsyncDisplayListNative = requireNativeComponent<{ style?: StyleProp<ViewStyle>, config?: string }>('AsyncDisplayList');