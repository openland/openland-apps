import * as React from 'react';
import { User_user, User_conversation_SharedRoom, User_conversation_PrivateRoom } from 'openland-api/spacex.types';
import copy from 'copy-to-clipboard';
import EditIcon from 'openland-icons/s/ic-edit-24.svg';
import CopyIcon from 'openland-icons/s/ic-link-24.svg';
import SpamIcon from 'openland-icons/s/ic-flag.svg';
import { useToast } from 'openland-web/components/unicorn/UToast';
import { MessengerContext } from 'openland-engines/MessengerEngine';
import { XWithRole } from 'openland-x-permissions/XWithRole';
import BlockUserModal from 'openland-web/fragments/admin/BlockUserModalFragment';
import { useClient } from 'openland-api/useClient';
import RemoveContactIcon from 'openland-icons/s/ic-invite-off-24.svg';
import AddContactIcon from 'openland-icons/s/ic-invite-24.svg';
import { useLocalContact } from 'openland-y-utils/contacts/LocalContacts';
import { UListItem } from 'openland-web/components/unicorn/UListItem';

interface UserMenuProps {
    user: User_user;
    chat: User_conversation_SharedRoom | User_conversation_PrivateRoom | null;
}

export const UserMenuNew = React.memo(({ user }: UserMenuProps) => {
    const toastHandlers = useToast();
    const engine = React.useContext(MessengerContext);
    const client = useClient();
    const [deleted, setDelete] = React.useState(false);
    const { id, shortname, inContacts } = user;
    const { isContact } = useLocalContact(id, inContacts);

    const onCopyLinkClick = () => {
        copy(`https://openland.com/${shortname || id}`, { format: 'text/plain' });

        toastHandlers.show({
            type: 'success',
            text: 'Link copied',
        });
    };

    const onAddContactClick = async () => {
        await client.mutateAddToContacts({ userId: id });
        toastHandlers.show({
            type: 'success',
            text: 'Added to contacts',
        });
    };

    const onRemoveFromContactsClick = async () => {
        await client.mutateRemoveFromContacts({ userId: id });
        toastHandlers.show({
            type: 'success',
            text: 'Removed from contacts',
        });
    };

    const userInContacts = id !== engine.user.id && isContact;
    const userNotInContacts = id !== engine.user.id && !isContact;
    const isMe = engine.user.id === user.id;

    return (
        <>
            <UListItem title="Copy link" useRadius={true} icon={<CopyIcon />} onClick={onCopyLinkClick}/>

            {userInContacts && (
                <UListItem title="Remove from contacts" useRadius={true} icon={<RemoveContactIcon />} onClick={onRemoveFromContactsClick}/>
            )}

            {userNotInContacts && (
                <UListItem title="Add to contacts" useRadius={true} icon={<AddContactIcon />} onClick={onAddContactClick}/>
            )}

            {isMe && (
                <UListItem title="Edit profile" path="/settings/profile" useRadius={true} icon={<EditIcon />} />
            )}

            <UListItem title="Report Spam" useRadius={true} icon={<SpamIcon />}/>

            <XWithRole role="super-admin">
                <UListItem title="Delete user" useRadius={true} onClick={() => BlockUserModal(user.id, client, deleted, setDelete)}/>
            </XWithRole>
        </>
    );
});
