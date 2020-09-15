import * as React from 'react';
import copy from 'copy-to-clipboard';
import { XView } from 'react-mental';

import { User_user, User_conversation_SharedRoom, User_conversation_PrivateRoom } from 'openland-api/spacex.types';

import { useToast } from 'openland-web/components/unicorn/UToast';
import { MessengerContext } from 'openland-engines/MessengerEngine';
import { XWithRole } from 'openland-x-permissions/XWithRole';
import BlockUserModal from 'openland-web/fragments/admin/BlockUserModalFragment';
import { useClient } from 'openland-api/useClient';
import { ProfileLayoutContext } from 'openland-web/components/ProfileLayout';
import { useLocalContact } from 'openland-y-utils/contacts/LocalContacts';
import { UListItem } from 'openland-web/components/unicorn/UListItem';
import { UNotificationsSwitchNew } from 'openland-web/components/unicorn/templates/UNotificationsSwitchNew';

import CopyIcon from 'openland-icons/s/ic-link-24.svg';
import SpamIcon from 'openland-icons/s/ic-flag.svg';
import RemoveContactIcon from 'openland-icons/s/ic-invite-off-24.svg';
import AddContactIcon from 'openland-icons/s/ic-invite-24.svg';
import DeleteIcon from 'openland-icons/s/ic-delete-24.svg';
import BookmarkIcon from 'openland-icons/s/ic-bookmark-24.svg';

import { UserMenu } from './UserMenu';

interface UserMenuProps {
    user: User_user;
    chat: User_conversation_SharedRoom | User_conversation_PrivateRoom | null;
}

export const UserActions = React.memo(({ user, chat }: UserMenuProps) => {
    const { compactView } = React.useContext(ProfileLayoutContext);

    if (compactView) {
        return  <UserMenu chat={chat} user={user} />;
    }

    const toastHandlers = useToast();
    const engine = React.useContext(MessengerContext);
    const client = useClient();
    const [deleted, setDelete] = React.useState(false);
    const { id, shortname, inContacts } = user;
    const { isContact } = useLocalContact(id, inContacts);

    const onCopyLinkClick = React.useCallback(() => {
        copy(`https://openland.com/${shortname || id}`, { format: 'text/plain' });

        toastHandlers.show({
            type: 'success',
            text: 'Link copied',
        });
    }, [shortname, id]);

    const onAddContactClick = React.useCallback(async () => {
        await client.mutateAddToContacts({ userId: id });
        toastHandlers.show({
            type: 'success',
            text: 'Added to contacts',
        });
    }, [id]);

    const onRemoveFromContactsClick = React.useCallback(async () => {
        await client.mutateRemoveFromContacts({ userId: id });
        toastHandlers.show({
            type: 'success',
            text: 'Removed from contacts',
        });
    }, [id]);

    const onDeleteUserClick = React.useCallback(() => {
        BlockUserModal(user.id, client, deleted, setDelete);
    }, [user.id, client, deleted, setDelete]);

    const userInContacts = id !== engine.user.id && isContact;
    const userNotInContacts = id !== engine.user.id && !isContact;
    const isMe = engine.user.id === user.id;

    return (
        <XView marginTop={16} marginHorizontal={-16}>
            {engine.user.id !== id && chat && chat.__typename === 'PrivateRoom' && (
                <UNotificationsSwitchNew
                    id={chat.id}
                    mute={!!chat.settings.mute}
                />
            )}

            {userInContacts && (
                <UListItem title="Remove from contacts" useRadius={true} icon={<RemoveContactIcon />} onClick={onRemoveFromContactsClick}/>
            )}

            {userNotInContacts && (
                <UListItem title="Add to contacts" useRadius={true} icon={<AddContactIcon />} onClick={onAddContactClick}/>
            )}

            {isMe && <UListItem title="Saved messages" useRadius={true} path={`/mail/${id}`} icon={<BookmarkIcon />}/>}
            <UListItem title="Copy link" useRadius={true} icon={<CopyIcon />} onClick={onCopyLinkClick}/>
            {!isMe && <UListItem title="Report spam" useRadius={true} icon={<SpamIcon />}/>}
            <XWithRole role="super-admin">
                <UListItem title="Delete user" useRadius={true} onClick={onDeleteUserClick} icon={<DeleteIcon />}/>
            </XWithRole>
        </XView>
    );
});