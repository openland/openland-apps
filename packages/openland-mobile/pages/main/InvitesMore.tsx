import * as React from 'react';
import { withApp } from '../../components/withApp';
import { PageProps } from '../../components/PageProps';
import { SHeader } from 'react-native-s/SHeader';
import { XMemo } from 'openland-y-utils/XMemo';
import { ZListItem } from 'openland-mobile/components/ZListItem';
import { View, Share, Text, Clipboard } from 'react-native';
import { ASSafeAreaView } from 'react-native-async-view/ASSafeAreaView';
import { ThemeContext } from 'openland-mobile/themes/ThemeContext';
import { SScrollView } from 'react-native-s/SScrollView';
import { ZRoundedButton } from 'openland-mobile/components/ZRoundedButton';
import { getClient } from 'openland-mobile/utils/graphqlClient';
import { TextStyles } from 'openland-mobile/styles/AppStyles';
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
            <SScrollView justifyContent="flex-start" alignItems="flex-start">
                <Text style={{ fontSize: 16, fontWeight: TextStyles.weight.medium, marginBottom: 10, marginTop: 30, marginHorizontal: 16, color: theme.textSecondaryColor }}>{"Invite to Openland".toUpperCase()}</Text>
                <Text style={{ fontSize: 15, marginBottom: 10, marginHorizontal: 16, color: theme.textColor }}>{link}</Text>
                <View style={{ flexGrow: 1, marginLeft: 16, marginBottom: 8, backgroundColor: theme.separatorColor, height: 1 }} />
                <Text style={{ fontSize: 13, marginBottom: 31, marginHorizontal: 16, color: theme.textSecondaryColor }}>{"Anyone can use this link to join Openland"}</Text>
                <View style={{ flexGrow: 1, marginLeft: 4, alignItems: 'flex-start' }} >
                    <ZRoundedButton onPress={copyLinkCallback} style="flat" title="Copy link" uppercase={false} />
                    <View style={{ marginTop: 10, width: '100%', marginLeft: 12, marginBottom: 10, backgroundColor: theme.separatorColor, height: 1 }} />
                    <ZRoundedButton onPress={shareCallback} style="flat" title="Share link" uppercase={false} />
                    <View style={{ marginTop: 10, width: '100%', marginLeft: 12, marginBottom: 10, backgroundColor: theme.separatorColor, height: 1 }} />

                </View>

                <Text style={{ fontSize: 16, fontWeight: TextStyles.weight.medium, marginBottom: 10, marginTop: 30, marginHorizontal: 16, color: theme.textSecondaryColor }}>{"Invite to ".toUpperCase()}<Text style={{ color: theme.accentColor }} onPress={() => props.router.push("ProfileOrganization", { id: org!.id })}>{getMessenger().engine.user.primaryOrganization!.name.toUpperCase()}</Text></Text>
                <Text style={{ fontSize: 15, marginBottom: 10, marginHorizontal: 16, color: theme.textColor }}>{orgLink}</Text>
                <View style={{ flexGrow: 1, marginLeft: 16, marginBottom: 8, backgroundColor: theme.separatorColor, height: 1 }} />
                <Text style={{ fontSize: 13, marginBottom: 31, marginHorizontal: 16, color: theme.textSecondaryColor }}>{"Anyone can use this link to join your organization"}</Text>
                <View style={{ flexGrow: 1, marginLeft: 4, alignItems: 'flex-start' }} >
                    <ZRoundedButton onPress={copyOrgLinkCallback} style="flat" title="Copy link" uppercase={false} />
                    <View style={{ marginTop: 10, width: '100%', marginLeft: 12, marginBottom: 10, backgroundColor: theme.separatorColor, height: 1 }} />
                    <ZRoundedButton onPress={shareOrgCallback} style="flat" title="Share link" uppercase={false} />
                    <View style={{ marginTop: 10, width: '100%', marginLeft: 12, marginBottom: 10, backgroundColor: theme.separatorColor, height: 1 }} />
                    <ZRoundedButton onPress={revokeOrgLinkCallback} style="flat" title="Revoke link" uppercase={false} />
                    <View style={{ marginTop: 10, width: '100%', marginLeft: 12, marginBottom: 10, backgroundColor: theme.separatorColor, height: 1 }} />

                </View>
            </SScrollView>

        </>
    );
});

export const InvitesMore = withApp(InvitesMoreComponent, { navigationAppearance: 'small' });