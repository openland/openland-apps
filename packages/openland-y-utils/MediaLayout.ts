const MAX_W = 400;
const MAX_H = 400;
const MIN_W = 100;
const MIN_H = 100;

export interface MediaLayout {
    width: number;
    height: number;
}

export function layoutMedia(
    width: number,
    height: number,
    maxWidth: number = MAX_W,
    maxHeight: number = MAX_H,
    minWidth: number = MIN_W,
    minHeight: number = MIN_H,
) {
    let w = width;
    let h = height;

    // if image width is less than minWidth, upscale image width
    if (w <= minWidth) {
        w = minWidth;
        h = Math.round(height * (w / width));
    }

    // if image width is greater than maxWidth, downscale image width
    if (w >= maxWidth) {
        w = maxWidth;
        h = Math.round(height * (w / width));
    }

    // if previous scale changes made image height greater than maxHeight,
    // downscale image to fit it into maxHeight
    if (h >= maxHeight) {
        h = maxHeight;
        w = Math.round(width * (h / height));
    }

    return { width: w, height: h };
}

export function layoutMediaReverse(
    width: number,
    height: number,
    minWidth: number,
    minHeight: number,
) {
    if (width > height) {
        return {
            width: Math.round(width * (minHeight / height)),
            height: Math.round(minHeight),
        };
    } else if (height > width) {
        return {
            width: Math.round(minWidth),
            height: Math.round(height * (minWidth / width)),
        };
    }

    return {
        width: minWidth,
        height: minHeight,
    };
}

const maxUploadcareDimention = 3000;

const downScale = (params: { width: number; height: number }, max: number) => {
    let scale = 1;
    let biggerDimention = Math.max(params.width, params.height);
    if (biggerDimention > max) {
        scale = max / biggerDimention;
    }
    return { width: Math.round(params.width * scale), height: Math.round(params.height * scale) };
};

export const uploadcareOptions = (
    params: { width: number; height: number },
    scales: number[] = [1, 2],
) => {
    let res: string[] = [];
    for (let scale of scales) {
        let scaled = { width: params.width * scale, height: params.height * scale };
        let downScaled = downScale(scaled, maxUploadcareDimention);
        res.push(
            `scale_crop/${downScaled.width}x${downScaled.height}/${scale > 1 ? ` ${scale}x` : ''}`,
        );
    }
    return res;
};
