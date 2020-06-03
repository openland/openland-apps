import * as React from 'react';
import { css, cx } from 'linaria';
import { XView } from 'react-mental';
import * as Cookie from 'js-cookie';
import { XTrack } from 'openland-x-analytics/XTrack';
import { trackEvent } from 'openland-x-analytics';
import { XLoader } from 'openland-x/XLoader';
import { pages, pagesT, pagesArr } from './components/pages';
import { XRouterContext } from 'openland-x-routing/XRouterContext';
import { AcceptInvitePage } from './accept-invite.page';
import { AskAuthDataPage } from './ask-auth-data.page';
import { AskAuthCodePage } from './ask-auth-code.page';
import { CreateNewAccountPage } from './create-new-account.page';
import { IntroduceYourselfPage } from './introduce-yourself.page';
import { API_AUTH_ENDPOINT } from 'openland-api/endpoint';
import { BackSkipLogo, BackSkipLogoProps } from '../components/BackSkipLogo';
import { XPageRedirect } from 'openland-x-routing/XPageRedirect';

const getAppInvite = (router: any) => {
    if (router.query && router.query.redirect && router.query.redirect.split('/')[1] === 'invite') {
        return router.query.redirect.split('/')[2];
    }
    return null;
};

const checkIfIsSignInInvite = (router: any) => {
    return (
        router.query &&
        router.query.redirect &&
        (router.query.redirect.split('/')[1] === 'invite' ||
            router.query.redirect.split('/')[1] === 'joinChannel')
    );
};

const pageContainer = css`
    display: flex;
    justify-content: center;
    align-items: stretch;
    position: absolute;
    width: 100%;
    height: 100%;
`;

const outerContainer = css`
    display: flex;
    position: relative;
    justify-content: center;
    align-items: stretch;
    overflow: hidden;
    width: 100vw;
`;

const forwardIn = css`
    @keyframes forwardIn {
        from {
            opacity: 0;
            transform: translateX(432px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
    animation: forwardIn 350ms cubic-bezier(0.075, 0.82, 0.165, 1) forwards;
`;

const forwardOut = css`
    @keyframes forwardOut {
        from {
            opacity: 1;
            transform: translateX(0);
        }
        to {
            opacity: 0;
            transform: translateX(-432px);
        }
    }
    animation: forwardOut 350ms cubic-bezier(0.075, 0.82, 0.165, 1) forwards;
    pointer-events: none;
`;

const backwardIn = css`
    @keyframes forwardIn {
        from {
            opacity: 0;
            transform: translateX(-432px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
    animation: forwardIn 350ms cubic-bezier(0.075, 0.82, 0.165, 1) forwards;
`;

const backwardOut = css`
    @keyframes forwardOut {
        from {
            opacity: 1;
            transform: translateX(0);
        }
        to {
            opacity: 0;
            transform: translateX(432px);
        }
    }
    animation: forwardOut 350ms cubic-bezier(0.075, 0.82, 0.165, 1) forwards;
    pointer-events: none;
`;

const AuthHeaderConfigContex = React.createContext<{
    setOnBack: (f?: (event: React.MouseEvent) => void) => void;
    setOnSkip: (f?: (event: React.MouseEvent) => void) => void;
    setMobileTransparent: (value?: boolean) => void;
}>({
    setOnBack: () => {
        /**/
    },
    setOnSkip: () => {
        /**/
    },
    setMobileTransparent: () => {
        /**/
    },
});
export const AuthHeaderConfig = React.memo((props: BackSkipLogoProps) => {
    const authHeaderConfigContex = React.useContext(AuthHeaderConfigContex);
    React.useEffect(() => {
        authHeaderConfigContex.setOnBack(props.onBack);
        authHeaderConfigContex.setOnSkip(props.onSkip);
        authHeaderConfigContex.setMobileTransparent(props.mobileTransparent);

        console.warn('setting header', props.onBack, props.onSkip, props.mobileTransparent);
    }, []);
    return <></>;
});

interface AuthHeaderInstance {
    setOnBack: (callback?: (event: React.MouseEvent) => void) => void;
    setOnSkip: (callback?: (event: React.MouseEvent) => void) => void;
    setMobileTransparent: (value?: boolean) => void;
}
const AuthHeader = React.memo(
    React.forwardRef((props: {}, ref: React.Ref<AuthHeaderInstance>) => {
        const [onBack, setOnBack] = React.useState<{
            callback?: (event: React.MouseEvent) => void;
        }>({
            callback: (event: React.MouseEvent) => {
                history.back();
            },
        });
        const [onSkip, setOnSkip] = React.useState<{
            callback?: (event: React.MouseEvent) => void;
        }>({ callback: undefined });
        const [mobileTransparent, setMobileTransparent] = React.useState(false);

        React.useImperativeHandle(ref, () => ({
            setOnBack: (callback) => setOnBack({ callback }),
            setOnSkip: (callback) => setOnSkip({ callback }),
            setMobileTransparent: (value: boolean) => setMobileTransparent(value),
        }));

        const onBackPressed = React.useCallback(
            (event: React.MouseEvent) => {
                if (onBack.callback) {
                    onBack.callback(event);
                } else {
                    history.back();
                }
            },
            [onBack],
        );
        const onSkipPressed = React.useCallback(
            (event: React.MouseEvent) => {
                if (onSkip.callback) {
                    onSkip.callback(event);
                }
            },
            [onSkip],
        );

        return (
            <XView position="absolute" width="100%">
                <BackSkipLogo
                    onBack={onBackPressed}
                    onSkip={onSkip.callback ? onSkipPressed : undefined}
                    mobileTransparent={mobileTransparent}
                />
            </XView>
        );
    }),
);

export default () => {
    const router = React.useContext(XRouterContext)!;
    const isPhoneAuth = !!router.query.phone;
    let page: pagesT = pages.createNewAccount;

    if (getAppInvite(router)) {
        Cookie.set('x-openland-app-invite', getAppInvite(router));
    }

    if (router.path.includes('accept-invite') || checkIfIsSignInInvite(router)) {
        page = pages.acceptInvite;
    }
    if (router.path.includes('ask-auth-data')) {
        page = pages.askAuthData;
    }
    if (router.path.includes('ask-auth-code')) {
        page = pages.askAuthCode;
    }
    if (router.path.includes('introduce-yourself') || router.path.includes('/createProfile')) {
        page = pages.introduceYourself;
    }

    if (router.routeQuery.redirect) {
        if (router.routeQuery.redirect.indexOf('/acceptChannelInvite/') !== -1) {
            Cookie.set(
                'x-openland-invite',
                router.routeQuery.redirect.slice('/acceptChannelInvite/'.length),
            );
        }
    }

    const [phoneCodeValue, setPhoneCodeValue] = React.useState({
        label: 'United States',
        value: '+1',
    });
    const [authValue, setAuthValue] = React.useState('');
    const [authWasResend, setAuthWasResend] = React.useState(false);
    const [authSending, setAuthSending] = React.useState(false);
    const [authError, setAuthError] = React.useState('');
    const [fromOutside, setFromOutside] = React.useState(false);
    const [isExistingUser, setExistingUser] = React.useState(false);
    const [avatarId, setAvatarId] = React.useState(null);
    const prevDataFired = React.useRef<string>();

    const checkRedirect = () => {
        let redirect = router.query ? (router.query.redirect ? router.query.redirect : null) : null;
        if (redirect) {
            Cookie.set('sign-redirect', redirect, { path: '/' });
        }
    };

    const fireAuth = React.useCallback(async (dataToFire: string, isPhoneFire: boolean) => {
        checkRedirect();
        const authHost = isPhoneFire ? '/phone/sendCode' : '/sendCode';
        const authBody = isPhoneFire ? { phone: dataToFire } : { email: dataToFire };
        prevDataFired.current = dataToFire;
        try {
            let res = await (
                await fetch(API_AUTH_ENDPOINT + authHost, {
                    body: JSON.stringify(authBody),
                    headers: [['Content-Type', 'application/json']],
                    method: 'POST',
                })
            ).json();
            if (!res.ok) {
                throw new Error(res.errorText || 'Something went wrong');
            }
            localStorage.setItem('authSession', res.session);

            setAuthSending(false);
            setExistingUser(!!res.profileExists);
            setAvatarId(res.pictureId);
        } catch (e) {
            throw new Error('Something went wrong');
        }
    }, []);

    const loginWith = React.useCallback((isPhone: boolean) => {
        setAuthValue('');
        setAuthError('');
        setAuthSending(false);
        const loginPath = isPhone
            ? '/authorization/ask-auth-data?phone=true'
            : '/authorization/ask-auth-data';
        setTimeout(() => {
            router.push(loginPath);
        }, 0);
    }, []);

    if (fromOutside && authSending) {
        page = pages.loading;
    }
    const prevPageRef = React.useRef<string>();
    const prevPage = prevPageRef.current;

    const prevRenderRef = React.useRef<JSX.Element>();
    const prevRender = prevRenderRef.current;

    const render = (
        <>
            {page === pages.loading && <XLoader loading={true} />}
            {page === pages.acceptInvite && (
                <AcceptInvitePage
                    variables={{
                        inviteKey: router.query.redirect.split('/')[2],
                    }}
                />
            )}
            {page === pages.createNewAccount && (
                <XTrack event={'signin_view'} key={'signin-track'}>
                    <CreateNewAccountPage loginWith={loginWith} />
                </XTrack>
            )}
            {page === pages.askAuthData && (
                <XTrack event={'signin_view'}>
                    <AskAuthDataPage
                        fireAuth={fireAuth}
                        authError={authError}
                        authValue={authValue}
                        phoneCodeValue={phoneCodeValue}
                        authSending={authSending}
                        setPhoneCodeValue={setPhoneCodeValue}
                        setAuthSending={setAuthSending}
                        setAuthError={setAuthError}
                        setAuthValue={setAuthValue}
                    />
                </XTrack>
            )}
            {page === pages.askAuthCode &&
                (!authValue ? (
                    <XPageRedirect path="/" />
                ) : (
                        <AskAuthCodePage
                            authValue={authValue}
                            phoneCodeValue={phoneCodeValue}
                            authWasResend={authWasResend}
                            authSending={authSending}
                            setAuthWasResend={setAuthWasResend}
                            isExistingUser={isExistingUser}
                            avatarId={avatarId}
                            backButtonClick={() => {
                                setFromOutside(false);
                            }}
                            resendCodeClick={async () => {
                                trackEvent('code_resend_action');
                                setAuthSending(true);
                                if (prevDataFired.current) {
                                    await fireAuth(prevDataFired.current, isPhoneAuth);
                                }
                                setAuthWasResend(true);
                            }}
                        />
                    ))}
            {page === pages.introduceYourself && (
                <XTrack event="signin_profile_view">
                    <IntroduceYourselfPage />
                </XTrack>
            )}
        </>
    );
    if (page !== pages.loading) {
        prevPageRef.current = page;
    }
    prevRenderRef.current = render;

    let forward = pagesArr.indexOf(page) - pagesArr.indexOf(prevPage || '') > 0;

    const headerRef = React.useRef<AuthHeaderInstance>(null);
    const setOnBack = React.useCallback((callback?: (event: React.MouseEvent) => void) => {
        if (headerRef.current) {
            headerRef.current.setOnBack(callback);
        }
    }, []);
    const setOnSkip = React.useCallback((callback?: (event: React.MouseEvent) => void) => {
        if (headerRef.current) {
            headerRef.current.setOnSkip(callback);
        }
    }, []);
    const setMobileTransparent = React.useCallback((value?: boolean) => {
        if (headerRef.current) {
            headerRef.current.setMobileTransparent(value);
        }
    }, []);

    return (
        <div className={outerContainer}>
            {page !== 'acceptInvite' && <AuthHeader ref={headerRef} />}

            <AuthHeaderConfigContex.Provider
                value={{
                    setOnBack,
                    setOnSkip,
                    setMobileTransparent,
                }}
            >
                {prevRender && page !== prevPage ? (
                    <>
                        <div className={cx(pageContainer, forward ? forwardOut : backwardOut)}>
                            {prevRender}
                        </div>
                        <div className={cx(pageContainer, forward ? forwardIn : backwardIn)}>
                            {render}
                        </div>
                    </>
                ) : (
                        render
                    )}
            </AuthHeaderConfigContex.Provider>
        </div>
    );
};
