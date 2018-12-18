import * as React from 'react';
import Glamorous from 'glamorous';
import { XLink } from 'openland-x/XLink';

const ErrorDiv = Glamorous.div({
    position: 'relative',
    backgroundColor: '#fff',

    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',

    width: '100vw',
    minHeight: '100vh',
    paddingTop: 30,
    paddingBottom: 30,
});

const Logo = Glamorous.div<{ width?: number; height?: number }>(props => ({
    width: props.width ? props.width : 145,
    height: props.height ? props.height : 42,
    backgroundImage: "url('/static/logo.svg')",
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'contain',
    position: 'absolute',
    top: 15,
    left: 23,
}));

const Container = Glamorous.div({
    flexGrow: 1,
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
    // width: 400
});

const Footer = Glamorous.div({
    // position: 'absolute',
    // left: 0,
    // right: 0,
    // bottom: 16,
    // margin: 'auto',
    marginTop: 30,
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

export function MessagePage(props: { children?: any; hideLegalText?: boolean }) {
    return (
        <ErrorDiv>
            <Logo />
            <Container>{props.children}</Container>
            <Footer>
                {props.hideLegalText === true ? null : (
                    <FooterText>
                        By creating an account you are accepting our{' '}
                        <FooterLink href="https://openland.com/terms">Terms of Service</FooterLink>{' '}
                        and{' '}
                        <FooterLink href="https://openland.com/privacy">Privacy Policy</FooterLink>.
                    </FooterText>
                )}
                <FooterText>© {new Date().getFullYear()} Openland</FooterText>
            </Footer>
        </ErrorDiv>
    );
}
