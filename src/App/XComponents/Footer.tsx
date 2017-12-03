import * as React from 'react';

export function Footer() {
    return (
        <div className="x-footer">
            <div className="x-container">
                <div className="x-footer--title">San Francisco Housing Forecast 2017-18</div>
                <div className="x-footer--powered">Powered by Statecraft</div>
                <div className="x-intro--tools">
                    <form className="x-intro--form" method="POST" action="">
                        <input className="x-intro--input" type="text" placeholder="Email" />
                        <button className="x-intro--button" type="submit">Subscribe to updates</button>
                    </form>
                    <div className="x-intro--socials">
                        <div className="x-intro--label">Share</div>
                        <a className="x-intro--social" href="#"><i className="icon-fb">{}</i></a>
                        <a className="x-intro--social" href="#"><i className="icon-tw">{}</i></a>
                    </div>
                </div>
            </div>
        </div>
    );
}