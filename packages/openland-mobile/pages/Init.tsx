import * as React from 'react';
import { View, Linking, LayoutChangeEvent, Platform, Dimensions, LayoutAnimation, Image, Animated } from 'react-native';
import { buildNativeClient, saveClient, getClient, hasClient } from '../utils/graphqlClient';
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
import { ThemeProvider } from 'openland-mobile/themes/ThemeContext';
import { ThemePersister } from 'openland-mobile/themes/ThemePersister';
import { AppStorage } from 'openland-mobile/utils/AppStorage';
import { NativeKeyValue } from 'openland-mobile/spacex/NativeKeyValue';
import { SAnimated } from 'react-native-s/SAnimated';
import { SAnimatedShadowView } from 'react-native-s/SAnimatedShadowView';
import { randomKey } from 'react-native-s/utils/randomKey';
import { Track } from 'openland-engines/Tracking';

const AppPlaceholder = React.memo<{ loading: boolean }>((props) => {
    const animatedValue = React.useMemo(() => new SAnimatedShadowView('app-placeholder-' + randomKey(), { opacity: 1 }), []);
    React.useEffect(() => {
        SAnimated.beginTransaction();
        SAnimated.setDefaultPropertyAnimator();
        animatedValue.opacity = props.loading ? 1 : 0;
        SAnimated.commitTransaction();
    }, [props.loading]);

    return (
        <SAnimated.View
            name={animatedValue.name}
            style={{
                position: 'absolute',
                top: 0,
                left: 0,
                bottom: 0,
                right: 0,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'white',
                opacity: 1
            }}
            pointerEvents={props.loading ? 'box-none' : 'none'}
        >
            {/* <View alignItems="center" justifyContent="center" position="absolute" top={0} left={0} bottom={0} right={0} backgroundColor="white" pointerEvents="box-only"> */}
            <Image
                fadeDuration={0}
                source={require('assets/logo-unicorn.png')}
                style={{ width: 130, height: 155 }}
            />
            {/* </View> */}
        </SAnimated.View>
    );
});

const AppContainer = React.memo<{ children?: any, loading: boolean, onLayout?: (e: LayoutChangeEvent) => void }>((props) => {
    return (
        <ThemeProvider>
            <View style={{ width: '100%', height: '100%', backgroundColor: 'white' }} onLayout={props.onLayout}>
                {props.children}
                <ZModalProvider />
                <AppPlaceholder loading={props.loading} />
            </View>
        </ThemeProvider>
    )
});

export let NON_PRODUCTION = false;
export let SUPER_ADMIN = false;

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
            await ThemePersister.prepare();
            await AppStorage.prepare();
            try {
                if (hasClient()) {
                    let res = (await backoff(async () => await getClient().queryAccount()));
                    if (res && res.me) {
                        NON_PRODUCTION = res.myPermissions.roles.indexOf('feature-non-production') >= 0 || __DEV__;
                        SUPER_ADMIN = res.myPermissions.roles.indexOf('super-admin') >= 0;

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
                            NON_PRODUCTION = res.myPermissions.roles.indexOf('feature-non-production') >= 0 || __DEV__;
                            SUPER_ADMIN = res.myPermissions.roles.indexOf('super-admin') >= 0;

                            let messenger = buildMessenger(getClient(), res.me, { store: new NativeKeyValue('engines') });
                            setMessenger(new MobileMessenger(messenger, this.history));
                            await messenger.awaitLoading();
                        }

                        if (!res.sessionState.isLoggedIn) {
                            authenticated = false;
                        } else {
                            authenticated = true;
                        }
                    } else {
                        let client = buildNativeClient(AppStorage.storage, undefined);
                        Track.setClient(client);
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
        let content = undefined;
        let loading = true;

        if (this.state.state === 'app') {
            loading = false;
            content = (
                <>
                    <PushManager client={getClient()} />
                    {this.state.dimensions && <Root routing={getMessenger().history} width={this.state.dimensions.width} height={this.state.dimensions.height} />}
                </>
            );
        } else if (this.state.state === 'initial') {
            loading = false;
            content = (
                <>
                    {this.state.dimensions && <Root routing={SRouting.create(Routes, 'Login')} padLayout={false} width={this.state.dimensions.width} height={this.state.dimensions.height} />}
                </>
            );
        } else if (this.state.state === 'signup') {
            loading = false;
            content = (
                <>
                    {this.state.dimensions && <Root routing={this.history} width={this.state.dimensions.width} height={this.state.dimensions.height} />}
                </>
            );
        }

        return (
            <AppContainer loading={loading} onLayout={this.handleLayoutChange}>
                {content}
            </AppContainer>
        )
    }
}