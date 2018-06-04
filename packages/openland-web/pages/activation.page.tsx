import '../globals';
import * as React from 'react';
import Glamorous from 'glamorous';
import { withAppBase } from '../components/withAppBase';
import { XDocumentHead } from 'openland-x-routing/XDocumentHead';
import { XTrack } from 'openland-x-analytics/XTrack';
import { XLink } from 'openland-x/XLink';
import { AuthRouter } from '../components/AuthRouter';

const RootContainer = Glamorous.div({
    display: 'flex',
    height: '100vh',
    backgroundColor: '#fff',
    boxShadow: '0px 0px 0px 1px rgba(0, 0, 0, 0.08)',
    flexBasis: '60%',
    paddingLeft: 32,
    paddingRight: 32,
    paddingTop: 22,
    paddingBottom: 22,
    flexDirection: 'column',
    zIndex: 1,
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

const Container = (props: { children?: any }) => {
    return (
        <RootContainer>
            <Header />
            <MainContent>
                {props.children}
            </MainContent>
            <Footer>© 2017-2018 Data Makes Perfect, Inc.</Footer>
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

const Description = Glamorous.div<{ marginBottom?: number }>((props) => ({
    opacity: 0.7,
    fontSize: 16,
    lineHeight: 1.5,
    letterSpacing: 0.5,
    textAlign: 'center',
    color: '#1f3449',
    marginBottom: props.marginBottom
}));

export default withAppBase((props) => {
    return (
        <AuthRouter>
            <XDocumentHead title="Activation needed" titleSocial="Openland - land acquisition platfom" />
            <XTrack event="View Activation">
                <Container>
                    <Title>
                        Activation needed
                    </Title>
                    <Description>
                        We are working on your account and will notify when it will became active.
                    </Description>
                </Container>
            </XTrack>
        </AuthRouter>
    );
});