import * as React from 'react';

export function Header() {
    return (
        <div className="sf-top">
            <div className="container clearfix"><a className="sf-top--label" href="#">San Francisco Housing Forecast</a>
                <div className="sf-top--tabs"><a className="sf-top--tab is-active" href="#">Dashboard</a><a className="sf-top--tab" href="#">Pipeline Explorer</a></div>
                <ul className="sf-top--nav">
                    <li className="sf-top--item"><a href="#"><img src="http://placehold.it/28" />Yury Lifshits</a></li>
                    <li className="sf-top--item"><a href="#">Sign In</a></li>
                    <li className="sf-top--item is-join"><a href="#">Join</a></li>
                </ul>
            </div>
        </div>
    );
}