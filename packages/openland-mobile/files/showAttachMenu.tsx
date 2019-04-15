import { ActionSheetBuilder } from 'openland-mobile/components/ActionSheet';
import { Platform } from 'react-native';
import { checkPermissions } from 'openland-mobile/utils/permissions/checkPermissions';
import Picker from 'react-native-image-picker';
import { handlePermissionDismiss } from 'openland-mobile/utils/permissions/handlePermissionDismiss';
import { checkFileIsPhoto } from 'openland-y-utils/checkFileIsPhoto';
import { DocumentPicker, DocumentPickerUtil } from 'react-native-document-picker';

export const showAttachMenu = (callback?: (type: 'document' | 'photo' | 'video', name: string, path: string, size: number) => void) => {
    let builder = new ActionSheetBuilder();

    builder.action(Platform.OS === 'android' ? 'Take Photo' : 'Camera', async () => {
        if (await checkPermissions('camera')) {
            Picker.launchCamera({ title: 'Camera', mediaType: 'mixed' }, (response) => {
                if (response.error) {
                    handlePermissionDismiss('camera');
                    return;
                }

                if (response.didCancel) {
                    return;
                }

                let isPhoto = checkFileIsPhoto(response.uri);

                if (callback) {
                    callback(isPhoto ? 'photo' : 'video', isPhoto ? 'image.jpg' : 'video.mp4', response.path ? 'file://' + response.path : response.uri, response.fileSize);
                }
            });
        }
    }, false, Platform.OS === 'android' ? require('assets/ic-camera-24.png') : undefined);

    if (Platform.OS === 'android') {
        builder.action('Record Video', async () => {
            if (await checkPermissions('camera')) {
                Picker.launchCamera({
                    mediaType: 'video',
                }, (response) => {
                    if (response.error) {
                        handlePermissionDismiss('camera');
                        return;
                    }

                    if (response.didCancel) {
                        return;
                    }

                    if (callback) {
                        callback('video', 'video.mp4', response.uri, response.fileSize);
                    }
                });
            }
        }, false, Platform.OS === 'android' ? require('assets/ic-video-24.png') : undefined);
    }

    builder.action(Platform.select({ ios: 'Photo & Video Library', android: 'Photo Gallery' }), async () => {
        if (await checkPermissions('gallery')) {
            Picker.launchImageLibrary(
                {
                    maxWidth: 1024,
                    maxHeight: 1024,
                    quality: 1,
                    videoQuality: Platform.OS === 'ios' ? 'medium' : undefined,
                    mediaType: Platform.select({ ios: 'mixed', android: 'photo', default: 'photo' }) as 'photo' | 'mixed'
                },
                (response) => {
                    if (response.error) {
                        handlePermissionDismiss('gallery');
                        return;
                    }

                    if (response.didCancel) {
                        return;
                    }

                    let isPhoto = checkFileIsPhoto(response.uri);

                    if (callback) {
                        callback(isPhoto ? 'photo' : 'video', isPhoto ? 'image.jpg' : 'video.mp4', response.uri, response.fileSize);
                    }
                }
            );
        }
    }, false, Platform.OS === 'android' ? require('assets/ic-gallery-24.png') : undefined);

    if (Platform.OS === 'android') {
        builder.action('Video Gallery', async () => {
            if (await checkPermissions('gallery')) {
                Picker.launchImageLibrary({
                    mediaType: 'video',
                }, (response) => {
                    if (response.error) {
                        handlePermissionDismiss('gallery');
                        return;
                    }

                    if (response.didCancel) {
                        return;
                    }

                    if (callback) {
                        callback('video', 'video.mp4', response.uri, response.fileSize);
                    }
                });
            }
        }, false, Platform.OS === 'android' ? require('assets/ic-gallery-video-24.png') : undefined);
    }

    builder.action('Document', () => {
        DocumentPicker.show({ filetype: [DocumentPickerUtil.allFiles()] },
            (error, response) => {
                if (!response) {
                    return;
                }

                if (callback) {
                    callback('document', response.fileName, response.uri, response.fileSize);
                }
            }
        );
    }, false, Platform.OS === 'android' ? require('assets/ic-document-24.png') : undefined);

    builder.show();
}