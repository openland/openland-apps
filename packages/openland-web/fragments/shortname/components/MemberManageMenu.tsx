import * as React from 'react';
import { OrganizationMembers_organization_members, OrganizationWithoutMembers_organization, OrganizationMemberRole } from 'openland-api/Types';
import { MessengerContext } from 'openland-engines/MessengerEngine';
import { UListItem } from 'openland-web/components/unicorn/UListItem';
import { UMoreButton } from 'openland-web/components/unicorn/templates/UMoreButton';
import { showRoleOrgMemberModal, showRemoveOrgMemberModal } from 'openland-web/fragments/account/components/OrganizationProfileComponent';
import { showLeaveOrganizationModal } from 'openland-web/fragments/account/components/modals';
import StarIcon from 'openland-icons/s/ic-star-24.svg';
import LeaveIcon from 'openland-icons/s/ic-leave-24.svg';

interface MemberManageMenu {
    organization: OrganizationWithoutMembers_organization;
    member: OrganizationMembers_organization_members;
}

export const MemberManageMenu = React.memo((props: MemberManageMenu) => {
    const { organization, member } = props;
    const { id, name, isOwner, isAdmin, isCommunity } = organization;
    const { user, role } = member;

    const messenger = React.useContext(MessengerContext);
    const myUserID = messenger.user.id;
    const canEdit = isOwner || isAdmin;
    const typeString = isCommunity ? 'community' : 'organization';

    const canChangeRole = user.id !== myUserID && isOwner;
    const canLeave = user.id === myUserID && !isOwner;
    const canRemove = user.id !== myUserID && canEdit && role !== OrganizationMemberRole.OWNER;
    const showButton = canChangeRole || canLeave || canRemove;

    const handleChangeRoleClick = React.useCallback((e: React.MouseEvent) => {
        e.preventDefault();

        showRoleOrgMemberModal({ orgName: name, orgId: id, member });
    }, []);

    const handleLeaveClick = React.useCallback((e: React.MouseEvent) => {
        e.preventDefault();

        showLeaveOrganizationModal(id);
    }, []);

    const handleRemoveClick = React.useCallback((e: React.MouseEvent) => {
        e.preventDefault();

        showRemoveOrgMemberModal({ orgName: name, orgId: id, member });
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