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
import * as humanize from 'humanize';
import { formatTime } from '../../utils/formatTime';
class ProfileUserComponent extends React.Component<PageProps> {

    handleSend = () => {
        this.props.router.push('Conversation', { 'flexibleId': this.props.router.params.id });
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
                                            if (new Date().getTime() - time > 1000 * 60 * 60 * 24) {
                                                sub = 'Last seen ' + humanize.relativeTime(time / 1000);
                                            } else {
                                                sub = 'Last seen ' + formatTime(time);
                                            }
                                        }
                                        return (
                                            <ZListItemHeader
                                                photo={resp.data.user.photo}
                                                id={resp.data.user.id}
                                                title={resp.data.user.name}
                                                subtitle={resp.data.user.primaryOrganization ? resp.data.user.primaryOrganization.name : 'Person'}
                                                subsubtitle={sub}
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
                                    {!!resp.data.user.location && <ZListItem title="location" text={resp.data.user.location} />}
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