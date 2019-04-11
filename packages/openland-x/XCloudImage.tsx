import * as React from 'react';

export interface XImageCrop {
    x: number;
    y: number;
    w: number;
    h: number;
}

export interface XPhotoRef {
    uuid: string;
    crop?: XImageCrop | null;
}

export interface XCloudImageProps {
    srcCloud?: string | null;
    photoRef?: XPhotoRef | null;
    src?: string | null;
    className?: string;
    maxWidth?: number;
    maxHeight?: number;
    width?: number;
    height?: number;
    resize?: 'fill' | 'fit';
    onLoad?: (event: React.SyntheticEvent<HTMLImageElement>) => void;
}

export function buildBaseImageUrl(image?: XPhotoRef | null) {
    if (!image) {
        return null;
    }
    let res = 'https://ucarecdn.com/' + image.uuid + '/';
    if (image.crop) {
        res += `-/crop/${image.crop.w}x${image.crop.h}/${image.crop.x},${image.crop.y}/`;
    }
    return res;
}

export class XCloudImage extends React.PureComponent<XCloudImageProps> {
    render() {
        const srcCloud = this.props.srcCloud ? this.props.srcCloud : buildBaseImageUrl(this.props.photoRef);
        if (srcCloud) {
            let scale: string | null = null;
            let scaleRetina: string | null = null;
            let scaleWidth = this.props.width ? this.props.width : (this.props.maxWidth ? this.props.maxWidth : null);
            let scaleHeight = this.props.height ? this.props.height : (this.props.maxHeight ? this.props.maxHeight : null);

            if (scaleWidth && scaleHeight) {
                scale = `${scaleWidth}x${scaleHeight}`;
                scaleRetina = `${scaleWidth * 2}x${scaleHeight * 2}`;
            } else if (scaleWidth) {
                scale = `${scaleWidth}x`;
                scaleRetina = `${scaleWidth * 2}x`;
            } else if (scaleHeight) {
                scale = `x${scaleHeight}`;
                scaleRetina = `x${scaleHeight * 2}`;
            }

            if (scale != null && scaleRetina != null) {
                let ops: string = '';
                let opsRetina: string = '';
                if (this.props.resize === 'fill') {
                    ops += '-/scale_crop/' + scale + '/center/';
                    opsRetina += '-/scale_crop/' + scaleRetina + '/center/-/quality/lighter/';
                } else {
                    ops += '-/preview/' + scale + '/-/setfill/000000/-/crop/' + scale + '/center/';
                    opsRetina += '-/preview/' + scaleRetina + '/-/setfill/000000/-/crop/' + scaleRetina + '/center/-/quality/lighter/';
                }
                let url = srcCloud + ops + '-/format/jpeg/-/progressive/yes/';
                let urlRetina = srcCloud + opsRetina + '-/format/jpeg/-/progressive/yes/';
                return (
                    <img
                        src={url}
                        srcSet={urlRetina}
                        className={this.props.className}
                        style={{
                            maxWidth: this.props.maxWidth,
                            maxHeight: this.props.maxHeight,
                            width: this.props.width,
                            height: this.props.height
                        }}
                        onLoad={this.props.onLoad}
                    />
                );
            } else {
                return (
                    <img
                        src={srcCloud}
                        className={this.props.className}
                        style={{
                            maxWidth: this.props.maxWidth,
                            maxHeight: this.props.maxHeight,
                            width: this.props.width,
                            height: this.props.height
                        }}
                        onLoad={this.props.onLoad}
                    />
                );
            }
        } else {
            return (
                <img
                    src={this.props.src ? this.props.src : undefined}
                    className={this.props.className}
                    style={{
                        maxWidth: this.props.maxWidth,
                        maxHeight: this.props.maxHeight,
                        width: this.props.width,
                        height: this.props.height
                    }}
                    onLoad={this.props.onLoad}
                />
            );
        }
    }
}