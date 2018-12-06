import * as React from 'react';
import Glamorous from 'glamorous';
import { XContent } from 'openland-x-layout/XContent';

let Title = Glamorous.div({
    fontSize: 24,
    color: '#000',
    fontFamily: 'SFProText-Semibold',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 12,
});

let Message = Glamorous(XContent)({
    alignContent: 'center',
    textAlign: 'center',
    width: '100%',
});

export function MessagePageContent(props: { title: string; children?: any }) {
    return (
        <>
            <Title>{props.title}</Title>
            <Message>{props.children}</Message>
        </>
    );
}
