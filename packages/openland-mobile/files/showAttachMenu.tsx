import { ActionSheetBuilder } from 'openland-mobile/components/ActionSheet';
import { Platform } from 'react-native';
import { checkPermissions } from 'openland-mobile/utils/permissions/checkPermissions';
import Picker, { ImageOrVideo } from 'react-native-image-crop-picker';

import { handlePermissionDismiss } from 'openland-mobile/utils/permissions/handlePermissionDismiss';
import { checkFileIsPhoto } from 'openland-y-utils/checkFileIsPhoto';
import { DocumentPicker, DocumentPickerUtil } from 'react-native-document-picker';

type PickerMedia = {
    type: 'document' | 'photo' | 'video',
    name: string,
    path: string,
    size: number,
};

const normalizeMedia = (data: ImageOrVideo[]) => {
    let filesMeta = data.reduce((acc, response) => {
        const isPhoto = checkFileIsPhoto(response.path);
        if (isPhoto) {
            acc.images.push({ type: 'photo', name: 'image.jpg', path: response.path, size: response.size });
        } else {
            acc.videos.push({ type: 'video', name: 'video.mp4', path: response.path, size: response.size });
        }
        return acc;
    }, { images: [] as PickerMedia[], videos: [] as PickerMedia[] });

    let imagesBatches = filesMeta.images.reduce((acc, image, i) => {
        let current = acc[acc.length - 1];
        if (!current || current && current.length === 4) {
            acc.push([image]);
        } else if (current && current.length < 4) {
            current.push(image);
        }
        return acc;
    }, [] as PickerMedia[][]);

    return { imagesBatches, videos: filesMeta.videos };
};

export const showAttachMenu = (fileCallback?: (filesMeta: ({ type: 'document' | 'photo' | 'video', name: string, path: string, size: number })[]) => void, donationCb?: () => void) => {
    let builder = new ActionSheetBuilder();

    builder.action(Platform.select({ ios: 'Take photo or video', default: 'Take photo' }), async () => {
        if (await checkPermissions('camera')) {
            Picker.openCamera({
                mediaType: Platform.select({ ios: 'any', default: 'photo' }),
            }).then(response => {
                let isPhoto = checkFileIsPhoto(response.path);

                if (fileCallback) {
                    fileCallback([{ type: isPhoto ? 'photo' : 'video', name: isPhoto ? 'image.jpg' : 'video.mp4', path: response.path, size: response.size }]);
                }
            }).catch(e => {
                if (e.code === 'E_PERMISSION_MISSING') {
                    handlePermissionDismiss('camera');
                }
            });
        }
    }, false, require('assets/ic-camera-24.png'));

    if (Platform.OS === 'android') {
        builder.action('Record video', async () => {
            if (await checkPermissions('camera')) {
                Picker.openCamera({
                    mediaType: 'video',
                }).then(response => {
                    if (fileCallback) {
                        fileCallback([{ type: 'video', name: 'video.mp4', path: response.path, size: response.size }]);
                    }
                }).catch(e => {
                    if (e.code === 'E_PERMISSION_MISSING') {
                        handlePermissionDismiss('camera');
                    }
                });
            }
        }, false, require('assets/ic-camera-video-24.png'));
    }

    builder.action(Platform.select({ ios: 'Choose from library', default: 'Photo gallery' }), async () => {
        if (await checkPermissions('gallery')) {
            Picker.openPicker({
                multiple: true,
                width: 1024,
                height: 1024,
                compressImageQuality: 1,
                compressVideoPreset: 'MediumQuality',
                cropping: false,
                maxFiles: Platform.select({ ios: 20, android: undefined }),
                mediaType: Platform.select({ ios: 'any', android: 'photo', default: 'photo' })
            }).then(pickerResponse => {
                if (fileCallback) {
                    let { imagesBatches, videos } = normalizeMedia(pickerResponse);

                    if (imagesBatches.length > 0) {
                        imagesBatches.forEach(x => fileCallback(x));
                    }
                    if (videos.length > 0) {
                        videos.forEach(x => fileCallback([x]));
                    }
                }
            }).catch(e => {
                if (e.code === 'E_PERMISSION_MISSING') {
                    handlePermissionDismiss('gallery');
                }
            });
        }
    }, false, require('assets/ic-gallery-24.png'));

    if (Platform.OS === 'android') {
        builder.action('Video gallery', async () => {
            if (await checkPermissions('gallery')) {
                Picker.openPicker({
                    multiple: true,
                    width: 1024,
                    height: 1024,
                    compressImageQuality: 1,
                    compressVideoPreset: 'MediumQuality',
                    cropping: false,
                    mediaType: 'video'
                }).then(pickerResponse => {
                    if (fileCallback) {
                        let { imagesBatches, videos } = normalizeMedia(pickerResponse);

                        if (imagesBatches.length > 0) {
                            imagesBatches.forEach(x => fileCallback(x));
                        }
                        if (videos.length > 0) {
                            videos.forEach(x => fileCallback([x]));
                        }
                    }
                }).catch(e => {
                    if (e.code === 'E_PERMISSION_MISSING') {
                        handlePermissionDismiss('gallery');
                    }
                });
            }
        }, false, require('assets/ic-video-24.png'));
    }

    builder.action(Platform.select({ ios: 'Send document', default: 'Document' }), () => {
        DocumentPicker.show({ filetype: [DocumentPickerUtil.allFiles()] },
            (error, response) => {
                if (!response) {
                    return;
                }

                if (fileCallback) {
                    fileCallback([{ type: 'document', name: response.fileName, path: response.uri, size: response.fileSize }]);
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
