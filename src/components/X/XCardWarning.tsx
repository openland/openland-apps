import * as React from 'react';
import Glamorous from 'glamorous';
import { XIcon } from './XIcon'

let ItemIcon = Glamorous(XIcon)({
    marginRight: '10px',
    width: '16px',
    fontSize: '16px',
    color: '#E8695F'
})

export const XWarningTitle = Glamorous.div({
    display: 'flex',
    alignItems: 'center',
    fontSize: '14px',
    color: '#525f7f'
})

let XWarningDiv = Glamorous.div({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fdfaf6',
    paddingLeft: 24,
    paddingRight: 24,
    paddingTop: 16,
    paddingBottom: 16,
})

export function XCardWarning(props: { children?: any, title?: string }) {
    return (
        <XWarningDiv>
            <XWarningTitle>
                <ItemIcon icon="warning" />
                {props.title}
            </XWarningTitle>
            {props.children}
        </XWarningDiv>
    )
}