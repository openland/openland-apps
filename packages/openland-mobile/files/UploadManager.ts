import { Watcher } from 'openland-y-utils/Watcher';
import { UploadCareDirectUploading } from '../utils/UploadCareDirectUploading';
import { UploadStatus } from 'openland-engines/messenger/types';
import { getMessenger } from '../utils/messenger';

export interface UploadState {
    queueSize: number;
    progress: number;
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
        this.getWatcher(conversationId).setState({ queueSize: this._queue.filter((v) => v.conversationId === conversationId).length, progress: 0 });

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
                const queueSize = this._queue.filter((v) => v.conversationId === q.conversationId).length;
                this.getWatcher(q.conversationId).setState({ queueSize, progress: s.progress || 0 });
            } else if (s.status === UploadStatus.FAILED) {
                // TODO: Handle
            } else if (s.status === UploadStatus.COMPLETED) {
                this._queue.splice(0);
                const queueSize = this._queue.filter((v) => v.conversationId === q.conversationId).length;
                this.getWatcher(q.conversationId).setState({ queueSize, progress: 1 });

                (async () => {
                    try {
                        await getMessenger().engine.sender.sendFileDirect(q.conversationId, s.uuid!!);
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

    private getWatcher(conversationId: string) {
        if (!this._watchers.has(conversationId)) {
            const w = new Watcher<UploadState>();
            w.setState({ queueSize: 0, progress: 0 });
            this._watchers.set(conversationId, w);
        }
        return this._watchers.get(conversationId)!!;
    }
}

export const UploadManagerInstance = new UploadManager();