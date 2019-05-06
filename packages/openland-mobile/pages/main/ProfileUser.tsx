import * as React from 'react';
import { withApp } from '../../components/withApp';
import { ZListItemHeader } from '../../components/ZListItemHeader';
import { ZListItemGroup } from '../../components/ZListItemGroup';
import { ZListItem } from '../../components/ZListItem';
import { PageProps } from '../../components/PageProps';
import { SScrollView } from 'react-native-s/SScrollView';
import { SHeader } from 'react-native-s/SHeader';
import { View } from 'react-native';
import { User_conversation_PrivateRoom } from 'openland-api/Types';
import { formatLastSeen } from 'openland-mobile/utils/formatTime';
import { NotificationSettings } from './components/NotificationSetting';
import { getClient } from 'openland-mobile/utils/apolloClient';
import { getMessenger } from 'openland-mobile/utils/messenger';
// import { changeThemeModal } from './themes/ThemeChangeModal';
import { XMemo } from 'openland-y-utils/XMemo';

const ProfileUserComponent = XMemo<PageProps>((props) => {
    let userQuery = getClient().useUser({ userId: props.router.params.id }, { fetchPolicy: 'cache-and-network' });
    let user = userQuery.user;
    let conversation = userQuery.conversation;

    let myID = getMessenger().engine.user.id;
    // let online = getClient().useOnline({ userId: props.router.params.id }).user;

    // const editTheme = React.useCallback(() => {
    //     changeThemeModal((userQuery.conversation! as any).id);
    // }, [(userQuery.conversation! as any).id])

    let sub = undefined;
    let subColor = undefined;
    if (user.isBot) {
        sub = 'bot'
        subColor = '#0084fe'
    } else {
        if (!userQuery.user.online && userQuery.user.lastSeen) {
            sub = formatLastSeen(userQuery.user.lastSeen);
        } else {
            sub = 'online';
            subColor = '#0084fe';
        }
    }

    return (
        <>
            <SHeader title={user.name} />
            <SScrollView>
                <ZListItemHeader
                    photo={user.photo}
                    id={user.id}
                    userId={user.id}
                    title={user.name}
                    subtitle={sub}
                    subtitleColor={subColor}
                    action={(myID === user.id) ? 'Edit profile' : 'Send message'}
                    onPress={() => {
                        if (myID === user.id) {
                            props.router.push('SettingsProfile');
                        } else {
                            props.router.pushAndReset('Conversation', {
                                flexibleId: props.router.params.id,
                            });
                        }
                    }}
                />

                <ZListItemGroup header="About" divider={false}>
                    {!!user.about && <ZListItem multiline={true} text={user.about} copy={true} />}
                    {!!user.about && <View height={10} />}
                    {!!user.shortname && (<ZListItem title="Username" text={'@' + user.shortname} copy={true} />)}
                    {!!user.email && <ZListItem title="Email" text={user.email} copy={true} />}
                    {!!user.phone && <ZListItem title="Phone" text={'tel:' + user.phone} copy={true} />}
                    {!!user.website && <ZListItem title="Website" text={user.website} copy={true} />}
                    {!!user.location && <ZListItem title="Location" text={user.location} copy={true} />}
                    {!!user.linkedin && <ZListItem title="Linkedin" text={user.linkedin} copy={true} />}
                </ZListItemGroup>

                {!!user.primaryOrganization && (
                    <ZListItemGroup header="Organization" footer={null} divider={false}>
                        <ZListItem
                            leftAvatar={{
                                photo: user.primaryOrganization.photo,
                                key: user.primaryOrganization.id,
                                title: user.primaryOrganization.name,
                            }}
                            text={user.primaryOrganization.name}
                            path="ProfileOrganization"
                            pathParams={{ id: user.primaryOrganization.id }}
                        />
                    </ZListItemGroup>
                )}

                {(myID !== user.id) && (
                    <ZListItemGroup header="Settings" footer={null} divider={false}>
                        <NotificationSettings
                            id={(conversation as User_conversation_PrivateRoom).id}
                            mute={!!(conversation as User_conversation_PrivateRoom).settings.mute}
                        />
                        {/* <ZListItem
                            text="Change theme"
                            leftIcon={require('assets/ic-edit.png')}
                            onPress={editTheme}
                        /> */}
                    </ZListItemGroup>
                )}
            </SScrollView>
        </>
    );
});

export const ProfileUser = withApp(ProfileUserComponent, { navigationAppearance: 'small-hidden' });