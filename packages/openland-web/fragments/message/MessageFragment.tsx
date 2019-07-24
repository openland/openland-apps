import * as React from 'react';
import { useClient } from 'openland-web/utils/useClient';
import { useUnicorn } from 'openland-unicorn/useUnicorn';
import { convertMessage } from 'openland-engines/messenger/ConversationEngine';
import { MessengerContext } from 'openland-engines/MessengerEngine';
import { convertDsMessage, DataSourceWebMessageItem } from '../chat/messenger/data/WebMessageItemDataSource';
import { MessageContent } from '../chat/messenger/message/MessageContent';
import { css } from 'linaria';
import { XScrollView3 } from 'openland-x/XScrollView3';
import { UHeader } from 'openland-unicorn/UHeader';
import { CommentView } from './components/CommentView';
import { CommentWatch_event_CommentUpdateSingle_update } from 'openland-api/Types';
import { SequenceModernWatcher } from 'openland-engines/core/SequenceModernWatcher';
import { CommentInput } from './components/CommentInput';

const wrapper = css`
    display: flex;
    flex-grow: 1;
    flex-direction: column;
`;

const MessageFragmentInner = React.memo((props: { messageId: string }) => {
    const { messageId } = props;
    const client = useClient();
    const messenger = React.useContext(MessengerContext);
    const message = client.useMessage({ messageId }, { fetchPolicy: 'cache-and-network' }).message;
    const comments = client.useMessageComments({ messageId }, { fetchPolicy: 'cache-and-network' }).messageComments.comments;

    if (!message || message.__typename === 'ServiceMessage') {
        return null;
    }

    const updateHandler = async (event: CommentWatch_event_CommentUpdateSingle_update) => {
        if (event.__typename === 'CommentReceived') {
            await client.refetchMessageComments({ messageId });
        }
    };

    React.useEffect(() => {
        const watcher = new SequenceModernWatcher('comment messageId:' + messageId, client.subscribeCommentWatch({ peerId: messageId }), client.client, updateHandler, undefined, { peerId: messageId }, null);

        return () => {
            watcher.destroy();
        };
    });

    const groupId = message.source && message.source.__typename === 'MessageSourceChat' && message.source.chat.__typename === 'SharedRoom' ? message.source.chat.id : undefined;
    const [converted] = React.useState<DataSourceWebMessageItem>(convertDsMessage(convertMessage(message, '', messenger)));

    return (
        <div className={wrapper}>
            <XScrollView3 flexGrow={1} flexBasis={0} flexShrink={1} alignItems="flex-start">
                <MessageContent message={converted} />
                <div>
                    {comments.map(item => (
                        <CommentView comment={item.comment} />
                    ))}
                </div>
            </XScrollView3>

            <CommentInput messageId={messageId} groupId={groupId} />
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