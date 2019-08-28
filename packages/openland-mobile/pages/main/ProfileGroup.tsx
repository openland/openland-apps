import * as React from 'react';
import { withApp } from '../../components/withApp';
import { Platform, Text } from 'react-native';
import { ZListGroup } from '../../components/ZListGroup';
import { ZListHero } from '../../components/ZListHero';
import { ZListItem } from '../../components/ZListItem';
import { Modals } from './modals/Modals';
import { PageProps } from '../../components/PageProps';
import { SHeader } from 'react-native-s/SHeader';
import { RoomMemberRole, UserShort, Room_room_SharedRoom_members, RoomWithoutMembers_room_SharedRoom, RoomMembersPaginated_members } from 'openland-api/Types';
import { startLoader, stopLoader } from '../../components/ZGlobalLoader';
import { getMessenger } from '../../utils/messenger';
import { UserView } from './components/UserView';
import { useClient } from 'openland-mobile/utils/useClient';
import ActionSheet, { ActionSheetBuilder } from 'openland-mobile/components/ActionSheet';
import Alert from 'openland-mobile/components/AlertBlanket';
import { NotificationSettings } from './components/NotificationSetting';
import { ThemeContext } from 'openland-mobile/themes/ThemeContext';
import { XMemo } from 'openland-y-utils/XMemo';
import { SFlatList } from 'react-native-s/SFlatList';
import { getChatOnlinesCount } from 'openland-y-utils/getChatOnlinesCount';
import { ZManageButton } from 'openland-mobile/components/ZManageButton';
import { ZListHeader } from 'openland-mobile/components/ZListHeader';

const ProfileGroupComponent = XMemo<PageProps>((props) => {
    const theme = React.useContext(ThemeContext);
    const client = useClient();
    const roomId = props.router.params.id;

    const room = client.useRoomWithoutMembers({ id: roomId }, { fetchPolicy: 'cache-and-network' }).room as RoomWithoutMembers_room_SharedRoom;
    const initialMembers = client.useRoomMembersPaginated({ roomId: roomId, first: 10 }, { fetchPolicy: 'cache-and-network' }).members;

    const typeString = room.isChannel ? 'channel' : 'group';
    const [members, setMembers] = React.useState(initialMembers);
    const [loading, setLoading] = React.useState(false);

    const [onlineCount, setOnlineCount] = React.useState<number>(0);

    React.useEffect(() => {
        members.map(u => u.user.id).map(getMessenger().engine.getOnlines().onUserAppears);
    }, members);

    getChatOnlinesCount(roomId, client, (count) => setOnlineCount(count));

    // callbacks
    const handleAddMembers = React.useCallback((addedMembers: RoomMembersPaginated_members[]) => {
        setMembers(current => [...current, ...addedMembers]);
    }, [members]);

    const handleRemoveMember = React.useCallback((memberId: string) => {
        setMembers(current => current.filter(m => m.user.id !== memberId));
    }, [members]);

    const handleChangeMemberRole = React.useCallback((memberId: string, newRole: RoomMemberRole) => {
        setMembers(current => current.map(m => m.user.id === memberId ? { ...m, role: newRole } : m));
    }, [members]);

    const handleSend = React.useCallback(() => {
        props.router.pushAndReset('Conversation', { flexibleId: roomId });
    }, [roomId]);

    const handleLeave = React.useCallback(() => {
        Alert.builder()
            .title(`Leave ${typeString}?`)
            .message('You may not be able to join it again')
            .button('Cancel', 'cancel')
            .action(`Leave ${typeString}`, 'destructive', async () => {
                await client.mutateRoomLeave({ roomId });
                props.router.pushAndResetRoot('Home');
            })
            .show();
    }, [roomId]);

    const handleKick = React.useCallback((user: UserShort) => {
        Alert.builder().title(`Remove ${user.name} from ${typeString}?`)
            .button('Cancel', 'cancel')
            .action('Remove', 'destructive', async () => {
                await client.mutateRoomKick({ userId: user.id, roomId });
                await client.refetchRoomWithoutMembers({ id: roomId });

                handleRemoveMember(user.id);
            })
            .show();
    }, [roomId]);

    const handleMakeAdmin = React.useCallback((user: UserShort) => {
        Alert.builder().title(`Make ${user.name} admin?`)
            .button('Cancel', 'cancel')
            .action('Make', undefined, async () => {
                await client.mutateRoomChangeRole({ userId: user.id, roomId, newRole: RoomMemberRole.ADMIN });

                handleChangeMemberRole(user.id, RoomMemberRole.ADMIN);
            })
            .show();
    }, [roomId]);

    const handleRevokeAdmin = React.useCallback((user: UserShort) => {
        Alert.builder().title(`Dismiss ${user.name} as admin?`)
            .button('Cancel', 'cancel')
            .action('Dismiss', 'destructive', async () => {
                await client.mutateRoomChangeRole({ userId: user.id, roomId, newRole: RoomMemberRole.MEMBER });

                handleChangeMemberRole(user.id, RoomMemberRole.MEMBER);
            })
            .show();
    }, [roomId]);

    const handleMemberLongPress = React.useCallback((member: Room_room_SharedRoom_members, canKick: boolean, canEdit: boolean) => {
        let builder = ActionSheet.builder();

        let user = member.user;

        if (user.id !== getMessenger().engine.user.id) {
            builder.action('Send message', () => props.router.push('Conversation', { id: user.id }), false, require('assets/ic-message-24.png'));

            if (canEdit) {
                if (member.role === RoomMemberRole.MEMBER) {
                    builder.action('Make admin', () => handleMakeAdmin(user), false, require('assets/ic-star-24.png'));
                } else if (member.role === RoomMemberRole.ADMIN) {
                    builder.action('Dismiss as admin', () => handleRevokeAdmin(user), false, require('assets/ic-star-24.png'));
                }
            }
            if (canKick) {
                builder.action(`Remove from ${typeString}`, () => handleKick(user), false, require('assets/ic-leave-24.png'));
            }
        } else {
            builder.action(`Leave ${typeString}`, handleLeave, false, require('assets/ic-leave-24.png'));
        }

        builder.show(true);
    }, [roomId]);

    const handleAddMember = React.useCallback(() => {
        Modals.showUserMuptiplePicker(props.router,
            {
                title: 'Add',
                action: async (users) => {
                    startLoader();
                    try {
                        const addedMembers = (await client.mutateRoomAddMembers({
                            invites: users.map(u => ({ userId: u.id, role: RoomMemberRole.MEMBER })),
                            roomId: room.id
                        })).alphaRoomInvite;

                        handleAddMembers(addedMembers);
                    } catch (e) {
                        Alert.alert(e.message);
                    }
                    stopLoader();
                    props.router.back();
                }
            },
            'Add people',
            members.map(m => m.user.id),
            [getMessenger().engine.user.id],
            { path: 'ProfileGroupLink', pathParams: { room } }
        );
    }, [members]);

    const handleManageClick = React.useCallback(() => {
        let builder = new ActionSheetBuilder();

        if (room.canEdit) {
            builder.action('Edit info', () => props.router.push('EditGroup', { id: room.id }), false, require('assets/ic-edit-24.png'));
        }

        if (room.role === 'OWNER' || room.role === 'ADMIN' || (room.organization && (room.organization.isAdmin || room.organization.isOwner))) {
            builder.action('Advanced settings', () => props.router.push('EditGroupAdvanced', { id: room.id }), false, require('assets/ic-settings-24.png'));
        }

        builder.action(`Leave ${typeString}`, handleLeave, false, require('assets/ic-leave-24.png'));

        builder.show();
    }, [room]);

    const handleLoadMore = React.useCallback(async () => {
        if (members.length < (room.membersCount || 0) && !loading) {
            setLoading(true);

            const loaded = (await client.queryRoomMembersPaginated({
                roomId,
                first: 10,
                after: members[members.length - 1].user.id,
            }, { fetchPolicy: 'network-only' })).members;

            setMembers(current => [...current, ...loaded.filter(m => !current.find(m2 => m2.user.id === m.user.id))]);
            setLoading(false);
        }
    }, [room, roomId, members, loading]);

    let subtitle = (
        <>
            <Text>{(room.membersCount || 0) > 1 ? room.membersCount + ' members' : (room.membersCount || 0) + ' member'}</Text>
            {onlineCount > 0 && (<Text style={{ color: theme.accentPrimary }}>{'   '}{onlineCount} online</Text>)}
        </>
    );

    const hasAbout = !!room.description && !!room.organization;

    const content = (
        <>
            <ZListHero
                titleIcon={room.isChannel ? require('assets/ic-channel-18.png') : room.kind === 'GROUP' ? require('assets/ic-lock-16.png') : undefined}
                titleColor={room.kind === 'GROUP' ? theme.accentPositive : undefined}
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
                {!!room.description && (
                    <ZListItem
                        text={room.description}
                        multiline={true}
                    />
                )}
                {!!room.organization && (
                    <ZListItem
                        text={room.organization.name}
                        leftAvatar={{
                            photo: room.organization.photo,
                            key: room.organization.id,
                            title: room.organization.name
                        }}
                        path="ProfileOrganization"
                        pathParams={{ id: room.organization.id }}
                    />
                )}
            </ZListGroup>

            <ZListGroup header="Settings" headerMarginTop={!hasAbout ? 0 : undefined}>
                <NotificationSettings id={room.id} mute={!!room.settings.mute} />
            </ZListGroup>

            <ZListHeader text="Members" counter={room.membersCount} />
            <ZListItem
                text="Add people"
                leftIcon={require('assets/ic-add-24.png')}
                onPress={handleAddMember}
            />

            {(room.role === 'ADMIN' || room.role === 'OWNER' || room.role === 'MEMBER') && (
                <ZListItem
                    leftIcon={Platform.OS === 'android' ? require('assets/ic-link-24.png') : require('assets/ic-link-fill-24.png')}
                    text={`Invite to ${typeString} with a link`}
                    onPress={() => props.router.present('ProfileGroupLink', { room })}
                />
            )}

            {room.featuredMembersCount > 0 && (
                <ZListItem
                    leftIcon={require('assets/ic-star-admin-16.png')}
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
                        role={item.role}
                        badge={item.badge}
                        user={item.user}
                        onLongPress={() => handleMemberLongPress(item, item.canKick, room.canEdit)}
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

export const ProfileGroup = withApp(ProfileGroupComponent, { navigationAppearance: 'small-hidden' });