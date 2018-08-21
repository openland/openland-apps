import { requireNativeComponent, StyleProp, ViewStyle } from 'react-native';

export const ASViewRender = requireNativeComponent<{ style?: StyleProp<ViewStyle>, config: string }>('RNAsyncView');