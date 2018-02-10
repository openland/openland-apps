import * as React from 'react';
import Glamorous from 'glamorous';
import { XLink } from './XLink'
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
    padding: 24,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
})

export function XCardFooter(props: {children?: any, text?: string | null, linkTitle?: any, path?: string}) {
    return (
        <XCardFooterDiv>
            <XCardText>
                {props.text}
                {props.path && (
                    <XLink path={props.path}>{props.linkTitle}</XLink>
                )}
            </XCardText>
            <XHorizontal>
                {props.children}
            </XHorizontal>
        </XCardFooterDiv>
    )
}