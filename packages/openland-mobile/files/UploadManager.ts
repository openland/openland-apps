import { Watcher } from 'openland-y-utils/Watcher';
import { UploadCareDirectUploading } from '../utils/UploadCareDirectUploading';
import { UploadStatus } from 'openland-engines/messenger/types';
import { getMessenger } from '../utils/messenger';
import RNFetchBlob from 'rn-fetch-blob';
import { Image } from 'react-native';
import { DownloadManagerInstance } from './DownloadManager';
import { checkPermissions } from 'openland-mobile/utils/permissions/checkPermissions';
import UUID from 'uuid/v4';
import AlertBlanket from 'openland-mobile/components/AlertBlanket';
import { DataSourceMessageItem } from 'openland-engines/messenger/ConversationEngine';

export interface UploadState {
    status: UploadStatus;
    progress: number;
    uuid?: string;
}

interface Task {
    messageId: string;
    name: string;
    uri: string;
    retryCount: number;
}

interface Callbacks {
    onProgress: (progress: number) => void;
    onDone: (fileId: string) => void;
    onFail: () => void;
}

const MAX_FILE_SIZE = 1e+8;

export class UploadManager {

    private _watchers = new Map<string, Watcher<UploadState>>();
    private _queue: Task[] = [];
    private uploadedFiles = new Map<string, string>();

    watch = (conversationId: string, handler: (state: UploadState) => void) => {
        return this.getWatcher(conversationId).watch(handler);
    }

    registerMessageUpload = async (conversationId: string, name: string, path: string, quoted: DataSourceMessageItem[] | undefined, fileSize?: number) => {
        if (!(await checkPermissions('android-storage'))) {
            return;
        }
        let fallback = fileSize === undefined ? await RNFetchBlob.fs.stat(path.replace('file://', '')) : undefined;

        if ((fileSize || (fallback && fallback.size) || 0) > MAX_FILE_SIZE) {
            AlertBlanket.alert("Files bigger than 100mb are not supported yet.");
            return;
        }

        const w = new Watcher<UploadState>();
        w.setState({ progress: 0, status: UploadStatus.UPLOADING });
        let messageId = getMessenger().engine.getConversation(conversationId).sendFile({
            fetchInfo: () => new Promise(async (resolver, onError) => {
                let uriLower = path.toLowerCase();
                let isImage = uriLower.endsWith('.png') || uriLower.endsWith('.jpg') || uriLower.endsWith('.jpeg');
                let imageSize: { width: number, height: number } | undefined = undefined;
                if (isImage) {
                    imageSize = await new Promise<{ width: number, height: number }>((res) => {
                        Image.getSize(path, (width, height) => res({ width, height }), e => onError(e));
                    });
                }
                if (fallback) {
                    resolver({ name, uri: path, fileSize: fallback.size, isImage, imageSize });
                } else {
                    resolver({ name, uri: path, fileSize, isImage, imageSize });
                }
            }),
            watch: (handler: (state: UploadState) => void) => w.watch(handler)
        },
            undefined,
            quoted);
        this._watchers.set(messageId, w);
        this._queue.push({ messageId, name, uri: path, retryCount: 0 });

        this.checkQueue();
    }

    registerUpload = async (name: string, path: string, callbacks: Callbacks, fileSize?: number) => {
        if (!(await checkPermissions('android-storage'))) {
            return;
        }

        const uri = 'file://' + path;

        let fallback = fileSize === undefined ? await RNFetchBlob.fs.stat(uri.replace('file://', '')) : undefined;
        if ((fileSize || (fallback && fallback.size) || 0) > MAX_FILE_SIZE) {
            AlertBlanket.alert("Files bigger than 100mb are not supported yet.");
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
        this._queue.push({ messageId: key, name, uri, retryCount: 0 });

        this.checkQueue();

    }

    slots = 4;
    private checkQueue() {
        console.warn('checkQueue', this.slots);
        for (let q of this._queue.splice(0, this.slots)) {
            this.slots--;
            let contentType = q.name === 'video.mp4' ? 'video/mp4' : q.name.endsWith('.pdf') ? 'application/pdf' : undefined;
            (async () => {
                let upload = new UploadCareDirectUploading(q.name, q.uri, contentType);
                upload.watch((s) => {
                    if (s.status === UploadStatus.UPLOADING) {
                        this.getWatcher(q.messageId).setState({ progress: s.progress || 0, status: s.status });
                    } else if (s.status === UploadStatus.FAILED) {
                        this.slots++;
                        if (q.retryCount++ < 3) {
                            this._queue.push(q);
                        }
                        this.checkQueue();
                    } else if (s.status === UploadStatus.COMPLETED) {
                        this.slots++;
                        RNFetchBlob.fs.cp(q.uri.replace('file://', ''), DownloadManagerInstance.resolvePath(s.uuid!, null, true));
                        this.getWatcher(q.messageId).setState({ progress: 1, status: s.status, uuid: s.uuid });
                        this.checkQueue();
                    }
                });
            })();
        }
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
