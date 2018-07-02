import * as React from 'react';
import { makeNavigable, NavigableParentProps } from './Navigable';

export type XLinkProps = NavigableParentProps<{ className?: string }>;

export const XLink = makeNavigable<{ className?: string }>((props) => {
    let className = props.className ? props.className : undefined;
    if (props.active) {
        if (className) {
            className += ' is-active';
        } else {
            className = 'is-active';
        }
    }
    return (
        <a
            style={{cursor: 'pointer'}}
            href={props.href}
            target={props.hrefTarget}
            onClick={props.onClick}
            className={className}
        >
            {props.children}
        </a>
    );
});