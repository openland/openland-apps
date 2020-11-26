import * as React from 'react';
import { useClient } from 'openland-api/useClient';
import { useUnicorn } from 'openland-unicorn/useUnicorn';
import { MessageView } from './components/MessageView';
import { UHeader } from 'openland-unicorn/UHeader';
import { CommentsWrapper } from 'openland-web/components/comments/CommentsWrapper';
import { MessageHeader } from './components/MessageHeader';
import { Message_message } from 'openland-api/spacex.types';

const MessageFragmentInner = React.memo((props: { messageId: string; commentId?: string, noDefaultReply: boolean; message: Message_message | null }) => {
    const { message, commentId, noDefaultReply } = props;

    if (!message || message.__typename === 'ServiceMessage') {
        return null;
    }

    return (
        <CommentsWrapper
            peerId={message.id}
            commentId={commentId}
            peerView={<MessageView message={message} />}
            noDefaultReply={noDefaultReply}
            groupId={
                message.source &&
                    message.source.__typename === 'MessageSourceChat' &&
                    message.source.chat.__typename === 'SharedRoom'
                    ? message.source.chat.id
                    : undefined
            }
        />
    );
});

export const MessageFragment = React.memo(() => {
    const unicorn = useUnicorn();
    const { messageId, commentId } = unicorn.query;
    const client = useClient();
    const messageData = client.useMessage({ messageId }, { fetchPolicy: 'cache-and-network' });
    const message = messageData.message;

    let noDefaultReply = React.useMemo(() => (new URLSearchParams(window.location.search)).get('reply') === 'false', []);

    return (
        <>
            <UHeader titleView={<MessageHeader message={message} isSubscribed={!!messageData.comments.subscription} />} appearance="wide" />
            <MessageFragmentInner message={message} messageId={messageId} commentId={commentId} noDefaultReply={noDefaultReply} />
        </>
    );
});
