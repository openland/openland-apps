import * as React from 'react';
import { PLinearGradientProps } from './PLinearGradientProps';
import LinearGradient from 'react-native-linear-gradient';

export class PLinearGradient extends React.Component<PLinearGradientProps> {
    render() {
        let { fallbackColor, colors, start, end, ...other } = this.props;
        return (
            <LinearGradient colors={colors} start={start} end={end} {...other} >
                {this.props.children}
            </LinearGradient>
        );
    }
}