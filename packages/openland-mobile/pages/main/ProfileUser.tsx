import * as React from 'react';
import { NavigationInjectedProps } from 'react-navigation';
import { withApp } from '../../components/withApp';
import { ZQuery } from '../../components/ZQuery';
import { UserQuery } from 'openland-api';
import { ZListItemHeader } from '../../components/ZListItemHeader';
import { ZListItemGroup } from '../../components/ZListItemGroup';
import { ZListItem } from '../../components/ZListItem';
import { ZScrollView } from '../../components/ZScrollView';
import { PageProps } from '../../components/PageProps';
import { FastHeader } from 'react-native-fast-navigation/FastHeader';

class ProfileUserComponent extends React.Component<PageProps> {

    handleSend = () => {
        this.props.router.push('Conversation', { 'id': this.props.router.params.id });
    }

    render() {
        return (
            <>
                <FastHeader title="Info" />
                <ZQuery query={UserQuery} variables={{ userId: this.props.router.params.id }}>
                    {(resp) => {
                        return (
                            <ZScrollView>
                                <ZListItemHeader
                                    photo={resp.data.user.photo}
                                    id={resp.data.user.id}
                                    title={resp.data.user.name}
                                    subtitle={resp.data.user.primaryOrganization ? resp.data.user.primaryOrganization.name : 'Person'}
                                    action="Send message"
                                    onPress={this.handleSend}
                                />

                                <ZListItemGroup header="Contacts">
                                    {resp.data.user.about && <ZListItem title="about" multiline={true} text={resp.data.user.about} />}
                                    {resp.data.user.email && <ZListItem title="email" text={resp.data.user.email} />}
                                    {resp.data.user.phone && <ZListItem title="phone" text={resp.data.user.phone} />}
                                    {resp.data.user.website && <ZListItem title="website" text={resp.data.user.website} />}
                                    {resp.data.user.location && <ZListItem title="location" text={resp.data.user.location} />}
                                </ZListItemGroup>
                            </ZScrollView>
                        );
                    }}
                </ZQuery>
            </>
        );
    }
}

export const ProfileUser = withApp(ProfileUserComponent, { navigationAppearance: 'small-hidden' });