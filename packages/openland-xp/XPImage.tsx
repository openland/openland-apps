import * as React from 'react';
import { PImage } from './impl/PImage';
import { View } from 'react-native';
import { XPFlexStyle } from './XPFlexStyle';

export interface XPImageProps extends XPFlexStyle {
    source?: { uuid: string, crop?: { x: number, y: number, w: number, h: number } | null } | string | null;
    width: number;
    height: number;
    imageSize?: { width: number, height: number };
    resize?: 'fill' | 'fit' | 'none';
    borderRadius?: number;
    borderBottomLeftRadius?: number;
    borderBottomRightRadius?: number;
    borderTopLeftRadius?: number;
    borderTopRightRadius?: number;
    highPriority?: boolean;
    onLoaded?: () => void;
}

export class XPImage extends React.PureComponent<XPImageProps> {
    render() {
        let { source, resize, borderRadius, borderBottomLeftRadius, borderBottomRightRadius, borderTopLeftRadius, borderTopRightRadius, ...flex } = this.props;
        return (
            <View {...flex}>
                <PImage
                    source={this.props.source}
                    imageSize={this.props.imageSize}
                    highPriority={this.props.highPriority}
                    resize={this.props.resize}
                    width={this.props.width}
                    height={this.props.height}
                    borderRadius={this.props.borderRadius}
                    borderBottomLeftRadius={this.props.borderBottomLeftRadius}
                    borderBottomRightRadius={this.props.borderBottomRightRadius}
                    borderTopLeftRadius={this.props.borderTopLeftRadius}
                    borderTopRightRadius={this.props.borderTopRightRadius}
                    onLoaded={this.props.onLoaded}
                />
            </View>
        );
    }
}