import * as React from 'react';
import { makeNavigable, NavigableParentProps } from './Navigable';
import { css, cx } from 'linaria';

const XLinkStyle = css`
    cursor: pointer;
    color: rgb(23, 144, 255);

    &:hover {
        text-decoration: none;
    }
`;

export type XLinkProps = NavigableParentProps<{
    className?: string;
}>;

export const XLink = makeNavigable<{ className?: string; dataTestId?: string }>(props => {
    let className = cx(XLinkStyle, props.className, props.active && 'is-active');

    return (
        <a
            data-test-id={props.dataTestId}
            href={props.href}
            target={props.hrefTarget}
            onClick={props.onClick}
            className={className}
        >
            {props.children}
        </a>
    );
});
