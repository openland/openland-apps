import * as React from 'react';
import { View } from 'react-native';
import { declareView } from './internals/declareView';
import { ASViewStyle } from './ASViewStyle';

export interface ASFlexProps extends ASViewStyle {
    flexDirection?: 'row' | 'column';
    alignItems?: 'flex-start' | 'flex-end' | 'center' | 'stretch';
    justifyContent?: 'flex-start' | 'flex-end' | 'center';
}

class ASFlexFallback extends React.PureComponent<ASFlexProps> {
    render() {
        return (
            <View flexDirection={this.props.flexDirection} alignItems={this.props.alignItems} justifyContent={this.props.justifyContent}>
                {this.props}
            </View>
        );
    }
}

export const ASFlex = declareView('flex', ASFlexFallback);