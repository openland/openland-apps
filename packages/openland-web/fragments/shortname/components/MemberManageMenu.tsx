import * as React from 'react';
import { OrganizationMembers_organization_members, OrganizationWithoutMembers_organization, OrganizationMemberRole } from 'openland-api/Types';
import { UListItem } from 'openland-web/components/unicorn/UListItem';
import { UMoreButton } from 'openland-web/components/unicorn/templates/UMoreButton';
import { showRoleOrgMemberModal } from 'openland-web/fragments/account/components/OrganizationProfileComponent';
import StarIcon from 'openland-icons/s/ic-star-24.svg';
import LeaveIcon from 'openland-icons/s/ic-leave-24.svg';
import { AlertBlanketBuilder } from 'openland-x/AlertBlanket';
import { useClient } from 'openland-web/utils/useClient';
import { showLeaveConfirmation } from 'openland-web/fragments/org/showLeaveConfirmation';
import { MessengerContext } from 'openland-engines/MessengerEngine';

interface MemberManageMenu {
    organization: OrganizationWithoutMembers_organization;
    member: OrganizationMembers_organization_members;
    onRemove: (memberId: string) => void;
}

export const MemberManageMenu = React.memo((props: MemberManageMenu) => {
    const client = useClient();
    const messenger = React.useContext(MessengerContext);

    const { organization, member, onRemove } = props;
    const { id, name, isOwner, isAdmin, isCommunity } = organization;
    const { user, role } = member;

    const canEdit = isOwner || isAdmin;
    const typeString = isCommunity ? 'community' : 'organization';

    const canChangeRole = !user.isYou && isOwner;
    const canLeave = user.isYou && !isOwner;
    const canRemove = !user.isYou && canEdit && role !== OrganizationMemberRole.OWNER;
    const showButton = canChangeRole || canLeave || canRemove;

    const handleChangeRoleClick = React.useCallback((e: React.MouseEvent) => {
        e.preventDefault();

        showRoleOrgMemberModal({ orgName: name, orgId: id, member });
    }, []);

    const handleLeaveClick = React.useCallback((e: React.MouseEvent) => {
        e.preventDefault();

        showLeaveConfirmation(organization, messenger, onRemove);
    }, []);

    const handleRemoveClick = React.useCallback((e: React.MouseEvent) => {
        e.preventDefault();

        const builder = new AlertBlanketBuilder;

        builder.title(`Remove ${user.name} from ${name}`);
        builder.message(`Are you sure you want to remove ${user.name}? They will be removed from all internal chats at ${name}.`);
        builder.action(`Remove from ${typeString}`, async () => {
            await client.mutateOrganizationRemoveMember({
                memberId: member.user.id,
                organizationId: id,
            });

            onRemove(user.id);

            await client.refetchOrganization({ organizationId: id });
        }, 'danger');

        builder.show();
    }, []);

    if (!showButton) {
        return null;
    }

    return (
        <UMoreButton>
            {canChangeRole && <UListItem title={role === 'MEMBER' ? 'Make admin' : 'Revoke admin status'} icon={<StarIcon />} onClick={handleChangeRoleClick} />}
            {canLeave && <UListItem title={`Leave ${typeString}`} icon={<LeaveIcon />} onClick={handleLeaveClick} />}
            {canRemove && <UListItem title={`Remove from ${typeString}`} icon={<LeaveIcon />} onClick={handleRemoveClick} />}
        </UMoreButton>
    );
});