import '../globals';
import * as React from 'react';
import Glamorous from 'glamorous';
import { XLink, XLinkProps } from 'openland-x/XLink';
import { XIcon } from 'openland-x/XIcon';

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
    '&.map': {
        '& > svg': {
            marginLeft: 2,
            width: 22,
            height: 22
        },
        '& > span': {
            marginLeft: 8
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
        <MapCardTitle className="map">
            {/* <svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="402.577px" height="402.577px">
                <g>
                    <path fill="#654bfa" d="M400.858,11.427c-3.241-7.421-8.85-11.132-16.854-11.136H18.564c-7.993,0-13.61,3.715-16.846,11.136 c-3.234,7.801-1.903,14.467,3.999,19.985l140.757,140.753v138.755c0,4.955,1.809,9.232,5.424,12.854l73.085,73.083 c3.429,3.614,7.71,5.428,12.851,5.428c2.282,0,4.66-0.479,7.135-1.43c7.426-3.238,11.14-8.851,11.14-16.845V172.166L396.861,31.413 C402.765,25.895,404.093,19.231,400.858,11.427z" />
                </g>
            </svg> */}
            <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg"  x="0px" y="0px" viewBox="0 0 296.999 296.999">
                <g>
                    <path fill="#654bfa" d="M141.914,185.802c1.883,1.656,4.234,2.486,6.587,2.486c2.353,0,4.705-0.83,6.587-2.486
                        c2.385-2.101,58.391-52.021,58.391-103.793c0-35.842-29.148-65.002-64.977-65.002c-35.83,0-64.979,29.16-64.979,65.002
                        C83.521,133.781,139.529,183.701,141.914,185.802z M148.501,65.025c9.302,0,16.845,7.602,16.845,16.984
                        c0,9.381-7.543,16.984-16.845,16.984c-9.305,0-16.847-7.604-16.847-16.984C131.654,72.627,139.196,65.025,148.501,65.025z"/>
                    <path fill="#654bfa" d="M273.357,185.773l-7.527-26.377c-1.222-4.281-5.133-7.232-9.583-7.232h-53.719c-1.942,2.887-3.991,5.785-6.158,8.699
                        c-15.057,20.23-30.364,33.914-32.061,35.41c-4.37,3.848-9.983,5.967-15.808,5.967c-5.821,0-11.434-2.117-15.81-5.969
                        c-1.695-1.494-17.004-15.18-32.06-35.408c-2.167-2.914-4.216-5.813-6.158-8.699h-53.72c-4.45,0-8.361,2.951-9.583,7.232
                        l-8.971,31.436l200.529,36.73L273.357,185.773z"/>
                    <path fill="#654bfa" d="M296.617,267.291l-19.23-67.396l-95.412,80.098h105.06c3.127,0,6.072-1.467,7.955-3.963
                        C296.873,273.533,297.474,270.297,296.617,267.291z"/>
                    <path fill="#654bfa" d="M48.793,209.888l-30.44-5.576L0.383,267.291c-0.857,3.006-0.256,6.242,1.628,8.738c1.883,2.496,4.828,3.963,7.955,3.963
                        h38.827V209.888z"/>
                    <polygon fill="#654bfa" points="62.746,212.445 62.746,279.992 160.273,279.992 208.857,239.207 	"/>
                </g>
            </svg>
            <span>Prospecting</span>
        </MapCardTitle>
        <MapCardText marginBottom={42}>
            Identify best-fit opportunity sites and connect with the owners
        </MapCardText>
        <MapCardTitle>
            <XIcon icon="insert_drive_file" />
            <span>Record keeping</span>
        </MapCardTitle>
        <MapCardText marginBottom={42}>
            Organize all sites you track in a simple system of folders
        </MapCardText>
        <MapCardTitle>
            {/* <Logo width={25} height={25} /> */}
            <XIcon icon="supervisor_account" />
            <span>Collaboration</span>
        </MapCardTitle>
        <MapCardText>
            Selectively share deal information with internal and external stakeholders
        </MapCardText>
    </MapCardContentStyle>
);

interface SignContainerProps extends HeaderProps {
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
                <Footer>© 2017-2018 Data Makes Perfect, Inc.</Footer>
            </LeftContainer>
            <RightContainer>
                <MapCardContent />
            </RightContainer>
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

export const ButtonsWrapper = Glamorous.div<{ marginTop?: number }>((props) => ({
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
        '& svg path': {
            transition: 'all .15s'
        },
        '&:active': {
            '& svg path:first-child': {
                fill: '#5640d6'
            }
        }
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

export const Separator = () => (
    <SeparatorStyle>
        <div>or</div>
    </SeparatorStyle>
);