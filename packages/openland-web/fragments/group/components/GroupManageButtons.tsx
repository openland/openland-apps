import * as React from 'react';
import { RoomFullWithoutMembers_SharedRoom } from 'openland-api/Types';
import { UMoreButton } from 'openland-web/components/unicorn/templates/UMoreButton';
import { UListItem } from 'openland-web/components/unicorn/UListItem';
import { showRoomEditModal, leaveChatModal } from 'openland-web/fragments/account/components/groupProfileModals';
import { showAdvancedSettingsModal } from 'openland-web/fragments/chat/AdvancedSettingsModal';

import EditIcon from 'openland-icons/s/ic-edit-24.svg';
import LeaveIcon from 'openland-icons/s/ic-leave-24.svg';
import { XViewProps } from 'react-mental';

interface GroupManageButtons extends XViewProps {
    group: RoomFullWithoutMembers_SharedRoom;
}

export const GroupManageButtons = React.memo((props: GroupManageButtons) => {
    const { group, ...other } = props;
    const { id, canEdit, role, organization, isChannel } = props.group;

    const canAdvencedEdit = (role === 'OWNER' || role === 'ADMIN' || (organization && (organization.isAdmin || organization.isOwner)));
    const typeString = isChannel ? 'channel' : 'group';

    return (
        <UMoreButton {...other}>
            {canEdit && <UListItem title="Edit" icon={<EditIcon />} onClick={() => showRoomEditModal(id, isChannel)} />}
            {canAdvencedEdit && <UListItem title="Advanced settings" icon={<EditIcon />} onClick={() => showAdvancedSettingsModal(id)} />}
            <UListItem title={'Leave ' + typeString} icon={<LeaveIcon />} onClick={() => leaveChatModal(id)} />
        </UMoreButton>
    );
});