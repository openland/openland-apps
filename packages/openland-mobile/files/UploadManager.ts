import { Watcher } from 'openland-y-utils/Watcher';
import { UploadCareDirectUploading } from '../utils/UploadCareDirectUploading';
import { UploadStatus, FileMetadata } from 'openland-engines/messenger/types';
import { getMessenger } from '../utils/messenger';
import RNFetchBlob from 'rn-fetch-blob';
import { Platform, PermissionsAndroid } from 'react-native';
import { handlePermissionDismiss } from 'openland-y-utils/PermissionManager/handlePermissionDismiss';

export interface UploadState {
    status: UploadStatus;
    progress: number;
    uuid?: string;
}

interface Task {
    messageId: string;
    name: string;
    uri: string;
}

export class UploadManager {

    private _watchers = new Map<string, Watcher<UploadState>>();
    private _started = false;
    private _queue: Task[] = [];

    watch = (conversationId: string, handler: (state: UploadState) => void) => {
        return this.getWatcher(conversationId).watch(handler);
    }

    registerUpload = async (conversationId: string, name: string, uri: string, fileSize?: number) => {

        let hasPermissions = false;
        if (Platform.OS === 'android') {
            try {
                const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE);

                if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                    hasPermissions = true;
                } else {
                    handlePermissionDismiss('android-storage');
                }
            } catch (err) {
                console.log(err);
            }
        } else {
            hasPermissions = true;
        }

        if (!hasPermissions) {
            return;
        }

        const w = new Watcher<UploadState>();
        w.setState({ progress: 0, status: UploadStatus.UPLOADING });
        let messageId = getMessenger().engine.getConversation(conversationId).sendFile({
            fetchInfo: () => new Promise((resolver) => {
                if (fileSize === undefined) {
                    RNFetchBlob.fs.stat(uri.replace('file://', ''))
                        .then((s: any) => resolver({ name, uri, fileSize: s.size }))
                        .catch((e: any) => console.warn('boom', e.message));
                } else {
                    resolver({ name, uri, fileSize })
                }
            }),
            watch: (handler) => w.watch(handler)
        });
        this._watchers.set(messageId, w);
        this._queue.push({ messageId, name, uri });

        if (!this._started) {
            this._started = true;
            this.startUpload();
        }
    }

    private startUpload() {
        let q = this._queue[0];
        let upload = new UploadCareDirectUploading(q.name, q.uri);

        upload.watch((s) => {
            if (s.status === UploadStatus.UPLOADING) {
                this.getWatcher(q.messageId).setState({ progress: s.progress || 0, status: s.status });
            } else if (s.status === UploadStatus.FAILED) {
                // TODO: Handle
            } else if (s.status === UploadStatus.COMPLETED) {
                this._queue.splice(0, 1);
                this.getWatcher(q.messageId).setState({ progress: 1, status: s.status, uuid: s.uuid });

                (async () => {
                    try {
                        if (this._queue.length > 0) {
                            this.startUpload();
                        } else {
                            this._started = false;
                        }
                    } catch (e) {
                        // TODO: Handle
                    }
                })();
            }
        });
    }

    private getWatcher(messageId: string) {
        if (!this._watchers.has(messageId)) {
            const w = new Watcher<UploadState>();
            w.setState({ progress: 0, status: UploadStatus.UPLOADING });
            this._watchers.set(messageId, w);
        }
        return this._watchers.get(messageId)!!;
    }
}

export const UploadManagerInstance = new UploadManager();