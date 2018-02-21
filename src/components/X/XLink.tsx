import * as React from 'react';
import { Link as LinkNext } from '../../routes';
import { withRouter } from '../../utils/withRouter';
import { resolveActionPath } from '../../utils/routing';

export interface XLinkProps {
    path?: string | null;
    href?: string | null;
    anchor?: string | null;
    query?: { field: string, value?: string } | null;
    className?: string | null;
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
        return (
            <LinkNext route={path} onClick={props.onClick}>
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

export const XLink = (props: XLinkProps & { children?: any }) => {
    return (
        <LinkRender
            href={props.href}
            anchor={props.anchor}
            query={props.query}
            path={props.path}
            className={props.className}
            activateForSubpaths={props.activateForSubpaths}
            onClick={props.onClick}
        >
            {props.children}
        </LinkRender>
    );
};