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
import { OrganizationMembers_organization_members, OrganizationMemberRole, UserShort } from 'openland-api/spacex.types';
import { PrivateCommunityView } from '../settings/components/PrivateCommunityView';
import { USearchInput } from 'openland-web/components/unicorn/USearchInput';
import { css } from 'linaria';
import { debounce } from 'openland-y-utils/timer';
import { XView } from 'react-mental';
import { TextStyles } from 'openland-web/utils/TextStyles';

const membersSearchStyle = css`
    width: 160px;
    will-change: width;
    transition: width 0.15s ease;

    &:focus-within {
        width: 240px;
    }
`;

export type OrganizationMember = {
    role: OrganizationMemberRole,
    user: UserShort,
};

export const OrganizationProfileFragment = React.memo((props: { id: string }) => {
    const client = useClient();
    const organization = client.useOrganization({ organizationId: props.id }, { fetchPolicy: 'cache-and-network' }).organization;
    if (!organization.isMine && organization.private) {
        return <PrivateCommunityView organization={organization} />;
    }

    const initialMembers = client.useOrganizationMembers({ organizationId: props.id, first: 15 }, { fetchPolicy: 'cache-and-network' }).organization.members;
    const { id, name, photo, about, shortname, website, twitter, facebook, membersCount, isCommunity,
        linkedin, instagram, isMine, roomsCount } = organization;

    const [members, setMembers] = React.useState<OrganizationMember[]>(initialMembers);
    const [loading, setLoading] = React.useState(false);
    const [membersQuery, setMembersQuery] = React.useState('');
    const [membersFetching, setMembersFetching] = React.useState({ loading: 0, hasNextPage: true, cursor: '' });
    const membersQueryRef = React.useRef('');

    const loadSearchMembers = async (reseted?: boolean) => {
        let query = membersQueryRef.current;
        setMembersFetching(prev => ({ ...prev, loading: prev.loading + 1 }));
        const { edges, pageInfo } = (await client.queryOrganizationMembersSearch({
            orgId: id,
            query,
            first: 10,
            after: reseted ? undefined : membersFetching.cursor
        },
            { fetchPolicy: 'network-only' }
        )).orgMembersSearch;
        // avoid race condition
        if (membersQueryRef.current.length === 0) {
            return;
        }
        setMembers(prev => reseted ? edges.map(x => x.node) : prev.concat(edges.map(x => x.node)));
        setMembersFetching(prev => ({
            loading: Math.max(prev.loading - 1, 0),
            hasNextPage: pageInfo.hasNextPage,
            cursor: edges.length === 0 ? '' : edges[edges.length - 1].cursor
        }));
    };

    let handleSearchChange = React.useCallback(debounce(async (val: string) => {
        setMembersQuery(val);

        membersQueryRef.current = val;
        if (val.length > 0) {
            loadSearchMembers(true);
        } else {
            setMembers(initialMembers);
            setMembersFetching({
                loading: 0,
                hasNextPage: true,
                cursor: '',
            });
            // refetch in case someone is removed
            let initial = (await client.queryOrganizationMembers(
                { organizationId: props.id, first: 15 },
                { fetchPolicy: 'network-only' },
            )).organization.members;
            setMembers(initial);
        }
    }, 100), [initialMembers]);

    const handleLoadMore = React.useCallback(async () => {
        if (membersQueryRef.current.length > 0) {
            if (!membersFetching.loading && membersFetching.hasNextPage) {
                loadSearchMembers();
            }
            return;
        }

        if (members.length < membersCount && !loading) {
            setLoading(true);

            const loaded = (await client.queryOrganizationMembers({
                organizationId: organization.id,
                first: 10,
                after: members[members.length - 1].user.id,
            }, { fetchPolicy: 'network-only' })).organization.members;

            setMembers(current => [...current, ...loaded.filter(m => !current.find(m2 => m2.user.id === m.user.id))]);
            setLoading(false);
        }
    }, [membersCount, members, loading, membersFetching]);

    const initialGroups = client.useOrganizationPublicRooms({ organizationId: props.id, first: 10 }, { fetchPolicy: 'cache-and-network' }).organizationPublicRooms;
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
        const loaded = await client.queryOrganizationPublicRooms({ organizationId: props.id, first, after: groupsAfter });
        const { items, cursor } = loaded.organizationPublicRooms;
        setGroupsAfter(cursor);
        setDisplayGroups(prev => prev.concat(items));
        setGroupsOpenedCount(prev => prev + 1);
        setGroupsLoading(false);
    }, [props.id, groupsAfter, groupsLoading, displayGroups, roomsCount]);

    const handleAddMembers = React.useCallback((addedMembers: OrganizationMembers_organization_members[]) => {
        setMembers(current => [...current, ...addedMembers]);
    }, [members]);

    const handleRemoveMember = React.useCallback((memberId: string) => {
        setMembers(current => current.filter(m => m.user.id !== memberId));
    }, [members]);

    const handleChangeMemberRole = React.useCallback((memberId: string, newRole: OrganizationMemberRole) => {
        setMembers(current => current.map(m => m.user.id === memberId ? { ...m, role: newRole } : m));
    }, [members]);

    const isSearching = membersQuery.length > 0;

    return (
        <UFlatList
            track={`${organization.isCommunity ? 'community' : 'org'}_profile`}
            loadMore={handleLoadMore}
            items={members}
            loading={loading || (isSearching && membersFetching.loading > 0 && members.length > 15)}
            title={name}
            renderItem={member => (
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
                                <a
                                    href={'https://openland.com/' + shortname}
                                    target="_blank"
                                >
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
                {displayGroups.map(group => (
                    <UGroupView
                        key={'room-' + group.id}
                        group={group}
                    />
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
                counter={membersCount}
                rightElement={(
                    <USearchInput
                        placeholder="Search"
                        rounded={true}
                        className={membersSearchStyle}
                        value={membersQuery}
                        loading={membersFetching.loading > 0}
                        onChange={handleSearchChange}
                    />
                )}
            />
            {organization.isMine && !isSearching && (
                <UAddItem
                    title="Add people"
                    onClick={() => {
                        showAddMembersModal({
                            id,
                            isCommunity,
                            isGroup: false,
                            isOrganization: true,
                            onOrganizationMembersAdd: handleAddMembers
                        });
                    }}
                />
            )}
            {members.length === 0 && isSearching && (
                <XView paddingTop={32} paddingBottom={32} alignItems="center" {...TextStyles.Body} color="var(--foregroundSecondary)">
                    Nobody found
                </XView>
            )}
        </UFlatList>
    );
});