import * as React from 'react';
import { withApp } from '../../components/withApp';
import { ZQuery } from '../../components/ZQuery';
import { UserQuery, OnlineQuery, RoomSettingsUpdateMutation } from 'openland-api';
import { ZListItemHeader } from '../../components/ZListItemHeader';
import { ZListItemGroup } from '../../components/ZListItemGroup';
import { ZListItem } from '../../components/ZListItem';
import { PageProps } from '../../components/PageProps';
import { SScrollView } from 'react-native-s/SScrollView';
import { SHeader } from 'react-native-s/SHeader';
import { YQuery } from 'openland-y-graphql/YQuery';
import * as humanize from 'humanize';
import { formatDate } from '../../utils/formatDate';
import { YMutation } from 'openland-y-graphql/YMutation';
import { stopLoader, startLoader } from '../../components/ZGlobalLoader';
import { Alert, View, Platform, Clipboard } from 'react-native';
import { AlertBlanketBuilder } from 'openland-mobile/components/AlertBlanket';
import { ActionSheetBuilder } from 'openland-mobile/components/ActionSheet';
class ProfileUserComponent extends React.Component<PageProps> {

    handleSend = () => {
        this.props.router.pushAndReset('Conversation', { 'flexibleId': this.props.router.params.id });
    }

    render() {
        return (
            <>
                <SHeader title="Info" />
                <ZQuery query={UserQuery} variables={{ userId: this.props.router.params.id }}>
                    {(resp) => {
                        return (
                            <SScrollView>

                                <YQuery query={OnlineQuery} variables={{ userId: this.props.router.params.id }}>
                                    {online => {
                                        let sub = undefined;
                                        if (online.data && online.data.user && !online.data.user.online && online.data.user.lastSeen) {
                                            let time = new Date(parseInt(online.data.user.lastSeen, 10)).getTime();
                                            if (new Date().getTime() - time < 1000 * 60 * 60 * 24) {
                                                sub = 'last seen ' + humanize.relativeTime(time / 1000);
                                            } else if (new Date().getTime() - time < 1000 * 60) {
                                                sub = 'just now';
                                            } else {
                                                sub = 'last seen ' + formatDate(time);
                                            }
                                        } else {
                                            sub = 'online'
                                        }
                                        return (
                                            <ZListItemHeader
                                                photo={resp.data.user.photo}
                                                id={resp.data.user.id}
                                                title={resp.data.user.name}
                                                subtitle={sub}
                                                action="Send message"
                                                onPress={this.handleSend}
                                            />
                                        );
                                    }}
                                </YQuery>

                                <ZListItemGroup header={null} divider={false}>
                                    {!!resp.data.user.about && <ZListItem title="About" multiline={true} text={resp.data.user.about} copy={true} />}
                                    {!!resp.data.user.shortname && <ZListItem title="Username" multiline={true} text={'@' + resp.data.user.shortname} copy={true} />}
                                    {!!resp.data.user.email && <ZListItem title="Email" text={resp.data.user.email} copy={true} />}
                                    {!!resp.data.user.phone && <ZListItem title="Phone" text={'tel:' + resp.data.user.phone} copy={true} />}
                                    {!!resp.data.user.website && <ZListItem title="Website" text={resp.data.user.website} copy={true} />}
                                    {!!resp.data.user.location && <ZListItem title="Location" text={resp.data.user.location} copy={true} />}
                                </ZListItemGroup>
                                {!!resp.data.user.primaryOrganization && (
                                    <ZListItemGroup header={null} divider={false}>
                                        <ZListItem leftAvatar={{ photo: resp.data.user.primaryOrganization.photo, key: resp.data.user.primaryOrganization.id, title: resp.data.user.primaryOrganization.name }} multiline={true} text={resp.data.user.primaryOrganization.name} path="ProfileOrganization" pathParams={{ id: resp.data.user.primaryOrganization.id }} description="Organization" />
                                    </ZListItemGroup>
                                )}
                                <ZListItemGroup header={null} divider={false}>
                                    <YMutation mutation={RoomSettingsUpdateMutation} {...{ leftIcon: true }}>
                                        {(update) => {
                                            let toggle = async () => {
                                                startLoader();
                                                try {
                                                    await update({ variables: { roomId: resp.data.conversation.id, settings: { mute: !resp.data.conversation.settings.mute } } });
                                                } catch (e) {
                                                    new AlertBlanketBuilder().alert(e.message);
                                                }
                                                stopLoader();
                                            };
                                            return (
                                                <ZListItem
                                                    leftIcon={Platform.OS === 'android' ? require('assets/ic-notifications-24.png') : require('assets/ic-notifications-fill-24.png')}
                                                    text="Notifications"
                                                    toggle={!resp.data.conversation.settings.mute}
                                                    onToggle={toggle}
                                                    onPress={toggle}
                                                />
                                            );
                                        }
                                        }
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

export const ProfileUser = withApp(ProfileUserComponent, { navigationAppearance: 'small-hidden' });