import * as React from 'react';
import copy from 'copy-to-clipboard';
import { XView } from 'react-mental';

import { useTabRouter } from 'openland-unicorn/components/TabLayout';
import { RoomChat_room_SharedRoom } from 'openland-api/spacex.types';
import { showRoomEditModal, showLeaveChatConfirmation } from 'openland-web/fragments/settings/components/groupProfileModals';
import { UListItem } from 'openland-web/components/unicorn/UListItem';
import { useClient } from 'openland-api/useClient';
import { AlertBlanketBuilder } from 'openland-x/AlertBlanket';
import { XWithRole } from 'openland-x-permissions/XWithRole';
import { useToast } from 'openland-web/components/unicorn/UToast';
import { UNotificationsSwitchNew } from 'openland-web/components/unicorn/templates/UNotificationsSwitchNew';
import { ProfileLayoutContext } from 'openland-web/components/ProfileLayout';

import LeaveIcon from 'openland-icons/s/ic-leave-24.svg';
import CopyIcon from 'openland-icons/s/ic-link-24.svg';
import SettingsIcon from 'openland-icons/s/ic-edit-24.svg';
import DeleteIcon from 'openland-icons/s/ic-delete-24.svg';

import { GroupMenu } from './GroupMenu';

interface GroupActions {
    group: RoomChat_room_SharedRoom;
}

export const GroupActions = React.memo(({ group }: GroupActions) => {
    const { compactView } = React.useContext(ProfileLayoutContext);

    if (compactView) {
        return  <GroupMenu group={group} />;
    }

    const tabRouter = useTabRouter();
    const toastHandlers = useToast();
    const client = useClient();
    const { id, isChannel, settings, canEdit } = group;
    const typeString = isChannel ? 'channel' : 'group';

    const onCopyLinkClick = React.useCallback(() => {
        copy(`https://openland.com/group/${id}`, { format: 'text/plain' });

        toastHandlers.show({
            type: 'success',
            text: 'Link copied',
        });
    }, [id]);

    const onEditClick = React.useCallback(() => showRoomEditModal(id, isChannel), [id, isChannel]);

    const onLeaveClick = React.useCallback(() => showLeaveChatConfirmation(
        client,
        id,
        tabRouter,
        group.__typename === 'SharedRoom' && group.isPremium,
        group.kind === 'PUBLIC',
    ), [group]);

    const onDeleteClick = React.useCallback(() => {
        const alertBuilder = new AlertBlanketBuilder();

        alertBuilder.title(`Delete this ${typeString}?`);
        alertBuilder.message('Are you sure?');
        alertBuilder.action('Delete', async () => {
            await client.mutateRoomDelete({ chatId: id });
        }, 'danger');
        alertBuilder.show();
    }, [typeString, id]);

    const editTitle = isChannel ? 'Edit channel' : 'Edit group';

    return (
        <XView marginTop={16} marginHorizontal={-16}>
            <UNotificationsSwitchNew id={id} mute={!!settings.mute} marginLeft={16} />
            <UListItem title="Copy link" useRadius={true} icon={<CopyIcon />} onClick={onCopyLinkClick}/>

            {canEdit && <UListItem title={editTitle} useRadius={true} icon={<SettingsIcon/>} onClick={onEditClick}/>}
            <UListItem title={`Leave ${typeString}`} useRadius={true} icon={<LeaveIcon/>} onClick={onLeaveClick}/>

            <XWithRole role="super-admin">
                <UListItem title={`Delete ${typeString}`} useRadius={true} icon={<DeleteIcon />} onClick={onDeleteClick}/>
            </XWithRole>
        </XView>
    );
});
