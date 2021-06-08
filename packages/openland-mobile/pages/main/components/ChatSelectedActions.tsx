import * as React from 'react';
import { RoomChat_room } from 'openland-api/spacex.types';
import { View, Platform, TouchableOpacity, Image, Text } from 'react-native';
import { ZKeyboardAwareBar } from 'openland-mobile/components/layout/ZKeyboardAwareBar';
import { SDevice } from 'react-native-s/SDevice';
import { ThemeContext } from 'openland-mobile/themes/ThemeContext';
import { ConversationEngine } from 'openland-engines/messenger/ConversationEngine';
import Alert from 'openland-mobile/components/AlertBlanket';
import { getMessenger } from 'openland-mobile/utils/messenger';
import { useForward } from 'openland-mobile/messenger/MobileMessenger';
import { SUPER_ADMIN } from 'openland-mobile/pages/Init';
import { TextStyles } from 'openland-mobile/styles/AppStyles';
import { HeaderConfigRegistrator } from 'react-native-s/navigation/HeaderConfigRegistrator';
import { SHeaderView } from 'react-native-s/SHeaderView';
import { SCloseButton } from 'react-native-s/SCloseButton';
import { useChatMessagesActionsState, useChatMessagesActionsMethods } from 'openland-y-utils/MessagesActionsState';
import { useText } from 'openland-mobile/text/useText';

export const ChatSelectedActionsHeader = (props: { messagesCount: number; cancel: () => void }) => {
    const { t } = useText();
    const messagesText =
        props.messagesCount > 0
            ? `${props.messagesCount} ${t('selectedMessage', { count: props.messagesCount, defaultValue: 'message selected' })}`
            : t('selectedMessageDefault', 'Select messages');
    const theme = React.useContext(ThemeContext);
    const height = Platform.OS === 'android' ? 56 : 44;

    return (
        <View
            style={{
                alignItems: 'center',
                justifyContent: 'center',
                height,
                flexDirection: 'row',
                flexGrow: 1,
                position: 'relative'
            }}
        >
            <View style={{ position: 'absolute', left: 0 }}>
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
    chat: RoomChat_room;
}

export const ChatSelectedActions = (props: ChatSelectedActionsProps) => {
    const theme = React.useContext(ThemeContext);
    const { t } = useText();
    const state = useChatMessagesActionsState(props.chat.id);

    const { clear } = useChatMessagesActionsMethods(props.chat.id);
    const del = React.useCallback(() => {
        if (state.action !== 'selected') {
            return;
        }
        const messagesCount = state.messages.length;
        const messagesText = t('message', { count: messagesCount, defaultValue: 'message' });
        Alert.builder()
            .title(`${t('delete', 'Delete')} ${messagesText}?`)
            .message(t('deleteMessagesDescription', 'Messages will be deleted for everyone. This cannot be undone'))
            .button(t('cancel', 'Cancel'), 'cancel')
            .action(t('delete', 'Delete'), 'destructive', async () => {
                await getMessenger().engine.client.mutateRoomDeleteMessages({
                    mids: state.messages.map((m) => m.id!),
                });
                clear();
            })
            .show();
    }, [state]);
    const save = React.useCallback(async () => {
        if (state.action !== 'selected') {
            return;
        }

        await getMessenger().handleSaveMessages(state.messages.map((m) => m.id!));

        clear();
    }, [state]);
    const forward = useForward(props.chat.id);
    let height = 52;

    let canDelete = true;
    const hasSelectedMessages = state.action === 'selected';

    if (!SUPER_ADMIN) {
        state.messages.forEach((m) => {
            if (m.sender.id !== getMessenger().engine.user.id) {
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
        <View style={{ flexGrow: 1, flexDirection: 'row', alignItems: 'center' }}>
            <View style={{ flexGrow: 1, justifyContent: 'center', alignItems: 'center' }}>
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
            {!props.conversation.isSavedMessage && (
                <View style={{ flexGrow: 1 }}>
                    <TouchableOpacity onPress={save} disabled={isForwardDisabled}>
                        <View
                            style={{
                                height: height,
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                        >
                            <Image
                                source={require('assets/ic-bookmark-24.png')}
                                style={{ tintColor: theme.foregroundSecondary }}
                            />
                        </View>
                    </TouchableOpacity>
                </View>
            )}
            <View style={{ flexGrow: 1 }}>
                <TouchableOpacity onPress={() => forward()} disabled={isForwardDisabled}>
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
                        messagesCount={state.action === 'selected' ? state.messages.length : 0}
                        cancel={clear}
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
                    messagesCount={state.action === 'selected' ? state.messages.length : 0}
                    cancel={clear}
                />
            </SHeaderView>
            <View style={{ marginBottom: SDevice.safeArea.bottom, backgroundColor: theme.backgroundPrimary }}>
                {res}
            </View>
        </>
    );
};
