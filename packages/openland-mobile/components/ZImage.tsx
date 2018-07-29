import * as React from 'react';
import { PixelRatio, StyleProp, ImageStyle } from 'react-native';
import FastImage from 'react-native-fast-image';

export class ZImage extends React.PureComponent<{ width: number, height: number, source: { uri?: string, uuid?: string }, resize?: boolean, style?: StyleProp<ImageStyle> }> {
    render() {
        let w = PixelRatio.getPixelSizeForLayoutSize(this.props.width);
        let h = PixelRatio.getPixelSizeForLayoutSize(this.props.height);
        let url = this.props.source.uri ? this.props.source.uri : 'https://ucarecdn.com/' + this.props.source.uuid + '/';
        if (this.props.resize !== false) {
            url += '-/scale_crop/' + w + 'x' + h + '/';
            if (PixelRatio.get() > 2) {
                url += '-/quality/lighter/-/progressive/yes/';
            }
        }
        return (<FastImage source={{ uri: url }} style={{ width: this.props.width, height: this.props.height, ...(this.props.style as any || {}) }} />);
    }
}