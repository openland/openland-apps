import * as React from 'react';
import { NavigationInjectedProps } from 'react-navigation';
import { withApp } from '../../components/withApp';
import { ZQuery } from '../../components/ZQuery';
import { UserQuery } from 'openland-api';
import { ScrollView } from 'react-native';
import { ZListItemHeader } from '../../components/ZListItemHeader';
import { ZListItemGroup } from '../../components/ZListItemGroup';
import { ZListItem } from '../../components/ZListItem';

class ProfileUserComponent extends React.Component<NavigationInjectedProps> {
    static navigationOptions = {
        title: 'Info'
    };
    handleSend = () => {
        this.props.navigation.navigate('Conversation', { 'id': this.props.navigation.getParam('id') });
    }

    render() {
        return (
            <ZQuery query={UserQuery} variables={{ userId: this.props.navigation.getParam('id') }}>
                {(resp) => {
                    return (
                        <ScrollView>
                            <ZListItemGroup>
                                <ZListItemHeader
                                    photo={resp.data.user.photo}
                                    id={resp.data.user.id}
                                    title={resp.data.user.name}
                                    subtitle="Person"
                                />
                                <ZListItem text="Send message" appearance="action" onPress={this.handleSend} />
                                {resp.data.user.about && <ZListItem text={resp.data.user.about} />}
                            </ZListItemGroup>

                            <ZListItemGroup header="Contacts">
                                {resp.data.user.email && <ZListItem text={resp.data.user.email} />}
                                {resp.data.user.phone && <ZListItem text={resp.data.user.phone} />}
                                {resp.data.user.website && <ZListItem text={resp.data.user.website} />}
                                {resp.data.user.location && <ZListItem text={resp.data.user.location} />}
                            </ZListItemGroup>
                        </ScrollView>
                    );
                }}
            </ZQuery>
        );
    }
}

export const ProfileUser = withApp(ProfileUserComponent);