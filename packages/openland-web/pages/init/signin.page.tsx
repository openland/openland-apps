import * as React from 'react';
import Glamorous from 'glamorous';
import { withAppBase } from '../../components/withAppBase';
import { XHorizontal } from 'openland-x-layout/XHorizontal';
import { withRouter, XWithRouter } from 'openland-x-routing/withRouter';
import { XButton } from 'openland-x/XButton';
import { XInput } from 'openland-x/XInput';
import { XServiceMessage } from 'openland-x/XServiceMessage';
import { XDocumentHead } from 'openland-x-routing/XDocumentHead';
import { XTrack } from 'openland-x-analytics/XTrack';
import {
    SignContainer,
    ButtonsWrapper,
    Separator,
    Description,
    RoomSignup,
    RoomLoader,
    RoomTerms,
    RoomTitle,
    RoomText,
    GoogleButton,
    EmailButton,
} from './components/SignComponents';

import { SubTitle, Title } from './components/CreateProfileComponents';
import { AuthRouter } from '../../components/AuthRouter';
import { InitTexts } from './_text';
import { canUseDOM } from 'openland-x-utils/canUseDOM';
import { XLoader } from 'openland-x/XLoader';
import * as Cookie from 'js-cookie';
import { createAuth0Client } from 'openland-x-graphql/Auth0Client';
import { XLink } from 'openland-x/XLink';

const EmptyBlock = Glamorous.div({
    width: '100%',
    height: 15,
    flexShrink: 0,
});

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
        console.warn(redirect);
        return this.props.roomView ? (
            <RoomSignup
                text={
                    signin
                        ? InitTexts.auth.signupHint
                        : InitTexts.auth.signinHint
                }
                path={(signin ? '/signup' : '/signin') + redirect}
                linkText={
                    signin ? InitTexts.auth.signup : InitTexts.auth.signin
                }
                headerStyle={signin ? 'signin' : 'signup'}
            >
                {!this.state.fromOutside && !this.state.email && (
                    <>
                        <RoomTitle>
                            {signin
                                ? 'Sign in and join the conversation'
                                : 'Sign up and join the conversation'}
                        </RoomTitle>
                        <RoomText>
                            {signin
                                ? 'We are excited to have you back!'
                                : 'Creating an account is free and easy'}
                        </RoomText>
                        <ButtonsWrapper
                            marginTop={42}
                            width={260}
                            marginBottom={91}
                        >
                            <GoogleButton
                                onClick={this.loginWithGoogle}
                                text={
                                    signin
                                        ? InitTexts.auth.signinGoogle
                                        : InitTexts.auth.signupGoogle
                                }
                                rounded={true}
                            />
                            <Separator marginTop={10} marginBottom={10} />
                            <EmailButton
                                onClick={this.loginWithEmail}
                                text={
                                    signin
                                        ? InitTexts.auth.signinEmail
                                        : InitTexts.auth.signupEmail
                                }
                                rounded={true}
                            />
                        </ButtonsWrapper>

                        {!signin && (
                            <RoomTerms>
                                By creating an account you are accepting our{' '}
                                <XLink href="https://openland.com/terms">
                                    Terms of Service
                                </XLink>{' '}
                                and{' '}
                                <XLink href="https://openland.com/privacy">
                                    Privacy Policy
                                </XLink>
                                .
                            </RoomTerms>
                        )}
                    </>
                )}

                {this.state.fromOutside &&
                    (this.state.emailSending || this.state.googleStarting) && (
                        <RoomLoader>
                            <XLoader loading={true} />
                        </RoomLoader>
                    )}

                {this.state.email && !this.state.emailSent && (
                    <div style={{ position: 'relative' }}>
                        {this.state.emailError !== '' && (
                            <div
                                style={{
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    right: 0,
                                }}
                            >
                                <XServiceMessage
                                    title={InitTexts.auth.emailInvalid}
                                />
                            </div>
                        )}
                        <RoomTitle>
                            {signin
                                ? InitTexts.auth.signinEmail
                                : InitTexts.auth.signupEmail}
                        </RoomTitle>
                        <ButtonsWrapper marginTop={40} width={280}>
                            <XInput
                                type="email"
                                autofocus={true}
                                size="large"
                                onChange={this.emailChanged}
                                value={this.state.emailValue}
                                placeholder={InitTexts.auth.emailPlaceholder}
                                onEnter={this.loginEmailStart}
                            />
                        </ButtonsWrapper>
                        <ButtonsWrapper
                            marginTop={20}
                            marginBottom={84}
                            width={280}
                        >
                            <XHorizontal>
                                <XButton
                                    onClick={this.loginEmailStart}
                                    style="primary"
                                    size="large"
                                    alignSelf="stretch"
                                    flexGrow={1}
                                    loading={this.state.emailSending}
                                    text={InitTexts.auth.continue}
                                />
                            </XHorizontal>
                        </ButtonsWrapper>
                    </div>
                )}

                {this.state.emailSent && (
                    <div style={{ position: 'relative' }}>
                        {this.state.codeError !== '' && (
                            <div
                                style={{
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    right: 0,
                                }}
                            >
                                <XServiceMessage
                                    title={InitTexts.auth.codeInvalid}
                                />
                            </div>
                        )}
                        <RoomTitle>Please, enter activation code</RoomTitle>
                        <ButtonsWrapper marginTop={40} width={280}>
                            <XInput
                                pattern="[0-9]*"
                                type="number"
                                autofocus={true}
                                size="large"
                                onChange={this.codeChanged}
                                value={this.state.codeValue}
                                placeholder={InitTexts.auth.codePlaceholder}
                                onEnter={this.loginCodeStart}
                            />
                        </ButtonsWrapper>
                        <ButtonsWrapper
                            marginTop={20}
                            marginBottom={84}
                            width={280}
                        >
                            <XHorizontal>
                                <XButton
                                    onClick={this.loginCodeStart}
                                    size="large"
                                    style="primary"
                                    alignSelf="stretch"
                                    flexGrow={1}
                                    loading={this.state.codeSending}
                                    text={InitTexts.auth.complete}
                                />
                            </XHorizontal>
                        </ButtonsWrapper>
                    </div>
                )}
            </RoomSignup>
        ) : (
            <SignContainer
                signin={signin}
                text={
                    signin
                        ? InitTexts.auth.signupHint
                        : InitTexts.auth.signinHint
                }
                path={(signin ? '/signup' : '/signin') + redirect}
                linkText={
                    signin ? InitTexts.auth.signup : InitTexts.auth.signin
                }
            >
                {!this.state.fromOutside && !this.state.email && (
                    <>
                        <Title>
                            {signin
                                ? InitTexts.auth.signinTitle
                                : InitTexts.auth.signupTitle}
                        </Title>
                        {signin && (
                            <Description>
                                {InitTexts.auth.signinSubtitle}
                            </Description>
                        )}
                        <ButtonsWrapper marginTop={52}>
                            <GoogleButton
                                onClick={this.loginWithGoogle}
                                text={
                                    signin
                                        ? InitTexts.auth.signinGoogle
                                        : InitTexts.auth.signupGoogle
                                }
                            />
                            <Separator />
                            <EmailButton
                                onClick={this.loginWithEmail}
                                text={
                                    signin
                                        ? InitTexts.auth.signinEmail
                                        : InitTexts.auth.signupEmail
                                }
                            />
                        </ButtonsWrapper>
                    </>
                )}

                {this.state.fromOutside &&
                    (this.state.emailSending || this.state.googleStarting) && (
                        <XLoader loading={!this.state.emailSent} />
                    )}

                {this.state.email && !this.state.emailSent && (
                    <>
                        <Title>
                            {signin
                                ? InitTexts.auth.signinEmailTitle
                                : InitTexts.auth.signupEmail}
                        </Title>
                        <SubTitle>
                            {InitTexts.auth.signinEmailSubtitle}
                        </SubTitle>
                        {this.state.emailError !== '' && (
                            <>
                                <XServiceMessage
                                    title={InitTexts.auth.emailInvalid}
                                />
                                <EmptyBlock />
                            </>
                        )}
                        <ButtonsWrapper>
                            <XInput
                                type="email"
                                size="large"
                                onChange={this.emailChanged}
                                value={this.state.emailValue}
                                placeholder={InitTexts.auth.emailPlaceholder}
                                onEnter={this.loginEmailStart}
                            />
                        </ButtonsWrapper>
                        <ButtonsWrapper marginTop={20}>
                            <XHorizontal>
                                <XButton
                                    onClick={this.loginEmailStart}
                                    style="primary"
                                    size="large"
                                    alignSelf="stretch"
                                    flexGrow={1}
                                    loading={this.state.emailSending}
                                    text={InitTexts.auth.continue}
                                />
                            </XHorizontal>
                        </ButtonsWrapper>
                    </>
                )}

                {this.state.emailSent && (
                    <>
                        <Title>Please, enter activation code</Title>
                        {this.state.codeError !== '' && (
                            <>
                                <XServiceMessage
                                    title={InitTexts.auth.codeInvalid}
                                />
                                <EmptyBlock />
                            </>
                        )}
                        <ButtonsWrapper>
                            <XInput
                                pattern="[0-9]*"
                                type="number"
                                size="large"
                                onChange={this.codeChanged}
                                value={this.state.codeValue}
                                placeholder={InitTexts.auth.codePlaceholder}
                                onEnter={this.loginCodeStart}
                            />
                        </ButtonsWrapper>
                        <ButtonsWrapper marginTop={20}>
                            <XHorizontal>
                                <XButton
                                    onClick={this.loginCodeStart}
                                    size="large"
                                    style="primary"
                                    alignSelf="stretch"
                                    flexGrow={1}
                                    loading={this.state.codeSending}
                                    text={InitTexts.auth.complete}
                                />
                            </XHorizontal>
                        </ButtonsWrapper>
                    </>
                )}
            </SignContainer>
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
