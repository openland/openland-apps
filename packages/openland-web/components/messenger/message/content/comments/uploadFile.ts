import { UploadStatus } from 'openland-engines/messenger/types';
import { UploadCareUploading } from 'openland-web/utils/UploadCareUploading';

export const uploadFile = async ({
    file,
    onProgress,
}: {
    file: any;
    onProgress: (progress: number) => void;
}) => {
    const uploadingFile = new UploadCareUploading(file);

    let res = await new Promise<string>((resolver, reject) => {
        uploadingFile.watch(state => {
            console.log(state);
            if (state.status === UploadStatus.FAILED) {
                reject();
            } else if (state.status === UploadStatus.UPLOADING) {
                onProgress(state.progress!!);
            } else if (state.status === UploadStatus.COMPLETED) {
                resolver(state.uuid!!);
            }
        });
    });

    console.log('Uploading finished');

    return res;
};
