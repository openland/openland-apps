import * as React from 'react';
import { View, Text, Platform, TouchableOpacity, TextStyle } from 'react-native';
import { ZKeyboardAwareBar } from 'openland-mobile/components/layout/ZKeyboardAwareBar';
import { SDevice } from 'react-native-s/SDevice';
import { TextStyles } from 'openland-mobile/styles/AppStyles';
import { getClient } from 'openland-mobile/utils/graphqlClient';
import { ThemeContext } from 'openland-mobile/themes/ThemeContext';

interface ChannelMuteButtonProps {
    id: string;
    mute: boolean;
}

export const ChannelMuteButton = (props: ChannelMuteButtonProps) => {
    const client = getClient();

    const theme = React.useContext(ThemeContext);

    const [notifications, setNotifications] = React.useState(!props.mute);

    const handleNotifications = React.useCallback(() => {
        let value = !notifications;

        setNotifications(value);

        client.mutateRoomSettingsUpdate({ roomId: props.id, settings: { mute: !value } });
        client.refetchRoomTiny({ id: props.id });
    }, [notifications]);

    if (Platform.OS === 'ios') {
        return (
            <ZKeyboardAwareBar>
                <TouchableOpacity onPress={handleNotifications}>
                    <View style={{ height: 44, alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={{ fontSize: 15, fontWeight: TextStyles.weight.bold, color: theme.accentColor } as TextStyle}>
                            {notifications ? 'Mute' : 'Unmute'}
                        </Text>
                    </View>
                </TouchableOpacity>
            </ZKeyboardAwareBar>
        );
    }

    return (
        <View marginBottom={SDevice.safeArea.bottom} backgroundColor={theme.backgroundColor}>
            <TouchableOpacity onPress={handleNotifications}>
                <View style={{ height: 44, alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={{ fontSize: 15, fontWeight: TextStyles.weight.bold, color: theme.accentColor } as TextStyle}>
                        {notifications ? 'Mute' : 'Unmute'}
                    </Text>
                </View>
            </TouchableOpacity>
        </View>
    );
}

export const ChatInputPlaceholder = (props: { onPress?: () => void, text: string }) => {
    const theme = React.useContext(ThemeContext);
    if (Platform.OS === 'ios') {
        return (
            <ZKeyboardAwareBar>
                <TouchableOpacity onPress={props.onPress}>
                    <View style={{ height: 44, alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={{ fontSize: 15, fontWeight: TextStyles.weight.bold, color: theme.accentColor } as TextStyle}>
                            {props.text}
                        </Text>
                    </View>
                </TouchableOpacity>
            </ZKeyboardAwareBar>
        );
    }

    return (
        <View marginBottom={SDevice.safeArea.bottom} backgroundColor={theme.backgroundColor}>
            <TouchableOpacity onPress={props.onPress}>
                <View style={{ height: 44, alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={{ fontSize: 15, fontWeight: TextStyles.weight.bold, color: theme.accentColor } as TextStyle}>
                        {props.text}
                    </Text>
                </View>
            </TouchableOpacity>
        </View>
    );
}