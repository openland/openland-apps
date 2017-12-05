import * as React from 'react';

export function HeaderLargeSocial() {
    var shareText: string = 'San Francisco Housing Forecast 2017-18 ' + window.location.href + ' #housing #sf';

    return (
        <div className="x-intro--tools">
            <form className="x-intro--form" action="https://one.us15.list-manage.com/subscribe/post?u=b588cb73ec7bd801c3b609670&amp;id=c943356ada" method="post">
                <input type="hidden" name="b_b588cb73ec7bd801c3b609670_c943356ada" value="" />

                <input className="x-intro--input" type="email" name="EMAIL" placeholder="Email" />
                <button className="x-intro--button" type="submit">Subscribe to updates</button>
            </form>
            <div className="x-intro--socials">
                <div className="x-intro--label">Share</div>
                <a className="x-intro--social" target="_blank" href={'https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent(window.location.href)}><i className="icon-fb">{}</i></a>
                <a className="x-intro--social" target="_blank" href={'https://twitter.com/intent/tweet?text=' + encodeURIComponent(shareText)}><i className="icon-tw">{}</i></a>
            </div>
        </div>
    );
}