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
    fileKey: string;
    name: string;
    uri: string;
    retryCount: number;
}

interface Callbacks {
    onProgress: (progress: number) => void;
    onDone: (fileId: string) => void;
    onFail: () => void;
}

interface FileMeta {
    name: string;
    path: string;
    size?: number;
}

const MAX_FILE_SIZE = 1e+8;

export class UploadManager {

    private _watchers = new Map<string, Watcher<UploadState>>();
    private _queue: Task[] = [];
    private uploadedFiles = new Map<string, string>();

    watch = (fileKey: string, handler: (state: UploadState) => void) => {
        return this.getWatcher(fileKey).watch(handler);
    }

    registerMessageUploads = async (conversationId: string, filesMeta: FileMeta[], quoted: DataSourceMessageItem[] | undefined) => {
        if (!(await checkPermissions('android-storage'))) {
            return;
        }
        let newFilesMeta = await this.prepareMeta(filesMeta);

        let hasBigFiles = newFilesMeta.some(x => (x.size || 0) > MAX_FILE_SIZE);
        if (hasBigFiles) {
            AlertBlanket.alert("Files bigger than 100mb are not supported yet.");
            return;
        }
        const watchers = newFilesMeta.map(() => {
            let w = new Watcher<UploadState>();
            w.setState({ progress: 0, status: UploadStatus.UPLOADING });
            return w;
        });
        let { filesKeys } = getMessenger().engine.getConversation(conversationId).sendFiles({
            files: newFilesMeta.map(({ name, path, size }, i) => {
                return {
                    file: {
                        fetchInfo: () => new Promise(async (resolver, onError) => {
                            let uriLower = path.toLowerCase();
                            let isImage = uriLower.endsWith('.png') || uriLower.endsWith('.jpg') || uriLower.endsWith('.jpeg');
                            let imageSize: { width: number, height: number } | undefined = undefined;
                            if (isImage) {
                                imageSize = await new Promise<{ width: number, height: number }>((res) => {
                                    Image.getSize(path, (width, height) => res({ width, height }), e => onError(e));
                                });
                            }
                            resolver({ name, uri: path, fileSize: size, isImage, imageSize });
                        }),
                        watch: (handler: (state: UploadState) => void) => watchers[i].watch(handler)
                    },
                    localImage: undefined,
                };
            }),
            quotedMessages: quoted,
            mentions: [],
            text: undefined,
        });

        filesKeys.forEach((key, i) => {
            let { path, name } = newFilesMeta[i];

            this._watchers.set(key, watchers[i]);
            this._queue.push({ fileKey: key, name, uri: path, retryCount: 0 });
        });

        this.checkQueue();
    }

    prepareMeta = async (filesMeta: FileMeta[]) => {
        let fallbackSizes = await Promise.all(filesMeta.map(({ size, path }) => size === undefined ? RNFetchBlob.fs.stat(path.replace('file://', '')) : undefined));

        return filesMeta.map((x, i) => ({ ...x, size: x.size || fallbackSizes[i] as (number | undefined) }));
    }

    registerUploads = async (filesMeta: { name: string, path: string, size?: number }[], callbacks: Callbacks) => {
        if (!(await checkPermissions('android-storage'))) {
            return;
        }

        let newFilesMeta = await this.prepareMeta(filesMeta);

        let hasBigFiles = newFilesMeta.some(x => (x.size || 0) > MAX_FILE_SIZE);
        if (hasBigFiles) {
            AlertBlanket.alert("Files bigger than 100mb are not supported yet.");
            return;
        }

        const watchers = newFilesMeta.map(() => {
            let w = new Watcher<UploadState>();
            w.setState({ progress: 0, status: UploadStatus.UPLOADING });
            return w;
        });
        newFilesMeta.forEach((meta, i) => {
            let key = UUID();
            let w = watchers[i];

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
            this._queue.push({ fileKey: key, name: meta.name, uri: meta.path, retryCount: 0 });
        });

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
                        this.getWatcher(q.fileKey).setState({ progress: s.progress || 0, status: s.status });
                    } else if (s.status === UploadStatus.FAILED) {
                        this.slots++;
                        if (q.retryCount++ < 3) {
                            this._queue.push(q);
                        }
                        this.checkQueue();
                    } else if (s.status === UploadStatus.COMPLETED) {
                        this.slots++;
                        RNFetchBlob.fs.cp(q.uri.replace('file://', ''), DownloadManagerInstance.resolvePath(s.uuid!, null, true));
                        this.getWatcher(q.fileKey).setState({ progress: 1, status: s.status, uuid: s.uuid });
                        this.checkQueue();
                    }
                });
            })();
        }
    }

    private getWatcher(fileKey: string) {
        if (!this._watchers.has(fileKey)) {
            const w = new Watcher<UploadState>();
            w.setState({ progress: 0, status: UploadStatus.UPLOADING });
            this._watchers.set(fileKey, w);
        }
        return this._watchers.get(fileKey)!!;
    }
}

export const UploadManagerInstance = new UploadManager();
