import * as React from 'react';
import { useClient } from 'openland-api/useClient';
import { useUnicorn } from 'openland-unicorn/useUnicorn';
import { MessageView } from './components/MessageView';
import { UHeader } from 'openland-unicorn/UHeader';
import { CommentsWrapper } from 'openland-web/components/comments/CommentsWrapper';
import { MessageHeader } from './components/MessageHeader';
import { FullMessage } from 'openland-api/spacex.types';

const MessageFragmentInner = React.memo((props: { messageId: string; commentId?: string, message: FullMessage | null }) => {
    const { message, commentId } = props;

    if (!message || message.__typename === 'ServiceMessage') {
        return null;
    }

    return (
        <CommentsWrapper
            peerId={message.id}
            commentId={commentId}
            peerView={<MessageView message={message} />}
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
    const message = client.useMessage({ messageId }, { fetchPolicy: 'cache-and-network' }).message;

    return (
        <>
            <UHeader titleView={<MessageHeader message={message} />} appearance="wide" />
            <MessageFragmentInner message={message} messageId={messageId} commentId={commentId} />
        </>
    );
});
