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
    ImgButton,
    Title,
    Separator,
    Description,
    ChannelSignup,
    ChannelLoader,
    ChannelTerms,
    ChannelTitle,
    ChannelText,
    GoogleButton,
    EmailButton
} from './components/SignComponents';
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
    flexShrink: 0
});

class SignInComponent extends React.Component<{ redirect?: string | null, channelView?: boolean } & XWithRouter, {

    googleStarting: boolean,

    email: boolean,
    emailValue: string,
    emailSending: boolean,
    emailError: string,

    emailSent: boolean,
    fromOutside: boolean,

    codeValue: string,
    codeSending: boolean,
    codeError: string,
}> {
    fireGoogle = async () => {
        Cookie.set('auth-type', 'google', { path: '/' });
        createAuth0Client().authorize({
            connection: 'google-oauth2',
            state: this.props.redirect ? this.props.redirect : 'none'
        });
    }

    fireEmail = async () => {
        Cookie.set('auth-type', 'email', { path: '/' });
        if (this.props.redirect) {
            Cookie.set('sign-redirect', this.props.redirect, { path: '/' });
        }
        createAuth0Client().passwordlessStart({ connection: 'email', send: 'link', email: this.state.emailValue }, (error, v) => {
            if (error) {
                this.setState({ emailSending: false, emailError: error.description!! });
            } else {
                this.setState({ emailSending: false, emailSent: true });
            }
        });
    }

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
    }

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
    }

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
    }

    emailChanged = (val: string) => {
        this.setState({ emailValue: val });
    }

    codeChanged = (val: string) => {
        this.setState({ codeValue: val });
    }

    loginEmailStart = (e?: React.SyntheticEvent<any>) => {
        if (e) {
            e.preventDefault();
        }
        this.setState({
            emailSending: true,
            emailError: '',
            emailSent: false
        });
        this.fireEmail();
    }

    loginCodeStart = async (e?: React.SyntheticEvent<any>) => {
        if (e) {
            e.preventDefault();
        }
        this.setState({ codeSending: true });
        createAuth0Client().passwordlessVerify({ connection: 'email', email: this.state.emailValue, verificationCode: this.state.codeValue }, (error, v) => {
            console.warn(error);
            if (error) {
                this.setState({ codeSending: false, codeError: error.description!! });
            } else {
                // Ignore. Should be redirect to completion page.
            }
        });
    }

    render() {
        const signin = this.props.router.path.endsWith('signin');
        return this.props.channelView ? (
            <ChannelSignup
                text={signin ? InitTexts.auth.signupHint : InitTexts.auth.signinHint}
                path={signin ? '/signup' : '/signin'}
                linkText={signin ? InitTexts.auth.signup : InitTexts.auth.signin}
                headerStyle={signin ? 'signin' : 'signup'}
            >
                {!this.state.fromOutside && !this.state.email && (<>
                    <ChannelTitle>{signin ? 'Sign in and join the conversation' : 'Sign up and join the conversation'}</ChannelTitle>
                    <ChannelText>{signin ? 'We are excited to have you back!' : 'Creating an account is free and easy'}</ChannelText>
                    <ButtonsWrapper marginTop={42} width={260} marginBottom={91}>
                        <GoogleButton
                            onClick={this.loginWithGoogle}
                            text={signin ? InitTexts.auth.signinGoogle : InitTexts.auth.signupGoogle}
                            rounded={true}
                        />
                        <Separator
                            marginTop={10}
                            marginBottom={10}
                        />
                        <EmailButton
                            onClick={this.loginWithEmail}
                            text={signin ? InitTexts.auth.signinEmail : InitTexts.auth.signupEmail}
                            rounded={true}
                        />
                    </ButtonsWrapper>

                    {!signin && <ChannelTerms>By creating an account you are accepting our <XLink href="https://openland.com/terms">Terms of Service</XLink> and <XLink href="https://openland.com/privacy">Privacy Policy</XLink>.</ChannelTerms>}
                </>)}

                {this.state.fromOutside && (this.state.emailSending || this.state.googleStarting) && (
                    <ChannelLoader>
                        <XLoader loading={true} />
                    </ChannelLoader>
                )}

                {this.state.email && !this.state.emailSent && (
                    <div style={{ position: 'relative' }}>
                        {this.state.emailError !== '' && (
                            <div style={{ position: 'absolute', top: 0, left: 0, right: 0 }}>
                                <XServiceMessage title={InitTexts.auth.emailInvalid} />
                            </div>
                        )}
                        <ChannelTitle>{signin ? InitTexts.auth.signinEmail : InitTexts.auth.signupEmail}</ChannelTitle>
                        <ButtonsWrapper marginTop={40} width={280}>
                            <XInput type="email" autofocus={true} size="large" onChange={this.emailChanged} value={this.state.emailValue} placeholder={InitTexts.auth.emailPlaceholder} onEnter={this.loginEmailStart} />
                        </ButtonsWrapper>
                        <ButtonsWrapper marginTop={20} marginBottom={84} width={280}>
                            <XHorizontal>
                                <XButton onClick={this.loginReset} style="ghost" size="large" alignSelf="stretch" flexGrow={1} text={InitTexts.auth.reset} />
                                <XButton onClick={this.loginEmailStart} style="primary" size="large" alignSelf="stretch" flexGrow={1} loading={this.state.emailSending} text={InitTexts.auth.next} />
                            </XHorizontal>
                        </ButtonsWrapper>
                    </div>
                )}

                {this.state.emailSent && (
                    <div style={{ position: 'relative' }}>
                        {this.state.codeError !== '' && (
                            <div style={{ position: 'absolute', top: 0, left: 0, right: 0 }}>
                                <XServiceMessage title={InitTexts.auth.codeInvalid} />
                            </div>
                        )}
                        <ChannelTitle>Please, enter activation code</ChannelTitle>
                        <ButtonsWrapper marginTop={40} width={280}>
                            <XInput pattern="[0-9]*" type="number" autofocus={true} size="large" onChange={this.codeChanged} value={this.state.codeValue} placeholder={InitTexts.auth.codePlaceholder} onEnter={this.loginCodeStart} />
                        </ButtonsWrapper>
                        <ButtonsWrapper marginTop={20} marginBottom={84} width={280}>
                            <XHorizontal>
                                <XButton onClick={this.loginReset} size="large" style="ghost" alignSelf="stretch" flexGrow={1} text={InitTexts.auth.reset} />
                                <XButton onClick={this.loginCodeStart} size="large" style="primary" alignSelf="stretch" flexGrow={1} loading={this.state.codeSending} text={InitTexts.auth.complete} />
                            </XHorizontal>
                        </ButtonsWrapper>
                    </div>
                )}
            </ChannelSignup>
        ) : (
                <SignContainer
                    signin={signin}
                    text={signin ? InitTexts.auth.signupHint : InitTexts.auth.signinHint}
                    path={signin ? '/signup' : '/signin'}
                    linkText={signin ? InitTexts.auth.signup : InitTexts.auth.signin}
                >
                    {!this.state.fromOutside && !this.state.email && (<>
                        <Title>{signin ? InitTexts.auth.signinTitle : InitTexts.auth.signupTitle}</Title>
                        {signin && <Description>{InitTexts.auth.signinSubtitle}</Description>}
                        <ButtonsWrapper marginTop={52}>
                            <GoogleButton
                                onClick={this.loginWithGoogle}
                                text={signin ? InitTexts.auth.signinGoogle : InitTexts.auth.signupGoogle}
                            />
                            <Separator />
                            <EmailButton
                                onClick={this.loginWithEmail}
                                text={signin ? InitTexts.auth.signinEmail : InitTexts.auth.signupEmail}
                            />
                        </ButtonsWrapper>
                    </>)}

                    {this.state.fromOutside && (this.state.emailSending || this.state.googleStarting) && (
                        <XLoader loading={!this.state.emailSent} />
                    )}

                    {this.state.email && !this.state.emailSent && (<>
                        <Title marginBottom={20}>{signin ? InitTexts.auth.signinEmail : InitTexts.auth.signupEmail}</Title>
                        {this.state.emailError !== '' && (<><XServiceMessage title={InitTexts.auth.emailInvalid} /><EmptyBlock /></>)}
                        <ButtonsWrapper>
                            <XInput type="email" size="large" onChange={this.emailChanged} value={this.state.emailValue} placeholder={InitTexts.auth.emailPlaceholder} onEnter={this.loginEmailStart} />
                        </ButtonsWrapper>
                        <ButtonsWrapper marginTop={20}>
                            <XHorizontal>
                                <XButton onClick={this.loginReset} style="ghost" size="large" alignSelf="stretch" flexGrow={1} text={InitTexts.auth.reset} />
                                <XButton onClick={this.loginEmailStart} style="primary" size="large" alignSelf="stretch" flexGrow={1} loading={this.state.emailSending} text={InitTexts.auth.next} />
                            </XHorizontal>
                        </ButtonsWrapper>
                    </>)}

                    {this.state.emailSent && (<>
                        <Title marginBottom={20}>Please, enter activation code</Title>
                        {this.state.codeError !== '' && (<><XServiceMessage title={InitTexts.auth.codeInvalid} /><EmptyBlock /></>)}
                        <ButtonsWrapper>
                            <XInput pattern="[0-9]*" type="number" size="large" onChange={this.codeChanged} value={this.state.codeValue} placeholder={InitTexts.auth.codePlaceholder} onEnter={this.loginCodeStart} />
                        </ButtonsWrapper>
                        <ButtonsWrapper marginTop={20}>
                            <XHorizontal>
                                <XButton onClick={this.loginReset} size="large" alignSelf="stretch" flexGrow={1} text={InitTexts.auth.reset} />
                                <XButton onClick={this.loginCodeStart} size="large" style="primary" alignSelf="stretch" flexGrow={1} loading={this.state.codeSending} text={InitTexts.auth.complete} />
                            </XHorizontal>
                        </ButtonsWrapper>
                    </>)}
                </SignContainer>
            );
    }
}

export default withAppBase('Sign In', withRouter((props) => {
    let redirect = props.router.query ? (props.router.query.redirect ? props.router.query.redirect : null) : null;
    const signin = props.router.path.endsWith('signin');
    const fromChannel = Cookie.get('x-openland-invite');

    return (
        <AuthRouter>
            <XDocumentHead title={signin ? InitTexts.auth.signinPageTitle : InitTexts.auth.signupPageTitle} titleSocial={InitTexts.socialPageTitle} />
            <XTrack event={signin ? 'View Signin' : 'View Signup'}>
                {canUseDOM && <SignInComponent redirect={redirect} router={props.router} channelView={fromChannel ? true : false} />}
            </XTrack>
        </AuthRouter>
    );
}));