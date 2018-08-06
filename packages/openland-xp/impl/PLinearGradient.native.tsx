import * as React from 'react';
import { PLinearGradientProps } from './PLinearGradientProps';
import LinearGradient from 'react-native-linear-gradient';
import { View } from 'react-native';

export class PLinearGradient extends React.Component<PLinearGradientProps> {
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