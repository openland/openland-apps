import * as React from 'react';
import { withApp } from '../../components/withApp';
import { Platform, View } from 'react-native';
import { ZListItemGroup } from '../../components/ZListItemGroup';
import { ZListItemHeader } from '../../components/ZListItemHeader';
import { ZListItem } from '../../components/ZListItem';
import { Modals } from './modals/Modals';
import { PageProps } from '../../components/PageProps';
import { SScrollView } from 'react-native-s/SScrollView';
import { SHeader } from 'react-native-s/SHeader';
import { Room_room_SharedRoom, RoomMemberRole, UserShort, RoomMembers_members } from 'openland-api/Types';
import { startLoader, stopLoader } from '../../components/ZGlobalLoader';
import { getMessenger } from '../../utils/messenger';
import { SHeaderButton } from 'react-native-s/SHeaderButton';
import { UserView } from './components/UserView';
import { useClient } from 'openland-mobile/utils/useClient';
import { PromptBuilder, Prompt } from 'openland-mobile/components/Prompt';
import ImagePicker, { Image as PickerImage } from 'react-native-image-crop-picker';
import { UploadCareDirectUploading } from 'openland-mobile/utils/UploadCareDirectUploading';
import { UploadStatus } from 'openland-engines/messenger/types';
import { ActionSheet, ActionSheetBuilder } from 'openland-mobile/components/ActionSheet';
import { Alert } from 'openland-mobile/components/AlertBlanket';
import { NotificationSettings } from './components/NotificationSetting';
import { ThemeContext } from 'openland-mobile/themes/ThemeContext';
// import { changeThemeModal } from './themes/ThemeChangeModal';

let isMember = (a: RoomMembers_members) => {
    return a.role === 'MEMBER';
}

let isAdmin = (a: RoomMembers_members) => {
    return a.role === 'ADMIN' || a.role === 'OWNER';
}

function ProfileGroupComponent(props: PageProps & { id: string }) {

    const theme = React.useContext(ThemeContext);
    const client = useClient();

    const room = client.useRoom({ id: props.id }).room as Room_room_SharedRoom;

    const handleSend = React.useCallback(() => {
        props.router.pushAndReset('Conversation', { 'flexibleId': props.router.params.id });
    }, [props.router.params.id]);

    const handlePhotoSet = React.useCallback<{ (src: PickerImage): void }>((img) => {
        startLoader();
        let uploading = new UploadCareDirectUploading('photo.jpg', img.path);
        uploading.watch((v) => {
            if (v.status === UploadStatus.COMPLETED) {
                let completed = {
                    uuid: v.uuid!!,
                    crop: {
                        x: 0,
                        y: 0,
                        w: img.width,
                        h: img.height
                    }
                };
                (async () => {
                    try {
                        await client.mutateRoomUpdate({
                            input: { photoRef: completed },
                            roomId: room.id
                        });
                    } finally {
                        stopLoader();
                    }
                })();
            } else if (v.status === UploadStatus.FAILED) {
                stopLoader();
            }
        });
    }, []);

    const handleLeave = React.useCallback(() => {
        Alert.builder().title(`Are you sure you want to leave ${room.kind === 'GROUP' ? 'and delete' : ''} ${room.title}?`)
            .button('Cancel', 'cancel')
            .action('Leave', 'destructive', async () => {
                await client.mutateRoomLeave({ roomId: props.router.params.id });
                props.router.pushAndResetRoot('Home');
            })
            .show();
    }, []);

    const handleMemberLongPress = React.useCallback<{ (user: UserShort): void }>((user) => {
        if (user.id !== getMessenger().engine.user.id) {
            let builder = ActionSheet.builder();
            builder.action(
                'Info',
                () => {
                    props.router.push('ProfileUser', { id: user.id });
                });
            builder.action(
                'Kick',
                () => {
                    Alert.builder().title(`Are you sure you want to kick ${user.name}?`)
                        .button('Cancel', 'cancel')
                        .action('Kick', 'destructive', async () => {
                            await client.mutateRoomKick({ userId: user.id, roomId: props.router.params.id });
                        })
                        .show();
                },
                true
            );
            builder.show();
        } else {
            let builder = ActionSheet.builder();
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
                        await client.mutateRoomAddMembers({ invites: users.map(u => ({ userId: u.id, role: RoomMemberRole.MEMBER })), roomId: room.id });
                        props.router.back();
                    } catch (e) {
                        Alert.alert(e.message);
                    }
                    stopLoader();
                }
            },
            'Add members',
            room.members.map(m => m.user.id),
            { path: 'ProfileGroupLink', pathParams: { id: room.id } }
        );
    }, [room.members]);

    // const editTheme = React.useCallback(() => {
    //     changeThemeModal(room.id);
    // }, [room.id])

    // Sort members by name (admins should go first)
    const sortedMembers = room.members
        .sort((a, b) => a.user.name.localeCompare(b.user.name))
        .sort((a, b) => (isAdmin(a) && isMember(b) ? -1 : 1));

    const subtitle = (room.membersCount || 0) > 1 ? room.membersCount + ' members' : (room.membersCount || 0) + ' member';

    return (
        <>
            {(room.role === 'ADMIN' || room.role === 'OWNER' || (room.role === 'MEMBER' && room.kind === 'GROUP')) && (
                <SHeaderButton
                    title="Edit"
                    onPress={() => props.router.push('EditGroup', { id: props.router.params.id })}
                />
            )}
            <ZListItemHeader
                titleIcon={room.kind === 'GROUP' ? require('assets/ic-lock-18.png') : undefined}
                titleColor={room.kind === 'GROUP' ? 'green' : undefined}
                title={room.title}
                subtitle={subtitle}
                photo={room.photo}
                id={room.id}
                action="Send message"
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
                {/* <ZListItem
                    text="Change theme"
                    leftIcon={require('assets/ic-edit.png')}
                    onPress={editTheme}
                /> */}
            </ZListItemGroup>

            <ZListItemGroup header="Members" divider={false}>
                <ZListItem
                    text="Add members"
                    leftIcon={require('assets/ic-add-24.png')}
                    onPress={handleAddMember}
                />
                {(room.role === 'ADMIN' || room.role === 'OWNER' || room.role === 'MEMBER') &&
                    <ZListItem
                        leftIcon={Platform.OS === 'android' ? require('assets/ic-link-24.png') : require('assets/ic-link-fill-24.png')}
                        text="Invite to group with a link"
                        onPress={() => props.router.present('ProfileGroupLink', { id: room!.id })}
                        navigationIcon={false}
                    />}

                {sortedMembers.map((v) => (
                    <UserView
                        isAdmin={v.role === 'ADMIN' || v.role === 'OWNER'}
                        key={v.user.id}
                        user={v.user}
                        onLongPress={() => handleMemberLongPress(v.user)}
                        onPress={() => props.router.push('ProfileUser', { 'id': v.user.id })}
                    />
                ))}
            </ZListItemGroup>

            {Platform.OS === 'ios' && <View backgroundColor={theme.separatorColor} height={0.5} alignSelf="stretch" marginLeft={16} />}

            <ZListItemGroup header={Platform.OS === 'ios' ? undefined : null} divider={false}>
                <ZListItem
                    leftIcon={require('assets/ic-leave-24.png')}
                    text={`Leave ${room.kind === 'PUBLIC' ? 'room' : 'and delete group'}`}
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
                <SScrollView>
                    <ProfileGroupComponent {...this.props} id={this.props.router.params.id} />
                </SScrollView>
            </>
        );
    }
}

export const ProfileGroup = withApp(ProfileGroupComponentLoader, { navigationAppearance: 'small-hidden' });