import * as React from 'react';
import { withAppBase } from '../../components/withAppBase';
import { withRouter, XWithRouter } from 'openland-x-routing/withRouter';
import { XDocumentHead } from 'openland-x-routing/XDocumentHead';
import { XTrack } from 'openland-x-analytics/XTrack';
import {
    SignContainer,
    RoomSignup,
    RoomLoader,
    RoomActivationCode,
    RoomAuthMechanism,
    WebSignUpAuthMechanism,
    RoomCreateWithEmail,
    WebSignUpCreateWithEmail,
    WebSignUpActivationCode,
} from './components/SignComponents';
import { AuthRouter } from '../../components/AuthRouter';
import { InitTexts } from './_text';
import { canUseDOM } from 'openland-x-utils/canUseDOM';
import { XLoader } from 'openland-x/XLoader';
import * as Cookie from 'js-cookie';
import { createAuth0Client } from 'openland-x-graphql/Auth0Client';

class SignInComponent extends React.Component<
    { redirect?: string | null; roomView?: boolean } & XWithRouter,
    {
        googleStarting: boolean;
        email: boolean;
        emailValue: string;
        emailSending: boolean;
        emailError: string;
        emailSent: boolean;
        fromOutside: boolean;
        codeValue: string;
        codeSending: boolean;
        codeError: string;
    }
> {
    fireGoogle = async () => {
        Cookie.set('auth-type', 'google', { path: '/' });
        createAuth0Client().authorize({
            connection: 'google-oauth2',
            state: this.props.redirect ? this.props.redirect : 'none',
        });
    };

    fireEmail = async () => {
        Cookie.set('auth-type', 'email', { path: '/' });
        if (this.props.redirect) {
            Cookie.set('sign-redirect', this.props.redirect, { path: '/' });
        }
        createAuth0Client().passwordlessStart(
            { connection: 'email', send: 'link', email: this.state.emailValue },
            (error, v) => {
                if (error) {
                    this.setState({
                        emailSending: false,
                        emailError: error.description!!,
                    });
                } else {
                    this.setState({ emailSending: false, emailSent: true });
                }
            },
        );
    };

    constructor(props: { redirect?: string | null } & XWithRouter) {
        super(props);
        let state = {
            googleStarting: false,
            email: false,
            emailValue: '',
            emailSending: false,
            emailError: '',
            emailSent: false,
            codeValue: '',
            codeSending: false,
            codeError: '',
            fromOutside: false,
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
    }

    loginWithGoogle = (e: React.SyntheticEvent<any>) => {
        e.preventDefault();
        this.setState({ googleStarting: true });
        this.fireGoogle();
    };

    loginWithEmail = (e: React.SyntheticEvent<any>) => {
        e.preventDefault();
        this.setState({
            email: true,
            emailValue: '',
            emailSending: false,
            emailError: '',
            emailSent: false,
            codeValue: '',
            codeSending: false,
            codeError: '',
        });
    };

    loginReset = (e: React.SyntheticEvent<any>) => {
        e.preventDefault();
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
        });
    };

    emailChanged = (val: string) => {
        this.setState({ emailValue: val });
    };

    codeChanged = (val: string) => {
        this.setState({ codeValue: val });
    };

    loginEmailStart = (e?: React.SyntheticEvent<any>) => {
        if (e) {
            e.preventDefault();
        }
        this.setState({
            emailSending: true,
            emailError: '',
            emailSent: false,
        });
        this.fireEmail();
    };

    loginCodeStart = async (e?: React.SyntheticEvent<any>) => {
        if (e) {
            e.preventDefault();
        }
        this.setState({ codeSending: true });
        createAuth0Client().passwordlessVerify(
            {
                connection: 'email',
                email: this.state.emailValue,
                verificationCode: this.state.codeValue,
            },
            (error, v) => {
                console.warn(error);
                if (error) {
                    this.setState({
                        codeSending: false,
                        codeError: error.description!!,
                    });
                } else {
                    // Ignore. Should be redirect to completion page.
                }
            },
        );
    };

    render() {
        const signin = this.props.router.path.endsWith('signin');
        let redirect = this.props.router.query.redirect
            ? '?redirect=' +
              encodeURIComponent(this.props.router.query.redirect)
            : '';

        const signupText = signin
            ? InitTexts.auth.signupHint
            : InitTexts.auth.signinHint;

        const linkText = signin ? InitTexts.auth.signup : InitTexts.auth.signin;

        const Container = this.props.roomView ? RoomSignup : SignContainer;
        const AuthMechanism = this.props.roomView
            ? RoomAuthMechanism
            : WebSignUpAuthMechanism;
        const Loader = this.props.roomView
            ? () => (
                  <RoomLoader>
                      <XLoader loading={true} />
                  </RoomLoader>
              )
            : () => <XLoader loading={!this.state.emailSent} />;

        const MyWebSignUpCreateWithEmail = this.props.roomView
            ? RoomCreateWithEmail
            : WebSignUpCreateWithEmail;

        const MyWebSignUpActivationCode = this.props.roomView
            ? RoomActivationCode
            : WebSignUpActivationCode;

        return (
            <Container
                text={signupText}
                path={(signin ? '/signup' : '/signin') + redirect}
                linkText={linkText}
                headerStyle={signin ? 'signin' : 'signup'}
            >
                {!this.state.fromOutside && !this.state.email && (
                    <AuthMechanism
                        signin={signin}
                        loginWithGoogle={this.loginWithGoogle}
                        loginWithEmail={this.loginWithEmail}
                    />
                )}

                {this.state.fromOutside &&
                    (this.state.emailSending || this.state.googleStarting) && (
                        <Loader />
                    )}

                {this.state.email && !this.state.emailSent && (
                    <MyWebSignUpCreateWithEmail
                        signin={signin}
                        emailError={this.state.emailError}
                        emailChanged={this.emailChanged}
                        emailValue={this.state.emailValue}
                        loginEmailStart={this.loginEmailStart}
                        emailSending={this.state.emailSending}
                    />
                )}

                {this.state.emailSent && (
                    <MyWebSignUpActivationCode
                        resendCodeClick={() => console.log('resendCodeClick')}
                        backButtonClick={() => console.log('back')}
                        codeError={this.state.codeError}
                        codeChanged={this.codeChanged}
                        codeSending={this.state.codeSending}
                        codeValue={this.state.codeValue}
                        loginCodeStart={this.loginCodeStart}
                    />
                )}
            </Container>
        );
    }
}

export default withAppBase(
    'Sign In',
    withRouter(props => {
        let redirect = props.router.query
            ? props.router.query.redirect
                ? props.router.query.redirect
                : null
            : null;
        const signin = props.router.path.endsWith('signin');
        const fromRoom = Cookie.get('x-openland-invite');

        return (
            <AuthRouter>
                <XDocumentHead
                    title={
                        signin
                            ? InitTexts.auth.signinPageTitle
                            : InitTexts.auth.signupPageTitle
                    }
                    titleSocial={InitTexts.socialPageTitle}
                />
                <XTrack event={signin ? 'View Signin' : 'View Signup'}>
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
    }),
);
