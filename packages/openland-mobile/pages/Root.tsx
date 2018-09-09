import * as React from 'react';
import { AsyncStorage, View, Platform } from 'react-native';
import { NavigationInjectedProps } from 'react-navigation';
import { buildNativeClient, saveClient, getClient } from '../utils/apolloClient';
import { AccountQuery } from 'openland-api';
import { buildMessenger, setMessenger, getMessenger } from '../utils/messenger';
import { ZLoader } from '../components/ZLoader';
import { AppBadge } from 'openland-y-runtime/AppBadge';
import { backoff } from 'openland-y-utils/timer';
import { LoginStack, Routes } from '../routes';
import { YApolloProvider } from 'openland-y-graphql/YApolloProvider';
import { MessengerContext } from 'openland-engines/MessengerEngine';
import { PushManager } from '../components/PushManager';
import { ZPictureModal } from '../components/modal/ZPictureModal';
import { NativeModules } from 'react-native';
import { FastRouterProvider } from 'react-native-fast-navigation/FastRouterProvider';
import { MobileMessengerContext, MobileMessenger } from '../messenger/MobileMessenger';
import { FastHistoryManager } from 'react-native-fast-navigation/FastHistory';
export class Root extends React.Component<NavigationInjectedProps, { state: 'start' | 'loading' | 'auth' | 'app' }> {

    private ref = React.createRef<ZPictureModal>();

    constructor(props: NavigationInjectedProps) {
        super(props);
        this.state = {
            state: 'start'
        };
    }
    componentDidMount() {
        if (Platform.OS === 'android') {
            try {
                NativeModules.OPLBackgroundHack.removeBackground();
            } catch (e) {
                console.log(e);
            }
        }
        (async () => {
            let userToken: string | undefined = await AsyncStorage.getItem('openland-token');
            if (userToken) {
                this.setState({ state: 'loading' });
                let client = buildNativeClient(userToken);
                let res = await backoff(async () => await client.client.query<any>({
                    query: AccountQuery.document
                }));
                if (!res.data.me) {
                    userToken = undefined;
                } else {
                    let messenger = buildMessenger(client, res.data.me);
                    let history = new FastHistoryManager(Routes);
                    setMessenger(new MobileMessenger(messenger, history, this.ref));
                    saveClient(client);
                    await messenger.awaitLoading();
                }
            }

            // Reset badge if not authenticated
            if (!userToken) {
                AppBadge.setBadge(0);
            }

            // Launch app or login sequence
            if (userToken) {
                this.setState({ state: 'app' });
            } else {
                this.setState({ state: 'auth' });
            }
            // this.props.navigation.navigate(userToken ? 'App' : 'Login');
        })();
    }
    render() {
        if (this.state.state === 'loading') {
            return <ZLoader appearance="large" />;
        } else if (this.state.state === 'app') {
            return (
                <YApolloProvider client={getClient()}>
                    <PushManager client={getClient()} />
                    <MobileMessengerContext.Provider value={getMessenger()}>
                        <MessengerContext.Provider value={getMessenger().engine}>
                            <View style={{ width: '100%', height: '100%' }}>
                                <ZPictureModal ref={this.ref}>
                                    <FastRouterProvider history={getMessenger().history} />
                                </ZPictureModal>
                            </View>
                        </MessengerContext.Provider>
                    </MobileMessengerContext.Provider>
                </YApolloProvider>
            );
        } else if (this.state.state === 'auth') {
            return <LoginStack />;
        }

        return (<View style={{ backgroundColor: '#fff', width: '100%', height: '100%' }} />);
    }
}