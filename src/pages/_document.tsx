import * as React from 'react';
import Document, { Head, Main, NextScript } from 'next/document';

let isProduction = process.env.APP_PRODUCTION === 'true';

export default class StateDocument extends Document {
    render() {
        return (
            <html>
                <Head>
                    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1, user-scalable=no" />
                    <meta name="format-detection" content="telephone=no" />
                    <meta name="theme-color" content="#000000" />
                    <link rel="shortcut icon" href="/static/favicon.ico" />
                    <link rel="stylesheet" type="text/css" href="/static/loader.css" />
                    <link rel="stylesheet" type="text/css" href="/static/css/style.min.css?6" />
                    <link rel="stylesheet" href="//fonts.googleapis.com/css?family=Nunito+Sans:300,400,400i,600,700,800" />
                    <link rel="stylesheet" href="https://api.tiles.mapbox.com/mapbox-gl-js/v0.42.0/mapbox-gl.css" />
                    {isProduction && (<script src="https://cdn.ravenjs.com/3.22.1/raven.min.js">{}</script>)}
                    {isProduction && (<script dangerouslySetInnerHTML={{ __html: `Raven.config('https://29519b8b62b94a1aa77e3329732fe5b2@sentry.io/281742').install();` }}>{}</script>)}
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