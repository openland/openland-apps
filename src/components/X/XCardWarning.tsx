import * as React from 'react';
import Glamorous from 'glamorous';
import { XIcon } from './XIcon'

let ItemIcon = Glamorous(XIcon)({
    marginRight: '10px',
    width: '20px',
    fontSize: '18px'
})

export const XWarningTitle = Glamorous.div({
    display: 'flex',
    alignItems: 'center',
    fontSize: '17px',
    fontWeight: 500,
    color: '#5D677A'
})

let XWarningDiv = Glamorous.div({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FDF6F6',
    minHeight: 50,
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