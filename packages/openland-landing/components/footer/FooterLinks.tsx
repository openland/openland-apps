import * as React from 'react';
import { css } from 'linaria';
import { XView } from 'react-mental';

let footerLinksClass = css`
    list-style: none;
    margin: 0;
    padding: 0;
`;

interface FooterLinksProps {
    children?: any;
}

export const FooterLinks = (props: FooterLinksProps) => (
    <ul className={footerLinksClass}>{props.children}</ul>
);

let footerLinksItemClass = css`
    display: block;
    font-size: 14px;
    line-height: 34px;
    position: relative;
`;

let footerLinksItemInnerClass = css`
    color: #1f3449;
    text-decoration: none!importan;
    display: flex;
    align-items: center;

    &:hover {
        color: #1790ff;
    }

    svg {
        * {
            fill: rgba(83, 96, 134, 0.5);
        }

        &.phone-icon {
            margin: 0 11px 0 1px;
        }

        &.mail-icon {
            margin: 1px 10px -1px 0;
        }
    }
`;

interface FooterLinksItemProps {
    content: string;
    path: string;
    target?: '_blank';
    icon?: any;
}

export const FooterLinksItem = (props: FooterLinksItemProps) => (
    <li className={footerLinksItemClass}>
        <a href={props.path} target={props.target} className={footerLinksItemInnerClass}>
            {props.icon}
            {props.content}
        </a>
    </li>
);
