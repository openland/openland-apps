import * as React from 'react';
import { withApp } from '../../components/withApp';
import { ZQuery } from '../../components/ZQuery';
import { View, Text, Alert, Image, TouchableHighlight } from 'react-native';
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
import { XPStyles } from 'openland-xp/XPStyles';
import { RoomQuery, RoomUpdateMutation, RoomSettingsUpdateMutation, RoomKickMutation, RoomInviteInfoQuery, RoomAddMemberMutation, RoomAddMembersMutation, RoomLeaveMutation } from 'openland-api';

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

class ProfileGroupComponent extends React.Component<PageProps> {

    handleAddMember = () => {
        this.props.router.push('UserPicker');
    }

    render() {
        return (
            <>
                <SHeader title="Info" />
                <ZQuery query={RoomQuery} variables={{ id: this.props.router.params.id }}>
                    {(resp) => {
                        let sharedRoom = resp.data.room!.__typename === 'SharedRoom' ? resp.data.room! as Room_room_SharedRoom : null;
                        if (!sharedRoom || !(sharedRoom.kind === 'GROUP' || sharedRoom.kind === 'PUBLIC')) {
                            throw Error('');
                        }
                        let setOrChange = sharedRoom.photo ? 'Change' : 'Set';
                        return (
                            <SScrollView>
                                <ZListItemHeader
                                    title={sharedRoom.title}
                                    subtitle={sharedRoom.members.length + (sharedRoom.members.length === 1 ? ' member' : ' members')}
                                    photo={sharedRoom.photo}
                                    id={sharedRoom.id}
                                />

                                <ZListItemGroup header={'Settings'}>
                                    <YMutation mutation={RoomUpdateMutation} {...{ leftIcon: true }}>
                                        {(save) => (
                                            <ZAvatarPicker
                                                showLoaderOnUpload={true}
                                                render={(props) => {

                                                    return <ZListItem
                                                        onPress={props.showPicker}
                                                        leftIcon={require('assets/ic-cell-photo-ios.png')}
                                                        text={`${setOrChange} room photo`}
                                                        navigationIcon
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
                                                leftIcon={require('assets/ic-cell-name-ios.png')}
                                                text="Change name"
                                                navigationIcon
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
                                                startLoader();
                                                try {
                                                    await update({ variables: { roomId: sharedRoom!.id, settings: { mute: !sharedRoom!.settings.mute } } });
                                                } catch (e) {
                                                    Alert.alert(e.message);
                                                }
                                                stopLoader();
                                            };
                                            return (
                                                <ZListItem
                                                    leftIcon={require('assets/ic-cell-notif-ios.png')}
                                                    text="Notifications"
                                                    toggle={!sharedRoom!.settings.mute}
                                                    onToggle={toggle}
                                                    onPress={toggle}
                                                />
                                            );
                                        }
                                        }
                                    </YMutation>
                                    {(sharedRoom.role === 'ADMIN' || sharedRoom.role === 'OWNER') &&
                                        < ZListItem
                                            leftIcon={require('assets/ic-cell-link-ios.png')}
                                            text="Invite via Link"
                                            path="ChannelInviteLinkModal"
                                            pathParams={{ id: sharedRoom.id }}
                                        />}
                                </ZListItemGroup>

                                <ZListItemGroup header="Members">

                                    <SDeferred>
                                        <YMutation mutation={RoomAddMembersMutation} >
                                            {(add) => (
                                                <TouchableHighlight
                                                    underlayColor={XPStyles.colors.selectedListItem}
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
                                                                        Alert.alert(e.message);
                                                                    }
                                                                    stopLoader();
                                                                }
                                                            },
                                                            'Add members',
                                                            sharedRoom!.members.map(m => m.user.id)
                                                        );
                                                    }}
                                                >
                                                    <View flexDirection="row" height={60} alignItems="center" >
                                                        <View marginLeft={16} marginRight={16} width={40} height={40} borderRadius={20} borderWidth={1} borderColor={XPStyles.colors.brand} justifyContent="center" alignItems="center">
                                                            <Image source={require('assets/ic-add.png')} />
                                                        </View>
                                                        <Text style={{ color: '#4747ec', fontWeight: '500', fontSize: 16 }}>Add members</Text>
                                                        <View style={{ position: 'absolute', bottom: 0, width: '100%' }} height={1} flexGrow={1} marginLeft={70} backgroundColor={XPStyles.colors.selectedListItem} />

                                                    </View>
                                                </TouchableHighlight>
                                            )}
                                        </YMutation>
                                        {sharedRoom.members.map((v) => (
                                            <YMutation mutation={RoomKickMutation} refetchQueriesVars={[{ query: RoomInviteInfoQuery, variables: { roomId: this.props.router.params.id } }]}>
                                                {(kick) => (
                                                    <View>
                                                        <UserViewAsync
                                                            item={v.user}
                                                            onLongPress={v.user.id !== getMessenger().engine.user.id ? async () => {

                                                                let builder = new ActionSheetBuilder();
                                                                builder.action(
                                                                    'Kick',
                                                                    () => {
                                                                        Alert.alert(`Are you sure you want to kick ${v.user.name}?`, undefined, [{
                                                                            onPress: async () => {
                                                                                startLoader();
                                                                                try {
                                                                                    await kick({ variables: { userId: v.user.id, roomId: this.props.router.params.id } });
                                                                                } catch (e) {
                                                                                    Alert.alert(e.message);
                                                                                }
                                                                                stopLoader();
                                                                            },
                                                                            text: 'Kick',
                                                                            style: 'destructive'
                                                                        },
                                                                        {
                                                                            text: 'Cancel',
                                                                            style: 'cancel'
                                                                        }]);
                                                                    },
                                                                    true
                                                                );
                                                                builder.show();

                                                            } : undefined}
                                                            onPress={() => this.props.router.push('ProfileUser', { 'id': v.user.id })}

                                                        />
                                                        <Text style={{ position: 'absolute', right: 16, height: 60, lineHeight: 60, fontSize: 15, color: '#99a2b0' }}>{v.role}</Text>
                                                    </View>
                                                )}
                                            </YMutation>
                                        ))}
                                    </SDeferred>

                                    <YMutation mutation={RoomLeaveMutation}>
                                        {leave => <ZListItem
                                            text="Leave"
                                            appearance="danger"
                                            onPress={() => {
                                                Alert.alert(`Are you sure you want to leave ${sharedRoom!.title}?`, undefined, [{
                                                    onPress: async () => {
                                                        startLoader();
                                                        try {
                                                            await leave({ variables: { roomId: this.props.router.params.id } });

                                                            this.props.router.pushAndResetRoot('Home');
                                                        } catch (e) {
                                                            Alert.alert(e.message);
                                                        }
                                                        stopLoader();
                                                    },
                                                    text: 'Leave',
                                                    style: 'destructive'
                                                },
                                                {
                                                    text: 'Cancel',
                                                    style: 'cancel'
                                                }]);
                                            }}
                                        />}
                                    </YMutation>

                                </ZListItemGroup>
                            </SScrollView>
                        );
                    }}
                </ZQuery>
            </>
        );
    }
}

export const ProfileGroup = withApp(ProfileGroupComponent, { navigationAppearance: 'small-hidden' });