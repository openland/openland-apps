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
import { startLoader, stopLoader } from '../../components/ZGlobalLoader';
import { getMessenger } from '../../utils/messenger';
import { UserView } from './components/UserView';
import { useClient } from 'openland-api/useClient';
import ActionSheet, { ActionSheetBuilder } from 'openland-mobile/components/ActionSheet';
import Alert from 'openland-mobile/components/AlertBlanket';
import { NotificationSettings } from './components/NotificationSetting';
import { ThemeContext } from 'openland-mobile/themes/ThemeContext';
import { SFlatList } from 'react-native-s/SFlatList';
import { ZManageButton } from 'openland-mobile/components/ZManageButton';
import { ZListHeader } from 'openland-mobile/components/ZListHeader';
import { trackEvent } from 'openland-mobile/analytics';
import { PremiumBadge } from 'openland-mobile/components/PremiumBadge';
import { SUPER_ADMIN } from '../Init';
import { formatMoneyInterval } from 'openland-y-utils/wallet/Money';
import { ProfileDonationGroup } from './components/ProfileDonationGroup';

const ProfileGroupComponent = React.memo((props: PageProps) => {
    const theme = React.useContext(ThemeContext);
    const client = useClient();
    const roomId = props.router.params.id;

    const room = client.useRoomChat({ id: roomId }, { fetchPolicy: 'cache-and-network' })
        .room as RoomChat_room_SharedRoom;
    const initialMembers = client.useRoomMembersPaginated(
        { roomId: roomId, first: 10 },
        { fetchPolicy: 'cache-and-network' },
    ).members;

    const typeString = room.isChannel ? 'channel' : 'group';
    const [members, setMembers] = React.useState(initialMembers);
    const [loading, setLoading] = React.useState(false);

    React.useEffect(() => {
        members.map((u) => u.user.id).map(getMessenger().engine.getOnlines().onUserAppears);
    }, members);

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
        (user: UserShort) => {
            Alert.builder()
                .title(`Remove ${user.name} from ${typeString}?`)
                .button('Cancel', 'cancel')
                .action('Remove', 'destructive', async () => {
                    await client.mutateRoomKick({ userId: user.id, roomId });
                    await client.refetchRoomChat({ id: roomId });
                    await client.refetchRoomMembersShort({ roomId: roomId });
                    await client.refetchRoomFeaturedMembers({ roomId: roomId });

                    handleRemoveMember(user.id);
                })
                .show();
        },
        [roomId],
    );

    const handleMakeAdmin = React.useCallback(
        (user: UserShort) => {
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
                })
                .show();
        },
        [roomId],
    );

    const handleRevokeAdmin = React.useCallback(
        (user: UserShort) => {
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
                })
                .show();
        },
        [roomId],
    );

    const handleMemberLongPress = React.useCallback(
        (member: RoomMembersPaginated_members, canKick: boolean, canEdit: boolean) => {
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
                            () => handleMakeAdmin(user),
                            false,
                            require('assets/ic-star-24.png'),
                        );
                    } else if (member.role === RoomMemberRole.ADMIN) {
                        builder.action(
                            'Dismiss as admin',
                            () => handleRevokeAdmin(user),
                            false,
                            require('assets/ic-star-24.png'),
                        );
                    }
                }
                if (canKick) {
                    builder.action(
                        `Remove from ${typeString}`,
                        () => handleKick(user),
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

    const handleAddMember = React.useCallback(() => {
        trackEvent('invite_view', { invite_type: 'group' });
        Modals.showUserMuptiplePicker(
            props.router,
            {
                title: 'Add',
                action: async (users) => {
                    startLoader();
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
                    stopLoader();
                    props.router.back();
                },
            },
            room.isPremium ? 'Add people for free' : 'Add people',
            members.map((m) => m.user.id),
            [getMessenger().engine.user.id],
            { path: 'ProfileGroupLink', pathParams: { room } },
        );
    }, [members]);

    const handleManageClick = React.useCallback(() => {
        let builder = new ActionSheetBuilder();

        if (room.canEdit || SUPER_ADMIN) {
            builder.action(
                'Edit info',
                () => props.router.push('EditGroup', { id: room.id }),
                false,
                require('assets/ic-edit-24.png'),
            );
        }

        if (
            room.role === 'OWNER' ||
            room.role === 'ADMIN' ||
            (room.organization && (room.organization.isAdmin || room.organization.isOwner))
        ) {
            builder.action(
                'Advanced settings',
                () => props.router.push('EditGroupAdvanced', { id: room.id }),
                false,
                require('assets/ic-settings-24.png'),
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
        if (members.length < (room.membersCount || 0) && !loading) {
            setLoading(true);

            const loaded = (
                await client.queryRoomMembersPaginated(
                    {
                        roomId,
                        first: 10,
                        after: members[members.length - 1].user.id,
                    },
                    { fetchPolicy: 'network-only' },
                )
            ).members;

            setMembers((current) => [
                ...current,
                ...loaded.filter((m) => !current.find((m2) => m2.user.id === m.user.id)),
            ]);
            setLoading(false);
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

    let donateTo = room.owner && room.owner.firstName;
    let isYou = !!(room.owner && room.owner.isYou);
    let hasDonate = donateTo && !isYou;
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

            {donateTo && Platform.OS !== 'ios' && (
                <ProfileDonationGroup
                    headerMarginTop={!hasAbout ? 0 : undefined}
                    name={donateTo}
                    chatId={room.id}
                    shouldHide={isYou}
                />
            )}

            <ZListGroup
                header="Settings"
                headerMarginTop={(!hasDonate || Platform.OS === 'ios') && !hasAbout ? 0 : undefined}
            >
                <NotificationSettings id={room.id} mute={!!room.settings.mute} />
            </ZListGroup>

            <ZListHeader text="Members" counter={room.membersCount} />
            {(!room.isPremium || room.role === 'OWNER') && (
                <ZListItem
                    text="Add people"
                    leftIcon={require('assets/ic-add-glyph-24.png')}
                    onPress={handleAddMember}
                />
            )}
            {(room.role === 'ADMIN' || room.role === 'OWNER' || room.role === 'MEMBER') && (
                <ZListItem
                    leftIcon={require('assets/ic-link-glyph-24.png')}
                    text={`Invite with link`}
                    onPress={() => props.router.push('ProfileGroupLink', { room })}
                />
            )}

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
                            handleMemberLongPress(item, item.canKick, room.canEdit || SUPER_ADMIN)
                        }
                        onPress={() => props.router.push('ProfileUser', { id: item.user.id })}
                    />
                )}
                keyExtractor={(item, index) => index + '-' + item.user.id}
                ListHeaderComponent={content}
                onEndReached={handleLoadMore}
                refreshing={loading}
            />
        </>
    );
});

export const ProfileGroup = withApp(ProfileGroupComponent, {
    navigationAppearance: 'small-hidden',
});
