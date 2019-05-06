import * as React from 'react';
import { Organization_organization_rooms } from 'openland-api/Types';
import { withApp } from '../../components/withApp';
import { PageProps } from '../../components/PageProps';
import { ZListItemGroup } from '../../components/ZListItemGroup';
import { SRouter } from 'react-native-s/SRouter';
import { SHeader } from 'react-native-s/SHeader';
import { SScrollView } from 'react-native-s/SScrollView';
import { getClient } from 'openland-mobile/utils/apolloClient';
import { XMemo } from 'openland-y-utils/XMemo';
import { GroupView } from './components/GroupView';

class GroupsList extends React.PureComponent<{ groups: (Organization_organization_rooms | null)[], router: SRouter }> {
    render() {
        return (
            <SScrollView>
                <ZListItemGroup divider={false}>
                    {this.props.groups
                        .sort((a, b) => (b!.membersCount || 0) - (a!.membersCount || 0))
                        .map((v) => (
                            <GroupView
                                key={v!!.id}
                                item={v!}
                                onPress={() => this.props.router.push('Conversation', { flexibleId: v!!.id })}
                            />
                        ))}
                </ZListItemGroup>
            </SScrollView>
        );
    }
}

const ProfileOrganizationGroupsComponent = XMemo<PageProps>((props) => {
    let organization = getClient().useOrganizationWithoutMembers({ organizationId: props.router.params.organizationId }, { fetchPolicy: 'cache-and-network' }).organization;
    return (
        <>
            <SHeader title={props.router.params.title || 'Groups'} />
            <GroupsList router={props.router} groups={organization.rooms} />
        </>
    )
});

export const ProfileOrganizationGroups = withApp(ProfileOrganizationGroupsComponent, { navigationAppearance: 'small-hidden' });
