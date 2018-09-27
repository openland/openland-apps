import * as React from 'react';
import Document, { Head, Main, NextScript, DocumentProps, NextDocumentContext } from 'next/document';
import { renderStaticOptimized } from 'glamor/server';
import { buildConfig } from '../config';
import { saveConfig } from 'openland-x-config';
// let draftCss = require('draft-js/dist/Draft.css');
// console.warn(draftCss);
// Load Configuration
let config = buildConfig();

export default class StateDocument extends Document {
    static async getInitialProps(props: NextDocumentContext) {
        const page = props.renderPage();
        const content = page.html || page.errorHtml;
        if (!content) {
            return {
                ...page,
                glamCss: '',
                ids: []
            };
        } else {
            const styles = renderStaticOptimized(() => content);
            return {
                ...page,
                glamCss: styles.css,
                ids: styles.ids
            };
        }
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
                    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1, user-scalable=no" />
                    <meta name="format-detection" content="telephone=no" />
                    <meta name="theme-color" content="#6400FF" />
                    <meta name="application-name" content="Openland" />
                    <meta name="apple-mobile-web-app-title" content="Openland" />

                    {/* ORDER IS IMPORTANT! */}
                    {/* <link rel="shortcut icon" href="/static/favicon.ico" /> */}
                    <link rel="mask-icon" href="/static/favicon-safari.svg" color="#522BFF" />

                    <link rel="icon" type="image/png" sizes="192x192" href="/static/favicon-192.png" />
                    <link rel="icon" type="image/png" sizes="32x32" href="/static/favicon-32.png" />
                    <link rel="icon" type="image/png" sizes="16x16" href="/static/favicon-16.png" />
                    <link rel="icon" type="image/png" sizes="96x96" href="/static/favicon-96.png" />
                    <link rel="icon" type="image/png" sizes="128x128" href="/static/favicon-128.png" />
                    <link rel="icon" type="image/png" sizes="196x196" href="/static/favicon-196.png" />

                    <link rel="apple-touch-icon" sizes="57x57" href="/static/apple-icon-57.png" />
                    <link rel="apple-touch-icon" sizes="60x60" href="/static/apple-icon-60.png" />
                    <link rel="apple-touch-icon" sizes="72x72" href="/static/apple-icon-72.png" />
                    <link rel="apple-touch-icon" sizes="76x76" href="/static/apple-icon-76.png" />
                    <link rel="apple-touch-icon" sizes="114x114" href="/static/apple-icon-114.png" />
                    <link rel="apple-touch-icon" sizes="120x120" href="/static/apple-icon-120.png" />
                    <link rel="apple-touch-icon" sizes="144x144" href="/static/apple-icon-144.png" />
                    <link rel="apple-touch-icon" sizes="152x152" href="/static/apple-icon-152.png" />
                    <link rel="apple-touch-icon" sizes="180" href="/static/apple-icon-180.png" />

                    <link rel="manifest" href="/static/manifest.json" />

                    <meta name="msapplication-TileColor" content="#6400FF" />
                    <meta name="msapplication-TileImage" content="/static/ms-icon-144.png" />
                    <meta name="msapplication-square70x70logo" content="/static/ms-icon-square-70.png" />
                    <meta name="msapplication-square150x150logo" content="/static/ms-icon-square-150.png" />
                    <meta name="msapplication-square310x310logo" content="/static/ms-icon-square-310.png" />
                    <meta name="msapplication-wide310x150logo" content="/static/ms-icon-wide-310.png" />

                    {/* Styles */}
                    <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
                    <link rel="stylesheet" href="https://api.tiles.mapbox.com/mapbox-gl-js/v0.42.0/mapbox-gl.css" />
                    <link rel="stylesheet" href="/static/css/draft.css" />
                    <link rel="stylesheet" href="/static/css/draft-emoji.css" />
                    <style dangerouslySetInnerHTML={{ __html: this.props.glamCss }} />

                    {/* Scripts */}
                    <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/babel-polyfill/6.23.0/polyfill.min.js" />
                    <script dangerouslySetInnerHTML={{ __html: saveConfig(config) }} />

                    {/* Centry/Raven */}
                    {config.sentryEndpoint && config.release && <script src="https://cdn.ravenjs.com/3.22.1/raven.min.js">{}</script>}
                    {config.sentryEndpoint && config.release && <script dangerouslySetInnerHTML={{ __html: `Raven.config('${config.sentryEndpoint}', { release: '${config.release}' }).install();` }}>{}</script>}
                </Head>
                <body>
                    <Main />
                    <NextScript />
                    <div style={{ position: 'fixed', height: 16, top: 0, width: '100vw', pointerEvents: 'none', zIndex: 100 }} id="progress_container" />
                </body>
            </html>
        );
    }
}