import * as React from 'react';
import { useClient } from 'openland-web/utils/useClient';
import { URickTextValue } from 'openland-web/components/unicorn/URickInput';
import UUID from 'uuid/v4';
import { prepareLegacyMentionsForSend } from 'openland-engines/legacy/legacymentions';
import { findSpans } from 'openland-y-utils/findSpans';
import { SendMessageComponent } from 'openland-web/fragments/chat/components/SendMessageComponent';

interface CommentInputProps {
    messageId: string;
    groupId?: string;
}

export const CommentInput = React.memo((props: CommentInputProps) => {
    const { messageId, groupId } = props;
    const client = useClient();

    const handleCommentSent = React.useCallback((data: URickTextValue) => {
        const text = data.text.trim();

        if (text.length > 0) {
            client.mutateAddMessageComment({
                messageId,
                repeatKey: UUID(),
                mentions: prepareLegacyMentionsForSend(text, data.mentions),
                message: text,
                spans: findSpans(text)
            });
        }
    }, []);

    return (
        <div>
            <SendMessageComponent
                groupId={groupId}
                onTextSent={handleCommentSent}
            />
        </div>
    );
});