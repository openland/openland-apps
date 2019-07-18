import * as React from 'react';
import { RoomFullWithoutMembers_SharedRoom } from 'openland-api/Types';
import { UMoreButton } from 'openland-web/components/unicorn/templates/UMoreButton';
import { UListItem } from 'openland-web/components/unicorn/UListItem';
import { showLeaveConfirmation } from 'openland-web/fragments/org/showLeaveConfirmation';
import { showRoomEditModal } from 'openland-web/fragments/account/components/RoomProfileComponent';

export const GroupManageButtons = React.memo((props: { group: RoomFullWithoutMembers_SharedRoom }) => {
    const { id, canEdit, role, organization, isChannel } = props.group;

    const canAdvencedEdit = (role === 'OWNER' || role === 'ADMIN' || (organization && (organization.isAdmin || organization.isOwner)));
    const typeString = isChannel ? 'channel' : 'group';

    return (
        <UMoreButton>
            {canEdit && <UListItem title="Edit" onClick={() => showRoomEditModal(id, isChannel)} />}
            {canAdvencedEdit && <UListItem title="Advanced settings" />}
            <UListItem title={'Leave ' + typeString} onClick={() => showLeaveConfirmation(id)} />
        </UMoreButton>
    );
});