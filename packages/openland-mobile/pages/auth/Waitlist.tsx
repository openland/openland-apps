import * as React from 'react';
import { withApp } from '../../components/withApp';
import { PageProps } from '../../components/PageProps';
import { SHeader } from 'react-native-s/SHeader';
import { SHeaderButton } from 'react-native-s/SHeaderButton';
import { View, Image, Dimensions, Text } from 'react-native';
import RNRestart from 'react-native-restart';
import { ASSafeAreaView } from 'react-native-async-view/ASSafeAreaView';
import { joinInviteIfHave } from 'openland-mobile/utils/internalLnksResolver';
import { ZText } from 'openland-mobile/components/ZText';
import { AppStorage } from 'openland-mobile/utils/AppStorage';
import { ZTrack } from 'openland-mobile/analytics/ZTrack';
import { getClient } from 'openland-mobile/utils/apolloClient';

export class WaitlistComponent extends React.PureComponent<PageProps> {
    mounted = false;

    handleLogout = () => {
        (async () => {
            await AppStorage.resetToken();
            RNRestart.Restart();
        })();
    }

    componentDidMount() {
        this.mounted = true;
        (async () => { await joinInviteIfHave(); })()
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
                this.checkWaitlistPassed()
            }, 5000);
        }
    }

    render() {
        return (
            <ZTrack event="waitlist_view">
                <SHeader />
                <SHeaderButton title="Sign out" onPress={() => this.handleLogout()} />
                <ASSafeAreaView flexGrow={1}>
                    <View flexGrow={1} flexDirection="column" alignItems="center" justifyContent="center">
                        <Text style={{ textAlign: 'center', fontWeight: '500', fontSize: 22, color: '#000', paddingHorizontal: 48, lineHeight: 28 }}>You have joined the waitlist</Text>
                        <Text style={{ textAlign: 'center', fontSize: 16, lineHeight: 24, paddingTop: 10, paddingHorizontal: 20, color: '#000', opacity: 0.7 }}>
                            Openland is currently in closed beta.{'\n'}We onboard new users in small groups and will let you know when the system is ready for{'\u00a0'}you.
                        </Text>

                        <Text style={{ textAlign: 'center', fontWeight: '500', fontSize: 22, color: '#000', paddingHorizontal: 48, lineHeight: 28, paddingTop: 20 }}> How do I skip the waitlist?</Text>
                        <Text style={{ textAlign: 'center', fontSize: 16, lineHeight: 24, paddingTop: 10, paddingHorizontal: 20, color: '#000', opacity: 0.7 }}>
                            You can bypass the waitlist if you have invitation link. Use your link now, or request one from Openland team: <ZText linkify={true} text="hello@openland.com" />
                        </Text>
                    </View>
                    <Image source={require('assets/img-waitlist.png')} style={{ width: Dimensions.get('window').width, height: 320 }} />
                </ASSafeAreaView>
            </ZTrack>
        );
    }
}

export const Waitlist = withApp(WaitlistComponent, { navigationAppearance: 'small-hidden' });