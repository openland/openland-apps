import * as React from 'react';
import Head from 'next/head';
import { formatPageTitle } from '../../utils/strings';
import { withRouter } from 'openland-x-routing/withRouter';

export const XHead = withRouter<{ title: string | string[], titleSocial?: string | null, imgCloud?: string | null, imgUrl?: string | null }>((props) => {
    let parts = ['Openland'];
    if (typeof (props.title) === 'string') {
        parts = ['Openland', props.title];
    } else {
        parts = ['Openland', ...props.title];
    }
    let title = formatPageTitle(...parts);

    let img = 'https://openland.com/img/og-2.png';
    if (props.imgUrl) {
        img = props.imgUrl;
    } else if (props.imgCloud) {
        img = 'https://ucarecdn.com/' + props.imgCloud;
    }

    return (
        <Head>
            <title key="page_title">{title}</title>
            <meta key="og_title" property="og:title" content={props.titleSocial ? props.titleSocial : title} />
            <meta key="og_url" property="og:url" content={props.router.href} />
            <meta key="og_description" property="og:description" content="All-in-one solution for land acquisition" />
            <meta key="og_img" property="og:image" content={img} />
        </Head>
    );
});