import * as React from 'react';
import Document, { Head, Main, NextScript } from 'next/document';
import '../utils/analytics';

export default class StateDocument extends Document {
    render() {
        return (
            <html>
                <Head>
                    <title>San Francisco Housing Forecast 2017-18</title>
                    <meta name="description" content="An initiative to create the most accurate, transparent, and collaborative assessment of housing production in the city." />
                    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1, user-scalable=no" />
                    <meta name="format-detection" content="telephone=no" />

                    <meta property="og:title" content="San Francisco Housing Forecast 2017-18" />
                    <meta property="og:url" content="https://sf.statecraft.one" />
                    <meta property="og:description" content="An initiative to create the most accurate, transparent, and collaborative assessment of housing production in the city." />
                    <meta property="og:image" content="https://sf.statecraft.one/img/x-pipeline--list.png" />

                    <meta name="theme-color" content="#000000"/>
                    <link rel="shortcut icon" href="/static/favicon.ico" />
                    <link rel="stylesheet" type="text/css" href="https://unpkg.com/nprogress@0.2.0/nprogress.css" />
                    <link rel="stylesheet" href="//fonts.googleapis.com/css?family=Nunito+Sans:300,400,400i,600,700,800" />
                    <link rel="stylesheet" type="text/css" href="/static/css/style.css" />
                    <script type="text/javascript" src="/config.js">{}</script>
                </Head>
                <body className="custom_class">
                    <Main />
                    <NextScript />
                </body>
            </html>
        );
    }
}