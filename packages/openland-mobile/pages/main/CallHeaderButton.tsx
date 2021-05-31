import { RoomMemberRole, RoomChat_room_SharedRoom, SharedRoomKind } from 'openland-api/spacex.types';
import { useClient } from 'openland-api/useClient';
import { getMessenger } from 'openland-mobile/utils/messenger';
import * as React from 'react';
import { SHeaderButton } from 'react-native-s/SHeaderButton';
import { useJoinRoom } from '../rooms/joinRoom';

const VoiceCallButton = React.memo((props: {
    sharedRoom: RoomChat_room_SharedRoom,
    disabled: boolean;
}) => {
    const client = useClient();
    const joinRoom = useJoinRoom();
    const handleStartRoom = React.useCallback(async () => {
        let roomId = props.sharedRoom.activeVoiceChat?.id;
        if (!roomId) {
            const room = (await client.mutateVoiceChatCreateInChat({
                input: {
                    title: props.sharedRoom.title,
                    isPrivate: props.sharedRoom.kind === SharedRoomKind.GROUP
                },
                cid: props.sharedRoom.id
            })).voiceChatCreateInChat;
            roomId = room.chat.id;
        }
        if (roomId) {
            await joinRoom(roomId, !props.sharedRoom.activeVoiceChat?.active);
        }
    }, [props.sharedRoom, props.sharedRoom.activeVoiceChat]);

    return (
        <SHeaderButton
            title="Start room"
            priority={1}
            disabled={props.disabled}
            icon={require('assets/ic-mic-24.png')}
            onPress={handleStartRoom}
        />
    );
});

export const CallHeaderButton = React.memo((props: {
    sharedRoom?: RoomChat_room_SharedRoom,
    showCallModal: () => void,
}) => {
    const mediaSession = getMessenger().engine.calls.useCurrentSession();
    const voiceChat = getMessenger().engine.voiceChat.useVoiceChat();
    const disabled = !!mediaSession && !!voiceChat;
    const isSecret = props.sharedRoom && props.sharedRoom.kind === 'GROUP';
    const showStartRoom = isSecret
        ? props.sharedRoom && props.sharedRoom.membersCount <= 15
        : props.sharedRoom?.role === RoomMemberRole.ADMIN || props.sharedRoom?.role === RoomMemberRole.OWNER;

    if (!props.sharedRoom) {
        return (
            <SHeaderButton
                title="Call"
                priority={1}
                disabled={disabled}
                icon={require('assets/ic-call-24.png')}
                onPress={props.showCallModal}
            />
        );
    }

    if (showStartRoom) {
        return (
            <VoiceCallButton
                disabled={disabled}
                sharedRoom={props.sharedRoom}
            />
        );
    }

    return null;
});
