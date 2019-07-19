import * as React from 'react';
import { XView } from 'react-mental';
import { MessengerContext } from 'openland-engines/MessengerEngine';
import { XWithRole } from 'openland-x-permissions/XWithRole';
import { XMenuItemSeparator, XMenuItem } from 'openland-x/XMenuItem';
import { AdminTools } from 'openland-web/fragments/account/components/RoomProfileComponent';
import { XOverflow } from 'openland-web/components/XOverflow';
import { RoomHeader_room, RoomHeader_room_SharedRoom } from 'openland-api/Types';
import { checkCanSeeAdvancedSettings } from 'openland-y-utils/checkCanSeeAdvancedSettings';
import { XLoader } from 'openland-x/XLoader';
import { showModalBox } from 'openland-x/showModalBox';
import { LeaveChatComponent } from 'openland-web/fragments/chat/components/MessengerRootComponent';
import { RoomEditModalBody } from 'openland-web/fragments/chat/RoomEditModal';
import { AddMembersModal, showAddMembersModal } from 'openland-web/fragments/chat/AddMembersModal';
import { AdvancedSettingsModal, showAdvancedSettingsModal } from '../AdvancedSettingsModal';
import InviteIcon from 'openland-icons/ic-invite-members.svg';
import NotificationIcon from 'openland-icons/ic-notification.svg';
import NotificationOffIcon from 'openland-icons/ic-notification-off.svg';
import LeaveIcon from 'openland-icons/ic-leave-group.svg';
import DiscoverIcon from 'openland-icons/discover_icon.svg';
import Callicon from 'openland-icons/ic-call.svg';
import { useClient } from 'openland-web/utils/useClient';

const MenuItem = (props: { children: any }) => (
    <XView
        height={48}
        flexDirection="row"
        alignItems="center"
        fontSize={15}
        lineHeight="24px"
        hoverBackgroundColor="#F0F2F5"
    >
        {props.children}
    </XView>
);

class NotificationSettingsComponent extends React.Component<
    { mutation: any; settings: { mute: boolean | null }; roomId: string },
    { settings: { mute: boolean } }
> {
    handleClick = () => {
        let value = !this.props.settings.mute;

        this.props.mutation({
            variables: {
                settings: {
                    mute: value,
                },
                roomId: this.props.roomId,
            },
        });
    }

    render() {
        const { mute } = this.props.settings;
        return (
            <XMenuItem
                icon={mute ? <NotificationOffIcon /> : <NotificationIcon />}
                customContent
                onClick={this.handleClick}
            >
                <MenuItem>{mute ? 'Unmute notifications' : 'Mute notifications'}</MenuItem>
            </XMenuItem>
        );
    }
}

export const HeaderMuteButton = (props: { settings: { mute: boolean | null }; roomId: string }) => {
    const client = useClient();

    const update = async ({ variables }: { variables: any }) => {
        await client.mutateRoomSettingsUpdate(variables);
    };
    return (
        <NotificationSettingsComponent
            mutation={update}
            settings={props.settings}
            roomId={props.roomId}
        />
    );
};

export const HeaderMenu = ({ room }: { room: RoomHeader_room }) => {
    const sharedRoom =
        room.__typename === 'SharedRoom' ? (room as RoomHeader_room_SharedRoom) : null;

    let canSeeAdvancedSettings = undefined;
    let canEdit = undefined;
    let modals = undefined;
    const { id } = room;
    const isChannel = !!(sharedRoom && sharedRoom.isChannel);

    if (sharedRoom) {
        canEdit = sharedRoom.canEdit;
        canSeeAdvancedSettings = checkCanSeeAdvancedSettings({ chat: sharedRoom });
    }
    const menuItems = (
        <React.Suspense fallback={<XLoader loading={true} />}>
            {sharedRoom && (
                <XMenuItem
                    icon={<InviteIcon />}
                    onClick={() =>
                        showAddMembersModal({
                            id: room.id,
                            isRoom: true,
                            isOrganization: false,
                            isChannel: isChannel,
                        })
                    }
                    customContent
                >
                    <MenuItem>Invite friends</MenuItem>
                </XMenuItem>
            )}
            <HeaderMuteButton settings={room.settings} roomId={room.id} />
            {sharedRoom && (
                <>
                    <XMenuItem
                        icon={<LeaveIcon />}
                        customContent
                        onClick={() =>
                            showModalBox({ title: 'Leave chat' }, ctx => (
                                <LeaveChatComponent id={id} ctx={ctx} />
                            ))
                        }
                    >
                        <MenuItem>{isChannel ? 'Leave channel' : 'Leave group'}</MenuItem>
                    </XMenuItem>
                    <XWithRole role="super-admin" or={canEdit}>
                        <XMenuItem
                            icon={<DiscoverIcon />}
                            customContent
                            onClick={() =>
                                showModalBox(
                                    { title: isChannel ? 'Channel settings' : 'Group settings' },
                                    ctx => (
                                        <RoomEditModalBody
                                            roomId={id}
                                            title={sharedRoom.title}
                                            photo={sharedRoom.photo}
                                            description={sharedRoom.description}
                                            socialImage={sharedRoom.socialImage}
                                            isChannel={sharedRoom.isChannel}
                                            onClose={ctx.hide}
                                        />
                                    ),
                                )
                            }
                        >
                            <MenuItem>Settings</MenuItem>
                        </XMenuItem>
                    </XWithRole>
                    <XWithRole role="super-admin" or={canSeeAdvancedSettings}>
                        <XMenuItem
                            icon={<DiscoverIcon />}
                            customContent
                            onClick={() => showAdvancedSettingsModal(sharedRoom.id)}
                        >
                            <MenuItem>Advanced settings</MenuItem>
                        </XMenuItem>
                    </XWithRole>
                    <XWithRole role="super-admin">
                        <XMenuItemSeparator />
                        <AdminTools id={id} variables={{ id }} />
                    </XWithRole>
                </>
            )}
        </React.Suspense>
    );
    return (
        <>
            <XOverflow placement="bottom-end" width={240} content={menuItems} horizontal rounded />
        </>
    );
};

export const CallButton = ({ room }: { room: RoomHeader_room }) => {
    let calls = React.useContext(MessengerContext).calls;
    let callsState = calls.useState();

    return callsState.conversationId !== room.id ? (
        <XView
            width={32}
            height={32}
            cursor="pointer"
            flexDirection="row"
            alignItems="center"
            justifyContent="center"
            borderRadius={32}
            hoverBackgroundColor="#F0F2F5"
            onClick={() => calls.joinCall(room.id, room.__typename === 'PrivateRoom')}
        >
            <Callicon />
        </XView>
    ) : null;
};
