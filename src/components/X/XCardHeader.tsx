import * as React from 'react';
import Glamorous from 'glamorous';
import { XHorizontal } from './XHorizontal'

export const XHorizontalDiv = Glamorous(XHorizontal)({
    alignItems: 'center'
})

export const XCardTitle = Glamorous.div({
    fontSize: '24px',
    lineHeight: '34px',
    fontWeight: 500,
})

export const XCardDescription = Glamorous.div({
    display: 'flex',
    alignItems: 'center',
    color: '#5D677A',
    fontSize: '17px',
    lineHeight: '26px',
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
            <XCardTitle>{props.title}</XCardTitle>
            <XHorizontalDiv>
                <XCardDescription>
                    {props.description}
                </XCardDescription>
                {props.children}
            </XHorizontalDiv>
        </XCardHeaderDiv>
    )
}