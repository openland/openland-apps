import * as React from 'react';
import { NavigationInjectedProps } from 'react-navigation';
import { withApp } from '../../components/withApp';
import { ZQuery } from '../../components/ZQuery';
import { UserQuery, OrganizationQuery } from 'openland-api';
import { ScrollView } from 'react-native';
import { ZListItemHeader } from '../../components/ZListItemHeader';
import { ZListItemGroup } from '../../components/ZListItemGroup';
import { ZListItem } from '../../components/ZListItem';

class ProfileOrganizationComponent extends React.Component<NavigationInjectedProps> {
    static navigationOptions = {
        title: 'Info'
    };

    handleSend = () => {
        this.props.navigation.navigate('Conversation', { 'id': this.props.navigation.getParam('id') });
    }

    render() {
        return (
            <ZQuery query={OrganizationQuery} variables={{ organizationId: this.props.navigation.getParam('id') }}>
                {(resp) => (
                    <ScrollView>
                        <ZListItemGroup>
                            <ZListItemHeader
                                photo={resp.data.organization.photo}
                                id={resp.data.organization.id}
                                title={resp.data.organization.name}
                                subtitle={resp.data.organization.website}
                            />
                            <ZListItem text="Send message" appearance="action" onPress={this.handleSend} />
                            {resp.data.organization.about && <ZListItem text={resp.data.organization.about} />}
                        </ZListItemGroup>
                        <ZListItemGroup header="Contacts">
                            {resp.data.organization.facebook && <ZListItem text={resp.data.organization.facebook} />}
                            {resp.data.organization.twitter && <ZListItem text={resp.data.organization.twitter} />}
                        </ZListItemGroup>
                    </ScrollView>
                )}
            </ZQuery>
        );
    }
}

export const ProfileOrganization = withApp(ProfileOrganizationComponent);