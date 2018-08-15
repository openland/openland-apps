const MAX_W = 400;
const MAX_H = 400;

export function layoutMedia(width: number, height: number, maxWidth: number = MAX_W, maxHeight: number = MAX_H) {

    if (width < maxWidth && height < maxHeight) {
        return { width, height };
    }

    const baseRatio = maxWidth / width;
    if (height * baseRatio < maxHeight) {
        return {
            width: Math.round(maxWidth),
            height: Math.round(height * baseRatio)
        };
    } else {
        return {
            width: Math.round(width * (maxHeight / height)),
            height: Math.round(maxHeight)
        };
    }
}