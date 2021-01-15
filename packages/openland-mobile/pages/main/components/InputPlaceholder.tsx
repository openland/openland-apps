import * as React from 'react';
import { View, Text, Image, Platform, TouchableOpacity } from 'react-native';
import { TextStyles } from 'openland-mobile/styles/AppStyles';
import { ZKeyboardAwareBar } from 'openland-mobile/components/layout/ZKeyboardAwareBar';
import { SDevice } from 'react-native-s/SDevice';
import { FontStyles } from 'openland-mobile/styles/AppStyles';
import { getClient } from 'openland-mobile/utils/graphqlClient';
import { ThemeContext } from 'openland-mobile/themes/ThemeContext';

interface ChannelMuteButtonProps {
    id: string;
    muted: boolean;
    onMutedChange: () => void;
}

export const ChannelMuteButton = React.memo((props: ChannelMuteButtonProps) => {
    const { muted, onMutedChange } = props;
    const notifications = !muted;
    const client = getClient();

    const theme = React.useContext(ThemeContext);

    const handleNotifications = React.useCallback(async () => {
        let value = !notifications;

        onMutedChange();

        await client.mutateRoomSettingsUpdate({ roomId: props.id, settings: { mute: !value } });
        await client.refetchRoomTiny({ id: props.id });
    }, [notifications]);

    if (Platform.OS === 'ios') {
        return (
            <ZKeyboardAwareBar>
                <TouchableOpacity onPress={handleNotifications}>
                    <View style={{ height: 44, alignItems: 'center', justifyContent: 'center' }}>
                        <Text
                            style={{
                                fontSize: 15,
                                fontWeight: FontStyles.Weight.Bold,
                                color: theme.accentPrimary,
                            }}
                            allowFontScaling={false}
                        >
                            {notifications ? 'Mute' : 'Unmute'}
                        </Text>
                    </View>
                </TouchableOpacity>
            </ZKeyboardAwareBar>
        );
    }

    return (
        <View style={{ marginBottom: SDevice.safeArea.bottom, backgroundColor: theme.backgroundPrimary }}>
            <TouchableOpacity onPress={handleNotifications}>
                <View style={{ height: 44, alignItems: 'center', justifyContent: 'center' }}>
                    <Text
                        style={{
                            fontSize: 15,
                            fontWeight: FontStyles.Weight.Bold,
                            color: theme.accentPrimary,
                        }}
                        allowFontScaling={false}
                    >
                        {notifications ? 'Mute' : 'Unmute'}
                    </Text>
                </View>
            </TouchableOpacity>
        </View>
    );
});

export const ChatInputPlaceholder = React.memo((props: { onPress?: () => void; text: string }) => {
    const theme = React.useContext(ThemeContext);
    if (Platform.OS === 'ios') {
        return (
            <ZKeyboardAwareBar>
                <TouchableOpacity onPress={props.onPress}>
                    <View style={{ height: 44, alignItems: 'center', justifyContent: 'center' }}>
                        <Text
                            style={{
                                fontSize: 15,
                                fontWeight: FontStyles.Weight.Bold,
                                color: theme.accentPrimary,
                            }}
                            allowFontScaling={false}
                        >
                            {props.text}
                        </Text>
                    </View>
                </TouchableOpacity>
            </ZKeyboardAwareBar>
        );
    }

    return (
        <View style={{ marginBottom: SDevice.safeArea.bottom, backgroundColor: theme.backgroundPrimary }}>
            <TouchableOpacity onPress={props.onPress}>
                <View style={{ height: 44, alignItems: 'center', justifyContent: 'center' }}>
                    <Text
                        style={{
                            fontSize: 15,
                            fontWeight: FontStyles.Weight.Bold,
                            color: theme.accentPrimary,
                        }}
                        allowFontScaling={false}
                    >
                        {props.text}
                    </Text>
                </View>
            </TouchableOpacity>
        </View>
    );
});

export const ChatInputBlockPlaceholder = React.memo(
    (props: { banInfo: { isBanned: boolean; isMeBanned: boolean } }) => {
        const theme = React.useContext(ThemeContext);
        if (Platform.OS === 'ios') {
            return (
                <ZKeyboardAwareBar>
                    <View
                        style={{
                            height: 44,
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexDirection: 'row',
                        }}
                    >
                        <Image
                            source={require('assets/ic-warning-16.png')}
                            style={{
                                tintColor: theme.foregroundSecondary,
                                width: 16,
                                height: 16,
                                marginRight: 8,
                            }}
                        />
                        <Text
                            style={{ ...TextStyles.Body, color: theme.foregroundSecondary }}
                            allowFontScaling={false}
                        >
                            {props.banInfo.isBanned ? 'You blocked this person' : 'You are blocked'}
                        </Text>
                    </View>
                </ZKeyboardAwareBar>
            );
        }

        return (
            <View style={{ marginBottom: SDevice.safeArea.bottom, backgroundColor: theme.backgroundPrimary }}>
                <View
                    style={{
                        height: 44,
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexDirection: 'row',
                    }}
                >
                    <Image
                        source={require('assets/ic-warning-16.png')}
                        style={{
                            tintColor: theme.foregroundSecondary,
                            width: 16,
                            height: 16,
                            marginRight: 8,
                        }}
                    />
                    <Text
                        style={{ ...TextStyles.Body, color: theme.foregroundSecondary }}
                        allowFontScaling={false}
                    >
                        {props.banInfo.isBanned ? 'You blocked this person' : 'You are blocked'}
                    </Text>
                </View>
            </View>
        );
    },
);
