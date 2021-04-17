import React from 'react';
import { UButton } from 'openland-web/components/unicorn/UButton';
import {
    VoiceChatEntity_parentRoom,
    SharedRoomMembershipStatus,
    SharedRoomKind,
} from 'openland-api/spacex.types';
import { XViewRouterContext } from 'react-mental';
import { useClient } from 'openland-api/useClient';

interface RoomJoinButtonProps {
    parentRoom: VoiceChatEntity_parentRoom;
}

export const RoomJoinButton = React.memo<RoomJoinButtonProps>(({ parentRoom }) => {
    const [loading, setLoading] = React.useState(false);
    const [isMember, setIsMember] = React.useState(
        parentRoom.membership === SharedRoomMembershipStatus.MEMBER,
    );
    const client = useClient();
    const router = React.useContext(XViewRouterContext)!;

    const handleJoinClick = React.useCallback(async () => {
        setLoading(true);
        try {
            await client.mutateRoomJoin({ roomId: parentRoom.id });
            await client.refetchRoomChat({ id: parentRoom.id });
            setIsMember(true);
        } catch (e) {
            console.error(e);
        }
        setLoading(false);
    }, []);

    const handleViewClick = React.useCallback(() => {
        router.navigate(`/${parentRoom.id}`);
    }, []);

    if (parentRoom.kind === SharedRoomKind.PUBLIC && !isMember) {
        return (
            <UButton
                text={parentRoom.isChannel ? 'Join channel' : 'Join group'}
                loading={loading}
                onClick={handleJoinClick}
            />
        );
    } else {
        return (
            <UButton
                text={parentRoom.isChannel ? 'View channel' : 'View group'}
                onClick={handleViewClick}
            />
        );
    }
});
