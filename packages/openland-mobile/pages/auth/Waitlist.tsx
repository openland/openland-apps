import * as React from 'react';
import { withApp } from '../../components/withApp';
import { PageProps } from '../../components/PageProps';
import { SHeader } from 'react-native-s/SHeader';
import { SHeaderButton } from 'react-native-s/SHeaderButton';
import { AsyncStorage, View, Image, Dimensions, Text } from 'react-native';
import CodePush from 'react-native-code-push';
import { SSafeAreaView } from 'react-native-s/SSafeArea';

export class WaitlistComponent extends React.PureComponent<PageProps> {

    handleLogout = () => {
        (async () => {
            AsyncStorage.clear();
            CodePush.restartApp();
        })();
    }

    render() {
        return (
            <>
                <SHeader />
                <SHeaderButton title="Sign out" onPress={() => this.handleLogout()} />
                <SSafeAreaView flexGrow={1}>
                    <View flexGrow={1} flexDirection="column" alignItems="center" justifyContent="center">
                        <Text style={{ textAlign: 'center', fontWeight: '500', fontSize: 22, color: '#000', paddingHorizontal: 48, height: 28, lineHeight: 28 }}>You have joined the waitlist</Text>
                        <Text style={{ textAlign: 'center', fontSize: 16, lineHeight: 24, paddingTop: 10, paddingHorizontal: 20, color: '#000', opacity: 0.7 }}>
                            Openland is currently in closed beta. We onboard new users in small groups and will let you know when the system is ready for you.
                        </Text>
                    </View>
                    <Image source={require('assets/img-waitlist.png')} style={{ width: Dimensions.get('window').width, height: 320 }} />
                </SSafeAreaView>
            </>
        );
    }
}

export const Waitlist = withApp(WaitlistComponent, { navigationAppearance: 'small-hidden' });