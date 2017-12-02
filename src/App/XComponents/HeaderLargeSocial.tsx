import * as React from 'react';

export function HeaderLargeSocial() {
    return (
        <div className="sf-intro--tools">
            <form className="sf-intro--form" method="POST" action="">
                <input className="sf-intro--input" type="text" placeholder="Email" />
                <button className="sf-intro--button" type="submit">Subscribe to updates</button>
            </form>
            <div className="sf-intro--socials">
                <div className="sf-intro--label">Share</div>
                <a className="sf-intro--social" href="#"><i className="icon-fb">{}</i></a>
                <a className="sf-intro--social" href="#"><i className="icon-tw">{}</i></a>
            </div>
        </div>
    );
}