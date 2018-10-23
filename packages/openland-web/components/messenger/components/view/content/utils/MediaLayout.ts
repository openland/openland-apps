const MAX_W = 400;
const MAX_H = 400;

export function layoutMedia(width: number, height: number, maxWidth: number = MAX_W, maxHeight: number = MAX_H) {
    if (width > height) {
        if (width > maxWidth) {
            return {
                width: Math.round(maxWidth),
                height: Math.round(height * (maxWidth / width))
            };
        }
    } else if (height > maxHeight) {
        return {
            width: Math.round(width * (maxHeight / height)),
            height: Math.round(maxHeight)
        };
    }

    return { width, height };
}

export function layoutMediaReverse(width: number, height: number, minWidth: number, minHeight: number) {
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
        height: minHeight
    };
}