import * as React from 'react';
import { pages, pagesT, pagesArr } from './components/pages';
import { XRouterContext } from 'openland-x-routing/XRouterContext';
import { AcceptInvitePage } from './accept-invite.page';
import { AskActivationPage, checkCode } from './ask-activation-code.page';
import { AskEmailPage } from './ask-email.page';
import { CreateNewAccountPage } from './create-new-account.page';
import { EnterYourOrganizationPage } from './enter-your-organization.page';
import { IntroduceYourselfPage } from './introduce-yourself.page';
import { XTrack } from 'openland-x-analytics/XTrack';
import { trackEvent } from 'openland-x-analytics';
import * as Cookie from 'js-cookie';
import { useIsMobile } from 'openland-web/hooks/useIsMobile';
import { XLoader } from 'openland-x/XLoader';
import { canUseDOM } from 'openland-y-utils/canUseDOM';
import { API_AUTH_ENDPOINT } from 'openland-x-graphql/endpoint';
import { completeAuth } from './complete.page';
import { css, cx } from 'linaria';
import { BackSkipLogo } from '../components/BackSkipLogo';
import { XView } from 'react-mental';

const getAppInvite = (router: any) => {
    if (router.query && router.query.redirect && router.query.redirect.split('/')[1] === 'invite') {
        return router.query.redirect.split('/')[2];
    }
    return null;
};

const getOrgInvite = (router: any) => {
    if (router.query && router.query.redirect && router.query.redirect.split('/')[1] === 'join') {
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

const AuthHeaderConfigContex = React.createContext<{ setOnBack: (f?: (event: React.MouseEvent) => void) => void, setOnSkip: (f?: (event: React.MouseEvent) => void) => void }>({ setOnBack: () => {/**/ }, setOnSkip: () => {/**/ } });
export const AuthHeaderConfig = React.memo((props: { onBack?: () => void, onSkip?: () => void }) => {
    const authHeaderConfigContex = React.useContext(AuthHeaderConfigContex);
    React.useEffect(() => {
        authHeaderConfigContex.setOnBack(props.onBack);
        authHeaderConfigContex.setOnSkip(props.onSkip);

        console.warn('setting header', props.onBack, props.onSkip);
    }, []);
    return <></>;
});

interface AuthHeaderInstance {
    setOnBack: (callback?: (event: React.MouseEvent) => void) => void;
    setOnSkip: (callback?: (event: React.MouseEvent) => void) => void;
}
const AuthHeader = React.memo(React.forwardRef((props: {}, ref: React.Ref<AuthHeaderInstance>) => {
    const [onBack, setOnBack] = React.useState<{ callback?: (event: React.MouseEvent) => void }>({ callback: (event: React.MouseEvent) => {/**/ } });
    const [onSkip, setOnSkip] = React.useState<{ callback?: (event: React.MouseEvent) => void }>({ callback: undefined });

    React.useImperativeHandle(ref, () => ({
        setOnBack: (callback) => setOnBack({ callback }),
        setOnSkip: (callback) => setOnSkip({ callback })
    }));

    const onBackPressed = React.useCallback((event: React.MouseEvent) => {
        if (onBack.callback) {
            onBack.callback(event);
        } else {
            history.back();
        }
    }, [onBack]);
    const onSkipPressed = React.useCallback((event: React.MouseEvent) => {
        if (onSkip.callback) {
            onSkip.callback(event);
        }
    }, [onSkip]);

    return (
        <XView position="absolute" width="100%">
            <BackSkipLogo onBack={onBackPressed} onSkip={onSkip.callback ? onSkipPressed : undefined} />
        </XView>
    );
}));

export default () => {
    let isSafari = ((window as any).safari !== undefined) || (/iPad|iPhone|iPod/.test(navigator.userAgent));
    let router = React.useContext(XRouterContext)!;
    let page: pagesT = pages.createNewAccount;

    const isSignInInvite = checkIfIsSignInInvite(router);

    if (getAppInvite(router)) {
        Cookie.set('x-openland-app-invite', getAppInvite(router));
    }

    if (getOrgInvite(router)) {
        Cookie.set('x-openland-org-invite', getOrgInvite(router));
    }

    let isInvitePage = isSignInInvite;

    if (router.path.includes('accept-invite') || isInvitePage) {
        page = pages.acceptInvite;
    }
    if (router.path.includes('ask-activation-code')) {
        page = pages.askActivationCode;
    }
    if (router.path.includes('ask-email')) {
        page = pages.askEmail;
    }
    if (
        router.path.includes('enter-your-organization') ||
        router.path.includes('/createOrganization')
    ) {
        page = pages.enterYourOrganization;
    }
    if (router.path.includes('introduce-yourself') || router.path.includes('/createProfile')) {
        page = pages.introduceYourself;
    }
    if (router.path.includes('google-complete')) {
        page = pages.loading;
    }
    if (router.path.includes('magic')) {
        page = pages.loading;
    }

    let redirect = router.query ? (router.query.redirect ? router.query.redirect : null) : null;

    if (router.routeQuery.redirect) {
        if (router.routeQuery.redirect.indexOf('/acceptChannelInvite/') !== -1) {
            Cookie.set(
                'x-openland-invite',
                router.routeQuery.redirect.slice('/acceptChannelInvite/'.length),
            );
        }
    }
    const isMobile = useIsMobile();

    const [email, setEmail] = React.useState(false);
    const [emailValue, setEmailValue] = React.useState('');
    const [emailWasResend, setEmailWasResend] = React.useState(false);
    const [emailSending, setEmailSending] = React.useState(false);
    const [emailError, setEmailError] = React.useState('');
    const [emailSent, setEmailSent] = React.useState(false);
    const [googleStarting, setGoogleStarting] = React.useState(false);
    const [fromOutside, setFromOutside] = React.useState(false);
    const [isExistingUser, setExistingUser] = React.useState(false);
    const [avatarId, setAvatarId] = React.useState(null);

    const fireEmail = React.useCallback(
        async (emailToFire: string) => {
            Cookie.set('auth-type', 'email', { path: '/' });
            if (redirect) {
                Cookie.set('sign-redirect', redirect, { path: '/' });
            }
            try {
                let res = await (await fetch(API_AUTH_ENDPOINT + '/sendCode', {
                    body: JSON.stringify({
                        email: emailToFire,
                    }),
                    headers: [['Content-Type', 'application/json']],
                    method: 'POST',
                })).json();
                if (!res.ok) {
                    throw new Error(res.errorText || 'Something went wrong');
                }
                localStorage.setItem('authSession', res.session);

                setEmailSending(false);
                setEmailSent(true);
                setExistingUser(!!res.profileExists);
                setAvatarId(res.pictureId);
            } catch (e) {
                throw new Error('Something went wrong');
            }
        },
        [redirect],
    );

    // googleAuth is in ref because we should call signIn function synchronously, safari will block popup otherwise 
    const googleAuth = React.useRef<gapi.auth2.GoogleAuth>();
    React.useEffect(() => {
        gapi.load('auth2', async () => {
            gapi.auth2.init({
                client_id: "1095846783035-rpgtqd3cbbbagg3ik0rc609olqfnt6ah.apps.googleusercontent.com",
                scope: "profile email"
            }).then(auth => {
                googleAuth.current = auth;
            });
        });
    }, []);

    const completeGoogleSignin = React.useCallback(async (user: gapi.auth2.GoogleUser) => {
        var uploaded = await (await fetch(API_AUTH_ENDPOINT + '/google/getAccessToken', {
            method: 'POST',
            headers: [['Content-Type', 'application/json']],
            body: JSON.stringify({ idToken: user.getAuthResponse().id_token })
        })).json();

        if (uploaded.ok) {
            completeAuth(uploaded.accessToken);
        } else {
            console.warn(uploaded);
            router.replace('/authorization/signin');
        }
    }, []);

    const fireGoogle = React.useCallback(() => {
        Cookie.set('auth-type', 'google', { path: '/' });
        if (redirect) {
            Cookie.set('sign-redirect', redirect, { path: '/' });
        }
        if (googleAuth.current) {
            let signing = googleAuth.current.signIn({ ux_mode: isSafari ? 'popup' : 'redirect', prompt: 'consent', redirect_uri: window.origin + '/authorization/google-complete' });
            signing.then(completeGoogleSignin).catch(e => {
                setGoogleStarting(false);
                throw new Error(e);
            });
        }
    }, []);

    React.useEffect(() => {
        if (router.path.includes('google-complete')) {
            gapi.load('auth2', async () => {
                gapi.auth2.init({
                    client_id: "1095846783035-rpgtqd3cbbbagg3ik0rc609olqfnt6ah.apps.googleusercontent.com",
                    scope: "profile email"
                }).then(async (auth2) => {
                    if (auth2.isSignedIn.get()) {
                        completeGoogleSignin(auth2.currentUser.get());
                    } else {
                        router.replace('/authorization/signin');
                        console.warn('google auth: not signed in');
                    }
                });
            });
        } else if (router.path.includes('magic')) {
            (async () => {
                let path = router.path.split('/');
                try {
                    let token = await checkCode(path[path.length - 1]);
                    await completeAuth(token);
                } catch {
                    // TODO: ask for design for magic button auth errors
                    router.replace('/authorization/signin');
                }
            })();
        }
    }, []);

    const loginWithGoogle = React.useCallback(() => {
        trackEvent('signin_google_action');
        setGoogleStarting(true);
        fireGoogle();

    }, []);

    const loginWithEmail = React.useCallback(() => {
        setEmail(true);
        setEmailValue('');
        setEmailSending(false);
        setEmailError('');
        setEmailSent(false);

        setTimeout(() => {
            router.push('/authorization/ask-email');
        }, 0);
    }, []);

    if (router.query.email) {
        let noValue = router.query.email === 'true';
        if (email !== true) {
            setEmail(true);
        }

        const newEmailValue = noValue ? '' : router.query.email;
        if (emailValue !== newEmailValue) {
            setEmailValue(newEmailValue);
        }

        const newEmailSending = noValue ? false : true;

        if (emailSending !== newEmailSending) {
            setEmailSending(newEmailSending);
        }
        if (emailError !== '') {
            setEmailError('');
        }
        if (emailSent) {
            setEmailSent(false);
        }
        if (!fromOutside) {
            setFromOutside(true);
        }

        if (canUseDOM) {
            if (!noValue) {
                fireEmail(router.query.email);
                router.push('/authorization/ask-activation-code');
            } else {
                router.push('/authorization/ask-email');
            }
        }
    } else if (router.query.google) {
        if (!googleStarting) {
            setGoogleStarting(true);
        }
        if (!fromOutside) {
            setFromOutside(true);
        }

        if (canUseDOM) {
            fireGoogle();
        }
    }

    if ((fromOutside && emailSending)) {
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
                    isMobile={!!isMobile}
                />
            )}
            {page === pages.createNewAccount && (
                <XTrack
                    event={'signin_view'}
                    key={'signin-track'}
                >
                    <CreateNewAccountPage
                        loginWithGoogle={loginWithGoogle}
                        loginWithEmail={loginWithEmail}
                    />
                </XTrack>
            )}
            {page === pages.askEmail && (
                <XTrack event={'signin_email_view'}>
                    <AskEmailPage
                        fireEmail={fireEmail}
                        emailError={emailError}
                        emailValue={emailValue}
                        emailSending={emailSending}
                        setEmailSending={setEmailSending}
                        setEmailError={setEmailError}
                        setEmailSent={setEmailSent}
                        setEmailValue={setEmailValue}
                        isMobile={!!isMobile}
                    />
                </XTrack>
            )}
            {page === pages.askActivationCode && (
                <XTrack event="code_view">
                    <AskActivationPage
                        resendCodeClick={async () => {
                            trackEvent('code_resend_action');
                            setEmailSending(true);
                            await fireEmail(emailValue);
                            setEmailWasResend(true);
                        }}
                        backButtonClick={() => {
                            setFromOutside(false);
                        }}
                        avatarId={avatarId}
                        emailWasResend={emailWasResend}
                        setEmailWasResend={setEmailWasResend}
                        emailSendedTo={emailValue}
                        emailValue={emailValue}
                        emailSending={emailSending}
                        isMobile={!!isMobile}
                        isExistingUser={isExistingUser}
                    />
                </XTrack>
            )}
            {page === pages.introduceYourself && (
                <XTrack event="signin_profile_view">
                    <IntroduceYourselfPage isMobile={!!isMobile} />
                </XTrack>
            )}
            {page === pages.enterYourOrganization && (
                <XTrack event="signin_org_view">
                    <EnterYourOrganizationPage inviteKey={null} isMobile={!!isMobile} />
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

    return (
        <div className={outerContainer}>
            <AuthHeader ref={headerRef} />

            <AuthHeaderConfigContex.Provider
                value={{
                    setOnBack,
                    setOnSkip,
                }}
            >

                {prevRender && (page !== prevPage) ? (
                    <>
                        <div className={cx(pageContainer, forward ? forwardOut : backwardOut)}>
                            {prevRender}
                        </div>
                        <div className={cx(pageContainer, forward ? forwardIn : backwardIn)}>
                            {render}
                        </div>

                    </>

                ) : render}
            </AuthHeaderConfigContex.Provider>
        </div>
    );
};
