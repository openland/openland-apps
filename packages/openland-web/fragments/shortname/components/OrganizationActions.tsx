import * as React from 'react';
import copy from 'copy-to-clipboard';
import { XView } from 'react-mental';
import { Organization_organization } from 'openland-api/spacex.types';
import { showEditCommunityModal } from 'openland-web/fragments/settings/components/showEditCommunityModal';
import { showSuperEditCommunityModal } from 'openland-web/fragments/settings/components/showSuperEditCommunityModal';
import { useRole } from 'openland-x-permissions/XWithRole';
import { MessengerContext } from 'openland-engines/MessengerEngine';
import AlertBlanket from 'openland-x/AlertBlanket';
import { useClient } from 'openland-api/useClient';
import { useStackRouter } from 'openland-unicorn/components/StackRouter';
import { useToast } from 'openland-web/components/unicorn/UToast';
import { AlertBlanketBuilder } from 'openland-x/AlertBlanket';
import { MessengerEngine } from 'openland-engines/MessengerEngine';
import { UListItem } from 'openland-web/components/unicorn/UListItem';
import { ProfileLayoutContext } from 'openland-web/components/ProfileLayout';
import { UMoreContainer } from 'openland-web/components/unicorn/UMoreContainer';
import EditIcon from 'openland-icons/s/ic-edit-24.svg';
import FlashlightIcon from 'openland-icons/s/ic-flashlight-24.svg';
import LeaveIcon from 'openland-icons/s/ic-leave-24.svg';
import CopyIcon from 'openland-icons/s/ic-link-24.svg';
import DeleteIcon from 'openland-icons/s/ic-delete-24.svg';
import UserIcon from 'openland-icons/s/ic-user-24.svg';
import { OrganizationMenu } from './OrganizationMenu';

interface OrganizationMenuProps {
    organization: Organization_organization;
    onLeave: (id: string) => void;
}

export const showLeaveConfirmation = (
    organization: Organization_organization,
    messenger: MessengerEngine,
    onLeave: (id: string) => void,
) => {
    const { id, name, isCommunity } = organization;
    const client = messenger.client;
    const user = messenger.user;
    const typeString = isCommunity ? 'community' : 'organization';

    const builder = new AlertBlanketBuilder();

    builder.title(`Leave ${typeString}`);
    builder.message(
        `Are you sure you want to leave? You will lose access to all internal chats at ${name}. You can only join ${name} by invitation in the future.`,
    );
    builder.action(
        `Leave`,
        async () => {
            await client.mutateOrganizationMemberRemove({
                userId: user.id,
                organizationId: id,
            });

            onLeave(user.id);

            await client.refetchMyOrganizations();
            await client.refetchMyCommunities();
            await client.refetchAccount();
        },
        'danger',
    );

    builder.show();
};

export const OrganizationActions = React.memo(
    ({ organization, onLeave }: OrganizationMenuProps) => {
        const { compactView } = React.useContext(ProfileLayoutContext);

        if (compactView) {
            return <OrganizationMenu organization={organization} onLeave={onLeave} />;
        }

        const router = useStackRouter();
        const toastHandlers = useToast();

        const messenger = React.useContext(MessengerContext);
        const client = useClient();
        const { id, name, isCommunity, isOwner, isAdmin, isMine, shortname } = organization;

        const typeString = isCommunity ? 'community' : 'organization';

        const isSuperAdmin = useRole('super-admin');

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

        const onSuperEditClick = React.useCallback(() => {
            showSuperEditCommunityModal(id, isCommunity);
        }, [id]);

        const onLeaveClick = React.useCallback(() => {
            showLeaveConfirmation(organization, messenger, onLeave);
        }, [organization, messenger, onLeave]);

        const onDeleteClick = React.useCallback(() => {
            AlertBlanket.builder()
                .title(`Delete ${name}`)
                .message(`Are you sure you want to delete ${name}? This cannot be undone.`)
                .action(
                    'Delete',
                    async () => {
                        await client.mutateDeleteOrganization({ organizationId: organization.id });
                        await client.refetchAccountSettings();
                        await client.refetchMyCommunities();

                        router.pop();
                    },
                    'danger',
                )
                .show();
        }, [name]);

        const onExportUsersClick = React.useCallback(async () => {
            await client.mutateOrganizationRequestMembersExport({ organizationId: id });
            toastHandlers.show({
                type: 'success',
                text: 'Data will be sent to you in a message'
            });
        }, [id]);

        return (
            <XView marginTop={16} marginHorizontal={-16}>
                <UListItem
                    title="Copy link"
                    useRadius={true}
                    icon={<CopyIcon />}
                    onClick={onCopyLinkClick}
                />

                {(isOwner || isAdmin) && (
                    <UListItem
                        title="Edit"
                        useRadius={true}
                        icon={<EditIcon />}
                        onClick={onEditClick}
                    />
                )}

                {isMine && !isOwner && (
                    <UListItem
                        title={`Leave ${typeString}`}
                        useRadius={true}
                        icon={<LeaveIcon />}
                        onClick={onLeaveClick}
                    />
                )}

                {(isOwner || isAdmin) && (
                    <UListItem
                        title={`Delete ${typeString}`}
                        useRadius={true}
                        icon={<DeleteIcon />}
                        onClick={onDeleteClick}
                    />
                )}

                {(isSuperAdmin || (id === '3YgM91xQP1sa3ea5mxxVTwRkJg' && (isOwner || isAdmin))) && (
                    <UMoreContainer>
                        {id === '3YgM91xQP1sa3ea5mxxVTwRkJg' && (
                            <UListItem
                                title="Export users"
                                useRadius={true}
                                icon={<UserIcon />}
                                onClick={onExportUsersClick}
                            />
                        )}
                        {isSuperAdmin && (
                            <UListItem
                                title="Super edit"
                                useRadius={true}
                                icon={<FlashlightIcon />}
                                onClick={onSuperEditClick}
                            />
                        )}
                    </UMoreContainer>
                )}
            </XView>
        );
    },
);
