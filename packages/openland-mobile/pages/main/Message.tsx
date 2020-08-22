import * as React from 'react';
import { withApp } from '../../components/withApp';
import { PageProps } from 'openland-mobile/components/PageProps';
import { getClient } from 'openland-mobile/utils/graphqlClient';
import { ZMessageView } from 'openland-mobile/components/message/ZMessageView';
import { CommentsWrapper } from './components/comments/CommentsWrapper';
import { View, Text } from 'react-native';
import { ReactionsView } from 'openland-mobile/components/message/content/ReactionsView';
import { SHeaderView } from 'react-native-s/SHeaderView';
import { EntityHeader } from './components/EntityHeader';
import { formatDateAtTime } from 'openland-y-utils/formatTime';
import { Message_message } from 'openland-api/spacex.types';
import { useForward } from 'openland-mobile/messenger/MobileMessenger';
import { getMessenger } from 'openland-mobile/utils/messenger';
import { ZManageButton } from 'openland-mobile/components/ZManageButton';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { HighlightAlpha, TextStyles } from 'openland-mobile/styles/AppStyles';
import { ThemeContext } from 'openland-mobile/themes/ThemeContext';
import { useChatMessagesActionsMethods } from 'openland-y-utils/MessagesActionsState';

const MessageMenu = React.memo((props: { message: Message_message, isSubscribed: boolean }) => {
    const messenger = getMessenger();
    const { source } = props.message;

    if (!source || source.__typename !== 'MessageSourceChat') {
        return null;
    }

    const { reply, edit } = useChatMessagesActionsMethods({ conversationId: source.chat.id, userId: source.chat.__typename === 'PrivateRoom' ? source.chat.user.id : undefined });
    const forward = useForward(source.chat.id);

    return <ZManageButton onPress={() => messenger.handleMessagePageMenuPress(props.message, props.isSubscribed, { forward, reply, edit })} />;

});

const MessageComponent = React.memo((props: PageProps) => {
    const messenger = getMessenger();
    const theme = React.useContext(ThemeContext);
    const { router } = props;
    const { messageId, highlightId } = router.params;
    const client = getClient();
    const messageData = client.useMessage({ messageId }, { fetchPolicy: 'cache-and-network' });
    const message = messageData.message;

    if (!message) {
        return null;
    }

    const { date, sender, source } = message;
    const peerView = (
        <View paddingHorizontal={16} paddingTop={8} paddingBottom={16}>
            <ZMessageView message={message} />

            {source && source.__typename === 'MessageSourceChat' && source.chat.__typename === 'SharedRoom' && (
                <TouchableOpacity onPress={() => messenger.handleMessageSourcePress(source.chat.id)} activeOpacity={HighlightAlpha}>
                    <View paddingTop={8}>
                        <Text style={{ ...TextStyles.Subhead, color: theme.foregroundTertiary }} allowFontScaling={false}>
                            Message from{' '}
                            <Text style={{ ...TextStyles.Label2 }} allowFontScaling={false}>
                                {source.chat.title}
                            </Text>
                        </Text>
                    </View>
                </TouchableOpacity>
            )}

            {(message.__typename === 'GeneralMessage' || message.__typename === 'StickerMessage') && (
                <ReactionsView reactionCounters={message.reactionCounters} mId={message.id} />
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

            <MessageMenu message={message} isSubscribed={!!messageData.comments.subscription} />

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
