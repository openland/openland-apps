import * as React from 'react';
import { ZManageButton } from 'openland-mobile/components/ZManageButton';
import { ActionSheetBuilder } from 'openland-mobile/components/ActionSheet';
import { getMessenger } from 'openland-mobile/utils/messenger';
import { Modals } from '../modals/Modals';
import { SRouter } from 'react-native-s/SRouter';
import { RoomTiny_room, RoomMemberRole, RoomTiny_room_SharedRoom } from 'openland-api/spacex.types';
import Alert from 'openland-mobile/components/AlertBlanket';
import { useClient } from 'openland-api/useClient';

interface ConversationManageButtonProps {
    muted: boolean;
    onMutedChange: () => void;
    router: SRouter;
    room: RoomTiny_room;
}

const useSharedHandlers = (room: RoomTiny_room_SharedRoom, router: SRouter) => {
    const client = useClient();
    const userId = getMessenger().engine.user.id;

    let hideOwnerLink = false;
    if (room.organization && room.organization.private && room.role === 'MEMBER') {
        hideOwnerLink = true;
    }

    const onInvitePress = React.useCallback(() => {
        if (!room.isPremium || room.role === 'OWNER') {
            Modals.showUserMuptiplePicker(
                router,
                {
                    title: 'Add',
                    action: async (users) => {
                        try {
                            await client.mutateRoomAddMembers({
                                invites: users.map((u) => ({
                                    userId: u.id,
                                    role: RoomMemberRole.MEMBER,
                                })),
                                roomId: room.id,
                            });
                            client.refetchRoomTiny({ id: room.id });
                        } catch (e) {
                            Alert.alert(e.message);
                        }
                        router.back();
                    },
                },
                room.isPremium ? 'Add people for free' : 'Add people',
                [],
                [userId],
                hideOwnerLink ? undefined : { path: 'ProfileGroupLink', pathParams: { room } },
            );
        } else {
            router.push('ProfileGroupLink', { room });
        }
    }, [room.id, userId]);

    const onLeavePress = React.useCallback(() => {
        Alert.builder()
            .title(`Leave ${room.isChannel ? 'channel' : 'group'}?`)
            .message(
                room.isPremium
                    ? 'Leaving the group only removes it from your chat list. To cancel the associated subscription, visit Subscriptions section in your Account tab and cancel it from there.'
                    : 'You may not be able to join it again',
            )
            .button('Cancel', 'cancel')
            .action('Leave', 'destructive', async () => {
                await client.mutateRoomLeave({ roomId: room.id });
                await client.refetchRoomChat({ id: room.id });
                setTimeout(() => {
                    router.pushAndResetRoot('Home');
                }, 100);
            })
            .show();
    }, [room.id]);

    return { onInvitePress, onLeavePress };
};

export const ConversationManageButton = React.memo((props: ConversationManageButtonProps) => {
    const { muted, onMutedChange, room, router } = props;
    const client = useClient();

    const onNotificationsPress = React.useCallback(() => {
        onMutedChange();

        client.mutateRoomSettingsUpdate({ roomId: room.id, settings: { mute: !muted } });
        client.refetchRoomTiny({ id: room.id });
    }, [muted, room.id]);
    const onSharedPress = React.useCallback(() => {
        router.push('SharedMedia', { chatId: room.id });
    }, [room.id]);

    const { onInvitePress, onLeavePress } = useSharedHandlers(
        room as RoomTiny_room_SharedRoom,
        router,
    );

    const onPress = React.useCallback(() => {
        const builder = new ActionSheetBuilder();
        const sharedRoom = room.__typename === 'SharedRoom' && room;
        let showInviteButton = sharedRoom;
        const onlyLinkInvite = sharedRoom && !(!sharedRoom.isPremium || sharedRoom.role === 'OWNER');

        if (sharedRoom && sharedRoom.organization && sharedRoom.organization.private && sharedRoom.role === 'MEMBER') {
            if (onlyLinkInvite) {
                showInviteButton = false;
            }
        }

        if (showInviteButton) {
            builder.action('Add people', onInvitePress, false, require('assets/ic-invite-24.png'));
        }

        const notificationsTitle = `${muted ? 'Unmute' : 'Mute'} notifications`;
        const notificationsIcon = muted
            ? require('assets/ic-notifications-24.png')
            : require('assets/ic-notifications-off-24.png');
        builder.action(notificationsTitle, onNotificationsPress, false, notificationsIcon);

        builder.action('Shared media', onSharedPress, false, require('assets/ic-attach-24.png'));

        if (sharedRoom) {
            if ((room as RoomTiny_room_SharedRoom).canEdit) {
                builder.action(
                    (room as RoomTiny_room_SharedRoom).isChannel ? 'Edit channel' : 'Edit group',
                    () => props.router.push('EditGroup', { id: room.id }),
                    false,
                    require('assets/ic-edit-24.png'),
                );
            }
        }

        if (sharedRoom) {
            builder.action('Leave group', onLeavePress, false, require('assets/ic-leave-24.png'));
        }

        builder.show();
    }, [muted, onNotificationsPress, onInvitePress, onLeavePress]);

    return <ZManageButton onPress={onPress} />;
});
