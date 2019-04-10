import * as React from 'react';
import { FullMessage_GeneralMessage } from 'openland-api/Types';
import { View, Text, Linking } from 'react-native';
import { Span, preprocessText } from 'openland-mobile/utils/TextProcessor';
import { DefaultConversationTheme } from 'openland-mobile/pages/main/themes/ConversationThemeResolver';
import { resolveInternalLink } from 'openland-mobile/utils/internalLnksResolver';
import { useNonBreakingSpaces } from 'openland-y-utils/TextProcessor';
import { OthersUsersWrapper } from './service/views/OthersUsersWrapper';
import { getMessenger } from 'openland-mobile/utils/messenger';

const renderPreprocessedText = (v: Span, i: number, onUserPress: (id: string) => void) => {
    if (v.type === 'new_line') {
        return <Text key={'br-' + i} >{'\n'}</Text>;
    } else if (v.type === 'link') {
        return (
            <Text
                key={'link-' + i}
                style={{ color: DefaultConversationTheme.linkColorIn, }}
                onPress={resolveInternalLink(v.link!, async () => await Linking.openURL(v.link!))}
            >
                {v.text}
            </Text>
        );
    } else if (v.type === 'mention_user') {
        return (
            <Text
                key={'mention-' + i}
                style={{ color: DefaultConversationTheme.linkColorIn, }}
                onPress={() => onUserPress(v.id)}
            >
                {useNonBreakingSpaces(v.text)}
            </Text>
        );
    } else if (v.type === 'mention_users') {
        return <OthersUsersWrapper onUserPress={uid => onUserPress(uid)} users={v.users} text={v.text!} useAsync={false} />
    } else {
        return <Text key={'text-' + i}>{v.text}</Text>;
    }
}

export interface MessageViewProps {
    message: FullMessage_GeneralMessage;
    size?: 'small' | 'default';
}

export const MessageView = React.memo<MessageViewProps>((props) => {
    const { message } = props;

    const handleUserPress = React.useCallback((id: string) => {
        const router = getMessenger().history.navigationManager;

        router.push('ProfileUser', { id });
    }, []);

    const preprocessed = preprocessText(message.message || '', message.spans);
    const parts = preprocessed.map((p, i) => renderPreprocessedText(p, i, handleUserPress));

    const isSmall = props.size && props.size === 'small' ? true : false;

    return (
        <View>
            <Text style={isSmall ? { fontSize: 15, lineHeight: 20 } : { fontSize: 16, lineHeight: 22 }}>
                {parts}
            </Text>
        </View>
    );
});