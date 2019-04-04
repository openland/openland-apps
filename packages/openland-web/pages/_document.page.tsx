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
// let draftCss = require('draft-js/dist/Draft.css');
// console.warn(draftCss);
// Load Configuration
let config = buildConfig();

export default class OpenlandDocument extends Document {
    static async getInitialProps(props: NextDocumentContext) {
        const page = props.renderPage();
        const styles = renderStaticOptimized(() => page.html || page.errorHtml || '');
        return {
            ...page,
            glamCss: styles.css,
            ids: styles.ids,
        };
    }

    constructor(props: DocumentProps) {
        super(props);
        const { __NEXT_DATA__, ids } = props;
        if (ids) {
            __NEXT_DATA__.ids = this.props.ids;
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

                    <meta property="og:title" content="test-community" />
                    <meta property="og:url" content="http://openland.com/joinChannel/2qs9ceT" />
                    <meta property="og:description" content="fdfdfdfdfdff" />
                    <meta
                        property="og:image"
                        content="https://ucarecdn.com/10dd0be5-2931-4ae9-a5bb-7ae38a7a9c30/-/crop/248x139/175,25/"
                    />
                    <meta name="twitter:card" content="summary_large_image" />
                    <meta name="twitter:site" content="@openland" />
                    <meta name="twitter:title" content="test-community" />
                    <meta name="twitter:description" content="fdfdfdfdfdff" />
                    <meta
                        name="twitter:image"
                        content="https://ucarecdn.com/10dd0be5-2931-4ae9-a5bb-7ae38a7a9c30/-/crop/248x139/175,25/"
                    />
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
                    <style dangerouslySetInnerHTML={{ __html: this.props.glamCss }} />

                    {/* Config */}
                    <script
                        dangerouslySetInnerHTML={{
                            __html: "window.GLAMOR_IDS='" + JSON.stringify(this.props.ids) + "'",
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
