import * as React from 'react';
import { withApp } from '../../components/withApp';
import { XMemo } from 'openland-y-utils/XMemo';
import { PageProps } from 'openland-mobile/components/PageProps';
import { getClient } from 'openland-mobile/utils/graphqlClient';
import { ZMessageView } from 'openland-mobile/components/message/ZMessageView';
import { CommentsWrapper } from './components/comments/CommentsWrapper';
import { View } from 'react-native';
import { ReactionsView } from 'openland-mobile/components/message/content/ReactionsView';
import { SHeaderView } from 'react-native-s/SHeaderView';
import { AuthorHeader } from './components/AuthorHeader';

const MessageComponent = XMemo<PageProps>((props) => {
    const messageId = props.router.params.messageId;
    const highlightId = props.router.params.highlightCommentId;
    const client = getClient();
    const message = client.useMessage({ messageId }, { fetchPolicy: 'cache-and-network' }).message;

    if (!message) {
        return null;
    }

    const { date, sender, source } = message;
    const peerView = (
        <View paddingHorizontal={16} paddingTop={8}>
            <ZMessageView message={message} />

            {message.__typename !== 'ServiceMessage' && (
                <ReactionsView reactions={message.reactions} />
            )}
        </View>
    );

    return (
        <>
            <SHeaderView>
                <AuthorHeader author={sender} date={parseInt(date, 10)} />
            </SHeaderView>

            <CommentsWrapper
                peerView={peerView}
                peerId={messageId}
                chat={source && source.__typename === 'MessageSourceChat' ? source.chat : undefined}
                highlightId={highlightId}
            />
        </>
    );
});

export const Message = withApp(MessageComponent, { navigationAppearance: 'small' });
