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
import {
    Message_message,
    Message_message_GeneralMessage_source_MessageSourceChat_chat_PrivateRoom,
    Message_message_GeneralMessage_source_MessageSourceChat_chat_SharedRoom,
} from 'openland-api/spacex.types';
import { getMessenger } from 'openland-mobile/utils/messenger';
import { ZManageButton } from 'openland-mobile/components/ZManageButton';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { HighlightAlpha, TextStyles } from 'openland-mobile/styles/AppStyles';
import { ThemeContext } from 'openland-mobile/themes/ThemeContext';
import { useText } from 'openland-mobile/text/useText';

// remove after adding isDeleted flag in API
const isMessageDeleted = (message: Message_message) => {
    if (
        message.sender.name === 'Deleted' &&
        message.sender.isBot &&
        message.message === 'This message has been deleted'
    ) {
        return true;
    }
    return false;
};

const useChatLink = () => {
    const { t } = useText();
    return (
        chat:
            | Message_message_GeneralMessage_source_MessageSourceChat_chat_PrivateRoom
            | Message_message_GeneralMessage_source_MessageSourceChat_chat_SharedRoom
    ) => {
        if (chat.__typename === 'SharedRoom') {
            return (
                <>
                    {t('fromChat', 'From')}
                    {' '}
                    <Text style={{ ...TextStyles.Label2 }} allowFontScaling={false}>
                        {chat.title}
                    </Text>
                </>
            );
        } else {
            return (
                <>
                    {t('fromChatWith', 'From chat with')}
                    {' '}
                    <Text style={{ ...TextStyles.Label2 }} allowFontScaling={false}>
                        {chat.user.name}
                    </Text>
                </>
            );
        }
    };
};

const MessageMenu = React.memo((props: { message: Message_message; isSubscribed: boolean }) => {
    const messenger = getMessenger();
    const { source } = props.message;

    if (!source || source.__typename !== 'MessageSourceChat') {
        return null;
    }

    return (
        <ZManageButton
            onPress={() => messenger.handleMessagePageMenuPress(props.message, props.isSubscribed)}
        />
    );
});

const MessageComponent = React.memo((props: PageProps) => {
    const messenger = getMessenger();
    const theme = React.useContext(ThemeContext);
    const { router } = props;
    const { messageId, highlightId, withFocus } = router.params;
    const client = getClient();
    const messageData = client.useMessage({ messageId }, { fetchPolicy: 'cache-and-network' });
    const message = messageData.message;
    const getChatLink = useChatLink();

    if (!message) {
        return null;
    }

    const isDeleted = isMessageDeleted(message);
    const { date, sender, source } = message;
    const peerView = (
        <View style={{ paddingHorizontal: 16, paddingTop: 8, paddingBottom: 16 }}>
            <ZMessageView message={message} />

            {source && source.__typename === 'MessageSourceChat' && (
                <TouchableOpacity
                    onPress={() => messenger.handleMessageSourcePress(source.chat.id)}
                    activeOpacity={HighlightAlpha}
                >
                    <View style={{ paddingTop: 8 }}>
                        <Text
                            style={{ ...TextStyles.Subhead, color: theme.foregroundTertiary }}
                            allowFontScaling={false}
                        >
                            {getChatLink(source.chat)}
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
                        title: sender.name,
                    }}
                    proBadge={!!sender.systemBadge}
                    title={sender.name}
                    subtitle={formatDateAtTime(parseInt(date, 10))}
                    onPress={() => router.push('ProfileUser', { id: sender.id })}
                />
            </SHeaderView>

            {!isDeleted && (
                <MessageMenu message={message} isSubscribed={!!messageData.comments.subscription} />
            )}

            <CommentsWrapper
                peerView={peerView}
                peerId={messageId}
                chat={source && source.__typename === 'MessageSourceChat' ? source.chat : undefined}
                highlightId={highlightId}
                isDeleted={isDeleted}
                autofocus={withFocus}
            />
        </>
    );
});

export const Message = withApp(MessageComponent, { navigationAppearance: 'small' });
