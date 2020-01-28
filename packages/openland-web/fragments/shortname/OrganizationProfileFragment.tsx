import * as React from 'react';
import { UListGroup } from 'openland-web/components/unicorn/UListGroup';
import { UListHero } from 'openland-web/components/unicorn/UListHero';
import { useClient } from 'openland-web/utils/useClient';
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
import { OrganizationMembers_organization_members, OrganizationMemberRole } from 'openland-api/Types';
import { PrivateCommunityView } from '../account/components/PrivateCommunityView';

export const OrganizationProfileFragment = React.memo((props: { id: string }) => {
    const client = useClient();
    const organization = client.useOrganizationWithoutMembers({ organizationId: props.id }, { fetchPolicy: 'cache-and-network' }).organization;

    if (!organization.isMine && organization.isPrivate) {
        return <PrivateCommunityView organization={organization} />;
    }

    const initialMembers = client.useOrganizationMembers({ organizationId: props.id, first: 15 }, { fetchPolicy: 'cache-and-network' }).organization.members;
    const { id, name, photo, about, shortname, website, twitter, facebook, membersCount, isCommunity,
        linkedin, instagram, isMine, roomsCount } = organization;

    const [members, setMembers] = React.useState(initialMembers);
    const [loading, setLoading] = React.useState(false);

    const handleLoadMore = React.useCallback(async () => {
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
    }, [membersCount, members, loading]);

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

    return (
        <UFlatList
            track={`${organization.isCommunity ? 'community' : 'org'}_profile`}
            loadMore={handleLoadMore}
            items={members}
            loading={loading}
            title={name}
            renderItem={member => (
                <UUserView
                    key={'member-' + member.user.id}
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
            <UListHeader text="Members" counter={membersCount} />
            {organization.isMine && (
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
        </UFlatList>
    );
});