import * as React from 'react';
import { withApp } from '../../../components/withApp';
import { ZListItemGroup } from '../../../components/ZListItemGroup';
import { Share, Clipboard } from 'react-native';
import { PageProps } from '../../../components/PageProps';
import { SScrollView } from 'react-native-s/SScrollView';
import { SHeader } from 'react-native-s/SHeader';
import { YQuery } from 'openland-y-graphql/YQuery';
import { OrganizationPublicInviteQuery, OrganizationCreatePublicInviteMutation } from 'openland-api';
import { ZListItem } from '../../../components/ZListItem';
import { YMutation } from 'openland-y-graphql/YMutation';
import { startLoader, stopLoader } from '../../../components/ZGlobalLoader';
import { formatError } from 'openland-y-forms/errorHandling';
import { Alert } from 'openland-mobile/components/AlertBlanket';
import { getClient } from 'openland-mobile/utils/apolloClient';
import { getMessenger } from 'openland-mobile/utils/messenger';

class OrganizationInviteLinkModalComponent extends React.PureComponent<PageProps> {

    render() {
        return (
            <>
                <SHeader title="Organization invite link" />
                <SScrollView>
                    <YQuery query={OrganizationPublicInviteQuery} variables={{ organizationId: this.props.router.params.id }}>
                        {data => (
                            <>
                                <ZListItemGroup footer="People can join organization by following this link. You can renew the link at any time">
                                    {data && data.data && data.data.publicInvite && (<ZListItem
                                        key="add"
                                        text={`https://openland.com/join/${data.data!.publicInvite!.key}`}
                                        appearance="action"
                                        onPress={() => Share.share({ message: `https://openland.com/join/${data.data!.publicInvite!.key}` })}
                                    />)}
                                </ZListItemGroup>
                                <ZListItemGroup >
                                    <ZListItem appearance="action" text="Copy link" onPress={() => Clipboard.setString(`https://openland.com/join/${data.data!.publicInvite!.key}`)} />
                                    <ZListItem appearance="action" text="Share link" onPress={() => Share.share({ message: `https://openland.com/join/${data.data!.publicInvite!.key}` })} />
                                    <ZListItem
                                        appearance="action"
                                        text="Renew link"
                                        onPress={async () => {
                                            startLoader();
                                            try {
                                                await getMessenger().engine.client.mutateOrganizationCreatePublicInvite({ organizationId: this.props.router.params.id });
                                            } catch (e) {
                                                Alert.alert(formatError(e));
                                            }
                                            stopLoader();

                                        }}
                                    />
                                </ZListItemGroup>
                            </>)}

                    </YQuery>

                </SScrollView>
            </>
        );
    }
}

export const OrganizationInviteLinkModal = withApp(OrganizationInviteLinkModalComponent, { navigationAppearance: 'small' });