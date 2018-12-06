import * as React from 'react';
import Glamorous from 'glamorous';
import { XLink, XLinkProps } from 'openland-x/XLink';
import { XHorizontal } from 'openland-x-layout/XHorizontal';
import { XVertical } from 'openland-x-layout/XVertical';
import { XButton } from 'openland-x/XButton';
import { XView } from 'openland-x/XView';
import { XInput } from 'openland-x/XInput';
import { XSelect } from 'openland-x/XSelect';
import { XServiceMessage } from 'openland-x/XServiceMessage';
import { InitTexts } from '../_text';
import { Title, SubTitle } from './CreateProfileComponents';
import { XForm } from 'openland-x-forms/XForm2';
import { XPopper } from 'openland-x/XPopper';
import { XFormSubmit } from 'openland-x-forms/XFormSubmit';
import { XFormLoadingContent } from 'openland-x-forms/XFormLoadingContent';
import { XFormError } from 'openland-x-forms/XFormError';
import IcInfo from '../components/icons/ic-info.svg';
import IcAdd from '../components/icons/ic-add-medium-active.svg';
import { XAvatarUpload } from 'openland-x/XAvatarUpload';
import { XStoreContext } from 'openland-y-store/XStoreContext';

interface ButtonProps extends XLinkProps {
    primary?: boolean;
    children: any;
    rounded?: boolean;
    dataTestId?: string;
}

const StyledButton = Glamorous(XLink)<{ primary?: boolean; rounded?: boolean }>(
    [
        props => ({
            display: 'block',
            width: '100%',
            height: 48,
            transition: 'all .15s ease',
            backgroundColor: props.primary ? '#1790ff' : '#ffffff',
            color: props.primary ? '#fff' : '#334562',
            borderRadius: props.rounded ? 24 : 6,
            border: props.primary
                ? 'solid 1px transparent'
                : 'solid 1px #dcdee4',
            '&:hover': {
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
                      color: props.primary ? '#ffffff' : '#334562',
                      border: props.primary
                          ? 'solid 1px transparent'
                          : 'solid 1px #dcdee4',
                      '&:hover': {
                          color: props.primary ? '#ffffff' : '#334562',
                          backgroundColor: props.primary
                              ? '#45a6ff'
                              : '#f3f3f5',
                      },
                      '&:active': {
                          color: props.primary ? '#ffffff' : '#1790ff',
                          backgroundColor: props.primary
                              ? '#117fe4'
                              : 'rgba(23, 144, 255, 0.05)',
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
    ],
);

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

const RoomTitle = Glamorous.div({
    textAlign: 'center',
    opacity: 0.9,
    fontSize: 26,
    fontWeight: 600,
    lineHeight: '31px',
    letterSpacing: 0.8,
    color: '#121e2b',
    paddingTop: 64,
    paddingBottom: 9,
});

const EmptyBlock = Glamorous.div({
    width: '100%',
    height: 15,
    flexShrink: 0,
});

// WebSignUpContainer start

const RootContainer = Glamorous.div({
    display: 'flex',
    height: '100vh',
    width: '100%',
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
    },
});

const Footer = Glamorous.div({
    marginTop: 'auto',
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
        marginBottom: 6,
    },
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
});

const Logo = Glamorous(XLink)({
    display: 'flex',
    alignItems: 'center',
    backgroundImage: "url('/static/X/signup/logo-2.svg')",
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'contain',
    width: 145,
    height: 42,
});

const HeaderStyled = Glamorous.div({
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: 'auto',
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
    '@media (max-width: 400px)': {
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
    },
    '@media (max-width: 400px)': {
        marginLeft: 0,
    },
});

const SignupContainer = Glamorous.div({
    display: 'flex',
    alignItems: 'center',
    paddingTop: 10,
    '@media (max-width: 400px)': {
        flexDirection: 'column',
    },
});

interface HeaderProps {
    text?: string;
    path?: string;
    linkText?: string;
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
    width: 522,
    margin: 'auto',
    '@media(max-width: 530px)': {
        width: '100%',
        maxWidth: 442,
    },
});

interface SignContainerProps extends HeaderProps {
    signin?: boolean;
    children?: any;
}

export const WebSignUpContainer = (props: SignContainerProps) => {
    return (
        <RootContainer>
            <LeftContainer>
                <Header
                    text={props.text}
                    path={props.path}
                    linkText={props.linkText}
                />
                <MainContent>{props.children}</MainContent>
                <Footer>
                    {!props.signin && (
                        <FooterText>
                            By creating an account you are accepting our{' '}
                            <FooterLink href="https://openland.com/terms">
                                Terms of Service
                            </FooterLink>{' '}
                            and{' '}
                            <FooterLink href="https://openland.com/privacy">
                                Privacy Policy
                            </FooterLink>
                            .
                        </FooterText>
                    )}
                    <FooterText>
                        © {new Date().getFullYear()} Openland
                    </FooterText>
                </Footer>
            </LeftContainer>
        </RootContainer>
    );
};

// WebSignUpContainer end
// RoomSignup start

const ButtonsWrapper = Glamorous.div<{
    marginTop?: number;
    marginBottom?: number;
    width?: number;
}>(props => ({
    marginTop: props.marginTop,
    marginBottom: props.marginBottom,
    width: props.width,
    marginLeft: props.width ? 'auto' : undefined,
    marginRight: props.width ? 'auto' : undefined,
}));

const RoomSignupWrapper = Glamorous.div({
    position: 'relative',
    background:
        'rgba(0, 0, 0, 0.8) url(/static/X/signup/background-blur.jpg) no-repeat',
    backgroundSize: 'cover',
    height: '100vh',
    width: '100%',
    minWidth: 670,
});

const RoomToggler = Glamorous.div({
    position: 'absolute',
    top: 28,
    right: 37,
    display: 'flex',
    color: '#ffffff',
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
        color: '#ffffff',
    },
});

const RoomSignupBox = Glamorous.div({
    background: '#ffffff',
    borderRadius: 10,
    overflow: 'hidden',
    width: 650,
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
});

const RoomSignupHeader = Glamorous.div<{
    headerStyle: 'signin' | 'signup' | 'profile' | 'organization';
}>([
    {
        height: 130,
        position: 'relative',
        '&:before': {
            content: ' ',
            position: 'absolute',
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
        },
    },
    props =>
        props.headerStyle === 'signin'
            ? {
                  backgroundImage: 'linear-gradient(103deg, #7f30fd, #ff801b)',
                  '&:before': {
                      background:
                          'url(/static/X/signup/header-sign.png) no-repeat',
                      backgroundImage:
                          '-webkit-image-set(url(/static/X/signup/header-sign.png) 1x, url(/static/X/signup/header-sign@2x.png) 2x)',
                      backgroundSize: '100% auto',
                  },
              }
            : {},
    props =>
        props.headerStyle === 'signup'
            ? {
                  backgroundImage: 'linear-gradient(103deg, #33c3ff, #1790ff)',
                  '&:before': {
                      background:
                          'url(/static/X/signup/header-sign.png) no-repeat',
                      backgroundImage:
                          '-webkit-image-set(url(/static/X/signup/header-sign.png) 1x, url(/static/X/signup/header-sign@2x.png) 2x)',
                      backgroundSize: '100% auto',
                  },
              }
            : {},
    props =>
        props.headerStyle === 'profile'
            ? {
                  backgroundImage: 'linear-gradient(102deg, #12ffe7, #8b17ff)',
                  '&:before': {
                      background:
                          'url(/static/X/signup/header-profile.png) no-repeat',
                      backgroundImage:
                          '-webkit-image-set(url(/static/X/signup/header-profile.png) 1x, url(/static/X/signup/header-profile@2x.png) 2x)',
                      backgroundSize: '100% auto',
                  },
              }
            : {},
    props =>
        props.headerStyle === 'organization'
            ? {
                  backgroundImage: 'linear-gradient(103deg, #337eff, #b317ff)',
                  '&:before': {
                      background:
                          'url(/static/X/signup/header-organization.png) no-repeat',
                      backgroundImage:
                          '-webkit-image-set(url(/static/X/signup/header-organization.png) 1x, url(/static/X/signup/header-organization@2x.png) 2x)',
                      backgroundSize: '100% auto',
                  },
              }
            : {},
]);

interface RoomSignupContainerProps {
    headerStyle: 'signin' | 'signup' | 'profile' | 'organization';
    text?: string;
    path?: string;
    linkText?: string;
    children?: any;
}

export class RoomSignupContainer extends React.Component<
    RoomSignupContainerProps
> {
    render() {
        const props = this.props;

        return (
            <RoomSignupWrapper>
                {props.text && (
                    <RoomToggler>
                        <RoomTogglerText>{props.text}</RoomTogglerText>
                        <RoomTogglerLink path={props.path}>
                            {props.linkText}
                        </RoomTogglerLink>
                    </RoomToggler>
                )}
                <RoomSignupBox>
                    <RoomSignupHeader headerStyle={props.headerStyle} />
                    {props.children}
                </RoomSignupBox>
            </RoomSignupWrapper>
        );
    }
}
// RoomSignup end
// AuthMechanism start

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

const XIconWrapper = Glamorous.span({
    fontSize: 20,
    marginLeft: 5,

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

const GoogleButton = (props: {
    onClick: any;
    rounded?: boolean;
    text: string;
}) => {
    return (
        <ImgButton
            dataTestId="google-button"
            onClick={props.onClick}
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

const EmailButton = (props: {
    onClick: any;
    rounded?: boolean;
    text: string;
}) => {
    return (
        <ImgButton
            dataTestId="email-button"
            onClick={props.onClick}
            className="email"
            rounded={props.rounded}
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
            >
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

type AuthMechanism = {
    signin: boolean;
    loginWithGoogle: Function;
    loginWithEmail: Function;
};

export const RoomAuthMechanism = ({
    signin,
    loginWithGoogle,
    loginWithEmail,
}: AuthMechanism) => {
    const auth = InitTexts.auth;
    const title = signin ? auth.signinTitle : auth.signupTitle;
    const subTitle = signin ? auth.signinSubtitle : auth.signupSubtitle;
    const googleButtonText = signin
        ? InitTexts.auth.signupGoogle
        : InitTexts.auth.signupGoogle;
    const emailText = signin ? auth.signinEmail : auth.signupEmail;

    return (
        <div>
            <RoomTitle>{title}</RoomTitle>
            <RoomText>{subTitle}</RoomText>
            <ButtonsWrapper marginTop={42} width={260} marginBottom={91}>
                <GoogleButton
                    onClick={loginWithGoogle}
                    text={googleButtonText}
                    rounded={true}
                />
                <Separator marginTop={10} marginBottom={10} />
                <EmailButton
                    onClick={loginWithEmail}
                    text={emailText}
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
        </div>
    );
};

export const WebSignUpAuthMechanism = ({
    signin,
    loginWithGoogle,
    loginWithEmail,
}: AuthMechanism) => {
    const auth = InitTexts.auth;
    const title = signin ? auth.signinTitle : auth.signupTitle;
    const subTitle = signin ? auth.signinSubtitle : auth.signupSubtitle;
    const googleButtonText = signin ? auth.signinGoogle : auth.signupGoogle;
    const emailText = signin ? auth.signinEmail : auth.signupEmail;

    return (
        <div>
            <Title>{title}</Title>
            <SubTitle>{subTitle}</SubTitle>
            <ButtonsWrapper marginTop={52} width={280}>
                <GoogleButton
                    rounded
                    onClick={loginWithGoogle}
                    text={googleButtonText}
                />
                <Separator />
                <EmailButton
                    rounded
                    onClick={loginWithEmail}
                    text={emailText}
                />
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
    lineHeight: 1.85,
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
        fontFamily: 'SFProText-Regular',
        fontWeight: 'normal',
        fontSize: 13,
    },
});

type ActivationCodeProps = {
    backButtonClick: (event?: React.MouseEvent<any>) => void;
    resendCodeClick: (event?: React.MouseEvent<any>) => void;
    codeError: string;
    emailSendedTo?: string;
    codeChanged: (value: string) => void;
    codeSending: boolean;
    codeValue: string;
    loginCodeStart: (event?: React.MouseEvent<any>) => void;
};

export const WebSignUpActivationCode = ({
    backButtonClick,
    resendCodeClick,
    codeError,
    emailSendedTo,
    codeChanged,
    codeSending,
    codeValue,
    loginCodeStart,
}: ActivationCodeProps) => {
    return (
        <div>
            <Title>{InitTexts.auth.enterActivationCode}</Title>
            {emailSendedTo && (
                <SubTitle>
                    We just sent it to <strong>{emailSendedTo}</strong>
                </SubTitle>
            )}
            {codeError !== '' && (
                <>
                    <XServiceMessage title={InitTexts.auth.codeInvalid} />
                    <EmptyBlock />
                </>
            )}
            <ButtonsWrapper>
                <XInput
                    pattern="[0-9]*"
                    type="number"
                    size="large"
                    onChange={codeChanged}
                    value={codeValue}
                    placeholder={InitTexts.auth.codePlaceholder}
                    onEnter={loginCodeStart}
                />
            </ButtonsWrapper>
            <ResendCodeRow alignItems="center">
                <XHorizontal alignItems="center" separator="none">
                    <SmallerText>
                        {InitTexts.auth.haveNotReceiveCode}
                    </SmallerText>
                    <ResendButton
                        onClick={resendCodeClick}
                        style="link"
                        text={InitTexts.auth.resend}
                    />
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
                        <XButton
                            onClick={loginCodeStart}
                            size="large"
                            style="primary"
                            loading={codeSending}
                            text={InitTexts.auth.complete}
                        />
                    </XHorizontal>
                </XVertical>
            </ButtonsWrapper>
        </div>
    );
};

export const RoomActivationCode = ({
    backButtonClick,
    resendCodeClick,
    codeError,
    emailSendedTo,
    codeChanged,
    codeSending,
    codeValue,
    loginCodeStart,
}: ActivationCodeProps) => {
    return (
        <div style={{ position: 'relative' }}>
            {codeError !== '' && (
                <div
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                    }}
                >
                    <XServiceMessage title={InitTexts.auth.codeInvalid} />
                </div>
            )}
            <RoomTitle>{InitTexts.auth.enterActivationCode}</RoomTitle>
            {emailSendedTo && (
                <SubTitle>
                    We just sent it to <strong>{emailSendedTo}</strong>
                </SubTitle>
            )}
            <ButtonsWrapper marginTop={40} width={280}>
                <XInput
                    pattern="[0-9]*"
                    type="number"
                    autofocus={true}
                    size="large"
                    onChange={codeChanged}
                    value={codeValue}
                    placeholder={InitTexts.auth.codePlaceholder}
                    onEnter={loginCodeStart}
                />
            </ButtonsWrapper>
            <ResendCodeRow alignItems="center">
                <XHorizontal alignItems="center" separator="none">
                    <SmallerText>
                        {InitTexts.auth.haveNotReceiveCode}
                    </SmallerText>
                    <ResendButton
                        onClick={resendCodeClick}
                        style="link"
                        text={InitTexts.auth.resend}
                    />
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
                        <XButton
                            onClick={loginCodeStart}
                            size="large"
                            style="primary"
                            loading={codeSending}
                            text={InitTexts.auth.complete}
                        />
                    </XHorizontal>
                </XVertical>
            </ButtonsWrapper>
        </div>
    );
};

// ActivationCode end
// CreateWithEmail start

type CreateWithEmailProps = {
    signin: boolean;
    emailError: string;
    emailChanged: (value: string) => void;
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
        <div style={{ position: 'relative' }}>
            {emailError !== '' && (
                <div
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                    }}
                >
                    <XServiceMessage title={InitTexts.auth.emailInvalid} />
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
                    onChange={emailChanged}
                    value={emailValue}
                    placeholder={InitTexts.auth.emailPlaceholder}
                    onEnter={loginEmailStart}
                />
            </ButtonsWrapper>
            <ButtonsWrapper marginTop={20} marginBottom={84} width={280}>
                <XVertical alignItems="center">
                    <XButton
                        onClick={loginEmailStart}
                        style="primary"
                        size="large"
                        loading={emailSending}
                        text={InitTexts.auth.continue}
                    />
                </XVertical>
            </ButtonsWrapper>
        </div>
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
        <div>
            <Title>
                {signin
                    ? InitTexts.auth.signinEmailTitle
                    : InitTexts.auth.signupEmail}
            </Title>
            <SubTitle>{InitTexts.auth.signinEmailSubtitle}</SubTitle>
            {emailError !== '' && (
                <>
                    <XServiceMessage title={InitTexts.auth.emailInvalid} />
                    <EmptyBlock />
                </>
            )}
            <ButtonsWrapper>
                <XInput
                    type="email"
                    size="large"
                    onChange={emailChanged}
                    value={emailValue}
                    placeholder={InitTexts.auth.emailPlaceholder}
                    onEnter={loginEmailStart}
                />
            </ButtonsWrapper>
            <ButtonsWrapper marginTop={20}>
                <XVertical alignItems="center">
                    <XButton
                        onClick={loginEmailStart}
                        style="primary"
                        size="large"
                        alignSelf="center"
                        loading={emailSending}
                        text={InitTexts.auth.continue}
                    />
                </XVertical>
            </ButtonsWrapper>
        </div>
    );
};

// CreateWithEmail end
// CreateProfile start

const XInputWrapper = Glamorous(XInput)({
    minWidth: 330,
});

const XAvatarUploadWrapper = Glamorous(XAvatarUpload)({
    marginBottom: 26,
});

const XFormSubmitWrapper = Glamorous(XFormSubmit)({
    marginTop: 50,
});

export const CreateProfileFormInner = (props: {
    roomView: boolean;
    prefill: any;
    usePhotoPrefill: boolean;
    defaultAction: (data: any) => any;
}) => {
    const { roomView, prefill, usePhotoPrefill, defaultAction } = props;
    console.log(props);
    const MyTitle = roomView ? RoomTitle : Title;
    return (
        <div>
            <MyTitle>{InitTexts.create_profile.title}</MyTitle>
            <SubTitle>{InitTexts.create_profile.subTitle}</SubTitle>
            <XForm
                defaultData={{
                    input: {
                        firstName: (prefill && prefill.firstName) || '',
                        lastName: (prefill && prefill.lastName) || '',
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
                            initialUrl={
                                usePhotoPrefill
                                    ? prefill && prefill.picture
                                    : undefined
                            }
                        />

                        <XInputWrapper
                            field="input.firstName"
                            size="large"
                            title="First name"
                            dataTestId="first-name"
                        />

                        <XInputWrapper
                            field="input.lastName"
                            size="large"
                            title="Last name"
                            dataTestId="last-name"
                        />
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
        </div>
    );
};

// CreateProfile end
// CreateOrganization start

const InfoText = Glamorous.span({
    fontSize: 14,
});

const OrganizationSelector = Glamorous(XSelect)({
    minWidth: 330,
});

const NewOrganizationButton = ({
    onClick,
}: {
    onClick?: (event: React.MouseEvent<any>) => void;
}) => {
    return (
        <div onClick={onClick} data-test-id="new-organization-button">
            <XView flexDirection="row" alignItems="center">
                <XView>
                    <IcAdd />
                </XView>
                <XView color="#1790ff" marginLeft={6}>
                    <span
                        style={{
                            fontFamily: 'SFProText-Regular',
                        }}
                    >
                        New organization
                    </span>
                </XView>
            </XView>
        </div>
    );
};

const NEW_ORGANIZATION_BUTTON_VALUE = '____new organization button____';

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
        return [
            {
                value: NEW_ORGANIZATION_BUTTON_VALUE,
                label: <NewOrganizationButton />,
            },
            ...this.props.organizations.data,
        ];
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
                value: this.state.inputValue,
            });
            return;
        }

        store.writeValue('fields.input.name', cval);
    };

    filterOptions = (_: any, val: any) => {
        const res = this.getOrganizations().filter(
            ({ label, value }: any) =>
                (label.includes && label.includes(val)) ||
                value === NEW_ORGANIZATION_BUTTON_VALUE,
        );

        return res;
    };

    renderSelect = (store: any) => {
        if (!store) {
            return;
        }

        return (
            <div>
                <OrganizationSelector
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
                        console.log('onChange', src);
                        this.handleOnChange(src, store);
                    }}
                    options={this.getOrganizations()}
                />
            </div>
        );
    };

    render() {
        const { roomView, defaultAction } = this.props;

        const MyTitle = roomView ? RoomTitle : Title;

        return (
            <div>
                <MyTitle>{InitTexts.create_organization.title}</MyTitle>
                <SubTitle>
                    {InitTexts.create_organization.subTitle}

                    <XPopper
                        content={
                            <InfoText>
                                To register as an individual,
                                <br />
                                simply enter your name
                            </InfoText>
                        }
                        showOnHover={true}
                        placement="bottom"
                        style="dark"
                    >
                        <XIconWrapper>
                            <IcInfo />
                        </XIconWrapper>
                    </XPopper>
                </SubTitle>
                <XForm
                    defaultAction={defaultAction}
                    defaultData={{
                        input: {
                            name: '',
                            website: '',
                            photoRef: null,
                        },
                    }}
                    defaultLayout={false}
                >
                    <XVertical separator="large">
                        <XFormError width={472} />
                        <XFormLoadingContent>
                            <ButtonsWrapper marginBottom={84}>
                                <XVertical alignItems="center">
                                    <XStoreContext.Consumer>
                                        {this.renderSelect}
                                    </XStoreContext.Consumer>

                                    <XFormSubmit
                                        dataTestId="continue-button"
                                        style="primary"
                                        text={
                                            InitTexts.create_organization
                                                .continue
                                        }
                                        size="large"
                                    />
                                </XVertical>
                            </ButtonsWrapper>
                        </XFormLoadingContent>
                    </XVertical>
                </XForm>
            </div>
        );
    }
}
// CreateOrganization end
