import * as React from 'react';
import { OrganizationMembers_organization_members, OrganizationWithoutMembers_organization } from 'openland-api/Types';
import { MessengerContext } from 'openland-engines/MessengerEngine';
import { UListItem } from 'openland-web/components/unicorn/UListItem';
import { showLeaveConfirmation } from 'openland-web/fragments/org/showLeaveConfirmation';

interface MemberManageMenu {
    organization: OrganizationWithoutMembers_organization;
    member: OrganizationMembers_organization_members;
}

export const MemberManageMenu = React.memo((props: MemberManageMenu) => {
    const { organization, member } = props;
    const { isOwner, isAdmin, isCommunity } = organization;
    const { user, role } = member;
    const messenger = React.useContext(MessengerContext);
    const myUserID = messenger.user.id;
    const canEdit = isOwner || isAdmin;
    const showButton = user.id === myUserID || canEdit;
    const typeString = isCommunity ? 'community' : 'organization';

    const handleRoleClick = React.useCallback((e: React.MouseEvent) => {
        e.preventDefault();
    }, []);

    const handleLeaveClick = React.useCallback((e: React.MouseEvent) => {
        e.preventDefault();

        showLeaveConfirmation(organization.id);
    }, []);

    const handleRemoveClick = React.useCallback((e: React.MouseEvent) => {
        e.preventDefault();
    }, []);

    if (!showButton) {
        return null;
    }

    return (
        <>
            {user.id !== myUserID && organization.isOwner && <UListItem title={role === 'MEMBER' ? 'Make Admin' : 'Remove as Admin'} onClick={handleRoleClick} />}
            {user.id === myUserID && <UListItem title={'Leave ' + typeString} onClick={handleLeaveClick} />}
            {user.id !== myUserID && canEdit && <UListItem title={'Remove from ' + typeString} onClick={handleRemoveClick} />}
        </>
    );
});