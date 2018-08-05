import * as React from 'react';
import { PLinearGradientProps } from './PLinearGradientProps';
import { View } from 'react-native';

export class PLinearGradient extends React.Component<PLinearGradientProps> {
    render() {
        let { fallbackColor, colors, start, end, ...other } = this.props;
        return (
            <View backgroundColor={this.props.fallbackColor} {...other} >
                {this.props.children}
            </View>
        );
    }
}