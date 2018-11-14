import * as React from 'react';
import Glamorous from 'glamorous';
import { XLink, XLinkProps } from 'openland-x/XLink';

const RootContainer = Glamorous.div({
    display: 'flex',
    height: '100vh',
    width: '100%'
});

const LeftContainer = Glamorous.div({
    backgroundColor: '#fff',
    boxShadow: '0px 0px 0px 1px rgba(0, 0, 0, 0.08)',
    height: '100%',
    flexBasis: '100%',
    paddingLeft: 32,
    paddingRight: 32,
    paddingTop: 19,
    paddingBottom: 22,
    display: 'flex',
    flexDirection: 'column',
    zIndex: 1,
    '@media(max-width: 950px)': {
        flexBasis: '100%',
    }
});

const Footer = Glamorous.div({
    marginTop: 'auto'
});

const FooterText = Glamorous.div({
    fontSize: 14,
    lineHeight: 1.71,
    letterSpacing: -0.4,
    fontWeight: 500,
    textAlign: 'center',
    color: '#334562',
    opacity: 0.4,
    '&:first-child': {
        marginBottom: 6
    }
});

const FooterLink = Glamorous(XLink)({
    display: 'inline-block',
    textDecoration: 'underline',
    fontSize: 14,
    lineHeight: 1.71,
    letterSpacing: -0.4,
    fontWeight: 500,
    textAlign: 'center',
    color: '#334562'
});

const Logo = Glamorous(XLink)({
    display: 'flex',
    alignItems: 'center',
    backgroundImage: 'url(\'/static/X/signup/logo-2.svg\')',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'contain',
    width: 145,
    height: 42
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
    color: '#1f3449',
    '@media (max-width: 400px)': {
        textAlign: 'center',
        marginBottom: 5
    }
});

const SignupButton = Glamorous(XLink)({
    fontSize: 16,
    lineHeight: 1.5,
    letterSpacing: 0.5,
    color: '#5640d6',
    marginLeft: 5,
    '&:hover': {
        color: '#1f3449'
    },
    '@media (max-width: 400px)': {
        marginLeft: 0
    }
});

const SignupContainer = Glamorous.div({
    display: 'flex',
    alignItems: 'center',
    paddingTop: 10,
    '@media (max-width: 400px)': {
        flexDirection: 'column'
    }
});

interface HeaderProps {
    text: string;
    path: string;
    linkText: string;
}

const Header = (props: HeaderProps) => (
    <HeaderStyled>
        <Logo href="https://openland.com" />
        <SignupContainer>
            <SignupStyled>{props.text}</SignupStyled>
            <SignupButton path={props.path}>{props.linkText}</SignupButton>
        </SignupContainer>
    </HeaderStyled>
);

const MainContent = Glamorous.div({
    width: 390,
    margin: 'auto',
    '@media(max-width: 530px)': {
        width: '100%',
        maxWidth: 390
    }
});

interface SignContainerProps extends HeaderProps {
    signin: boolean;
    children?: any;
}

export const SignContainer = (props: SignContainerProps) => {
    return (
        <RootContainer>
            <LeftContainer>
                <Header 
                    text={props.text} 
                    path={props.path} 
                    linkText={props.linkText}
                />
                <MainContent>
                    {props.children}
                </MainContent>
                <Footer>
                    {!props.signin && <FooterText>By creating an account you are accepting our <FooterLink href="https://openland.com/terms">Terms of Service</FooterLink> and <FooterLink href="https://openland.com/privacy">Privacy Policy</FooterLink>.</FooterText>}
                    <FooterText>© {new Date().getFullYear()} Data Makes Perfect Inc.</FooterText>
                </Footer>
            </LeftContainer>
        </RootContainer>
    );
};

export const Title = Glamorous.div<{ marginBottom?: number }>((props) => ({
    fontSize: 18,
    fontWeight: 'bold',
    letterSpacing: 0.6,
    textAlign: 'center',
    color: '#1f3449',
    marginBottom: props.marginBottom ? props.marginBottom : 11
}));

export const Description = Glamorous.div({
    opacity: 0.7,
    fontSize: 16,
    lineHeight: 1.5,
    letterSpacing: 0.5,
    textAlign: 'center',
    color: '#1f3449'
});

export const ButtonsWrapper = Glamorous.div<{ marginTop?: number, marginBottom?: number, width?: number }>((props) => ({
    marginTop: props.marginTop,
    marginBottom: props.marginBottom,
    width: props.width,
    marginLeft: props.width ? 'auto' : undefined,
    marginRight: props.width ? 'auto' : undefined,
}));

const StyledButton = Glamorous(XLink)<{ primary?: boolean, rounded?: boolean }>([
    (props) => ({
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
            marginRight: 8,
        },
        '&.email': {
            '& svg': {
                width: 23,
                height: 23,
                marginRight: 7
            },
            '& svg path': {
                transition: 'all .15s'
            },
            '&:active': {
                '& svg path:first-child': {
                    fill: '#5640d6'
                }
            }
        }
    }),
    (props) => props.rounded ? {
        height: 40,
        borderRadius: 20,
        backgroundColor: props.primary ? '#1790ff' : '#ffffff',
        color: props.primary ? '#ffffff' : '#334562',
        border: props.primary ? 'solid 1px transparent' : 'solid 1px #dcdee4',
        '&:hover': {
            color: props.primary ? '#ffffff' : '#334562',
            backgroundColor: props.primary ? '#45a6ff' : '#f3f3f5'
        },
        '&:active': {
            color: props.primary ? '#ffffff' : '#1790ff',
            backgroundColor: props.primary ? '#117fe4' : 'rgba(23, 144, 255, 0.05)'
        },
        '& span': {
            fontSize: 16,
            fontWeight: 500,
            letterSpacing: -0.4,
            lineHeight: '16px'
        },
        '& svg': {
            marginRight: 9,
            marginLeft: -2
        },
        '&.email': {
            '& svg': {
                margin: '1px 7px -1px -2px',
            },
            '&:active': {
                '& svg path:first-child': {
                    fill: '#1790ff'
                }
            }
        }
    } : {}
]);

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
    rounded?: boolean;
}

export const ImgButton = (props: ButtonProps) => {
    const { children, ...other } = props;
    return (
        <StyledButton {...other}>
            <ButtonChildren tabIndex={-1}>
                {props.children}
            </ButtonChildren>
        </StyledButton>
    );
};

const SeparatorStyle = Glamorous.div<{ marginTop?: number; marginBottom?: number}>((props) => ({
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
    marginTop: props.marginTop ? props.marginTop : 15,
    marginBottom: props.marginBottom ? props.marginBottom : 15,
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
}));

export const Separator = (props: { marginTop?: number; marginBottom?: number}) => (
    <SeparatorStyle {...props}>
        <div>or</div>
    </SeparatorStyle>
);

const RoomSignupWrapper = Glamorous.div({
    position: 'relative',
    background: 'rgba(0, 0, 0, 0.8) url(/static/X/signup/background-blur.jpg) no-repeat',
    backgroundSize: 'cover',
    height: '100vh',
    width: '100%',
    minWidth: 650
});

const RoomToggler = Glamorous.div({
    position: 'absolute',
    top: 28, right: 37,
    display: 'flex',
    color: '#ffffff'
});

const RoomTogglerText = Glamorous.div({
    fontSize: 14,
    lineHeight: '24px',
    letterSpacing: -0.15,
});

const RoomTogglerLink = Glamorous(XLink)({
    fontSize: 14,
    lineHeight: '24px',
    fontWeight: 600,
    letterSpacing: -0.4,
    marginLeft: 7,
    '&:hover': {
        opacity: 0.7,
        color: '#ffffff'
    },
});

const RoomSignupBox = Glamorous.div({
    background: '#ffffff',
    borderRadius: 10,
    overflow: 'hidden',
    width: 650,
    position: 'absolute',
    top: '50%', left: '50%',
    transform: 'translate(-50%, -50%)'
});

const RoomSignupHeader = Glamorous.div<{ headerStyle: 'signin' | 'signup' | 'profile' | 'organization' }>([
    {
        height: 130,
        position: 'relative',
        '&:before': {
            content: ' ',
            position: 'absolute',
            top: 0, right: 0, bottom: 0, left: 0
        }
    },
    (props) => props.headerStyle === 'signin' ? {
        backgroundImage: 'linear-gradient(103deg, #7f30fd, #ff801b)',
        '&:before': {
            background: 'url(/static/X/signup/header-sign.png) no-repeat',
            backgroundImage: '-webkit-image-set(url(/static/X/signup/header-sign.png) 1x, url(/static/X/signup/header-sign@2x.png) 2x)',
            backgroundSize: '100% auto',
        }
    } : {},
    (props) => props.headerStyle === 'signup' ? {
        backgroundImage: 'linear-gradient(103deg, #33c3ff, #1790ff)',
        '&:before': {
            background: 'url(/static/X/signup/header-sign.png) no-repeat',
            backgroundImage: '-webkit-image-set(url(/static/X/signup/header-sign.png) 1x, url(/static/X/signup/header-sign@2x.png) 2x)',
            backgroundSize: '100% auto',
        }
    } : {},
    (props) => props.headerStyle === 'profile' ? {
        backgroundImage: 'linear-gradient(102deg, #12ffe7, #8b17ff)',
        '&:before': {
            background: 'url(/static/X/signup/header-profile.png) no-repeat',
            backgroundImage: '-webkit-image-set(url(/static/X/signup/header-profile.png) 1x, url(/static/X/signup/header-profile@2x.png) 2x)',
            backgroundSize: '100% auto',
        }
    } : {},
    (props) => props.headerStyle === 'organization' ? {
        backgroundImage: 'linear-gradient(103deg, #337eff, #b317ff)',
        '&:before': {
            background: 'url(/static/X/signup/header-organization.png) no-repeat',
            backgroundImage: '-webkit-image-set(url(/static/X/signup/header-organization.png) 1x, url(/static/X/signup/header-organization@2x.png) 2x)',
            backgroundSize: '100% auto',
        }
    } : {},
]);

interface RoomSignupProps {
    headerStyle: 'signin' | 'signup' | 'profile' | 'organization';
    text?: string;
    path?: string;
    linkText?: string;
    children?: any;
}

export const RoomSignup = (props: RoomSignupProps) => {
    return (
        <RoomSignupWrapper>
            {props.text && (
                <RoomToggler>
                    <RoomTogglerText>{props.text}</RoomTogglerText>
                    <RoomTogglerLink path={props.path}>{props.linkText}</RoomTogglerLink>
                </RoomToggler>
            )}
            <RoomSignupBox>
                <RoomSignupHeader headerStyle={props.headerStyle} />
                {props.children}
            </RoomSignupBox>
        </RoomSignupWrapper>
    );
};

export const RoomLoader = Glamorous.div({
    height: 150,
    position: 'relative'
});

export const RoomTerms = Glamorous.div({
    textAlign: 'center',
    marginTop: -6,
    paddingBottom: 26,
    color: 'rgba(18, 30, 43, 0.35)',
    fontSize: 13,
    fontWeight: 500,
    lineHeight: '19px',
    letterSpacing: -0.35,

    '& a': {
        borderBottom: '1px solid rgba(18, 30, 43, 0.15)',
        transition: '.3s all ease',
        '&:hover': {
            borderBottomColor: 'rgba(18, 30, 43, 0.3)',
            color: 'rgba(18, 30, 43, 0.7)',
        }
    }
});

export const RoomTitle = Glamorous.div({
    textAlign: 'center',
    opacity: 0.9,
    fontSize: 26,
    fontWeight: 600,
    lineHeight: '31px',
    letterSpacing: 0.8,
    color: '#121e2b',
    paddingTop: 64,
    paddingBottom: 9
});

export const RoomText = Glamorous.div({
    textAlign: 'center',
    opacity: 0.7,
    fontSize: 16,
    lineHeight: '19px',
    letterSpacing: -0.15,
    color: '#121e2b'
});

export const GoogleButton = (props: {onClick: any; rounded?: boolean; text: string}) => {
    return (
        <ImgButton onClick={props.onClick} primary={true} rounded={props.rounded}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" version="1.1" width="50px" height="50px">
                <g id="surface1">
                    <path fill="#fff" d="M 12.546875 10.238281 L 12.546875 14.058594 L 17.988281 14.058594 C 17.277344 16.375 15.34375 18.03125 12.546875 18.03125 C 9.214844 18.03125 6.511719 15.332031 6.511719 12 C 6.511719 8.667969 9.214844 5.96875 12.546875 5.96875 C 14.042969 5.96875 15.410156 6.515625 16.464844 7.421875 L 19.28125 4.605469 C 17.503906 2.988281 15.140625 2 12.546875 2 C 7.019531 2 2.542969 6.476563 2.542969 12 C 2.542969 17.523438 7.019531 22 12.546875 22 C 20.941406 22 22.792969 14.148438 21.972656 10.253906 Z " />
                </g>
            </svg>
            <span>{props.text}</span>
        </ImgButton>
    );
};

export const EmailButton = (props: {onClick: any; rounded?: boolean; text: string}) => {
    return (
        <ImgButton onClick={props.onClick} className="email" rounded={props.rounded}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                <g fill="none" fillRule="evenodd">
                    <path fill="#ADB5C0" d="M11.409 9.23c-1.038 0-1.665.89-1.665 2.373 0 1.482.616 2.372 1.665 2.372s1.676-.901 1.676-2.372c0-1.472-.638-2.373-1.676-2.373zM11.762 2C17.225 2 21 5.41 21 10.508c0 3.57-1.745 5.816-4.585 5.816-1.47 0-2.531-.627-2.84-1.722h-.193c-.468 1.14-1.369 1.734-2.68 1.734-2.372 0-3.946-1.916-3.946-4.813 0-2.771 1.517-4.642 3.763-4.642 1.243 0 2.236.605 2.692 1.62h.194V7.155h2.611v5.793c0 .799.354 1.29.992 1.29.993 0 1.643-1.301 1.643-3.456 0-4.14-2.726-6.775-6.923-6.775-4.368 0-7.379 3.068-7.379 7.561 0 4.608 3.091 7.38 7.847 7.38 1.06 0 2.144-.138 2.737-.32v2.03c-.821.217-1.882.342-2.977.342C6.06 21 2 17.282 2 11.511 2 5.878 6.003 2 11.762 2z" />
                    <path d="M0 0h24v24H0z" />
                </g>
            </svg>
            <span>{props.text}</span>
        </ImgButton>
    );
};