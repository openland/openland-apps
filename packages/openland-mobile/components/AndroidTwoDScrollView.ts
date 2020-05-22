import { requireNativeComponent, StyleProp, ViewStyle } from 'react-native';
import { LegacyRef, Component } from 'react';

export interface AndroidTwoDScrollViewInstance extends Component {
    scrollTo(y?: number | { x?: number; y?: number; animated?: boolean }, x?: number, animated?: boolean): void;
}

export const AndroidTwoDScrollView = requireNativeComponent<{
    style?: StyleProp<ViewStyle>, 
    ref?: LegacyRef<AndroidTwoDScrollViewInstance>,
    containerWidth?: number,
    containerHeight?: number,
}>('AndroidTwoDScrollView');