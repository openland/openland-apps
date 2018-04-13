import * as React from 'react';
import Document, { Head, Main, NextScript, DocumentProps } from 'next/document';
import { renderStaticOptimized } from 'glamor/server';

let isProduction = process.env.APP_PRODUCTION === 'true';

export default class StateDocument extends Document {
    static async getInitialProps(props: { renderPage: () => { html: string } }) {
        const page = props.renderPage();
        const styles = renderStaticOptimized(() => page.html);
        return { ...page, ...styles };
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
                    <meta name="theme-color" content="#000000" />
                    <link rel="shortcut icon" href="/static/favicon.ico" />

                    <link rel="icon" type="image/png" sizes="16x16" href="/static/favicon-16.png" />
                    <link rel="icon" type="image/png" sizes="32x32" href="/static/favicon-32.png" />
                    <link rel="icon" type="image/png" sizes="96x96" href="/static/favicon-96.png" />
                    <link rel="icon" type="image/png" sizes="192x192" href="/static/android-icon-192.png" />

                    <link rel="apple-touch-icon" sizes="57x57" href="/static/apple-icon-57.png" />
                    <link rel="apple-touch-icon" sizes="60x60" href="/static/apple-icon-60.png" />
                    <link rel="apple-touch-icon" sizes="72x72" href="/static/apple-icon-72.png" />
                    <link rel="apple-touch-icon" sizes="76x76" href="/static/apple-icon-76.png" />
                    <link rel="apple-touch-icon" sizes="114x114" href="/static/apple-icon-114.png" />
                    <link rel="apple-touch-icon" sizes="120x120" href="/static/apple-icon-120.png" />
                    <link rel="apple-touch-icon" sizes="144x144" href="/static/apple-icon-144.png" />
                    <link rel="apple-touch-icon" sizes="152x152" href="/static/apple-icon-152.png" />
                    <link rel="apple-touch-icon" sizes="180" href="/static/apple-icon-180.png" />

                    <link rel="stylesheet" type="text/css" href="/static/loader.css" />
                    <link rel="stylesheet" href="//fonts.googleapis.com/css?family=Nunito+Sans:300,400,400i,600,700,800" />
                    <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
                    <link rel="stylesheet" href="https://api.tiles.mapbox.com/mapbox-gl-js/v0.42.0/mapbox-gl.css" />

                    <style dangerouslySetInnerHTML={{ __html: this.props.css }} />
                    <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/babel-polyfill/6.23.0/polyfill.min.js" />
                    <script dangerouslySetInnerHTML={{ __html: 'window.isProduction=' + isProduction + ';' }} />

                    {/* Centry/Raven */}
                    {isProduction && <script src="https://cdn.ravenjs.com/3.22.1/raven.min.js">{}</script>}
                    {isProduction && <script dangerouslySetInnerHTML={{ __html: `Raven.config('https://29519b8b62b94a1aa77e3329732fe5b2@sentry.io/281742').install();` }}>{}</script>}

                    {/* Intercom */}
                    {isProduction && <script type="text/javascript" dangerouslySetInnerHTML={{ __html: `window.intercomSettings = { app_id: "n7hi8wya" };` }}>{}</script>}
                    {isProduction && <script dangerouslySetInnerHTML={{ __html: `(function(){var w=window;var ic=w.Intercom;if(typeof ic==="function"){ic('reattach_activator');ic('update',intercomSettings);}else{var d=document;var i=function(){i.c(arguments)};i.q=[];i.c=function(args){i.q.push(args)};w.Intercom=i;function l(){var s=d.createElement('script');s.type='text/javascript';s.async=true;s.src='https://widget.intercom.io/widget/n7hi8wya';var x=d.getElementsByTagName('script')[0];x.parentNode.insertBefore(s,x);}if(w.attachEvent){w.attachEvent('onload',l);}else{w.addEventListener('load',l,false);}}})()` }}>{}</script>}
                    <style>
                        {`html {
                            font-style: normal;
                            font-weight: normal;
                            font-variant: normal;
                            font-size: 14px;
                            line-height: 20px;
                            font-family: Nunito Sans, arial, sans-serif;
                            -webkit-text-size-adjust: 100%;
                            -webkit-font-smoothing: antialiased;
                            -moz-font-smoothing: antialiased;
                            -ms-font-smoothing: antialiased;
                            -o-font-smoothing: antialiased;
                            -webkit-box-sizing: border-box;
                            -moz-box-sizing: border-box;
                        }
                        body, body * {
                            margin: 0;
                            padding: 0;
                            border: 0;
                            outline: 0;
                            font-size: 100%;
                            vertical-align: baseline;
                            background: transparent;
                            text-decoration: none;
                            box-sizing: border-box;
                        }
                        body {
                            background: #F5F6F8;
                        }
                        body.ReactModal__Body--open {
                            overflow: hidden;
                        }
                        input, textarea, button {
                            font-family: Nunito Sans, arial, sans-serif;
                        }
                        input, select { 
                            vertical-align:middle; 
                        }
                        a {
                            color: inherit;
                            text-decoration: none;
                        }
                        a:hover {
                            color: #6B50FF;
                        }
                        sub, sup { font-size:75%; line-height:0; position:relative; }
                        sup { top:-0.5em; }
                        sub { bottom:-0.25em; }
                        `}
                    </style>
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