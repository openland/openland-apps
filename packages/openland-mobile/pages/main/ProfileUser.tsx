import * as React from 'react';
import { withApp } from '../../components/withApp';
import { ZQuery } from '../../components/ZQuery';
import { UserQuery, OnlineQuery } from 'openland-api';
import { ZListItemHeader } from '../../components/ZListItemHeader';
import { ZListItemGroup } from '../../components/ZListItemGroup';
import { ZListItem } from '../../components/ZListItem';
import { PageProps } from '../../components/PageProps';
import { SScrollView } from 'react-native-s/SScrollView';
import { SHeader } from 'react-native-s/SHeader';
import { YQuery } from 'openland-y-graphql/YQuery';
import { View } from 'react-native';
import { User, User_conversation_PrivateRoom } from 'openland-api/Types';
import { formatLastSeen } from 'openland-mobile/utils/formatTime';
import { NotificationSettings } from './modals/NotificationSetting';

class ProfileUserComponent extends React.Component<PageProps & { resp: User }> {
    handleSend = () => {
        this.props.router.pushAndReset('Conversation', { 'flexibleId': this.props.router.params.id });
    }

    render() {
        return (
            <>
                <YQuery query={OnlineQuery} variables={{ userId: this.props.router.params.id }}>
                    {online => {
                        let sub = undefined;
                        if (online.data && online.data.user && !online.data.user.online && online.data.user.lastSeen) {
                            sub = formatLastSeen(online.data.user.lastSeen);
                        } else {
                            sub = 'online'
                        }
                        return (
                            <ZListItemHeader
                                photo={this.props.resp.user.photo}
                                id={this.props.resp.user.id}
                                title={this.props.resp.user.name}
                                subtitle={sub}
                                action="Send message"
                                onPress={this.handleSend}
                            />
                        );
                    }}
                </YQuery>

                <ZListItemGroup header="About" divider={false}>
                    {!!this.props.resp.user.about && <ZListItem multiline={true} text={this.props.resp.user.about} copy={true} />}
                    {!!this.props.resp.user.about && <View height={10} />}
                    {!!this.props.resp.user.shortname && <ZListItem title="Username" text={'@' + this.props.resp.user.shortname} copy={true} />}
                    {!!this.props.resp.user.email && <ZListItem title="Email" text={this.props.resp.user.email} copy={true} />}
                    {!!this.props.resp.user.phone && <ZListItem title="Phone" text={'tel:' + this.props.resp.user.phone} copy={true} />}
                    {!!this.props.resp.user.website && <ZListItem title="Website" text={this.props.resp.user.website} copy={true} />}
                    {!!this.props.resp.user.location && <ZListItem title="Location" text={this.props.resp.user.location} copy={true} />}
                </ZListItemGroup>

                <ZListItemGroup header="Organization" footer={null} divider={false}>
                    {!!this.props.resp.user.primaryOrganization && (
                        <ZListItem
                            leftAvatar={{
                                photo: this.props.resp.user.primaryOrganization.photo,
                                key: this.props.resp.user.primaryOrganization.id,
                                title: this.props.resp.user.primaryOrganization.name
                            }}
                            text={this.props.resp.user.primaryOrganization.name}
                            path="ProfileOrganization"
                            pathParams={{ id: this.props.resp.user.primaryOrganization.id }}
                        />
                    )}
                </ZListItemGroup>

                <ZListItemGroup header="Settings" footer={null} divider={false}>
                    <NotificationSettings id={(this.props.resp.conversation as User_conversation_PrivateRoom).id} mute={!!(this.props.resp.conversation as User_conversation_PrivateRoom).settings.mute} />
                </ZListItemGroup>
            </>
        );
    }
}

class ProfileUserComponentLoader extends React.Component<PageProps> {
    render() {
        return (
            <>
                <SHeader title="Info" />
                <SScrollView>
                    <ZQuery query={UserQuery} variables={{ userId: this.props.router.params.id }}>
                        {(resp) => (<ProfileUserComponent {...this.props} resp={resp.data} />)}
                    </ZQuery>
                </SScrollView>
            </>
        );
    }
}

export const ProfileUser = withApp(ProfileUserComponentLoader, { navigationAppearance: 'small-hidden' });