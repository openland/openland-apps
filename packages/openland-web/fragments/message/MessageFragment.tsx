import * as React from 'react';
import { useClient } from 'openland-web/utils/useClient';
import { useUnicorn } from 'openland-unicorn/useUnicorn';
import { MessageView } from './components/MessageView';
import { UHeader } from 'openland-unicorn/UHeader';
import { CommentsWrapper } from 'openland-web/components/comments/CommentsWrapper';

const MessageFragmentInner = React.memo((props: { messageId: string }) => {
    const { messageId } = props;
    const client = useClient();
    const message = client.useMessage({ messageId }, { fetchPolicy: 'cache-and-network' }).message;

    if (!message || message.__typename === 'ServiceMessage') {
        return null;
    }

    return (
        <CommentsWrapper
            peerId={messageId}
            peerView={<MessageView message={message} />}
            groupId={message.source && message.source.__typename === 'MessageSourceChat' && message.source.chat.__typename === 'SharedRoom' ? message.source.chat.id : undefined}
        />
    );
});

export const MessageFragment = React.memo(() => {
    const unicorn = useUnicorn();

    return (
        <>
            <UHeader title="Message" appearance="wide" />
            <MessageFragmentInner messageId={unicorn.id} />
        </>
    );
});