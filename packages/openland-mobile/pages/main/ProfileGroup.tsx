import * as React from 'react';
import { withApp } from '../../components/withApp';
import { Platform, Text, View } from 'react-native';
import { ZListGroup } from '../../components/ZListGroup';
import { ZListHero } from '../../components/ZListHero';
import { ZListItem } from '../../components/ZListItem';
import { Modals } from './modals/Modals';
import { PageProps } from '../../components/PageProps';
import { SHeader } from 'react-native-s/SHeader';
import {
    RoomMemberRole,
    UserShort,
    RoomChat_room_SharedRoom,
    RoomMembersPaginated_members,
} from 'openland-api/spacex.types';
import { getMessenger } from '../../utils/messenger';
import { UserView } from './components/UserView';
import { useClient } from 'openland-api/useClient';
import ActionSheet, { ActionSheetBuilder } from 'openland-mobile/components/ActionSheet';
import Toast from 'openland-mobile/components/Toast';
import Alert from 'openland-mobile/components/AlertBlanket';
import { SDeferred } from 'react-native-s/SDeferred';
import { NotificationSettings } from './components/NotificationSetting';
import { ThemeContext } from 'openland-mobile/themes/ThemeContext';
import { SFlatList, RenderLoader } from 'react-native-s/SFlatList';
import { ZManageButton } from 'openland-mobile/components/ZManageButton';
import { ZListHeader } from 'openland-mobile/components/ZListHeader';
import { trackEvent } from 'openland-mobile/analytics';
import { PremiumBadge } from 'openland-mobile/components/PremiumBadge';
import { formatMoneyInterval } from 'openland-y-utils/wallet/Money';
import { SUPER_ADMIN } from '../Init';
import { RoomMemberType } from './modals/MembersSearch';

interface ProfileGroupUsersListProps {
    roomId: string;
    membersCount: number;
    setMembers: React.Dispatch<React.SetStateAction<RoomMembersPaginated_members[]>>;
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
    members: RoomMembersPaginated_members[];
    loading: boolean;
}

interface ProfileGroupUsersListRef {
    handleLoadMore: () => Promise<void>;
}

const ProfileGroupUsersList = React.forwardRef(
    (props: ProfileGroupUsersListProps, ref: React.Ref<ProfileGroupUsersListRef>) => {
        const client = useClient();
        const initialMembers = client.useRoomMembersPaginated(
            { roomId: props.roomId, first: 10 },
            { fetchPolicy: 'network-only' },
        ).members;

        React.useEffect(() => {
            if (!props.members.length) {
                props.setMembers(initialMembers);
            }
        }, [initialMembers]);

        const handleLoadMore = React.useCallback(async () => {
            if (props.members.length < (props.membersCount || 0) && !props.loading) {
                props.setLoading(true);

                const loaded = (
                    await client.queryRoomMembersPaginated(
                        {
                            roomId: props.roomId,
                            first: 10,
                            after: props.members[props.members.length - 1].user.id,
                        },
                        { fetchPolicy: 'network-only' },
                    )
                ).members;

                props.setMembers((current) => [
                    ...current,
                    ...loaded.filter((m) => !current.find((m2) => m2.user.id === m.user.id)),
                ]);
                props.setLoading(false);
            }
        }, [props.roomId, props.members, props.loading]);

        React.useImperativeHandle(ref, () => ({
            handleLoadMore: handleLoadMore,
        }));

        return null;
    },
);

const ProfileGroupComponent = React.memo((props: PageProps) => {
    const theme = React.useContext(ThemeContext);
    const client = useClient();
    const roomId = props.router.params.id;

    const profilesRef = React.useRef<ProfileGroupUsersListRef>(null);

    const room = client.useRoomChat({ id: roomId }, { fetchPolicy: 'cache-and-network' }).room as RoomChat_room_SharedRoom;

    const typeString = room.isChannel ? 'channel' : 'group';
    const [members, setMembers] = React.useState<RoomMembersPaginated_members[]>([]);
    const [loading, setLoading] = React.useState(false);

    React.useEffect(() => {
        getMessenger().engine.getOnlines().onUsersAppear(members.map((u) => u.user.id));
    }, [members]);

    // callbacks
    const handleAddMembers = React.useCallback(
        (addedMembers: RoomMembersPaginated_members[]) => {
            setMembers((current) => [...current, ...addedMembers]);
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
        (memberId: string, newRole: RoomMemberRole) => {
            setMembers((current) =>
                current.map((m) => (m.user.id === memberId ? { ...m, role: newRole } : m)),
            );
        },
        [members],
    );

    const handleSend = React.useCallback(() => {
        props.router.pushAndReset('Conversation', { flexibleId: roomId });
    }, [roomId]);

    const handleLeave = React.useCallback(() => {
        Alert.builder()
            .title(`Leave ${typeString}?`)
            .message(
                room.isPremium
                    ? 'Leaving the group only removes it from your chat list. To cancel the associated subscription, visit Subscriptions section in your Account tab and cancel it from there.'
                    : 'You may not be able to join it again',
            )
            .button('Cancel', 'cancel')
            .action(`Leave`, 'destructive', async () => {
                await client.mutateRoomLeave({ roomId });
                await client.refetchRoomChat({ id: roomId });
                setTimeout(() => {
                    props.router.pushAndResetRoot('Home');
                }, 100);
            })
            .show();
    }, [roomId]);

    const handleKick = React.useCallback(
        (user: UserShort, onKick?: (memberId: string) => void) => {
            Alert.builder()
                .title(`Remove ${user.name} from ${typeString}?`)
                .button('Cancel', 'cancel')
                .action('Remove', 'destructive', async () => {
                    await client.mutateRoomKick({ userId: user.id, roomId });
                    await Promise.all([
                        client.refetchRoomChat({ id: roomId }),
                        client.refetchRoomMembersShort({ roomId: roomId }),
                        client.refetchRoomFeaturedMembers({ roomId: roomId }),
                    ]);

                    handleRemoveMember(user.id);
                    if (onKick) {
                        onKick(user.id);
                    }
                })
                .show();
        },
        [roomId],
    );

    const handleMakeAdmin = React.useCallback(
        (user: UserShort, onRoleChange?: (memberId: string, role: RoomMemberRole) => void) => {
            Alert.builder()
                .title(`Make ${user.name} admin?`)
                .button('Cancel', 'cancel')
                .action('Make', undefined, async () => {
                    await client.mutateRoomChangeRole({
                        userId: user.id,
                        roomId,
                        newRole: RoomMemberRole.ADMIN,
                    });
                    await client.refetchRoomMembersShort({ roomId: roomId });
                    handleChangeMemberRole(user.id, RoomMemberRole.ADMIN);
                    if (onRoleChange) {
                        onRoleChange(user.id, RoomMemberRole.ADMIN);
                    }
                })
                .show();
        },
        [roomId],
    );

    const handleRevokeAdmin = React.useCallback(
        (user: UserShort, onRoleChange?: (memberId: string, role: RoomMemberRole) => void) => {
            Alert.builder()
                .title(`Dismiss ${user.name} as admin?`)
                .button('Cancel', 'cancel')
                .action('Dismiss', 'destructive', async () => {
                    await client.mutateRoomChangeRole({
                        userId: user.id,
                        roomId,
                        newRole: RoomMemberRole.MEMBER,
                    });
                    await client.refetchRoomMembersShort({ roomId: roomId });
                    handleChangeMemberRole(user.id, RoomMemberRole.MEMBER);
                    if (onRoleChange) {
                        onRoleChange(user.id, RoomMemberRole.MEMBER);
                    }
                })
                .show();
        },
        [roomId],
    );

    const handleMemberLongPress = React.useCallback(
        (
            member: RoomMemberType,
            canKick: boolean,
            canEdit: boolean,
            callbacks?: {
                onRoleChange: (memberId: string, role: RoomMemberRole) => void,
                onKick: (memberId: string) => void,
            }
        ) => {
            let builder = ActionSheet.builder();

            let user = member.user;

            if (user.id !== getMessenger().engine.user.id) {
                builder.action(
                    'Send message',
                    () => props.router.push('Conversation', { id: user.id }),
                    false,
                    require('assets/ic-message-24.png'),
                );

                if (canEdit) {
                    if (member.role === RoomMemberRole.MEMBER) {
                        builder.action(
                            'Make admin',
                            () => handleMakeAdmin(user, callbacks?.onRoleChange),
                            false,
                            require('assets/ic-pro-24.png'),
                        );
                    } else if (member.role === RoomMemberRole.ADMIN) {
                        builder.action(
                            'Dismiss as admin',
                            () => handleRevokeAdmin(user, callbacks?.onRoleChange),
                            false,
                            require('assets/ic-pro-24.png'),
                        );
                    }
                }
                if (canKick) {
                    builder.action(
                        `Remove from ${typeString}`,
                        () => handleKick(user, callbacks?.onKick),
                        false,
                        require('assets/ic-leave-24.png'),
                    );
                }
            } else {
                builder.action(
                    `Leave ${typeString}`,
                    handleLeave,
                    false,
                    require('assets/ic-leave-24.png'),
                );
            }

            builder.show(true);
        },
        [roomId],
    );

    const memberInviteDisabled = room.organization && !room.organization.isAdmin && !room.organization.membersCanInvite;
    const hideOwnerLink = room.organization && room.organization.private && room.role === 'MEMBER';

    const handleAddMember = React.useCallback(() => {
        trackEvent('invite_view', { invite_type: 'group' });
        Modals.showUserMuptiplePicker(
            props.router,
            {
                title: 'Add',
                action: async (users) => {
                    const loader = Toast.loader();
                    loader.show();
                    try {
                        const addedMembers = (
                            await client.mutateRoomAddMembers({
                                invites: users.map((u) => ({
                                    userId: u.id,
                                    role: RoomMemberRole.MEMBER,
                                })),
                                roomId: room.id,
                            })
                        ).alphaRoomInvite;

                        handleAddMembers(addedMembers);
                    } catch (e) {
                        Alert.alert(e.message);
                    }
                    loader.hide();
                    props.router.back();
                },
            },
            room.isPremium ? 'Add people for free' : 'Add people',
            members.map((m) => m.user.id),
            [getMessenger().engine.user.id],
            hideOwnerLink ? undefined : { path: 'ProfileGroupLink', pathParams: { room } },
        );
    }, [members]);

    const onSharedPress = React.useCallback(() => {
        props.router.push('SharedMedia', { chatId: room.id });
    }, [room.id]);

    const handleManageClick = React.useCallback(() => {
        let builder = new ActionSheetBuilder();

        builder.action('Shared media', onSharedPress, false, require('assets/ic-attach-24.png'));

        if (room.canEdit) {
            builder.action(
                room.isChannel ? 'Edit channel' : 'Edit group',
                () => props.router.push('EditGroup', { id: room.id }),
                false,
                require('assets/ic-edit-24.png'),
            );
        }

        builder.action(
            `Leave ${typeString}`,
            handleLeave,
            false,
            require('assets/ic-leave-24.png'),
        );

        builder.show();
    }, [room]);

    const handleLoadMore = React.useCallback(async () => {
        if (profilesRef.current) {
            await profilesRef.current.handleLoadMore();
        }
    }, [room, roomId, members, loading]);

    let subtitle = (
        <>
            <Text allowFontScaling={false}>
                {(room.membersCount || 0) > 1
                    ? room.membersCount + ' members'
                    : (room.membersCount || 0) + ' member'}
            </Text>
            {/* {onlineCount > 0 && (<Text style={{ color: theme.accentPrimary }}>{'   '}{onlineCount} online</Text>)} */}
            {room.isPremium && room.premiumSettings && (
                <Text allowFontScaling={false}>
                    ,{' '}
                    {formatMoneyInterval(room.premiumSettings.price, room.premiumSettings.interval)}
                </Text>
            )}
        </>
    );

    const hasAbout = !!room.description && !!room.organization;
    const highlightGroup = room.kind === 'GROUP' && !room.isPremium;

    // let donateTo = room.owner && room.owner.firstName;
    // let isYou = !!(room.owner && room.owner.isYou);
    let hasDonate = false; // donateTo && !isYou;
    const content = (
        <>
            <ZListHero
                titleIcon={highlightGroup ? require('assets/ic-lock-16.png') : undefined}
                titleIconElement={
                    room.isPremium ? (
                        <View
                            marginRight={8}
                            marginTop={Platform.OS === 'ios' ? 2 : 4}
                            alignSelf="center"
                        >
                            <PremiumBadge />
                        </View>
                    ) : undefined
                }
                titleColor={highlightGroup ? theme.accentPositive : undefined}
                title={room.title}
                subtitle={subtitle}
                photo={room.photo}
                id={room.id}
                action={{
                    title: room.isChannel ? 'View channel' : 'Send message',
                    onPress: handleSend,
                }}
            />

            <ZListGroup header="About" headerMarginTop={0}>
                {!!room.description && <ZListItem text={room.description} multiline={true} />}
                {!!room.organization && (
                    <ZListItem
                        text={room.organization.name}
                        leftAvatar={{
                            photo: room.organization.photo,
                            id: room.organization.id,
                            title: room.organization.name,
                        }}
                        path="ProfileOrganization"
                        pathParams={{ id: room.organization.id }}
                    />
                )}
                {!!room.shortname && (
                    <ZListItem title="Shortname" text={'@' + room.shortname} copy={true} />
                )}
            </ZListGroup>

            {/* {donateTo && Platform.OS !== 'ios' && (
                <ProfileDonationGroup
                    headerMarginTop={!hasAbout ? 0 : undefined}
                    name={donateTo}
                    chatId={room.id}
                    shouldHide={isYou}
                />
            )} */}

            <ZListGroup
                header="Settings"
                headerMarginTop={(!hasDonate || Platform.OS === 'ios') && !hasAbout ? 0 : undefined}
            >
                <NotificationSettings id={room.id} mute={!!room.settings.mute} />
                <ZListItem
                    leftIcon={require('assets/ic-attach-glyph-24.png')}
                    text="Media, files, links"
                    onPress={onSharedPress}
                />
            </ZListGroup>

            <ZListHeader text="Members" counter={room.membersCount} />
            {(!room.isPremium || room.role === 'OWNER') && !memberInviteDisabled && (
                <ZListItem
                    text="Add people"
                    leftIcon={require('assets/ic-add-glyph-24.png')}
                    onPress={handleAddMember}
                />
            )}
            {!hideOwnerLink && !memberInviteDisabled && (
                <ZListItem
                    leftIcon={require('assets/ic-link-glyph-24.png')}
                    text={`Invite with link`}
                    onPress={() => props.router.push('ProfileGroupLink', { room })}
                />
            )}
            <ZListItem
                text="Search members"
                leftIcon={require('assets/ic-search-glyph-24.png')}
                onPress={() => Modals.showRoomMembersSearch({
                    router: props.router,
                    roomId: room.id,
                    membersCount: room.membersCount,
                    initialMembers: members,
                    onPress: (member: RoomMemberType) => props.router.push('ProfileUser', { id: member.user.id }),
                    onLongPress: (member: RoomMemberType, callbacks: {
                        onRoleChange: (memberId: string, role: RoomMemberRole) => void,
                        onKick: (memberId: string) => void,
                    }) => handleMemberLongPress(
                        member,
                        member.canKick,
                        room.role === 'OWNER' || room.role === 'ADMIN' || SUPER_ADMIN,
                        callbacks
                    ),
                })
                }
            />

            {room.featuredMembersCount > 0 && (
                <ZListItem
                    leftIcon={require('assets/ic-star-glyph-24.png')}
                    text="Featured members"
                    onPress={() => props.router.push('ProfileGroupFeatured', { id: room.id })}
                    description={room.featuredMembersCount + ''}
                />
            )}
        </>
    );

    return (
        <>
            <SHeader title={Platform.OS === 'android' ? 'Info' : room.title} />
            <ZManageButton onPress={handleManageClick} />

            <SFlatList
                data={members}
                renderItem={({ item }) => (
                    <UserView
                        memberRole={item.role}
                        badge={item.badge}
                        user={item.user}
                        onLongPress={() =>
                            handleMemberLongPress(
                                item,
                                item.canKick,
                                room.role === 'OWNER' || room.role === 'ADMIN' || SUPER_ADMIN,
                            )
                        }
                        onPress={() => props.router.push('ProfileUser', { id: item.user.id })}
                    />
                )}
                keyExtractor={(item, index) => index + '-' + item.user.id}
                ListHeaderComponent={content}
                ListFooterComponent={members.length === room.membersCount ? undefined : <RenderLoader />}
                onEndReached={handleLoadMore}
                refreshing={loading}
            />
            <React.Suspense fallback={null}>
                <SDeferred>
                    <ProfileGroupUsersList
                        loading={loading}
                        members={members}
                        membersCount={room.membersCount}
                        roomId={room.id}
                        setLoading={setLoading}
                        setMembers={setMembers}
                        ref={profilesRef}
                    />
                </SDeferred>
            </React.Suspense>
        </>
    );
});

export const ProfileGroup = withApp(ProfileGroupComponent, {
    navigationAppearance: 'small-hidden',
});
