import * as React from 'react';
import { OrganizationWithoutMembers_organization } from 'openland-api/Types';
import { UMoreButton } from 'openland-web/components/unicorn/templates/UMoreButton';
import { UListItem } from 'openland-web/components/unicorn/UListItem';
import { showLeaveConfirmation } from 'openland-web/fragments/org/showLeaveConfirmation';
import { showEditCommunityModal } from 'openland-web/fragments/account/components/EditCommunityModal';
import { showDeleteOrganizationModal } from 'openland-web/fragments/account/components/modals';

export const OrganizationManageButtons = React.memo((props: { organization: OrganizationWithoutMembers_organization }) => {
    const { id, isCommunity, isOwner, isAdmin, isMine, name } = props.organization;

    const canEdit = isOwner || isAdmin;
    const canLeave = isMine;
    const showButton = canEdit || canLeave;

    if (!showButton) {
        return null;
    }

    return (
        <UMoreButton>
            {canEdit && <UListItem title="Edit" onClick={() => showEditCommunityModal(id, isCommunity, isOwner)} />}
            {canLeave && <UListItem title="Leave" onClick={() => showLeaveConfirmation(id)} />}
            {canEdit && <UListItem title="Delete" onClick={() => showDeleteOrganizationModal({ orgName: name, organizationId: id })} />}
        </UMoreButton>
    );
});