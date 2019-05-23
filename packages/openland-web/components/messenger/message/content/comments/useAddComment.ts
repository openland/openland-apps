import { convertToMentionInput2 } from 'openland-y-utils/mentionsConversion';
import { FileAttachmentInput } from 'openland-api/Types';
import {
    FullMessage_GeneralMessage_spans_MessageSpanUserMention,
    FullMessage_GeneralMessage_spans_MessageSpanAllMention,
} from 'openland-api/Types';

import { useClient } from 'openland-web/utils/useClient';
import { findSpans } from 'openland-y-utils/findSpans';

export type AddCommentParams = {
    messageId: string;
    message: string;
    replyComment: string | null;
    mentions:
        | (
              | FullMessage_GeneralMessage_spans_MessageSpanUserMention
              | FullMessage_GeneralMessage_spans_MessageSpanAllMention)[]
        | null;
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
        const finalMentions = convertToMentionInput2({
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
            spans: findSpans(message || ''),
        });

        await client.refetchMessageComments({
            messageId,
        });

        return id;
    };
};
