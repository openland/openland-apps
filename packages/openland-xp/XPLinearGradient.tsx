import * as React from 'react';
import { XPFlexStyle } from './XPFlexStyle';
import { Text } from 'react-native';
import { PLinearGradient } from './impl/PLinearGradient';

export interface XPLinearGradientProps extends XPFlexStyle {
    fallbackColor: string;
    colors: string[];
    start: { x: number, y: number };
    end: { x: number, y: number };
    borderRadius?: number;
    borderBottomLeftRadius?: number;
    borderBottomRightRadius?: number;
    borderTopLeftRadius?: number;
    borderTopRightRadius?: number;
}

export class XPLinearGradient extends React.Component<{}> {
    render() {
        return <Text>{PLinearGradient}</Text>;
    }
}