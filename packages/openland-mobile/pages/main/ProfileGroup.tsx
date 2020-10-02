import * as React from 'react';
import { withApp } from '../../components/withApp';
import { Platform, View, Share } from 'react-native';
import { ZListGroup } from '../../components/ZListGroup';
import { ZListItem } from '../../components/ZListItem';
import { Modals } from './modals/Modals';
import { PageProps } from '../../components/PageProps';
import { RoomMemberRole, UserShort, RoomChat_room_SharedRoom, SharedRoomKind, SharedRoomMembershipStatus } from 'openland-api/spacex.types';
import { getMessenger } from '../../utils/messenger';
import { UserView } from './components/UserView';
import { useClient } from 'openland-api/useClient';
import ActionSheet, { ActionSheetBuilder } from 'openland-mobile/components/ActionSheet';
import Toast from 'openland-mobile/components/Toast';
import Alert from 'openland-mobile/components/AlertBlanket';
import { SDeferred } from 'react-native-s/SDeferred';
import { ThemeContext } from 'openland-mobile/themes/ThemeContext';
import { SFlatList, RenderLoader } from 'react-native-s/SFlatList';
import { ZListHeader } from 'openland-mobile/components/ZListHeader';
import { trackEvent } from 'openland-mobile/analytics';
import { PremiumBadge } from 'openland-mobile/components/PremiumBadge';
import { formatMoneyInterval } from 'openland-y-utils/wallet/Money';
import { SUPER_ADMIN } from '../Init';
import { RoomMemberType } from './modals/MembersSearch';
import { EntityMembersManager, EntityMembersManagerRef, GroupMember } from 'openland-y-utils/members/EntityMembersManager';
import { ZHero } from 'openland-mobile/components/ZHero';
import { ZHeroAction } from 'openland-mobile/components/ZHeroAction';
import { plural } from 'openland-y-utils/plural';
import { SHeader } from 'react-native-s/SHeader';
import { ChatJoin } from './components/ChatJoin';

const ProfileGroupComponent = React.memo((props: PageProps) => {
    const theme = React.useContext(ThemeContext);
    const client = useClient();
    const roomId = props.router.params.id;

    const profilesRef = React.useRef<EntityMembersManagerRef>(null);

    const group = client.useRoomChat({ id: roomId }, { fetchPolicy: 'cache-and-network' }).room as RoomChat_room_SharedRoom;
    const onlines = getMessenger().engine.getOnlines();
    const typeString = group.isChannel ? 'channel' : 'group';
    const [members, setMembers] = React.useState<GroupMember[]>([]);
    const [loading, setLoading] = React.useState(false);
    const [muted, setMuted] = React.useState(group.settings.mute);

    if (group.membership !== SharedRoomMembershipStatus.MEMBER) {
        return <ChatJoin room={group} theme={theme} router={props.router} />;
    }

    // callbacks
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
                group.isPremium
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

    const memberInviteDisabled = group.organization && !group.organization.isAdmin && !group.organization.membersCanInvite;
    const hideOwnerLink = group.organization && group.organization.private && group.role === 'MEMBER';

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
                                roomId: group.id,
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
            group.isPremium ? 'Add people for free' : 'Add people',
            members.map((m) => m.user.id),
            [getMessenger().engine.user.id],
            hideOwnerLink ? undefined : { path: 'ProfileGroupLink', pathParams: { room: group } },
        );
    }, [members]);

    const onSharedPress = React.useCallback(() => {
        props.router.push('SharedMedia', { chatId: group.id });
    }, [group.id]);

    const handleManageClick = React.useCallback(() => {
        let builder = new ActionSheetBuilder();

        if (group.canEdit) {
            builder.action(
                group.isChannel ? 'Edit channel' : 'Edit group',
                () => props.router.push('EditGroup', { id: group.id }),
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
    }, [group]);

    const handleSharePress = React.useCallback(() => {
        Share.share({ url: `https://openland.com/${group.shortname || group.id}` });
    }, [group.shortname, group.id]);

    const handleLoadMore = React.useCallback(async () => {
        if (profilesRef.current) {
            await profilesRef.current.handleLoadMore();
        }
    }, [members, loading]);

    const highlightGroup = group.kind === 'GROUP' && !group.isPremium;
    const content = (
        <>
            <ZHero
                photo={group.photo}
                id={group.id}
                title={group.title}
                titleIcon={highlightGroup ? require('assets/ic-lock-16.png') : undefined}
                titleIconElement={
                    group.isPremium ? (
                        <View
                            marginRight={8}
                            marginTop={Platform.OS === 'ios' ? 2 : 4}
                            alignSelf="center"
                        >
                            <PremiumBadge />
                        </View>
                    ) : undefined
                }
                titleIconRight={group.featured ? require('assets/ic-featured-16.png') : undefined}
                titleIconRightColor={theme.accentNegative}
                titleColor={highlightGroup ? theme.accentPositive : undefined}
                subtitle={plural(group.membersCount, ['member', 'members'])}
                actionPrimary={{
                    title: group.isChannel ? 'View channel' : 'View chat',
                    onPress: handleSend
                }}
            >
                <ZHeroAction
                    icon={muted ? require('assets/ic-notifications-24.png') : require('assets/ic-notifications-off-24.png')}
                    title={muted ? 'Unmute' : 'Mute'}
                    onPress={() => {
                        setMuted(!muted);
                        client.mutateRoomSettingsUpdate({ roomId: group.id, settings: { mute: !muted } });
                    }}
                />
                {group.kind === SharedRoomKind.PUBLIC && (
                    <ZHeroAction
                        icon={require('assets/ic-share-24.png')}
                        title="Share"
                        onPress={handleSharePress}
                    />
                )}
                <ZHeroAction
                    icon={require('assets/ic-more-h-24.png')}
                    title="More"
                    onPress={handleManageClick}
                />
            </ZHero>

            <ZListGroup header="About" useSpacer={true}>
                {!!group.description && <ZListItem multiline={true} text={group.description} copy={true} />}
                {!!group.description && <View height={8} />}
                {!!group.shortname && (
                    <ZListItem
                        text={group.shortname}
                        leftIcon={require('assets/ic-at-24.png')}
                        small={true}
                        onPress={handleSharePress}
                        onLongPress={handleSharePress}
                    />
                )}
                {group.isPremium && !!group.premiumSettings && (
                    <ZListItem
                        text={formatMoneyInterval(group.premiumSettings.price, group.premiumSettings.interval)}
                        leftIcon={require('assets/ic-tag-24.png')}
                        small={true}
                    />
                )}
            </ZListGroup>

            {!!group.organization && (
                <ZListGroup header={group.organization.isCommunity ? 'Community' : 'Organization'} useSpacer={true}>
                    <ZListItem
                        text={group.organization.name}
                        subTitle={group.organization.about}
                        leftAvatar={{
                            photo: group.organization.photo,
                            id: group.organization.id,
                            title: group.organization.name,
                        }}
                        path="ProfileOrganization"
                        pathParams={{ id: group.organization.id }}
                    />
                </ZListGroup>
            )}

            <ZListGroup useSpacer={true}>
                <ZListItem
                    leftIcon={require('assets/ic-attach-glyph-24.png')}
                    text="Media, files, links"
                    onPress={onSharedPress}
                />
            </ZListGroup>

            <ZListHeader text="Members" counter={group.membersCount} useSpacer={true} />
            {(!group.isPremium || group.role !== 'MEMBER') && !memberInviteDisabled && (
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
                    onPress={() => props.router.push('ProfileGroupLink', { room: group })}
                />
            )}
            <ZListItem
                text="Search members"
                leftIcon={require('assets/ic-search-glyph-24.png')}
                onPress={() => Modals.showRoomMembersSearch({
                    router: props.router,
                    roomId: group.id,
                    membersCount: group.membersCount,
                    initialMembers: members,
                    onPress: (member: RoomMemberType) => props.router.push('ProfileUser', { id: member.user.id }),
                    onLongPress: (member: RoomMemberType, callbacks: {
                        onRoleChange: (memberId: string, role: RoomMemberRole) => void,
                        onKick: (memberId: string) => void,
                    }) => handleMemberLongPress(
                        member,
                        member.canKick,
                        group.role === 'OWNER' || group.role === 'ADMIN' || SUPER_ADMIN,
                        callbacks
                    ),
                })
                }
            />

            {group.featuredMembersCount > 0 && (
                <ZListItem
                    leftIcon={require('assets/ic-star-glyph-24.png')}
                    text="Featured members"
                    onPress={() => props.router.push('ProfileGroupFeatured', { id: group.id })}
                    description={group.featuredMembersCount + ''}
                />
            )}
        </>
    );

    return (
        <>
            <SHeader title={Platform.OS === 'android' ? 'Info' : group.title} />

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
                                group.role === 'OWNER' || group.role === 'ADMIN' || SUPER_ADMIN,
                            )
                        }
                        onPress={() => props.router.push('ProfileUser', { id: item.user.id })}
                    />
                )}
                keyExtractor={(item, index) => index + '-' + item.user.id}
                ListHeaderComponent={content}
                ListFooterComponent={members.length === group.membersCount ? undefined : <RenderLoader />}
                onEndReached={handleLoadMore}
                refreshing={loading}
            />
            <React.Suspense fallback={null}>
                <SDeferred>
                    <EntityMembersManager
                        isGroup={true}
                        loading={loading}
                        members={members}
                        membersCount={group.membersCount}
                        entityId={group.id}
                        setLoading={setLoading}
                        setMembers={setMembers}
                        ref={profilesRef}
                        onlineWatcher={onlines}
                    />
                </SDeferred>
            </React.Suspense>
        </>
    );
});

export const ProfileGroup = withApp(ProfileGroupComponent, {
    navigationAppearance: 'small-hidden',
});
