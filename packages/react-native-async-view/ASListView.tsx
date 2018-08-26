import * as React from 'react';
import { View } from 'react-native';
import { declareView } from './internals/declareView';
import { ASViewStyle } from './ASViewStyle';

export interface ASListViewProps extends ASViewStyle {
    contentPaddingTop?: number;
    contentPaddingBottom?: number;
    onScroll?: any;
}

class Fallback extends React.PureComponent<ASListViewProps> {
    render() {
        return (
            <View>
                {this.props}
            </View>
        );
    }
}

export const ASListView = declareView('list', Fallback);