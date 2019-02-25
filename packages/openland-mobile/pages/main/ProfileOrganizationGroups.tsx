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
import { GroupView } from './components/GoupView';

class ChannelsList extends React.PureComponent<{ channels: (Organization_organization_rooms | null)[], router: SRouter }> {
    render() {
        return (
            <SScrollView>
                <ZListItemGroup divider={false}>
                    {this.props.channels
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
    let org = getClient().useOrganization({ organizationId: props.router.params.organizationId });
    return (
        <>
            <SHeader title={props.router.params.title || 'Groups'} />
            <ChannelsList router={props.router} channels={org.organization.rooms} />
        </>
    )
});

export const ProfileOrganizationGroups = withApp(ProfileOrganizationGroupsComponent, { navigationAppearance: 'small-hidden' });
