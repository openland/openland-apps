import * as React from 'react';
import { RoomFullWithoutMembers_SharedRoom, RoomMembersPaginated_members } from 'openland-api/Types';
import { UMoreButton } from 'openland-web/components/unicorn/templates/UMoreButton';
import StarIcon from 'openland-icons/s/ic-star-24.svg';
import LeaveIcon from 'openland-icons/s/ic-leave-24.svg';
import { showMakeFeaturedModal } from 'openland-web/fragments/account/components/modals';
import { MenuItem, UPopperMenuBuilder } from 'openland-web/components/unicorn/UPopperMenuBuilder';
import { AppConfig } from 'openland-y-runtime/AppConfig';
import { showLeaveChatConfirmation } from 'openland-web/fragments/account/components/groupProfileModals';
import { OpenlandClient } from 'openland-api/OpenlandClient';
import { useClient } from 'openland-web/utils/useClient';
import { UPopperController } from 'openland-web/components/unicorn/UPopper';
import { AlertBlanketBuilder } from 'openland-x/AlertBlanket';

interface MenuContentOpts {
    group: RoomFullWithoutMembers_SharedRoom;
    memberRef: React.MutableRefObject<RoomMembersPaginated_members>;
    client: OpenlandClient;
}

const getMenuContent = (opts: MenuContentOpts) => {
    const res: MenuItem[] = [];

    const { group, memberRef, client } = opts;
    const { id, isChannel } = group;
    const { user, badge, canKick } = memberRef.current;

    const typeString = isChannel ? 'channel' : 'group';

    if (AppConfig.isSuperAdmin()) {
        res.push({
            title: badge ? 'Edit featured status' : 'Make featured',
            icon: <StarIcon />,
            onClick: () => showMakeFeaturedModal(id, user.id)
        });
    }

    if (user.isYou) {
        res.push({
            title: `Leave ${typeString}`,
            icon: <LeaveIcon />,
            onClick: () => showLeaveChatConfirmation(client, id)
        });
    }

    if (!user.isYou && canKick) {
        res.push({
            title: `Remove from ${typeString}`,
            icon: <LeaveIcon />,
            onClick: () => {
                const builder = new AlertBlanketBuilder;

                builder.title(`Remove ${user.name} from ${group.title}`);
                builder.message(`Are you sure you want to remove ${user.firstName}? They will no longer be able to participate in the discussion.`);
                builder.action(`Remove`, async () => {
                    await client.mutateRoomKick({
                        userId: user.id,
                        roomId: group.id,
                    });

                    await client.refetchRoom({ id: group.id });
                }, 'danger');

                builder.show();
            }
        });
    }

    return res;
};

const MenuComponent = React.memo((props: { ctx: UPopperController, items: MenuItem[] }) => (
    new UPopperMenuBuilder().items(props.items).build(props.ctx)
));

interface GroupMemberMenuProps {
    group: RoomFullWithoutMembers_SharedRoom;
    member: RoomMembersPaginated_members;
}

export const GroupMemberMenu = React.memo((props: GroupMemberMenuProps) => {
    const client = useClient();
    const { group, member } = props;

    // Sorry universe
    const memberRef = React.useRef(member);
    memberRef.current = member;

    const menuContent = getMenuContent({ group, memberRef, client });

    if (menuContent.length <= 0) {
        return null;
    }

    return (
        <UMoreButton
            menu={ctx => (
                <MenuComponent
                    ctx={ctx}
                    items={getMenuContent({ group, memberRef, client })}
                />
            )}
        />
    );
});