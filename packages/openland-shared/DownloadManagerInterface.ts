import { WatchSubscription } from 'openland-y-utils/Watcher';

export interface DownloadState {
    path?: string;
    progress?: number;
}
export interface DownloadManagerInterface {
    watch(uuid: string, handler: (state: DownloadState) => void): WatchSubscription;
}