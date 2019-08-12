import * as React from 'react';
import { withApp } from '../../components/withApp';
import { PageProps } from '../../components/PageProps';
import { SHeader } from 'react-native-s/SHeader';
import { XMemo } from 'openland-y-utils/XMemo';
import { ZListItem } from 'openland-mobile/components/ZListItem';
import { View, Share, Text, Clipboard } from 'react-native';
import { ThemeContext } from 'openland-mobile/themes/ThemeContext';
import { SScrollView } from 'react-native-s/SScrollView';
import { getClient } from 'openland-mobile/utils/graphqlClient';
import { FontStyles } from 'openland-mobile/styles/AppStyles';
import { getMessenger } from 'openland-mobile/utils/messenger';
import { AlertBlanketBuilder } from 'openland-mobile/components/AlertBlanket';

const InvitesMoreComponent = XMemo<PageProps>((props) => {
    const theme = React.useContext(ThemeContext);

    const invite = getClient().useAccountAppInvite();
    let link = 'https://openland.com/invite/' + invite.invite;

    let shareCallback = React.useCallback(() => {
        Share.share({ message: link });
    }, [link]);
    let copyLinkCallback = React.useCallback(() => {
        Clipboard.setString(link);
    }, [link]);

    let org = getMessenger().engine.user.primaryOrganization;

    const orgInvite = getClient().useOrganizationPublicInvite({ organizationId: getMessenger().engine.user.primaryOrganization!.id });
    let orgLink = 'https://openland.com/join/' + (orgInvite.publicInvite && orgInvite.publicInvite.key);

    let shareOrgCallback = React.useCallback(() => {
        Share.share({ message: orgLink });
    }, [orgLink]);
    let copyOrgLinkCallback = React.useCallback(() => {
        Clipboard.setString(orgLink);
    }, [orgLink]);
    let revokeOrgLinkCallback = React.useCallback(() => {
        new AlertBlanketBuilder().title('Revoke link').button('cancel', 'cancel').action('revoke', 'destructive', async () => {
            await getClient().mutateOrganizationCreatePublicInvite({ organizationId: getMessenger().engine.user.primaryOrganization!.id });
            await getClient().refetchOrganizationPublicInvite({ organizationId: getMessenger().engine.user.primaryOrganization!.id });
        }).show();
    }, [orgLink]);
    return (
        <>
            <SHeader title="Other invites" />
            <SScrollView width="100%" height="100%" backgroundColor={theme.backgroundPrimary}>
                <Text style={{ fontSize: 16, fontWeight: FontStyles.Weight.Medium, marginBottom: 10, marginTop: 30, marginHorizontal: 16, color: theme.foregroundSecondary }}>{"Invite to Openland".toUpperCase()}</Text>
                <Text style={{ fontSize: 15, marginBottom: 10, marginHorizontal: 16, color: theme.foregroundPrimary }}>{link}</Text>
                <View backgroundColor={theme.separatorColor} marginLeft={16} height={1} marginBottom={8} />
                <Text style={{ fontSize: 13, marginBottom: 31, marginHorizontal: 16, color: theme.foregroundSecondary }}>{"Anyone can use this link to join Openland"}</Text>
                <ZListItem
                    appearance="action"
                    text="Copy link"
                    onPress={copyLinkCallback}
                />
                <View backgroundColor={theme.separatorColor} marginLeft={16} height={1} />
                <ZListItem
                    appearance="action"
                    text="Share link"
                    onPress={shareCallback}
                />
                <View backgroundColor={theme.separatorColor} marginLeft={16} height={1} />

                <Text style={{ fontSize: 16, fontWeight: FontStyles.Weight.Medium, marginBottom: 10, marginTop: 40, marginHorizontal: 16, color: theme.foregroundSecondary }}>{"Invite to ".toUpperCase()}<Text style={{ color: theme.accentPrimary }} onPress={() => props.router.push("ProfileOrganization", { id: org!.id })}>{getMessenger().engine.user.primaryOrganization!.name.toUpperCase()}</Text></Text>
                <Text style={{ fontSize: 15, marginBottom: 10, marginHorizontal: 16, color: theme.foregroundPrimary }}>{orgLink}</Text>
                <View backgroundColor={theme.separatorColor} marginLeft={16} height={1} />
                <Text style={{ fontSize: 13, marginBottom: 31, marginHorizontal: 16, color: theme.foregroundSecondary }}>{"Anyone can use this link to join your organization"}</Text>
                <ZListItem
                    appearance="action"
                    text="Copy link"
                    onPress={copyOrgLinkCallback}
                />
                <View backgroundColor={theme.separatorColor} marginLeft={16} height={1} />
                <ZListItem
                    appearance="action"
                    text="Share link"
                    onPress={shareOrgCallback}
                />
                <View backgroundColor={theme.separatorColor} marginLeft={16} height={1} />
                <ZListItem
                    appearance="action"
                    text="Revoke link"
                    onPress={revokeOrgLinkCallback}
                />
                <View backgroundColor={theme.separatorColor} marginLeft={16} height={1} />

            </SScrollView>

        </>
    );
});

export const InvitesMore = withApp(InvitesMoreComponent, { navigationAppearance: 'small' });