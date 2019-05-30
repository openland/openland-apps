import { XImageCropT } from 'openland-x/files/XFileUpload';

export function sanitizeImageRef(
    src: { uuid: string; crop?: XImageCropT | null } | null | undefined,
) {
    if (src !== null && src !== undefined) {
        return {
            uuid: src.uuid,
            crop: src.crop
                ? {
                      x: Math.round(src.crop.x),
                      y: Math.round(src.crop.y),
                      w: Math.round(src.crop.w),
                      h: Math.round(src.crop.h),
                  }
                : null,
        };
    }
    return null;
}
