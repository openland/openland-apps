import * as React from 'react';
import { View, Linking, LayoutChangeEvent, Platform, Dimensions, LayoutAnimation, AsyncStorage } from 'react-native';
import { buildNativeClient, saveClient, getClient, hasClient } from '../utils/apolloClient';
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
import { resolveInternalLink, saveLinkIfInvite, joinInviteIfHave } from '../utils/internalLnksResolver';
import { ZModalProvider } from 'openland-mobile/components/ZModal';
import { Alert } from 'openland-mobile/components/AlertBlanket';
import { SDevice } from 'react-native-s/SDevice';
import { ThemeProvider } from 'openland-mobile/themes/ThemeContext';
import { ThemePersister } from 'openland-mobile/themes/ThemePersister';
import { AppStorage } from 'openland-mobile/utils/AppStorage';
import { trackEvent } from 'openland-mobile/analytics';

export class Init extends React.Component<PageProps, { state: 'start' | 'loading' | 'initial' | 'signup' | 'app', sessionState?: SessionStateFull, dimensions?: { width: number, height: number } }> {

    private history: any;
    private pendingDeepLink?: string;
    private resolving = false;

    constructor(props: PageProps) {
        super(props);
        this.state = {
            state: 'start'
        };
    }

    componentWillUnmount() {
        Linking.removeEventListener('url', this.handleOpenURL);
    }

    private handleLayoutChange = (e: LayoutChangeEvent) => {
        let w: number;
        let h: number;
        if (Platform.OS === 'ios') {
            w = e.nativeEvent.layout.width;
            h = e.nativeEvent.layout.height;
        } else {
            w = Dimensions.get('screen').width;
            h = Dimensions.get('screen').height;
        }
        if (Platform.OS === 'ios') {
            if (this.state.dimensions && (this.state.dimensions.width !== w || this.state.dimensions.height !== h)) {
                LayoutAnimation.configureNext({
                    duration: 250,
                    update: {
                        type: 'linear'
                    }
                });
            }
        }
        this.setState({ dimensions: { width: w, height: h } });
    }

    handleOpenURL = async (event: { url: string }) => {
        this.pendingDeepLink = event.url;
        await this.tryResolveLink(this.state.state);
    }

    tryResolveLink = async (state: string) => {
        if (this.resolving) {
            return;
        }
        this.resolving = true;
        if (this.pendingDeepLink && state !== 'loading' && state !== 'start') {
            await AppStorage.prepare();
            let userToken: string | undefined = AppStorage.token;
            let acc = userToken && await backoff(async () => await getClient().queryAccount());
            if (!acc || !acc.me || !acc.sessionState.isAccountExists) {
                // unauthorized
                await saveLinkIfInvite(this.pendingDeepLink);
                this.pendingDeepLink = undefined;
            } else if (acc.me) {
                if (!acc.sessionState.isAccountActivated) {
                    // waitlist
                    await saveLinkIfInvite(this.pendingDeepLink);
                    await joinInviteIfHave();
                } else {
                    // app
                    await (await resolveInternalLink(this.pendingDeepLink!, () => false))!();
                }
                this.pendingDeepLink = undefined;
            }

        }
        this.resolving = false;
    }

    componentDidUpdate() {
        (async () => {
            await this.tryResolveLink(this.state.state);
        })()
    }
    componentDidMount() {
        Linking.addEventListener('url', this.handleOpenURL);
        Linking.getInitialURL().then(async url => await this.handleOpenURL({ url: url }));

        (async () => {
            const firstLaunch = await AsyncStorage.getItem('openland-first-launch');

            if (!firstLaunch) {
                const currentDate = new Date();

                await AsyncStorage.setItem('openland-first-launch', currentDate.getTime().toString());

                trackEvent('launch_first_time');
            }

            trackEvent('session_start');

            await ThemePersister.prepare();
            await AppStorage.prepare();
            try {
                if (hasClient()) {
                    let res = (await backoff(async () => await getClient().queryAccount()));
                    if (res && res.me) {
                        this.setState({ state: 'app' });
                    } else {
                        this.setState({ state: 'signup' });
                    }
                } else {
                    let res: any;
                    let authenticated = false;
                    if (AppStorage.token) {
                        this.setState({ state: 'loading' });
                        let client = buildNativeClient(AppStorage.storage, AppStorage.token);
                        saveClient(client);
                        res = await client.queryAccount();
                        // res = await cachedQuery(client.client, AccountQuery, {}, 'account');
                        // await cachedQuery(client.client, SettingsQuery, {}, 'settings')

                        let defaultPage = !res.sessionState.isCompleted ? resolveNextPage(res.sessionState) : undefined;
                        this.history = SRouting.create(Routes, defaultPage, { action: resolveNextPageCompleteAction(defaultPage) });
                        if (res.me) {
                            let messenger = buildMessenger(getClient(), res.me);
                            setMessenger(new MobileMessenger(messenger, this.history));
                            await messenger.awaitLoading();
                        }

                        if (!res.sessionState.isLoggedIn) {
                            authenticated = false;
                        } else {
                            authenticated = true;
                        }
                    }

                    // Reset badge if not authenticated
                    if (!authenticated) {
                        AppBadge.setBadge(0);
                    }

                    // Launch app or login sequence
                    if (authenticated) {
                        if (res && res.me) {
                            this.setState({ state: 'app' });
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
            return (
                <ThemeProvider>
                    <View style={{ width: '100%', height: '100%' }} onLayout={this.handleLayoutChange}>
                        <View style={{ width: '100%', height: '100%', marginTop: SDevice.safeArea.top, marginBottom: SDevice.safeArea.bottom }}>
                            <ZLoader appearance="large" />
                        </View>
                    </View>
                </ThemeProvider>
            );
        } else if (this.state.state === 'app') {
            return (
                <ThemeProvider>
                    <PushManager client={getClient()} />
                    <View style={{ width: '100%', height: '100%' }} onLayout={this.handleLayoutChange}>
                        {this.state.dimensions && <Root routing={getMessenger().history} width={this.state.dimensions.width} height={this.state.dimensions.height} />}
                        <ZModalProvider />
                        {/* <View position="absolute" top={0} left={0} right={0} height={SDevice.safeArea.top} backgroundColor="red" /> */}
                        {/* <View position="absolute" top={0} left={0} right={0} height={SDevice.safeArea.top + SDevice.statusBarHeight} backgroundColor="yellow" />
                        <View position="absolute" bottom={0} left={0} right={0} height={SDevice.safeArea.bottom} backgroundColor="blue" /> */}
                    </View>
                </ThemeProvider>
            );
        } else if (this.state.state === 'initial') {
            return (
                <ThemeProvider>
                    <View style={{ width: '100%', height: '100%' }} onLayout={this.handleLayoutChange}>
                        {this.state.dimensions && <Root routing={SRouting.create(Routes, 'Login')} padLayout={false} width={this.state.dimensions.width} height={this.state.dimensions.height} />}
                        <ZModalProvider />
                    </View>
                </ThemeProvider>
            );
        } else if (this.state.state === 'signup') {
            return (
                <ThemeProvider>
                    <View style={{ width: '100%', height: '100%' }} onLayout={this.handleLayoutChange}>
                        {this.state.dimensions && <Root routing={this.history} width={this.state.dimensions.width} height={this.state.dimensions.height} />}
                        <ZModalProvider />
                    </View>
                </ThemeProvider>
            );
        }

        return (
            <ThemeProvider>
                <View style={{ width: '100%', height: '100%' }} onLayout={this.handleLayoutChange}>
                    <View style={{ width: '100%', height: '100%', marginTop: SDevice.safeArea.top, marginBottom: SDevice.safeArea.bottom }}>
                        <ZLoader appearance="large" />
                    </View>
                </View>
            </ThemeProvider>
        )
    }
}