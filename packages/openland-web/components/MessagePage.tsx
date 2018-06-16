import * as React from 'react';
import Glamorous from 'glamorous';

let ErrorDiv = Glamorous.div({
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

let Container = Glamorous.div({
    // width: 400
});

let Footer = Glamorous.div({
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 16,
    margin: 'auto',
    fontSize: 14,
    lineHeight: 1.71,
    letterSpacing: 0.4,
    textAlign: 'center',
    color: '#1f3449',
    opacity: 0.4,
});

export function MessagePage(props: { children?: any }) {
    return (
        <ErrorDiv>
            <Logo />
            <Container>
                {props.children}
            </Container>
            <Footer>© 2017-2018 Data Makes Perfect, Inc.</Footer>
        </ErrorDiv>
    );
}