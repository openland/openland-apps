export function sanitizeIamgeRef(src: { uuid: string, crop?: { x: number, y: number, w: number, h: number } | null } | null | undefined) {
    if (src !== null && src !== undefined) {
        return {
            uuid: src.uuid,
            crop: src.crop ? {
                x: Math.round(src.crop.x),
                y: Math.round(src.crop.y),
                w: Math.round(src.crop.w),
                h: Math.round(src.crop.h)
            } : null
        };
    }
    return null;
}