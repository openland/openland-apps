import * as React from 'react';
import Head from 'next/head';
import { XRouterContext } from './XRouterContext';
import { XMemo } from 'openland-y-utils/XMemo';
import { isElectron } from 'openland-y-utils/isElectron';

const DEFAULT_OG = {
    title: 'Openland',
    description:
        'Openland is a professional messenger designed to support all communication needs of a modern business.',
    image: 'https://cdn.openland.com/shared/img-og-link-oplnd.png',
};

export type XDocumentHeadT = {
    title?: string | string[];
    titleWithoutReverse?: boolean;
    titleSocial?: string | null;
    imgCloud?: string | null;
    imgUrl?: string | null;
    description?: string | null;
};

export const XDocumentHead = XMemo<XDocumentHeadT>(props => {
    let router = React.useContext(XRouterContext)!;

    let parts = ['Openland'];
    if (isElectron) {
        parts = [];
    }
    if (typeof props.title === 'string') {
        if (props.title !== 'Openland') {
            parts = [...parts, props.title];
        }
    } else if (Array.isArray(props.title)) {
        parts = [...parts, ...props.title];
    } else {
        parts = ['Openland'];
    }
    let title = props.titleWithoutReverse ? parts.join(' · ') : parts.reverse().join(' · ');

    let img = DEFAULT_OG.image;
    if (props.imgUrl) {
        img = props.imgUrl;
    } else if (props.imgCloud) {
        img = 'https://ucarecdn.com/' + props.imgCloud;
    }

    let description = props.description || DEFAULT_OG.description;

    return (
        <Head>
            <title key="page_title">{title}</title>
            <meta
                key="og_title"
                property="og:title"
                content={props.titleSocial ? props.titleSocial : title}
            />
            <meta key="og_url" property="og:url" content={router.href} />
            <meta key="og_description" property="og:description" content={description} />
            <meta key="og_img" property="og:image" content={img} />
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:site" content="@openland" />
            <meta name="twitter:title" content={props.titleSocial ? props.titleSocial : title} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={img} />
        </Head>
    );
});

XDocumentHead.displayName = 'XDocumentHead';
