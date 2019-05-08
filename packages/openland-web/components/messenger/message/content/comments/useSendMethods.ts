import { UserWithOffset } from 'openland-y-utils/mentionsConversion';
import { UploadStatus } from 'openland-engines/messenger/types';
import { UploadCareUploading } from 'openland-web/utils/UploadCareUploading';
import { useAddComment } from './useAddComment';

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

export const useSendMethods = ({
    messageId,
    setShowInputId,
}: {
    messageId: any;
    setShowInputId: any;
}) => {
    const addComment = useAddComment();
    const onSendFile = async (file: UploadCare.File) => {
        return await uploadFile({
            file,
            onProgress: (progress: number) => {
                console.log('onProgress', progress);
            },
        });
    };

    const onSend = async (
        msgToSend: string,
        mentions: UserWithOffset[] | null,
        uploadedFileKey: string,
    ) => {
        const newCommentId = await addComment({
            messageId,
            mentions,
            message: msgToSend,
            replyComment: null,
            fileAttachments: uploadedFileKey ? [{ fileId: uploadedFileKey }] : [],
        });
        setShowInputId(null);
        return newCommentId;
    };

    return { onSendFile, onSend };
};
