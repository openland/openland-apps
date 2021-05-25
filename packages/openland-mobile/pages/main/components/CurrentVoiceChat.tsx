import React from 'react';
import { Text, View, Image } from 'react-native';

import { VoiceChatWithSpeakers } from 'openland-api/spacex.types';
import { ZButton } from 'openland-mobile/components/ZButton';
import { ThemeContext } from 'openland-mobile/themes/ThemeContext';
import { XPAvatarWithPreview } from 'openland-mobile/components/XPAvatarWithPreview';
import { useJoinRoom } from 'openland-mobile/pages/rooms/joinRoom';
import { TextStyles } from 'openland-mobile/styles/AppStyles';

interface CurrentVoiceChatProps {
    currentVoiceChat: VoiceChatWithSpeakers;
}

export const CurrentVoiceChat = React.memo<CurrentVoiceChatProps>((props) => {
    const theme = React.useContext(ThemeContext);
    const { id, title, speakers, speakersCount, listenersCount } = props.currentVoiceChat;

    const firstSpeakers = speakers.slice(0, 5);

    const joinRoom = useJoinRoom();
    const handlePress = React.useCallback(() => {
        joinRoom(id);
    }, [id, joinRoom]);

    return (
        <>
            <View style={{ backgroundColor: theme.backgroundTertiary, height: 16 }} />
            <View style={{ padding: 16 }}>
                <Text
                    style={{ ...TextStyles.Label1, color: theme.foregroundPrimary }}
                    numberOfLines={2}
                >
                    {title}
                </Text>
                <View style={{ marginTop: 12 }}>
                    <View style={{ flexDirection: 'row', marginBottom: 20, alignItems: 'center' }}>
                        {firstSpeakers.map((item) => (
                            <View style={{ marginRight: 8 }}>
                                <XPAvatarWithPreview
                                    size="small"
                                    photo={item.user.photo}
                                    id={item.user.id}
                                    title={item.user.name}
                                />
                            </View>
                        ))}
                        <Text style={{ color: theme.foregroundTertiary, marginLeft: 16 }}>
                            {speakersCount}
                        </Text>
                        <Image
                            source={require('assets/ic-speaker-16.png')}
                            style={{
                                tintColor: theme.foregroundTertiary,
                                width: 16,
                                height: 16,
                                marginLeft: 3,
                            }}
                        />
                        {listenersCount > 0 && (
                            <>
                                <Text style={{ color: theme.foregroundTertiary, marginLeft: 12 }}>
                                    {listenersCount}
                                </Text>
                                <Image
                                    source={require('assets/ic-listener-16.png')}
                                    style={{
                                        tintColor: theme.foregroundTertiary,
                                        width: 16,
                                        height: 16,
                                        marginLeft: 6,
                                    }}
                                />
                            </>
                        )}
                    </View>
                    <ZButton
                        title="Join room"
                        size="large"
                        style="positive"
                        onPress={handlePress}
                    />
                </View>
            </View>
        </>
    );
});
