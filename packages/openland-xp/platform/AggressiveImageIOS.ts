import { requireNativeComponent, StyleProp, ViewStyle } from 'react-native';

export const AggressiveImageIOS = requireNativeComponent<{ style?: StyleProp<ViewStyle>, source: string, capInsets?: { top: number, left: number, right: number, bottom: number } }>('AggressiveImage');