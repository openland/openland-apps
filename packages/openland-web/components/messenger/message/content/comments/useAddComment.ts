import { convertToMentionInput } from 'openland-y-utils/mentionsConversion';
import { FileAttachmentInput } from 'openland-api/Types';
import { UserWithOffset } from 'openland-y-utils/mentionsConversion';
import { useClient } from 'openland-web/utils/useClient';
import { findSpans } from 'openland-y-utils/findSpans';

export type AddCommentParams = {
    messageId: string;
    message: string;
    replyComment: string | null;
    mentions: UserWithOffset[] | null;
    fileAttachments?: FileAttachmentInput[] | null;
};

export const useAddComment = () => {
    const client = useClient();

    return async ({
        messageId,
        message,
        replyComment,
        mentions,
        fileAttachments,
    }: AddCommentParams) => {
        const finalMentions = convertToMentionInput({
            mentions: mentions ? mentions : [],
            text: message,
        });

        const {
            addMessageComment: { id },
        } = await client.mutateAddMessageComment({
            messageId,
            message,
            replyComment,
            mentions: finalMentions,
            fileAttachments,
            spans: findSpans(message || '')
        });

        await client.refetchMessageComments({
            messageId,
        });

        return id;
    };
};
