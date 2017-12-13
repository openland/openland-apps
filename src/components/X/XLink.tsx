import * as React from 'react';
import { Link as LinkNext } from '../../routes';
import { withUserInfo } from '../UserInfo';
import { withRouter } from '../../utils/withRouter';
import * as qs from 'query-string';

function trimSlash(src: string): string {
    return src.endsWith('/') ? src.substring(0, src.length - 1) : src;
}

const LinkRender = withRouter<{ path: string, className?: string, children?: any, writeAccess?: boolean }>((props) => {
    var className = props.className;
    if (className) {
        if (trimSlash(props.router.asPath!!) === trimSlash(props.path)) {
            className += ' is-active';
        }
    }
    return (
        <LinkNext route={props.path}>
            <a className={className}>{props.children}</a>
        </LinkNext>
    );
});

export const XLink = withRouter<{ path: string, query?: { field: string, value?: string }, className?: string, children?: any, writeAccess?: boolean }>(withUserInfo((props) => {
    var destPath: string;
    if (props.path) {
        destPath = props.path;
    } else if (props.query) {
        let s = JSON.parse(JSON.stringify(props.router.query!!));
        if (props.query.value) {
            s[props.query.field] = props.query.value;
        } else {
            delete s[props.query.field];
        }
        let q = qs.stringify(s);
        if (q !== '') {
            destPath = props.router.pathname + '?' + q;
        } else {
            destPath = props.router.pathname;
        }
    } else {
        destPath = '/';
    }

    if (props.writeAccess !== true || props.account.writeAccess) {
        return <LinkRender path={destPath} className={props.className} children={props.children} />;
    } else {
        return null;
    }
}));