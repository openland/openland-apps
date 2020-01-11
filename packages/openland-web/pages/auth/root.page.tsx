import * as React from 'react';
import { pages, pagesT } from './components/pages';
import { XRouterContext } from 'openland-x-routing/XRouterContext';
import { AcceptInvitePage } from './accept-invite.page';
import { AskActivationPage } from './ask-activation-code.page';
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

const checkIfIsSignIn = (router: any) => {
    if (checkIfIsSignInInvite(router)) {
        return false;
    }
    return router.path.endsWith('signin');
};

export default () => {
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
    if (router.path.includes('create-new-account')) {
        Cookie.set('x-openland-create-new-account', 'true');
        page = pages.createNewAccount;
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
    const [signin, setSignin] = React.useState(router.path.endsWith('signin'));

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
            } catch (e) {
                throw new Error('Something went wrong');
            }
        },
        [redirect],
    );

    const fireGoogle = React.useCallback(async () => {
        Cookie.set('auth-type', 'google', { path: '/' });
        if (redirect) {
            Cookie.set('sign-redirect', redirect, { path: '/' });
        }
        gapi.load('auth2', async () => {
            gapi.auth2.init({
                client_id: "1095846783035-rpgtqd3cbbbagg3ik0rc609olqfnt6ah.apps.googleusercontent.com",
                scope: "profile email"
            }).then((auth2) => auth2.signIn({ ux_mode: 'redirect', redirect_uri: window.origin + '/authorization/google-complete' }));

        });
    }, []);

    React.useEffect(() => {
        if (router.path.includes('google-complete')) {
            gapi.load('auth2', async () => {
                gapi.auth2.init({
                    client_id: "1095846783035-rpgtqd3cbbbagg3ik0rc609olqfnt6ah.apps.googleusercontent.com",
                    scope: "profile email"
                }).then(async (auth2) => {
                    if (auth2.isSignedIn.get()) {
                        var uploaded = await (await fetch(API_AUTH_ENDPOINT + '/google/getAccessToken', {
                            method: 'POST',
                            headers: [['Content-Type', 'application/json']],
                            body: JSON.stringify({ idToken: auth2.currentUser.get().getAuthResponse().id_token })
                        })).json();

                        if (uploaded.ok) {
                            completeAuth(uploaded.accessToken);
                        } else {
                            console.warn(uploaded);
                            router.push('/authorization/signin');
                        }
                    } else {
                        router.push('/authorization/signin');
                    }
                });
            });
        }
    }, []);

    const loginWithGoogle = React.useCallback(() => {
        trackEvent(checkIfIsSignIn(router) ? 'signin_google_action' : 'signup_google_action');
        setGoogleStarting(true);
        setTimeout(() => {
            fireGoogle();
        }, 0);
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

    if ((fromOutside && emailSending) || googleStarting) {
        page = pages.loading;
    }

    return (
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
                    event={signin ? 'signin_view' : 'signup_view'}
                    key={signin ? 'signin-track' : 'signup-track'}
                >
                    <CreateNewAccountPage
                        onLoginClick={() => {
                            setSignin(true);
                        }}
                        onSignUpClick={() => {
                            setSignin(false);
                        }}
                        signin={signin}
                        loginWithGoogle={loginWithGoogle}
                        loginWithEmail={loginWithEmail}
                        isMobile={!!isMobile}
                    />
                </XTrack>
            )}
            {page === pages.askEmail && (
                <XTrack event={signin ? 'signin_email_view' : 'signup_email_view'}>
                    <AskEmailPage
                        fireEmail={fireEmail}
                        signin={signin}
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
                        signin={signin}
                        resendCodeClick={async () => {
                            trackEvent('code_resend_action');
                            setEmailSending(true);
                            await fireEmail(emailValue);
                            setEmailWasResend(true);
                        }}
                        backButtonClick={() => {
                            setFromOutside(false);
                        }}
                        emailWasResend={emailWasResend}
                        emailSendedTo={emailValue}
                        emailValue={emailValue}
                        emailSending={emailSending}
                        isMobile={!!isMobile}
                    />
                </XTrack>
            )}
            {page === pages.introduceYourself && (
                <XTrack event="signup_profile_view">
                    <IntroduceYourselfPage isMobile={!!isMobile} />
                </XTrack>
            )}
            {page === pages.enterYourOrganization && (
                <XTrack event="signup_org_view">
                    <EnterYourOrganizationPage inviteKey={null} isMobile={!!isMobile} />
                </XTrack>
            )}
        </>
    );
};
