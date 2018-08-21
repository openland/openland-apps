import * as React from 'react';
import { View } from 'react-native';
import { declareView } from './internals/declareView';
import { ASViewStyle } from './ASViewStyle';

export interface ASScrollViewProps extends ASViewStyle {
    
}

class Fallback extends React.PureComponent<ASScrollViewProps> {
    render() {
        return (
            <View>
                {this.props}
            </View>
        );
    }
}

export const ASScrollView = declareView('scroll', Fallback);