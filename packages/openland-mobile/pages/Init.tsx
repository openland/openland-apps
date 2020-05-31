import * as React from 'react';
import {
    View,
    Linking,
    LayoutChangeEvent,
    Platform,
    Dimensions,
    LayoutAnimation,
    Image,
} from 'react-native';
import { saveClient, getClient, hasClient } from '../utils/graphqlClient';
import {
    buildMessenger,
    setMessenger,
    getMessenger,
    getMessengerNullable,
} from '../utils/messenger';
import { AppBadge } from 'openland-y-runtime/AppBadge';
import { backoff } from 'openland-y-utils/timer';
import { Routes } from '../routes';
import { PushManager } from '../components/PushManager';
import { MobileMessenger } from '../messenger/MobileMessenger';
import { SRouting } from 'react-native-s/SRouting';
import { Root } from './Root';
import { PageProps } from '../components/PageProps';
import { Account_sessionState } from 'openland-api/spacex.types';
import { resolveNextPage } from './auth/signup';
import {
    resolveInternalLink,
    saveLinkIfInvite,
    joinInviteIfHave,
} from '../utils/resolveInternalLink';
import { ZModalProvider } from 'openland-mobile/components/ZModal';
import Alert from 'openland-mobile/components/AlertBlanket';
import { ThemeProvider, useTheme } from 'openland-mobile/themes/ThemeContext';
import { ThemePersister } from 'openland-mobile/themes/ThemePersister';
import { AppStorage } from 'openland-mobile/utils/AppStorage';
import { NativeKeyValue } from 'openland-mobile/spacex/NativeKeyValue';
import { SAnimated } from 'react-native-fast-animations';
import { SAnimatedShadowView } from 'react-native-fast-animations';
import { randomKey } from 'react-native-s/utils/randomKey';
import { Track } from 'openland-engines/Tracking';
import { NotificationHandler } from 'react-native-notification-handler/NotificationHandler';
import { AppConfig } from 'openland-y-runtime/AppConfig';
import { AndroidSplashView } from '../components/AndroidSplashView';
import { initialMode } from 'react-native-dark-mode';
import { GQLClientContext } from 'openland-api/useClient';
import { AppStorage as Storage } from 'openland-y-runtime/AppStorage';
import { createClientNative } from 'openland-api/createClientNative';
import { ModalProvider } from 'react-native-fast-modal';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const AppPlaceholder = React.memo<{ loading: boolean }>((props) => {
    const animatedValue = React.useMemo(
        () => new SAnimatedShadowView('app-placeholder-' + randomKey(), { opacity: 1 }),
        [],
    );
    React.useEffect(() => {
        if (!props.loading && Platform.OS !== 'android') {
            SAnimated.beginTransaction();
            SAnimated.setDefaultPropertyAnimator();
            animatedValue.opacity = props.loading ? 1 : 0;
            SAnimated.commitTransaction();
        }
    }, [props.loading]);
    const theme = useTheme();

    if (Platform.OS === 'android') {
        return (
            <View
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    bottom: 0,
                    right: 0,
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
                pointerEvents={props.loading ? 'box-none' : 'none'}
            >
                <View width="100%" height="100%">
                    <AndroidSplashView
                        style={{ alignSelf: 'stretch', flexGrow: 1, flexShrink: 1 }}
                        splashVisible={props.loading}
                    />
                </View>
            </View>
        );
    }

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
                backgroundColor: theme.backgroundPrimary,
                opacity: 1,
            }}
            pointerEvents={props.loading ? 'box-none' : 'none'}
        >
            <Image
                fadeDuration={0}
                source={
                    theme.type === 'Light'
                        ? require('assets/logo-splash.png')
                        : require('assets/logo-splash-dark.png')
                }
                style={{ width: 128, height: 128 }}
            />
        </SAnimated.View>
    );
});

const AppContainer = React.memo<{
    children?: any;
    loading: boolean;
    onLayout?: (e: LayoutChangeEvent) => void;
}>((props) => {
    return (
        <SafeAreaProvider>
            <ModalProvider />
            <View style={{ width: '100%', height: '100%' }} onLayout={props.onLayout}>
                {props.children}
                <ZModalProvider />
                <AppPlaceholder loading={props.loading} />
            </View>
        </SafeAreaProvider>
    );
});

export let NON_PRODUCTION = false;
export let SUPER_ADMIN = false;

export class Init extends React.Component<
    PageProps,
    {
        state: 'start' | 'loading' | 'initial' | 'signup' | 'app';
        sessionState?: Account_sessionState;
        dimensions?: { width: number; height: number };
    }
> {
    private history: any;
    private pendingDeepLink?: string;
    private resolving = false;

    constructor(props: PageProps) {
        super(props);
        this.state = {
            state: 'start',
        };

        console.log('BOOTSTRAP: mounting: ' + initialMode);
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
            if (
                this.state.dimensions &&
                (this.state.dimensions.width !== w || this.state.dimensions.height !== h)
            ) {
                LayoutAnimation.configureNext({
                    duration: 250,
                    update: {
                        type: 'linear',
                    },
                });
            }
        }
        this.setState({ dimensions: { width: w, height: h } });
    }

    handleOpenURL = async (event: { url: string }) => {
        if (event.url) {
            this.pendingDeepLink = event.url;
            await this.tryResolveLink(this.state.state);
        }
    }

    tryResolveLink = async (state: string) => {
        if (this.resolving) {
            return;
        }
        this.resolving = true;
        if (this.pendingDeepLink && state !== 'loading' && state !== 'start') {
            await AppStorage.prepare();
            let userToken: string | undefined = AppStorage.token;
            let acc = userToken && (await backoff(async () => await getClient().queryAccount()));
            if (!acc || !acc.me || !acc.sessionState.isAccountExists) {
                // unauthorized
                await saveLinkIfInvite(this.pendingDeepLink);
                this.pendingDeepLink = undefined;
            } else if (acc.me) {
                if (!acc.sessionState.isActivated) {
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
        })();
    }
    componentDidMount() {
        Linking.addEventListener('url', this.handleOpenURL);
        Linking.getInitialURL().then(async (url) => await this.handleOpenURL({ url: url }));
        if (getMessengerNullable()) {
            this.setState({ state: 'app' });
            return;
        }
        (async () => {
            console.log('BOOTSTRAP: loading');
            await ThemePersister.prepare();
            console.log('BOOTSTRAP: theme prepared');
            await AppStorage.prepare();
            console.log('BOOTSTRAP: storage prepared');
            // hotfix, spacex cache reset needed
            const useAccountReefetchNeeded = await Storage.readKey('user_refetch_needed');
            try {
                if (hasClient()) {
                    let res = await backoff(async () =>
                        useAccountReefetchNeeded
                            ? await getClient().refetchAccount()
                            : await getClient().queryAccount(),
                    );
                    console.log('OPENLAND: query queries');
                    console.warn(JSON.stringify(res.me, undefined, 4));
                    if (res && res.me) {
                        NON_PRODUCTION =
                            res.myPermissions.roles.indexOf('feature-non-production') >= 0 ||
                            __DEV__;
                        SUPER_ADMIN = res.myPermissions.roles.indexOf('super-admin') >= 0;
                        AppConfig.setNonProduction(NON_PRODUCTION);
                        AppConfig.setSuperAdmin(SUPER_ADMIN);
                        console.log('OPENLAND: loaded');
                        this.setState({ state: 'app' });
                    } else {
                        this.setState({ state: 'signup' });
                    }
                } else {
                    let res: any;
                    let authenticated = false;
                    if (AppStorage.token) {
                        this.setState({ state: 'loading' });
                        let client = createClientNative(AppStorage.storage, AppStorage.token);
                        saveClient(client);
                        res = await (useAccountReefetchNeeded
                            ? client.refetchAccount()
                            : client.queryAccount());
                        console.warn(JSON.stringify(res.me, undefined, 4));
                        console.warn(JSON.stringify(res.sessionState, undefined, 4));

                        const defaultPage = !res.sessionState.isCompleted
                            ? resolveNextPage(res.sessionState)
                            : undefined;

                        this.history = SRouting.create(Routes, defaultPage);
                        if (res.me) {
                            NON_PRODUCTION =
                                res.myPermissions.roles.indexOf('feature-non-production') >= 0 ||
                                __DEV__;
                            SUPER_ADMIN = res.myPermissions.roles.indexOf('super-admin') >= 0;
                            AppConfig.setNonProduction(NON_PRODUCTION);
                            AppConfig.setSuperAdmin(SUPER_ADMIN);

                            if (!res.sessionState.isCompleted) {
                                this.setState({ state: 'signup' });
                                return;
                            }

                            let messenger = buildMessenger(getClient(), res.me, {
                                store: new NativeKeyValue('engines'),
                            });
                            setMessenger(new MobileMessenger(messenger, this.history));
                            await messenger.awaitLoading();
                        }

                        if (!res.sessionState.isLoggedIn) {
                            authenticated = false;
                        } else {
                            authenticated = true;
                        }
                    } else {
                        let client = createClientNative(AppStorage.storage, undefined);
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
                            NotificationHandler.init();
                        } else {
                            this.setState({ state: 'signup' });
                        }
                    } else {
                        this.setState({ state: 'initial' });
                    }
                }
                await Storage.writeKey('user_refetch_needed', false);
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
                <GQLClientContext.Provider value={getClient()}>
                    <PushManager client={getClient()} />
                    {this.state.dimensions && (
                        <Root
                            routing={getMessenger().history}
                            width={this.state.dimensions.width}
                            height={this.state.dimensions.height}
                        />
                    )}
                </GQLClientContext.Provider>
            );
        } else if (this.state.state === 'initial') {
            loading = false;
            content = (
                <>
                    {this.state.dimensions && (
                        <Root
                            routing={SRouting.create(Routes, 'Login')}
                            padLayout={false}
                            width={this.state.dimensions.width}
                            height={this.state.dimensions.height}
                        />
                    )}
                </>
            );
        } else if (this.state.state === 'signup') {
            loading = false;
            content = (
                <>
                    {this.state.dimensions && (
                        <Root
                            routing={this.history}
                            width={this.state.dimensions.width}
                            height={this.state.dimensions.height}
                        />
                    )}
                </>
            );
        }

        return (
            <ThemeProvider>
                <AppContainer loading={loading} onLayout={this.handleLayoutChange}>
                    {content}
                </AppContainer>
            </ThemeProvider>
        );
    }
}
