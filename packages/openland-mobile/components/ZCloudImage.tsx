import * as React from 'react';
import { Image, PixelRatio, StyleProp, ImageStyle } from 'react-native';

export class ZCloudImage extends React.PureComponent<{ width: number, height: number, src: string, style?: StyleProp<ImageStyle> }> {
    render() {
        let w = PixelRatio.getPixelSizeForLayoutSize(this.props.width);
        let h = PixelRatio.getPixelSizeForLayoutSize(this.props.height);
        let url = 'https://ucarecdn.com/' + this.props.src + '/';
        url += '-/scale_crop/' + w + 'x' + h + '/';
        return (<Image source={{ uri: url }} style={{ width: this.props.width, height: this.props.height, ...(this.props.style as any || {}) }} />);
    }
}