export interface XImageCrop {
    x: number;
    y: number;
    w: number;
    h: number;
}

export interface XPhotoRef {
    uuid: string;
    crop?: XImageCrop | null;
}

export function buildBaseImageUrl(image?: XPhotoRef | null) {
    if (!image) {
        return null;
    }
    let res = 'https://ucarecdn.com/' + image.uuid + '/';
    if (image.crop) {
        res += `-/crop/${image.crop.w}x${image.crop.h}/${image.crop.x},${image.crop.y}/`;
    }
    return res;
}