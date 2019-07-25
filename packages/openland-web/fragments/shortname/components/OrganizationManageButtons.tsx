import * as React from 'react';
import { OrganizationWithoutMembers_organization } from 'openland-api/Types';
import { UMoreButton } from 'openland-web/components/unicorn/templates/UMoreButton';
import { UListItem } from 'openland-web/components/unicorn/UListItem';
import { showLeaveConfirmation } from 'openland-web/fragments/org/showLeaveConfirmation';
import { showEditCommunityModal } from 'openland-web/fragments/account/components/showEditCommunityModal';
import { useRole } from 'openland-x-permissions/XWithRole';
import copy from 'copy-to-clipboard';
import EditIcon from 'openland-icons/s/ic-edit-24.svg';
import LeaveIcon from 'openland-icons/s/ic-leave-24.svg';
import CopyIcon from 'openland-icons/s/ic-copy-24.svg';

export const OrganizationManageButtons = React.memo((props: { organization: OrganizationWithoutMembers_organization }) => {
    const { id, isCommunity, isOwner, isAdmin, isMine, shortname } = props.organization;
    const canEdit = isOwner || isAdmin;
    const canLeave = isMine;
    const typeString = isCommunity ? 'community' : 'organization';

    return (
        <UMoreButton>
            <UListItem title="Copy link" icon={<CopyIcon />} onClick={() => { copy(`https://openland.com/${shortname || id}`); }} />
            {canEdit && <UListItem title="Edit" icon={<EditIcon />} onClick={() => showEditCommunityModal(id, isCommunity, isOwner)} />}
            {useRole('super-admin') && <UListItem title="Super edit" icon={<EditIcon />} path={`/super/orgs/${id}`} />}
            {canLeave && <UListItem title={`Leave ${typeString}`} icon={<LeaveIcon />} onClick={() => showLeaveConfirmation(id)} />}
        </UMoreButton>
    );
});