import * as React from 'react';
import { requireNativeComponent, StyleProp, ViewStyle, NativeSyntheticEvent } from 'react-native';

export interface ASKeyboardContextProps {
    contextKey: string;
    style?: StyleProp<ViewStyle>;
    onKeyboardChanged?: (event?: NativeSyntheticEvent<{ state: { height: number, duration: number, curve: number, name: string } }>) => void;
    bottomSafeInset?: number;
}

export const ASKeyboardContext = requireNativeComponent<ASKeyboardContextProps>('RNAsyncKeyboardContextView');

export const ASKeyboardAcessoryViewContext = React.createContext<{ updateSize: (height: number) => void } | undefined>(undefined);