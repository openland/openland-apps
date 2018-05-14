import '../globals';
import * as React from 'react';
import Glamorous from 'glamorous';
import { withAppBase } from '../components/withAppBase';
import { withUserInfo } from '../components/UserInfo';
import { XHorizontal } from 'openland-x-layout/XHorizontal';
import { withRouter } from 'openland-x-routing/withRouter';
import { XPageRedirect } from 'openland-x-routing/XPageRedirect';
import { XLink, XLinkProps } from 'openland-x/XLink';
import { XButton } from 'openland-x/XButton';
import { XInput } from 'openland-x/XInput';
import { XIcon } from 'openland-x/XIcon';
import { XServiceMessage } from 'openland-x/XServiceMessage';
import { XDocumentHead } from 'openland-x-routing/XDocumentHead';
import { createAuth0Client } from 'openland-x-graphql/Auth0Client';
import { XTrack } from 'openland-x-analytics/XTrack';

const RootContainer = Glamorous.div({
    display: 'flex',
    height: '100vh'
});

const LeftContainer = Glamorous.div({
    backgroundColor: '#fff',
    boxShadow: '0px 0px 0px 1px rgba(0, 0, 0, 0.08)',
    height: '100%',
    flexBasis: '60%',
    paddingLeft: 32,
    paddingRight: 32,
    paddingTop: 22,
    paddingBottom: 22,
    display: 'flex',
    flexDirection: 'column',
    zIndex: 1,
    '@media(max-width: 950px)': {
        flexBasis: '100%',
    }
});

const RightContainer = Glamorous.div({
    display: 'flex',
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundImage: 'url(\'/static/img/bg-signin.png\')',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    flexBasis: '40%',
    height: '100%',
    zIndex: 0,
    '@media(max-width: 950px)': {
        display: 'none'
    },
    '&:before': {
        content: `''`,
        position: 'absolute',
        top: 0,
        left: 0,
        display: 'block',
        height: '100%',
        width: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.03)',
        zIndex: 0
    },
});

const Footer = Glamorous.div({
    fontSize: 14,
    lineHeight: 1.71,
    letterSpacing: 0.4,
    textAlign: 'center',
    color: '#1f3449',
    opacity: 0.4,
    marginTop: 'auto'
});

const LogoWrapper = Glamorous.div({
    display: 'flex',
    alignItems: 'center'
});

const Logo = Glamorous.div<{ width?: number, height?: number }>((props) => ({
    width: props.width ? props.width : 45,
    height: props.height ? props.height : 45,
    backgroundImage: 'url(\'/static/logo-purple.svg\')',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'contain',
}));

const LogoTitle = Glamorous.div({
    fontSize: 21.3,
    fontWeight: 600,
    letterSpacing: 0.7,
    color: '#1f3449',
    marginLeft: 8
});

const HeaderStyled = Glamorous.div({
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: 'auto',
    '@media(max-width: 600px)': {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    }
});

const SignupStyled = Glamorous.span({
    opacity: 0.7,
    fontSize: 16,
    lineHeight: 1.5,
    letterSpacing: 0.5,
    color: '#1f3449'
});

const SignupButton = Glamorous(XLink)({
    fontSize: 16,
    lineHeight: 1.5,
    letterSpacing: 0.5,
    color: '#5640d6',
    marginLeft: 5,
    '&:hover': {
        color: '#1f3449'
    }
});

const SignupContainer = Glamorous.div({
    display: 'flex',
    alignItems: 'center'
});

const Header = () => (
    <HeaderStyled>
        <LogoWrapper>
            <Logo />
            <LogoTitle>Openland</LogoTitle>
        </LogoWrapper>
        <SignupContainer>
            <SignupStyled>Don't have an Openland account? </SignupStyled>
            <SignupButton path="/signup">Sign Up</SignupButton>
        </SignupContainer>
    </HeaderStyled>
);

const MainContent = Glamorous.div({
    width: 390,
    margin: 'auto',
    '@media(max-width: 530px)': {
        width: 'auto',
        maxWidth: 390
    }
});

const MapCardContentStyle = Glamorous.div({
    maxWidth: 350,
    borderRadius: 5,
    backgroundColor: '#fff',
    boxShadow: '0px 0px 0px 1px rgba(0, 0, 0, 0.08)',
    paddingLeft: 42,
    paddingRight: 34,
    paddingTop: 42,
    paddingBottom: 42,
    zIndex: 1
});

const MapCardTitle = Glamorous.div({
    display: 'flex',
    alignItems: 'center',
    fontSize: 18,
    fontWeight: 500,
    lineHeight: 1.39,
    letterSpacing: 0.6,
    color: '#1f3449',
    marginBottom: 16,
    '& span': {
        marginLeft: 10,
    },
    '& i': {
        color: '#654bfa'
    },
    '&.filter': {
        '& > svg': {
            width: 22,
            height: 19,
            '& path': {
                transform: 'scale(0.048)'
            }
        }
    }
});

const MapCardText = Glamorous.div<{ marginBottom?: number }>((props) => ({
    opacity: 0.6,
    fontSize: 15,
    lineHeight: 1.47,
    letterSpacing: 0.5,
    color: '#1f3449',
    marginBottom: props.marginBottom
}));

const MapCardContent = () => (
    <MapCardContentStyle>
        <MapCardTitle className="filter">
            <svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="402.577px" height="402.577px">
                <g>
                    <path fill="#654bfa" d="M400.858,11.427c-3.241-7.421-8.85-11.132-16.854-11.136H18.564c-7.993,0-13.61,3.715-16.846,11.136 c-3.234,7.801-1.903,14.467,3.999,19.985l140.757,140.753v138.755c0,4.955,1.809,9.232,5.424,12.854l73.085,73.083 c3.429,3.614,7.71,5.428,12.851,5.428c2.282,0,4.66-0.479,7.135-1.43c7.426-3.238,11.14-8.851,11.14-16.845V172.166L396.861,31.413 C402.765,25.895,404.093,19.231,400.858,11.427z" />
                </g>
            </svg>
            <span>Prospecting</span>
        </MapCardTitle>
        <MapCardText marginBottom={42}>
            Explore land in your city with help of extensible search filters
        </MapCardText>
        <MapCardTitle>
            <XIcon icon="work" />
            <span>Deal Management</span>
        </MapCardTitle>
        <MapCardText marginBottom={42}>
            Invite internal and external collaborators to speed up land acquisition
        </MapCardText>
        <MapCardTitle>
            <Logo width={25} height={25} />
            <span>Collaboration</span>
        </MapCardTitle>
        <MapCardText>
            Organize and automate working with land lots
        </MapCardText>
    </MapCardContentStyle>
);

const SignContainer = (props: { children?: any }) => {
    return (
        <RootContainer>
            <LeftContainer>
                <Header />
                <MainContent>
                    {props.children}
                </MainContent>
                <Footer>© 2017-2018 Data Makes Perfect, Inc.</Footer>
            </LeftContainer>
            <RightContainer>
                <MapCardContent />
            </RightContainer>
        </RootContainer>
    );
};

const Title = Glamorous.div<{ marginBottom?: number }>((props) => ({
    fontSize: 18,
    fontWeight: 'bold',
    letterSpacing: 0.6,
    textAlign: 'center',
    color: '#1f3449',
    marginBottom: props.marginBottom ? props.marginBottom : 11
}));

const Description = Glamorous.div({
    opacity: 0.7,
    fontSize: 16,
    lineHeight: 1.5,
    letterSpacing: 0.5,
    textAlign: 'center',
    color: '#1f3449'
});

const ButtonsWrapper = Glamorous.div<{ marginTop?: number }>((props) => ({
    marginTop: props.marginTop
}));

const StyledButton = Glamorous(XLink)<{ primary?: boolean }>((props) => ({
    display: 'block',
    width: '100%',
    height: 48,
    transition: 'all .15s ease',
    backgroundColor: props.primary ? '#654bfa' : '#ffffff',
    color: props.primary ? '#fff' : '#334562',
    borderRadius: 6,
    border: props.primary ? 'solid 1px transparent' : 'solid 1px #dcdee4',
    '&:hover': {
        color: props.primary ? '#fff' : '#334562',
        backgroundColor: props.primary ? '#7159f9' : '#f3f3f5'
    },
    '&:focus': {
        boxShadow: '0 0 0 1px rgba(50,151,211,.2), 0 0 0 2px rgba(50,151,211,.25), 0 2px 5px 0 rgba(0,0,0,.1), 0 0 0 0 transparent, 0 0 0 0 transparent',
    },
    '&:active': {
        color: props.primary ? '#fff' : '#5640d6',
        backgroundColor: props.primary ? '#5640d6' : '#eeecfa'
    },
    '& span': {
        fontSize: 18,
        fontWeight: 500,
        letterSpacing: 0.6,
        lineHeight: 1.11
    },
    '& svg': {
        width: 20,
        height: 20,
        marginRight: 8
    },
    '&.email': {
        '& svg': {
            width: 23,
            height: 23,
            marginRight: 7
        },
    }
}));

const ButtonChildren = Glamorous.div({
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
});

interface ButtonProps extends XLinkProps {
    primary?: boolean;
    children: any;
}

const ImgButton = (props: ButtonProps) => {
    const { children, ...other } = props;
    return (
        <StyledButton {...other}>
            <ButtonChildren tabIndex={-1}>
                {props.children}
            </ButtonChildren>
        </StyledButton>
    );
};

const SeparatorStyle = Glamorous.div({
    width: '100%',
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 0.7,
    fontSize: 16,
    lineHeight: 1.5,
    letterSpacing: 0.5,
    color: '#1f3449',
    zIndex: 0,
    marginTop: 15,
    marginBottom: 15,
    '&:before': {
        content: `''`,
        position: 'absolute',
        left: 0,
        top: '50%',
        display: 'block',
        height: 1,
        width: '100%',
        backgroundColor: '#dcdee4',
        zIndex: 0
    },
    '& > div': {
        display: 'block',
        width: 35,
        backgroundColor: '#fff',
        textAlign: 'center',
        zIndex: 1
    }
});

const Separator = () => (
    <SeparatorStyle>
        <div>or</div>
    </SeparatorStyle>
);

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
                <SignContainer>
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
                                <span>Signin with Google</span>
                            </ImgButton>
                            <Separator />
                            <ImgButton onClick={this.loginWithEmail} className="email">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                    <g fill="none" fill-rule="evenodd">
                                        <path fill="#ADB5C0" d="M11.409 9.23c-1.038 0-1.665.89-1.665 2.373 0 1.482.616 2.372 1.665 2.372s1.676-.901 1.676-2.372c0-1.472-.638-2.373-1.676-2.373zM11.762 2C17.225 2 21 5.41 21 10.508c0 3.57-1.745 5.816-4.585 5.816-1.47 0-2.531-.627-2.84-1.722h-.193c-.468 1.14-1.369 1.734-2.68 1.734-2.372 0-3.946-1.916-3.946-4.813 0-2.771 1.517-4.642 3.763-4.642 1.243 0 2.236.605 2.692 1.62h.194V7.155h2.611v5.793c0 .799.354 1.29.992 1.29.993 0 1.643-1.301 1.643-3.456 0-4.14-2.726-6.775-6.923-6.775-4.368 0-7.379 3.068-7.379 7.561 0 4.608 3.091 7.38 7.847 7.38 1.06 0 2.144-.138 2.737-.32v2.03c-.821.217-1.882.342-2.977.342C6.06 21 2 17.282 2 11.511 2 5.878 6.003 2 11.762 2z" />
                                        <path d="M0 0h24v24H0z" />
                                    </g>
                                </svg>
                                <span>Signin with Email</span>
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