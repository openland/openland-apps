import * as React from 'react';
import { View, Platform, TouchableOpacity, Image } from 'react-native';
import { ZKeyboardAwareBar } from 'openland-mobile/components/layout/ZKeyboardAwareBar';
import { SDevice } from 'react-native-s/SDevice';
import { ThemeContext } from 'openland-mobile/themes/ThemeContext';
import { ConversationEngine } from 'openland-engines/messenger/ConversationEngine';
import { Alert } from 'openland-mobile/components/AlertBlanket';
import { getMessenger } from 'openland-mobile/utils/messenger';
import { forward } from 'openland-mobile/messenger/MobileMessenger';
import { SUPER_ADMIN } from 'openland-mobile/pages/Init';

interface ChatSelectedActionsProps {
    conversation: ConversationEngine
}

export const ChatSelectedActions = (props: ChatSelectedActionsProps) => {
    const theme = React.useContext(ThemeContext);
    const del = React.useCallback(() => {
        Alert.builder()
            .title(`Delete ${props.conversation.messagesActionsState.getState().messages.length} messages?`)
            .button('Cancel', 'cancel')
            .action('Delete', 'destructive',
                async () => {
                    await getMessenger().engine.client.mutateRoomDeleteMessages({ mids: props.conversation.messagesActionsState.getState().messages.map(m => m.id!) });
                    props.conversation.messagesActionsState.clear();
                })
            .show();
    }, [])
    const fwd = React.useCallback(() => {
        forward(props.conversation, props.conversation.messagesActionsState.getState().messages);
    }, [])
    const cancel = React.useCallback(() => {
        props.conversation.messagesActionsState.clear();
    }, [])
    let height = Platform.OS === 'ios' ? 50 : 64;

    let canDelete = true;

    if (!SUPER_ADMIN) {
        props.conversation.messagesActionsState.getState().messages.map(m => {
            if (m.senderId !== getMessenger().engine.user.id) {
                canDelete = false;
            }
        });
    }

    let res =
        <View flexGrow={1} flexDirection="row" alignItems="center">
            {canDelete && (
                <TouchableOpacity onPress={del}>
                    <View style={{ height: height, alignItems: 'center', justifyContent: 'center', marginLeft: 30 }}>
                        <Image source={require('assets/ic-delete-ios-26.png')} style={{ tintColor: theme.inputIconsColor }} />
                    </View>
                </TouchableOpacity>
            )}
            {!canDelete && (
                <View style={{ height: height, width: 26, marginLeft: 30 }} />
            )}
            <View flexGrow={1} />
            <TouchableOpacity onPress={cancel}>
                <View style={{ height: height, alignItems: 'center', justifyContent: 'center' }}>
                    <Image source={require('assets/ic-cancel-gray-26.png')} style={{ tintColor: theme.inputIconsColor }} />
                </View>
            </TouchableOpacity>
            <View flexGrow={1} />
            <TouchableOpacity onPress={fwd}>
                <View style={{ height: height, alignItems: 'center', justifyContent: 'center', marginRight: 30 }}>
                    <Image source={require('assets/ic-forward-ios-26.png')} style={{ tintColor: theme.inputIconsColor }} />
                </View>
            </TouchableOpacity >
        </View>

    if (Platform.OS === 'ios') {
        return (
            <ZKeyboardAwareBar>
                {res}
            </ZKeyboardAwareBar>
        );
    }

    return (
        <View marginBottom={SDevice.safeArea.bottom} backgroundColor={theme.backgroundColor}>
            {res}
        </View>
    );
}