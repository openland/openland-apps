import { ActionSheetBuilder } from 'openland-mobile/components/ActionSheet';
import { Platform } from 'react-native';
import { checkPermissions } from 'openland-mobile/utils/permissions/checkPermissions';
import Picker, { ImageOrVideo } from 'react-native-image-crop-picker';
import RNThumbnail from 'react-native-thumbnail';

import { handlePermissionDismiss } from 'openland-mobile/utils/permissions/handlePermissionDismiss';
import { checkFileIsPhoto } from 'openland-y-utils/checkFileIsPhoto';
import { DocumentPicker, DocumentPickerUtil } from 'react-native-document-picker';
import { FileMeta } from './UploadManager';
import { isVideo } from 'openland-y-utils/mediaExtension';
import { t } from 'openland-mobile/text/useText';

type PickerMedia = {
    type: 'document' | 'photo' | 'video',
    name: string,
    path: string,
    size: number,
    duration?: number,
    previewPath?: string | undefined,
};

const getMediaThumbnail = async (path: string): Promise<string> => RNThumbnail.get(path.replace('file://', '')).then((x) => x.path);

const normalizeMedia = async (data: ImageOrVideo[]) => {
    let filesMeta = data.reduce((acc, response) => {
        const isPhoto = checkFileIsPhoto(response.path);
        if (isPhoto) {
            acc.images.push({ type: 'photo', name: 'image.jpg', path: response.path, size: response.size });
        } else {
            let duration = (response as any).duration;
            acc.videos.push({
                type: 'video',
                name: 'video.mp4',
                path: response.path,
                size: response.size,
                duration: duration
                    ? (duration < 1000) ? 1000 : Math.floor((response as any).duration)
                    : undefined,
            });
            acc.videosPreviews.push(getMediaThumbnail(response.path));
        }
        return acc;
    }, { images: [] as PickerMedia[], videos: [] as PickerMedia[], videosPreviews: [] as Promise<string>[] });

    let videos = filesMeta.videos;
    if (filesMeta.videosPreviews.length > 0) {
        const previews = await Promise.all(filesMeta.videosPreviews);
        videos = videos.map((x, i) => ({ ...x, previewPath: previews[i] }));
    }

    let imagesBatches = filesMeta.images.reduce((acc, image, i) => {
        let current = acc[acc.length - 1];
        if (!current || current && current.length === 4) {
            acc.push([image]);
        } else if (current && current.length < 4) {
            current.push(image);
        }
        return acc;
    }, [] as PickerMedia[][]);

    return { imagesBatches, videos };
};

export const showAttachMenu = (fileCallback?: (
    filesMeta: ({ type: 'document' | 'photo' | 'video' } & FileMeta)[]) => void,
    donationCb?: () => void
) => {
    let builder = new ActionSheetBuilder();

    builder.action(t('attachTakePhoto', 'Take photo'), async () => {
        if (await checkPermissions('camera')) {

            try {
                const response = await Picker.openCamera({
                    mediaType: Platform.select({ ios: 'any', default: 'photo' }),
                });
                let isPhoto = checkFileIsPhoto(response.path);
                const preview = await getMediaThumbnail(response.path);

                if (fileCallback) {
                    fileCallback([{
                        type: isPhoto ? 'photo' : 'video',
                        name: isPhoto ? 'image.jpg' : 'video.mp4',
                        path: response.path,
                        size: response.size,
                        previewPath: isPhoto ? undefined : preview,
                    }]);
                }
            } catch (e) {
                if (e.code === 'E_PERMISSION_MISSING') {
                    handlePermissionDismiss('camera');
                }
            }
        }
    }, false, require('assets/ic-camera-24.png'));

    if (Platform.OS === 'android') {
        builder.action(t('attachRecordVideo', 'Record video'), async () => {
            if (await checkPermissions('camera')) {
                try {
                    const response = await Picker.openCamera({
                        mediaType: 'video',
                    });
                    const preview = await getMediaThumbnail(response.path);
                    if (fileCallback) {
                        fileCallback([{
                            type: 'video',
                            name: 'video.mp4',
                            path: response.path,
                            size: response.size,
                            previewPath: preview,
                        }]);
                    }
                } catch (e) {
                    if (e.code === 'E_PERMISSION_MISSING') {
                        handlePermissionDismiss('camera');
                    }
                }
            }
        }, false, require('assets/ic-camera-video-24.png'));
    }

    builder.action(Platform.select({
        ios: t('attachPhotoIOS', 'Choose from library'),
        default: t('attachPhotoAndroid', 'Photo gallery')
    }), async () => {
        if (await checkPermissions('gallery')) {
            try {
                const pickerResponse = await Picker.openPicker({
                    multiple: true,
                    width: 1024,
                    height: 1024,
                    compressImageQuality: 1,
                    compressVideoPreset: '1280x720',
                    cropping: false,
                    maxFiles: Platform.select({ ios: 20, android: undefined }),
                    mediaType: Platform.select({ ios: 'any', android: 'photo', default: 'photo' })
                });

                if (fileCallback) {
                    let { imagesBatches, videos } = await normalizeMedia(pickerResponse);

                    if (imagesBatches.length > 0) {
                        imagesBatches.forEach(x => fileCallback(x));
                    }
                    if (videos.length > 0) {
                        videos.forEach(x => fileCallback([x]));
                    }
                }
            } catch (e) {
                if (e.code === 'E_PERMISSION_MISSING') {
                    handlePermissionDismiss('gallery');
                }
            }
        }
    }, false, require('assets/ic-gallery-24.png'));

    if (Platform.OS === 'android') {
        builder.action(t('attachVideo', 'Video gallery'), async () => {
            if (await checkPermissions('gallery')) {

                try {
                    const pickerResponse = await Picker.openPicker({
                        multiple: true,
                        width: 1024,
                        height: 1024,
                        compressImageQuality: 1,
                        compressVideoPreset: 'MediumQuality',
                        cropping: false,
                        mediaType: 'video'
                    });

                    if (fileCallback) {
                        let { imagesBatches, videos } = await normalizeMedia(pickerResponse);

                        if (imagesBatches.length > 0) {
                            imagesBatches.forEach(x => fileCallback(x));
                        }
                        if (videos.length > 0) {
                            videos.forEach(x => fileCallback([x]));
                        }
                    }
                } catch (e) {
                    if (e.code === 'E_PERMISSION_MISSING') {
                        handlePermissionDismiss('gallery');
                    }
                }
            }
        }, false, require('assets/ic-video-24.png'));
    }

    builder.action(Platform.select({
        ios: t('attachDocumentIOS', 'Send document'),
        default: t('attachDocumentAndroid', 'Document'),
    }), () => {
        DocumentPicker.show({ filetype: [DocumentPickerUtil.allFiles()] },
            (error, response) => {
                if (!response) {
                    return;
                }
                const isVideoFile = isVideo(response.fileName);
                if (isVideoFile) {
                    getMediaThumbnail(response.uri).then(preview => {
                        if (fileCallback) {
                            fileCallback([{
                                type: 'video',
                                name: response.fileName,
                                path: response.uri,
                                size: response.fileSize,
                                previewPath: preview,
                            }]);
                        }
                    });
                    return;
                }

                if (fileCallback) {
                    fileCallback([{
                        type: 'document',
                        name: response.fileName,
                        path: response.uri,
                        size: response.fileSize
                    }]);
                }
            }
        );
    }, false, require('assets/ic-document-24.png'));

    if (donationCb && Platform.OS !== 'ios') {
        builder.action(Platform.select({
            ios: t('attachDonationIOS', 'Make donation'),
            default: t('attachDonationAndroid', 'Donation'),
        }), () => {
            donationCb();
        }, false, require('assets/ic-donation-24.png'));
    }

    builder.show();
};
