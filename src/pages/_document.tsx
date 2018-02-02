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
                    {isProduction && <script type="text/javascript" dangerouslySetInnerHTML={{ __html: `(function (d, w, c) { (w[c] = w[c] || []).push(function() { try { w.yaCounter47431468 = new Ya.Metrika2({ id:47431468, clickmap:true, trackLinks:true, accurateTrackBounce:true, webvisor:true }); } catch(e) { } }); var n = d.getElementsByTagName("script")[0], s = d.createElement("script"), f = function () { n.parentNode.insertBefore(s, n); }; s.type = "text/javascript"; s.async = true; s.src = "https://mc.yandex.ru/metrika/tag.js"; if (w.opera == "[object Opera]") { d.addEventListener("DOMContentLoaded", f, false); } else { f(); } })(document, window, "yandex_metrika_callbacks2");` }} >{}</script>}
                    {isProduction && <noscript><div><img src="https://mc.yandex.ru/watch/47431468" style={{ position: 'absolute', left: '-9999px' }} alt="" /></div></noscript>}
                    <Main />
                    <NextScript />
                    <div style={{ position: 'fixed', height: 16, top: 0, width: '100vw', pointerEvents: 'none', zIndex: 100 }} id="progress_container" />
                </body>
            </html>
        );
    }
}