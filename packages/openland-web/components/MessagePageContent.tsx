import * as React from 'react';
import Glamorous from 'glamorous';
import { XContent } from 'openland-x-layout/XContent';

let Title = Glamorous.div({
    fontSize: 24,
    fontWeight: 500,
    color: '#1f3449',
    letterSpacing: 0.8,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 24,
    marginBottom: 15
});

let Message = Glamorous(XContent)({
    alignContent: 'center',
    textAlign: 'center'
});

export function MessagePageContent(props: { title: string, children?: any }) {
    return (
        <>
            <Title>{props.title}</Title>
            <Message>{props.children}</Message>
        </>
    );
}
