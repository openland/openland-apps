import * as React from 'react';
import { Link as LinkNext } from '../routes';
import { withUserInfo } from './UserInfo';
import { withRouter } from '../utils/withRouter';

function trimSlash(src: string): string {
    return src.endsWith('/') ? src.substring(0, src.length - 1) : src;
}

const LinkRender = withRouter<{ path: string, className?: string, children?: any, writeAccess?: boolean }>((props) => {
    var className = props.className;
    if (className) {
        if (trimSlash(props.router.pathname) === trimSlash(props.path)) {
            className += ' is-active';
        }
    }
    return (
        <LinkNext route={props.path}>
            <a className={className}>{props.children}</a>
        </LinkNext>
    );
});

export const Link = withRouter<{ path: string, className?: string, children?: any, writeAccess?: boolean }>(withUserInfo((props) => {
    if (props.writeAccess !== true || props.account.writeAccess) {
        return <LinkRender path={props.path} className={props.className} children={props.children} />;
    } else {
        return null;
    }
}));