import * as React from 'react';
import { Image, View } from 'react-native';
import { declareView } from './internals/declareView';
import { ASViewStyle } from './ASViewStyle';

export interface ASImageProps extends ASViewStyle {
    source: any;
}

class ASImageFallback extends React.PureComponent<ASImageProps> {
    render() {
        return (
            <View>{this.props} </View>
        );
    }
}

export const ASImage = declareView('image', ASImageFallback, (src) => {
    return { ...src, source: Image.resolveAssetSource(src.source).uri };
});