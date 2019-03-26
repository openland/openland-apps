const MAX_W = 400;
const MAX_H = 400;
const MIN_W = 100;
const MIN_H = 100;

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
    if (width > height) {
        if (width > maxWidth) {
            w = Math.round(maxWidth);
            h = Math.round(height * (maxWidth / width));
        }
    } else if (height > maxHeight) {
        w = Math.round(width * (maxHeight / height));
        h = Math.round(maxHeight);
    }

    let previewWidth = w;
    let previewHeight = h;
    if (w < minWidth || h < minHeight) {
        previewWidth = minWidth;
        previewHeight = minWidth;
    }

    return { width: w, height: h, previewWidth, previewHeight };
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
