import React from 'react';
import { XView } from 'react-mental';

import { MembersSearchInput } from 'openland-web/components/MembersSearchInput';
import { UAddItem } from 'openland-web/components/unicorn/templates/UAddButton';
import { showAddMembersModal } from 'openland-web/fragments/chat/showAddMembersModal';
import { TextStyles } from 'openland-web/utils/TextStyles';
import { UUserView } from 'openland-web/components/unicorn/templates/UUserView';
import { OrganizationMemberMenu } from './OrganizationMemberMenu';
import { XLoader } from 'openland-x/XLoader';
import { debounce } from 'openland-y-utils/timer';
import { MessengerContext } from 'openland-engines/MessengerEngine';
import { useClient } from 'openland-api/useClient';
import { ProfileLayoutContext } from 'openland-web/components/ProfileLayout';
import {
    Organization_organization,
    OrganizationMemberRole,
    OrganizationMembers_organization_members,
} from 'openland-api/spacex.types';
import {
    EntityMembersManager,
    EntityMembersManagerRef,
    OrgMember,
} from 'openland-y-utils/members/EntityMembersManager';

interface OrganizationMembersProps {
    members: OrgMember[];
    setMembers: React.Dispatch<React.SetStateAction<OrgMember[]>>;
    organization: Organization_organization;
    onRemoveMember: (memberId: string) => void;
}

export const OrganizationMembers = ({
    members,
    setMembers,
    organization,
    onRemoveMember,
}: OrganizationMembersProps) => {
    const client = useClient();
    const [hasSearched, setHasSearched] = React.useState(false);
    const [initialMembers, setInitialMembers] = React.useState<OrgMember[]>([]);
    const [loading, setLoading] = React.useState(true);
    const [membersQuery, setMembersQuery] = React.useState('');
    const onlines = React.useContext(MessengerContext).getOnlines();
    const [membersFetching, setMembersFetching] = React.useState({
        loading: 0,
        hasNextPage: true,
        cursor: '',
    });

    const { bottomReached } = React.useContext(ProfileLayoutContext);
    const membersQueryRef = React.useRef('');
    const profilesRef = React.useRef<EntityMembersManagerRef>(null);

    const { id, membersCount, isCommunity } = organization;

    const loadSearchMembers = async (reseted?: boolean) => {
        let query = membersQueryRef.current;
        setMembersFetching((prev) => ({ ...prev, loading: prev.loading + 1 }));
        const { edges, pageInfo } = (
            await client.queryOrganizationMembersSearch(
                {
                    orgId: id,
                    query,
                    first: 10,
                    after: reseted ? undefined : membersFetching.cursor,
                },
                { fetchPolicy: 'network-only' },
            )
        ).orgMembersSearch;
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

    let handleSearchChange = React.useCallback(
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
                    await client.queryOrganizationMembers(
                        { organizationId: id, first: 15 },
                        { fetchPolicy: 'network-only' },
                    )
                ).organization.members;
                setMembers(initial);
            }
        }, 100),
        [initialMembers],
    );

    const handleAddMembers = React.useCallback(
        (addedMembers: OrganizationMembers_organization_members[]) => {
            setMembers((current) => [...current, ...addedMembers]);
            onlines.onUsersAppear(addedMembers.map((m) => m.user.id));
        },
        [members],
    );
    const handleChangeMemberRole = React.useCallback(
        (memberId: string, newRole: OrganizationMemberRole) => {
            setMembers((current) =>
                current.map((m) => (m.user.id === memberId ? { ...m, role: newRole } : m)),
            );
        },
        [members],
    );

    const shouldShowAddButton =
        organization.isMine && (organization.isAdmin || organization.membersCanInvite);

    const isSearching = membersQuery.length > 0;
    const loadingOrSearching =
        loading || (isSearching && membersFetching.loading > 0 && members.length > 15);

    return (
        <XView>
            <MembersSearchInput
                query={membersQuery}
                loading={membersFetching.loading > 0}
                onChange={handleSearchChange}
            >
                {shouldShowAddButton && !hasSearched && (
                    <UAddItem
                        title="Add people"
                        onClick={() => {
                            showAddMembersModal({
                                id,
                                isCommunity,
                                isGroup: false,
                                isOrganization: true,
                                onOrganizationMembersAdd: handleAddMembers,
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
                        isGroup={false}
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
                            <OrganizationMemberMenu
                                organization={organization}
                                member={member}
                                onRemove={onRemoveMember}
                                onChangeRole={handleChangeMemberRole}
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
