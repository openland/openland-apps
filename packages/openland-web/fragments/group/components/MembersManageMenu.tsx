import * as React from 'react';
import { RoomFullWithoutMembers_SharedRoom, RoomMembersPaginated_members } from 'openland-api/Types';
import { UListItem } from 'openland-web/components/unicorn/UListItem';
import { UMoreButton } from 'openland-web/components/unicorn/templates/UMoreButton';
import StarIcon from 'openland-icons/s/ic-star-24.svg';
import LeaveIcon from 'openland-icons/s/ic-leave-24.svg';
import { useRole } from 'openland-x-permissions/XWithRole';
import { showRemoveMemberModal } from 'openland-web/fragments/chat/RemoveMemberModal';
import { showMakeFeaturedModal } from 'openland-web/fragments/account/components/modals';

interface MemberManageMenu {
    group: RoomFullWithoutMembers_SharedRoom;
    member: RoomMembersPaginated_members;
}

export const MemberManageMenu = React.memo((props: MemberManageMenu) => {
    const { group, member } = props;
    const { id, title, isChannel } = group;
    const { user, badge, canKick } = member;

    const typeString = isChannel ? 'channel' : 'group';
    const showButton = useRole('super-admin') || canKick || user.isYou;

    const handleFeaturedClick = React.useCallback((e: React.MouseEvent) => {
        e.preventDefault();

        showMakeFeaturedModal(id, user.id);
    }, []);

    const handleLeaveClick = React.useCallback((e: React.MouseEvent) => {
        e.preventDefault();

        showRemoveMemberModal({ roomId: id, roomTitle: title, memberId: user.id, memberName: user.name });
    }, []);

    const handleRemoveClick = React.useCallback((e: React.MouseEvent) => {
        e.preventDefault();

        showRemoveMemberModal({ roomId: id, roomTitle: title, memberId: user.id, memberName: user.name });
    }, []);

    if (!showButton) {
        return null;
    }

    return (
        <UMoreButton>
            {useRole('super-admin') && <UListItem title={badge ? 'Edit featured status' : 'Make featured'} icon={<StarIcon />} onClick={handleFeaturedClick} />}
            {user.isYou && <UListItem title={`Leave ${typeString}`} icon={<LeaveIcon />} onClick={handleLeaveClick} />}
            {!user.isYou && <UListItem title={`Remove from ${typeString}`} icon={<LeaveIcon />} onClick={handleRemoveClick} />}
        </UMoreButton>
    );
});