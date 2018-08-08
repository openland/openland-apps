import * as React from 'react';
import { NavigationInjectedProps } from 'react-navigation';
import { withApp } from '../../components/withApp';
import { ZQuery } from '../../components/ZQuery';
import { OrganizationQuery } from 'openland-api';
import { ZListItemHeader } from '../../components/ZListItemHeader';
import { ZListItemGroup } from '../../components/ZListItemGroup';
import { ZListItem } from '../../components/ZListItem';
import { ZScrollView } from '../../components/ZScrollView';

class ProfileOrganizationComponent extends React.Component<NavigationInjectedProps> {
    static navigationOptions = {
        headerAppearance: 'small-hidden',
        title: 'Info'
    };

    handleSend = () => {
        this.props.navigation.navigate('Conversation', { 'id': this.props.navigation.getParam('id') });
    }

    render() {
        return (
            <ZQuery query={OrganizationQuery} variables={{ organizationId: this.props.navigation.getParam('id') }}>
                {(resp) => (
                    <ZScrollView backgroundColor={'#fff'}>
                        <ZListItemHeader
                            photo={resp.data.organization.photo}
                            id={resp.data.organization.id}
                            title={resp.data.organization.name}
                            subtitle="Organization"
                            action="Send message"
                            onPress={this.handleSend}
                        />
                        <ZListItemGroup header="Information">
                            {resp.data.organization.about && <ZListItem multiline={true} title="about" text={resp.data.organization.about} />}
                            {resp.data.organization.website && <ZListItem title="website" text={resp.data.organization.website} />}
                            {resp.data.organization.facebook && <ZListItem title="facebook" text={resp.data.organization.facebook} />}
                            {resp.data.organization.twitter && <ZListItem title="twitter" text={resp.data.organization.twitter} />}
                        </ZListItemGroup>
                    </ZScrollView>
                )}
            </ZQuery>
        );
    }
}

export const ProfileOrganization = withApp(ProfileOrganizationComponent, { navigationStyle: 'small' });