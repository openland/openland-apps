import * as React from 'react';
import Glamorous from 'glamorous';

export const XCardTitle = Glamorous.div({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    fontSize: '22px',
    lineHeight: '1.6',
    fontWeight: 500,
    color: '#32325d'
})

export const XCardDescription = Glamorous.div({
    color: '#525f7f',
    fontSize: '14px',
    lineHeight: '1.6',
    fontWeight: 400
})

let XCardHeaderDiv = Glamorous.div({
    paddingLeft: 24,
    paddingRight: 24,
    paddingTop: 16,
    paddingBottom: 16,
    display: 'flex',
    flexDirection: 'column'
})

export function XCardHeader(props: { children?: any, title?: string | null, description?: string | null }) {
    return (
        <XCardHeaderDiv>
            <XCardTitle>
                {props.title}
                {props.children}
            </XCardTitle>
            <XCardDescription>
                {props.description}
            </XCardDescription>
        </XCardHeaderDiv>
    )
}