import * as React from 'react';
import copy from 'copy-to-clipboard';

import { User_user, User_conversation_SharedRoom, User_conversation_PrivateRoom } from 'openland-api/spacex.types';
import { UMoreButton } from 'openland-web/components/unicorn/templates/UMoreButton';

import { UPopperController } from 'openland-web/components/unicorn/UPopper';
import { UPopperMenuBuilder } from 'openland-web/components/unicorn/UPopperMenuBuilder';
import { useToast, UToastHandlers } from 'openland-web/components/unicorn/UToast';
import { MessengerContext } from 'openland-engines/MessengerEngine';
import { useRole } from 'openland-x-permissions/XWithRole';
import BlockUserModal from 'openland-web/fragments/admin/BlockUserModalFragment';
import { useClient } from 'openland-api/useClient';
import { UNotificationsSwitch } from 'openland-web/components/unicorn/templates/UNotificationsSwitch';
import { useLocalContact } from 'openland-y-utils/contacts/LocalContacts';
import { showModalBox } from 'openland-x/showModalBox';

import CopyIcon from 'openland-icons/s/ic-link-24.svg';
import RemoveContactIcon from 'openland-icons/s/ic-invite-off-24.svg';
import AddContactIcon from 'openland-icons/s/ic-invite-24.svg';
import SpamIcon from 'openland-icons/s/ic-flag-24.svg';
import DeleteIcon from 'openland-icons/s/ic-delete-24.svg';
import BookmarkIcon from 'openland-icons/s/ic-bookmark-24.svg';

import { ReportSpamModal } from './ReportSpamModal';

interface UserMenuProps {
    user: User_user;
    chat: User_conversation_SharedRoom | User_conversation_PrivateRoom | null;
    marginLeft?: number;
}

const MenuComponent = React.memo((props: UserMenuProps & { ctx: UPopperController, toastHandlers: UToastHandlers }) => {
    const engine = React.useContext(MessengerContext);
    const { ctx, user, chat, toastHandlers } = props;
    const { id, shortname, inContacts } = user;
    const builder = new UPopperMenuBuilder();
    const client = useClient();
    const [deleted, setDelete] = React.useState(false);
    const { isContact } = useLocalContact(id, inContacts);

    if (engine.user.id !== id && chat?.__typename === 'PrivateRoom') {
        builder.element(() =>
            <UNotificationsSwitch
                id={chat.id}
                mute={!!chat.settings.mute}
            />
        );
    }

    if (id !== engine.user.id) {
        builder.item({
            title: isContact ? 'Remove from contacts' : 'Add to contacts',
            icon: isContact ? <RemoveContactIcon /> : <AddContactIcon />,
            closeAfterAction: false,
            action: async () => {
                if (isContact) {
                    await client.mutateRemoveFromContacts({ userId: id });
                    toastHandlers.show({
                        type: 'success',
                        text: 'Removed from contacts',
                    });
                } else {
                    await client.mutateAddToContacts({ userId: id });
                    toastHandlers.show({
                        type: 'success',
                        text: 'Added to contacts',
                    });
                }
            },
        });
    }

    if (engine.user.id === id) {
        builder.item({
            title: 'Saved messages',
            icon: <BookmarkIcon />,
            path: `/mail/${id}`,
        });
    }

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

    if (id !== engine.user.id) {
        builder.item({
            title: 'Report',
            icon: <SpamIcon />,
            onClick: () => {
                showModalBox({ width: 400, title: 'Report' }, ({ hide }) => (
                    <ReportSpamModal userId={id} hide={hide} />
                ));
            }
        });
    }

    if (useRole('super-admin')) {
        builder.item({
            title: 'Delete user',
            icon: <DeleteIcon />,
            onClick: () => BlockUserModal(user.id, client, deleted, setDelete)
        });
    }

    return builder.build(ctx, 240);
});

export const UserMenu = React.memo((props: UserMenuProps) => {
    const toastHandlers = useToast();

    return (
        <UMoreButton
            horizontal={true}
            shape="square"
            filled={true}
            menu={ctx => <MenuComponent {...props} ctx={ctx} toastHandlers={toastHandlers} />}
        />
    );
});
