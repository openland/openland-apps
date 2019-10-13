import * as React from 'react';
import { requireNativeComponent, Platform, StyleProp, ViewStyle } from 'react-native';

export const AndroidSplashView = requireNativeComponent<{ style?: StyleProp<ViewStyle> }>('AndroidSplashView');