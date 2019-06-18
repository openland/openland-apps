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
import { getClient } from 'openland-mobile/utils/graphqlClient';
import { XMemo } from 'openland-y-utils/XMemo';
import { OrganizationMembersShortPaginated_organization } from 'openland-api/Types';
import { ZTrack } from 'openland-mobile/analytics/ZTrack';
import { trackEvent } from 'openland-mobile/analytics';

const OrganizationInviteLinkContent = XMemo<PageProps>((props) => {
    const organization = props.router.params.organization as OrganizationMembersShortPaginated_organization;
    const invite = getClient().useOrganizationPublicInvite({ organizationId: organization.id }, { fetchPolicy: 'network-only' }).publicInvite!;
    const link = 'https://openland.com/join/' + invite.key;
    const orgType = organization.isCommunity ? 'community' : 'organization';

    const handleCopyClick = React.useCallback(() => {
        trackEvent('invite_link_action', {
            invite_type: orgType,
            action_type: 'link_copied'
        });

        Clipboard.setString(link);
    }, [link]);

    const handleShareClick = React.useCallback(() => {
        trackEvent('invite_link_action', {
            invite_type: orgType,
            action_type: 'link_shared'
        });

        Share.share({ message: link });
    }, [link]);

    return (
        <ZTrack event="invite_view" params={{ invite_type: orgType }}>
            <ZListItemGroup footer={'People can join ' + orgType + ' by following this link. You can renew the link at any time'}>
                <ZListItem
                    key="add"
                    text={link}
                    appearance="action"
                    onPress={handleShareClick}
                    copy={true}
                />
            </ZListItemGroup>
            <ZListItemGroup >
                <ZListItem appearance="action" text="Copy link" onPress={handleCopyClick} />
                <ZListItem appearance="action" text="Share link" onPress={handleShareClick} />
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
        </ZTrack>
    )
});

class OrganizationInviteLinkModalComponent extends React.PureComponent<PageProps> {
    render() {
        const organization = this.props.router.params.organization as OrganizationMembersShortPaginated_organization;

        return (
            <>
                <SHeader title={(organization.isCommunity ? 'Community' : 'Organization') + ' invite link'} />
                <SScrollView>
                    <OrganizationInviteLinkContent {...this.props} />
                </SScrollView>
            </>
        );
    }
}

export const ProfileOrganizationLink = withApp(OrganizationInviteLinkModalComponent, { navigationAppearance: 'small' });