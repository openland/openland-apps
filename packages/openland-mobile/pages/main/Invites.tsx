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
import { line } from 'd3-shape';
import { SHeaderButton } from 'react-native-s/SHeaderButton';
import { TextStyles } from 'openland-mobile/styles/AppStyles';

const InvitesComponent = XMemo<PageProps>((props) => {
    const theme = React.useContext(ThemeContext);

    const invite = getClient().useAccountAppInvite();
    let link = 'https://openland.com/invite/' + invite.invite;

    let text = "In the heart of the French Alps, in the north east of the Rhone Alps region lies the village of Les Houches. Nestled at one end of the Chamonix valley.\n" + link;
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
            <SHeader title="Openland apps" hairline="hidden" />
            <SHeaderButton title="Other invites" marginLeft={-20} onPress={() => props.router.push("InvitesMore")} />
            <SScrollView justifyContent="flex-start" alignItems="flex-start">
                <Text style={{ fontSize: 18, marginBottom: 40, marginHorizontal: 16, color: theme.textColor, marginTop: theme.blurType === 'dark' ? 8 : 0 }}>{"Share access to Openland community"}</Text>
                <Text style={{ fontSize: 16, fontWeight: TextStyles.weight.medium, marginBottom: 10, marginHorizontal: 16, color: theme.textSecondaryColor }}>{"Write a post".toUpperCase()}</Text>
                <Text style={{ fontSize: 15, marginBottom: 10, marginHorizontal: 16, color: theme.textColor }}>{text}</Text>
                <View style={{ flexGrow: 1, marginLeft: 16, marginBottom: 31, backgroundColor: theme.separatorColor, height: 1 }} />
                <View style={{ flexGrow: 1, marginLeft: 4, alignItems: 'flex-start' }} >
                    <ZRoundedButton onPress={copyTextCallback} style="flat" title="Copy text" uppercase={false} />
                    <View style={{ marginTop: 10, width: '100%', marginLeft: 12, marginBottom: 10, backgroundColor: theme.separatorColor, height: 1 }} />
                    <ZRoundedButton onPress={copyLinkCallback} style="flat" title="Copy link" uppercase={false} />
                    <View style={{ marginTop: 10, width: '100%', marginLeft: 12, marginBottom: 10, backgroundColor: theme.separatorColor, height: 1 }} />
                    <ZRoundedButton onPress={shareCallback} style="flat" title="Share" uppercase={false} />
                    <View style={{ marginTop: 10, width: '100%', marginLeft: 12, marginBottom: 10, backgroundColor: theme.separatorColor, height: 1 }} />

                </View>
            </SScrollView>

        </>
    );
});

export const Invites = withApp(InvitesComponent);