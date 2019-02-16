import * as React from 'react';
import { AsyncStorage, View, Linking } from 'react-native';
import { buildNativeClient, saveClient, getClient, hasClient } from '../utils/apolloClient';
import { AccountQuery } from 'openland-api';
import { buildMessenger, setMessenger, getMessenger } from '../utils/messenger';
import { ZLoader } from '../components/ZLoader';
import { AppBadge } from 'openland-y-runtime/AppBadge';
import { backoff } from 'openland-y-utils/timer';
import { Routes } from '../routes';
import { PushManager } from '../components/PushManager';
import { MobileMessenger } from '../messenger/MobileMessenger';
import { SRouting } from 'react-native-s/SRouting';
import { Root } from './Root';
import { PageProps } from '../components/PageProps';
import { SessionStateFull } from 'openland-api/Types';
import { resolveNextPage, resolveNextPageCompleteAction } from './auth/signup';
import { resolveInternalLink } from '../utils/internalLnksResolver';
import { ZModalProvider } from 'openland-mobile/components/ZModal';
import { Alert } from 'openland-mobile/components/AlertBlanket';

export class Init extends React.Component<PageProps, { state: 'start' | 'loading' | 'initial' | 'signup' | 'app', sessionState?: SessionStateFull }> {

    history: any;
    private pendingDeepLink?: string;

    constructor(props: PageProps) {
        super(props);
        this.state = {
            state: 'start'
        };
    }

    componentWillUnmount() {
        Linking.removeEventListener('url', this.handleOpenURL);
    }

    handleOpenURL = async (event: { url: string }) => {
        this.pendingDeepLink = event.url;
        await this.tryResolveLink();
    }

    tryResolveLink = async () => {
        if (this.pendingDeepLink && this.state.state === 'app') {
            await (await resolveInternalLink(this.pendingDeepLink, () => false))!();
            this.pendingDeepLink = undefined;
        }
    }
    componentDidMount() {
        Linking.addEventListener('url', this.handleOpenURL);
        Linking.getInitialURL().then(async url => await this.handleOpenURL({ url: url }));

        (async () => {
            try {
                if (hasClient()) {
                    let res = (await backoff(async () => await getClient().queryAccount()));
                    if (res && res.me) {
                        await AsyncStorage.setItem('openland-account-3', JSON.stringify(res));
                        this.setState({ state: 'app' });
                        this.tryResolveLink();
                    } else {
                        this.setState({ state: 'signup' });
                    }
                } else {
                    let userToken: string | undefined = await AsyncStorage.getItem('openland-token');
                    let userAccount: string | undefined = undefined; // await AsyncStorage.getItem('openland-account-3');
                    let res: any;
                    if (userToken) {
                        this.setState({ state: 'loading' });
                        let client = buildNativeClient(userToken);
                        saveClient(client);
                        res = userAccount ? JSON.parse(userAccount) : (await backoff(async () => await getClient().queryAccount()));

                        // Refresh
                        if (userAccount) {
                            getClient().client.updateQuery((data) => res, AccountQuery);
                            backoff(async () => await getClient().queryAccount())
                        }

                        let defaultPage = !res.sessionState.isCompleted ? resolveNextPage(res.sessionState, 'SignupUser') : undefined;
                        this.history = SRouting.create(Routes, defaultPage, { action: resolveNextPageCompleteAction(defaultPage) });
                        if (res.me) {
                            let messenger = buildMessenger(getClient(), res.me);
                            setMessenger(new MobileMessenger(messenger, this.history));
                            await messenger.awaitLoading();
                        }

                        if (!res.sessionState.isLoggedIn) {
                            userToken = undefined;
                        }

                    }

                    // Reset badge if not authenticated
                    if (!userToken) {
                        AppBadge.setBadge(0);
                    }

                    // Launch app or login sequence
                    if (userToken) {
                        if (res && res.me) {
                            await AsyncStorage.setItem('openland-account-3', JSON.stringify(res));
                            this.setState({ state: 'app' });
                            // this.tryResolveLink();
                        } else {
                            this.setState({ state: 'signup' });
                        }
                    } else {
                        this.setState({ state: 'initial' });
                    }
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
                <>
                    <PushManager client={getClient()} />
                    <View style={{ width: '100%', height: '100%' }}>
                        <Root routing={getMessenger().history} />
                        <ZModalProvider />
                    </View>
                </>
            );
        } else if (this.state.state === 'initial') {
            return (
                <View style={{ width: '100%', height: '100%' }}>
                    <Root routing={SRouting.create(Routes, 'Login')} padLayout={false} />
                    <ZModalProvider />
                </View>
            );
        } else if (this.state.state === 'signup') {
            return (
                <View style={{ width: '100%', height: '100%' }}>
                    <Root routing={this.history} />
                    <ZModalProvider />
                </View>
            );
        }

        // return (<View style={{ backgroundColor: '#fff', width: '100%', height: '100%' }} />);
        return <ZLoader appearance="large" />;
    }
}