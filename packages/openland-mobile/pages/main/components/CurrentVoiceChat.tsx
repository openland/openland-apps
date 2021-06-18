import React from 'react';
import { Text, View, Image } from 'react-native';

import { VoiceChatWithSpeakers } from 'openland-api/spacex.types';
import { ZButton } from 'openland-mobile/components/ZButton';
import { ThemeContext } from 'openland-mobile/themes/ThemeContext';
import { XPAvatarWithPreview } from 'openland-mobile/components/XPAvatarWithPreview';
import { useJoinRoom } from 'openland-mobile/pages/rooms/joinRoom';
import { TextStyles } from 'openland-mobile/styles/AppStyles';
import { useText } from 'openland-mobile/text/useText';

interface CurrentVoiceChatProps {
    currentVoiceChat: VoiceChatWithSpeakers;
}

export const CurrentVoiceChat = React.memo<CurrentVoiceChatProps>((props) => {
    const theme = React.useContext(ThemeContext);
    const { t } = useText();
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
                    allowFontScaling={false}
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
                                />
                            </View>
                        ))}
                        <Text style={{ color: theme.foregroundTertiary, marginLeft: 16 }} allowFontScaling={false}>
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
                                <Text style={{ color: theme.foregroundTertiary, marginLeft: 12 }} allowFontScaling={false}>
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
                        title={t('joinRoom', 'Join room')}
                        size="large"
                        style="positive"
                        onPress={handlePress}
                    />
                </View>
            </View>
        </>
    );
});
