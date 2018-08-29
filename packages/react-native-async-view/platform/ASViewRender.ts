import { requireNativeComponent, StyleProp, ViewStyle, NativeSyntheticEvent, NativeScrollEvent, Animated } from 'react-native';

export const ASViewRender = requireNativeComponent<{ style?: StyleProp<ViewStyle>, configKey: string }>('RNAsyncView');

export const ASViewListRender = Animated.createAnimatedComponent(requireNativeComponent<{
    style?: StyleProp<ViewStyle>,
    dataViewKey: string,
    inverted?: boolean,
    contentPaddingTop?: number,
    contentPaddingBottom?: number,
    onScroll?: (event?: NativeSyntheticEvent<NativeScrollEvent>) => void
}>('RNAsyncListView'));