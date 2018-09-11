import { requireNativeComponent, StyleProp, ViewStyle, NativeModules } from 'react-native';

export const ASAnimatedViewNative = requireNativeComponent<{ style?: StyleProp<ViewStyle>, animatedKey: string, pointerEvents?: 'box-none' | 'none' | 'box-only' | 'auto' }>('RNFastAnimatedView');
export const ASAnimatedViewManagerNative = NativeModules.RNFastAnimatedViewManager as { animate: (config: string) => void };