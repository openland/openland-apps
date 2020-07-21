import * as React from 'react';
import { User_user, User_conversation_SharedRoom, User_conversation_PrivateRoom } from 'openland-api/spacex.types';
import { UMoreButton } from 'openland-web/components/unicorn/templates/UMoreButton';
import copy from 'copy-to-clipboard';
import EditIcon from 'openland-icons/s/ic-edit-24.svg';
import CopyIcon from 'openland-icons/s/ic-link-24.svg';
import { UPopperController } from 'openland-web/components/unicorn/UPopper';
import { UPopperMenuBuilder } from 'openland-web/components/unicorn/UPopperMenuBuilder';
import { useToast, UToastHandlers } from 'openland-web/components/unicorn/UToast';
import AttachIcon from "../../../../openland-icons/s/ic-attach-24-1.svg";
import { MessengerContext } from 'openland-engines/MessengerEngine';
import { useRole } from 'openland-x-permissions/XWithRole';
import BlockUserModal from 'openland-web/fragments/admin/BlockUserModalFragment';
import { useClient } from 'openland-api/useClient';
import RemoveContactIcon from 'openland-icons/s/ic-invite-off-24.svg';
import AddContactIcon from 'openland-icons/s/ic-invite-24.svg';
import { useLocalContact } from 'openland-y-utils/contacts/LocalContacts';

interface UserMenuProps {
    user: User_user;
    chat: User_conversation_SharedRoom | User_conversation_PrivateRoom | null;
    marginLeft?: number;
}

const MenuComponent = React.memo((props: UserMenuProps & { ctx: UPopperController, toastHandlers: UToastHandlers }) => {
    const engine = React.useContext(MessengerContext);
    const { ctx, user, toastHandlers } = props;
    const { id, shortname, inContacts } = user;
    const builder = new UPopperMenuBuilder();
    const client = useClient();
    const [deleted, setDelete] = React.useState(false);
    const { isContact } = useLocalContact(id, inContacts);

    builder.item({
        title: 'Copy link',
        icon: <CopyIcon />,
        onClick: () => {
            copy(`https://openland.com/${shortname || id}`, { format: 'text/plain' });

            toastHandlers.show({
                type: 'success',
                text: 'Link copied',
            });
        },
    });

    if (props.chat && props.chat.__typename === 'PrivateRoom') {
        builder.item({
            title: 'Media, files, links',
            icon: <AttachIcon />,
            path: `/mail/${props.chat.id}/shared`,
        });
    }

    if (id !== engine.user.id) {
        builder.item({
            title: isContact ? 'Remove from contacts' : 'Save to contacts',
            icon: isContact ? <RemoveContactIcon /> : <AddContactIcon />,
            onClick: async () => {
                if (isContact) {
                    await client.mutateRemoveFromContacts({ userId: id });
                } else {
                    await client.mutateAddToContacts({ userId: id });
                }
            },
        });
    }

    if (engine.user.id === user.id) {
        builder.item({
            title: 'Edit profile',
            icon: <EditIcon />,
            path: '/settings/profile',
        });
    }

    if (useRole('super-admin')) {
        builder.item({
            title: 'Delete user',
            onClick: () => BlockUserModal(user.id, client, deleted, setDelete)
        });
    }

    return builder.build(ctx, 240);
});

export const UserMenu = React.memo((props: UserMenuProps) => {
    const toastHandlers = useToast();

    return (
        <UMoreButton
            marginLeft={typeof props.marginLeft === 'number' ? props.marginLeft : 8}
            marginRight={-8}
            menu={ctx => <MenuComponent {...props} ctx={ctx} toastHandlers={toastHandlers} />}
        />
    );
});
