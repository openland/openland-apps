import * as React from 'react';
import copy from 'copy-to-clipboard';

import { useTabRouter } from 'openland-unicorn/components/TabLayout';
import { RoomChat_room_SharedRoom } from 'openland-api/spacex.types';
import { UMoreButton } from 'openland-web/components/unicorn/templates/UMoreButton';
import { showRoomEditModal, showLeaveChatConfirmation } from 'openland-web/fragments/settings/components/groupProfileModals';
import { UPopperController } from 'openland-web/components/unicorn/UPopper';
import { UPopperMenuBuilder } from 'openland-web/components/unicorn/UPopperMenuBuilder';
import { useClient } from 'openland-api/useClient';
import { AlertBlanketBuilder } from 'openland-x/AlertBlanket';
import { useRole } from 'openland-x-permissions/XWithRole';
import { UNotificationsSwitchNew } from 'openland-web/components/unicorn/templates/UNotificationsSwitchNew';
import { useToast } from 'openland-web/components/unicorn/UToast';

import LeaveIcon from 'openland-icons/s/ic-leave-24.svg';
import SettingsIcon from 'openland-icons/s/ic-edit-24.svg';
import DeleteIcon from 'openland-icons/s/ic-delete-24.svg';
import CopyIcon from 'openland-icons/s/ic-link-24.svg';

interface GroupMenu {
    group: RoomChat_room_SharedRoom;
}

const MenuComponent = React.memo((props: GroupMenu & { ctx: UPopperController }) => {
    const tabRouter = useTabRouter();
    const toastHandlers = useToast();
    const client = useClient();
    const { ctx, group } = props;
    const { id, isChannel, settings, canEdit } = group;
    const typeString = isChannel ? 'channel' : 'group';
    const builder = new UPopperMenuBuilder();

    builder.element(() => <UNotificationsSwitchNew id={id} mute={!!settings.mute} marginLeft={16} />);

    builder.item({
        title: 'Copy link',
        icon: <CopyIcon />,
        onClick: () => {
            copy(`https://openland.com/group/${id}`, { format: 'text/plain' });

            toastHandlers.show({
                type: 'success',
                text: 'Link copied',
            });
        },
    });

    if (canEdit) {
        builder.item({
            title: isChannel ? 'Edit channel' : 'Edit group',
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
                group.kind === 'PUBLIC',
            ),
    });

    if (useRole('super-admin')) {
        builder.item({
            title: `Delete ${typeString}`,
            icon: <DeleteIcon />,
            onClick: () => {
                const alertBuilder = new AlertBlanketBuilder();

                alertBuilder.title(`Delete this ${typeString}?`);
                alertBuilder.message('Are you sure?');
                alertBuilder.action('Delete', async () => {
                    await client.mutateRoomDelete({ chatId: id });
                }, 'danger');
                alertBuilder.show();
            }
        });
    }

    return builder.build(ctx, 240);
});

export const GroupMenu = React.memo((props: GroupMenu) => (
    <UMoreButton
        horizontal={true}
        shape="square"
        filled={true}
        menu={(ctx) => <MenuComponent {...props} ctx={ctx} />}
    />
));
