import * as React from 'react';
import Glamorous from 'glamorous';
import { XLink, XLinkProps } from 'openland-x/XLink';
import { XHorizontal } from 'openland-x-layout/XHorizontal';
import { XVertical } from 'openland-x-layout/XVertical';
import { XButton } from 'openland-x/XButton';
import { XView } from 'react-mental';
import { XInput } from 'openland-x/XInput';
import { XSelect } from 'openland-x/XSelect';
import { InitTexts } from '../_text';
import { XForm } from 'openland-x-forms/XForm2';
import { XPopper } from 'openland-x/XPopper';
import { XFormSubmit } from 'openland-x-forms/XFormSubmit';
import { XFormLoadingContent } from 'openland-x-forms/XFormLoadingContent';
import { XFormError } from 'openland-x-forms/XFormError';
import { XFormField2 } from 'openland-x-forms/XFormField2';
import IcInfo from 'openland-icons/ic-info.svg';
import IcAdd from 'openland-icons/ic-add-medium-active.svg';
import { XAvatarUpload } from 'openland-x/XAvatarUpload';
import { XStoreContext } from 'openland-y-store/XStoreContext';
import { XAvatar } from 'openland-x/XAvatar';
import { XText } from 'openland-x/XText';
import { canUseDOM } from 'openland-y-utils/canUseDOM';

function validateEmail(email: string) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

export const SubTitle = Glamorous.div({
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'normal',
    fontStyle: 'normal',
    fontStretch: 'normal',
    lineHeight: 1.5,
    color: '#000',
    marginTop: 0,
    letterSpacing: -0.1,
});

interface ButtonProps extends XLinkProps {
    primary?: boolean;
    children: any;
    rounded?: boolean;
    dataTestId?: string;
}

const ErrorText = Glamorous.div({
    fontSize: '12px',
    color: '#d75454',
    marginLeft: '17px',
});

const StyledButton = Glamorous(XLink)<{ primary?: boolean; rounded?: boolean }>([
    props => ({
        display: 'block',
        width: '100%',
        height: 48,
        transition: 'all .15s ease',
        backgroundColor: props.primary ? '#1790ff' : '#ffffff',
        color: props.primary ? '#fff' : '#334562',
        borderRadius: props.rounded ? 24 : 6,
        border: props.primary ? 'solid 1px transparent' : 'solid 1px #dcdee4',
        '&:hover': {
            textDecoration: 'none',
            color: props.primary ? '#fff' : '#334562',
            backgroundColor: props.primary ? '#7159f9' : '#f3f3f5',
        },
        '&:focus': {
            boxShadow:
                '0 0 0 1px rgba(50,151,211,.2), 0 0 0 2px rgba(50,151,211,.25), 0 2px 5px 0 rgba(0,0,0,.1), 0 0 0 0 transparent, 0 0 0 0 transparent',
        },
        '&:active': {
            color: props.primary ? '#fff' : '#1790ff',
            backgroundColor: props.primary ? '#1790ff' : '#eeecfa',
        },
        '& span': {
            fontSize: 18,
            fontWeight: 500,
            letterSpacing: 0.6,
            lineHeight: 1.11,
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
                marginRight: 7,
            },
            '& svg path': {
                transition: 'all .15s',
            },
            '&:active': {
                '& svg path:first-child': {
                    fill: '#1790ff',
                },
            },
        },
    }),
    props =>
        props.rounded
            ? {
                  height: 44,
                  borderRadius: 20,
                  backgroundColor: props.primary ? '#1790ff' : '#ffffff',
                  color: props.primary ? '#ffffff !important' : '#334562 !important',
                  border: props.primary ? 'solid 1px transparent' : 'solid 1px #dcdee4',
                  '&:hover': {
                      color: props.primary ? '#ffffff' : '#334562',
                      backgroundColor: props.primary ? '#45a6ff' : '#f3f3f5',
                  },
                  '&:active': {
                      color: props.primary ? '#ffffff' : '#1790ff !important',
                      backgroundColor: props.primary ? '#117fe4' : 'rgba(23, 144, 255, 0.05)',
                  },
                  '& span': {
                      fontSize: 16,
                      fontWeight: 500,
                      letterSpacing: -0.4,
                      lineHeight: '16px',
                  },
                  '& svg': {
                      marginRight: 9,
                      marginLeft: -2,
                  },
                  '&.email': {
                      '& svg': {
                          margin: '1px 7px -1px -2px',
                      },
                      '&:active': {
                          '& svg path:first-child': {
                              fill: '#1790ff',
                          },
                      },
                  },
              }
            : {},
]);

const ButtonChildren = Glamorous.div({
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
});

const ImgButton = (props: ButtonProps) => {
    const { children, ...other } = props;
    return (
        <StyledButton {...other}>
            <ButtonChildren tabIndex={-1}>{props.children}</ButtonChildren>
        </StyledButton>
    );
};

const SignInInviteTitle = Glamorous.div({
    textAlign: 'center',
    opacity: 0.9,
    fontSize: 32,
    fontWeight: 600,
    lineHeight: '31px',
    letterSpacing: 0.8,
    color: '#121e2b',
    paddingTop: 24,
    paddingBottom: 26,
});

const Title = Glamorous.div<{ roomView: boolean }>(({ roomView }) => {
    return {
        textAlign: 'center',
        opacity: 0.9,
        fontSize: 26,
        fontWeight: 600,
        lineHeight: '31px',
        letterSpacing: 0.8,
        color: '#121e2b',
        paddingTop: roomView ? 64 : 0,
        paddingBottom: 9,
        '@media(max-width: 1200px)': {
            paddingTop: 40,
        },
        '@media(max-width: 500px)': {
            paddingTop: roomView ? 25 : 0,
        },
    };
});

// WebSignUpContainer start

const RootContainer = Glamorous.div({
    display: 'flex',
    width: '100%',
});

const RootContainerContentStyles = Glamorous.div<{ mainPage?: boolean; iosChrome: boolean }>([
    {
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
        },
        '@media(max-width: 700px)': {
            paddingLeft: 20,
            paddingRight: 20,
            paddingTop: 15,
            paddingBottom: 15,
        },
    },
    props =>
        props.mainPage || props.iosChrome
            ? {}
            : {
                  '@media(max-width: 700px)': {
                      '&:focus-within': {
                          '& .header, & .title, & .subtitle': {
                              display: 'none',
                          },
                          '& .content': {
                              justifyContent: 'start',
                          },
                      },
                  },
              },
]);

const RootContainerContent = (props: { children: any; mainPage?: boolean }) => {
    let IosChromeChecker = false;

    if (canUseDOM) {
        if (navigator.userAgent.match('CriOS') && navigator.userAgent.match('iPhone')) {
            IosChromeChecker = true;
        }
    }

    return (
        <RootContainerContentStyles mainPage={props.mainPage} iosChrome={IosChromeChecker}>
            {props.children}
        </RootContainerContentStyles>
    );
};

const Footer = Glamorous.div({
    marginTop: 'auto',
    flexShrink: 0,
});

const FooterText = Glamorous.div({
    fontSize: 14,
    lineHeight: 1.71,
    letterSpacing: -0.4,
    fontWeight: 500,
    textAlign: 'center',
    color: '#334562',
    opacity: 0.4,
});

const FooterLink = Glamorous(XLink)({
    display: 'inline-block',
    textDecoration: 'underline',
    fontSize: 14,
    lineHeight: 1.71,
    letterSpacing: -0.4,
    fontWeight: 500,
    textAlign: 'center',
    color: '#334562',
    '&:hover': {
        textDecoration: 'none',
    },
});

const Logo = Glamorous(XLink)({
    display: 'flex',
    alignItems: 'center',
    backgroundImage: "url('/static/X/signup/logo-2.svg')",
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'contain',
    width: 145,
    height: 42,
    flexShrink: 0,
});

const HeaderStyled = Glamorous.div({
    display: 'flex',
    justifyContent: 'space-between',
    flexShrink: 0,
    '@media(max-width: 600px)': {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
});

const SignupStyled = Glamorous.span({
    opacity: 0.7,
    fontSize: 16,
    lineHeight: 1.5,
    letterSpacing: 0.5,
    color: '#1f3449',
    '@media (max-width: 500px)': {
        textAlign: 'center',
        marginBottom: 5,
    },
});

const SignupButton = Glamorous(XLink)({
    fontSize: 16,
    lineHeight: 1.5,
    letterSpacing: 0.5,
    color: '#1790ff',
    marginLeft: 5,
    '&:hover': {
        color: '#1f3449',
        textDecoration: 'none',
    },
    '@media (max-width: 500px)': {
        marginLeft: 0,
    },
});

const SignupContainer = Glamorous.div({
    display: 'flex',
    alignItems: 'center',
    paddingTop: 10,
    '@media (max-width: 500px)': {
        flexDirection: 'column',
    },
});

interface HeaderProps {
    text?: string;
    path?: string;
    linkText?: string;
    className?: string;
}

const Header = (props: HeaderProps) => (
    <HeaderStyled className={props.className}>
        <Logo href="https://openland.com" />
        <SignupContainer>
            <SignupStyled>{props.text}</SignupStyled>
            <SignupButton path={props.path}>{props.linkText}</SignupButton>
        </SignupContainer>
    </HeaderStyled>
);

export type PageModeT =
    | 'ActivationCode'
    | 'CreateFromEmail'
    | 'Loading'
    | 'AuthMechanism'
    | 'CreateOrganization'
    | 'CreateProfile'
    | 'SignInInvite';

interface SignContainerProps extends HeaderProps {
    pageMode: PageModeT;
    showTerms?: boolean;
    signin?: boolean;
    children?: any;
    mainPage?: boolean;
}

const MainContent = Glamorous.div<{ pageMode: PageModeT }>(({ pageMode }) => {
    return {
        width: 522,
        display: 'flex',
        flexGrow: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        ...(pageMode === 'CreateProfile'
            ? { margin: 'auto' }
            : {
                  position: 'relative',
                  marginRight: 'auto',
                  marginLeft: 'auto',
                  height: '100%',
              }),
        '@media(max-width: 530px)': {
            width: '100%',
            maxWidth: 442,
        },
    };
});

export const WebSignUpContainer = (props: SignContainerProps) => (
    <RootContainer>
        <RootContainerContent mainPage={props.mainPage}>
            <Header
                text={props.text}
                path={props.path}
                linkText={props.linkText}
                className="header"
            />
            <MainContent pageMode={props.pageMode} className="content">
                {props.children}
            </MainContent>
            <Footer>
                {props.showTerms ? (
                    <FooterText>
                        By creating an account you are accepting our{' '}
                        <FooterLink href="https://openland.com/terms">Terms of Service</FooterLink>{' '}
                        and{' '}
                        <FooterLink href="https://openland.com/privacy">Privacy Policy</FooterLink>.
                    </FooterText>
                ) : (
                    <FooterText>© {new Date().getFullYear()} Openland</FooterText>
                )}
            </Footer>
        </RootContainerContent>
    </RootContainer>
);

// WebSignUpContainer end
// RoomSignup start

const ButtonsWrapper = Glamorous.div<{
    marginTop?: number;
    marginBottom?: number;
    width?: number | string;
}>(props => ({
    marginTop: props.marginTop,
    marginBottom: props.marginBottom,
    maxWidth: props.width,
    marginLeft: props.width ? 'auto' : undefined,
    marginRight: props.width ? 'auto' : undefined,
    '@media(max-width: 1300px)': {
        marginBottom: props.marginBottom !== undefined ? 40 : undefined,
    },
    '@media(max-width: 500px)': {
        marginBottom: props.marginBottom !== undefined ? 25 : undefined,
    },
}));

const RoomSignupWrapper = Glamorous.div({
    position: 'relative',
    background:
        'rgba(255, 255, 255, 0.8) url(/static/X/signup/background-blur-light.jpg) no-repeat',
    backgroundSize: 'cover',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 20,
    paddingBottom: 20,
});

const RoomToggler = Glamorous.div({
    alignSelf: 'flex-end',
    display: 'flex',
    color: '#ffffff',
    marginBottom: -24,
    '@media(max-height: 600px)': {
        marginBottom: 20,
    },
});

const RoomTogglerText = Glamorous.div({
    fontSize: 14,
    lineHeight: '24px',
    letterSpacing: -0.15,
    color: '#000000',
});

const RoomTogglerLink = Glamorous(XLink)({
    fontSize: 14,
    lineHeight: '24px',
    fontWeight: 600,
    letterSpacing: -0.4,
    color: '#000000',
    marginLeft: 7,
    '&:hover': {
        opacity: 0.7,
        color: '#000000',
    },
});

const RoomSignupBox = Glamorous.div({
    background: '#ffffff',
    borderRadius: 10,
    maxWidth: 650,
    width: '100%',
    margin: 'auto',
});

const RoomSignupHeader = Glamorous.div<{
    headerStyle: 'signin' | 'signup' | 'profile' | 'organization';
}>([
    {
        height: 130,
        position: 'relative',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        '&:before': {
            content: ' ',
            position: 'absolute',
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
        },
        '@media(max-width: 500px)': {
            height: 80,
        },
    },
    props =>
        props.headerStyle === 'signin'
            ? {
                  backgroundImage: 'linear-gradient(103deg, #7f30fd, #ff801b)',
                  '&:before': {
                      background: 'url(/static/X/signup/header-sign.png) no-repeat',
                      backgroundImage:
                          '-webkit-image-set(url(/static/X/signup/header-sign.png) 1x, url(/static/X/signup/header-sign@2x.png) 2x)',
                      backgroundSize: '100% auto',
                      backgroundPositionY: 'center',
                  },
              }
            : {},
    props =>
        props.headerStyle === 'signup'
            ? {
                  backgroundImage: 'linear-gradient(103deg, #33c3ff, #1790ff)',
                  '&:before': {
                      background: 'url(/static/X/signup/header-sign.png) no-repeat',
                      backgroundImage:
                          '-webkit-image-set(url(/static/X/signup/header-sign.png) 1x, url(/static/X/signup/header-sign@2x.png) 2x)',
                      backgroundSize: '100% auto',
                      backgroundPositionY: 'center',
                  },
              }
            : {},
    props =>
        props.headerStyle === 'profile'
            ? {
                  backgroundImage: 'linear-gradient(102deg, #12ffe7, #8b17ff)',
                  '&:before': {
                      background: 'url(/static/X/signup/header-profile.png) no-repeat',
                      backgroundImage:
                          '-webkit-image-set(url(/static/X/signup/header-profile.png) 1x, url(/static/X/signup/header-profile@2x.png) 2x)',
                      backgroundSize: '100% auto',
                      backgroundPositionY: 'center',
                  },
              }
            : {},
    props =>
        props.headerStyle === 'organization'
            ? {
                  backgroundImage: 'linear-gradient(103deg, #337eff, #b317ff)',
                  '&:before': {
                      background: 'url(/static/X/signup/header-organization.png) no-repeat',
                      backgroundImage:
                          '-webkit-image-set(url(/static/X/signup/header-organization.png) 1x, url(/static/X/signup/header-organization@2x.png) 2x)',
                      backgroundSize: '100% auto',
                      backgroundPositionY: 'center',
                  },
              }
            : {},
]);

interface RoomSignupContainerProps {
    pageMode: PageModeT;
    headerStyle: 'signin' | 'signup' | 'profile' | 'organization';
    text?: string;
    path?: string;
    linkText?: string;
    children?: any;
}

export const RoomSignupContainer = (props: RoomSignupContainerProps) => (
    <RoomSignupWrapper>
        {props.text && (
            <RoomToggler>
                <RoomTogglerText>{props.text}</RoomTogglerText>
                <RoomTogglerLink path={props.path}>{props.linkText}</RoomTogglerLink>
            </RoomToggler>
        )}
        <RoomSignupBox>
            <RoomSignupHeader headerStyle={props.headerStyle || 'signin'} />
            {props.children}
        </RoomSignupBox>
    </RoomSignupWrapper>
);

// RoomSignup end
const SeparatorStyle = Glamorous.div<{
    marginTop?: number;
    marginBottom?: number;
}>(props => ({
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
        zIndex: 0,
    },
    '& > div': {
        display: 'block',
        width: 35,
        backgroundColor: '#fff',
        textAlign: 'center',
        zIndex: 1,
    },
}));

const Separator = (props: { marginTop?: number; marginBottom?: number }) => (
    <SeparatorStyle {...props}>
        <div>or</div>
    </SeparatorStyle>
);

export const GoogleButton = (props: {
    onClick?: any;
    path?: string;
    rounded?: boolean;
    text: string;
}) => {
    return (
        <ImgButton
            dataTestId="google-button"
            onClick={props.onClick}
            path={props.path}
            primary={true}
            rounded={props.rounded}
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                version="1.1"
                width="50px"
                height="50px"
            >
                <g id="surface1">
                    <path
                        fill="#fff"
                        d="M 12.546875 10.238281 L 12.546875 14.058594 L 17.988281 14.058594 C 17.277344 16.375 15.34375 18.03125 12.546875 18.03125 C 9.214844 18.03125 6.511719 15.332031 6.511719 12 C 6.511719 8.667969 9.214844 5.96875 12.546875 5.96875 C 14.042969 5.96875 15.410156 6.515625 16.464844 7.421875 L 19.28125 4.605469 C 17.503906 2.988281 15.140625 2 12.546875 2 C 7.019531 2 2.542969 6.476563 2.542969 12 C 2.542969 17.523438 7.019531 22 12.546875 22 C 20.941406 22 22.792969 14.148438 21.972656 10.253906 Z "
                    />
                </g>
            </svg>
            <span>{props.text}</span>
        </ImgButton>
    );
};

export const EmailButton = (props: {
    onClick?: any;
    path?: string;
    rounded?: boolean;
    text: string;
}) => {
    return (
        <ImgButton
            dataTestId="email-button"
            onClick={props.onClick}
            path={props.path}
            className="email"
            rounded={props.rounded}
        >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                <g fill="none" fillRule="evenodd">
                    <path
                        fill="#ADB5C0"
                        d="M11.409 9.23c-1.038 0-1.665.89-1.665 2.373 0 1.482.616 2.372 1.665 2.372s1.676-.901 1.676-2.372c0-1.472-.638-2.373-1.676-2.373zM11.762 2C17.225 2 21 5.41 21 10.508c0 3.57-1.745 5.816-4.585 5.816-1.47 0-2.531-.627-2.84-1.722h-.193c-.468 1.14-1.369 1.734-2.68 1.734-2.372 0-3.946-1.916-3.946-4.813 0-2.771 1.517-4.642 3.763-4.642 1.243 0 2.236.605 2.692 1.62h.194V7.155h2.611v5.793c0 .799.354 1.29.992 1.29.993 0 1.643-1.301 1.643-3.456 0-4.14-2.726-6.775-6.923-6.775-4.368 0-7.379 3.068-7.379 7.561 0 4.608 3.091 7.38 7.847 7.38 1.06 0 2.144-.138 2.737-.32v2.03c-.821.217-1.882.342-2.977.342C6.06 21 2 17.282 2 11.511 2 5.878 6.003 2 11.762 2z"
                    />
                    <path d="M0 0h24v24H0z" />
                </g>
            </svg>
            <span>{props.text}</span>
        </ImgButton>
    );
};

// InviteInfoInner start
export const InviteInfoInner = ({
    inviter,
    signPath,
    loginWithGoogle,
    loginWithEmail,
    signin,
}: {
    loginWithGoogle: Function;
    loginWithEmail: Function;
    signPath: string;
    signin: boolean;
    inviter: { photo: string | null; name: string; id: string };
}) => {
    const googleButtonText = signin ? InitTexts.auth.signinGoogle : InitTexts.auth.signupGoogle;
    const emailText = signin ? InitTexts.auth.signinEmail : InitTexts.auth.signupEmail;

    return (
        <div>
            <XVertical alignItems="center">
                <XHorizontal alignItems="center">
                    <XAvatar
                        size={'small'}
                        cloudImageUuid={inviter.photo || undefined}
                        objectName={inviter.name}
                        objectId={inviter.id}
                    />
                    <XText fontSize={16} color="#000000">
                        {inviter.name + ' invites you to join'}
                    </XText>
                </XHorizontal>
            </XVertical>
            <SignInInviteTitle>Welcome to Openland</SignInInviteTitle>
            <SubTitle
                style={{
                    maxWidth: 535,
                }}
            >
                <p>
                    Openland is a professional messenger designed <br /> to support all
                    communication needs of a modern business. <br /> Currently it&apos;s in
                    invite-only mode.
                </p>
            </SubTitle>
            <ButtonsWrapper marginTop={37} width={280}>
                <GoogleButton rounded onClick={loginWithGoogle} text={googleButtonText} />
                <Separator />
                <EmailButton rounded onClick={loginWithEmail} text={emailText} />
            </ButtonsWrapper>
        </div>
    );
};
// InviteInfoInner end
// AuthMechanism start

const XIconWrapper = Glamorous.span({
    fontSize: 20,
    marginLeft: 11,

    '& svg': {
        marginBottom: -3,
    },

    '&:hover': {
        cursor: 'pointer',
        '& svg': {
            '& > g > path:last-child': {
                fill: '#1790ff',
                opacity: 1,
            },
        },
    },
});

const RoomText = Glamorous.div({
    textAlign: 'center',
    opacity: 0.7,
    fontSize: 16,
    lineHeight: '19px',
    letterSpacing: -0.15,
    color: '#121e2b',
});

const RoomTerms = Glamorous.div({
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
        },
    },
});

type AuthMechanism = {
    signin: boolean;
    loginWithGoogle: Function;
    loginWithEmail: Function;
};

const ContentWrapper = Glamorous.div<{ noPadding?: boolean }>(props => ({
    paddingLeft: props.noPadding === true ? 0 : 15,
    paddingRight: props.noPadding === true ? 0 : 15,
}));

export const RoomAuthMechanism = ({ signin, loginWithGoogle, loginWithEmail }: AuthMechanism) => {
    const auth = InitTexts.auth;
    const title = signin ? auth.signinTitle : auth.signupRoomSignUpEmail;
    const subTitle = signin ? auth.signinSubtitle : auth.creatingAnAccountFree;
    const googleButtonText = signin ? InitTexts.auth.signinGoogle : InitTexts.auth.signupGoogle;
    const emailText = signin ? auth.signinEmail : auth.signupEmail;

    return (
        <ContentWrapper>
            <Title roomView={true}>{title}</Title>
            <RoomText>{subTitle}</RoomText>
            <ButtonsWrapper marginTop={42} width={260} marginBottom={91}>
                <GoogleButton onClick={loginWithGoogle} text={googleButtonText} rounded={true} />
                <Separator marginTop={10} marginBottom={10} />
                <EmailButton onClick={loginWithEmail} text={emailText} rounded={true} />
            </ButtonsWrapper>

            {!signin && (
                <RoomTerms>
                    By creating an account you are accepting our{' '}
                    <XLink href="https://openland.com/terms">Terms of Service</XLink> and{' '}
                    <XLink href="https://openland.com/privacy">Privacy Policy</XLink>.
                </RoomTerms>
            )}
        </ContentWrapper>
    );
};

export const WebSignUpAuthMechanism = ({
    signin,
    loginWithGoogle,
    loginWithEmail,
}: AuthMechanism) => {
    const auth = InitTexts.auth;
    const title = signin ? auth.signinTitle : auth.signupRoomSignUpEmail;
    const subTitle = signin ? auth.signinSubtitle : auth.creatingAnAccountFree;
    const googleButtonText = signin ? auth.signinGoogle : auth.signupGoogle;
    const emailText = signin ? auth.signinEmail : auth.signupEmail;

    return (
        <div>
            <Title roomView={false}>{title}</Title>
            <SubTitle>{subTitle}</SubTitle>
            <ButtonsWrapper marginTop={52} width={280}>
                <GoogleButton rounded onClick={loginWithGoogle} text={googleButtonText} />
                <Separator />
                <EmailButton rounded onClick={loginWithEmail} text={emailText} />
            </ButtonsWrapper>
        </div>
    );
};

// AuthMechanism end
// ActivationCode start

const SmallerText = Glamorous.div({
    opacity: 0.6,
    fontSize: 13,
    fontWeight: 'normal',
    fontStyle: 'normal',
    fontStretch: 'normal',
    letterSpacing: 'normal',
    color: '#000000',
});

const ResendCodeRow = Glamorous(XVertical)({
    marginTop: 12,
});

const ResendButton = Glamorous(XButton)({
    '& .button-content': {
        paddingLeft: 4,
        paddingRight: 0,
        fontWeight: 'normal',
        fontSize: 13,
    },
});

type ActivationCodeProps = {
    emailWasResend: boolean;
    emailSending: boolean;
    backButtonClick: (event?: React.MouseEvent<any>) => void;
    resendCodeClick: (event?: React.MouseEvent<any>) => void;
    codeError: string;
    emailSendedTo: string;
    codeChanged: (value: string, cb: () => void) => void;
    codeSending: boolean;
    codeValue: string;
    loginCodeStart: (event?: React.MouseEvent<any>) => void;
};

export const WebSignUpActivationCode = ({
    backButtonClick,
    resendCodeClick,
    emailSendedTo,
    emailSending,
    emailWasResend,
    codeSending,
    loginCodeStart,
    codeChanged,
    codeValue,
    codeError,
}: ActivationCodeProps) => {
    return (
        <XForm
            defaultData={{
                input: {
                    code: codeValue,
                },
            }}
            validate={{
                input: {
                    code: [
                        {
                            rule: (value: string) => value !== '',
                            errorMessage: InitTexts.auth.codeInvalid,
                        },
                    ],
                },
            }}
            defaultAction={({ input: { code } }) => {
                codeChanged(code, () => {
                    loginCodeStart();
                });
            }}
            defaultLayout={false}
        >
            <Title roomView={false}>{InitTexts.auth.enterActivationCode}</Title>
            {emailSendedTo && (
                <SubTitle>
                    We just sent it to <strong>{emailSendedTo}</strong>
                </SubTitle>
            )}
            <ButtonsWrapper marginTop={40} width="100%">
                <XFormField2 field="input.code">
                    {({ showError }: { showError: boolean }) => (
                        <>
                            <XInput
                                invalid={showError}
                                field="input.code"
                                pattern="[0-9]*"
                                type="number"
                                autofocus={true}
                                size="large"
                                placeholder={InitTexts.auth.codePlaceholder}
                                flexGrow={1}
                                flexShrink={0}
                            />
                            {showError && <XFormError field="input.code" />}
                            {codeError && <ErrorText>{codeError}</ErrorText>}
                        </>
                    )}
                </XFormField2>
            </ButtonsWrapper>
            <ResendCodeRow alignItems="center">
                <XHorizontal alignItems="center" separator="none">
                    {emailSending ? (
                        <>
                            <SmallerText>Sending code...</SmallerText>
                        </>
                    ) : (
                        <>
                            <SmallerText>
                                {emailWasResend
                                    ? 'Code successfully sent.'
                                    : InitTexts.auth.haveNotReceiveCode}
                            </SmallerText>
                            <ResendButton
                                onClick={resendCodeClick}
                                style="link"
                                text={InitTexts.auth.resend}
                            />
                        </>
                    )}
                </XHorizontal>
            </ResendCodeRow>
            <ButtonsWrapper marginTop={20}>
                <XVertical alignItems="center">
                    <XHorizontal alignItems="center">
                        <XButton
                            onClick={backButtonClick}
                            size="large"
                            style="ghost"
                            text={InitTexts.auth.back}
                        />
                        <XFormSubmit
                            dataTestId="continue-button"
                            style="primary"
                            loading={codeSending}
                            size="large"
                            alignSelf="center"
                            text={InitTexts.auth.continue}
                        />
                    </XHorizontal>
                </XVertical>
            </ButtonsWrapper>
        </XForm>
    );
};

export const RoomActivationCode = ({
    emailWasResend,
    emailSending,
    backButtonClick,
    resendCodeClick,
    emailSendedTo,
    codeSending,
    loginCodeStart,
    codeError,
    codeChanged,
    codeValue,
}: ActivationCodeProps) => {
    return (
        <XForm
            defaultData={{
                input: {
                    code: codeValue,
                },
            }}
            validate={{
                input: {
                    code: [
                        {
                            rule: (value: string) => value !== '',
                            errorMessage: InitTexts.auth.codeInvalid,
                        },
                    ],
                },
            }}
            defaultAction={({ input: { code } }) => {
                codeChanged(code, () => {
                    loginCodeStart();
                });
            }}
            defaultLayout={false}
        >
            <Title roomView={true}>{InitTexts.auth.enterActivationCode}</Title>
            {emailSendedTo && (
                <SubTitle>
                    We just sent it to <strong>{emailSendedTo}</strong>
                </SubTitle>
            )}
            <ButtonsWrapper marginTop={40} width={280}>
                <XFormField2 field="input.code">
                    {({ showError }: { showError: boolean }) => (
                        <>
                            <XInput
                                invalid={showError}
                                field="input.code"
                                pattern="[0-9]*"
                                type="number"
                                autofocus={true}
                                size="large"
                                placeholder={InitTexts.auth.codePlaceholder}
                            />
                            {showError && <XFormError field="input.code" />}
                            {codeError && <ErrorText>{codeError}</ErrorText>}
                        </>
                    )}
                </XFormField2>
            </ButtonsWrapper>
            <ResendCodeRow alignItems="center">
                <XHorizontal alignItems="center" separator="none">
                    {emailSending ? (
                        <>
                            <SmallerText>Sending code...</SmallerText>
                        </>
                    ) : (
                        <>
                            <SmallerText>
                                {emailWasResend
                                    ? 'Code successfully sent.'
                                    : InitTexts.auth.haveNotReceiveCode}
                            </SmallerText>
                            <ResendButton
                                onClick={resendCodeClick}
                                style="link"
                                text={InitTexts.auth.resend}
                            />
                        </>
                    )}
                </XHorizontal>
            </ResendCodeRow>

            <ButtonsWrapper marginTop={20} marginBottom={84} width={280}>
                <XVertical alignItems="center">
                    <XHorizontal alignItems="center">
                        <XButton
                            onClick={backButtonClick}
                            size="large"
                            style="ghost"
                            text={InitTexts.auth.back}
                        />
                        <XFormSubmit
                            dataTestId="continue-button"
                            style="primary"
                            loading={codeSending}
                            size="large"
                            alignSelf="center"
                            text={InitTexts.auth.continue}
                        />
                    </XHorizontal>
                </XVertical>
            </ButtonsWrapper>
        </XForm>
    );
};

// ActivationCode end
// CreateWithEmail start

type CreateWithEmailProps = {
    signin: boolean;
    emailError: string;
    emailChanged: (value: string, cb: () => void) => void;
    emailValue: string;
    loginEmailStart: () => void;
    emailSending: boolean;
};

export const RoomCreateWithEmail = ({
    signin,
    emailError,
    emailChanged,
    emailValue,
    loginEmailStart,
    emailSending,
}: CreateWithEmailProps) => {
    return (
        <XForm
            defaultData={{
                input: {
                    email: emailValue,
                },
            }}
            validate={{
                input: {
                    email: [
                        {
                            rule: (value: string) => value !== '' && validateEmail(value),
                            errorMessage: InitTexts.auth.emailInvalid,
                        },
                    ],
                },
            }}
            defaultAction={({ input: { email } }) => {
                emailChanged(email, () => {
                    loginEmailStart();
                });
            }}
            defaultLayout={false}
        >
            <Title roomView={true}>
                {signin
                    ? InitTexts.auth.signinRoomSignUpEmail
                    : InitTexts.auth.signupRoomSignUpEmail}
            </Title>
            <SubTitle>{InitTexts.auth.creatingAnAccountFree}</SubTitle>
            <ButtonsWrapper marginTop={40} width={280}>
                <XFormField2 field="input.email">
                    {({ showError }: { showError: boolean }) => (
                        <>
                            <XInput
                                autofocus
                                invalid={showError}
                                dataTestId="email"
                                field="input.email"
                                type="email"
                                size="large"
                                placeholder={InitTexts.auth.emailPlaceholder}
                            />
                            {showError && <XFormError field="input.email" />}
                            {emailError && <ErrorText>{emailError}</ErrorText>}
                        </>
                    )}
                </XFormField2>
            </ButtonsWrapper>
            <ButtonsWrapper marginTop={20} marginBottom={84} width={280}>
                <XVertical alignItems="center">
                    <XFormSubmit
                        dataTestId="continue-button"
                        style="primary"
                        loading={emailSending}
                        size="large"
                        alignSelf="center"
                        text={InitTexts.auth.continue}
                    />
                </XVertical>
            </ButtonsWrapper>
        </XForm>
    );
};

export const WebSignUpCreateWithEmail = ({
    signin,
    emailError,
    emailChanged,
    emailValue,
    loginEmailStart,
    emailSending,
}: CreateWithEmailProps) => {
    return (
        <XForm
            defaultData={{
                input: {
                    email: emailValue,
                },
            }}
            validate={{
                input: {
                    email: [
                        {
                            rule: (value: string) => value !== '' && validateEmail(value),
                            errorMessage: InitTexts.auth.emailInvalid,
                        },
                    ],
                },
            }}
            defaultAction={({ input: { email } }) => {
                emailChanged(email, () => {
                    loginEmailStart();
                });
            }}
            defaultLayout={false}
            width="100%"
        >
            <Title roomView={false}>
                {signin ? InitTexts.auth.signinEmail : InitTexts.auth.signupEmail}
            </Title>
            <SubTitle>{InitTexts.auth.creatingAnAccountFree}</SubTitle>
            <ButtonsWrapper marginTop={40} width={330}>
                <XFormField2 field="input.email">
                    {({ showError }: { showError: boolean }) => (
                        <>
                            <XInput
                                autofocus
                                invalid={showError}
                                dataTestId="email"
                                field="input.email"
                                type="email"
                                size="large"
                                placeholder={InitTexts.auth.emailPlaceholder}
                            />
                            {showError && <XFormError field="input.email" />}
                            {emailError && <ErrorText>{emailError}</ErrorText>}
                        </>
                    )}
                </XFormField2>
            </ButtonsWrapper>
            <ButtonsWrapper marginTop={20}>
                <XVertical alignItems="center">
                    <XFormSubmit
                        dataTestId="continue-button"
                        style="primary"
                        loading={emailSending}
                        size="large"
                        alignSelf="center"
                        text={InitTexts.auth.continue}
                    />
                </XVertical>
            </ButtonsWrapper>
        </XForm>
    );
};

// CreateWithEmail end
// CreateProfile start

const XAvatarUploadWrapper = Glamorous(XAvatarUpload)({
    marginBottom: 26,
});

const XFormSubmitWrapper = Glamorous(XFormSubmit)({
    marginTop: 50,
    '@media(max-width: 500px)': {
        marginTop: 25,
    },
});

export const CreateProfileFormInner = (props: {
    roomView: boolean;
    prefill: any;
    defaultAction: (data: any) => any;
}) => {
    const { roomView, prefill, defaultAction } = props;
    const MyTitle = roomView ? Title : Title;

    return (
        <ContentWrapper noPadding={true}>
            <MyTitle roomView={roomView}>{InitTexts.create_profile.title}</MyTitle>
            <SubTitle>{InitTexts.create_profile.subTitle}</SubTitle>
            <ButtonsWrapper marginTop={40} width="100%" marginBottom={80}>
                <XForm
                    defaultData={{
                        input: {
                            firstName: (prefill && prefill.firstName) || '',
                            lastName: (prefill && prefill.lastName) || '',
                        },
                    }}
                    validate={{
                        input: {
                            firstName: [
                                {
                                    rule: (value: string) => value !== '',
                                    errorMessage: InitTexts.auth.firstNameIsEmptyError,
                                },
                            ],
                            lastName: [
                                {
                                    rule: (value: string) => value !== '',
                                    errorMessage: InitTexts.auth.lastNameIsEmptyError,
                                },
                            ],
                        },
                    }}
                    defaultAction={defaultAction}
                    defaultLayout={false}
                >
                    <XFormError onlyGeneralErrors={true} width={472} />
                    <XFormLoadingContent>
                        <XVertical alignItems="center">
                            <XAvatarUploadWrapper
                                field="input.photoRef"
                                dataTestId="photo"
                                size="default"
                                initialUrl={prefill ? prefill.picture : undefined}
                            />

                            <XView>
                                <XFormField2 field="input.firstName">
                                    {({ showError }: { showError: boolean }) => (
                                        <>
                                            <XInput
                                                invalid={showError}
                                                field="input.firstName"
                                                size="large"
                                                title="First name"
                                                dataTestId="first-name"
                                                flexGrow={1}
                                            />

                                            {showError && <XFormError field="input.firstName" />}
                                        </>
                                    )}
                                </XFormField2>
                            </XView>

                            <XView>
                                <XFormField2 field="input.lastName">
                                    {({ showError }: { showError: boolean }) => (
                                        <>
                                            <XInput
                                                invalid={showError}
                                                field="input.lastName"
                                                size="large"
                                                title="Last name"
                                                dataTestId="last-name"
                                                flexGrow={1}
                                            />
                                            {showError && <XFormError field="input.lastName" />}
                                        </>
                                    )}
                                </XFormField2>
                            </XView>

                            <ButtonsWrapper marginBottom={84}>
                                <XFormSubmitWrapper
                                    dataTestId="continue-button"
                                    style="primary"
                                    text={InitTexts.create_profile.continue}
                                    size="large"
                                />
                            </ButtonsWrapper>
                        </XVertical>
                    </XFormLoadingContent>
                </XForm>
            </ButtonsWrapper>
        </ContentWrapper>
    );
};

// CreateProfile end
// CreateOrganization start

const InfoText = Glamorous.span({
    fontSize: 14,
});

const OrganizationSelector = Glamorous(XSelect)({
    minWidth: 330,
    '& .Select-option:only-child .new-org::before': {
        display: 'none',
    },
    '@media(max-width: 450px)': {
        minWidth: 200,
    },
});

const NewOrganizationButtonWrapper = Glamorous.div({
    position: 'relative',
    '&::before': {
        content: `''`,
        position: 'absolute',
        bottom: -8,
        left: -16,
        width: 'calc(100% + 32px)',
        height: 1,
        background: 'rgb(116, 188, 255)',
        display: 'block',
    },
});

const NewOrganizationButton = ({
    onClick,
    title,
}: {
    onClick?: (event: React.MouseEvent<any>) => void;
    title: string;
}) => {
    let text = 'New';
    if (title !== '') {
        text = `${title} (New)`;
    }
    return (
        <NewOrganizationButtonWrapper
            onClick={onClick}
            data-test-id="new-organization-button"
            className="new-org"
        >
            <XView flexDirection="row" alignItems="center">
                <XView>
                    <IcAdd />
                </XView>
                <XView color="#1790ff" marginLeft={6}>
                    <span>{text}</span>
                </XView>
            </XView>
        </NewOrganizationButtonWrapper>
    );
};

const NEW_ORGANIZATION_BUTTON_VALUE = '____new organization button____';

const OrganizationErrorText = Glamorous.div({
    fontSize: '12px',
    color: '#d75454',
    marginLeft: '17px',
    marginTop: '5px',
    maxWidth: '249px',
});

export class CreateOrganizationFormInner extends React.Component<
    {
        onPrefixChanges: (prefix: string) => void;
        roomView: boolean;
        defaultAction: (data: any) => any;
        organizations: any;
    },
    {
        inputValue: string;
    }
> {
    constructor(props: any) {
        super(props);
        this.state = {
            inputValue: '',
        };
    }

    getOrganizations = () => {
        if (this.state.inputValue !== '') {
            return [
                {
                    value: NEW_ORGANIZATION_BUTTON_VALUE,
                    label: <NewOrganizationButton title={this.state.inputValue} />,
                },
                ...this.props.organizations.data,
            ];
        }
        return [...this.props.organizations.data];
    };

    handleOnChange = (src: any, store: any) => {
        if (!store) {
            return;
        }
        let val = src ? (src.value as string) : 'unknown';
        let cval = null;
        if (Array.isArray(src)) {
            if (src.length > 0) {
                cval = src.map(r => r.value);
            }
        } else if (val !== 'unknown') {
            cval = val;
        }

        if (cval === NEW_ORGANIZATION_BUTTON_VALUE) {
            store.writeValue('fields.input.name', {
                label: this.state.inputValue,
                value: NEW_ORGANIZATION_BUTTON_VALUE,
            });
            return;
        }

        if (!src) {
            store.writeValue('fields.input.name', {
                label: '',
                value: cval,
            });
            return;
        }
        store.writeValue('fields.input.name', {
            label: src.label,
            value: cval,
        });
    };

    filterOptions = (_: any, val: any) => {
        const res = this.getOrganizations().filter(
            ({ label, value }: any) =>
                (label.includes && label.toLowerCase().includes(val.toLowerCase())) ||
                value === NEW_ORGANIZATION_BUTTON_VALUE,
        );

        return res;
    };

    renderSelect = (store: any) => {
        if (!store) {
            return;
        }
        const selectedNewOrganization =
            store.readValue('fields.input.name') &&
            store.readValue('fields.input.name').value === NEW_ORGANIZATION_BUTTON_VALUE;
        return (
            <div>
                <XVertical alignItems="center" separator="none">
                    <XFormField2 field="input.name">
                        {({ showError }: { showError: boolean }) => (
                            <>
                                <div>
                                    <XHorizontal separator="none" alignItems="center">
                                        <OrganizationSelector
                                            menuStyle={{ maxHeight: 150 }}
                                            invalid={showError}
                                            noArrow
                                            onSelectResetsInput={false}
                                            onBlurResetsInput={false}
                                            filterOptions={this.filterOptions}
                                            field="input.name"
                                            dataTestId="organization-name"
                                            title={InitTexts.create_organization.name}
                                            onInputChange={
                                                ((inputValue: any) => {
                                                    this.setState(
                                                        {
                                                            inputValue,
                                                        },
                                                        () => {
                                                            this.props.onPrefixChanges(inputValue);
                                                        },
                                                    );
                                                }) as any
                                            }
                                            onChange={(src: any) => {
                                                this.handleOnChange(src, store);
                                            }}
                                            options={this.getOrganizations()}
                                        />
                                        <XPopper
                                            content={
                                                <InfoText>
                                                    To register as an individual, simply enter your
                                                    name
                                                </InfoText>
                                            }
                                            showOnHover={true}
                                            placement="top"
                                            style="dark"
                                        >
                                            <XIconWrapper>
                                                <IcInfo />
                                            </XIconWrapper>
                                        </XPopper>
                                    </XHorizontal>
                                </div>
                                {showError && (
                                    <XFormError
                                        field="input.name"
                                        fieldErrorComponent={OrganizationErrorText}
                                    />
                                )}
                            </>
                        )}
                    </XFormField2>
                    <XView marginTop={50}>
                        <XFormSubmit
                            dataTestId="continue-button"
                            style="primary"
                            text={
                                selectedNewOrganization
                                    ? InitTexts.create_organization.createAndContinue
                                    : InitTexts.create_organization.continue
                            }
                            size="large"
                        />
                    </XView>
                </XVertical>
            </div>
        );
    };

    render() {
        const { roomView, defaultAction } = this.props;

        const MyTitle = roomView ? Title : Title;

        return (
            <ContentWrapper>
                <MyTitle roomView={roomView} className="title">
                    {InitTexts.create_organization.title}
                </MyTitle>
                <SubTitle className="subtitle">{InitTexts.create_organization.subTitle}</SubTitle>
                <XForm
                    defaultAction={(data: any) => {
                        defaultAction({
                            name: data.input.name.label,
                            id:
                                data.input.name.value !== NEW_ORGANIZATION_BUTTON_VALUE
                                    ? data.input.name.value
                                    : undefined,
                        });
                    }}
                    defaultData={{
                        input: {
                            name: '',
                        },
                    }}
                    validate={{
                        input: {
                            name: [
                                {
                                    rule: (value: string) => value !== '',
                                    errorMessage: InitTexts.auth.organizationIsEmptyError,
                                },
                            ],
                        },
                    }}
                    defaultLayout={false}
                >
                    <XVertical separator="large">
                        <XFormError width={472} />
                        <XFormLoadingContent>
                            <ButtonsWrapper marginBottom={84} marginTop={34}>
                                <XStoreContext.Consumer>{this.renderSelect}</XStoreContext.Consumer>
                            </ButtonsWrapper>
                        </XFormLoadingContent>
                    </XVertical>
                </XForm>
            </ContentWrapper>
        );
    }
}
