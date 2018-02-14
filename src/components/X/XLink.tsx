import * as React from 'react';
import Glamorous from 'glamorous';
import { Link as LinkNext } from '../../routes';
import { withUserInfo } from '../Base/UserInfo';
import { withRouter } from '../../utils/withRouter';
import { resolveActionPath } from '../../utils/routing';
import { XIcon } from './XIcon'
import XStyled from './XStyled';

export interface XLinkProps {
    path?: string | null;
    href?: string | null;
    anchor?: string | null;
    query?: { field: string, value?: string } | null;
    className?: string | null;
    // theme?: object | null;
    // {className?: string; theme?: object}
    writeAccess?: boolean | null;
    activateForSubpaths?: boolean | null;
    onClick?: React.MouseEventHandler<HTMLAnchorElement>;
}

function normalizePath(src: string): string {
    if (src.indexOf('?') >= 0) {
        src = src.split('?', 2)[0];
    }
    return src.endsWith('/') ? src.substring(0, src.length - 1) : src;
}

const LinkRender = withRouter<XLinkProps>((props) => {
    var className = props.className ? props.className : undefined;

    if (props.path) {
        let ncurrent = normalizePath(props.router.asPath!!);
        let ntarget = normalizePath(props.path);
        if (ncurrent === ntarget || (ncurrent.startsWith(ntarget + '/') && props.activateForSubpaths)) {
            if (className) {
                className += ' is-active';
            } else {
                className = 'is-active';
            }
        }
        return (
            <LinkNext route={props.path} onClick={props.onClick}>
                <a className={className}>{props.children}</a>
            </LinkNext>
        );
    } else if (props.anchor) {
        return (
            <a href={props.anchor} className={className} onClick={props.onClick}>{props.children}</a>
        );
    } else if (props.href) {
        return (
            <a href={props.href} className={className} target="_blank" onClick={props.onClick}>{props.children}</a>
        );
    } else {
        return (
            <a href={'#'} className={className} onClick={props.onClick}>{props.children}</a>
        );
    }
});

export const XLink = withRouter<XLinkProps & { children?: any }>(withUserInfo((props) => {
    if (props.writeAccess !== true || (props.area && props.area.writeAccess)) {
        if (props.path || props.query) {
            return (
                <LinkRender
                    path={resolveActionPath(props)}
                    className={props.className}
                    children={props.children}
                    activateForSubpaths={props.activateForSubpaths}
                    onClick={props.onClick}
                />
            );
        } else {
            return (
                <LinkRender
                    href={props.href}
                    anchor={props.anchor}
                    className={props.className}
                    children={props.children}
                    onClick={props.onClick}
                />
            );
        }
    } else {
        return null;
    }
}));

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

export function ExternalLink(props: { path: string }) {
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