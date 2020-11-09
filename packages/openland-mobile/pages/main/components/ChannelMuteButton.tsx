import * as React from 'react';
import { View, Text, Platform, TouchableOpacity } from 'react-native';
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

export const ChannelMuteButton = (props: ChannelMuteButtonProps) => {
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
                        <Text style={{ fontSize: 15, fontWeight: FontStyles.Weight.Bold, color: theme.accentPrimary }} allowFontScaling={false}>
                            {notifications ? 'Mute' : 'Unmute'}
                        </Text>
                    </View>
                </TouchableOpacity>
            </ZKeyboardAwareBar>
        );
    }

    return (
        <View marginBottom={SDevice.safeArea.bottom} backgroundColor={theme.backgroundPrimary}>
            <TouchableOpacity onPress={handleNotifications}>
                <View style={{ height: 44, alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={{ fontSize: 15, fontWeight: FontStyles.Weight.Bold, color: theme.accentPrimary }} allowFontScaling={false}>
                        {notifications ? 'Mute' : 'Unmute'}
                    </Text>
                </View>
            </TouchableOpacity>
        </View>
    );
};

export const ChatInputPlaceholder = (props: { onPress?: () => void, text: string }) => {
    const theme = React.useContext(ThemeContext);
    if (Platform.OS === 'ios') {
        return (
            <ZKeyboardAwareBar>
                <TouchableOpacity onPress={props.onPress}>
                    <View style={{ height: 44, alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={{ fontSize: 15, fontWeight: FontStyles.Weight.Bold, color: theme.accentPrimary }} allowFontScaling={false}>
                            {props.text}
                        </Text>
                    </View>
                </TouchableOpacity>
            </ZKeyboardAwareBar>
        );
    }

    return (
        <View marginBottom={SDevice.safeArea.bottom} backgroundColor={theme.backgroundPrimary}>
            <TouchableOpacity onPress={props.onPress}>
                <View style={{ height: 44, alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={{ fontSize: 15, fontWeight: FontStyles.Weight.Bold, color: theme.accentPrimary }} allowFontScaling={false}>
                        {props.text}
                    </Text>
                </View>
            </TouchableOpacity>
        </View>
    );
};