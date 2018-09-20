import * as React from 'react';
import { withApp } from '../../components/withApp';
import { ZQuery } from '../../components/ZQuery';
import { OrganizationQuery } from 'openland-api';
import { ZListItemHeader } from '../../components/ZListItemHeader';
import { ZListItemGroup } from '../../components/ZListItemGroup';
import { ZListItem } from '../../components/ZListItem';
import { PageProps } from '../../components/PageProps';
import { SScrollView } from 'react-native-s/SScrollView';
import { SHeader } from 'react-native-s/SHeader';

class ProfileOrganizationComponent extends React.Component<PageProps> {

    handleSend = () => {
        this.props.router.push('Conversation', { 'flexibleId': this.props.router.params.id });
    }

    render() {
        return (
            <>
                <SHeader title="Info" />
                <ZQuery query={OrganizationQuery} variables={{ organizationId: this.props.router.params.id }}>
                    {(resp) => {
                        return (
                            <>
                                <SScrollView backgroundColor={'#fff'}>
                                    <ZListItemHeader
                                        photo={resp.data.organization.photo}
                                        id={resp.data.organization.id}
                                        title={resp.data.organization.name}
                                        subtitle="Organization"
                                        action="Send message"
                                        onPress={this.handleSend}
                                    />
                                    {(resp.data.organization.isMine || resp.data.organization.isOwner) && (
                                        <ZListItemGroup header={null}>
                                            <ZListItem text="Edit info" appearance="action" onPress={() => this.props.router.push('EditOrganization', { id: this.props.router.params.id })} />
                                            <ZListItem text="Make primary" appearance="action" />
                                            <ZListItem text="Manage members" appearance="action" />
                                        </ZListItemGroup>
                                    )}
                                    <ZListItemGroup header="Information">
                                        {resp.data.organization.about && <ZListItem multiline={true} title="about" text={resp.data.organization.about} />}
                                        {resp.data.organization.website && <ZListItem title="website" text={resp.data.organization.website} />}
                                        {resp.data.organization.facebook && <ZListItem title="facebook" text={resp.data.organization.facebook} />}
                                        {resp.data.organization.twitter && <ZListItem title="twitter" text={resp.data.organization.twitter} />}
                                    </ZListItemGroup>

                                    <ZListItemGroup header="Members">
                                        {resp.data.organization.members.map((v) => (
                                            <ZListItem
                                                key={v.user.id}
                                                text={v.user.name}
                                                leftAvatar={{ photo: v.user.picture, title: v.user.name, key: v.user.id }}
                                                onPress={() => this.props.router.push('ProfileUser', { id: v.user.id })}
                                            />
                                        ))}
                                    </ZListItemGroup>
                                </SScrollView>
                            </>
                        );
                    }}
                </ZQuery>
            </>
        );
    }
}

export const ProfileOrganization = withApp(ProfileOrganizationComponent, { navigationAppearance: 'small-hidden' });