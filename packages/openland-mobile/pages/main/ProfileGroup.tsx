import * as React from 'react';
import { withApp } from '../../components/withApp';
import { ZQuery } from '../../components/ZQuery';
import { View, Text, Platform } from 'react-native';
import { ZListItemGroup } from '../../components/ZListItemGroup';
import { ZListItemHeader } from '../../components/ZListItemHeader';
import { ZListItem } from '../../components/ZListItem';
import { ZListItemBase } from '../../components/ZListItemBase';
import { Modals } from './modals/Modals';
import { YMutation } from 'openland-y-graphql/YMutation';
import { XPAvatar } from 'openland-xp/XPAvatar';
import { PageProps } from '../../components/PageProps';
import { SScrollView } from 'react-native-s/SScrollView';
import { SHeader } from 'react-native-s/SHeader';
import { UserShort, Room_room_SharedRoom, RoomMemberRole } from 'openland-api/Types';
import { startLoader, stopLoader } from '../../components/ZGlobalLoader';
import { ActionSheetBuilder } from '../../components/ActionSheet';
import { getMessenger } from '../../utils/messenger';
import { SDeferred } from 'react-native-s/SDeferred';
import { RoomQuery, RoomSettingsUpdateMutation, RoomKickMutation, RoomInviteInfoQuery, RoomAddMembersMutation, RoomLeaveMutation } from 'openland-api';
import { AlertBlanketBuilder } from 'openland-mobile/components/AlertBlanket';
import { PresenceComponent } from './components/PresenceComponent';
import { SHeaderButton } from 'react-native-s/SHeaderButton';
import { YQuery } from 'openland-y-graphql/YQuery';

export const UserView = (props: { user: UserShort, role?: string, onPress: () => void, onLongPress?: () => void }) => (
    <ZListItemBase key={props.user.id} separator={false} height={60} onPress={props.onPress} onLongPress={props.onLongPress}>
        <View paddingLeft={15} paddingRight={15} alignSelf="center">
            <XPAvatar size={42} src={props.user.photo} userId={props.user.id} placeholderKey={props.user.id} placeholderTitle={props.user.name} />
        </View>
        <View alignSelf="center" flexGrow={1} flexBasis={0} alignItems="flex-start" justifyContent="center" flexDirection="column">
            <Text numberOfLines={1} style={{ fontSize: 16, fontWeight: '500', color: '#181818', height: 19, marginBottom: 4 }}>{props.user.name}{props.user.primaryOrganization && <Text style={{ fontSize: 15, color: '#99a2b0'}}>  {props.user.primaryOrganization.name}</Text>}</Text>
            <PresenceComponent uid={props.user.id} style={{ fontSize: 14, color: '#99a2b0', height: 16 }} onlineStyle={{ color: '#0084fe' }} />
            {/* <Text numberOfLines={1} style={{ fontSize: 16, color: '#181818' }}>{props.role}</Text> */}
        </View>
    </ZListItemBase>
);

class ProfileGroupComponent extends React.Component<PageProps, { notificationsCached?: boolean }> {

    handleAddMember = () => {
        this.props.router.push('UserPicker');
    }

    handleSend = () => {
        this.props.router.pushAndReset('Conversation', { 'flexibleId': this.props.router.params.id });
    }

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
                        let setOrChange = sharedRoom.photo ? 'Change' : 'Set';
                        return (
                            <SScrollView>
                                <ZListItemHeader
                                    title={sharedRoom.title}
                                    subtitle={sharedRoom.kind === 'GROUP' ? 'Private Group' : 'Public Room'}
                                    photo={sharedRoom.photo}
                                    id={sharedRoom.id}
                                    action="Send message"
                                    onPress={this.handleSend}
                                />

                                {!!sharedRoom.description && (
                                    <ZListItemGroup header={null} divider={false}>
                                        <ZListItem text={sharedRoom.description} multiline={true} title="About" />
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
                                                let target = !(this.state && this.state.notificationsCached !== undefined ? this.state.notificationsCached : sharedRoom!.settings.mute);
                                                try {
                                                    await update({ variables: { roomId: sharedRoom!.id, settings: { mute: target } } });
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
                                                    toggle={!(this.state && this.state.notificationsCached !== undefined ? this.state.notificationsCached : sharedRoom!.settings.mute)}
                                                    onToggle={toggle}
                                                />
                                            );
                                        }}
                                    </YMutation>
                                </ZListItemGroup>

                                <ZListItemGroup header="Members" divider={false} counter={sharedRoom.membersCount}>

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
                                                                        await add({ variables: { invites: users.map(u => ({ userId: u.id, role: RoomMemberRole.MEMBER })), roomId: sharedRoom!.id } });
                                                                        this.props.router.back();
                                                                    } catch (e) {
                                                                        new AlertBlanketBuilder().alert(e.message);
                                                                    }
                                                                    stopLoader();
                                                                }
                                                            },
                                                            'Add members',
                                                            sharedRoom!.members.map(m => m.user.id)
                                                        );
                                                    }}
                                                />
                                            )}
                                        </YMutation>
                                        {(sharedRoom.role === 'ADMIN' || sharedRoom.role === 'OWNER' || sharedRoom.role === 'MEMBER') &&
                                            <ZListItem
                                                leftIcon={Platform.OS === 'android' ? require('assets/ic-link-24.png') : require('assets/ic-link-fill-24.png')}
                                                text="Invite to room with a link"
                                                onPress={() => this.props.router.present('ChannelInviteLinkModal', { id: sharedRoom!.id })}
                                                navigationIcon={false}
                                            />}
                                        {sharedRoom.members.sort((a, b) => a.user.name.localeCompare(b.user.name)).map((v) => (
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
                                            text={`Leave ${sharedRoom!.kind === 'PUBLIC' ? 'room' : 'and delete group'}`}
                                            appearance="danger"
                                            onPress={() => {
                                                new AlertBlanketBuilder().title(`Are you sure you want to leave ${sharedRoom!.kind === 'GROUP' ? 'and delete' : ''} ${sharedRoom!.title}?`)
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
                            </SScrollView>
                        );
                    }}
                </YQuery>
            </>
        );
    }
}

export const ProfileGroup = withApp(ProfileGroupComponent, { navigationAppearance: 'small-hidden' });