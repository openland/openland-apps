import * as React from 'react';
import { RoomMembersPaginated_members } from 'openland-api/spacex.types';
import { useClient } from 'openland-api/useClient';
import { MessengerContext } from 'openland-engines/MessengerEngine';

interface GroupUsersListProps {
    roomId: string;
    membersCount: number;
    setMembers: React.Dispatch<React.SetStateAction<RoomMembersPaginated_members[]>>;
    setInitialMembers: React.Dispatch<React.SetStateAction<RoomMembersPaginated_members[]>>;
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
    members: RoomMembersPaginated_members[];
    loading: boolean;
}

export interface GroupUsersListRef {
    handleLoadMore: () => Promise<void>;
}

export const GroupUsersList = React.forwardRef(
    (props: GroupUsersListProps, ref: React.Ref<GroupUsersListRef>) => {
        const client = useClient();
        const onlines = React.useContext(MessengerContext).getOnlines();
        const initialMembers = client.useRoomMembersPaginated(
            { roomId: props.roomId, first: 15 },
            { fetchPolicy: 'network-only' },
        ).members;

        React.useEffect(() => {
            if (!props.members.length) {
                props.setInitialMembers(initialMembers);
                props.setMembers(initialMembers);
                props.setLoading(false);

                initialMembers.forEach(m => onlines.onUserAppears(m.user.id));
            }
        }, [initialMembers]);

        const handleLoadMore = React.useCallback(async () => {
            if (props.membersCount && (props.members.length < props.membersCount && !props.loading)) {
                props.setLoading(true);

                const loaded = (await client.queryRoomMembersPaginated(
                    {
                        roomId: props.roomId,
                        first: 10,
                        after: props.members[props.members.length - 1].user.id,
                    },
                    { fetchPolicy: 'network-only' },
                )).members;

                props.setMembers(current => [
                    ...current,
                    ...loaded.filter(m => !current.find(m2 => m2.user.id === m.user.id)),
                ]);
                props.setLoading(false);

                loaded.forEach(m => onlines.onUserAppears(m.user.id));
            }
        }, [props.roomId, props.members, props.loading]);

        React.useImperativeHandle(ref, () => ({
            handleLoadMore: handleLoadMore,
        }));

        return null;
    },
);