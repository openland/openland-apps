import * as React from 'react';
import { withApp } from '../../components/withApp';
import { Platform, Text } from 'react-native';
import { ZListItemGroup } from '../../components/ZListItemGroup';
import { ZListItemHeader } from '../../components/ZListItemHeader';
import { ZListItem } from '../../components/ZListItem';
import { Modals } from './modals/Modals';
import { PageProps } from '../../components/PageProps';
import { SHeader } from 'react-native-s/SHeader';
import { RoomMemberRole, UserShort, Room_room_SharedRoom_members, RoomWithoutMembers_room_SharedRoom } from 'openland-api/Types';
import { startLoader, stopLoader } from '../../components/ZGlobalLoader';
import { getMessenger } from '../../utils/messenger';
import { SHeaderButton } from 'react-native-s/SHeaderButton';
import { UserView } from './components/UserView';
import { useClient } from 'openland-mobile/utils/useClient';
import { ActionSheet, ActionSheetBuilder } from 'openland-mobile/components/ActionSheet';
import { Alert } from 'openland-mobile/components/AlertBlanket';
import { NotificationSettings } from './components/NotificationSetting';
import { ThemeContext } from 'openland-mobile/themes/ThemeContext';
import { XMemo } from 'openland-y-utils/XMemo';
import { SFlatList } from 'react-native-s/SFlatList';
import { getChatOnlinesCount } from 'openland-y-utils/getChatOnlinesCount';

const ProfileGroupComponent = XMemo<PageProps>((props) => {
    const theme = React.useContext(ThemeContext);
    const client = useClient();
    const roomId = props.router.params.id;

    const room = client.useRoomWithoutMembers({ id: roomId }, { fetchPolicy: 'cache-and-network' }).room as RoomWithoutMembers_room_SharedRoom;
    const initialMembers = client.useRoomMembersPaginated({ roomId: roomId, first: 10 }, { fetchPolicy: 'cache-and-network' }).members;

    const [members, setMembers] = React.useState(initialMembers);
    const [loading, setLoading] = React.useState(false);

    const [onlineCount, setOnlineCount] = React.useState<number>(0);

    React.useEffect(() => {
        members.map(u => u.user.id).map(getMessenger().engine.getOnlines().onUserAppears);
    }, members);

    getChatOnlinesCount(roomId, client, (count) => setOnlineCount(count));

    const chatTypeStr = room.isChannel ? 'channel' : 'group';

    // callbacks
    const resetMembersList = React.useCallback(async () => {
        const loaded = await client.queryRoomMembersPaginated({
            roomId,
            first: 10,
        }, { fetchPolicy: 'network-only' });

        setMembers(loaded.members);
    }, [roomId]);

    const handleSend = React.useCallback(() => {
        props.router.pushAndReset('Conversation', { flexibleId: roomId });
    }, [roomId]);

    const handleLeave = React.useCallback(() => {
        Alert.builder().title(`Are you sure you want to leave ${chatTypeStr}? You may not be able to join it again.`)
            .button('Cancel', 'cancel')
            .action('Leave and delete', 'destructive', async () => {
                await client.mutateRoomLeave({ roomId });
                props.router.pushAndResetRoot('Home');
            })
            .show();
    }, [roomId]);

    const handleKick = React.useCallback((user: UserShort) => {
        Alert.builder().title(`Are you sure you want to kick ${user.name}?`)
            .button('Cancel', 'cancel')
            .action('Kick', 'destructive', async () => {
                await client.mutateRoomKick({ userId: user.id, roomId });
                await resetMembersList();
            })
            .show();
    }, [roomId]);

    const handleMakeAdmin = React.useCallback((user: UserShort) => {
        Alert.builder().title(`Are you sure you want to make ${user.name} admin?`)
            .button('Cancel', 'cancel')
            .action('Promote', 'destructive', async () => {
                await client.mutateRoomChangeRole({ userId: user.id, roomId, newRole: RoomMemberRole.ADMIN });
                await resetMembersList();
            })
            .show();
    }, [roomId]);

    const handleMemberLongPress = React.useCallback((member: Room_room_SharedRoom_members, canKick: boolean, canEdit: boolean) => {
        let builder = ActionSheet.builder();

        let user = member.user;

        if (user.id !== getMessenger().engine.user.id) {
            builder.action('Info', () => props.router.push('ProfileUser', { id: user.id }));

            if (canEdit) {
                if (member.role === RoomMemberRole.MEMBER) {
                    builder.action('Make admin', () => handleMakeAdmin(user));
                }
            }
            if (canKick) {
                builder.action('Kick', () => handleKick(user), true);
            }
        } else {
            builder.action('Leave', handleLeave, true);
        }

        builder.show();
    }, [roomId]);

    const handleAddMember = React.useCallback(() => {
        Modals.showUserMuptiplePicker(props.router,
            {
                title: 'Add', action: async (users) => {
                    startLoader();
                    try {
                        await client.mutateRoomAddMembers({ invites: users.map(u => ({ userId: u.id, role: RoomMemberRole.MEMBER })), roomId: room.id });
                        await resetMembersList();
                    } catch (e) {
                        Alert.alert(e.message);
                    }
                    stopLoader();
                }
            },
            'Add members',
            members.map(m => m.user.id),
            { path: 'ProfileGroupLink', pathParams: { room } }
        );
    }, [members]);

    const handleManageClick = React.useCallback(() => {
        let builder = new ActionSheetBuilder();

        if (room.canEdit) {
            builder.action('Edit', () => props.router.push('EditGroup', { id: room.id }));
        }

        if (room.role === 'OWNER' || room.role === 'ADMIN' || (room.organization && (room.organization.isAdmin || room.organization.isOwner))) {
            builder.action('Advanced settings', () => props.router.push('EditGroupAdvanced', { id: room.id }));
        }

        builder.action('Leave and delete', handleLeave, true);

        builder.show();
    }, [room]);

    const handleLoadMore = React.useCallback(async () => {
        if (members.length < (room.membersCount || 0) && !loading) {
            setLoading(true);

            const loaded = await client.queryRoomMembersPaginated({
                roomId,
                first: 10,
                after: members[members.length - 1].user.id,
            }, { fetchPolicy: 'network-only' });

            setMembers([...members, ...loaded.members.filter(m => !members.find(m2 => m2.user.id === m.user.id))]);
            setLoading(false);
        }
    }, [room, roomId, members, loading]);

    let subtitle = (
        <>
            <Text>{(room.membersCount || 0) > 1 ? room.membersCount + ' members' : (room.membersCount || 0) + ' member'}</Text>
            {onlineCount > 0 && (<Text style={{ color: theme.accentColor }}>{'   '}{onlineCount} online</Text>)}
        </>
    );

    const manageIcon = Platform.OS === 'android' ? require('assets/ic-more-android-24.png') : require('assets/ic-more-24.png');

    const content = (
        <>
            <ZListItemHeader
                titleIcon={room.isChannel ? require('assets/ic-channel-18.png') : room.kind === 'GROUP' ? require('assets/ic-lock-18.png') : undefined}
                titleColor={room.kind === 'GROUP' ? theme.dialogTitleSecureColor : undefined}
                title={room.title}
                subtitle={subtitle}
                photo={room.photo}
                id={room.id}
                action={room.isChannel ? "View channel" : "Send message"}
                onPress={handleSend}
            />

            <ZListItemGroup header="About" divider={false}>
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
            </ZListItemGroup>

            <ZListItemGroup header={Platform.OS === 'android' ? null : 'Settings'} divider={false}>
                <NotificationSettings id={room.id} mute={!!room.settings.mute} />
            </ZListItemGroup>

            <ZListItemGroup header="Members" divider={false} counter={room.membersCount}>
                <ZListItem
                    text="Add members"
                    leftIcon={require('assets/ic-add-24.png')}
                    onPress={handleAddMember}
                />

                {(room.role === 'ADMIN' || room.role === 'OWNER' || room.role === 'MEMBER') && (
                    <ZListItem
                        leftIcon={Platform.OS === 'android' ? require('assets/ic-link-24.png') : require('assets/ic-link-fill-24.png')}
                        text={`Invite to ${chatTypeStr} with a link`}
                        onPress={() => props.router.present('ProfileGroupLink', { room })}
                        navigationIcon={false}
                    />
                )}
            </ZListItemGroup>
        </>
    );

    return (
        <>
            <SHeader title={room.title} />
            <SHeaderButton title="Manage" icon={manageIcon} onPress={handleManageClick} />

            <SFlatList
                data={members}
                renderItem={({ item }) => (
                    <UserView
                        isAdmin={item.role === 'OWNER' ? 'owner' : item.role === 'ADMIN' ? 'admin' : undefined}
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