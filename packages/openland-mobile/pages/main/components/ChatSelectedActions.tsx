import * as React from 'react';
import { RoomTiny_room } from 'openland-api/spacex.types';
import { View, Platform, TouchableOpacity, Image, Text } from 'react-native';
import { ZKeyboardAwareBar } from 'openland-mobile/components/layout/ZKeyboardAwareBar';
import { SDevice } from 'react-native-s/SDevice';
import { ThemeContext } from 'openland-mobile/themes/ThemeContext';
import { ConversationEngine } from 'openland-engines/messenger/ConversationEngine';
import Alert from 'openland-mobile/components/AlertBlanket';
import { getMessenger } from 'openland-mobile/utils/messenger';
import { forward } from 'openland-mobile/messenger/MobileMessenger';
import { SUPER_ADMIN } from 'openland-mobile/pages/Init';
import { TextStyles } from 'openland-mobile/styles/AppStyles';
import { HeaderConfigRegistrator } from 'react-native-s/navigation/HeaderConfigRegistrator';
import { SHeaderView } from 'react-native-s/SHeaderView';
import { SCloseButton } from 'react-native-s/SCloseButton';
import { plural } from 'openland-y-utils/plural';

export const ChatSelectedActionsHeader = (props: { messagesCount: number; cancel: () => void }) => {
    const messagesText =
        props.messagesCount > 0
            ? `${plural(props.messagesCount, ['message', 'messages'])} selected`
            : 'Select messages';
    const theme = React.useContext(ThemeContext);
    const height = Platform.OS === 'android' ? 56 : 44;

    return (
        <View
            alignItems="center"
            justifyContent="center"
            height={height}
            flexDirection="row"
            flexGrow={1}
            position="relative"
        >
            <View position="absolute" left={0}>
                <SCloseButton onPress={props.cancel} tintColor={theme.foregroundSecondary} />
            </View>
            <Text
                style={{
                    ...TextStyles.Headline,
                    textAlign: 'center',
                    color: theme.foregroundPrimary,
                }}
                allowFontScaling={false}
            >
                {messagesText}
            </Text>
        </View>
    );
};

interface ChatSelectedActionsProps {
    conversation: ConversationEngine;
    chat: RoomTiny_room;
}

export const ChatSelectedActions = (props: ChatSelectedActionsProps) => {
    const theme = React.useContext(ThemeContext);
    const del = React.useCallback(() => {
        const messagesCount = props.conversation.messagesActionsStateEngine.getState().messages
            .length;
        const messagesText = plural(messagesCount, ['message', 'messages']);
        Alert.builder()
            .title(`Delete ${messagesText}?`)
            .message('Messages will be deleted for everyone. This cannot be undone')
            .button('Cancel', 'cancel')
            .action('Delete', 'destructive', async () => {
                await getMessenger().engine.client.mutateRoomDeleteMessages({
                    mids: props.conversation.messagesActionsStateEngine
                        .getState()
                        .messages.map((m) => m.id!),
                });
                props.conversation.messagesActionsStateEngine.clear();
            })
            .show();
    }, []);
    const fwd = React.useCallback(() => {
        forward(
            props.conversation,
            props.conversation.messagesActionsStateEngine.getState().messages,
        );
    }, []);
    const cancel = React.useCallback(() => {
        props.conversation.messagesActionsStateEngine.clear();
    }, []);
    let height = 52;

    let canDelete = true;
    const hasSelectedMessages =
        props.conversation.messagesActionsStateEngine.getState().messages.length > 0;

    if (!SUPER_ADMIN) {
        props.conversation.messagesActionsStateEngine.getState().messages.map((m) => {
            if (m.senderId !== getMessenger().engine.user.id) {
                canDelete = false;
            }
        });
    }
    if (
        props.chat.__typename === 'SharedRoom' &&
        (props.chat.role === 'OWNER' || props.chat.role === 'ADMIN')
    ) {
        canDelete = true;
    }
    const isDeleteDisabled = !canDelete || !hasSelectedMessages;
    const isForwardDisabled = !hasSelectedMessages;

    let res = (
        <View flexGrow={1} flexDirection="row" alignItems="center">
            <View flexGrow={1} justifyContent="center" alignItems="center">
                <TouchableOpacity onPress={del} disabled={isDeleteDisabled}>
                    <View
                        style={{
                            height: height,
                            alignItems: 'center',
                            justifyContent: 'center',
                            opacity: isDeleteDisabled ? 0.24 : 1,
                        }}
                    >
                        <Image
                            source={require('assets/ic-delete-24.png')}
                            style={{ tintColor: theme.foregroundSecondary }}
                        />
                    </View>
                </TouchableOpacity>
            </View>
            <View flexGrow={1}>
                <TouchableOpacity onPress={fwd} disabled={isForwardDisabled}>
                    <View
                        style={{
                            height: height,
                            alignItems: 'center',
                            justifyContent: 'center',
                            opacity: isForwardDisabled ? 0.24 : 1,
                        }}
                    >
                        <Image
                            source={require('assets/ic-forward-24.png')}
                            style={{ tintColor: theme.foregroundSecondary }}
                        />
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    );

    if (Platform.OS === 'ios') {
        return (
            <>
                <HeaderConfigRegistrator config={{ hideIcon: true }} />
                <SHeaderView>
                    <ChatSelectedActionsHeader
                        messagesCount={
                            props.conversation.messagesActionsStateEngine.getState().messages.length
                        }
                        cancel={cancel}
                    />
                </SHeaderView>
                <ZKeyboardAwareBar>{res}</ZKeyboardAwareBar>
            </>
        );
    }

    return (
        <>
            <HeaderConfigRegistrator config={{ hideIcon: true }} />
            <SHeaderView>
                <ChatSelectedActionsHeader
                    messagesCount={
                        props.conversation.messagesActionsStateEngine.getState().messages.length
                    }
                    cancel={cancel}
                />
            </SHeaderView>
            <View marginBottom={SDevice.safeArea.bottom} backgroundColor={theme.backgroundPrimary}>
                {res}
            </View>
        </>
    );
};
