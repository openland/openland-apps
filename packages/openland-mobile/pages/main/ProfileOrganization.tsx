import * as React from 'react';
import { withApp } from '../../components/withApp';
import { ZQuery } from '../../components/ZQuery';
import { OrganizationQuery } from 'openland-api';
import { ZListItemHeader } from '../../components/ZListItemHeader';
import { ZListItemGroup } from '../../components/ZListItemGroup';
import { ZListItem } from '../../components/ZListItem';
import { ZScrollView } from '../../components/ZScrollView';
import { PageProps } from '../../components/PageProps';
import { FastHeader } from 'react-native-fast-navigation/FastHeader';

class ProfileOrganizationComponent extends React.Component<PageProps> {

    handleSend = () => {
        this.props.router.push('Conversation', { 'id': this.props.router.params.id });
    }

    render() {
        return (
            <>
                <FastHeader title="Info" />
                <ZQuery query={OrganizationQuery} variables={{ organizationId: this.props.router.params.id }}>
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
            </>
        );
    }
}

export const ProfileOrganization = withApp(ProfileOrganizationComponent, { navigationAppearance: 'small-hidden' });