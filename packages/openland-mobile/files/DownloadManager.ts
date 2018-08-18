import { DownloadManagerInterface, DownloadState } from 'openland-shared/DownloadManagerInterface';
import { Watcher } from 'openland-y-utils/Watcher';
import RNFetchBlob from 'rn-fetch-blob';

export class DownloadManager implements DownloadManagerInterface {

    private _watchers = new Map<string, Watcher<DownloadState>>();
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

    watch(uuid: string, resize: { width: number, height: number } | null, handler: (state: DownloadState) => void) {
        if (!this._watchers.has(uuid)) {
            let watcher = new Watcher<DownloadState>();
            this._watchers.set(uuid, watcher);

            // Init

            let suffix = '';
            if (resize) {
                suffix = '_' + resize.width + 'x' + resize.height;
            }
            let path = this.rootDir + '/' + uuid + suffix;

            (async () => {

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
                    return;
                }

                let url = 'https://ucarecdn.com/' + uuid + '/';
                if (resize) {
                    url += '-/scale_crop/' + resize.width + 'x' + resize.height + '/';
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
            })();

            // RNFetchBlob
            //     .config({
            //         // response data will be saved to this path if it has access right.
            //         path: dirs.DocumentDir + '/path-to-file.anything'
            //     })
            //     .fetch('GET', 'http://www.example.com/file/example.zip', {
            //         //some headers ..
            //     })
            //     .then((res) => {
            //         // the path should be dirs.DocumentDir + 'path-to-file.anything'
            //         console.log('The file saved to ', res.path())
            //     })
        }
        return this._watchers.get(uuid)!!.watch(handler);
    }
}

export const DownloadManagerInstance = new DownloadManager();