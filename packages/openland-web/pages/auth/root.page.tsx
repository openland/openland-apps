import * as React from 'react';
import { pages, pagesT } from './pages';
import { XRouterContext } from 'openland-x-routing/XRouterContext';
import { AcceptInvitePage } from './accept-invite.page';
import { AskActivationPage } from './ask-activation-code.page';
import { AskEmailPage } from './ask-email.page';
import { CreateNewAccountPage } from './create-new-account.page';
import { EnterYourOrganizationPage } from './enter-your-organization.page';
import { IntroduceYourselfPage } from './introduce-yourself.page';
import { XTrack } from 'openland-x-analytics/XTrack';
import { trackEvent } from 'openland-x-analytics';
import { InitTexts } from 'openland-web/pages/init/_text';
import { createAuth0Client } from 'openland-x-graphql/Auth0Client';
import * as Cookie from 'js-cookie';
import { useIsMobile } from 'openland-web/hooks/useIsMobile';
import { XLoader } from 'openland-x/XLoader';

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

const checkIfIsSignIn = (router: any) => {
    if (checkIfIsSignInInvite(router)) {
        return false;
    }
    return router.path.endsWith('signin');
};

export default () => {
    let router = React.useContext(XRouterContext)!;
    let page: pagesT = pages.createNewAccount;

    let appInviteKey = null;

    const isSignInInvite = checkIfIsSignInInvite(router);

    if (getAppInvite(router)) {
        console.log(getAppInvite(router));
        Cookie.set('x-openland-app-invite', getAppInvite(router));
    }

    let isInvitePage = isSignInInvite;
    let isInvitePageSignin = false;

    if (isInvitePage && router.path.endsWith('/signup')) {
        isInvitePageSignin = true;
    }

    if (router.path.includes('accept-invite') || isInvitePage) {
        page = pages.acceptInvite;
    } else if (router.path.includes('ask-activation-code')) {
        page = pages.askActivationCode;
    } else if (router.path.includes('ask-email')) {
        page = pages.askEmail;
    } else if (router.path.includes('create-new-account')) {
        page = pages.createNewAccount;
    } else if (
        router.path.includes('enter-your-organization') ||
        router.path.includes('/createOrganization')
    ) {
        page = pages.enterYourOrganization;
    } else if (
        router.path.includes('introduce-yourself') ||
        router.path.includes('/createProfile')
    ) {
        page = pages.introduceYourself;
    }

    let redirect = router.query ? (router.query.redirect ? router.query.redirect : null) : null;
    const signin = router.path.endsWith('signin');

    if (router.routeQuery.redirect) {
        if (router.routeQuery.redirect.indexOf('/acceptChannelInvite/') !== -1) {
            Cookie.set(
                'x-openland-invite',
                router.routeQuery.redirect.slice('/acceptChannelInvite/'.length),
            );
        }
    }

    let fromRoom: any = Cookie.get('x-openland-invite');
    const isMobile = useIsMobile();
    if (isMobile) {
        fromRoom = false;
    }

    let title;
    if (isSignInInvite) {
        title = InitTexts.invite.pageTitle;
    } else {
        title = signin ? InitTexts.auth.signinPageTitle : InitTexts.auth.signupPageTitle;
    }

    const [email, setEmail] = React.useState(false);
    const [emailValue, setEmailValue] = React.useState('');
    const [emailWasResend, setEmailWasResend] = React.useState(false);
    const [emailSending, setEmailSending] = React.useState(false);
    const [emailError, setEmailError] = React.useState('');
    const [emailSent, setEmailSent] = React.useState(false);
    const [googleStarting, setGoogleStarting] = React.useState(false);
    const [fromOutside, setFromOutside] = React.useState(false);

    const fireEmail = async (cb?: Function) => {
        Cookie.set('auth-type', 'email', { path: '/' });
        if (redirect) {
            Cookie.set('sign-redirect', redirect, { path: '/' });
        }
        createAuth0Client().passwordlessStart(
            { connection: 'email', send: 'link', email: emailValue },
            (error: any, v) => {
                if (error) {
                    setEmailSending(false);
                    setEmailError(error.description);
                } else {
                    setTimeout(() => {
                        setEmailSending(false);
                        setEmailSent(true);

                        if (cb) {
                            cb();
                        }
                    }, 500);
                }
            },
        );
    };

    const fireGoogle = async () => {
        Cookie.set('auth-type', 'google', { path: '/' });
        createAuth0Client().authorize({
            connection: 'google-oauth2',
            state: redirect ? redirect : 'none',
        });
    };

    const loginWithGoogle = () => {
        trackEvent(checkIfIsSignIn(router) ? 'signin_google_action' : 'signup_google_action');
        setGoogleStarting(true);
        setTimeout(() => {
            fireGoogle();
        }, 0);
    };

    const loginWithEmail = () => {
        setEmail(true);
        setEmailValue('');
        setEmailSending(false);
        setEmailError('');
        setEmailSent(false);

        setTimeout(() => {
            router.push('/auth2/ask-email');
        }, 0);
    };

    if ((fromOutside && emailSending) || googleStarting) {
        page = pages.loading;
    }

    return (
        <>
            {page === pages.loading && <XLoader />}
            {page === pages.acceptInvite && (
                <AcceptInvitePage
                    variables={{
                        inviteKey: router.query.redirect.split('/')[2],
                    }}
                    onAcceptInvite={() => {
                        router.push('/auth2/create-new-account');
                    }}
                />
            )}
            {page === pages.createNewAccount && (
                <XTrack
                    event={signin ? 'signin_view' : 'signup_view'}
                    key={signin ? 'signin-track' : 'signup-track'}
                >
                    <CreateNewAccountPage
                        signin={signin}
                        loginWithGoogle={loginWithGoogle}
                        loginWithEmail={loginWithEmail}
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
                    />
                </XTrack>
            )}
            {page === pages.askActivationCode && (
                <XTrack event="code_view">
                    <AskActivationPage
                        signin={signin}
                        resendCodeClick={() => {
                            trackEvent('code_resend_action');

                            setEmailSending(true);
                            fireEmail(() => {
                                setEmailWasResend(true);
                            });
                        }}
                        backButtonClick={() => {
                            setFromOutside(false);
                        }}
                        emailWasResend={emailWasResend}
                        emailSendedTo={emailValue}
                        emailValue={emailValue}
                        emailSending={emailSending}
                    />
                </XTrack>
            )}
            {page === pages.introduceYourself && <IntroduceYourselfPage roomView={false} />}
            {page === pages.enterYourOrganization && (
                <EnterYourOrganizationPage inviteKey={appInviteKey} />
            )}
        </>
    );
};
