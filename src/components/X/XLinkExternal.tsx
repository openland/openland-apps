import * as React from 'react';
import { XIcon } from './XIcon'
import XStyled from './XStyled';
import Glamorous from 'glamorous';
import { XLink } from './XLink';

export const ExternalLinkDiv = XStyled(XLink)({
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    color: '#3297d3',
    fontSize: '14px',
    fontWeight: 500,
    '&:hover': {
        color: '#32325d'
    }
})

export const ExternalLinkIcon = Glamorous(XIcon)({
    marginLeft: 3,
    fontSize: 14,
})

export function XLinkExternal(props: { path: string }) {
    let url: string | null | RegExpMatchArray = props.path

    if (url.search(/^https?\:\/\//) !== -1) {
        url = url.match(/^https?\:\/\/([^\/?#]+)(?:[\/?#]|$)/i)
    } else {
        url = url.match(/^([^\/?#]+)(?:[\/?#]|$)/i)
    }

    return (
        <ExternalLinkDiv href={props.path}>
            <span>{
                !url ? props.path : url[1]
            }</span>
            <ExternalLinkIcon icon="launch" />
        </ExternalLinkDiv>
    )
}