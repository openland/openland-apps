import React from 'react';
import { XView } from 'react-mental';

import { UUserView } from 'openland-web/components/unicorn/templates/UUserView';
import {
    EntityMembersManager,
    EntityMembersManagerRef,
    GroupMember,
} from 'openland-y-utils/members/EntityMembersManager';
import { debounce } from 'openland-y-utils/timer';
import { MembersSearchInput } from 'openland-web/components/MembersSearchInput';
import { groupInviteCapabilities } from 'openland-y-utils/InviteCapabilities';
import { UAddItem } from 'openland-web/components/unicorn/templates/UAddButton';
import { TextStyles } from 'openland-web/utils/TextStyles';
import { showAddMembersModal } from 'openland-web/fragments/chat/showAddMembersModal';
import { MessengerContext } from 'openland-engines/MessengerEngine';
import { useClient } from 'openland-api/useClient';
import { RoomChat_room_SharedRoom, RoomMemberRole } from 'openland-api/spacex.types';
import { ProfileLayoutContext } from 'openland-web/components/ProfileLayout';
import { XLoader } from 'openland-x/XLoader';

import { GroupMemberMenu } from './GroupMemberMenu';

interface GroupMembersProps {
    group: RoomChat_room_SharedRoom;
}

export const GroupMembers = ({ group }: GroupMembersProps) => {
    const onlines = React.useContext(MessengerContext).getOnlines();
    const { bottomReached } = React.useContext(ProfileLayoutContext);
    const client = useClient();

    const profilesRef = React.useRef<EntityMembersManagerRef>(null);
    const membersQueryRef = React.useRef('');
    const [hasSearched, setHasSearched] = React.useState(false);
    const [initialMembers, setInitialMembers] = React.useState<GroupMember[]>([]);
    const [members, setMembers] = React.useState<GroupMember[]>([]);
    const [loading, setLoading] = React.useState(true);
    const [membersQuery, setMembersQuery] = React.useState('');
    const [membersFetching, setMembersFetching] = React.useState({
        loading: 0,
        hasNextPage: true,
        cursor: '',
    });

    const { id, membersCount, isChannel } = group;

    const loadSearchMembers = async (reseted?: boolean) => {
        let query = membersQueryRef.current;
        setMembersFetching((prev) => ({ ...prev, loading: prev.loading + 1 }));
        const { edges, pageInfo } = (
            await client.queryRoomMembersSearch(
                {
                    cid: id,
                    query,
                    first: 30,
                    after: reseted ? undefined : membersFetching.cursor,
                },
                { fetchPolicy: 'network-only' },
            )
        ).chatMembersSearch;
        // avoid race condition
        if (membersQueryRef.current.length === 0) {
            return;
        }
        setMembers((prev) =>
            reseted ? edges.map((x) => x.node) : prev.concat(edges.map((x) => x.node)),
        );
        setMembersFetching((prev) => ({
            loading: Math.max(prev.loading - 1, 0),
            hasNextPage: pageInfo.hasNextPage,
            cursor: edges.length === 0 ? '' : edges[edges.length - 1].cursor,
        }));
        setHasSearched(true);
    };

    const handleLoadMore = React.useCallback(async () => {
        if (membersQueryRef.current.length > 0) {
            if (!membersFetching.loading && membersFetching.hasNextPage) {
                await loadSearchMembers();
            }
            return;
        }

        if (profilesRef.current) {
            await profilesRef.current.handleLoadMore();
        }
    }, [membersCount, members, loading, membersQuery, membersFetching]);

    React.useEffect(() => {
        if (bottomReached) {
            handleLoadMore();
        }
    }, [bottomReached]);

    React.useEffect(() => {
        return onlines.onSingleChange((userId: string, online: boolean) => {
            if (members.some(({ user }) => user.id === userId && user.online !== online)) {
                setMembers((current) =>
                    current.map((m) =>
                        m.user.id === userId && online !== m.user.online
                            ? { ...m, user: { ...m.user, online, lastSeen: Date.now().toString() } }
                            : m,
                    ),
                );
            }
        });
    }, [members]);

    const handleSearchChange = React.useCallback(
        debounce(async (val: string) => {
            setMembersQuery(val);

            membersQueryRef.current = val;
            if (val.length > 0) {
                await loadSearchMembers(true);
            } else {
                setMembers(initialMembers);
                setMembersFetching({
                    loading: 0,
                    hasNextPage: true,
                    cursor: '',
                });
                setHasSearched(false);
                // refetch in case someone is removed
                let initial = (
                    await client.queryRoomMembersPaginated(
                        { roomId: id, first: 30 },
                        { fetchPolicy: 'network-only' },
                    )
                ).members;
                setMembers(initial);
            }
        }, 100),
        [initialMembers],
    );

    const handleAddMembers = React.useCallback(
        (addedMembers: GroupMember[]) => {
            setMembers((current) => [...current, ...addedMembers]);
            onlines.onUsersAppear(addedMembers.map((m) => m.user.id));
        },
        [members],
    );

    const handleRemoveMember = React.useCallback(
        (memberId: string) => {
            setMembers((current) => current.filter((m) => m.user.id !== memberId));
        },
        [members],
    );

    const updateUserRole = React.useCallback(
        (uid: string, role: RoomMemberRole) => {
            setMembers((current) => current.map((m) => (m.user.id === uid ? { ...m, role } : m)));
        },
        [members],
    );

    const isSearching = membersQuery.length > 0;
    const loadingOrSearching =
        loading || (isSearching && membersFetching.loading > 0 && members.length > 30);

    const { canAddDirectly, canGetInviteLink } = groupInviteCapabilities(group);

    return (
        <XView marginLeft={-8} width="100%">
            <MembersSearchInput
                query={membersQuery}
                loading={membersFetching.loading > 0}
                onChange={handleSearchChange}
            >
                {(canAddDirectly || canGetInviteLink) && !hasSearched && (
                    <UAddItem
                        title="Add people"
                        titleStyle={TextStyles.Label1}
                        onClick={() => {
                            showAddMembersModal({
                                id,
                                isChannel,
                                isGroup: true,
                                isOrganization: false,
                                onGroupMembersAdd: handleAddMembers,
                            });
                        }}
                    />
                )}
                {members.length === 0 && isSearching && (
                    <XView
                        paddingTop={32}
                        paddingBottom={32}
                        alignItems="center"
                        {...TextStyles.Body}
                        color="var(--foregroundSecondary)"
                    >
                        Nobody found
                    </XView>
                )}
                <React.Suspense fallback={null}>
                    <EntityMembersManager
                        isGroup={true}
                        loading={loading}
                        members={members}
                        membersCount={membersCount}
                        entityId={id}
                        setLoading={setLoading}
                        setMembers={setMembers}
                        setInitialMembers={setInitialMembers}
                        onlineWatcher={onlines}
                        ref={profilesRef}
                    />
                </React.Suspense>
                {members.map((member) => (
                    <UUserView
                        key={'member-' + member.user.id + '-' + member.role}
                        user={member.user}
                        role={member.role}
                        rightElement={
                            <GroupMemberMenu
                                group={group}
                                member={member}
                                onRemove={handleRemoveMember}
                                updateUserRole={updateUserRole}
                            />
                        }
                    />
                ))}
                <XView height={56} alignItems="center" justifyContent="center">
                    {loadingOrSearching && <XLoader loading={true} />}
                </XView>
            </MembersSearchInput>
        </XView>
    );
};
