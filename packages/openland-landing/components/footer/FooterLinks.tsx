import * as React from 'react';

interface FooterLinksProps {
    children?: any;
}

export const FooterLinks = (props: FooterLinksProps) => <ul>{props.children}</ul>;

interface FooterLinksItemProps {
    content: string;
    path: string;
    target?: '_blank';
    icon?: any;
}

export const FooterLinksItem = (props: FooterLinksItemProps) => (
    <li>
        <a href={props.path} target={props.target}>
            {props.icon}
            {props.content}
        </a>
    </li>
);
