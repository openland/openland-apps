import * as React from 'react';
import { withApp } from '../../components/withApp';
import { PageProps } from '../../components/PageProps';
import { SHeader } from 'react-native-s/SHeader';
import { XMemo } from 'openland-y-utils/XMemo';
import { ZListItem } from 'openland-mobile/components/ZListItem';
import { View, Share, Text, Clipboard, Image } from 'react-native';
import { ASSafeAreaView } from 'react-native-async-view/ASSafeAreaView';
import { ThemeContext } from 'openland-mobile/themes/ThemeContext';
import { getClient } from 'openland-mobile/utils/graphqlClient';
import { SHeaderButton } from 'react-native-s/SHeaderButton';
import { FontStyles, RadiusStyles } from 'openland-mobile/styles/AppStyles';
import { trackEvent } from 'openland-mobile/analytics';

const InvitesComponent = XMemo<PageProps>((props) => {
    React.useEffect(() => {
        trackEvent('navigate_account_invite');
    }, []);

    const theme = React.useContext(ThemeContext);

    const invite = getClient().useAccountAppInvite();
    let link = 'https://openland.com/invite/' + invite.invite;

    let invitesCount = getClient().useWithoutLoaderMySuccessfulInvitesCount();

    let text = "Check out Openland, a new community app. There are groups for almost every industry, professional role, skill, interest, and location. Openland is a great place to make new friends, expand your professional network, learn from pros, and get help for any challenge you face. Invite to join:\n" + link;
    let shareCallback = React.useCallback(() => {
        Share.share({ message: text });
    }, [link]);
    let copyTextCallback = React.useCallback(() => {
        Clipboard.setString(text);
    }, [link]);
    let copyLinkCallback = React.useCallback(() => {
        Clipboard.setString(link);
    }, [link]);
    return (
        <>
            <SHeader title="Add people" hairline="hidden" />
            <SHeaderButton title="More" onPress={() => props.router.push("InvitesMore")} />
            <ASSafeAreaView width="100%" height="100%" backgroundColor={theme.backgroundPrimary}>
                <Text style={{ fontSize: 18, marginBottom: 40, marginHorizontal: 16, color: theme.foregroundPrimary, marginTop: theme.type === 'Dark' ? 8 : 0 }}>{"Share access to Openland community"}</Text>
                <Text style={{ fontSize: 16, fontWeight: FontStyles.Weight.Medium, marginBottom: 10, marginHorizontal: 16, color: theme.foregroundSecondary }}>{"Write a post".toUpperCase()}</Text>
                <Text style={{ fontSize: 15, marginBottom: 10, marginHorizontal: 16, color: theme.foregroundPrimary }}>{text}</Text>
                <View backgroundColor={theme.border} marginLeft={16} marginBottom={21} height={1} />
                <ZListItem
                    appearance="action"
                    text="Copy text"
                    onPress={copyTextCallback}
                />
                <View backgroundColor={theme.border} marginLeft={16} height={1} />
                <ZListItem
                    appearance="action"
                    text="Copy link"
                    onPress={copyLinkCallback}
                />
                <View backgroundColor={theme.border} marginLeft={16} height={1} />
                <ZListItem
                    appearance="action"
                    text="Share"
                    onPress={shareCallback}
                />
                <View backgroundColor={theme.border} marginLeft={16} height={1} />
                <View flexGrow={1} />
                {!!(invitesCount && invitesCount.mySuccessfulInvitesCount) && <View flexDirection="row" alignSelf="stretch" justifyContent="center" alignItems="center" marginHorizontal={16} marginBottom={16} borderRadius={RadiusStyles.Medium} height={50} backgroundColor={theme.incomingBackgroundPrimary}>
                    <Image source={require('assets/ic-user-fill-24.png')} />
                    <Text style={{ fontSize: 16, fontWeight: FontStyles.Weight.Medium, marginHorizontal: 16, color: '#717171' }}>{invitesCount.mySuccessfulInvitesCount + (invitesCount.mySuccessfulInvitesCount === 1 ? ' Friend ' : ' Friends ') + 'invited'}</Text>
                </View>}
            </ASSafeAreaView>

        </>
    );
});

export const Invites = withApp(InvitesComponent);