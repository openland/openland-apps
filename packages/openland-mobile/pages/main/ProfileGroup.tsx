import * as React from 'react';
import { withApp } from '../../components/withApp';
import { Platform } from 'react-native';
import { ZListItemGroup } from '../../components/ZListItemGroup';
import { ZListItemHeader } from '../../components/ZListItemHeader';
import { ZListItem } from '../../components/ZListItem';
import { Modals } from './modals/Modals';
import { PageProps } from '../../components/PageProps';
import { SScrollView } from 'react-native-s/SScrollView';
import { SHeader } from 'react-native-s/SHeader';
import { Room_room_SharedRoom, RoomMemberRole, UserShort } from 'openland-api/Types';
import { startLoader, stopLoader } from '../../components/ZGlobalLoader';
import { ActionSheetBuilder } from '../../components/ActionSheet';
import { getMessenger } from '../../utils/messenger';
import { SDeferred } from 'react-native-s/SDeferred';
import { RoomQuery, RoomSettingsUpdateMutation, RoomKickMutation, RoomInviteInfoQuery, RoomAddMembersMutation, RoomLeaveMutation, RoomUpdateMutation } from 'openland-api';
import { AlertBlanketBuilder } from 'openland-mobile/components/AlertBlanket';
import { SHeaderButton } from 'react-native-s/SHeaderButton';
import { YQuery } from 'openland-y-graphql/YQuery';
import { UserView } from './components/UserView';
import { useClient } from 'openland-mobile/utils/useClient';
import { PromptBuilder } from 'openland-mobile/components/Prompt';

function ProfileGroupComponent(props: PageProps & { room: Room_room_SharedRoom }) {

    const client = useClient();

    const handleSend = React.useCallback(() => {
        props.router.pushAndReset('Conversation', { 'flexibleId': props.router.params.id });
    }, [props.router.params.id]);

    const handleEdit = React.useCallback(() => {
        new ActionSheetBuilder()
            .action(props.room.photo ? 'Change photo' : 'Set photo', () => {
                //
            })
            .action('Change name', () => {
                new PromptBuilder()
                    .title(props.room.kind === 'GROUP' ? 'Group name' : 'Room name')
                    .value(props.room.title)
                    .callback(async (src) => {
                        await client.mutate(RoomUpdateMutation, {
                            input: { title: src },
                            roomId: props.room!.id
                        });
                    })
                    .show();
            })
            .action('Change about', () => {
                new PromptBuilder()
                    .title(props.room.kind === 'GROUP' ? 'Group about' : 'Room about')
                    .value(props.room.description || '')
                    .callback(async (src) => {
                        await client.mutate(RoomUpdateMutation, {
                            input: { description: src },
                            roomId: props.room!.id
                        });
                    })
                    .show();
            })
            .show();
    }, [props.room.id, props.room.title, props.room.photo, props.room.description]);

    const handleLeave = React.useCallback(() => {
        new AlertBlanketBuilder().title(`Are you sure you want to leave ${props.room.kind === 'GROUP' ? 'and delete' : ''} ${props.room.title}?`)
            .button('Cancel', 'cancel')
            .button('Leave', 'destructive', async () => {
                startLoader();
                try {
                    await client.mutate(RoomLeaveMutation, { roomId: props.router.params.id });
                    props.router.pushAndResetRoot('Home');
                } catch (e) {
                    new AlertBlanketBuilder().alert(e.message);
                }
                stopLoader();
            })
            .show();
    }, []);

    const handleMemberLongPress = React.useCallback<{ (user: UserShort): void }>((user) => {
        if (user.id !== getMessenger().engine.user.id) {
            let builder = new ActionSheetBuilder();
            builder.action(
                'Kick',
                () => {
                    new AlertBlanketBuilder().title(`Are you sure you want to kick ${user.name}?`)
                        .button('Cancel', 'cancel')
                        .button('Kick', 'destructive', async () => {
                            startLoader();
                            try {
                                await client.mutate(RoomKickMutation, { userId: user.id, roomId: props.router.params.id });
                            } catch (e) {
                                new AlertBlanketBuilder().alert(e.message);
                            }
                            stopLoader();
                        })
                        .show();
                },
                true
            );
            builder.show();
        } else {
            let builder = new ActionSheetBuilder();
            builder.action('Leave', handleLeave, true);
            builder.show();
        }
    }, []);

    const handleAddMember = React.useCallback(() => {
        Modals.showUserMuptiplePicker(props.router,
            {
                title: 'Add', action: async (users) => {
                    startLoader();
                    try {
                        await client.mutate(RoomAddMembersMutation, { invites: users.map(u => ({ userId: u.id, role: RoomMemberRole.MEMBER })), roomId: props.room.id });
                        props.router.back();
                    } catch (e) {
                        new AlertBlanketBuilder().alert(e.message);
                    }
                    stopLoader();
                }
            },
            'Add members',
            props.room!.members.map(m => m.user.id),
            { path: 'ChannelInviteLinkModal', pathParams: { id: props.room.id } }
        );
    }, []);

    const [nofications, setNotifications] = React.useState(!props.room.settings.mute);

    const handleNotifications = React.useCallback<{ (value: boolean): void }>((value) => {
        setNotifications(value);
        client.mutate(RoomSettingsUpdateMutation, { roomId: props.room.id, settings: { mute: !value } });
    }, []);

    const sortedMembers = props.room.members.sort((a, b) => a.user.name.localeCompare(b.user.name));
    const subtitle = (props.room.membersCount || 0) > 1 ? props.room.membersCount + ' members' : (props.room.membersCount || 0) + 'member';

    return (
        <>
            {(props.room.role === 'ADMIN' || props.room.role === 'OWNER' || (props.room.role === 'MEMBER' && props.room.kind === 'GROUP')) && (
                <SHeaderButton
                    title="Edit"
                    onPress={handleEdit}
                />
            )}
            <ZListItemHeader
                titleIcon={props.room.kind === 'GROUP' ? require('assets/ic-lock-18.png') : undefined}
                titleColor={props.room.kind === 'GROUP' ? 'green' : undefined}
                title={props.room.title}
                subtitle={subtitle}
                photo={props.room.photo}
                id={props.room.id}
                action="Send message"
                onPress={handleSend}
            />

            {!!props.room.description && (
                <ZListItemGroup header="About" divider={false}>
                    <ZListItem text={props.room.description} multiline={true} />
                </ZListItemGroup>
            )}

            <ZListItemGroup header={null} divider={false}>
                <ZListItem
                    leftIcon={Platform.OS === 'android' ? require('assets/ic-notifications-24.png') : require('assets/ic-notifications-fill-24.png')}
                    text="Notifications"
                    toggle={nofications}
                    onToggle={handleNotifications}
                />
                {/* <YMutation mutation={RoomUpdateMutation} {...{ leftIcon: true }}>
                                    {(save) => (
                                        <ZAvatarPicker
                                            showLoaderOnUpload={true}
                                            render={(props) => {

                                                return <ZListItem
                                                    onPress={props.showPicker}
                                                    leftIcon={Platform.OS === 'android' ? require('assets/ic-photo-24.png') : require('assets/ic-photo-fill-24.png')}
                                                    text={`${setOrChange} room photo`}
                                                />;
                                            }}
                                            onChanged={(val) => {
                                                save({
                                                    variables: {
                                                        roomId: this.props.router.params.id,
                                                        input: {
                                                            photoRef: val
                                                        }
                                                    }
                                                });
                                            }
                                            }
                                        />
                                    )}
                                </YMutation> */}
            </ZListItemGroup>

            <ZListItemGroup header="Members" divider={false}>
                <ZListItem
                    text="Add members"
                    leftIcon={require('assets/ic-add-24.png')}
                    onPress={handleAddMember}
                />
                {(props.room.role === 'ADMIN' || props.room.role === 'OWNER' || props.room.role === 'MEMBER') &&
                    <ZListItem
                        leftIcon={Platform.OS === 'android' ? require('assets/ic-link-24.png') : require('assets/ic-link-fill-24.png')}
                        text="Invite to room with a link"
                        onPress={() => props.router.present('ChannelInviteLinkModal', { id: props.room!.id })}
                        navigationIcon={false}
                    />}

                {sortedMembers.map((v) => (
                    <UserView
                        key={v.user.id}
                        user={v.user}
                        onLongPress={() => handleMemberLongPress(v.user)}
                        onPress={() => props.router.push('ProfileUser', { 'id': v.user.id })}
                    />
                ))}

                <ZListItem
                    leftIcon={require('assets/ic-leave-24.png')}
                    text={`Leave ${props.room.kind === 'PUBLIC' ? 'room' : 'and delete group'}`}
                    appearance="danger"
                    onPress={handleLeave}
                />
            </ZListItemGroup>
        </>
    );
}

class ProfileGroupComponentLoader extends React.Component<PageProps> {

    render() {
        return (
            <>
                <SHeader title="Info" />
                <YQuery query={RoomQuery} variables={{ id: this.props.router.params.id }}>
                    {(resp) => {
                        let sharedRoom = resp.data && resp.data.room!.__typename === 'SharedRoom' ? resp.data.room! as Room_room_SharedRoom : null;
                        if (!sharedRoom || !(sharedRoom.kind === 'GROUP' || sharedRoom.kind === 'PUBLIC')) {
                            throw Error('');
                        }
                        return (
                            <SScrollView>
                                <SDeferred>
                                    <ProfileGroupComponent {...this.props} room={sharedRoom} />
                                </SDeferred>
                            </SScrollView>
                        );
                    }}
                </YQuery>
            </>
        );
    }
}

export const ProfileGroup = withApp(ProfileGroupComponentLoader, { navigationAppearance: 'small-hidden' });