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
import { AskEmailCodePage } from './ask-activation-code.page';
import { AskPhoneCodePage } from './ask-phone-code.page';
import { AskEmailPage } from './ask-email.page';
import { AskPhonePage } from './ask-phone.page';
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
    let router = React.useContext(XRouterContext)!;
    let page: pagesT = pages.createNewAccount;

    if (getAppInvite(router)) {
        Cookie.set('x-openland-app-invite', getAppInvite(router));
    }

    if (router.path.includes('accept-invite') || checkIfIsSignInInvite(router)) {
        page = pages.acceptInvite;
    }
    if (router.path.includes('ask-activation-code')) {
        page = pages.askActivationCode;
    }
    if (router.path.includes('ask-activation-phone-code')) {
        page = pages.askPhoneCode;
    }
    if (router.path.includes('ask-email')) {
        page = pages.askEmail;
    }
    if (router.path.includes('ask-phone')) {
        page = pages.askPhone;
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
    const [phoneValue, setPhoneValue] = React.useState('');
    const [phoneSending, setPhoneSending] = React.useState(false);
    const [phoneError, setPhoneError] = React.useState('');
    const [emailValue, setEmailValue] = React.useState('');
    const [emailWasResend, setEmailWasResend] = React.useState(false);
    const [emailSending, setEmailSending] = React.useState(false);
    const [emailError, setEmailError] = React.useState('');
    const [fromOutside, setFromOutside] = React.useState(false);
    const [isExistingUser, setExistingUser] = React.useState(false);
    const [avatarId, setAvatarId] = React.useState(null);

    const checkRedirect = () => {
        let redirect = router.query ? (router.query.redirect ? router.query.redirect : null) : null;
        if (redirect) {
            Cookie.set('sign-redirect', redirect, { path: '/' });
        }
    };

    const firePhone = React.useCallback(async (phoneToFire: string) => {
        Cookie.set('auth-type', 'phone', { path: '/' });
        checkRedirect();
        try {
            let res = await (
                await fetch(API_AUTH_ENDPOINT + '/phone/sendCode', {
                    body: JSON.stringify({
                        phone: phoneToFire,
                    }),
                    headers: [['Content-Type', 'application/json']],
                    method: 'POST',
                })
            ).json();
            if (!res.ok) {
                throw new Error(res.errorText || 'Something went wrong');
            }
            localStorage.setItem('authSession', res.session);

            setPhoneSending(false);
            setExistingUser(!!res.profileExists);
            setAvatarId(res.pictureId);
        } catch (e) {
            throw new Error('Something went wrong');
        }
    }, []);

    const fireEmail = React.useCallback(async (emailToFire: string) => {
        Cookie.set('auth-type', 'email', { path: '/' });
        checkRedirect();
        try {
            let res = await (
                await fetch(API_AUTH_ENDPOINT + '/sendCode', {
                    body: JSON.stringify({
                        email: emailToFire,
                    }),
                    headers: [['Content-Type', 'application/json']],
                    method: 'POST',
                })
            ).json();
            if (!res.ok) {
                throw new Error(res.errorText || 'Something went wrong');
            }
            localStorage.setItem('authSession', res.session);

            setEmailSending(false);
            setExistingUser(!!res.profileExists);
            setAvatarId(res.pictureId);
        } catch (e) {
            throw new Error('Something went wrong');
        }
    }, []);

    const loginWithPhone = React.useCallback(() => {
        setPhoneValue('');
        setPhoneError('');
        setPhoneSending(false);
        setTimeout(() => {
            router.push('/authorization/ask-phone');
        }, 0);
    }, []);

    const loginWithEmail = React.useCallback(() => {
        setEmailValue('');
        setEmailError('');
        setEmailSending(false);

        setTimeout(() => {
            router.push('/authorization/ask-email');
        }, 0);
    }, []);

    if (fromOutside && (emailSending || phoneSending)) {
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
                    <CreateNewAccountPage
                        loginWithPhone={loginWithPhone}
                        loginWithEmail={loginWithEmail}
                    />
                </XTrack>
            )}
            {page === pages.askPhone && (
                <XTrack event={'signin_phone_view'}>
                    <AskPhonePage
                        firePhone={firePhone}
                        phoneCodeValue={phoneCodeValue}
                        setPhoneCodeValue={setPhoneCodeValue}
                        phoneValue={phoneValue}
                        setPhoneValue={setPhoneValue}
                        phoneSending={phoneSending}
                        setPhoneSending={setPhoneSending}
                        phoneError={phoneError}
                        setPhoneError={setPhoneError}
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
                        setEmailValue={setEmailValue}
                    />
                </XTrack>
            )}
            {page === pages.askActivationCode &&
                (!emailValue ? (
                    <XPageRedirect path="/" />
                ) : (
                    <XTrack event="code_view">
                        <AskEmailCodePage
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
                            emailValue={emailValue}
                            emailSending={emailSending}
                            isExistingUser={isExistingUser}
                        />
                    </XTrack>
                ))}
            {page === pages.askPhoneCode &&
                (!phoneValue ? (
                    <XPageRedirect path="/" />
                ) : (
                    <XTrack event="code_view">
                        <AskPhoneCodePage
                            phoneValue={phoneValue}
                            phoneCodeValue={phoneCodeValue}
                            phoneSending={phoneSending}
                            avatarId={avatarId}
                            isExistingUser={isExistingUser}
                            backButtonClick={() => {
                                setFromOutside(false);
                            }}
                        />
                    </XTrack>
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
