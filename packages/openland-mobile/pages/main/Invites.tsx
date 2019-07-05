import * as React from 'react';
import { withApp } from '../../components/withApp';
import { PageProps } from '../../components/PageProps';
import { SHeader } from 'react-native-s/SHeader';
import { XMemo } from 'openland-y-utils/XMemo';
import { ZListItem } from 'openland-mobile/components/ZListItem';
import { View, Share, Text, Clipboard, Image } from 'react-native';
import { ASSafeAreaView } from 'react-native-async-view/ASSafeAreaView';
import { ThemeContext } from 'openland-mobile/themes/ThemeContext';
import { SScrollView } from 'react-native-s/SScrollView';
import { ZRoundedButton } from 'openland-mobile/components/ZRoundedButton';
import { getClient } from 'openland-mobile/utils/graphqlClient';
import { line } from 'd3-shape';
import { SHeaderButton } from 'react-native-s/SHeaderButton';
import { TextStyles } from 'openland-mobile/styles/AppStyles';
import { ZListItemGroup } from 'openland-mobile/components/ZListItemGroup';

const InvitesComponent = XMemo<PageProps>((props) => {
    const theme = React.useContext(ThemeContext);

    const invite = getClient().useAccountAppInvite();
    let link = 'https://openland.com/invite/' + invite.invite;

    let invitesCount = getClient().useWithoutLoaderMySuccessfulInvitesCount();

    let text = "Check out Openland, an invitation-only community for top startup founders, investors, and engineers. There are expert chats on any topic, from fundraising in Silicon Valley to CTOs lessons learned. Finally, can share it here!\n" + link;
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
            <SHeader title="Invite friends" hairline="hidden" />
            <SHeaderButton title="Other invites" marginLeft={-20} onPress={() => props.router.push("InvitesMore")} />
            <ASSafeAreaView width="100%" height="100%" backgroundColor={theme.backgroundColor}>
                <Text style={{ fontSize: 18, marginBottom: 40, marginHorizontal: 16, color: theme.textColor, marginTop: theme.blurType === 'dark' ? 8 : 0 }}>{"Share access to Openland community"}</Text>
                <Text style={{ fontSize: 16, fontWeight: TextStyles.weight.medium, marginBottom: 10, marginHorizontal: 16, color: theme.textSecondaryColor }}>{"Write a post".toUpperCase()}</Text>
                <Text style={{ fontSize: 15, marginBottom: 10, marginHorizontal: 16, color: theme.textColor }}>{text}</Text>
                <View backgroundColor={theme.separatorColor} marginLeft={16} marginBottom={21} height={1} />
                <ZListItem
                    appearance="action"
                    text="Copy text"
                    onPress={copyTextCallback}
                />
                <View backgroundColor={theme.separatorColor} marginLeft={16} height={1} />
                <ZListItem
                    appearance="action"
                    text="Copy link"
                    onPress={copyLinkCallback}
                />
                <View backgroundColor={theme.separatorColor} marginLeft={16} height={1} />
                <ZListItem
                    appearance="action"
                    text="Share"
                    onPress={shareCallback}
                />
                <View backgroundColor={theme.separatorColor} marginLeft={16} height={1} />
                <View flexGrow={1} />
                {!!invitesCount && <View flexDirection="row" alignSelf="stretch" justifyContent="center" alignItems="center" marginHorizontal={16} borderRadius={10} height={50} backgroundColor={theme.bubbleColorIn}>
                    <Image source={require('assets/ic-user-24.png')} />
                    <Text style={{ fontSize: 16, fontWeight: TextStyles.weight.medium, marginHorizontal: 16, color: '#717171' }}>{invitesCount.mySuccessfulInvitesCount + (invitesCount.mySuccessfulInvitesCount === 1 ? ' Friend ' : ' Friends ') + 'invited'}</Text>
                </View>}
            </ASSafeAreaView>

        </>
    );
});

export const Invites = withApp(InvitesComponent);