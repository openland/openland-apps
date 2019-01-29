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

const ProfileUserContent = React.memo<PageProps>((props) => {
    let user = getClient().useUser({ userId: props.router.params.id });
    let online = getClient().useOnline({ userId: props.router.params.id }).user;

    let sub = undefined;
    if (!online.online && online.lastSeen) {
        sub = formatLastSeen(online.lastSeen);
    } else {
        sub = 'online'
    }

    return (
        <>
            <ZListItemHeader
                photo={user.user.photo}
                id={user.user.id}
                title={user.user.name}
                subtitle={sub}
                action="Send message"
                onPress={() => { props.router.pushAndReset('Conversation', { 'flexibleId': props.router.params.id }); }}
            />

            <ZListItemGroup header="About" divider={false}>
                {!!user.user.about && <ZListItem multiline={true} text={user.user.about} copy={true} />}
                {!!user.user.about && <View height={10} />}
                {!!user.user.shortname && <ZListItem title="Username" text={'@' + user.user.shortname} copy={true} />}
                {!!user.user.email && <ZListItem title="Email" text={user.user.email} copy={true} />}
                {!!user.user.phone && <ZListItem title="Phone" text={'tel:' + user.user.phone} copy={true} />}
                {!!user.user.website && <ZListItem title="Website" text={user.user.website} copy={true} />}
                {!!user.user.location && <ZListItem title="Location" text={user.user.location} copy={true} />}
            </ZListItemGroup>

            <ZListItemGroup header="Organization" footer={null} divider={false}>
                {!!user.user.primaryOrganization && (
                    <ZListItem
                        leftAvatar={{
                            photo: user.user.primaryOrganization.photo,
                            key: user.user.primaryOrganization.id,
                            title: user.user.primaryOrganization.name
                        }}
                        text={user.user.primaryOrganization.name}
                        path="ProfileOrganization"
                        pathParams={{ id: user.user.primaryOrganization.id }}
                    />
                )}
            </ZListItemGroup>

            <ZListItemGroup header="Settings" footer={null} divider={false}>
                <NotificationSettings id={(user.conversation as User_conversation_PrivateRoom).id} mute={!!(user.conversation as User_conversation_PrivateRoom).settings.mute} />
            </ZListItemGroup>
        </>
    );
});

class ProfileUserComponent extends React.Component<PageProps> {
    render() {
        return (
            <>
                <SHeader title="Info" />
                <SScrollView>
                    <ProfileUserContent {...this.props} />
                </SScrollView>
            </>
        );
    }
}

export const ProfileUser = withApp(ProfileUserComponent, { navigationAppearance: 'small-hidden' });