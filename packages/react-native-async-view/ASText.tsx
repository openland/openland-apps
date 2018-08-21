import * as React from 'react';
import { Text, processColor } from 'react-native';
import { declareView } from './internals/declareView';
import { ASViewStyle } from './ASViewStyle';

export interface ASTextProps extends ASViewStyle {
    color?: string;
    fontSize?: number;
    fontWeight?: string;
    lineHeight?: number;
    numberOfLines?: number;
}

class ASTextFallback extends React.PureComponent<ASTextProps> {
    render() {
        return (
            <Text>{this.props} </Text>
        );
    }
}

export const ASText = declareView('text', ASTextFallback, (src) => {
    return { ...src, color: src.color ? processColor(src.color) : undefined };
});