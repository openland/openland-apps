import * as React from 'react';
import { useClient } from 'openland-web/utils/useClient';
import { UListHero } from 'openland-web/components/unicorn/UListHero';
import { plural } from 'openland-y-utils/plural';
import { UListGroup } from 'openland-web/components/unicorn/UListGroup';
import { UOrganizationView } from 'openland-web/components/unicorn/templates/UOrganizationView';
import { UNotificationsSwitch } from 'openland-web/components/unicorn/templates/UNotificationsSwitch';
import { useUnicorn } from 'openland-unicorn/useUnicorn';
import { UButton } from 'openland-web/components/unicorn/UButton';
import { UFlatList } from 'openland-web/components/unicorn/UFlatList';
import { UUserView } from 'openland-web/components/unicorn/templates/UUserView';
import { UListHeader } from 'openland-web/components/unicorn/UListHeader';
import { UListItem } from 'openland-web/components/unicorn/UListItem';
import { GroupMenu } from './components/GroupMenu';
import { showAddMembersModal } from '../chat/showAddMembersModal';
import { UAddItem } from 'openland-web/components/unicorn/templates/UAddButton';
import { UListText } from 'openland-web/components/unicorn/UListText';
import { GroupMemberMenu } from './components/GroupMemberMenu';
import { RoomMembersPaginated_members } from 'openland-api/Types';
import IcUser from 'openland-icons/s/ic-user-24.svg';
import IcCopy from 'openland-icons/s/ic-copy-24.svg';

export const GroupProfileFragment = React.memo(() => {
    const client = useClient();
    const unicorn = useUnicorn();
    const group = client.useRoomWithoutMembers(
        { id: unicorn.id },
        { fetchPolicy: 'cache-and-network' },
    ).room;

    if (!group || group.__typename === 'PrivateRoom') {
        return null;
    }

    const featuredMembers = client.useRoomFeaturedMembers(
        { roomId: unicorn.id },
        { fetchPolicy: 'cache-and-network' },
    ).roomFeaturedMembers;
    const initialMembers = client.useRoomMembersPaginated(
        { roomId: unicorn.id, first: 15 },
        { fetchPolicy: 'cache-and-network' },
    ).members;
    const {
        id,
        isChannel,
        membersCount,
        photo,
        title,
        description,
        organization,
        settings,
        matchmaking,
    } = group;

    const memberProfiles = matchmaking && matchmaking.enabled;
    const myMemberProfile = matchmaking && matchmaking.myProfile;
    const otherMemberProfiles =
        myMemberProfile && matchmaking && matchmaking.profiles && matchmaking.profiles.length > 1;

    const [members, setMembers] = React.useState(initialMembers);
    const [loading, setLoading] = React.useState(false);

    const handleLoadMore = React.useCallback(
        async () => {
            if (membersCount && (members.length < membersCount && !loading)) {
                setLoading(true);

                const loaded = (await client.queryRoomMembersPaginated(
                    {
                        roomId: id,
                        first: 10,
                        after: members[members.length - 1].user.id,
                    },
                    { fetchPolicy: 'network-only' },
                )).members;

                setMembers(current => [
                    ...current,
                    ...loaded.filter(m => !current.find(m2 => m2.user.id === m.user.id)),
                ]);
                setLoading(false);
            }
        },
        [membersCount, members, loading],
    );

    const handleAddMembers = React.useCallback(
        (addedMembers: RoomMembersPaginated_members[]) => {
            setMembers(current => [...current, ...addedMembers]);
        },
        [members],
    );

    const handleRemoveMember = React.useCallback(
        (memberId: string) => {
            setMembers(current => current.filter(m => m.user.id !== memberId));
        },
        [members],
    );

    return (
        <UFlatList
            track="group_profile"
            loadMore={handleLoadMore}
            items={members}
            loading={loading}
            renderItem={member => (
                <UUserView
                    key={'member-' + member.user.id}
                    user={member.user}
                    role={member.role}
                    rightElement={
                        <GroupMemberMenu
                            group={group}
                            member={member}
                            onRemove={handleRemoveMember}
                        />
                    }
                />
            )}
            padded={false}
        >
            <UListHero
                title={title}
                description={plural(membersCount || 0, ['member', 'members'])}
                avatar={{ photo, id, title }}
            >
                <UButton text="View" path={'/mail/' + id} />
                <UNotificationsSwitch id={id} mute={!!settings.mute} marginLeft={16} />
                <GroupMenu group={group} />
            </UListHero>

            <UListGroup header="About">
                {!!description && <UListText value={description} />}
            </UListGroup>
            {memberProfiles && (
                <UListGroup marginTop={20}>
                    <UListItem
                        title={myMemberProfile ? 'My member profile' : 'Create member profile'}
                        icon={<IcUser />}
                        useRadius={true}
                        path={
                            myMemberProfile ? `/group/${id}/myprofile` : `/matchmaking/${id}/start`
                        }
                    />
                    {otherMemberProfiles && (
                        <UListItem
                            title={`Member profiles ${matchmaking!.profiles!.length - 1}`}
                            icon={<IcCopy />}
                            useRadius={true}
                            path={`/group/${id}/users`}
                        />
                    )}
                </UListGroup>
            )}
            {organization && (
                <UListGroup header={organization.isCommunity ? 'Community' : 'Organization'}>
                    <UOrganizationView organization={organization} />
                </UListGroup>
            )}

            <UListGroup header="Featured" counter={featuredMembers.length}>
                {featuredMembers.map(member => (
                    <UUserView
                        key={'featured-member-' + member.user.id}
                        user={member.user}
                        badge={member.badge}
                        rightElement={
                            <GroupMemberMenu
                                group={group}
                                member={member}
                                onRemove={handleRemoveMember}
                            />
                        }
                    />
                ))}
            </UListGroup>

            <UListHeader text="Members" counter={membersCount || 0} />
            <UAddItem
                title="Add people"
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
        </UFlatList>
    );
});
