import * as React from 'react';
import { ZManageButton } from 'openland-mobile/components/ZManageButton';
import { ActionSheetBuilder } from 'openland-mobile/components/ActionSheet';
import { getMessenger } from 'openland-mobile/utils/messenger';
import { Modals } from '../modals/Modals';
import { SRouter } from 'react-native-s/SRouter';
import { RoomMemberRole, Room_room, Room_room_SharedRoom } from 'openland-api/Types';
import Alert from 'openland-mobile/components/AlertBlanket';
import { useClient } from 'openland-mobile/utils/useClient';
import { XMemo } from 'openland-y-utils/XMemo';

interface ConversationManageButtonProps {
    muted: boolean;
    onMutedChange: () => void;
    router: SRouter;
    room: Room_room;
}

const useSharedHandlers = (room: Room_room_SharedRoom, router: SRouter) => {
    const client = useClient();
    const userId = getMessenger().engine.user.id;

    const onInvitePress = React.useCallback(() => {
        Modals.showUserMuptiplePicker(router,
            {
                title: 'Add',
                action: async (users) => {
                    try {
                        await client.mutateRoomAddMembers({
                            invites: users.map(u => ({ userId: u.id, role: RoomMemberRole.MEMBER })),
                            roomId: room.id
                        });
                        client.refetchRoomTiny({ id: room.id });
                    } catch (e) {
                        Alert.alert(e.message);
                    }
                    router.back();
                }
            },
            'Invite friends',
            [],
            [userId],
            { path: 'ProfileGroupLink', pathParams: { room } }
        );
    }, [room.id, userId]);

    const onLeavePress = React.useCallback(() => {
        Alert.builder()
            .title(`Leave ${room.isChannel ? 'channel' : 'group'}?`)
            .message('You may not be able to join it again')
            .button('Cancel', 'cancel')
            .action('Leave', 'destructive', async () => {
                await client.mutateRoomLeave({ roomId: room.id });
                router.pushAndResetRoot('Home');
            })
            .show();
    }, [room.id]);

    return { onInvitePress, onLeavePress };
};

export const ConversationManageButton = XMemo((props: ConversationManageButtonProps) => {
    const { muted, onMutedChange, room, router } = props;
    const client = useClient();

    const onNotificationsPress = React.useCallback(() => {
        onMutedChange();

        client.mutateRoomSettingsUpdate({ roomId: room.id, settings: { mute: !muted } });
        client.refetchRoomTiny({ id: room.id });
    }, [muted, room.id]);
    const { onInvitePress, onLeavePress } = useSharedHandlers(room as Room_room_SharedRoom, router);

    const onPress = React.useCallback(() => {
        const builder = new ActionSheetBuilder();

        const notificationsTitle = `${muted ? 'Unmute' : 'Mute'} notifications`;
        const notificationsIcon = muted ? require('assets/ic-notifications-off-24.png') : require('assets/ic-notifications-24.png');
        builder.action(notificationsTitle, onNotificationsPress, false, notificationsIcon);

        const isPrivate = room.__typename === 'PrivateRoom';
        if (!isPrivate) {
            builder.action('Invite friends', onInvitePress, false, require('assets/ic-invite-24.png'));
            builder.action('Leave and delete', onLeavePress, false, require('assets/ic-leave-24.png'));
        }

        builder.show();

    }, [muted, onNotificationsPress, onInvitePress, onLeavePress]);

    return <ZManageButton onPress={onPress} />;
});
