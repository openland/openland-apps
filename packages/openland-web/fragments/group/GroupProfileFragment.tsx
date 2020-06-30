import * as React from 'react';
import { useClient } from 'openland-api/useClient';
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
import { GroupMenu } from './components/GroupMenu';
import { showAddMembersModal } from '../chat/showAddMembersModal';
import { UAddItem } from 'openland-web/components/unicorn/templates/UAddButton';
import { UListText } from 'openland-web/components/unicorn/UListText';
import { GroupMemberMenu } from './components/GroupMemberMenu';
import { RoomMembersPaginated_members, RoomMemberRole } from 'openland-api/spacex.types';
import { PremiumBadge } from 'openland-web/components/PremiumBadge';
import { formatMoneyInterval } from 'openland-y-utils/wallet/Money';
import { ProfileDonationButtons } from 'openland-web/components/ProfileDonationButtons';

export const GroupProfileFragment = React.memo<{ id?: string }>((props) => {
    const client = useClient();
    const unicorn = useUnicorn();
    const roomId = props.id || unicorn.id;
    const group = client.useRoomChat(
        { id: roomId },
        { fetchPolicy: 'cache-and-network' },
    ).room;

    if (!group || group.__typename === 'PrivateRoom') {
        return null;
    }

    const featuredMembers = client.useRoomFeaturedMembers(
        { roomId },
        { fetchPolicy: 'cache-and-network' },
    ).roomFeaturedMembers;
    const initialMembers = client.useRoomMembersPaginated(
        { roomId, first: 15 },
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
        isPremium,
        premiumSettings,
        owner
    } = group;

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

    const updateUserRole = React.useCallback(
        (uid: string, role: RoomMemberRole) => {
            setMembers(current => current.map(m => m.user.id === uid ? { ...m, role } : m));
        },
        [members],
    );

    let descriptionHero = plural(membersCount || 0, ['member', 'members']);

    if (isPremium && premiumSettings) {
        descriptionHero += ', ' + formatMoneyInterval(premiumSettings.price, premiumSettings.interval);
    }

    return (
        <UFlatList
            track="group_profile"
            loadMore={handleLoadMore}
            items={members}
            loading={loading}
            title={title}
            renderItem={member => (
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
            )}
            padded={false}
        >
            <UListHero
                title={title}
                titleIcon={isPremium ? <PremiumBadge /> : undefined}
                description={descriptionHero}
                avatar={{ photo, id, title }}
            >
                <UButton text="View" path={'/mail/' + id} />
                <UNotificationsSwitch id={id} mute={!!settings.mute} marginLeft={16} />
                <GroupMenu group={group} />
            </UListHero>

            <UListGroup header="About">
                {!!description && <UListText value={description} />}
            </UListGroup>
            {owner && (
                <ProfileDonationButtons shouldHide={owner.isYou} name={owner.firstName} chatId={id} chatTitle={title} />
            )}
            {organization && (
                <UListGroup header={organization.isCommunity ? 'Community' : 'Organization'}>
                    <UOrganizationView organization={organization} />
                </UListGroup>
            )}

            <UListGroup header="Featured" counter={featuredMembers.length}>
                {featuredMembers.map(member => (
                    <UUserView
                        key={'featured-member-' + member.user.id + '-' + member.role}
                        user={member.user}
                        badge={member.badge}
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
