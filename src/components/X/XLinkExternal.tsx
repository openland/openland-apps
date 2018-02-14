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
    marginTop: 1
})

export function XLinkExternal(props: { href: string }) {
    let matched = null
    if (props.href.search(/^https?\:\/\//) !== -1) {
        matched = props.href.match(/^https?\:\/\/([^\/?#]+)(?:[\/?#]|$)/i)
    } else {
        matched = props.href.match(/^([^\/?#]+)(?:[\/?#]|$)/i)
    }

    let domain;
    if (!matched) {
        domain = props.href
    } else {
        domain = matched[1]
    }

    return (
        <ExternalLinkDiv href={props.href}>
            <span>{domain}</span>
            <ExternalLinkIcon icon="launch" />
        </ExternalLinkDiv>
    )
}