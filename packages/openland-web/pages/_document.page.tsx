import * as React from 'react';
import Document, { Head, Main, NextScript, DocumentProps, NextDocumentContext } from 'next/document';
import { renderStaticOptimized } from 'glamor/server';

let isProduction = process.env.APP_PRODUCTION === 'true';

export default class StateDocument extends Document {
    static async getInitialProps(props: NextDocumentContext) {
        // Link: </assets/css/screen.css?v=5fc240c512>; rel=preload; as=style,<//cdn.bizible.com/scripts/bizible.js>; rel=preload; as=script,</content/images/2016/06/Timeouts-001.png>; rel=preload; as=image,</content/images/2016/06/Timeouts-002.png>; rel=preload; as=image,<//platform.linkedin.com/in.js>; rel=preload; as=script,<https://code.jquery.com/jquery-1.11.3.min.js>; rel=preload; as=script,</assets/js/jquery.fitvids.js?v=5fc240c512>; rel=preload; as=script
        // if (!props.res!!.headersSent) {
        //     props.res!!.setHeader('Link', '</static/loader.css>; rel=preload; as=style');
        // }
        const page = props.renderPage();
        const styles = renderStaticOptimized(() => page.html || page.errorHtml);
        return {
            ...page,
            glamCss: styles.css,
            ids: styles.ids
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

                    <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
                    <link rel="stylesheet" href="https://api.tiles.mapbox.com/mapbox-gl-js/v0.42.0/mapbox-gl.css" />

                    <style dangerouslySetInnerHTML={{ __html: this.props.glamCss }} />
                    <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/babel-polyfill/6.23.0/polyfill.min.js" />
                    <script dangerouslySetInnerHTML={{ __html: 'window.isProduction=' + isProduction + ';' }} />

                    {/* Centry/Raven */}
                    {isProduction && <script src="https://cdn.ravenjs.com/3.22.1/raven.min.js">{}</script>}
                    {isProduction && <script dangerouslySetInnerHTML={{ __html: `Raven.config('https://29519b8b62b94a1aa77e3329732fe5b2@sentry.io/281742').install();` }}>{}</script>}

                    {/* Intercom */}
                    {isProduction && <script type="text/javascript" dangerouslySetInnerHTML={{ __html: `window.intercomSettings = { app_id: "n7hi8wya" };` }}>{}</script>}
                    {isProduction && <script dangerouslySetInnerHTML={{ __html: `(function(){var w=window;var ic=w.Intercom;if(typeof ic==="function"){ic('reattach_activator');ic('update',intercomSettings);}else{var d=document;var i=function(){i.c(arguments)};i.q=[];i.c=function(args){i.q.push(args)};w.Intercom=i;function l(){var s=d.createElement('script');s.type='text/javascript';s.async=true;s.src='https://widget.intercom.io/widget/n7hi8wya';var x=d.getElementsByTagName('script')[0];x.parentNode.insertBefore(s,x);}if(w.attachEvent){w.attachEvent('onload',l);}else{w.addEventListener('load',l,false);}}})()` }}>{}</script>}

                    {/* Uploadcare */}
                    <script dangerouslySetInnerHTML={{ __html: 'UPLOADCARE_PUBLIC_KEY = \'b70227616b5eac21ba88\'' }} />
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