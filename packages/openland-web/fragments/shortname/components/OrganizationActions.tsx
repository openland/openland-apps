import * as React from 'react';
import copy from 'copy-to-clipboard';

import { Organization_organization } from 'openland-api/spacex.types';
import { showEditCommunityModal } from 'openland-web/fragments/settings/components/showEditCommunityModal';
import { XWithRole } from 'openland-x-permissions/XWithRole';
import { MessengerContext } from 'openland-engines/MessengerEngine';
import AlertBlanket from 'openland-x/AlertBlanket';
import { useClient } from 'openland-api/useClient';
import { useStackRouter } from 'openland-unicorn/components/StackRouter';
import { useToast } from 'openland-web/components/unicorn/UToast';
import { AlertBlanketBuilder } from 'openland-x/AlertBlanket';
import { MessengerEngine } from 'openland-engines/MessengerEngine';
import { UListItem } from 'openland-web/components/unicorn/UListItem';

import EditIcon from 'openland-icons/s/ic-edit-24.svg';
import LeaveIcon from 'openland-icons/s/ic-leave-24.svg';
import CopyIcon from 'openland-icons/s/ic-copy-24.svg';
import DeleteIcon from 'openland-icons/s/ic-delete-24.svg';

interface OrganizationMenuProps {
    organization: Organization_organization;
    onLeave: (id: string) => void;
}

export const showLeaveConfirmation = (organization: Organization_organization, messenger: MessengerEngine, onLeave: (id: string) => void) => {
    const { id, name, isCommunity } = organization;
    const client = messenger.client;
    const user = messenger.user;
    const typeString = isCommunity ? 'community' : 'organization';

    const builder = new AlertBlanketBuilder;

    builder.title(`Leave ${typeString}`);
    builder.message(`Are you sure you want to leave? You will lose access to all internal chats at ${name}. You can only join ${name} by invitation in the future.`);
    builder.action(`Leave`, async () => {
        await client.mutateOrganizationMemberRemove({
            userId: user.id,
            organizationId: id,
        });

        onLeave(user.id);

        await client.refetchMyOrganizations();
        await client.refetchMyCommunities();
        await client.refetchAccount();
    }, 'danger');

    builder.show();
};

export const OrganizationActions = React.memo((props: OrganizationMenuProps) => {
    const router = useStackRouter();
    const toastHandlers = useToast();

    const messenger = React.useContext(MessengerContext);
    const client = useClient();
    const { organization, onLeave } = props;
    const { id, name, isCommunity, isOwner, isAdmin, isMine, shortname } = organization;

    const typeString = isCommunity ? 'community' : 'organization';

    const onCopyLinkClick = React.useCallback(() => {
        copy(`https://openland.com/${shortname || id}`, { format: 'text/plain' });

        toastHandlers.show({
            type: 'success',
            text: 'Link copied',
        });
    }, [shortname, id]);

    const onEditClick = React.useCallback(() => {
        showEditCommunityModal(id, isCommunity, isOwner);
    }, [id, isCommunity, isOwner]);

    const onLeaveClick = React.useCallback(() => {
        showLeaveConfirmation(organization, messenger, onLeave);
    }, [organization, messenger, onLeave]);

    const onDeleteClick = React.useCallback(() => {
        AlertBlanket.builder()
            .title(`Delete ${name}`)
            .message(`Are you sure you want to delete ${name}? This cannot be undone.`)
            .action('Delete', async () => {
                await client.mutateDeleteOrganization({ organizationId: organization.id });
                await client.refetchAccountSettings();
                await client.refetchMyCommunities();

                router.pop();
            }, 'danger').show();
    }, [name]);

    return (
        <>
            <UListItem title="Copy link" useRadius={true} icon={<CopyIcon />} onClick={onCopyLinkClick}/>

            {(isOwner || isAdmin) && (
                <UListItem title="Edit" useRadius={true} icon={<EditIcon />} onClick={onEditClick}/>
            )}

            <XWithRole role="super-admin">
                <UListItem title="Super edit" path={`/super/orgs/${id}`} useRadius={true} icon={<EditIcon />} />
            </XWithRole>

            {isMine && <UListItem title={`Leave ${typeString}`} useRadius={true} icon={<LeaveIcon />} onClick={onLeaveClick}/>}

            {(isOwner || isAdmin) && (
                <UListItem title={`Delete ${typeString}`} useRadius={true} icon={<DeleteIcon />}  onClick={onDeleteClick}/>
            )}
        </>
    );
});