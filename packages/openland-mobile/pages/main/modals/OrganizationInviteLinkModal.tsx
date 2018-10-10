import * as React from 'react';
import { withApp } from '../../../components/withApp';
import { ZListItemGroup } from '../../../components/ZListItemGroup';
import { Share, Alert, Clipboard } from 'react-native';
import { PageProps } from '../../../components/PageProps';
import { SScrollView } from 'react-native-s/SScrollView';
import { SHeader } from 'react-native-s/SHeader';
import { YQuery } from 'openland-y-graphql/YQuery';
import { OrganizationPublicInviteQuery, OrganizationCreatePublicInviteMutation } from 'openland-api';
import { ZListItem } from '../../../components/ZListItem';
import { YMutation } from 'openland-y-graphql/YMutation';
import { startLoader, stopLoader } from '../../../components/ZGlobalLoader';

class OrganizationInviteLinkModalComponent extends React.PureComponent<PageProps> {

    render() {
        return (
            <>
                <SHeader title="Organization invite link" />
                <SScrollView>
                    <YQuery query={OrganizationPublicInviteQuery} variables={{ organizationId: this.props.router.params.id }}>
                        {data => (
                            <>
                                <ZListItemGroup footer="People can join organization by following this link. You can renew the link ad any time">
                                    {data && data.data && data.data.publicInvite && (<ZListItem
                                        key="add"
                                        text={`https://app.openland.com/join/${data.data!.publicInvite!.key}`}
                                        appearance="action"
                                        onPress={() => Share.share({ title: 'Join Openland! - Messaging for smart people', message: `Join Openland! - Messaging for smart people https://app.openland.com/join/${data.data!.publicInvite!.key}` })}
                                    />)}
                                </ZListItemGroup>
                                <ZListItemGroup >
                                    <ZListItem appearance="action" text="Copy link" onPress={() => Clipboard.setString(`Join Openland! - Messaging for smart people https://app.openland.com/join/${data.data!.publicInvite!.key}`)} />
                                    <ZListItem appearance="action" text="Share link" onPress={() => Share.share({ title: 'Join Openland! - Messaging for smart people', message: `Join Openland! - Messaging for smart people https://app.openland.com/join/${data.data!.publicInvite!.key}` })} />
                                    <YMutation mutation={OrganizationCreatePublicInviteMutation} variables={{ organizationId: this.props.router.params.id }} refetchQueriesVars={[{ query: OrganizationPublicInviteQuery, variables: { organizationId: this.props.router.params.id } }]}>
                                        {renew => <ZListItem
                                            appearance="action"
                                            text="Renew link"
                                            onPress={async () => {
                                                startLoader();
                                                try {
                                                    await renew({ variables: { organizationId: this.props.router.params.id } });
                                                } catch (e) {
                                                    Alert.alert(e);
                                                }
                                                stopLoader();

                                            }}
                                        />}
                                    </YMutation>
                                </ZListItemGroup>
                            </>)}

                    </YQuery>

                </SScrollView>
            </>
        );
    }
}

export const OrganizationInviteLinkModal = withApp(OrganizationInviteLinkModalComponent, { navigationAppearance: 'small' });