import * as React from 'react';

export function XCloudImage(props: { src: string, className?: string, maxWidth?: number, maxHeight?: number, resize?: 'fill' | 'fit' }) {
    let scale: string | null = null;
    let scaleRetina: string | null = null;
    if (props.maxWidth && props.maxHeight) {
        scale = `${props.maxWidth}x${props.maxHeight}`;
        scaleRetina = `${props.maxWidth * 2}x${props.maxHeight * 2}`;
    } else if (props.maxWidth) {
        scale = `${props.maxWidth}x`;
        scaleRetina = `${props.maxWidth * 2}x`;
    } else if (props.maxHeight) {
        scale = `x${props.maxHeight}`;
        scaleRetina = `x${props.maxHeight * 2}`;
    }

    if (scale != null && scaleRetina != null) {
        let ops: string;
        let opsRetina: string;
        if (props.resize === 'fill') {
            ops = '-/scale_crop/' + scale + '/center/';
            opsRetina = '-/scale_crop/' + scaleRetina + '/center/';
        } else {
            ops = '/-/preview/' + scale + '/-/setfill/ffffff/-/crop/' + scale + '/center/';
            opsRetina = '/-/preview/' + scaleRetina + '/-/setfill/ffffff/-/crop/' + scaleRetina + '/center/';
            // ops = '/-/preview/' + scale + '/';
            // opsRetina = '/-/preview/' + scaleRetina + '/';
        }
        let url = 'https://ucarecdn.com/' + props.src + '/' + ops;
        let urlRetina = 'https://ucarecdn.com/' + props.src + '/' + opsRetina;
        return (
            <img src={url}
                 srcSet={urlRetina}
                 className={props.className}
                 style={{maxWidth: props.maxWidth, maxHeight: props.maxHeight}}/>
        );
    } else {
        let url2 = 'https://ucarecdn.com/' + props.src + '/';
        return (
            <img src={url2}
                 className={props.className}
                 style={{maxWidth: props.maxWidth, maxHeight: props.maxHeight}}/>
        );
    }
}