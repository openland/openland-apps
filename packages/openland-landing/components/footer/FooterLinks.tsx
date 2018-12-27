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

interface FooterLinksItemProps {
    content: string;
    path: string;
    target?: '_blank';
    icon?: any;
}

export const FooterLinksItem = (props: FooterLinksItemProps) => (
    <li className={footerLinksItemClass}>
        <XView
            as="a"
            path={props.path}
            target={props.target}
            color="#1f3449"
            textDecoration="none"
            hoverColor="#1790ff"
            hoverTextDecoration="none"
        >
            {props.icon}
            {props.content}
        </XView>
    </li>
);
