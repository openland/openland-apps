import * as React from 'react';
import Glamorous from 'glamorous';
import { XContent } from 'openland-x/XContent';

let Title = Glamorous.div({
    fontSize: 20,
    lineHeight: 1.6,
    fontWeight: 600,
    color: '#182642',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 24,
    marginBottom: 16
});

let Message = Glamorous(XContent)({
    alignContent: 'center'
});

export function MessagePageContent(props: { title: string, children?: any }) {
    return (
        <>
            <Title>{props.title}</Title>
            <Message>{props.children}</Message>
        </>
    );
}
