import * as React from 'react';
import Glamorous from 'glamorous';
import { XCard } from './X/XCard';

let ErrorDiv = Glamorous.div({
    position: 'relative',
    backgroundImage: 'url(\'/static/img/bg_topography.png\')',
    backgroundAttachment: 'fixed',

    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',

    width: '100vw',
    height: '100vh'
});

let Container = Glamorous(XCard)({
    width: 400
});

let Footer = Glamorous.div({
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 16,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    color: '#000000',
    opacity: 0.4,
    fontSize: '14px',
    fontWeight: 600
});

export function MessagePage(props: { children?: any }) {
    return (
        <ErrorDiv>
            <Container shadow="medium">
                {props.children}
            </Container>
            <Footer>Data Makes Perfect, Inc; CA 94102, 2017-2018</Footer>
        </ErrorDiv>
    );
}