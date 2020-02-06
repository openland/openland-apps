import { UImageCropT } from 'openland-web/components/unicorn/UFileUpload';
import { ImageRefInput } from 'openland-api/spacex.types';

export function sanitizeImageRef(
    src: { uuid: string; crop?: UImageCropT | null } | null | undefined,
): ImageRefInput | null {
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
