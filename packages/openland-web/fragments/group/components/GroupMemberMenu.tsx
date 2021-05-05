import * as React from 'react';
import {
    RoomChat_room_SharedRoom,
    RoomMembersPaginated_members,
    RoomMemberRole,
} from 'openland-api/spacex.types';
import { UMoreButton } from 'openland-web/components/unicorn/templates/UMoreButton';
import LeaveIcon from 'openland-icons/s/ic-leave-24.svg';
import CrownIcon from 'openland-icons/s/ic-pro-24.svg';
import { MenuItem, UPopperMenuBuilder } from 'openland-web/components/unicorn/UPopperMenuBuilder';
import { AppConfig } from 'openland-y-runtime/AppConfig';
import { showLeaveChatConfirmation } from 'openland-web/fragments/settings/components/groupProfileModals';
import { OpenlandClient } from 'openland-api/spacex';
import { useClient } from 'openland-api/useClient';
import { UPopperController } from 'openland-web/components/unicorn/UPopper';
import { AlertBlanketBuilder } from 'openland-x/AlertBlanket';
import { useTabRouter, TabRouterContextProps } from 'openland-unicorn/components/TabLayout';
import { MessengerContext } from 'openland-engines/MessengerEngine';

interface GroupMemberMenuProps {
    group: RoomChat_room_SharedRoom;
    member: RoomMembersPaginated_members;
    onRemove: (memberId: string) => void;
    updateUserRole: (uid: string, role: RoomMemberRole) => void;
}

const getMenuContent = (
    opts: GroupMemberMenuProps & { client: OpenlandClient; tabRouter: TabRouterContextProps },
) => {
    const engine = React.useContext(MessengerContext);
    const res: MenuItem[] = [];
    const { group, member, onRemove, client, tabRouter } = opts;
    const { id, isChannel } = group;
    const { user, canKick } = member;

    const typeString = isChannel ? 'channel' : 'group';

    if ((group.role === 'OWNER' || group.role === 'ADMIN' || AppConfig.isSuperAdmin()) && user.id !== engine.user.id && member.role !== 'OWNER' ) {
        res.push({
            title: member.role === 'ADMIN' ? 'Revoke admin status' : 'Make admin',
            icon: <CrownIcon />,
            action: async () => {
                await client.mutateRoomChangeRole({
                    userId: user.id,
                    roomId: id,
                    newRole: member.role === 'ADMIN' ? RoomMemberRole.MEMBER : RoomMemberRole.ADMIN,
                });
                opts.updateUserRole(
                    user.id,
                    member.role === 'ADMIN' ? RoomMemberRole.MEMBER : RoomMemberRole.ADMIN,
                );
            },
        });
    }

    if (user.id === engine.user.id) {
        res.push({
            title: `Leave ${typeString}`,
            icon: <LeaveIcon />,
            onClick: () =>
                showLeaveChatConfirmation(
                    client,
                    id,
                    tabRouter,
                    group.__typename === 'SharedRoom' && group.isPremium,
                    group.kind === 'PUBLIC',
                    group.isChannel
                ),
        });
    }

    if (user.id !== engine.user.id && canKick) {
        res.push({
            title: `Remove from ${typeString}`,
            icon: <LeaveIcon />,
            onClick: () => {
                const builder = new AlertBlanketBuilder();

                builder.title(`Remove ${user.name} from ${group.title}`);
                builder.message(
                    `Are you sure you want to remove ${user.firstName}? They will no longer be able to participate in the discussion.`,
                );
                builder.action(
                    `Remove`,
                    async () => {
                        await client.mutateRoomKick({
                            userId: user.id,
                            roomId: group.id,
                        });

                        await client.refetchRoomChat({ id: group.id });
                        onRemove(user.id);
                    },
                    'danger',
                );

                builder.show();
            },
        });
    }

    return res;
};

const MenuComponent = React.memo((props: { ctx: UPopperController; items: MenuItem[] }) =>
    new UPopperMenuBuilder().items(props.items).build(props.ctx),
);

export const GroupMemberMenu = React.memo((props: GroupMemberMenuProps) => {
    const client = useClient();
    const tabRouter = useTabRouter();
    const menuContent = getMenuContent({ ...props, client, tabRouter });

    if (menuContent.length <= 0) {
        return null;
    }

    return <UMoreButton menu={(ctx) => <MenuComponent ctx={ctx} items={menuContent} />} />;
});
