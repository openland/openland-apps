import * as React from 'react';
import { withApp } from '../../components/withApp';
import { ZListGroup } from '../../components/ZListGroup';
import { Share, Clipboard } from 'react-native';
import { PageProps } from '../../components/PageProps';
import { SScrollView } from 'react-native-s/SScrollView';
import { SHeader } from 'react-native-s/SHeader';
import { ZListItem } from '../../components/ZListItem';
import { startLoader, stopLoader } from '../../components/ZGlobalLoader';
import { formatError } from 'openland-y-forms/errorHandling';
import Alert from 'openland-mobile/components/AlertBlanket';
import Toast from 'openland-mobile/components/Toast';
import { getMessenger } from 'openland-mobile/utils/messenger';
import { getClient } from 'openland-mobile/utils/graphqlClient';
import { XMemo } from 'openland-y-utils/XMemo';
import { OrganizationWithoutMembers_organization } from 'openland-api/Types';
import { ZTrack } from 'openland-mobile/analytics/ZTrack';
import { trackEvent } from 'openland-mobile/analytics';
import { InviteLinkView } from './components/InviteLinkView';

const OrganizationInviteLinkContent = XMemo<PageProps>((props) => {
    const { id, isCommunity } = props.router.params.organization as OrganizationWithoutMembers_organization;
    const invite = getClient().useOrganizationPublicInvite({ organizationId: id }, { fetchPolicy: 'network-only' }).publicInvite!;
    const link = 'https://openland.com/join/' + invite.key;
    const orgType = isCommunity ? 'community' : 'organization';

    const handleCopyClick = React.useCallback(() => {
        trackEvent('invite_link_action', {
            invite_type: orgType,
            action_type: 'link_copied'
        });

        Clipboard.setString(link);
        Toast.showCopiedLink();
    }, [link]);

    const handleShareClick = React.useCallback(() => {
        trackEvent('invite_link_action', {
            invite_type: orgType,
            action_type: 'link_shared'
        });

        Share.share({ message: link });
    }, [link]);

    const handleRevokeClick = React.useCallback(async () => {
        startLoader();
        try {
            await getMessenger().engine.client.mutateOrganizationCreatePublicInvite({ organizationId: id });
            await getClient().refetchOrganizationPublicInvite({ organizationId: id });
        } catch (e) {
            Alert.alert(formatError(e));
        }
        stopLoader();
    }, [id]);

    return (
        <ZTrack event="invite_view" params={{ invite_type: orgType }}>
            <InviteLinkView
                link={link}
                onPress={handleShareClick}
                footer={`People can join ${orgType} by following this link. You can renew the link at any time`}
            />

            <ZListGroup>
                <ZListItem
                    leftIcon={require('assets/ic-copy-24.png')}
                    small={true}
                    text="Copy link"
                    onPress={handleCopyClick}
                />
                <ZListItem
                    leftIcon={require('assets/ic-share-24.png')}
                    small={true}
                    text="Share link"
                    onPress={handleShareClick}
                />
                <ZListItem
                    leftIcon={require('assets/ic-refresh-24.png')}
                    small={true}
                    text="Revoke link"
                    onPress={handleRevokeClick}
                />
            </ZListGroup>
        </ZTrack>
    );
});

class OrganizationInviteLinkModalComponent extends React.PureComponent<PageProps> {
    render() {
        const { isCommunity } = this.props.router.params.organization as OrganizationWithoutMembers_organization;

        return (
            <>
                <SHeader title={(isCommunity ? 'Community' : 'Organization') + ' invite link'} />
                <SScrollView>
                    <OrganizationInviteLinkContent {...this.props} />
                </SScrollView>
            </>
        );
    }
}

export const ProfileOrganizationLink = withApp(OrganizationInviteLinkModalComponent, { navigationAppearance: 'small' });