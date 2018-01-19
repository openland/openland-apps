import * as React from 'react';
import Head from 'next/head';
import { formatPageTitle } from '../../utils/strings';
import { withRouter } from '../../utils/withRouter';
export const XHead = withRouter<{ title: string | string[], imgCloud?: string, imgUrl?: string }>((props) => {

    let title = '';
    if (typeof (props.title) === 'string') {
        title = props.title;
    } else {
        title = formatPageTitle(...props.title)
    }

    let img = 'https://sf.statecraft.one/static/img/x-pipeline--list.png';
    if (props.imgUrl) {
        img = props.imgUrl;
    } else if (props.imgCloud) {
        img = 'https://ucarecdn.com/' + props.imgCloud;
    }

    return (
        <Head>
            <title key="page_title">{title}</title>
            <meta key="og_title" property="og:title" content={title} />
            <meta key="og_url" property="og:url" content={props.router.href} />
            <meta key="og_description" property="og:description" content="An initiative to create the most accurate, transparent, and collaborative assessment of housing production in the city." />
            <meta key="og_img" property="og:image" content={img} />
        </Head>
    );
});