import * as React from 'react';
import { withApp } from '../../components/withApp';
import { ZListItemGroup } from '../../components/ZListItemGroup';
import { Share, Clipboard } from 'react-native';
import { PageProps } from '../../components/PageProps';
import { SScrollView } from 'react-native-s/SScrollView';
import { SHeader } from 'react-native-s/SHeader';
import { ZListItem } from '../../components/ZListItem';
import { startLoader, stopLoader } from '../../components/ZGlobalLoader';
import { formatError } from 'openland-y-forms/errorHandling';
import { Alert } from 'openland-mobile/components/AlertBlanket';
import { getMessenger } from 'openland-mobile/utils/messenger';
import { getClient } from 'openland-mobile/utils/apolloClient';
import { XMemo } from 'openland-y-utils/XMemo';

const OrganizationInviteLinkContent = XMemo<PageProps>((props) => {
    let invite = getClient().useOrganizationPublicInvite({ organizationId: props.router.params.id }, { fetchPolicy: 'network-only' }).publicInvite!;
    return (
        <>
            <ZListItemGroup footer="People can join organization by following this link. You can renew the link at any time">
                <ZListItem
                    key="add"
                    text={`https://openland.com/join/${invite.key}`}
                    appearance="action"
                    onPress={() => Share.share({ message: `https://openland.com/join/${invite.key}` })}
                    copy={true}
                />
            </ZListItemGroup>
            <ZListItemGroup >
                <ZListItem appearance="action" text="Copy link" onPress={() => Clipboard.setString(`https://openland.com/join/${invite.key}`)} />
                <ZListItem appearance="action" text="Share link" onPress={() => Share.share({ message: `https://openland.com/join/${invite.key}` })} />
                <ZListItem
                    appearance="action"
                    text="Renew link"
                    onPress={async () => {
                        startLoader();
                        try {
                            await getMessenger().engine.client.mutateOrganizationCreatePublicInvite({ organizationId: props.router.params.id });
                            await getClient().refetchOrganizationPublicInvite({ organizationId: props.router.params.id });
                        } catch (e) {
                            Alert.alert(formatError(e));
                        }
                        stopLoader();

                    }}
                />
            </ZListItemGroup>
        </>
    )
});

class OrganizationInviteLinkModalComponent extends React.PureComponent<PageProps> {

    render() {
        return (
            <>
                <SHeader title="Organization invite link" />
                <SScrollView>
                    <OrganizationInviteLinkContent {...this.props} />
                </SScrollView>
            </>
        );
    }
}

export const ProfileOrganizationLink = withApp(OrganizationInviteLinkModalComponent, { navigationAppearance: 'small' });