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