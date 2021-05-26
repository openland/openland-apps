import * as React from 'react';
import LinearGradient, { LinearGradientProps } from 'react-native-linear-gradient';
import { ZFlexStyle } from './ZFlexStyle';

export type ZLinearGradientProps = {
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
} & LinearGradientProps & ZFlexStyle;

export class ZLinearGradient extends React.Component<ZLinearGradientProps> {
    render() {
        let { fallbackColor, colors, start, end, ...other } = this.props;
        return (
            // <View {...other} overflow="hidden">
            <LinearGradient colors={colors} start={start} end={end} {...other} style={{ borderRadius: other.borderRadius }} >
                {this.props.children}
            </LinearGradient>
            // </View>
        );
    }
}