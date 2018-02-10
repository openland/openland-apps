import * as React from 'react';
import Glamorous from 'glamorous';
import { XHorizontal } from './XHorizontal'
import { XView } from './XView'

export const XHorizontalDiv = Glamorous(XHorizontal)({
    alignItems: 'center'
})

export const XViewDiv = Glamorous(XView)({
    width: '100%'
})

export const XCardText = Glamorous.div({
    display: 'flex',
    alignItems: 'center',
    color: '#5D677A',
    fontSize: '17px',
    lineHeight: '26px',
})

let XCardFooterDiv = Glamorous.div({
    padding: 24,
    display: 'flex',
    flexDirection: 'row'
})

export function XCardFooter(props: {children?: any, text?: string | null, textLink?: any}) {
    return (
        <XCardFooterDiv>
            <XViewDiv justifyContent="space-between" direction="row">
                {props.textLink ? (
                    <XHorizontalDiv>
                        <XCardText>{props.text}</XCardText>
                        {props.textLink}
                    </XHorizontalDiv>
                ) : (
                    <XCardText>{props.text}</XCardText>
                )}
                {props.children && (
                    <XView>
                        <XHorizontalDiv>
                            {props.children}
                        </XHorizontalDiv>
                    </XView>
                )}
            </XViewDiv>
        </XCardFooterDiv>
    )
}