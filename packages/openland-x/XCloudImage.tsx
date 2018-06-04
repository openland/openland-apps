import * as React from 'react';

export interface XImageCrop {
    left: number;
    top: number;
    width: number;
    height: number;
}

export function XCloudImage(props: {
    src?: string | null,
    srcUrl?: string | null,
    crop?: XImageCrop | null,
    placeholder?: string | null, className?: string,
    maxWidth?: number, maxHeight?: number,
    width?: number, height?: number,
    resize?: 'fill' | 'fit'
}) {

    if (props.src) {
        let scale: string | null = null;
        let scaleRetina: string | null = null;
        let scaleWidth = props.width!! ? props.width!! : (props.maxWidth ? props.maxWidth!! : null);
        let scaleHeight = props.height!! ? props.height!! : (props.maxHeight ? props.maxHeight!! : null);

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
            if (props.crop) {
                ops += `-/crop/${props.crop.width}x${props.crop.height}/${props.crop.left},${props.crop.top}/`;
                opsRetina += `-/crop/${props.crop.width}x${props.crop.height}/${props.crop.left},${props.crop.top}/`;
            }
            if (props.resize === 'fill') {
                ops += '-/format/jpeg/-/scale_crop/' + scale + '/center/-/progressive/yes/';
                opsRetina += '-/format/jpeg/-/scale_crop/' + scaleRetina + '/center/-/quality/lightest/-/progressive/yes/';
            } else {
                ops += '-/format/jpeg/-/preview/' + scale + '/-/setfill/ffffff/-/crop/' + scale + '/center/-/progressive/yes/';
                opsRetina += '-/format/jpeg/-/preview/' + scaleRetina + '/-/setfill/ffffff/-/crop/' + scaleRetina + '/center/-/quality/lightest/-/progressive/yes/';
            }
            let url = 'https://ucarecdn.com/' + props.src + '/' + ops;
            let urlRetina = 'https://ucarecdn.com/' + props.src + '/' + opsRetina;
            return (
                <img src={url}
                    srcSet={urlRetina}
                    className={props.className}
                    style={{
                        maxWidth: props.maxWidth,
                        maxHeight: props.maxHeight,
                        width: props.width,
                        height: props.height
                    }} />
            );
        } else {
            let url2 = 'https://ucarecdn.com/' + props.src + '/';
            return (
                <img src={url2}
                    className={props.className}
                    style={{
                        maxWidth: props.maxWidth,
                        maxHeight: props.maxHeight,
                        width: props.width,
                        height: props.height
                    }} />
            );
        }
    } else if (props.srcUrl) {
        return (
            <img src={props.srcUrl!!}
                className={props.className}
                style={{
                    maxWidth: props.maxWidth,
                    maxHeight: props.maxHeight,
                    width: props.width,
                    height: props.height
                }} />
        );
    } else {
        return (
            <img src={props.placeholder!!} className={props.className}
                style={{
                    maxWidth: props.maxWidth,
                    maxHeight: props.maxHeight,
                    width: props.width,
                    height: props.height
                }} />
        );
    }
}