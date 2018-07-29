import { UploadingFile, UploadStatus } from 'openland-engines/messenger/types';
import RNFetchBlob from 'rn-fetch-blob';
export class UploadCareDirectUploading implements UploadingFile {
    private name: string;
    private uri: string;
    private state: { status: UploadStatus, progress?: number, uuid?: string } = { status: UploadStatus.UPLOADING };
    private watchers: ((state: { status: UploadStatus, progress?: number, uuid?: string }) => void)[] = [];
    constructor(name: string, uri: string) {
        this.name = name;
        if (uri.startsWith('file://')) {
            uri = uri.substring(8);
        }
        this.uri = uri;
        RNFetchBlob.fetch(
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
                data: RNFetchBlob.wrap(this.uri)
            }]).uploadProgress((written: number, total: number) => {
                let p = written / total;
                this.state = { status: UploadStatus.UPLOADING, progress: p };
                for (let w of this.watchers) {
                    w(this.state);
                }
            }).then((v: any) => {
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