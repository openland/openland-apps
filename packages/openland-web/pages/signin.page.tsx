import '../globals';
import * as React from 'react';
import { withAppBase } from '../components/withAppBase';
import { withUserInfo } from '../components/UserInfo';
import { XHorizontal } from 'openland-x-layout/XHorizontal';
import { withRouter } from 'openland-x-routing/withRouter';
import { XPageRedirect } from 'openland-x-routing/XPageRedirect';
import { XButton } from 'openland-x/XButton';
import { XInput } from 'openland-x/XInput';
import { XServiceMessage } from 'openland-x/XServiceMessage';
import { XDocumentHead } from 'openland-x-routing/XDocumentHead';
import { createAuth0Client } from 'openland-x-graphql/Auth0Client';
import { XTrack } from 'openland-x-analytics/XTrack';
import { 
    SignContainer,
    ButtonsWrapper,
    ImgButton,
    Title,
    Description,
    Separator
} from '../components/SignComponents';

class SignInComponent extends React.Component<{ redirect?: string | null }, {

    email: boolean,
    emailValue: string,
    emailSending: boolean,
    emailError: string,

    emailSent: boolean,

    codeValue: string,
    codeSending: boolean,
    codeError: string,
}> {

    constructor(props: { redirect?: string | null }) {
        super(props);
        this.state = {
            email: false,
            emailValue: '',
            emailSending: false,
            emailError: '',
            emailSent: false,

            codeValue: '',
            codeSending: false,
            codeError: '',
        };
    }

    loginWithGoogle = (e: React.SyntheticEvent<any>) => {
        e.preventDefault();
        createAuth0Client().authorize({ connection: 'google-oauth2' });
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
        });
    }

    emailChanged = (val: string) => {
        this.setState({ emailValue: val });
    }

    codeChanged = (val: string) => {
        this.setState({ codeValue: val });
    }

    loginEmailStart = (e: React.SyntheticEvent<any>) => {
        e.preventDefault();
        this.setState({ emailSending: true, emailError: '', emailSent: false });
        createAuth0Client().passwordlessStart({ connection: 'email', send: 'code', email: this.state.emailValue }, (error, v) => {
            if (error) {
                this.setState({ emailSending: false, emailError: error.description!! });
            } else {
                this.setState({ emailSending: false, emailSent: true });
            }
        });
    }

    loginCodeStart = (e: React.SyntheticEvent<any>) => {
        e.preventDefault();
        this.setState({ codeSending: true });
        createAuth0Client().passwordlessVerify({ connection: 'email', email: this.state.emailValue, verificationCode: this.state.codeValue }, (error, v) => {
            if (error) {
                this.setState({ codeSending: false, codeError: error.description!! });
            } else {
                // Ignore. Should be redirect to completion page.
            }
        });
    }

    render() {
        return (
            <>
                <SignContainer
                    text="Don't have an Openland account? "
                    path="/signup"
                    linkText="Sign Up"
                >
                    {!this.state.email && (<>
                        <Title>Sign in for Openland</Title>
                        <Description>Get your free account and start exploring</Description>
                        <ButtonsWrapper marginTop={52}>
                            <ImgButton onClick={this.loginWithGoogle} primary={true}>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" version="1.1" width="50px" height="50px">
                                    <g id="surface1">
                                        <path fill="#fff" d="M 12.546875 10.238281 L 12.546875 14.058594 L 17.988281 14.058594 C 17.277344 16.375 15.34375 18.03125 12.546875 18.03125 C 9.214844 18.03125 6.511719 15.332031 6.511719 12 C 6.511719 8.667969 9.214844 5.96875 12.546875 5.96875 C 14.042969 5.96875 15.410156 6.515625 16.464844 7.421875 L 19.28125 4.605469 C 17.503906 2.988281 15.140625 2 12.546875 2 C 7.019531 2 2.542969 6.476563 2.542969 12 C 2.542969 17.523438 7.019531 22 12.546875 22 C 20.941406 22 22.792969 14.148438 21.972656 10.253906 Z " />
                                    </g>
                                </svg>
                                <span>Sign in with Google</span>
                            </ImgButton>
                            <Separator />
                            <ImgButton onClick={this.loginWithEmail} className="email">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                    <g fill="none" fill-rule="evenodd">
                                        <path fill="#ADB5C0" d="M11.409 9.23c-1.038 0-1.665.89-1.665 2.373 0 1.482.616 2.372 1.665 2.372s1.676-.901 1.676-2.372c0-1.472-.638-2.373-1.676-2.373zM11.762 2C17.225 2 21 5.41 21 10.508c0 3.57-1.745 5.816-4.585 5.816-1.47 0-2.531-.627-2.84-1.722h-.193c-.468 1.14-1.369 1.734-2.68 1.734-2.372 0-3.946-1.916-3.946-4.813 0-2.771 1.517-4.642 3.763-4.642 1.243 0 2.236.605 2.692 1.62h.194V7.155h2.611v5.793c0 .799.354 1.29.992 1.29.993 0 1.643-1.301 1.643-3.456 0-4.14-2.726-6.775-6.923-6.775-4.368 0-7.379 3.068-7.379 7.561 0 4.608 3.091 7.38 7.847 7.38 1.06 0 2.144-.138 2.737-.32v2.03c-.821.217-1.882.342-2.977.342C6.06 21 2 17.282 2 11.511 2 5.878 6.003 2 11.762 2z" />
                                        <path d="M0 0h24v24H0z" />
                                    </g>
                                </svg>
                                <span>Sign in with Email</span>
                            </ImgButton>
                        </ButtonsWrapper>
                    </>)}

                    {this.state.email && !this.state.emailSent && (<>
                        <Title marginBottom={20}>Sign in with Email</Title>
                        {this.state.emailError !== '' && <XServiceMessage title={this.state.emailError} />}
                        <ButtonsWrapper>
                            <XInput onChange={this.emailChanged} value={this.state.emailValue} placeholder="Your work email" />
                        </ButtonsWrapper>
                        <ButtonsWrapper marginTop={20}>
                            <XHorizontal>
                                <XButton onClick={this.loginReset} style="ghost" size="medium" alignSelf="stretch" flexGrow={1} text="Reset" />
                                <XButton onClick={this.loginEmailStart} style="primary" size="medium" alignSelf="stretch" flexGrow={1} loading={this.state.codeSending} text="Next" />
                            </XHorizontal>
                        </ButtonsWrapper>
                    </>)}

                    {this.state.emailSent && (<>
                        <Title marginBottom={20}>Please, enter activation code</Title>
                        {this.state.codeError !== '' && <XServiceMessage title={this.state.codeError} />}
                        <ButtonsWrapper>
                            <XInput onChange={this.codeChanged} value={this.state.codeValue} placeholder="XXXXXX" />
                        </ButtonsWrapper>
                        <ButtonsWrapper marginTop={20}>
                            <XHorizontal>
                                <XButton onClick={this.loginReset} size="medium" alignSelf="stretch" flexGrow={1} text="Reset" />
                                <XButton onClick={this.loginCodeStart} size="medium" style="primary" alignSelf="stretch" flexGrow={1} loading={this.state.codeSending} text="Complete" />
                            </XHorizontal>
                        </ButtonsWrapper>
                    </>)}
                </SignContainer>
            </>
        );
    }
}

export default withAppBase(withRouter(withUserInfo((props) => {

    // Do not edit without reason!
    if (props.isLoggedIn) {
        if (props.isBlocked) {
            return <XPageRedirect path="/suspended" />;
        } else if (props.isCompleted) {
            return <XPageRedirect path="/" />;
        } else if (!props.isActivated) {
            return <XPageRedirect path="/activation" />;
        } else {
            return <XPageRedirect path="/need_info" />;
        }
    }

    let redirect = props.router.query ? (props.router.query.r ? props.router.query.r : null) : null;
    return (
        <>
            <XDocumentHead title="Sign in" titleSocial="Openland - land acquisition platfom" />
            <XTrack event="View Signin">
                <SignInComponent redirect={redirect} />
            </XTrack>
        </>
    );
})));