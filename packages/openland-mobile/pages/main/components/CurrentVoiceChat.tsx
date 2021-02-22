import React from 'react';
import { Text, View, Image } from 'react-native';

import { ZListGroup } from 'openland-mobile/components/ZListGroup';
import { VoiceChatWithSpeakers } from 'openland-api/spacex.types';
import { ZButton } from 'openland-mobile/components/ZButton';
import { ThemeContext } from 'openland-mobile/themes/ThemeContext';
import { XPAvatarWithPreview } from 'openland-mobile/components/XPAvatarWithPreview';
import { useJoinRoom } from 'openland-mobile/pages/rooms/joinRoom';

interface CurrentVoiceChatProps {
    currentVoiceChat: VoiceChatWithSpeakers;
}

export const CurrentVoiceChat = React.memo<CurrentVoiceChatProps>(props => {
    const theme = React.useContext(ThemeContext);
    const { id, title, speakers, speakersCount, listenersCount } = props.currentVoiceChat;

    const firstSpeakers = speakers.slice(0, 5);

    const joinRoom = useJoinRoom();
    const handlePress = React.useCallback(() => {
        joinRoom(id);
    }, [id, joinRoom]);

    return (
        <ZListGroup header={title} useSpacer={true}>
            <View style={{ paddingHorizontal: 16, paddingBottom: 16 }}>
                <View style={{ flexDirection: 'row', marginBottom: 20, alignItems: 'center' }}>
                    {firstSpeakers.map(item => (
                        <XPAvatarWithPreview
                            size="small"
                            photo={item.user.photo}
                            id={item.user.id}
                            title={item.user.name}
                        />
                    ))}
                    <Text style={{ color: theme.foregroundTertiary, marginLeft: 24 }}>{speakersCount}</Text>
                    <Image source={require('assets/ic-microphone-24.png')} style={{ tintColor: theme.foregroundTertiary, width: 16, height: 16, marginLeft: 6 }} />
                    <View style={{ backgroundColor: theme.foregroundTertiary, width: 3, height: 3, borderRadius: 3, opacity: 0.5, marginHorizontal: 8 }}/>
                    <Text style={{ color: theme.foregroundTertiary }}>{listenersCount}</Text>
                    <Image source={require('assets/ic-listener-16.png')} style={{ tintColor: theme.foregroundTertiary, width: 16, height: 16, marginLeft: 6 }} />
                </View>
                <ZButton title="Join room" size="large" style="positive" onPress={handlePress}/>
            </View>
        </ZListGroup>
    );
});