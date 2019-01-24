import * as React from 'react';
import { withApp } from '../../components/withApp';
import { Platform } from 'react-native';
import { ZListItemGroup } from '../../components/ZListItemGroup';
import { ZListItemHeader } from '../../components/ZListItemHeader';
import { ZListItem } from '../../components/ZListItem';
import { Modals } from './modals/Modals';
import { YMutation } from 'openland-y-graphql/YMutation';
import { PageProps } from '../../components/PageProps';
import { SScrollView } from 'react-native-s/SScrollView';
import { SHeader } from 'react-native-s/SHeader';
import { Room_room_SharedRoom, RoomMemberRole, Room_room_PrivateRoom } from 'openland-api/Types';
import { startLoader, stopLoader } from '../../components/ZGlobalLoader';
import { ActionSheetBuilder } from '../../components/ActionSheet';
import { getMessenger } from '../../utils/messenger';
import { SDeferred } from 'react-native-s/SDeferred';
import { RoomQuery, RoomSettingsUpdateMutation, RoomKickMutation, RoomInviteInfoQuery, RoomAddMembersMutation, RoomLeaveMutation } from 'openland-api';
import { AlertBlanketBuilder } from 'openland-mobile/components/AlertBlanket';
import { SHeaderButton } from 'react-native-s/SHeaderButton';
import { YQuery } from 'openland-y-graphql/YQuery';
import { UserView } from './components/UserView';

class ProfileGroupComponent extends React.Component<PageProps & { room: Room_room_SharedRoom }, { notificationsCached?: boolean }> {
    handleAddMember = () => {
        this.props.router.push('UserPicker');
    }

    handleSend = () => {
        this.props.router.pushAndReset('Conversation', { 'flexibleId': this.props.router.params.id });
    }

    handleLeave = () => {
        //
    }

    render() {
        let setOrChange = this.props.room.photo ? 'Change' : 'Set';
        return (
            <>
                <ZListItemHeader
                    title={this.props.room.title}
                    subtitle={this.props.room.kind === 'GROUP' ? 'Private Group' : 'Public Room'}
                    photo={this.props.room.photo}
                    id={this.props.room.id}
                    action="Send message"
                    onPress={this.handleSend}
                />

                {!!this.props.room.description && (
                    <ZListItemGroup header={null} divider={false}>
                        <ZListItem text={this.props.room.description} multiline={true} title="About" />
                    </ZListItemGroup>
                )}

                <ZListItemGroup header={null} divider={false}>
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
                                    </YMutation>

                                    <YMutation mutation={RoomUpdateMutation} {...{ leftIcon: true }}>
                                        {(save) => (
                                            <ZListItem
                                                leftIcon={Platform.OS === 'android' ? require('assets/ic-edit-text-24.png') : require('assets/ic-edit-text-fill-24.png')}
                                                text="Change name"
                                                onPress={() =>
                                                    Modals.showTextEdit(
                                                        this.props.router,
                                                        sharedRoom!.title,
                                                        async (src) => await save({ variables: { input: { title: src }, roomId: sharedRoom!.id } })
                                                    )
                                                }
                                            />
                                        )}
                                    </YMutation> */}
                    <YMutation mutation={RoomSettingsUpdateMutation} {...{ leftIcon: true }}>
                        {(update) => {
                            let toggle = async () => {
                                let target = !(this.state && this.state.notificationsCached !== undefined ? this.state.notificationsCached : this.props.room!.settings.mute);
                                try {
                                    await update({ variables: { roomId: this.props.room!.id, settings: { mute: target } } });
                                    this.setState({ notificationsCached: target });
                                } catch (e) {
                                    new AlertBlanketBuilder().alert(e.message);
                                    this.setState({ notificationsCached: !target });
                                }
                            };
                            return (
                                <ZListItem
                                    leftIcon={Platform.OS === 'android' ? require('assets/ic-notifications-24.png') : require('assets/ic-notifications-fill-24.png')}
                                    text="Notifications"
                                    toggle={!(this.state && this.state.notificationsCached !== undefined ? this.state.notificationsCached : this.props.room!.settings.mute)}
                                    onToggle={toggle}
                                />
                            );
                        }}
                    </YMutation>
                </ZListItemGroup>

                <ZListItemGroup header="Members" divider={false} counter={this.props.room.membersCount}>

                    <SDeferred>
                        <YMutation mutation={RoomAddMembersMutation} >
                            {(add) => (
                                <ZListItem
                                    text="Add members"
                                    leftIcon={require('assets/ic-add-24.png')}
                                    onPress={() => {
                                        Modals.showUserMuptiplePicker(
                                            this.props.router,
                                            {
                                                title: 'Add', action: async (users) => {
                                                    startLoader();
                                                    try {
                                                        await add({ variables: { invites: users.map(u => ({ userId: u.id, role: RoomMemberRole.MEMBER })), roomId: this.props.room.id } });
                                                        this.props.router.back();
                                                    } catch (e) {
                                                        new AlertBlanketBuilder().alert(e.message);
                                                    }
                                                    stopLoader();
                                                }
                                            },
                                            'Add members',
                                            this.props.room!.members.map(m => m.user.id)
                                        );
                                    }}
                                />
                            )}
                        </YMutation>
                        {(this.props.room.role === 'ADMIN' || this.props.room.role === 'OWNER' || this.props.room.role === 'MEMBER') &&
                            <ZListItem
                                leftIcon={Platform.OS === 'android' ? require('assets/ic-link-24.png') : require('assets/ic-link-fill-24.png')}
                                text="Invite to room with a link"
                                onPress={() => this.props.router.present('ChannelInviteLinkModal', { id: this.props.room!.id })}
                                navigationIcon={false}
                            />}
                        {this.props.room.members.sort((a, b) => a.user.name.localeCompare(b.user.name)).map((v) => (
                            <YMutation mutation={RoomKickMutation} refetchQueriesVars={[{ query: RoomInviteInfoQuery, variables: { roomId: this.props.router.params.id } }]}>
                                {(kick) => (
                                    <UserView
                                        user={v.user}
                                        onLongPress={v.user.id !== getMessenger().engine.user.id ? async () => {
                                            let builder = new ActionSheetBuilder();
                                            builder.action(
                                                'Kick',
                                                () => {
                                                    new AlertBlanketBuilder().title(`Are you sure you want to kick ${v.user.name}?`)
                                                        .button('Cancel', 'cancel')
                                                        .button('Kick', 'destructive', async () => {
                                                            startLoader();
                                                            try {
                                                                await kick({ variables: { userId: v.user.id, roomId: this.props.router.params.id } });
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

                                        } : undefined}
                                        onPress={() => this.props.router.push('ProfileUser', { 'id': v.user.id })}

                                    />
                                )}
                            </YMutation>
                        ))}
                    </SDeferred>

                    <YMutation mutation={RoomLeaveMutation}>
                        {leave => <ZListItem
                            leftIcon={require('assets/ic-leave-24.png')}
                            text={`Leave ${this.props.room!.kind === 'PUBLIC' ? 'room' : 'and delete group'}`}
                            appearance="danger"
                            onPress={() => {
                                new AlertBlanketBuilder().title(`Are you sure you want to leave ${this.props.room!.kind === 'GROUP' ? 'and delete' : ''} ${this.props.room!.title}?`)
                                    .button('Cancel', 'cancel')
                                    .button('Leave', 'destructive', async () => {
                                        startLoader();
                                        try {
                                            await leave({ variables: { roomId: this.props.router.params.id } });

                                            this.props.router.pushAndResetRoot('Home');
                                        } catch (e) {
                                            new AlertBlanketBuilder().alert(e.message);
                                        }
                                        stopLoader();
                                    })
                                    .show();
                            }}
                        />}
                    </YMutation>

                </ZListItemGroup>
            </>
        );
    }
}

class ProfileGroupComponentLoader extends React.Component<PageProps> {

    render() {
        return (
            <>
                <SHeader title="Info" />
                <SHeaderButton
                    title="Edit"
                    onPress={() => {
                        //
                    }}
                />
                <YQuery query={RoomQuery} variables={{ id: this.props.router.params.id }}>
                    {(resp) => {
                        let sharedRoom = resp.data && resp.data.room!.__typename === 'SharedRoom' ? resp.data.room! as Room_room_SharedRoom : null;
                        if (!sharedRoom || !(sharedRoom.kind === 'GROUP' || sharedRoom.kind === 'PUBLIC')) {
                            throw Error('');
                        }
                        return (
                            <SScrollView>
                                <ProfileGroupComponent {...this.props} room={sharedRoom} />
                            </SScrollView>
                        );
                    }}
                </YQuery>
            </>
        );
    }
}

export const ProfileGroup = withApp(ProfileGroupComponentLoader, { navigationAppearance: 'small-hidden' });