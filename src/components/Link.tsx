import * as React from 'react';
import LinkNext from 'next/link';

export const Link = (props: { path: string, className?: string, children?: any }) => (
    <LinkNext passHref={true} href={props.path}>
        <a className={props.className}>{props.children}</a>
    </LinkNext>
);