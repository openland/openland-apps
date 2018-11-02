import * as React from 'react';
import { withApp } from '../../components/withApp';
import { ZQuery } from '../../components/ZQuery';
import { UserQuery, OnlineQuery, ConversationSettingsUpdateMutation } from 'openland-api';
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
import { Alert, View } from 'react-native';
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
                                        }
                                        return (
                                            <ZListItemHeader
                                                photo={resp.data.user.photo}
                                                id={resp.data.user.id}
                                                title={resp.data.user.name}
                                                subtitle={sub || (resp.data.user.primaryOrganization ? resp.data.user.primaryOrganization.name : 'Person')}
                                                action="Send message"
                                                onPress={this.handleSend}
                                            />
                                        );
                                    }}
                                </YQuery>

                                <ZListItemGroup header="Contacts">
                                    {!!resp.data.user.about && <ZListItem title="about" multiline={true} text={resp.data.user.about} />}
                                    {!!resp.data.user.email && <ZListItem title="email" text={resp.data.user.email} />}
                                    {!!resp.data.user.phone && <ZListItem title="phone" text={resp.data.user.phone} />}
                                    {!!resp.data.user.website && <ZListItem title="website" text={resp.data.user.website} />}
                                    {!!resp.data.user.primaryOrganization && <ZListItem leftAvatar={{ photo: resp.data.user.primaryOrganization.photo, key: resp.data.user.primaryOrganization.id, title: resp.data.user.primaryOrganization.name }} multiline={true} text={resp.data.user.primaryOrganization.name} title="organization" path="ProfileOrganization" pathParams={{ id: resp.data.user.primaryOrganization.id }} />}
                                    {!!resp.data.user.location && <ZListItem title="location" text={resp.data.user.location} />}
                                    <View style={{ marginTop: 20 }} {...{ divider: true }} />
                                    <YMutation mutation={ConversationSettingsUpdateMutation} {...{ leftIcon: true }}>
                                        {(update) => {
                                            let toggle = async () => {
                                                startLoader();
                                                try {
                                                    await update({ variables: { conversationId: resp.data.conversation.id, settings: { mute: !resp.data.conversation.settings.mute } } });
                                                } catch (e) {
                                                    Alert.alert(e.message);
                                                }
                                                stopLoader();
                                            };
                                            return (
                                                <ZListItem
                                                    leftIcon={require('assets/ic-cell-notif-ios.png')}
                                                    text="Notifications"
                                                    toggle={!resp.data.conversation.settings.mute}
                                                    onToggle={toggle}
                                                    onPress={toggle}
                                                />
                                            );
                                        }
                                        }
                                    </YMutation>
                                    {!!resp.data.user.channels && <ZListItem leftIcon={require('assets/ic-cell-channels-ios.png')} text="Channels" description={resp.data.user.channels.length.toString()} path={'OrgChannels'} pathParams={{ channels: resp.data.user.channels, title: resp.data.user.name + '`s channels' }} />}

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