import { ActionSheetBuilder } from 'openland-mobile/components/ActionSheet';
import { Platform } from 'react-native';
import { checkPermissions } from 'openland-mobile/utils/permissions/checkPermissions';
import Picker from 'react-native-image-crop-picker';

import { handlePermissionDismiss } from 'openland-mobile/utils/permissions/handlePermissionDismiss';
import { checkFileIsPhoto } from 'openland-y-utils/checkFileIsPhoto';
import { DocumentPicker, DocumentPickerUtil } from 'react-native-document-picker';

export const showAttachMenu = (fileCallback?: (filesMeta: ({ type: 'document' | 'photo' | 'video', name: string, path: string, size: number })[]) => void, donationCb?: () => void) => {
    let builder = new ActionSheetBuilder();

    builder.action(Platform.select({ ios: 'Take photo or video', android: 'Take photo' }), async () => {
        if (await checkPermissions('camera')) {
            Picker.openCamera({
                mediaType: Platform.select({ ios: 'any', android: 'photo' }),
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

    builder.action(Platform.select({ ios: 'Choose from library', android: 'Photo gallery' }), async () => {
        if (await checkPermissions('gallery')) {
            Picker.openPicker({
                multiple: true,
                width: 1024,
                height: 1024,
                compressImageQuality: 1,
                compressVideoPreset: 'MediumQuality',
                cropping: false,
                mediaType: Platform.select({ ios: 'any', android: 'photo', default: 'photo' })
            }).then(pickerResponse => {
                let filesMeta = pickerResponse.map(response => {
                    const isPhoto = checkFileIsPhoto(response.path);
                    return { type: isPhoto ? 'photo' : 'video' as 'document' | 'photo' | 'video', name: isPhoto ? 'image.jpg' : 'video.mp4', path: response.path, size: response.size };
                });
                if (fileCallback) {
                    fileCallback(filesMeta);
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
                    let filesMeta = pickerResponse.map(response => {
                        const isPhoto = checkFileIsPhoto(response.path);
                        return { type: isPhoto ? 'photo' : 'video' as 'document' | 'photo' | 'video', name: isPhoto ? 'image.jpg' : 'video.mp4', path: response.path, size: response.size };
                    });
                    if (fileCallback) {
                        fileCallback(filesMeta);
                    }
                }).catch(e => {
                    if (e.code === 'E_PERMISSION_MISSING') {
                        handlePermissionDismiss('gallery');
                    }
                });
            }
        }, false, require('assets/ic-video-24.png'));
    }

    builder.action(Platform.select({ ios: 'Send document', android: 'Document' }), () => {
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
        builder.action(Platform.select({ ios: 'Make donation', android: 'Donation' }), () => {
            donationCb();
        }, false, require('assets/ic-donation-24.png'));
    }

    builder.show();
};
