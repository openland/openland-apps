import { ActionSheetBuilder } from 'openland-mobile/components/ActionSheet';
import { Platform } from 'react-native';
import { checkPermissions } from 'openland-mobile/utils/permissions/checkPermissions';
import Picker, { ImageOrVideo } from 'react-native-image-crop-picker';
import MediaMeta from 'react-native-media-meta';

import { handlePermissionDismiss } from 'openland-mobile/utils/permissions/handlePermissionDismiss';
import { checkFileIsPhoto } from 'openland-y-utils/checkFileIsPhoto';
import { DocumentPicker, DocumentPickerUtil } from 'react-native-document-picker';
import { FileMeta } from './UploadManager';
import { VideoMeta } from 'openland-engines/messenger/types';
import { isVideo } from 'openland-mobile/utils/isVideo';

type PickerMedia = {
    type: 'document' | 'photo' | 'video',
    name: string,
    path: string,
    size: number,
    videoMeta?: VideoMeta,
};

type SourceVideoMeta = {
    thumb: string;
    height: number;
    width: number;
    duration: string;
};

const getMediaMeta = async (path: string) => MediaMeta.get(path.replace('file://', ''));

const extractVideoMeta = (meta: SourceVideoMeta): VideoMeta => ({
    duration: Math.floor(parseFloat(meta.duration) / 1000),
    preview: { thumbnail: 'data:image/png;base64,' + meta.thumb, width: meta.width, height: meta.height }
});

const normalizeMedia = async (data: ImageOrVideo[]) => {
    let filesMeta = data.reduce((acc, response) => {
        const isPhoto = checkFileIsPhoto(response.path);
        if (isPhoto) {
            acc.images.push({ type: 'photo', name: 'image.jpg', path: response.path, size: response.size });
        } else {
            acc.videos.push({ type: 'video', name: 'video.mp4', path: response.path, size: response.size });
            acc.videosMetas.push(getMediaMeta(response.path));
        }
        return acc;
    }, { images: [] as PickerMedia[], videos: [] as PickerMedia[], videosMetas: [] as Promise<SourceVideoMeta>[] });

    let videos = filesMeta.videos;
    if (filesMeta.videosMetas.length > 0) {
        const metas = await Promise.all(filesMeta.videosMetas);
        videos = videos.map((x, i) => ({ ...x, videoMeta: extractVideoMeta(metas[i]) }));
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

    builder.action(Platform.select({ ios: 'Take photo or video', default: 'Take photo' }), async () => {
        if (await checkPermissions('camera')) {

            try {
                const response = await Picker.openCamera({
                    mediaType: Platform.select({ ios: 'any', default: 'photo' }),
                });
                let isPhoto = checkFileIsPhoto(response.path);
                const meta = await getMediaMeta(response.path);

                if (fileCallback) {
                    fileCallback([{
                        type: isPhoto ? 'photo' : 'video',
                        name: isPhoto ? 'image.jpg' : 'video.mp4',
                        path: response.path,
                        size: response.size,
                        ...extractVideoMeta(meta),
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
        builder.action('Record video', async () => {
            if (await checkPermissions('camera')) {
                try {
                    const response = await Picker.openCamera({
                        mediaType: 'video',
                    });
                    const meta = await getMediaMeta(response.path);
                    if (fileCallback) {
                        fileCallback([{
                            type: 'video',
                            name: 'video.mp4',
                            path: response.path,
                            size: response.size,
                            ...extractVideoMeta(meta),
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

    builder.action(Platform.select({ ios: 'Choose from library', default: 'Photo gallery' }), async () => {
        if (await checkPermissions('gallery')) {
            try {
                const pickerResponse = await Picker.openPicker({
                    multiple: true,
                    width: 1024,
                    height: 1024,
                    compressImageQuality: 1,
                    compressVideoPreset: 'MediumQuality',
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
        builder.action('Video gallery', async () => {
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

    builder.action(Platform.select({ ios: 'Send document', default: 'Document' }), () => {
        DocumentPicker.show({ filetype: [DocumentPickerUtil.allFiles()] },
            (error, response) => {
                if (!response) {
                    return;
                }
                const isVideoFile = isVideo(response.fileName);
                if (isVideoFile) {
                    getMediaMeta(response.uri).then(meta => {
                        if (fileCallback) {
                            fileCallback([{
                                type: 'video',
                                name: response.fileName,
                                path: response.uri,
                                size: response.fileSize,
                                ...extractVideoMeta(meta),
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
        builder.action(Platform.select({ ios: 'Make donation', default: 'Donation' }), () => {
            donationCb();
        }, false, require('assets/ic-donation-24.png'));
    }

    builder.show();
};
