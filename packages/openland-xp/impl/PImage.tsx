import * as React from 'react';
import { PImageProps } from './PImageProps';

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

        if (baseUrl && baseUrl.startsWith('https://ucarecdn.com/') && this.props.resize !== 'none') {
            // Optimize image for CDN-based images
            let ops: string = '';
            let opsRetina: string = '';
            if (this.props.resize === 'fill') {
                ops += '-/format/jpeg/-/scale_crop/' + (this.props.width + 'x' + this.props.height) + '/center/-/progressive/yes/';
                opsRetina += '-/format/jpeg/-/scale_crop/' + ((this.props.width * 2) + 'x' + (this.props.height * 2)) + '/center/-/quality/lighter/-/progressive/yes/';
            } else {
                ops += '-/format/jpeg/-/preview/' + (this.props.width + 'x' + this.props.height) + '/-/setfill/ffffff/-/crop/' + (this.props.width + 'x' + this.props.height) + '/center/-/progressive/yes/';
                opsRetina += '-/format/jpeg/-/preview/' + ((this.props.width * 2) + 'x' + (this.props.height * 2)) + '/-/setfill/ffffff/-/crop/' + ((this.props.width * 2) + 'x' + (this.props.height * 2)) + '/center/-/quality/lighter/-/progressive/yes/';
            }
            return <img style={{ width: this.props.width, height: this.props.height, borderRadius: this.props.borderRadius }} src={baseUrl + ops} srcSet={baseUrl + opsRetina} />;
        } else {
            return <img style={{ width: this.props.width, height: this.props.height, borderRadius: this.props.borderRadius }} src={baseUrl} />;
        }
    }
}