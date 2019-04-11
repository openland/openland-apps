import * as React from 'react';
import { Text, Linking } from 'react-native';
import { Span } from 'openland-mobile/utils/TextProcessor';
import { DefaultConversationTheme } from 'openland-mobile/pages/main/themes/ConversationThemeResolver';
import { resolveInternalLink } from 'openland-mobile/utils/internalLnksResolver';
import { useNonBreakingSpaces } from 'openland-y-utils/TextProcessor';
import { OthersUsersWrapper } from 'openland-mobile/messenger/components/service/views/OthersUsersWrapper';

export const renderPreprocessedText = (v: Span, i: number, onUserPress: (id: string) => void) => {
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