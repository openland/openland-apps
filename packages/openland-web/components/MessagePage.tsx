import * as React from 'react';
import Glamorous from 'glamorous';
import { XLink } from 'openland-x/XLink';

const ErrorDiv = Glamorous.div({
    position: 'relative',
    backgroundColor: '#fff',

    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',

    width: '100vw',
    height: '100vh'
});

const Logo = Glamorous.div<{ width?: number, height?: number }>((props) => ({
    width: props.width ? props.width : 45,
    height: props.height ? props.height : 45,
    backgroundImage: 'url(\'/static/logo-purple.svg\')',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'contain',
    position: 'absolute',
    top: 15,
    left: 23
}));

const Container = Glamorous.div({
    // width: 400
});

const Footer = Glamorous.div({
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 16,
    margin: 'auto'
});

const FooterText = Glamorous.div({
    fontSize: 14,
    lineHeight: 1.71,
    letterSpacing: -0.1,
    textAlign: 'center',
    color: '#1f3449',
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
    letterSpacing: -0.1,
    textAlign: 'center',
    color: '#1f3449'
});

export function MessagePage(props: { children?: any }) {
    return (
        <ErrorDiv>
            <Logo />
            <Container>
                {props.children}
            </Container>
            <Footer>
                <FooterText>By creating an account you are accepting our <FooterLink>Terms of Service</FooterLink> and <FooterLink>Privacy Policy</FooterLink></FooterText>
                <FooterText>© 2017-2018 Data Makes Perfect, Inc.</FooterText>
            </Footer>
        </ErrorDiv>
    );
}