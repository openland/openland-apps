import * as React from 'react';

export function Header() {
    return (
        <div className="x-top">
            <div className="x-container clearfix">
                <a className="x-top--label" href="#">San Francisco Housing Forecast</a>
                <div className="x-top--tabs">
                    <a className="x-top--tab is-active" href="#">Dashboard</a>
                    <a className="x-top--tab" href="#">Pipeline Explorer</a>
                </div>
                <ul className="x-top--nav">
                    <li className="x-top--item"><span><img src="http://placehold.it/28" />Yury Lifshits</span></li>
                    <li className="x-top--item"><button>Sign In</button></li>
                    <li className="x-top--item is-join"><button>Join</button></li>
                </ul>
            </div>
        </div>
    );
}