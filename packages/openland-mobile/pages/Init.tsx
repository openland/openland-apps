import * as React from 'react';
import { AsyncStorage, View } from 'react-native';
import { buildNativeClient, saveClient, getClient } from '../utils/apolloClient';
import { AccountQuery } from 'openland-api';
import { buildMessenger, setMessenger, getMessenger } from '../utils/messenger';
import { ZLoader } from '../components/ZLoader';
import { AppBadge } from 'openland-y-runtime/AppBadge';
import { backoff } from 'openland-y-utils/timer';
import { Routes } from '../routes';
import { YApolloProvider } from 'openland-y-graphql/YApolloProvider';
import { MessengerContext } from 'openland-engines/MessengerEngine';
import { PushManager } from '../components/PushManager';
import { ZPictureModal } from '../components/modal/ZPictureModal';
import { MobileMessengerContext, MobileMessenger } from '../messenger/MobileMessenger';
import { Login } from './auth/Login';
import { SRouting } from 'react-native-s/SRouting';
import { Root } from './Root';
import { PageProps } from '../components/PageProps';
import { Signup } from './signup/signup';
import { SessionStateFullFragment } from 'openland-api/Types';

export class Init extends React.Component<PageProps, { state: 'start' | 'loading' | 'initial' | 'auth' | 'app', sessionState?: SessionStateFullFragment }> {

    private ref = React.createRef<ZPictureModal>();

    constructor(props: PageProps) {
        super(props);
        this.state = {
            state: 'start'
        };
    }
    componentDidMount() {
        this.checkState().then();
    }

    checkState = async () => {
        let userToken: string | undefined = await AsyncStorage.getItem('openland-token');
        let res;
        if (userToken) {
            this.setState({ state: 'loading' });
            let client = buildNativeClient(userToken);
            saveClient(client);
            res = await backoff(async () => await getClient().client.query<any>({
                query: AccountQuery.document
            }));
            if (res.data.sessionState.isCompleted) {
                let messenger = buildMessenger(getClient(), res.data.me);
                let history = SRouting.create(Routes);
                setMessenger(new MobileMessenger(messenger, history, this.ref));
                await messenger.awaitLoading();
            }

        }

        // Reset badge if not authenticated
        if (!userToken) {
            AppBadge.setBadge(0);
        }

        // Launch app or login sequence
        if (userToken) {
            if (res && !res.data.sessionState.isCompleted) {
                this.setState({ state: 'auth', sessionState: res.data.sessionState });
            } else {
                this.setState({ state: 'app' });
            }
        } else {
            this.setState({ state: 'initial' });
        }

        // for testing
        // this.setState({ state: 'initial', sessionState: res.data.sessionState });
        // this.setState({ state: 'auth', sessionState: res.data.sessionState });

    }

    onSignupComplete = () => {
        this.checkState().then();
    }

    render() {
        console.warn(this.state);
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
                                    <Root routing={getMessenger().history} />
                                </ZPictureModal>
                            </View>
                        </MessengerContext.Provider>
                    </MobileMessengerContext.Provider>
                </YApolloProvider>
            );
        } else if (this.state.state === 'initial') {
            return <Login />;
        } else if (this.state.state === 'auth') {
            return <Signup initialSessionState={this.state.sessionState!} onComplete={this.onSignupComplete} />;
        }

        return (<View style={{ backgroundColor: '#fff', width: '100%', height: '100%' }} />);
    }
}