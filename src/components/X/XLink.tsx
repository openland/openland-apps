import * as React from 'react';
import { Link as LinkNext } from '../../routes';
import { withUserInfo } from '../Base/UserInfo';
import { withRouter } from '../../utils/withRouter';
import { resolveActionPath } from '../../utils/routing';

function normalizePath(src: string): string {
    if (src.indexOf('?') >= 0) {
        src = src.split('?', 2)[0];
    }
    return src.endsWith('/') ? src.substring(0, src.length - 1) : src;
}

const LinkRender = withRouter<{ path?: string | null, href?: string | null, anchor?: string | null, className?: string | null, children?: any, writeAccess?: boolean | null }>((props) => {
    var className = props.className ? props.className : undefined;

    if (props.path) {
        if (normalizePath(props.router.asPath!!) === normalizePath(props.path)) {
            if (className) {
                className += ' is-active';
            } else {
                className = 'is-active';
            }
        }
        return (
            <LinkNext route={props.path}>
                <a className={className}>{props.children}</a>
            </LinkNext>
        );
    } else if (props.anchor) {
        return (
            <a href={props.anchor} className={className}>{props.children}</a>
        );
    } else {
        return (
            <a href={props.href ? props.href : undefined} className={className} target="_blank">{props.children}</a>
        );
    }
});

export const XLink = withRouter<{ path?: string | null, href?: string | null, anchor?: string | null, query?: { field: string, value?: string } | null, className?: string | null, children?: any, writeAccess?: boolean | null }>(withUserInfo((props) => {
    if (props.writeAccess !== true || (props.area && props.area.writeAccess)) {
        if (props.path || props.query) {
            return <LinkRender path={resolveActionPath(props)} className={props.className} children={props.children} />;
        } else {
            return <LinkRender href={props.href} anchor={props.anchor} className={props.className} children={props.children} />;
        }
    } else {
        return null;
    }
}));