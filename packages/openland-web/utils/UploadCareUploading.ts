import { UploadingFile, FileMetadata, UploadStatus } from 'openland-engines/messenger/types';
import UploadCare from 'uploadcare-widget';

export class UploadCareUploading implements UploadingFile {
    private file: UploadCare.File;
    private sourceFile: File;
    private infoPromise: Promise<FileMetadata>;
    private origUrl: string;
    constructor(file: File) {
        this.file = UploadCare.fileFrom('object', file);
        this.sourceFile = file;
        this.origUrl = file.name;
        let isFirst = true;
        let resolved = false;
        this.infoPromise = new Promise((resolver, reject) => {
            this.file.fail(v => {
                if (resolved) {
                    return;
                }
                resolved = true;
                reject(v);
            });
            this.file.progress(v => {
                if (resolved) {
                    return;
                }
                if (!isFirst) {
                    return;
                }
                isFirst = false;
                let name = v.incompleteFileInfo.name || 'image.jpg';
                resolved = true;
                resolver({ name, uri: this.origUrl, fileSize: parseInt(v.incompleteFileInfo.size || '0', 10) });
            });
            this.file.done(v => {
                if (resolved) {
                    return;
                }
                let name = v.name || 'image.jpg';
                resolved = true;
                resolver({ name, uri: this.origUrl, fileSize: parseInt(v.size || '0', 10) });
            });
        });
    }

    getSourceFile(): File {
        return this.sourceFile;
    }

    fetchInfo() {
        return this.infoPromise;
    }

    watch(handler: (state: { status: UploadStatus; progress?: number; uuid?: string }) => void) {
        this.file.fail(v => {
            handler({ status: UploadStatus.FAILED });
        });
        this.file.progress(v => {
            handler({ status: UploadStatus.UPLOADING, progress: v.progress });
        });
        this.file.done(v => {
            handler({
                status: UploadStatus.COMPLETED,
                progress: 1,
                uuid: v.uuid,
            });
        });
    }
}
