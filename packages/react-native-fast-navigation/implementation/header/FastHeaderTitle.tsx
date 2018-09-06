import * as React from 'react';
import { Animated } from 'react-native';
import { FastHeaderConfig } from '../../FastHeaderConfig';
import { FastHeaderTitleAndroid } from './FastHeaderTitleAndroid';
import { FastHeaderTitleIOS } from './FastHeaderTitleIOS';
import { FastScrollValue } from '../../FastScrollValue';

export interface FastHeaderTitleProps {
    index: number;
    appearance: 'ios' | 'android';
    titleText?: string;
    headerAppearance: 'small' | 'small-hidden' | 'large';
    subtitleText?: string;
    titleView?: any;
    rightView?: any;

    progress: Animated.AnimatedInterpolation;
    contentOffset: FastScrollValue;
    headerBaseHeight: Animated.AnimatedInterpolation;
    headerHeight: Animated.AnimatedInterpolation;
    config: FastHeaderConfig;
}

export class FastHeaderTitle extends React.PureComponent<FastHeaderTitleProps> {

    render() {
        if (this.props.appearance === 'android') {
            return <FastHeaderTitleAndroid {...this.props} />;
        } else {
            return <FastHeaderTitleIOS {...this.props} />;
        }
    }
}