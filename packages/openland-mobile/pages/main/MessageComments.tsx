import * as React from 'react';
import { withApp } from '../../components/withApp';
import { XMemo } from 'openland-y-utils/XMemo';
import { PageProps } from 'openland-mobile/components/PageProps';
import { SHeader } from 'react-native-s/SHeader';
import { getClient } from 'openland-mobile/utils/graphqlClient';
import { SenderView } from 'openland-mobile/messenger/components/SenderView';
import { ZMessageView } from 'openland-mobile/components/message/ZMessageView';
import { CommentsWrapper } from './components/comments/CommentsWrapper';
import { View } from 'react-native';
import { ReactionsView } from 'openland-mobile/components/message/content/ReactionsView';

const MessageCommentsComponent = XMemo<PageProps>((props) => {
    const messageId = props.router.params.messageId;
    const highlightId = props.router.params.highlightCommentId;
    const client = getClient();
    const message = client.useMessage({ messageId }, { fetchPolicy: 'cache-and-network' }).message;

    if (!message) {
        return null;
    }

    const peerView = (
        <View paddingHorizontal={16}>
            {message.__typename === 'GeneralMessage' && (
                <SenderView
                    sender={message.sender}
                    date={message.date}
                    edited={message.edited}
                />
            )}

            <ZMessageView message={message} />

            {message.__typename === 'GeneralMessage' && <ReactionsView reactions={message.reactions} />}
        </View>
    );

    return (
        <>
            <SHeader title="Comments" />
            <CommentsWrapper
                peerView={peerView}
                peerId={messageId}
                chat={message.source && message.source.__typename === 'MessageSourceChat' ? message.source.chat : undefined}
                highlightId={highlightId}
                onAddComment={async (variables) => {
                    await getClient().mutateAddMessageComment({
                        ...variables,
                        messageId: message.id,
                    });
                }}
            />
        </>
    );
});

export const MessageComments = withApp(MessageCommentsComponent, { navigationAppearance: 'small' });
