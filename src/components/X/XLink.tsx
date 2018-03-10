import * as React from 'react';
import { Link as LinkNext } from '../../routes';
import { withRouter } from '../../utils/withRouter';
import { resolveActionPath } from '../../utils/routing';

export interface XLinkProps {
    path?: string | null;
    href?: string | null;
    anchor?: string | null;
    query?: { field: string, value?: string } | null;
    className?: string;
    activateForSubpaths?: boolean | null;
    onClick?: React.MouseEventHandler<HTMLAnchorElement>;
    clickOnDown?: boolean;
}

function normalizePath(src: string): string {
    if (src.indexOf('?') >= 0) {
        src = src.split('?', 2)[0];
    }
    return src.endsWith('/') ? src.substring(0, src.length - 1) : src;
}

export const XLink = withRouter<XLinkProps>((props) => {
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
        if (props.onClick) {
            throw Error('Unable to use onClick for routed links');
        }
        return (
            <LinkNext route={props.path}>
                <a className={className}>{props.children}</a>
            </LinkNext>
        );
    } else if (props.query) {
        let path = resolveActionPath(props);
        let isActive = props.router.queryString && props.router.queryString[props.query.field] === props.query.value;
        if (isActive) {
            if (className) {
                className += ' is-active';
            } else {
                className = 'is-active';
            }
        }
        if (props.onClick) {
            throw Error('Unable to use onClick for routed links');
        }
        return (
            <LinkNext route={path}>
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