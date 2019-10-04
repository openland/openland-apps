import * as React from 'react';
import { useClient } from 'openland-web/utils/useClient';
import { useUnicorn } from 'openland-unicorn/useUnicorn';
import { MessageView } from './components/MessageView';
import { UHeader } from 'openland-unicorn/UHeader';
import { CommentsWrapper } from 'openland-web/components/comments/CommentsWrapper';

const MessageFragmentInner = React.memo((props: { messageId: string, commentId?: string }) => {
    const { messageId, commentId } = props;
    const client = useClient();
    const message = client.useMessage({ messageId }, { fetchPolicy: 'cache-and-network' }).message;

    if (!message || message.__typename === 'ServiceMessage') {
        return null;
    }

    return (
        <CommentsWrapper
            peerId={messageId}
            commentId={commentId}
            peerView={<MessageView message={message} />}
            groupId={message.source && message.source.__typename === 'MessageSourceChat' && message.source.chat.__typename === 'SharedRoom' ? message.source.chat.id : undefined}
        />
    );
});

export const MessageFragment = React.memo(() => {
    const unicorn = useUnicorn();

    let messageId, commentId;
    if (unicorn.query.commentId) {
        messageId = unicorn.query.messageId;
        commentId = unicorn.query.commentId;
    } else {
        messageId = unicorn.id;
    }

    return (
        <>
            <UHeader title="Message" appearance="wide" />
            <MessageFragmentInner messageId={messageId} commentId={commentId} />
        </>
    );
});