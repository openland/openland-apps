import * as React from 'react';
import { withApp } from '../../components/withApp';
import { ZQuery } from '../../components/ZQuery';
import { View, Text, Alert, Image, TouchableHighlight, Platform } from 'react-native';
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
import { ZAvatarPicker } from '../../components/ZAvatarPicker';
import { UserViewAsync } from '../compose/ComposeInitial';
import { RoomQuery, RoomUpdateMutation, RoomSettingsUpdateMutation, RoomKickMutation, RoomInviteInfoQuery, RoomAddMemberMutation, RoomAddMembersMutation, RoomLeaveMutation } from 'openland-api';
import { AlertBlanketBuilder } from 'openland-mobile/components/AlertBlanket';
import { YQuery } from 'openland-y-graphql/YQuery';

export const UserView = (props: { user: UserShort, role?: string, onPress: () => void, onLongPress?: () => void }) => (
    <ZListItemBase key={props.user.id} separator={false} height={56} onPress={props.onPress} onLongPress={props.onLongPress}>
        <View paddingTop={12} paddingLeft={15} paddingRight={15}>
            <XPAvatar size={32} src={props.user.photo} userId={props.user.id} placeholderKey={props.user.id} placeholderTitle={props.user.name} />
        </View>
        <View flexGrow={1} flexBasis={0} alignItems="flex-start" justifyContent="center" flexDirection="column">
            <Text numberOfLines={1} style={{ fontSize: 16, color: '#181818' }}>{props.user.name}</Text>
            <Text numberOfLines={1} style={{ fontSize: 16, color: '#181818' }}>{props.role}</Text>
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
                                    <YMutation mutation={RoomUpdateMutation} {...{ leftIcon: true }}>
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
                                    </YMutation>
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
                                                    onPress={toggle}
                                                />
                                            );
                                        }
                                        }
                                    </YMutation>
                                    {(sharedRoom.role === 'ADMIN' || sharedRoom.role === 'OWNER' || sharedRoom.role === 'MEMBER') &&
                                        <ZListItem
                                            leftIcon={Platform.OS === 'android' ? require('assets/ic-link-24.png') : require('assets/ic-link-fill-24.png')}
                                            text="Invite with a link"
                                            path="ChannelInviteLinkModal"
                                            navigationIcon={false}
                                            pathParams={{ id: sharedRoom.id }}
                                        />}
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
                                                // <TouchableHighlight
                                                //     underlayColor={XPStyles.colors.selectedListItem}
                                                //     onPress={() => {
                                                //         Modals.showUserMuptiplePicker(
                                                //             this.props.router,
                                                //             {
                                                //                 title: 'Add', action: async (users) => {
                                                //                     startLoader();
                                                //                     try {
                                                //                         await add({ variables: { invites: users.map(u => ({ userId: u.id, role: RoomMemberRole.MEMBER })), roomId: sharedRoom!.id } });
                                                //                         this.props.router.back();
                                                //                     } catch (e) {
                                                //                         new AlertBlanketBuilder().alert(e.message);
                                                //                     }
                                                //                     stopLoader();
                                                //                 }
                                                //             },
                                                //             'Add members',
                                                //             sharedRoom!.members.map(m => m.user.id)
                                                //         );
                                                //     }}
                                                // >
                                                //     <View flexDirection="row" height={60} alignItems="center" >
                                                //         <View marginLeft={16} marginRight={16} width={40} height={40} borderRadius={20} borderWidth={1} borderColor={XPStyles.colors.brand} justifyContent="center" alignItems="center">
                                                //             <Image source={require('assets/ic-add.png')} />
                                                //         </View>
                                                //         <Text style={{ color: '#4747ec', fontWeight: '500', fontSize: 16 }}>Add members</Text>
                                                //         {/* <View style={{ position: 'absolute', bottom: 0, width: '100%' }} height={0.5} flexGrow={1} marginLeft={70} backgroundColor={XPStyles.colors.separator} /> */}

                                                //     </View>
                                                // </TouchableHighlight>
                                            )}
                                        </YMutation>
                                        {sharedRoom.members.sort((a, b) => a.user.name.localeCompare(b.user.name)).map((v) => (
                                            <YMutation mutation={RoomKickMutation} refetchQueriesVars={[{ query: RoomInviteInfoQuery, variables: { roomId: this.props.router.params.id } }]}>
                                                {(kick) => (
                                                    <View>
                                                        <UserViewAsync
                                                            item={v.user}
                                                            isAdmin={v.role === 'ADMIN' || v.role === 'OWNER'}
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
                                                        {/* <Text style={{ position: 'absolute', right: 16, height: 60, lineHeight: 60, fontSize: 15, color: '#99a2b0' }}>{v.role}</Text> */}
                                                    </View>
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