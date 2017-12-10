import * as React from 'react';
import LinkNext from 'next/link';
import { withUserInfo } from './UserInfo';
import { withRouter } from '../utils/withRouter';

const LinkRender = withRouter<{ path: string, className?: string, children?: any, writeAccess?: boolean }>((props) => {
    var className = props.className;
    if (className) {
        if (props.router.pathname === props.path) {
            className += ' is-active';
        }
    }
    return (
        <LinkNext passHref={true} href={props.path} as={props.path}>
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