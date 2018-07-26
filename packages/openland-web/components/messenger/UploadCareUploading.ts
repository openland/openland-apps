import { UploadingFile, FileMetadata, UploadStatus } from 'openland-engines/messenger/types';

export class UplaodCareUploading implements UploadingFile {
    private file: UploadCare.File;
    private infoPromise: Promise<FileMetadata>;
    constructor(file: UploadCare.File) {
        this.file = file;
        let isFirst = true;
        let resolved = false;
        this.infoPromise = new Promise((resolver, reject) => {
            file.fail((v) => {
                if (resolved) {
                    return;
                }
                resolved = true;
                reject(v);
            });
            file.progress((v) => {
                if (resolved) {
                    return;
                }
                if (!isFirst) {
                    return;
                }
                isFirst = false;
                let name = v.incompleteFileInfo.name || 'image.jpg';
                resolved = true;
                resolver({ name });
            });
            file.done((v) => {
                if (resolved) {
                    return;
                }
                let name = v.name || 'image.jpg';
                resolved = true;
                resolver({ name });
            });
        });
    }

    fetchInfo() {
        return this.infoPromise;
    }

    watch(handler: (state: { status: UploadStatus, progress?: number, uuid?: string }) => void) {
        this.file.fail((v) => {
            handler({ status: UploadStatus.FAILED });
        });
        this.file.progress((v) => {
            handler({ status: UploadStatus.UPLOADING, progress: v.progress });
        });
        this.file.done((v) => {
            handler({ status: UploadStatus.COMPLETED, progress: 1, uuid: v.uuid });
        });
    }
}