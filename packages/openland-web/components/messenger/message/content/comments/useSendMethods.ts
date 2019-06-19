import UploadCare from 'uploadcare-widget';
import {
    FullMessage_GeneralMessage_spans_MessageSpanUserMention,
    FullMessage_GeneralMessage_spans_MessageSpanAllMention,
} from 'openland-api/Types';

import { UploadStatus } from 'openland-engines/messenger/types';
import { UploadCareUploading } from 'openland-web/utils/UploadCareUploading';
import { useAddComment } from './useAddComment';
import { trackEvent } from 'openland-x-analytics';

export const getUploadCareFile = (fileForUc: any): UploadCare.File => {
    return UploadCare.fileFrom('object', fileForUc);
};

export const uploadFile = async ({
    file,
    onProgress,
}: {
    file: UploadCare.File;
    onProgress?: (progress: number) => void;
}) => {
    const uploadingFile = new UploadCareUploading(file);

    let res = await new Promise<string>((resolver, reject) => {
        uploadingFile.watch(state => {
            console.log(state);
            if (state.status === UploadStatus.FAILED) {
                reject();
            } else if (state.status === UploadStatus.UPLOADING) {
                if (onProgress) {
                    onProgress(state.progress!!);
                }
            } else if (state.status === UploadStatus.COMPLETED) {
                resolver(state.uuid!!);
            }
        });
    });

    console.log('Uploading finished');

    return res;
};

export const useSendMethods = ({
    setShowInputId,
    depth,
}: {
    setShowInputId: (a: string | null) => void;
    depth: number;
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

    const onSend = async ({
        messageId,
        msgToSend,
        replyComment,
        mentions,
        uploadedFileKey,
    }: {
        messageId: string;
        replyComment: string | null;
        msgToSend: string;
        mentions:
            | (
                  | FullMessage_GeneralMessage_spans_MessageSpanUserMention
                  | FullMessage_GeneralMessage_spans_MessageSpanAllMention)[]
            | null;
        uploadedFileKey: string;
    }) => {
        const newCommentId = await addComment({
            messageId,
            mentions,
            message: msgToSend,
            replyComment,
            fileAttachments: uploadedFileKey ? [{ fileId: uploadedFileKey }] : [],
        });

        trackEvent('comment_sent', { comment_level: depth });

        setShowInputId(null);
        return newCommentId;
    };

    return { onSendFile, onSend };
};
