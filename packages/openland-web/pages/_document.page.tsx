import * as React from 'react';
import Document, {
    Head,
    Main,
    NextScript,
    DocumentProps,
    NextDocumentContext,
} from 'next/document';
import { renderStaticOptimized } from 'glamor/server';
import { buildConfig } from '../config';
import { saveConfig } from 'openland-x-config';
import { buildClient } from 'openland-y-graphql/apolloClient';
import { OpenlandClient } from 'openland-api/OpenlandClient';
import { DirectApollolClient } from 'openland-graphql/direct/DirectApolloClient';

// let draftCss = require('draft-js/dist/Draft.css');
// console.warn(draftCss);
// Load Configuration
let config = buildConfig();

const buildSimpleHttpOpenlandClient = () => {
    return new OpenlandClient(
        new DirectApollolClient(
            buildClient({
                endpoint: process.env.API_ENDPOINT
                    ? process.env.API_ENDPOINT + '/api'
                    : 'http://localhost:9000/api',
                wsEndpoint: undefined,
                initialState: {},
                token: undefined,
                ssrMode: true,
                fetch: require('node-fetch'),
            }),
        ),
    );
};

const openland = buildSimpleHttpOpenlandClient();

type MetaTagsInfoT = {
    title?: string;
    url?: string;
    description?: string;
    image?: string;
};
const MetaTags = ({
    title = 'Openland',
    description = 'Openland is a professional messenger designed to support all communication needs of a modern business.',
    image = 'https://cdn.openland.com/shared/img-og-link-oplnd.png',
    url,
}: MetaTagsInfoT) => {
    return (
        <>
            <meta name="msapplication-TileColor" content="#ffffff" />
            <meta
                name="msapplication-TileImage"
                content="/static/img/favicon/ms-icon-144x144.png?v=2"
            />
            <meta property="og:title" content={title} />
            <meta property="og:url" content={url} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={image} />
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:site" content="@openland" />
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={image} />
        </>
    );
};
export default class OpenlandDocument extends Document {
    static async getInitialProps(props: NextDocumentContext) {
        const page = props.renderPage();
        const styles = renderStaticOptimized(() => page.html  || '');

        let inviteKey;
        let metaTagsInfo;
        if (props && props.req && (props.req as any).originalUrl) {
            const originalUrl = (props.req as any).originalUrl;

            if (originalUrl.startsWith('/invite/')) {
                inviteKey = originalUrl.slice('/invite/'.length);
            } else if (originalUrl.startsWith('/joinChannel/')) {
                inviteKey = originalUrl.slice('/joinChannel/'.length);
            }

            if (inviteKey) {
                const resolvedInvite = await openland.queryResolvedInvite({
                    key: inviteKey,
                });

                if (
                    resolvedInvite &&
                    resolvedInvite.invite &&
                    resolvedInvite.invite.__typename === 'RoomInvite'
                ) {
                    const room = resolvedInvite.invite.room;

                    let urlPrefix = 'https://openland.com';

                    if (process.env.APP_ENVIRONMENT === 'next') {
                        urlPrefix = 'https://next.openland.com';
                    }

                    metaTagsInfo = {
                        title: room.title,
                        url: urlPrefix + originalUrl,
                        description: room.description,
                        image: room.socialImage ? room.socialImage : room.photo,
                    };
                }
            }
        }

        return {
            ...page,
            metaTagsInfo,
            inviteKey,
            glamCss: styles.css,
            ids: styles.ids,
        };
    }

    constructor(props: DocumentProps) {
        super(props);
        const { __NEXT_DATA__, ids } = props as any;
        if (ids) {
            __NEXT_DATA__.ids = (this.props as any).ids;
        }
    }

    render() {
        return (
            <html>
                <Head>
                    <meta
                        name="viewport"
                        content="width=device-width, initial-scale=1.0, maximum-scale=1, user-scalable=no"
                    />
                    <meta name="format-detection" content="telephone=no" />
                    <meta name="theme-color" content="#1790ff" />
                    <meta name="application-name" content="Openland" />
                    <meta name="apple-mobile-web-app-title" content="Openland" />
                    <meta name="apple-itunes-app" content="app-id=1435537685" />

                    {/* ORDER IS IMPORTANT! */}
                    <link
                        rel="apple-touch-icon"
                        sizes="57x57"
                        href="/static/img/favicon/apple-icon-57x57.png?v=2"
                    />
                    <link
                        rel="apple-touch-icon"
                        sizes="60x60"
                        href="/static/img/favicon/apple-icon-60x60.png?v=2"
                    />
                    <link
                        rel="apple-touch-icon"
                        sizes="72x72"
                        href="/static/img/favicon/apple-icon-72x72.png?v=2"
                    />
                    <link
                        rel="apple-touch-icon"
                        sizes="76x76"
                        href="/static/img/favicon/apple-icon-76x76.png?v=2"
                    />
                    <link
                        rel="apple-touch-icon"
                        sizes="114x114"
                        href="/static/img/favicon/apple-icon-114x114.png?v=2"
                    />
                    <link
                        rel="apple-touch-icon"
                        sizes="120x120"
                        href="/static/img/favicon/apple-icon-120x120.png?v=2"
                    />
                    <link
                        rel="apple-touch-icon"
                        sizes="144x144"
                        href="/static/img/favicon/apple-icon-144x144.png?v=2"
                    />
                    <link
                        rel="apple-touch-icon"
                        sizes="152x152"
                        href="/static/img/favicon/apple-icon-152x152.png?v=2"
                    />
                    <link
                        rel="apple-touch-icon"
                        sizes="180x180"
                        href="/static/img/favicon/apple-icon-180x180.png?v=2"
                    />
                    <link
                        rel="icon"
                        type="image/png"
                        sizes="192x192"
                        href="/static/img/favicon/android-icon-192x192.png?v=2"
                    />
                    <link
                        rel="icon"
                        type="image/png"
                        sizes="32x32"
                        href="/static/img/favicon/favicon-32x32.png?v=2"
                    />
                    <link
                        rel="icon"
                        type="image/png"
                        sizes="96x96"
                        href="/static/img/favicon/favicon-96x96.png?v=2"
                    />
                    <link
                        rel="icon"
                        type="image/png"
                        sizes="16x16"
                        href="/static/img/favicon/favicon-16x16.png?v=2"
                    />
                    <link rel="manifest" href="/static/img/favicon/manifest.json?v=2" />
                    <meta name="msapplication-TileColor" content="#ffffff" />
                    <meta
                        name="msapplication-TileImage"
                        content="/static/img/favicon/ms-icon-144x144.png?v=2"
                    />

                    <MetaTags {...((this.props as any).metaTagsInfo ? (this.props as any).metaTagsInfo : {})} />

                    <link
                        rel="stylesheet"
                        href="https://fonts.googleapis.com/icon?family=Material+Icons"
                    />
                    {/* Styles */}
                    <link rel="stylesheet" href="/static/css/draft.css" />
                    <link rel="stylesheet" href="/static/css/draft-emoji.css" />
                    <link rel="stylesheet" href="/static/css/draft-mentions.css" />
                    <link rel="stylesheet" href="/static/css/emoji-mart.css" />
                    <link rel="stylesheet" href="/static/css/x.css" />
                    <style dangerouslySetInnerHTML={{ __html: (this.props as any).glamCss }} />

                    {/* Config */}
                    <script
                        dangerouslySetInnerHTML={{
                            __html: "window.GLAMOR_IDS='" + JSON.stringify((this.props as any).ids) + "'",
                        }}
                    />
                    <script dangerouslySetInnerHTML={{ __html: saveConfig(config) }} />
                </Head>
                <body>
                    <Main />
                    <div className="main_scripts">
                        <NextScript />
                    </div>
                    <div
                        style={{
                            position: 'fixed',
                            height: 16,
                            top: 0,
                            width: '100vw',
                            pointerEvents: 'none',
                            zIndex: 100,
                        }}
                        id="progress_container"
                    />
                </body>
            </html>
        );
    }
}
