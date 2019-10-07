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
import { EntityHeader } from './components/EntityHeader';
import { formatDateAtTime } from 'openland-y-utils/formatTime';

const MessageComponent = XMemo<PageProps>((props) => {
    const { router } = props;
    const { messageId, highlightId } = router.params;
    const client = getClient();
    const message = client.useMessage({ messageId }, { fetchPolicy: 'cache-and-network' }).message;

    if (!message) {
        return null;
    }

    const { date, sender, source } = message;
    const peerView = (
        <View paddingHorizontal={16} paddingTop={8}>
            <ZMessageView message={message} />

            {(message.__typename === 'GeneralMessage' || message.__typename === 'StickerMessage') && (
                <ReactionsView reactions={message.reactions} />
            )}
        </View>
    );

    return (
        <>
            <SHeaderView>
                <EntityHeader
                    avatar={{
                        photo: sender.photo,
                        id: sender.id,
                        title: sender.name
                    }}
                    title={sender.name}
                    subtitle={formatDateAtTime(parseInt(date, 10))}
                    onPress={() => router.push('ProfileUser', { id: sender.id })}
                />
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
