import * as React from 'react';
import { UListGroup } from 'openland-web/components/unicorn/UListGroup';
import { UListHero } from 'openland-web/components/unicorn/UListHero';
import { useClient } from 'openland-api/useClient';
import { UListField } from 'openland-web/components/unicorn/UListField';
import { UUserView } from 'openland-web/components/unicorn/templates/UUserView';
import { UGroupView } from 'openland-web/components/unicorn/templates/UGroupView';
import { UFlatList } from 'openland-web/components/unicorn/UFlatList';
import { UListHeader } from 'openland-web/components/unicorn/UListHeader';
import { OrganizationMenu } from './components/OrganizationMenu';
import { OrganizationMemberMenu } from './components/OrganizationMemberMenu';
import { showAddMembersModal } from '../chat/showAddMembersModal';
import { UAddItem } from 'openland-web/components/unicorn/templates/UAddButton';
import { UListText } from 'openland-web/components/unicorn/UListText';
import { UListItem } from 'openland-web/components/unicorn/UListItem';
import MoreHIcon from 'openland-icons/s/ic-more-h-24.svg';
import { CreateGroupButton } from './components/CreateGroupButton';
import {
    OrganizationMembers_organization_members,
    OrganizationMemberRole,
} from 'openland-api/spacex.types';
import { PrivateCommunityView } from '../settings/components/PrivateCommunityView';
import { debounce } from 'openland-y-utils/timer';
import { XView } from 'react-mental';
import { TextStyles } from 'openland-web/utils/TextStyles';
import { MessengerContext } from 'openland-engines/MessengerEngine';
import { MembersSearchInput } from 'openland-web/components/MembersSearchInput';
import {
    EntityMembersManager,
    EntityMembersManagerRef,
    OrgMember,
} from 'openland-y-utils/members/EntityMembersManager';

export const OrganizationProfileFragment = React.memo((props: { id: string }) => {
    const client = useClient();
    const onlines = React.useContext(MessengerContext).getOnlines();

    const organization = client.useOrganization(
        { organizationId: props.id },
        { fetchPolicy: 'cache-and-network' },
    ).organization;

    const profilesRef = React.useRef<EntityMembersManagerRef>(null);

    if (!organization.isMine && organization.private) {
        return <PrivateCommunityView organization={organization} />;
    }

    const {
        id,
        name,
        photo,
        about,
        shortname,
        website,
        twitter,
        facebook,
        membersCount,
        isCommunity,
        linkedin,
        instagram,
        isMine,
        roomsCount,
    } = organization;

    const membersQueryRef = React.useRef('');
    const [hasSearched, setHasSearched] = React.useState(false);
    const [initialMembers, setInitialMembers] = React.useState<OrgMember[]>([]);
    const [members, setMembers] = React.useState<OrgMember[]>([]);
    const [loading, setLoading] = React.useState(true);
    const [membersQuery, setMembersQuery] = React.useState('');
    const [membersFetching, setMembersFetching] = React.useState({
        loading: 0,
        hasNextPage: true,
        cursor: '',
    });

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
                        { organizationId: props.id, first: 15 },
                        { fetchPolicy: 'network-only' },
                    )
                ).organization.members;
                setMembers(initial);
            }
        }, 100),
        [initialMembers],
    );

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

    const initialGroups = client.useOrganizationPublicRooms(
        { organizationId: props.id, first: 10 },
        { fetchPolicy: 'network-only' },
    ).organizationPublicRooms;
    const [displayGroups, setDisplayGroups] = React.useState(initialGroups.items);
    const [groupsAfter, setGroupsAfter] = React.useState(initialGroups.cursor);
    const [groupsLoading, setGroupsLoading] = React.useState(false);
    const [groupsOpenedCount, setGroupsOpenedCount] = React.useState(0);

    const handleLoadMoreGroups = React.useCallback(async () => {
        if (groupsLoading || !groupsAfter) {
            return;
        }
        setGroupsLoading(true);
        const first = groupsOpenedCount === 2 ? roomsCount - 20 : 10;
        const loaded = await client.queryOrganizationPublicRooms({
            organizationId: props.id,
            first,
            after: groupsAfter,
        }, { fetchPolicy: 'network-only' });
        const { items, cursor } = loaded.organizationPublicRooms;
        setGroupsAfter(cursor);
        setDisplayGroups((prev) => prev.concat(items));
        setGroupsOpenedCount((prev) => prev + 1);
        setGroupsLoading(false);
    }, [props.id, groupsAfter, groupsLoading, displayGroups, roomsCount]);

    const handleAddMembers = React.useCallback(
        (addedMembers: OrganizationMembers_organization_members[]) => {
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

    const handleChangeMemberRole = React.useCallback(
        (memberId: string, newRole: OrganizationMemberRole) => {
            setMembers((current) =>
                current.map((m) => (m.user.id === memberId ? { ...m, role: newRole } : m)),
            );
        },
        [members],
    );

    const isSearching = membersQuery.length > 0;
    // compensate "add people" button and empty view when searching
    const heightCompensation = hasSearched ? (members.length === 0 ? -32 : 56) : 0;

    const shouldShowAddButton =
        organization.isMine && (organization.isAdmin || organization.membersCanInvite);

    return (
        <UFlatList
            track={`${organization.isCommunity ? 'community' : 'org'}_profile`}
            loadMore={handleLoadMore}
            items={members}
            loading={loading || (isSearching && membersFetching.loading > 0 && members.length > 15)}
            title={name}
            listMinHeight={Math.min(56 * membersCount + heightCompensation, 700)}
            renderItem={(member) => (
                <UUserView
                    key={'member-' + member.user.id + '-' + member.role}
                    user={member.user}
                    role={member.role}
                    rightElement={
                        <OrganizationMemberMenu
                            organization={organization}
                            member={member}
                            onRemove={handleRemoveMember}
                            onChangeRole={handleChangeMemberRole}
                        />
                    }
                />
            )}
            padded={false}
        >
            <UListHero
                title={name}
                description={isCommunity ? 'Community' : 'Organization'}
                avatar={{ photo, id, title: name }}
            >
                <OrganizationMenu organization={organization} onLeave={handleRemoveMember} />
            </UListHero>
            <UListGroup header="About">
                {!!about && <UListText value={about} marginBottom={16} />}
                {!!shortname && (
                    <UListField
                        label="Shortname"
                        value={
                            <div>
                                <a href={'https://openland.com/' + shortname} target="_blank">
                                    @{shortname}
                                </a>
                            </div>
                        }
                    />
                )}
                {!!website && <UListField label="Website" value={website} />}
                {!!instagram && <UListField label="Instagram" value={instagram} />}
                {!!twitter && <UListField label="Twitter" value={twitter} />}
                {!!facebook && <UListField label="Facebook" value={facebook} />}
                {!!linkedin && <UListField label="LinkedIn" value={linkedin} />}
            </UListGroup>
            <UListGroup header="Groups" counter={roomsCount}>
                {isMine && <CreateGroupButton id={id} />}
                {displayGroups.map((group) => (
                    <UGroupView key={'room-' + group.id} group={group} />
                ))}
                {displayGroups.length !== roomsCount && (
                    <UListItem
                        title={groupsOpenedCount < 2 ? 'Show more' : 'Show all'}
                        icon={<MoreHIcon />}
                        iconColor="var(--foregroundSecondary)"
                        iconBackground="var(--backgroundTertiary)"
                        useRadius={true}
                        onClick={handleLoadMoreGroups}
                    />
                )}
            </UListGroup>
            <UListHeader
                text="Members"
                counter={hasSearched ? undefined : membersCount || 0}
                rightElement={
                    <MembersSearchInput
                        query={membersQuery}
                        loading={membersFetching.loading > 0}
                        onChange={handleSearchChange}
                    />
                }
            />
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
        </UFlatList>
    );
});
