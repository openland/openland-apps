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
import { MessengerContext } from 'openland-engines/MessengerEngine';
import { USearchInput, USearchInputRef } from 'openland-web/components/unicorn/USearchInput';
import { css, cx } from 'linaria';
import { debounce } from 'openland-y-utils/timer';
import { XView } from 'react-mental';
import { TextStyles } from 'openland-web/utils/TextStyles';
import { GroupUsersList, GroupUsersListRef } from './components/GroupUsersList';
import { useShortcuts } from 'openland-x/XShortcuts/useShortcuts';
import { NotFound } from 'openland-unicorn/NotFound';

const membersSearchStyle = css`
    width: 160px;
    will-change: width;
    transition: width 0.15s ease;

    &:focus-within {
        width: 240px;
    }
`;

const membersSearchFilledStyle = css`
    width: 240px;
`;

const MembersSearchInput = (props: {
    query: string,
    loading: boolean,
    onChange: (v: string) => void,
}) => {
    const { query, loading, onChange } = props;
    const searchInputRef = React.useRef<USearchInputRef>(null);
    const [searchFocused, setSearchFocused] = React.useState(false);
    useShortcuts({
        keys: ['Escape'],
        callback: () => {
            if (searchFocused) {
                onChange('');
                searchInputRef.current?.blur();
                return true;
            }
            return false;
        },
    });

    return (
        <div className={cx(membersSearchStyle, query.length > 0 && membersSearchFilledStyle)}>
            <USearchInput
                ref={searchInputRef}
                placeholder="Search"
                rounded={true}
                value={query}
                loading={loading}
                onChange={onChange}
                onFocus={() => setSearchFocused(true)}
                onBlur={() => setSearchFocused(false)}
            />
        </div>
    );
};

export const GroupProfileFragment = React.memo<{ id?: string }>((props) => {
    const client = useClient();
    const unicorn = useUnicorn();
    const onlines = React.useContext(MessengerContext).getOnlines();
    const roomId = props.id || unicorn.id;
    const group = client.useRoomChat(
        { id: roomId },
        { fetchPolicy: 'cache-and-network' },
    ).room;

    const profilesRef = React.useRef<GroupUsersListRef>(null);

    if (!group || group.__typename === 'PrivateRoom') {
        return <NotFound />;
    }

    const sharedRoom = group.__typename === 'SharedRoom' && group;
    let showInviteButton = sharedRoom;
    const onlyLinkInvite = sharedRoom && !(!sharedRoom.isPremium || sharedRoom.role === 'OWNER');

    if (sharedRoom && sharedRoom.organization && sharedRoom.organization.private && sharedRoom.role === 'MEMBER') {
        if (onlyLinkInvite) {
            showInviteButton = false;
        }
    }

    const featuredMembers = client.useRoomFeaturedMembers(
        { roomId },
        { fetchPolicy: 'cache-and-network' },
    ).roomFeaturedMembers;

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
        premiumSettings
    } = group;

    const [initialMembers, setInitialMembers] = React.useState<RoomMembersPaginated_members[]>([]);
    const [members, setMembers] = React.useState<RoomMembersPaginated_members[]>([]);
    const [loading, setLoading] = React.useState(true);
    const [membersQuery, setMembersQuery] = React.useState('');
    const [membersFetching, setMembersFetching] = React.useState({ loading: 0, hasNextPage: true, cursor: '' });
    const membersQueryRef = React.useRef('');
    const [hasSearched, setHasSearched] = React.useState(false);

    const loadSearchMembers = async (reseted?: boolean) => {
        let query = membersQueryRef.current;
        setMembersFetching(prev => ({ ...prev, loading: prev.loading + 1 }));
        const { edges, pageInfo } = (await client.queryRoomMembersSearch({
            cid: id,
            query,
            first: 10,
            after: reseted ? undefined : membersFetching.cursor
        },
            { fetchPolicy: 'network-only' }
        )).chatMembersSearch;
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
        setHasSearched(true);
    };

    const handleLoadMore = React.useCallback(
        async () => {
            if (membersQueryRef.current.length > 0) {
                if (!membersFetching.loading && membersFetching.hasNextPage) {
                    loadSearchMembers();
                }
                return;
            }

            if (profilesRef.current) {
                await profilesRef.current.handleLoadMore();
            }
        },
        [membersCount, members, loading, membersQuery, membersFetching],
    );

    const handleAddMembers = React.useCallback(
        (addedMembers: RoomMembersPaginated_members[]) => {
            setMembers(current => [...current, ...addedMembers]);

            onlines.onUsersAppear(addedMembers.map(m => m.user.id));
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

    React.useEffect(() => {
        return onlines.onSingleChange((user: string, online: boolean) => {
            setMembers(current => current.map(m => m.user.id === user && online !== m.user.online ? { ...m, user: { ...m.user, online, lastSeen: Date.now().toString() } } : m));
        });
    }, [members]);

    let descriptionHero = plural(membersCount || 0, ['member', 'members']);

    if (isPremium && premiumSettings) {
        descriptionHero += ', ' + formatMoneyInterval(premiumSettings.price, premiumSettings.interval);
    }

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
            setHasSearched(false);
            // refetch in case someone is removed
            let initial = (await client.queryRoomMembersPaginated(
                { roomId, first: 15 },
                { fetchPolicy: 'network-only' },
            )).members;
            setMembers(initial);
        }
    }, 100), [initialMembers]);

    const isSearching = membersQuery.length > 0;
    // compensate "add people" button and empty view when searching
    const heightCompensation = hasSearched ? (members.length === 0 ? -32 : 56) : 0;

    return (
        <>
            <UFlatList
                track="group_profile"
                loadMore={handleLoadMore}
                items={members}
                loading={loading || (isSearching && membersFetching.loading > 0 && members.length > 15)}
                title={title}
                listMinHeight={Math.min(56 * membersCount + heightCompensation, 700)}
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

                <UListHeader
                    text="Members"
                    counter={hasSearched ? undefined : (membersCount || 0)}
                    rightElement={(
                        <MembersSearchInput
                            query={membersQuery}
                            loading={membersFetching.loading > 0}
                            onChange={handleSearchChange}
                        />
                    )}
                />
                {showInviteButton && !hasSearched && (
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
                    <XView paddingTop={32} paddingBottom={32} alignItems="center" {...TextStyles.Body} color="var(--foregroundSecondary)">
                        Nobody found
                    </XView>
                )}
            </UFlatList>

            <React.Suspense fallback={null}>
                <GroupUsersList
                    loading={loading}
                    members={members}
                    membersCount={membersCount}
                    roomId={id}
                    setLoading={setLoading}
                    setMembers={setMembers}
                    setInitialMembers={setInitialMembers}
                    ref={profilesRef}
                />
            </React.Suspense>
        </>
    );
});
