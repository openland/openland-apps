import { ActionSheetBuilder } from 'openland-mobile/components/ActionSheet';
import { Platform } from 'react-native';
import { checkPermissions } from 'openland-mobile/utils/permissions/checkPermissions';
import Picker from 'react-native-image-picker';
import { handlePermissionDismiss } from 'openland-mobile/utils/permissions/handlePermissionDismiss';
import { checkFileIsPhoto } from 'openland-y-utils/checkFileIsPhoto';
import { DocumentPicker, DocumentPickerUtil } from 'react-native-document-picker';

export const showAttachMenu = (fileCallback?: (type: 'document' | 'photo' | 'video', name: string, path: string, size: number) => void, donationCb?: () => void) => {
    let builder = new ActionSheetBuilder();

    builder.action(Platform.select({ ios: 'Take photo or video', android: 'Take photo' }), async () => {
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

                if (fileCallback) {
                    fileCallback(isPhoto ? 'photo' : 'video', isPhoto ? 'image.jpg' : 'video.mp4', response.path ? 'file://' + response.path : response.uri, response.fileSize);
                }
            });
        }
    }, false, require('assets/ic-camera-24.png'));

    if (Platform.OS === 'android') {
        builder.action('Record video', async () => {
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

                    if (fileCallback) {
                        fileCallback('video', 'video.mp4', response.uri, response.fileSize);
                    }
                });
            }
        }, false, require('assets/ic-camera-video-24.png'));
    }

    builder.action(Platform.select({ ios: 'Choose from library', android: 'Photo gallery' }), async () => {
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

                    if (fileCallback) {
                        fileCallback(isPhoto ? 'photo' : 'video', isPhoto ? 'image.jpg' : 'video.mp4', response.uri, response.fileSize);
                    }
                }
            );
        }
    }, false, require('assets/ic-gallery-24.png'));

    if (Platform.OS === 'android') {
        builder.action('Video gallery', async () => {
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

                    if (fileCallback) {
                        fileCallback('video', 'video.mp4', response.uri, response.fileSize);
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
                    fileCallback('document', response.fileName, response.uri, response.fileSize);
                }
            }
        );
    }, false, require('assets/ic-document-24.png'));

    let showDonation = false;
    if (donationCb && showDonation) {
        builder.action(Platform.select({ ios: 'Make donation', android: 'Donation' }), () => {
            donationCb();
        }, false, require('assets/ic-donation-24.png'));
    }

    builder.show();
};