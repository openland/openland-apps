import * as React from 'react';
import copy from 'copy-to-clipboard';
import { XView } from 'react-mental';

import {
    User_user,
    User_conversation_SharedRoom,
    User_conversation_PrivateRoom,
} from 'openland-api/spacex.types';

import { useToast } from 'openland-web/components/unicorn/UToast';
import { MessengerContext } from 'openland-engines/MessengerEngine';
import { XWithRole } from 'openland-x-permissions/XWithRole';
import BlockUserModal from 'openland-web/fragments/admin/BlockUserModalFragment';
import { useClient } from 'openland-api/useClient';
import { ProfileLayoutContext } from 'openland-web/components/ProfileLayout';
import { useLocalContact } from 'openland-y-utils/contacts/LocalContacts';
import { useUserBanInfo } from 'openland-y-utils/blacklist/LocalBlackList';
import { UListItem } from 'openland-web/components/unicorn/UListItem';
import { UNotificationsSwitch } from 'openland-web/components/unicorn/templates/UNotificationsSwitch';
import { UMoreContainer } from 'openland-web/components/unicorn/UMoreContainer';
import { showModalBox } from 'openland-x/showModalBox';

import CopyIcon from 'openland-icons/s/ic-link-24.svg';
import SpamIcon from 'openland-icons/s/ic-flag-24.svg';
import RemoveContactIcon from 'openland-icons/s/ic-invite-off-24.svg';
import AddContactIcon from 'openland-icons/s/ic-invite-24.svg';
import DeleteIcon from 'openland-icons/s/ic-delete-24.svg';
import BookmarkIcon from 'openland-icons/s/ic-bookmark-24.svg';
import BlockIcon from 'openland-icons/s/ic-block-24.svg';
import UnBlockIcon from 'openland-icons/s/ic-unblock-24.svg';

import { UserMenu } from './UserMenu';
import { ReportSpamModal } from './ReportSpamModal';

interface UserMenuProps {
    user: User_user;
    chat: User_conversation_SharedRoom | User_conversation_PrivateRoom | null;
}

export const UserActions = React.memo(({ user, chat }: UserMenuProps) => {
    const { compactView } = React.useContext(ProfileLayoutContext);

    const { isBanned } = useUserBanInfo(user.id, user.isBanned, user.isMeBanned);

    if (compactView) {
        return <UserMenu chat={chat} user={user} />;
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

    const onBannedClick = React.useCallback(async () => {
        if (isBanned) {
            await client.mutateUnBanUser({ id: id });
        } else {
            await client.mutateBanUser({ id: id });
        }
    }, [id, isBanned]);

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

    const onReportSpamClick = React.useCallback(() => {
        showModalBox({ width: 400, title: 'Report' }, (ctx) => (
            <ReportSpamModal userId={id} hide={ctx.hide} />
        ));
    }, [id]);

    const userInContacts = id !== engine.user.id && isContact;
    const userNotInContacts = id !== engine.user.id && !isContact;
    const isMe = engine.user.id === user.id;

    return (
        <XView marginTop={16} marginHorizontal={-16}>
            {engine.user.id !== id && chat && chat.__typename === 'PrivateRoom' && (
                <UNotificationsSwitch id={chat.id} mute={!!chat.settings.mute} />
            )}

            {userInContacts && (
                <UListItem
                    title="Remove from contacts"
                    useRadius={true}
                    icon={<RemoveContactIcon />}
                    onClick={onRemoveFromContactsClick}
                />
            )}

            {userNotInContacts && (
                <UListItem
                    title="Add to contacts"
                    useRadius={true}
                    icon={<AddContactIcon />}
                    onClick={onAddContactClick}
                />
            )}

            {isMe && (
                <UListItem
                    title="Saved messages"
                    useRadius={true}
                    path={`/mail/${id}`}
                    icon={<BookmarkIcon />}
                />
            )}

            <UMoreContainer>
                <UListItem
                    title="Copy link"
                    useRadius={true}
                    icon={<CopyIcon />}
                    onClick={onCopyLinkClick}
                />
                {!isMe && (
                    <UListItem
                        title={isBanned ? 'Unblock person' : 'Block person'}
                        useRadius={true}
                        onClick={onBannedClick}
                        icon={isBanned ? <UnBlockIcon /> : <BlockIcon />}
                    />
                )}
                {!isMe && (
                    <UListItem
                        title="Report"
                        useRadius={true}
                        icon={<SpamIcon />}
                        onClick={onReportSpamClick}
                    />
                )}
                <XWithRole role="super-admin">
                    <UListItem
                        title="Delete user"
                        useRadius={true}
                        onClick={onDeleteUserClick}
                        icon={<DeleteIcon />}
                    />
                </XWithRole>
            </UMoreContainer>
        </XView>
    );
});
