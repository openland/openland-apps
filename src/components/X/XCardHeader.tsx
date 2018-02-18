import * as React from 'react';
import Glamorous from 'glamorous';
import { XHorizontal } from './XHorizontal'

export const XCardTitle = Glamorous.div({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    fontSize: '22px',
    lineHeight: '1.6',
    fontWeight: 500,
    color: '#32325d'
})

export const XCardDescription = Glamorous.div<{ellipcise?: boolean}>((props) => ({
    color: '#525f7f',
    fontSize: '14px',
    lineHeight: '1.6',
    fontWeight: 400,
    overflow: props.ellipcise ? 'hidden' : undefined,
    whiteSpace: props.ellipcise ? 'nowrap' : undefined,
    textOverflow: props.ellipcise ? 'ellipsis' : undefined,
}))

let XCardHeaderDiv = Glamorous.div({
    paddingLeft: 24,
    paddingRight: 24,
    paddingTop: 16,
    paddingBottom: 16,
    display: 'flex',
    flexDirection: 'column'
})

export function XCardHeader(props: { children?: any, title?: string | null, description?: string | null, ellipcise?: boolean }) {
    return (
        <XCardHeaderDiv>
            <XCardTitle>
                {props.title}
                <XHorizontal separator="normal">
                    {props.children}
                </XHorizontal>
            </XCardTitle>
            <XCardDescription ellipcise={props.ellipcise}>
                {props.description}
            </XCardDescription>
        </XCardHeaderDiv>
    )
}