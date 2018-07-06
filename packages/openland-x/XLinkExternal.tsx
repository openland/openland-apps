import * as React from 'react';
import { XIcon } from './XIcon';
import Glamorous from 'glamorous';

export const ExternalLinkDiv = Glamorous.a({
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    color: '#3297d3',
    fontSize: '14px',
    fontWeight: 500,
    '&:hover': {
        color: '#32325d'
    }
});

export const ExternalLinkIcon = Glamorous(XIcon)({
    marginLeft: 2,
    marginTop: 1,
    fontSize: '14px',
});

export function XLinkExternal(props: { href: string, content?: string, showIcon?: boolean }) {

    let content = props.content;
    if (!content) {
        let domain: string | null | RegExpMatchArray = props.href;

        if (domain.includes('linkedin.com/in/')) {
            domain = domain.split('/in/');
        } else if (domain.search(/^https?\:\/\//) !== -1) {
            domain = domain.match(/^https?\:\/\/([^\/?#]+)(?:[\/?#]|$)/i);
        } else {
            domain = domain.match(/^([^\/?#]+)(?:[\/?#]|$)/i);
        }
        if (!domain) {
            // Fallback
            content = props.href;
        } else {
            content = domain[1];
        }
    }

    return (
        <ExternalLinkDiv href={props.href} target="_blank" className={(props as any).className}>
            {content}{props.showIcon !== false && <ExternalLinkIcon icon="launch" />}
        </ExternalLinkDiv>
    );
}