import { Watcher } from 'openland-y-utils/Watcher';
import RNFetchBlob from 'rn-fetch-blob';
import { DownloadState, DownloadManagerInterface } from 'openland-mobile/utils/DownloadManagerInterface';

export class DownloadManager implements DownloadManagerInterface {

    private _watchers = new Map<string, { watcher: Watcher<DownloadState>, download: boolean, existing: Promise<boolean> }>();
    private version = 1;
    private rootDir = (RNFetchBlob as any).fs.dirs.CacheDir as string + '/files_v' + this.version;
    private rootIncompleteDir = (RNFetchBlob as any).fs.dirs.CacheDir as string + '/files_incomplete_v' + this.version;
    private createRootFolder = (async () => {
        if (!await (RNFetchBlob as any).fs.exists(this.rootDir)) {
            await (RNFetchBlob as any).fs.mkdir(this.rootDir);
        }
    })();

    resolvePath(uuid: string, resize: { width: number, height: number } | null) {
        let suffix = '';
        if (resize) {
            suffix = '_' + resize.width + 'x' + resize.height;
        }
        let path = this.rootDir + '/' + uuid + suffix;
        return path;
    }

    watch(uuid: string, resize: { width: number, height: number } | null, handler: (state: DownloadState) => void, initDownload?: boolean) {
        if (initDownload !== false) {
            this.init(uuid, resize);
        }
        return this.getWatcher(uuid, resize).watcher.watch(handler);
    }

    init(uuid: string, resize: { width: number, height: number } | null) {
        let watcherState = this.getWatcher(uuid, resize);
        if (watcherState.download) {
            return;
        }
        watcherState.download = true;
        let watcher = watcherState.watcher;

        // Init

        let suffix = '';
        if (resize) {
            suffix = '_' + resize.width + 'x' + resize.height;
        }
        let path = this.rootDir + '/' + uuid + suffix;

        watcherState.existing.then(async (existing) => {

            let url = 'https://ucarecdn.com/' + uuid + '/';
            if (resize) {
                url += '-/scale_crop/' + resize.width + 'x' + resize.height + '/';
            }

            if (existing) {
                return;
            }

            // Download
            try {
                watcher.setState({ progress: 0 });
                let res = RNFetchBlob.config({
                    path: this.rootIncompleteDir + '/' + uuid + suffix
                }).fetch('GET', url);
                setTimeout(
                    () => {
                        res.progress({ interval: 100 }, (written: number, total: number) => {
                            let p = written / total;
                            watcher.setState({ progress: p });
                        });
                    },
                    0);
                await res;

                await this.createRootFolder;

                await (RNFetchBlob as any).fs.mv(this.rootIncompleteDir + '/' + uuid + suffix, path);

                watcher.setState({ path, progress: 1 });
            } catch (e) {
                // How to handle?
                console.log(e);
            }
        });
    }

    getWatcher(uuid: string, resize: { width: number, height: number } | null) {
        if (!this._watchers.has(this.resolvePath(uuid, resize))) {
            let watcher = new Watcher<DownloadState>();

            let checkExisting = new Promise<boolean>(async (resolever, reject) => {
                // Init
                let suffix = '';
                if (resize) {
                    suffix = '_' + resize.width + 'x' + resize.height;
                }
                let path = this.rootDir + '/' + uuid + suffix;

                // Check if exists
                let exists = false;
                try {
                    if (await (RNFetchBlob as any).fs.exists(path)) {
                        exists = true;
                    }
                } catch (e) {
                    // How to handle?
                    console.log(e);
                }
                if (exists) {
                    watcher.setState({ path, progress: 1 });
                }

                resolever(exists);
            }).then();

            this._watchers.set(this.resolvePath(uuid, resize), { watcher, download: false, existing: checkExisting });
        }
        return this._watchers.get(this.resolvePath(uuid, resize))!;
    }
}

export const DownloadManagerInstance = new DownloadManager();