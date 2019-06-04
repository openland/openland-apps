import { Watcher } from 'openland-y-utils/Watcher';
import { UploadCareDirectUploading } from '../utils/UploadCareDirectUploading';
import { UploadStatus } from 'openland-engines/messenger/types';
import { getMessenger } from '../utils/messenger';
// import RNFetchBlob from 'rn-fetch-blob';
import { Image } from 'react-native';
import { DownloadManagerInstance } from './DownloadManager';
import { checkPermissions } from 'openland-mobile/utils/permissions/checkPermissions';
import UUID from 'uuid/v4';

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

interface Callbacks {
    onProgress: (progress: number) => void;
    onDone: (fileId: string) => void;
    onFail: () => void;
}

export class UploadManager {

    private _watchers = new Map<string, Watcher<UploadState>>();
    private _started = false;
    private _queue: Task[] = [];
    private uploadedFiles = new Map<string, string>();

    watch = (conversationId: string, handler: (state: UploadState) => void) => {
        return this.getWatcher(conversationId).watch(handler);
    }

    registerUpload = async (conversationId: string, name: string, uri: string, fileSize?: number) => {
        if (!(await checkPermissions('android-storage'))) {
            return;
        }

        const w = new Watcher<UploadState>();
        w.setState({ progress: 0, status: UploadStatus.UPLOADING });
        let messageId = getMessenger().engine.getConversation(conversationId).sendFile({
            fetchInfo: () => new Promise(async (resolver, onError) => {
                let isImage = uri.endsWith('.png') || uri.endsWith('.jpg') || uri.endsWith('.jpeg');
                let imageSize: { width: number, height: number } | undefined = undefined;
                if (isImage) {
                    imageSize = await new Promise<{ width: number, height: number }>((res) => {
                        Image.getSize(uri, (width, height) => res({ width, height }), e => onError(e));
                    });
                }
                if (fileSize === undefined) {
                    RNFetchBlob.fs.stat(uri.replace('file://', ''))
                        .then((s: any) => resolver({ name, uri, fileSize: s.size, isImage, imageSize }))
                        .catch((e: any) => onError(e));
                } else {
                    resolver({ name, uri, fileSize, isImage, imageSize })
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

    registerSimpleUpload = async (name: string, uri: string, callbacks: Callbacks, fileSize?: number) => {
        if (!(await checkPermissions('android-storage'))) {
            return;
        }

        const w = new Watcher<UploadState>();
        w.setState({ progress: 0, status: UploadStatus.UPLOADING });

        let key = UUID();

        (async () => {
            try {
                if (!this.uploadedFiles.has(key)) {
                    let res = await new Promise<string>((resolver, reject) => {
                        w.watch(state => {
                            if (state.status === UploadStatus.FAILED) {
                                reject();
                            } else if (state.status === UploadStatus.UPLOADING) {
                                callbacks.onProgress(state.progress!!);
                            } else if (state.status === UploadStatus.COMPLETED) {
                                resolver(state.uuid!!);
                            }
                        });
                    });
                    this.uploadedFiles.set(key, res);
                }
            } catch (e) {
                callbacks.onFail();
            }

            callbacks.onDone(this.uploadedFiles.get(key)!!);
        })();

        this._watchers.set(key, w);
        this._queue.push({ messageId: key, name, uri });

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
                RNFetchBlob.fs.cp(q.uri.replace('file://', ''), DownloadManagerInstance.resolvePath(s.uuid!, null, true));
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