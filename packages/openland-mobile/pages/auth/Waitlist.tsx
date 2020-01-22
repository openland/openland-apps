import * as React from 'react';
import { withApp } from '../../components/withApp';
import { PageProps } from '../../components/PageProps';
import { SHeader } from 'react-native-s/SHeader';
import { SHeaderButton } from 'react-native-s/SHeaderButton';
import { View, Image, Text } from 'react-native';
import RNRestart from 'react-native-restart';
import { ASSafeAreaView } from 'react-native-async-view/ASSafeAreaView';
import { joinInviteIfHave } from 'openland-mobile/utils/resolveInternalLink';
import { ZText } from 'openland-mobile/components/ZText';
import { ZTrack } from 'openland-mobile/analytics/ZTrack';
import { getClient } from 'openland-mobile/utils/graphqlClient';
import { TextStyles } from 'openland-mobile/styles/AppStyles';
import { ThemeGlobal } from 'openland-y-utils/themes/ThemeGlobal';
import { ThemeContext } from 'openland-mobile/themes/ThemeContext';
import { logout } from 'openland-mobile/utils/logout';

class WaitlistComponentThemed extends React.PureComponent<PageProps & { theme: ThemeGlobal }> {
    mounted = false;

    handleLogout = () => {
        (async () => {
            logout();
        })();
    }

    componentDidMount() {
        this.mounted = true;
        (async () => { await joinInviteIfHave(); })();
        this.checkWaitlistPassed();
    }

    componentWillUnmount() {
        this.mounted = false;
    }

    checkWaitlistPassed = async () => {
        if (!this.mounted) {
            return;
        }
        let res = await getClient().queryAccount({ fetchPolicy: 'network-only' });
        if (res.sessionState.isAccountActivated) {
            RNRestart.Restart();
        } else {
            setTimeout(() => {
                this.checkWaitlistPassed();
            }, 5000);
        }
    }

    render() {
        const { theme } = this.props;

        return (
            <ZTrack event="waitlist_view">
                <SHeader />
                <SHeaderButton title="Sign out" onPress={this.handleLogout} />
                <ASSafeAreaView flexGrow={1}>
                    <View padding={16}>
                        <Text style={{ ...TextStyles.Title2, color: theme.foregroundPrimary }} allowFontScaling={false}>
                            You have joined the waitlist
                        </Text>
                        <Text style={{ ...TextStyles.Body, color: theme.foregroundPrimary, marginTop: 8 }} allowFontScaling={false}>
                            Openland is currently in closed beta.{'\n'}We onboard new users in small groups and will let you know when the system is ready for{'\u00a0'}you.
                        </Text>

                        <Text style={{ ...TextStyles.Title2, color: theme.foregroundPrimary, marginTop: 32 }} allowFontScaling={false}>
                            How do I skip the waitlist?
                        </Text>
                        <Text style={{ ...TextStyles.Body, color: theme.foregroundPrimary, marginTop: 8 }} allowFontScaling={false}>
                            You can bypass the waitlist if you have invitation link. Use your link now, or request one from Openland team: <ZText linkify={true} text="hello@openland.com" />
                        </Text>
                    </View>
                    <View flexGrow={1} alignItems="center" justifyContent="center" paddingHorizontal={16}>
                        <Image
                            source={require('assets/img-waitlist.png')}
                            style={{
                                maxWidth: '100%',
                                resizeMode: 'contain'
                            }}
                        />
                    </View>
                </ASSafeAreaView>
            </ZTrack>
        );
    }
}

export const WaitlistComponent = React.memo((props: PageProps) => {
    const theme = React.useContext(ThemeContext);

    return <WaitlistComponentThemed {...props} theme={theme} />;
});

export const Waitlist = withApp(WaitlistComponent, { navigationAppearance: 'small-hidden' });