import * as React from 'react';
import Glamorous from 'glamorous';
import { XHorizontal } from './XHorizontal';
import XStyles from './XStyles';

export const XCardText = Glamorous.div({
    display: 'flex',
    alignItems: 'center',
    color: '#6b7c93',
    fontSize: '13px',
    lineHeight: '1.6',
    whiteSpace: 'pre',
});

let XCardFooterDiv = Glamorous.div({
    minHeight: 50,
    paddingLeft: XStyles.paddings.xlarge,
    paddingRight: XStyles.paddings.xlarge,
    paddingTop: XStyles.paddings.large,
    paddingBottom: XStyles.paddings.large,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
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