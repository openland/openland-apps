import * as React from 'react';
import { View, Platform, LayoutAnimation, Keyboard, DeviceEventEmitter } from 'react-native';
import { useClient } from 'openland-api/useClient';
import { VoiceChatParticipant_user } from 'openland-api/spacex.types';
import { showBottomSheet } from 'openland-mobile/components/BottomSheet';
import { ZButton } from 'openland-mobile/components/ZButton';
import { useForm } from 'openland-form/useForm';
import { useField } from 'openland-form/useField';
import { ZShaker } from 'openland-mobile/components/ZShaker';
import { ZInput } from 'openland-mobile/components/ZInput';
import { ActionSheetBuilder } from 'openland-mobile/components/ActionSheet';
import { ZCounter } from 'openland-mobile/components/ZCounter';
import { ThemeGlobal } from 'openland-y-utils/themes/ThemeGlobal';
import { showRaisedHands } from './RaisedHands';

const KeyboardHandlerContainer = React.memo((props: { children: JSX.Element | JSX.Element[] }) => {
    const [keyboardHeight, setKeyboardHeight] = React.useState(0);
    const isIos = Platform.OS === 'ios';

    const keyboardWillShow = (e: any) => {
        if (e.duration > 0) {
            LayoutAnimation.configureNext(
                LayoutAnimation.create(e.duration, LayoutAnimation.Types[e.easing]),
            );
        }
        setKeyboardHeight(e?.endCoordinates?.height);
    };

    const keyboardWillHide = (e: any) => {
        if (e.duration > 0) {
            LayoutAnimation.configureNext(
                LayoutAnimation.create(e.duration, LayoutAnimation.Types[e.easing]),
            );
        }
        setKeyboardHeight(0);
    };

    const keyboardHeightChange = (e: any) => {
        setKeyboardHeight(e?.height ? Math.ceil(e.height) : 0);
    };

    React.useEffect(() => {
        if (isIos) {
            Keyboard.addListener('keyboardWillShow', keyboardWillShow);
            Keyboard.addListener('keyboardWillHide', keyboardWillHide);
        } else {
            DeviceEventEmitter.addListener('async_keyboard_height', keyboardHeightChange);
        }
        return () => {
            if (isIos) {
                Keyboard.removeListener('keyboardWillShow', keyboardWillShow);
                Keyboard.removeListener('keyboardWillHide', keyboardWillHide);
            } else {
                DeviceEventEmitter.removeListener('async_keyboard_height', keyboardHeightChange);
            }
        };
    }, []);

    return (
        <View
            style={{
                marginTop: 15,
                marginBottom: keyboardHeight,
            }}
        >
            {props.children}
        </View>
    );
});

type EditRoomModalProps = {
    id: string;
    title: string | null;
};

const EditRoomModal = React.memo((props: EditRoomModalProps & { hide: () => void }) => {
    const shakerRef = React.useRef<{ shake: () => void }>(null);
    const client = useClient();
    const form = useForm();
    const titleField = useField('room.title', props.title || '', form);

    const onCancel = () => {
        props.hide();
    };
    const onConfirm = async () => {
        let titleValue = titleField.value.trim();
        if (titleValue.length <= 0) {
            shakerRef.current?.shake();
            return;
        }
        await Promise.all([
            client.mutateVoiceChatUpdate({ id: props.id, input: { title: titleValue } }),
            client.refetchVoiceChat({ id: props.id }),
        ]);
        props.hide();
    };

    return (
        <KeyboardHandlerContainer>
            <ZShaker ref={shakerRef}>
                <ZInput
                    placeholder="Room name"
                    field={titleField}
                    multiline={true}
                />
            </ZShaker>
            <View style={{ flexDirection: 'row', flex: 1, marginHorizontal: 16 }}>
                <View style={{ flex: 1, marginRight: 16 }}>
                    <ZButton style="secondary" size="large" title="Cancel" onPress={onCancel} />
                </View>
                <View style={{ flex: 1 }}>
                    <ZButton size="large" title="Save" action={onConfirm} />
                </View>
            </View>
        </KeyboardHandlerContainer>
    );
});

const showEditRoom = (props: EditRoomModalProps) => {
    showBottomSheet({
        title: 'Edit room',
        cancelable: true,
        scrollViewProps: { keyboardShouldPersistTaps: 'handled' },
        view: (ctx) => <EditRoomModal {...props} hide={ctx.hide} />,
    });
};

interface EditPinnedMessageProps {
    id: string;
    message: string | null;
}

const EditPinnedMessage = React.memo((props: EditPinnedMessageProps & { hide: () => void }) => {
    const shakerRef = React.useRef<{ shake: () => void }>(null);
    const client = useClient();
    const form = useForm();
    const messageField = useField('room.message', props.message || '', form);

    const onCancel = () => {
        props.hide();
    };
    const onConfirm = async () => {
        let messageValue = messageField.value.trim();
        if (messageValue.length <= 0) {
            shakerRef.current?.shake();
            return;
        }
        await Promise.all([
            client.mutateVoiceChatSetPinnedMessage({ id: props.id, message: messageValue }),
            client.refetchVoiceChat({ id: props.id }),
        ]);
        props.hide();
    };

    const onDelete = async () => {
        await Promise.all([
            client.mutateVoiceChatDeletePinnedMessage({ id: props.id }),
            client.refetchVoiceChat({ id: props.id }),
        ]);
        props.hide();
    };

    return (
        <KeyboardHandlerContainer>
            <ZShaker ref={shakerRef}>
                <ZInput
                    placeholder="Pinned message"
                    field={messageField}
                    multiline={true}
                />
            </ZShaker>
            <View style={{ flexDirection: 'row', flex: 1, marginHorizontal: 16 }}>
                <View style={{ flex: 1, marginRight: 16 }}>
                    {props.message ? (
                        <ZButton style="danger" size="large" title="Delete" action={onDelete} />
                    ) : (
                        <ZButton style="secondary" size="large" title="Cancel" onPress={onCancel} />
                    )}
                </View>
                <View style={{ flex: 1 }}>
                    <ZButton size="large" title="Save" action={onConfirm} />
                </View>
            </View>
        </KeyboardHandlerContainer>
    );
});

const showEditPinnedMessage = (props: EditPinnedMessageProps) => {
    showBottomSheet({
        title: 'Pinned message',
        cancelable: true,
        scrollViewProps: { keyboardShouldPersistTaps: 'handled' },
        view: (ctx) => <EditPinnedMessage {...props} hide={ctx.hide} />,
    });
};

export const showRoomSettings = (props: {
    roomId: string;
    roomTitle: string | null;
    roomMessage: string | null;
    raisedHandUsers: VoiceChatParticipant_user[];
    theme: ThemeGlobal;
}) => {
    const builder = new ActionSheetBuilder();
    builder.title('Settings');
    builder.action(
        'Edit room',
        () => showEditRoom({ id: props.roomId, title: props.roomTitle }),
        false,
        require('assets/ic-edit-24.png'),
    );
    builder.action(
        'Pinned message',
        () => showEditPinnedMessage({ id: props.roomId, message: props.roomMessage }),
        false,
        require('assets/ic-pin-24.png'),
    );
    builder.action(
        'Raised hands',
        () => showRaisedHands(props.raisedHandUsers, props.roomId),
        false,
        require('assets/ic-hand-2-24.png'),
        undefined,
        undefined,
        <ZCounter
            theme={props.theme}
            value={props.raisedHandUsers.length}
            size="medium"
            backgroundColor={props.theme.accentPrimary}
            textColor={props.theme.foregroundInverted}
        />,
    );
    builder.show();
};
