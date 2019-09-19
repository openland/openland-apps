import { UImageCropT } from 'openland-web/components/unicorn/UFileUpload';

export function sanitizeImageRef(
    src: { uuid: string; crop?: UImageCropT | null } | null | undefined,
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
