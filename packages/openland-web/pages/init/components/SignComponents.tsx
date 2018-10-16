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
    paddingTop: 22,
    paddingBottom: 22,
    display: 'flex',
    flexDirection: 'column',
    zIndex: 1,
    '@media(max-width: 950px)': {
        flexBasis: '100%',
    }
});

// const RightContainer = Glamorous.div({
//     display: 'flex',
//     position: 'relative',
//     alignItems: 'center',
//     justifyContent: 'center',
//     backgroundImage: 'url(\'/static/img/bg-signin.png\')',
//     backgroundRepeat: 'no-repeat',
//     backgroundSize: 'cover',
//     backgroundPosition: 'center',
//     flexBasis: '40%',
//     height: '100%',
//     zIndex: 0,
//     '@media(max-width: 950px)': {
//         display: 'none'
//     },
//     '&:before': {
//         content: `''`,
//         position: 'absolute',
//         top: 0,
//         left: 0,
//         display: 'block',
//         height: '100%',
//         width: '100%',
//         backgroundColor: 'rgba(0, 0, 0, 0.03)',
//         zIndex: 0
//     },
// });

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
        <LogoWrapper>
            <XLink href="https://openland.com">
                <Logo />
            </XLink>
            <XLink href="https://openland.com">
                <LogoTitle>Openland</LogoTitle>
            </XLink>
        </LogoWrapper>
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

// const MapCardContentStyle = Glamorous.div({
//     maxWidth: 350,
//     borderRadius: 5,
//     backgroundColor: '#fff',
//     boxShadow: '0px 0px 0px 1px rgba(0, 0, 0, 0.08)',
//     paddingLeft: 42,
//     paddingRight: 34,
//     paddingTop: 42,
//     paddingBottom: 42,
//     zIndex: 1
// });

// const MapCardTitle = Glamorous.div({
//     display: 'flex',
//     alignItems: 'center',
//     fontSize: 18,
//     fontWeight: 500,
//     lineHeight: 1.39,
//     letterSpacing: 0.6,
//     color: '#1f3449',
//     marginBottom: 16,
//     '& span': {
//         marginLeft: 10,
//     },
//     '& i': {
//         color: '#654bfa',
//         width: 24
//     },
//     '&.map': {
//         '& > svg': {
//             marginLeft: 2,
//             width: 22,
//             height: 22
//         },
//         '& > span': {
//             marginLeft: 8
//         }
//     }
// });

// const MapCardText = Glamorous.div<{ marginBottom?: number }>((props) => ({
//     opacity: 0.6,
//     fontSize: 15,
//     lineHeight: 1.47,
//     letterSpacing: 0.5,
//     color: '#1f3449',
//     marginBottom: props.marginBottom
// }));

// const MapCardContent = () => (
//     <MapCardContentStyle>
//         <MapCardTitle className="map">
//             {/* <svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="402.577px" height="402.577px">
//                 <g>
//                     <path fill="#654bfa" d="M400.858,11.427c-3.241-7.421-8.85-11.132-16.854-11.136H18.564c-7.993,0-13.61,3.715-16.846,11.136 c-3.234,7.801-1.903,14.467,3.999,19.985l140.757,140.753v138.755c0,4.955,1.809,9.232,5.424,12.854l73.085,73.083 c3.429,3.614,7.71,5.428,12.851,5.428c2.282,0,4.66-0.479,7.135-1.43c7.426-3.238,11.14-8.851,11.14-16.845V172.166L396.861,31.413 C402.765,25.895,404.093,19.231,400.858,11.427z" />
//                 </g>
//             </svg> */}
//             <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg"  x="0px" y="0px" viewBox="0 0 296.999 296.999">
//                 <g>
//                     <path 
//                         fill="#654bfa" 
//                         d="M141.914,185.802c1.883,1.656,4.234,2.486,6.587,2.486c2.353,0,4.705-0.83,6.587-2.486
//                         c2.385-2.101,58.391-52.021,58.391-103.793c0-35.842-29.148-65.002-64.977-65.002c-35.83,0-64.979,29.16-64.979,65.002
//                         C83.521,133.781,139.529,183.701,141.914,185.802z M148.501,65.025c9.302,0,16.845,7.602,16.845,16.984
//                         c0,9.381-7.543,16.984-16.845,16.984c-9.305,0-16.847-7.604-16.847-16.984C131.654,72.627,139.196,65.025,148.501,65.025z"
//                     />
//                     <path 
//                         fill="#654bfa" 
//                         d="M273.357,185.773l-7.527-26.377c-1.222-4.281-5.133-7.232-9.583-7.232h-53.719c-1.942,2.887-3.991,5.785-6.158,8.699
//                         c-15.057,20.23-30.364,33.914-32.061,35.41c-4.37,3.848-9.983,5.967-15.808,5.967c-5.821,0-11.434-2.117-15.81-5.969
//                         c-1.695-1.494-17.004-15.18-32.06-35.408c-2.167-2.914-4.216-5.813-6.158-8.699h-53.72c-4.45,0-8.361,2.951-9.583,7.232
//                         l-8.971,31.436l200.529,36.73L273.357,185.773z"
//                     />
//                     <path 
//                         fill="#654bfa" 
//                         d="M296.617,267.291l-19.23-67.396l-95.412,80.098h105.06c3.127,0,6.072-1.467,7.955-3.963
//                         C296.873,273.533,297.474,270.297,296.617,267.291z"
//                     />
//                     <path 
//                         fill="#654bfa" 
//                         d="M48.793,209.888l-30.44-5.576L0.383,267.291c-0.857,3.006-0.256,6.242,1.628,8.738c1.883,2.496,4.828,3.963,7.955,3.963
//                         h38.827V209.888z"
//                     />
//                     <polygon fill="#654bfa" points="62.746,212.445 62.746,279.992 160.273,279.992 208.857,239.207 	"/>
//                 </g>
//             </svg>
//             <span>Prospecting</span>
//         </MapCardTitle>
//         <MapCardText marginBottom={42}>
//             Identify best-fit opportunity sites and connect with the owners
//         </MapCardText>
//         <MapCardTitle>
//             <XIcon icon="insert_drive_file" />
//             <span>Record keeping</span>
//         </MapCardTitle>
//         <MapCardText marginBottom={42}>
//             Organize all sites you track in a simple system of folders
//         </MapCardText>
//         <MapCardTitle>
//             {/* <Logo width={25} height={25} /> */}
//             <XIcon icon="supervisor_account" />
//             <span>Collaboration</span>
//         </MapCardTitle>
//         <MapCardText>
//             Selectively share deal information with internal and external stakeholders
//         </MapCardText>
//     </MapCardContentStyle>
// );

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
            {/* <RightContainer>
                <MapCardContent />
            </RightContainer> */}
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

const ChannelSignupWrapper = Glamorous.div({
    position: 'relative',
    background: 'rgba(0, 0, 0, 0.8) url(/static/X/signup/background-blur.jpg) no-repeat',
    backgroundSize: 'cover',
    height: '100vh',
    width: '100%'
});

const ChannelToggler = Glamorous.div({
    position: 'absolute',
    top: 28, right: 37,
    display: 'flex',
    color: '#ffffff'
});

const ChannelTogglerText = Glamorous.div({
    fontSize: 14,
    lineHeight: '24px',
    letterSpacing: -0.15,
});

const ChannelTogglerLink = Glamorous(XLink)({
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

const ChannelSignupBox = Glamorous.div({
    background: '#ffffff',
    borderRadius: 10,
    overflow: 'hidden',
    width: 650,
    position: 'absolute',
    top: '50%', left: '50%',
    transform: 'translate(-50%, -50%)'
});

const ChannelSignupHeader = Glamorous.div<{ headerStyle: 'signin' | 'signup' | 'profile' | 'organization' }>([
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

interface ChannelSignup {
    headerStyle: 'signin' | 'signup' | 'profile' | 'organization';
    text?: string;
    path?: string;
    linkText?: string;
    children?: any;
}

export const ChannelSignup = (props: ChannelSignup) => {
    return (
        <ChannelSignupWrapper>
            {props.text && (
                <ChannelToggler>
                    <ChannelTogglerText>{props.text}</ChannelTogglerText>
                    <ChannelTogglerLink path={props.path}>{props.linkText}</ChannelTogglerLink>
                </ChannelToggler>
            )}
            <ChannelSignupBox>
                <ChannelSignupHeader headerStyle={props.headerStyle} />
                {props.children}
            </ChannelSignupBox>
        </ChannelSignupWrapper>
    );
};

export const ChannelLoader = Glamorous.div({
    height: 150,
    position: 'relative'
});

export const ChannelTerms = Glamorous.div({
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

export const ChannelTitle = Glamorous.div({
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

export const ChannelText = Glamorous.div({
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