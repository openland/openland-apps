import * as React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { View } from 'react-native';
import { ZFlexStyle } from './ZFlexStyle';

export interface ZLinearGradientProps extends ZFlexStyle {
    fallbackColor: string;
    colors: string[];
    start: { x: number, y: number };
    end: { x: number, y: number };
    borderRadius?: number;
    borderBottomLeftRadius?: number;
    borderBottomRightRadius?: number;
    borderTopLeftRadius?: number;
    borderTopRightRadius?: number;
    width?: number;
    height?: number;
}

export class ZLinearGradient extends React.Component<ZLinearGradientProps> {
    render() {
        let { fallbackColor, colors, start, end, ...other } = this.props;
        return (
            <View {...other} overflow="hidden">
                <LinearGradient colors={colors} start={start} end={end} {...other} >
                    {this.props.children}
                </LinearGradient>
            </View>
        );
    }
}