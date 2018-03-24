import '../globals';
import * as React from 'react';
import Glamorous from 'glamorous';
import { XHead } from '../components/X/XHead';
import { XLink } from '../components/X/XLink';
import { MessagePage } from '../components/MessagePage';
import { XCard } from '../components/X/XCard';
import { XButton } from '../components/X/XButton';
import { RedirectComponent } from '../components/routing/RedirectComponent';
import { withRouter } from '../components/withRouter';
import { withAppBase } from '../components/withAppBase';
import { withUserInfo } from '../components/UserInfo';
import { createAuth0Client } from '../utils/Auth0Client';
import { XHorizontal } from '../components/X/XHorizontal';
import { XInput } from '../components/X/XInput';

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

    emailChanged = (e: React.SyntheticEvent<any>) => {
        let val = (e.target as any).value as string;
        this.setState({ emailValue: val });
    }

    codeChanged = (e: React.SyntheticEvent<any>) => {
        let val = (e.target as any).value as string;
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
                        <XCard.Content>
                            <XButton onClick={this.loginWithGoogle} style="dark" bounce={true}>Signin with Google</XButton>
                        </XCard.Content>
                        <XCard.Content>
                            <XButton onClick={this.loginWithEmail} style="normal" bounce={true}>Signin with Email</XButton>
                        </XCard.Content>
                    </>)}
                    {this.state.email && !this.state.emailSent && (<>
                        <Title>Sign in with Email</Title>
                        {this.state.emailError !== '' && <XCard.Warning title={this.state.emailError} />}
                        <XCard.Content>
                            <XInput onChange={this.emailChanged} value={this.state.emailValue} placeholder="Your work email" />
                        </XCard.Content>
                        <XCard.Content>
                            <XHorizontal>
                                <XButton onClick={this.loginReset} bounce={true} alignSelf="stretch" flexGrow={1}>Reset</XButton>
                                <XButton onClick={this.loginEmailStart} style="dark" bounce={true} alignSelf="stretch" flexGrow={1} loading={this.state.codeSending}>Next</XButton>
                            </XHorizontal>
                        </XCard.Content>
                    </>)}
                    {this.state.emailSent && (<>
                        <Title>Please, enter activation code</Title>
                        {this.state.codeError !== '' && <XCard.Warning title={this.state.codeError} />}
                        <XCard.Content>
                            <XInput onChange={this.codeChanged} value={this.state.codeValue} placeholder="XXXXXX" />
                        </XCard.Content>
                        <XCard.Content>
                            <XHorizontal>
                                <XButton onClick={this.loginReset} bounce={true} alignSelf="stretch" flexGrow={1}>Reset</XButton>
                                <XButton onClick={this.loginCodeStart} style="dark" bounce={true} alignSelf="stretch" flexGrow={1} loading={this.state.codeSending}>Complete</XButton>
                            </XHorizontal>
                        </XCard.Content>
                    </>)}
                    <XCard.Content>
                        <SignupContainer><Signup>Don't have an Openland account? </Signup>{'\u00A0'}<XLink path="/signup">Sign Up</XLink></SignupContainer>
                    </XCard.Content>
                </MessagePage>
            </>
        );
    }
}

export default withAppBase(withRouter(withUserInfo((props) => {

    // Do not edit without reason!
    if (props.isLoggedIn) {
        if (props.isBlocked) {
            return <RedirectComponent path="/suspended" />;
        } else if (props.isCompleted) {
            return <RedirectComponent path="/" />;
        } else if (!props.isActivated) {
            return <RedirectComponent path="/activation" />;
        } else {
            return <RedirectComponent path="/need_info" />;
        }
    }

    let redirect = props.router.query ? (props.router.query.r ? props.router.query.r : null) : null;
    return (
        <>
            <XHead title="Sign in" titleSocial="Openland - land acquisition platfom" />
            <SignInComponent redirect={redirect} />
        </>
    );
})));