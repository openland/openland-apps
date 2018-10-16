import { Watcher } from 'openland-y-utils/Watcher';
import { UploadCareDirectUploading } from '../utils/UploadCareDirectUploading';
import { UploadStatus, FileMetadata } from 'openland-engines/messenger/types';
import { getMessenger } from '../utils/messenger';
import UUID from 'uuid/v4';
import { resolve } from 'dns';

export interface UploadState {
    status: UploadStatus;
    progress: number;
    uuid?: string;
}

interface Task {
    conversationId: string;
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

    registerUpload = (conversationId: string, name: string, uri: string) => {
        this._queue.push({ conversationId, name, uri });

        const w = new Watcher<UploadState>();
        w.setState({ progress: 0, status: UploadStatus.UPLOADING });
        let messageId = getMessenger().engine.getConversation(conversationId).sendFile({
            fetchInfo: () => new Promise((resolver) => resolver({ name, uri })),
            watch: (handler) => w.watch(handler)
        });
        this._watchers.set(messageId, w);

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
                this.getWatcher(q.conversationId).setState({ progress: s.progress || 0, status: s.status });
            } else if (s.status === UploadStatus.FAILED) {
                // TODO: Handle
            } else if (s.status === UploadStatus.COMPLETED) {
                this._queue.splice(0);
                this.getWatcher(q.conversationId).setState({ progress: 1, status: s.status });

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