import * as React from 'react';
import { Animated } from 'react-native';
import { ZHeaderTitleAndroid } from './ZHeaderTitleAndroid';
import { ZHeaderTitleIOS } from './ZHeaderTitleIOS';

export interface ZHeaderTitleProps {
    index: number;
    appearance: 'ios' | 'android';
    titleText?: string;
    headerAppearance: 'small' | 'small-hidden' | 'large';
    subtitleText?: string;
    titleView?: any;
    rightView?: any;

    progress: Animated.AnimatedInterpolation;
    contentOffset: Animated.AnimatedValue;
    hairlineOffset: Animated.AnimatedInterpolation;
}

export class ZHeaderTitle extends React.PureComponent<ZHeaderTitleProps> {

    render() {
        if (this.props.appearance === 'android') {
            return <ZHeaderTitleAndroid {...this.props} />;
        } else {
            return <ZHeaderTitleIOS {...this.props} />;
        }
    }
}