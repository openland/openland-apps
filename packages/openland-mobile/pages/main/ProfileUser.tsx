import * as React from 'react';
import { NavigationInjectedProps } from 'react-navigation';
import { withApp } from '../../components/withApp';
import { ZQuery } from '../../components/ZQuery';
import { UserQuery } from 'openland-api';
import { ZListItemHeader } from '../../components/ZListItemHeader';
import { ZListItemGroup } from '../../components/ZListItemGroup';
import { ZListItem } from '../../components/ZListItem';
import { ZScrollView } from '../../components/ZScrollView';
import { ZHeader } from '../../components/ZHeader';

class ProfileUserComponent extends React.Component<NavigationInjectedProps> {

    handleSend = () => {
        this.props.navigation.navigate('Conversation', { 'id': this.props.navigation.getParam('id') });
    }

    render() {
        return (
            <>
                <ZHeader title="Info" />
                <ZQuery query={UserQuery} variables={{ userId: this.props.navigation.getParam('id') }}>
                    {(resp) => {
                        return (
                            <ZScrollView>
                                <ZListItemHeader
                                    photo={resp.data.user.photo}
                                    id={resp.data.user.id}
                                    title={resp.data.user.name}
                                    subtitle="Person"
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