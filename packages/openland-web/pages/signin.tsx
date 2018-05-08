import '../globals';
import * as React from 'react';
import Glamorous from 'glamorous';
import { MessagePage } from '../components/MessagePage';
import { withAppBase } from '../components/withAppBase';
import { withUserInfo } from '../components/UserInfo';
import { createAuth0Client } from '../utils/Auth0Client';
import { XHorizontal } from 'openland-x/XHorizontal';
import { XTrack } from '../components/X/XTrack';
import { withRouter } from 'openland-x-routing/withRouter';
import { XPageRedirect } from 'openland-x-routing/XPageRedirect';
import { XLink } from 'openland-x/XLink';
import { XButton } from 'openland-x/XButton';
import { XContent } from 'openland-x/XContent';
import { XInput } from 'openland-x/XInput';
import { XServiceMessage } from 'openland-x/XServiceMessage';
import { XDocumentHead } from 'openland-x-routing/XDocumentHead';

let Signup = Glamorous.span({
    opacity: 0.7
});

let SignupContainer = Glamorous.div({
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 8,
    marginBottom: 8
});

let Title = Glamorous.div({
    fontSize: 20,
    lineHeight: 1.6,
    fontWeight: 600,
    color: '#182642',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 24,
    marginBottom: 16
});

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
                <MessagePage>
                    {!this.state.email && (<>
                        <Title>Sign in to Openland</Title>
                        <XContent>
                            <XButton onClick={this.loginWithGoogle} style="primary" text="Signin with Google"/>
                        </XContent>
                        <XContent>
                            <XButton onClick={this.loginWithEmail} style="default" text="Signin with Email"/>
                        </XContent>
                    </>)}
                    {this.state.email && !this.state.emailSent && (<>
                        <Title>Sign in with Email</Title>
                        {this.state.emailError !== '' && <XServiceMessage title={this.state.emailError} />}
                        <XContent>
                            <XInput onChange={this.emailChanged} value={this.state.emailValue} placeholder="Your work email" />
                        </XContent>
                        <XContent>
                            <XHorizontal>
                                <XButton onClick={this.loginReset} alignSelf="stretch" flexGrow={1} text="Reset"/>
                                <XButton onClick={this.loginEmailStart} style="primary" alignSelf="stretch" flexGrow={1} loading={this.state.codeSending} text="Next"/>
                            </XHorizontal>
                        </XContent>
                    </>)}
                    {this.state.emailSent && (<>
                        <Title>Please, enter activation code</Title>
                        {this.state.codeError !== '' && <XServiceMessage title={this.state.codeError} />}
                        <XContent>
                            <XInput onChange={this.codeChanged} value={this.state.codeValue} placeholder="XXXXXX" />
                        </XContent>
                        <XContent>
                            <XHorizontal>
                                <XButton onClick={this.loginReset} alignSelf="stretch" flexGrow={1} text="Reset"/>
                                <XButton onClick={this.loginCodeStart} style="primary" alignSelf="stretch" flexGrow={1} loading={this.state.codeSending} text="Complete"/>
                            </XHorizontal>
                        </XContent>
                    </>)}
                    <XContent>
                        <SignupContainer><Signup>Don't have an Openland account? </Signup>{'\u00A0'}<XLink path="/signup">Sign Up</XLink></SignupContainer>
                    </XContent>
                </MessagePage>
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