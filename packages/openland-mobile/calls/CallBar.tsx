import * as React from 'react';
import { getClient } from 'openland-mobile/utils/graphqlClient';
import { View, Text, Image } from 'react-native';
import { useWatchCall } from './useWatchCall';
import { getMessenger } from 'openland-mobile/utils/messenger';
import { useTheme } from 'openland-mobile/themes/ThemeContext';
import { plural } from 'openland-y-utils/plural';
import { TextStyles } from 'openland-mobile/styles/AppStyles';
import { TouchableHighlight } from 'react-native-gesture-handler';
import { useJoinRoom } from 'openland-mobile/pages/rooms/joinRoom';

export const CallBarComponent = React.memo((props: { id: string, showCallModal: () => void }) => {
    let conference = getClient().useConferenceMeta({ id: props.id }, { fetchPolicy: 'cache-and-network' });
    const theme = useTheme();
    const mediaSession = getMessenger().engine.calls.useCurrentSession();
    const voiceChat = getMessenger().engine.voiceChat.useVoiceChat();
    const isVoiceChat = conference?.conference.parent?.__typename === 'VoiceChat';
    const disabled = !!mediaSession && !!voiceChat && !isVoiceChat;
    const joinRoom = useJoinRoom();
    const handlePress = React.useCallback(() => {
        if (isVoiceChat) {
            joinRoom(props.id);
        } else {
            props.showCallModal();
        }
    }, [isVoiceChat, props.id]);

    useWatchCall(conference && conference.conference.id);

    if (conference && conference.conference && conference.conference.peers.length > 0) {
        let [firstPeer, ...otherPeers] = conference.conference.peers;
        let othersText = otherPeers.length === 0
            ? ''
            : ` and ${plural(otherPeers.length, ['other', 'others'])}`;
        let text = `${firstPeer.user.name}${othersText}`;
        return (
            <TouchableHighlight
                activeOpacity={1}
                disabled={disabled}
                underlayColor={theme.accentPositiveHover}
                style={{ backgroundColor: theme.accentPositive, opacity: disabled ? 0.7 : 1 }}
                onPress={handlePress}
            >
                <View
                    style={{
                        paddingHorizontal: 16,
                        paddingVertical: 12,
                        flexDirection: 'row',
                    }}
                >
                    <View style={{ flexDirection: 'row', alignItems: 'center', flexGrow: 1, flexShrink: 1 }}>
                        <Image
                            source={isVoiceChat ? require('assets/ic-mic-24.png') : require('assets/ic-call-24.png')}
                            style={{ marginRight: 16, tintColor: theme.foregroundContrast }}
                        />
                        <Text style={{ ...TextStyles.Subhead, color: theme.foregroundContrast }} numberOfLines={1} allowFontScaling={false}>
                            {text}
                        </Text>
                    </View>
                    <View style={{ marginLeft: 8, flexShrink: 0, justifyContent: 'center' }}>
                        <Text style={{ ...TextStyles.Label2, color: theme.foregroundContrast }} numberOfLines={1} allowFontScaling={false}>
                            Join
                    </Text>
                    </View>
                </View>
            </TouchableHighlight>
        );
    }
    return null;
});