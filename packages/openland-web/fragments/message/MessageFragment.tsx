import * as React from 'react';
import { useClient } from 'openland-web/utils/useClient';
import { useUnicorn } from 'openland-unicorn/useUnicorn';
import { css } from 'linaria';
import { XScrollView3 } from 'openland-x/XScrollView3';
import { UHeader } from 'openland-unicorn/UHeader';
import { CommentInput } from './components/CommentInput';
import { CommentsList } from './components/CommentsList';
import { MessageView } from './components/MessageView';
import { URickTextValue } from 'openland-web/components/unicorn/URickInput';
import { findSpans } from 'openland-y-utils/findSpans';
import { prepareLegacyMentionsForSend } from 'openland-engines/legacy/legacymentions';
import UUID from 'uuid/v4';

const wrapper = css`
    display: flex;
    flex-grow: 1;
    flex-direction: column;
`;

const MessageFragmentInner = React.memo((props: { messageId: string }) => {
    const { messageId } = props;
    const client = useClient();
    const message = client.useMessage({ messageId }, { fetchPolicy: 'cache-and-network' }).message;

    if (!message || message.__typename === 'ServiceMessage') {
        return null;
    }

    const handleCommentSent = React.useCallback((data: URickTextValue, replyId?: string) => {
        const text = data.text.trim();

        if (text.length > 0) {
            client.mutateAddMessageComment({
                messageId,
                repeatKey: UUID(),
                mentions: prepareLegacyMentionsForSend(text, data.mentions),
                message: text,
                spans: findSpans(text),
                replyComment: replyId
            });
        }
    }, [messageId]);

    const groupId = message.source && message.source.__typename === 'MessageSourceChat' && message.source.chat.__typename === 'SharedRoom' ? message.source.chat.id : undefined;

    return (
        <div className={wrapper}>
            <XScrollView3 flexGrow={1} flexBasis={0} flexShrink={1} alignItems="flex-start" paddingHorizontal={32}>
                <MessageView message={message} />
                <CommentsList messageId={messageId} groupId={groupId} onSent={handleCommentSent} />
            </XScrollView3>

            <CommentInput onSent={handleCommentSent} groupId={groupId} />
        </div>
    );
});

export const MessageFragment = React.memo(() => {
    const unicorn = useUnicorn();

    return (
        <>
            <UHeader title="Comments" />
            <MessageFragmentInner messageId={unicorn.id} />
        </>
    );
});