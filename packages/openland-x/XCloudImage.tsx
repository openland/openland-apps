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
        const srcCloud = this.props.srcCloud || buildBaseImageUrl(this.props.photoRef);
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
                    ops += '-/format/jpeg/-/scale_crop/' + scale + '/center/-/progressive/yes/';
                    opsRetina += '-/format/jpeg/-/scale_crop/' + scaleRetina + '/center/-/quality/lighter/-/progressive/yes/';
                } else {
                    ops += '-/format/jpeg/-/preview/' + scale + '/-/setfill/ffffff/-/crop/' + scale + '/center/-/progressive/yes/';
                    opsRetina += '-/format/jpeg/-/preview/' + scaleRetina + '/-/setfill/ffffff/-/crop/' + scaleRetina + '/center/-/quality/lighter/-/progressive/yes/';
                }
                let url = srcCloud + ops;
                let urlRetina = srcCloud + opsRetina;
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