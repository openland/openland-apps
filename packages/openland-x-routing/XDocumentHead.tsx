import * as React from 'react';
import Head from 'next/head';
import { XRouterContext } from './XRouterContext';
import { isElectron } from 'openland-y-utils/isElectron';

const DEFAULT_OG = {
    title: 'Openland',
    description:
        'Openland is a modern social network built for people, not advertisers. Join to make new friends, share stories, and do things together.',
    image: 'https://cdn.openland.com/shared/og/og-global-2.png',
};

export type XDocumentHeadT = {
    title?: string | string[];
    disableBranding?: boolean;
    titleWithoutReverse?: boolean;
    titleSocial?: string | null;
    imgCloud?: string | null;
    imgUrl?: string | null;
    description?: string | null;
};

export const XDocumentHead = React.memo((props: XDocumentHeadT) => {
    let router = React.useContext(XRouterContext)!;
    // remove "Openland" prefix from title. Remove it only if a valid title passed
    // so the actual page title will never be empty
    let parts = props.disableBranding && !!props.title && props.title.length ? [] : ['Openland'];
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

    if (isElectron) {
        title = 'Openland';
    }

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
