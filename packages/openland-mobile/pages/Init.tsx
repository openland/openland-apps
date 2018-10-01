import * as React from 'react';
import { AsyncStorage, View, Alert } from 'react-native';
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
import { SRouting } from 'react-native-s/SRouting';
import { Root } from './Root';
import { PageProps } from '../components/PageProps';
import { SessionStateFull } from 'openland-api/Types';
import { resolveNextPage, resolveNextPageCompleteAction } from './signup/signup';
import { json } from 'body-parser';

export class Init extends React.Component<PageProps, { state: 'start' | 'loading' | 'initial' | 'signup' | 'app', sessionState?: SessionStateFull }> {

    private ref = React.createRef<ZPictureModal>();
    history: any;
    constructor(props: PageProps) {
        super(props);
        this.state = {
            state: 'start'
        };
    }
    componentDidMount() {
        (async () => {
            try {
                let userToken: string | undefined = await AsyncStorage.getItem('openland-token');
                let res;
                if (userToken) {
                    this.setState({ state: 'loading' });
                    let client = buildNativeClient(userToken);
                    saveClient(client);
                    res = await backoff(async () => await getClient().client.query<any>({
                        query: AccountQuery.document
                    }));

                    let defaultPage = !res.data.sessionState.isCompleted ? resolveNextPage(res.data.sessionState, 'SignupUser') : undefined;
                    this.history = SRouting.create(Routes, defaultPage, { action: resolveNextPageCompleteAction(defaultPage) });
                    if (res.data.me) {
                        let messenger = buildMessenger(getClient(), res.data.me);
                        setMessenger(new MobileMessenger(messenger, this.history, this.ref));
                        await messenger.awaitLoading();
                    }

                    if (!res.data.sessionState.isLoggedIn) {
                        userToken = undefined;
                    }

                }

                // Reset badge if not authenticated
                if (!userToken) {
                    AppBadge.setBadge(0);
                }

                // Launch app or login sequence
                if (userToken) {
                    if (res && res.data.me) {
                        this.setState({ state: 'app' });
                    } else {
                        this.setState({ state: 'signup' });
                    }
                } else {
                    this.setState({ state: 'initial' });
                }
            } catch (e) {
                Alert.alert(e.message);
            }

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
                                    <Root routing={getMessenger().history} />
                                </ZPictureModal>
                            </View>
                        </MessengerContext.Provider>
                    </MobileMessengerContext.Provider>
                </YApolloProvider>
            );
        } else if (this.state.state === 'initial') {
            return <Root routing={SRouting.create(Routes, 'Login')} />;
        } else if (this.state.state === 'signup') {
            return (
                <YApolloProvider client={getClient()}>
                    <Root routing={this.history} />
            </YApolloProvider>
            );
        }

        return (<View style={{ backgroundColor: '#fff', width: '100%', height: '100%' }} />);
    }
}