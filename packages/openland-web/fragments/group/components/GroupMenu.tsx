import * as React from 'react';
import { RoomFullWithoutMembers_SharedRoom } from 'openland-api/Types';
import { UMoreButton } from 'openland-web/components/unicorn/templates/UMoreButton';
import { showRoomEditModal, showLeaveChatConfirmation } from 'openland-web/fragments/account/components/groupProfileModals';
import { showAdvancedSettingsModal } from 'openland-web/fragments/chat/AdvancedSettingsModal';
import SettingsIcon from 'openland-icons/s/ic-settings-24.svg';
import StarIcon from 'openland-icons/s/ic-star-24.svg';
import LeaveIcon from 'openland-icons/s/ic-leave-24.svg';
import { UPopperController } from 'openland-web/components/unicorn/UPopper';
import { UPopperMenuBuilder } from 'openland-web/components/unicorn/UPopperMenuBuilder';
import { useClient } from 'openland-web/utils/useClient';

interface GroupMenu {
    group: RoomFullWithoutMembers_SharedRoom;
}

const MenuComponent = React.memo((props: GroupMenu & { ctx: UPopperController }) => {
    const client = useClient();
    const { ctx, group } = props;
    const { id, canEdit, role, organization, isChannel } = group;
    const typeString = isChannel ? 'channel' : 'group';
    const builder = new UPopperMenuBuilder();

    if (canEdit) {
        builder.item({
            title: 'Settings',
            icon: <SettingsIcon />,
            onClick: () => showRoomEditModal(id)
        });
    }

    if (role === 'OWNER' || role === 'ADMIN' || (organization && (organization.isAdmin || organization.isOwner))) {
        builder.item({
            title: 'Advanced settings',
            icon: <StarIcon />,
            onClick: () => showAdvancedSettingsModal(id)
        });
    }

    builder.item({
        title: `Leave ${typeString}`,
        icon: <LeaveIcon />,
        onClick: () => showLeaveChatConfirmation(client, id)
    });

    return builder.build(ctx);
});

export const GroupMenu = React.memo((props: GroupMenu) => (
    <UMoreButton
        marginLeft={8}
        marginRight={-8}
        menu={ctx => <MenuComponent {...props} ctx={ctx} />}
    />
));