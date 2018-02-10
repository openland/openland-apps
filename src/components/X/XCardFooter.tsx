import * as React from 'react';
import Glamorous from 'glamorous';
import { XHorizontal } from './XHorizontal'

export const XCardText = Glamorous.div({
    display: 'flex',
    alignItems: 'center',
    color: '#5D677A',
    fontSize: '17px',
    lineHeight: '26px',
    whiteSpace: 'pre',
    '& *::before': {
        content: ' '
    }
})

let XCardFooterDiv = Glamorous.div({
    paddingLeft: 24,
    paddingRight: 24,
    paddingTop: 16,
    paddingBottom: 16,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
})

export function XCardFooter(props: { children?: any, text?: string | null }) {
    return (
        <XCardFooterDiv>
            <XCardText>
                {props.text}
            </XCardText>
            <XHorizontal separator="normal">
                {props.children}
            </XHorizontal>
        </XCardFooterDiv>
    )
}