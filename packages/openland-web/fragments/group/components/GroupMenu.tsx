import * as React from 'react';
import { useTabRouter } from 'openland-unicorn/components/TabLayout';
import { RoomChat_room_SharedRoom } from 'openland-api/spacex.types';
import { UMoreButton } from 'openland-web/components/unicorn/templates/UMoreButton';
import {
    showRoomEditModal,
    showLeaveChatConfirmation,
} from 'openland-web/fragments/account/components/groupProfileModals';
import AttachIcon from 'openland-icons/s/ic-attach-24-1.svg';
import SettingsIcon from 'openland-icons/s/ic-settings-24.svg';
import LeaveIcon from 'openland-icons/s/ic-leave-24.svg';
import { UPopperController } from 'openland-web/components/unicorn/UPopper';
import { UPopperMenuBuilder } from 'openland-web/components/unicorn/UPopperMenuBuilder';
import { useClient } from 'openland-api/useClient';

interface GroupMenu {
    group: RoomChat_room_SharedRoom;
}

const MenuComponent = React.memo((props: GroupMenu & { ctx: UPopperController }) => {
    const tabRouter = useTabRouter();
    const client = useClient();
    const { ctx, group } = props;
    const { id, isChannel, canEdit } = group;
    const typeString = isChannel ? 'channel' : 'group';
    const builder = new UPopperMenuBuilder();

    builder.item({
        title: 'Shared media',
        icon: <AttachIcon />,
        onClick: () => tabRouter.router.navigate(`/mail/${props.group.id}/shared`),
    });

    if (canEdit) {
        builder.item({
            title: isChannel ? 'Manage channel' : 'Manage group',
            icon: <SettingsIcon />,
            onClick: () => showRoomEditModal(id, isChannel),
        });
    }

    builder.item({
        title: `Leave ${typeString}`,
        icon: <LeaveIcon />,
        onClick: () =>
            showLeaveChatConfirmation(
                client,
                id,
                tabRouter,
                group.__typename === 'SharedRoom' && group.isPremium,
            ),
    });

    return builder.build(ctx, 240);
});

export const GroupMenu = React.memo((props: GroupMenu) => (
    <UMoreButton
        marginLeft={8}
        marginRight={-8}
        menu={(ctx) => <MenuComponent {...props} ctx={ctx} />}
    />
));
