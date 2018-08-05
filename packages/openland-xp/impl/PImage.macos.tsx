import * as React from 'react';
import { PImageProps } from './PImageProps';
import { PixelRatio, Image, View } from 'react-native';

export function buildBaseImageUrl(source?: { uuid: string, crop?: { x: number, y: number, w: number, h: number } | null }) {
    if (!source) {
        return undefined;
    }
    let res = 'https://ucarecdn.com/' + source.uuid + '/';
    if (source.crop) {
        res += `-/crop/${source.crop.w}x${source.crop.h}/${source.crop.x},${source.crop.y}/`;
    }
    return res;
}

export class PImage extends React.Component<PImageProps> {
    render() {
        let baseUrl: string | undefined;
        if (this.props.source) {
            if (typeof this.props.source === 'string') {
                baseUrl = this.props.source;
            } else {
                baseUrl = buildBaseImageUrl(this.props.source);
            }
        }

        let url = baseUrl;
        if (baseUrl && baseUrl.startsWith('https://ucarecdn.com/') && this.props.resize !== 'none') {
            let w = PixelRatio.getPixelSizeForLayoutSize(this.props.width);
            let h = PixelRatio.getPixelSizeForLayoutSize(this.props.height);
            url += '-/scale_crop/' + w + 'x' + h + '/';
            if (PixelRatio.get() > 2) {
                url += '-/quality/lighter/-/progressive/yes/';
            }
        }
        return (
            <Image
                source={{ uri: url }}
                style={{
                    width: this.props.width,
                    height: this.props.height,
                    borderRadius: this.props.borderRadius,
                    borderTopLeftRadius: this.props.borderTopLeftRadius,
                    borderTopRightRadius: this.props.borderTopRightRadius,
                    borderBottomLeftRadius: this.props.borderBottomLeftRadius,
                    borderBottomRightRadius: this.props.borderBottomRightRadius
                }}
            />
        );
    }
}