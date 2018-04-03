import * as React from 'react';
import Glamorous from 'glamorous';
import { XHorizontal } from './XHorizontal';

export const XCardText = Glamorous.div({
    display: 'flex',
    alignItems: 'center',
    color: '#6b7c93',
    fontSize: '13px',
    lineHeight: '1.6',
    whiteSpace: 'pre',
    '& *::before': {
        content: ' '
    }
});

let XCardFooterDiv = Glamorous.div({
    minHeight: 50,
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 16,
    paddingBottom: 16,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#fff'
});

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
    );
}