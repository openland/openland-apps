import { UploadingFile, UploadStatus } from 'openland-engines/messenger/types';
import RNFetchBlob from 'rn-fetch-blob';
export class UploadCareDirectUploading implements UploadingFile {
    private name: string;
    private contentType?: string;
    private uri: string;
    private state: { status: UploadStatus, progress?: number, uuid?: string } = { status: UploadStatus.UPLOADING };
    private watchers: ((state: { status: UploadStatus, progress?: number, uuid?: string }) => void)[] = [];
    constructor(name: string, uri: string, contentType?: string) {
        this.name = name;
        this.contentType = contentType;
        if (uri.startsWith('file://')) {
            uri = uri.substring(8);
        }
        this.uri = uri;
        let req = RNFetchBlob.fetch(
            'POST',
            'https://upload.uploadcare.com/base/',
            {
                'Content-Type': 'multipart/form-data',
            },
            [{
                name: 'UPLOADCARE_PUB_KEY',
                data: 'b70227616b5eac21ba88',
            }, {
                name: 'UPLOADCARE_STORE',
                data: '1'
            }, {
                name: 'file',
                filename: this.name,
                data: RNFetchBlob.wrap(decodeURI(this.uri)),
                type: this.contentType
            }]);

        // Work-around for IOS
        setTimeout(
            () => {
                try {
                    req.uploadProgress({ interval: 100 }, (written: number, total: number) => {
                        let p = written / total;
                        this.state = { status: UploadStatus.UPLOADING, progress: p };
                        for (let w of this.watchers) {
                            w(this.state);
                        }
                    }).catch((e: Error) => {
                        this.state = { status: UploadStatus.FAILED };
                        for (let w of this.watchers) {
                            w(this.state);
                        }
                    });
                } catch (e) {
                    this.state = { status: UploadStatus.FAILED };
                    for (let w of this.watchers) {
                        w(this.state);
                    }
                }

            },
            0);

        req.then((v: any) => {
            let res = JSON.parse(v.data);
            this.state = { status: UploadStatus.COMPLETED, progress: 1, uuid: res.file };
            for (let w of this.watchers) {
                w(this.state);
            }
        }).catch((v: any) => {
            this.state = { status: UploadStatus.FAILED };
            for (let w of this.watchers) {
                w(this.state);
            }
        });
    }
    async fetchInfo() {
        return { name: this.name };
    }

    watch(handler: (state: { status: UploadStatus, progress?: number, uuid?: string }) => void) {
        handler(this.state);
        this.watchers.push(handler);
    }
}