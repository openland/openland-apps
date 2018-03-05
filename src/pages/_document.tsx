import * as React from 'react';
import Document, { Head, Main, NextScript, DocumentProps } from 'next/document';
import { renderStaticOptimized } from 'glamor/server';

let isProduction = process.env.APP_PRODUCTION === 'true';

export default class StateDocument extends Document {
    static async getInitialProps(props: { renderPage: () => { html: string } }) {
        const page = props.renderPage()
        const styles = renderStaticOptimized(() => page.html)
        return { ...page, ...styles }
    }

    constructor(props: DocumentProps) {
        super(props);
        const { __NEXT_DATA__, ids } = props
        if (ids) {
            __NEXT_DATA__.ids = this.props.ids
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
                    <link rel="icon" href="/static/favicon-32.png" sizes="32x32" />
                    <link rel="stylesheet" type="text/css" href="/static/loader.css" />
                    <link rel="stylesheet" href="//fonts.googleapis.com/css?family=Nunito+Sans:300,400,400i,600,700,800" />
                    <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
                    <link rel="stylesheet" href="https://api.tiles.mapbox.com/mapbox-gl-js/v0.42.0/mapbox-gl.css" />

                    <style dangerouslySetInnerHTML={{ __html: this.props.css }} />

                    <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/babel-polyfill/6.23.0/polyfill.min.js" />

                    {isProduction && <script src="https://cdn.ravenjs.com/3.22.1/raven.min.js">{}</script>}
                    {isProduction && <script dangerouslySetInnerHTML={{ __html: `Raven.config('https://29519b8b62b94a1aa77e3329732fe5b2@sentry.io/281742').install();` }}>{}</script>}

                    {isProduction && <script type="text/javascript"
                        dangerouslySetInnerHTML={{ __html: `(function (d, w, c) { (w[c] = w[c] || []).push(function() { try { w.yaCounter47431468 = new Ya.Metrika2({ id:47431468, clickmap:true, trackLinks:true, accurateTrackBounce:true, webvisor:true }); } catch(e) { } }); var n = d.getElementsByTagName("script")[0], s = d.createElement("script"), f = function () { n.parentNode.insertBefore(s, n); }; s.type = "text/javascript"; s.async = true; s.src = "https://mc.yandex.ru/metrika/tag.js"; if (w.opera == "[object Opera]") { d.addEventListener("DOMContentLoaded", f, false); } else { f(); } })(document, window, "yandex_metrika_callbacks2");` }} >{}</script>}
                    {isProduction && <script
                        dangerouslySetInnerHTML={{
                            __html: `(function(e,a){if(!a.__SV){var b=window;try{var c,l,i,j=b.location,g=j.hash;c=function(a,b){return(l=a.match(RegExp(b+"=([^&]*)")))?l[1]:null};g&&c(g,"state")&&(i=JSON.parse(decodeURIComponent(c(g,"state"))),"mpeditor"===i.action&&(b.sessionStorage.setItem("_mpcehash",g),history.replaceState(i.desiredHash||"",e.title,j.pathname+j.search)))}catch(m){}var k,h;window.mixpanel=a;a._i=[];a.init=function(b,c,f){function e(b,a){var c=a.split(".");2==c.length&&(b=b[c[0]],a=c[1]);b[a]=function(){b.push([a].concat(Array.prototype.slice.call(arguments,
0)))}}var d=a;"undefined"!==typeof f?d=a[f]=[]:f="mixpanel";d.people=d.people||[];d.toString=function(b){var a="mixpanel";"mixpanel"!==f&&(a+="."+f);b||(a+=" (stub)");return a};d.people.toString=function(){return d.toString(1)+".people (stub)"};k="disable time_event track track_pageview track_links track_forms register register_once alias unregister identify name_tag set_config reset people.set people.set_once people.unset people.increment people.append people.union people.track_charge people.clear_charges people.delete_user".split(" ");
for(h=0;h<k.length;h++)e(d,k[h]);a._i.push([b,c,f])};a.__SV=1.2;b=e.createElement("script");b.type="text/javascript";b.async=!0;b.src="undefined"!==typeof MIXPANEL_CUSTOM_LIB_URL?MIXPANEL_CUSTOM_LIB_URL:"file:"===e.location.protocol&&"//cdn.mxpnl.com/libs/mixpanel-2-latest.min.js".match(/^\\/\\//)?"https://cdn.mxpnl.com/libs/mixpanel-2-latest.min.js":"//cdn.mxpnl.com/libs/mixpanel-2-latest.min.js";c=e.getElementsByTagName("script")[0];c.parentNode.insertBefore(b,c)}})(document,window.mixpanel||[]);
mixpanel.init("1d672b3dfac9cafe15c17e91b7a1b352");`}}>{}</script>}
                    {isProduction && <script type="text/javascript" dangerouslySetInnerHTML={{ __html: `window.intercomSettings = { app_id: "n7hi8wya" };` }}>{}</script>}
                    {isProduction && <script dangerouslySetInnerHTML={{ __html: `(function(){var w=window;var ic=w.Intercom;if(typeof ic==="function"){ic('reattach_activator');ic('update',intercomSettings);}else{var d=document;var i=function(){i.c(arguments)};i.q=[];i.c=function(args){i.q.push(args)};w.Intercom=i;function l(){var s=d.createElement('script');s.type='text/javascript';s.async=true;s.src='https://widget.intercom.io/widget/n7hi8wya';var x=d.getElementsByTagName('script')[0];x.parentNode.insertBefore(s,x);}if(w.attachEvent){w.attachEvent('onload',l);}else{w.addEventListener('load',l,false);}}})()` }}>{}</script>}
                    <style>
                        {`body {
                            margin:0;
                            padding:0;
                            border:0;
                            outline:0;
                        }`}
                    </style>
                </Head>
                <body>
                    {isProduction && <noscript><div><img src="https://mc.yandex.ru/watch/47431468" style={{ position: 'absolute', left: '-9999px' }} alt="" /></div></noscript>}
                    <Main />
                    <NextScript />
                    <div style={{ position: 'fixed', height: 16, top: 0, width: '100vw', pointerEvents: 'none', zIndex: 100 }} id="progress_container" />
                </body>
            </html>
        );
    }
}