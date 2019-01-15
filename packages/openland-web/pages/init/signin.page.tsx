import * as React from 'react';
import * as Cookie from 'js-cookie';
import { withAppBase } from '../../components/withAppBase';
import { withRouter, XWithRouter } from 'openland-x-routing/withRouter';
import { XDocumentHead } from 'openland-x-routing/XDocumentHead';
import { XTrack } from 'openland-x-analytics/XTrack';
import {
    PageModeT,
    WebSignUpContainer,
    RoomSignupContainer,
    RoomActivationCode,
    RoomAuthMechanism,
    WebSignUpAuthMechanism,
    RoomCreateWithEmail,
    WebSignUpCreateWithEmail,
    WebSignUpActivationCode,
    InviteInfoInner,
} from './components/SignComponents';
import { AuthRouter } from '../root/AuthRouter';
import { InitTexts } from './_text';
import { canUseDOM } from 'openland-x-utils/canUseDOM';
import { XLoader } from 'openland-x/XLoader';
import { createAuth0Client } from 'openland-x-graphql/Auth0Client';
import { withAppInviteInfo } from '../../api/withAppInvite';
import { XView } from 'react-mental';

const InviteInfo = withAppInviteInfo((props: any) => {
    let signPath = '/signup?redirect=' + encodeURIComponent((props as any).redirect);
    let inviter =
        (props.data.invite && props.data.invite.creator) ||
        (props.data.appInvite && props.data.appInvite.inviter);

    if (!inviter) {
        return <XLoader loading={true} />;
    }
    return (
        <InviteInfoInner
            signin={props.signin}
            inviter={inviter}
            signPath={signPath}
            loginWithGoogle={props.loginWithGoogle}
            loginWithEmail={props.loginWithEmail}
        />
    );
}) as React.ComponentType<{
    variables: { inviteKey: string };
    signin: boolean;
    loginWithGoogle: Function;
    loginWithEmail: Function;
}>;

const checkIfIsSignInInvite = (router: any) => {
    return (
        router.query && router.query.redirect && router.query.redirect.split('/')[1] === 'invite'
    );
};

const checkIfIsSignIn = (router: any) => {
    if (checkIfIsSignInInvite(router)) {
        return false;
    }
    return router.path.endsWith('signin');
};

class SignInComponent extends React.Component<
    { redirect?: string | null; roomView?: boolean } & XWithRouter,
    {
        googleStarting: boolean;
        emailWasResend: boolean;
        email: boolean;
        emailValue: string;
        emailSending: boolean;
        emailError: string;
        emailSent: boolean;
        fromOutside: boolean;
        codeValue: string;
        codeSending: boolean;
        codeError: string;
        signInInvite: boolean;
    }
> {
    fireGoogle = async () => {
        Cookie.set('auth-type', 'google', { path: '/' });
        createAuth0Client().authorize({
            connection: 'google-oauth2',
            state: this.props.redirect ? this.props.redirect : 'none',
        });
    };

    fireEmail = async (cb?: Function) => {
        Cookie.set('auth-type', 'email', { path: '/' });
        if (this.props.redirect) {
            Cookie.set('sign-redirect', this.props.redirect, { path: '/' });
        }
        createAuth0Client().passwordlessStart(
            { connection: 'email', send: 'link', email: this.state.emailValue },
            (error: any, v) => {
                if (error) {
                    this.setState({
                        emailSending: false,
                        emailError: error.description,
                    });
                } else {
                    setTimeout(() => {
                        this.setState({ emailSending: false, emailSent: true });
                        if (cb) {
                            cb();
                        }
                    }, 500);
                }
            },
        );
    };

    constructor(props: { redirect?: string | null } & XWithRouter) {
        super(props);
        let state = {
            googleStarting: false,
            email: false,
            emailWasResend: false,
            emailValue: '',
            emailSending: false,
            emailError: '',
            emailSent: false,
            codeValue: '',
            codeSending: false,
            codeError: '',
            fromOutside: false,
            signInInvite: false,
        };
        if (props.router.query.email) {
            let noValue = props.router.query.email === 'true';
            this.state = {
                ...state,
                email: true,
                emailValue: noValue ? '' : props.router.query.email,
                emailSending: noValue ? false : true,
                emailError: '',
                emailSent: false,
                fromOutside: true,
            };
            if (canUseDOM && !noValue) {
                this.fireEmail();
            }
        } else if (props.router.query.google) {
            this.state = {
                ...state,
                googleStarting: true,
                fromOutside: true,
            };
            if (canUseDOM) {
                this.fireGoogle();
            }
        } else {
            this.state = state;
        }

        if (checkIfIsSignInInvite(props.router)) {
            this.state = {
                ...this.state,
                signInInvite: true,
                fromOutside: true,
            };
        }
    }

    loginWithGoogle = () => {
        this.setState({ googleStarting: true, signInInvite: false });
        this.fireGoogle();
    };

    loginWithEmail = () => {
        this.setState({
            email: true,
            emailValue: '',
            emailSending: false,
            emailError: '',
            emailSent: false,
            codeValue: '',
            codeSending: false,
            codeError: '',
            signInInvite: false,
        });
    };

    loginReset = () => {
        this.setState({
            email: false,
            emailValue: '',
            emailSending: false,
            emailError: '',
            emailSent: false,
            codeValue: '',
            codeSending: false,
            codeError: '',
            fromOutside: false,
            signInInvite: false,
        });
    };

    emailChanged = (val: string, cb: () => void) => {
        this.setState({ emailValue: val }, cb);
    };

    codeChanged = (val: string, cb: () => void) => {
        this.setState({ codeValue: val }, cb);
    };

    loginEmailStart = () => {
        this.setState({
            emailSending: true,
            emailError: '',
            emailSent: false,
            signInInvite: false,
        });
        this.fireEmail();
    };

    loginCodeStart = async () => {
        this.setState({ codeSending: true });
        createAuth0Client().passwordlessVerify(
            {
                connection: 'email',
                email: this.state.emailValue,
                verificationCode: this.state.codeValue,
            },
            (error: any, v) => {
                console.warn(error);
                if (error) {
                    this.setState({
                        signInInvite: false,
                        codeSending: false,
                        codeError: error.description,
                    });
                } else {
                    // Ignore. Should be redirect to completion page.
                }
            },
        );
    };

    render() {
        const signin = checkIfIsSignIn(this.props.router);
        let redirect = this.props.router.query.redirect
            ? '?redirect=' + encodeURIComponent(this.props.router.query.redirect)
            : '';

        const signupText = signin ? InitTexts.auth.signupHint : InitTexts.auth.signinHint;

        const linkText = signin ? InitTexts.auth.signup : InitTexts.auth.signin;

        const roomView = this.props.roomView;

        const Container = roomView ? RoomSignupContainer : WebSignUpContainer;
        const AuthMechanism = roomView ? RoomAuthMechanism : WebSignUpAuthMechanism;
        const Loader = roomView
            ? () => (
                  <XView height={150} position="relative">
                      <XLoader loading={true} />
                  </XView>
              )
            : () => <XLoader loading={!this.state.emailSent} />;

        const MyCreateWithEmail = roomView ? RoomCreateWithEmail : WebSignUpCreateWithEmail;

        const MyActivationCode = roomView ? RoomActivationCode : WebSignUpActivationCode;

        let pageMode: PageModeT = 'AuthMechanism';

        if (this.state.signInInvite) {
            pageMode = 'SignInInvite';
        } else if (this.state.emailSent) {
            pageMode = 'ActivationCode';
        } else if (this.state.email && !this.state.emailSent) {
            pageMode = 'CreateFromEmail';
        } else if (
            this.state.fromOutside &&
            (this.state.emailSending || this.state.googleStarting)
        ) {
            pageMode = 'Loading';
        } else if (!this.state.fromOutside && !this.state.email) {
            pageMode = 'AuthMechanism';
        }

        const showTerms = (!signin && pageMode === 'AuthMechanism') || this.state.fromOutside;

        return (
            <Container
                showTerms={showTerms}
                pageMode={pageMode}
                text={signupText}
                path={(signin ? '/signup' : '/signin') + redirect}
                linkText={linkText}
                headerStyle={signin ? 'signin' : 'signup'}
            >
                {pageMode === 'SignInInvite' && (
                    <InviteInfo
                        variables={{
                            inviteKey: this.props.router.query.redirect.split('/')[2],
                        }}
                        signin={signin}
                        loginWithGoogle={this.loginWithGoogle}
                        loginWithEmail={this.loginWithEmail}
                    />
                )}
                {pageMode === 'AuthMechanism' && (
                    <AuthMechanism
                        signin={signin}
                        loginWithGoogle={this.loginWithGoogle}
                        loginWithEmail={this.loginWithEmail}
                    />
                )}

                {pageMode === 'Loading' && <Loader />}

                {pageMode === 'CreateFromEmail' && (
                    <MyCreateWithEmail
                        signin={signin}
                        emailError={this.state.emailError}
                        emailChanged={this.emailChanged}
                        emailValue={this.state.emailValue}
                        loginEmailStart={this.loginEmailStart}
                        emailSending={this.state.emailSending}
                    />
                )}

                {pageMode === 'ActivationCode' && (
                    <MyActivationCode
                        emailWasResend={this.state.emailWasResend}
                        resendCodeClick={() => {
                            this.setState({
                                emailSending: true,
                            });
                            this.fireEmail(() => {
                                this.setState({
                                    emailWasResend: true,
                                });
                            });
                        }}
                        emailSendedTo={this.state.emailValue}
                        backButtonClick={() => {
                            this.setState(
                                {
                                    fromOutside: false,
                                },
                                () => {
                                    this.loginWithEmail();
                                },
                            );
                        }}
                        codeError={this.state.codeError}
                        codeChanged={this.codeChanged}
                        codeSending={this.state.codeSending}
                        emailSending={this.state.emailSending}
                        codeValue={this.state.codeValue}
                        loginCodeStart={this.loginCodeStart}
                    />
                )}
            </Container>
        );
    }
}

export const SignInPage = (props: any) => {
    let redirect = props.router.query
        ? props.router.query.redirect
            ? props.router.query.redirect
            : null
        : null;
    const signin = props.router.path.endsWith('signin');

    if (props.router.routeQuery.redirect) {
        if (props.router.routeQuery.redirect.indexOf('/acceptChannelInvite/') !== -1) {
            Cookie.set(
                'x-openland-invite',
                props.router.routeQuery.redirect.slice('/acceptChannelInvite/'.length),
            );
        }
    }

    const fromRoom = Cookie.get('x-openland-invite');
    const isSignInInvite = checkIfIsSignInInvite(props.router);

    let title;
    if (isSignInInvite) {
        title = InitTexts.invite.pageTitle;
    } else {
        title = signin ? InitTexts.auth.signinPageTitle : InitTexts.auth.signupPageTitle;
    }

    let event;
    if (isSignInInvite) {
        event = 'Invite';
    } else {
        event = signin ? 'View Signin' : 'View Signup';
    }

    return (
        <AuthRouter>
            <XDocumentHead title={title} titleSocial={InitTexts.socialPageTitle} />
            <XTrack event={event}>
                {canUseDOM && (
                    <SignInComponent
                        redirect={redirect}
                        router={props.router}
                        roomView={fromRoom ? true : false}
                    />
                )}
            </XTrack>
        </AuthRouter>
    );
};

export default withAppBase('Sign In', withRouter(SignInPage));
