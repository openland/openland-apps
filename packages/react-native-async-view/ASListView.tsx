import * as React from 'react';
import { View } from 'react-native';
import { declareView } from './internals/declareView';
import { ASViewStyle } from './ASViewStyle';
import { ASDataView } from './ASDataView';

export interface ASListViewProps extends ASViewStyle {
    contentPaddingTop?: number;
    contentPaddingBottom?: number;
    inverted?: boolean;
    dataView: ASDataView<any>;
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

export const ASListView = declareView('list', Fallback, (src) => {
    let { dataView, ...other } = src;
    return { ...other, dataViewKey: dataView.key };
});