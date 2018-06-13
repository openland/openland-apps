export function sanitizeIamgeRef(src: { uuid: string, crop?: { x: number, y: number, w: number, h: number } | null } | null | undefined) {
    if (src !== null && src !== undefined) {
        return {
            uuid: src.uuid,
            crop: src.crop ? {
                x: src.crop.x,
                y: src.crop.y,
                w: src.crop.w,
                h: src.crop.h
            } : null
        };
    }
    return null;
}