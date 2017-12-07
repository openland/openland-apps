import * as React from 'react';
import { withUser } from '../Components/UserProvider';
import * as A from '../../auth';
import { Link } from '../Components/Link';
export const Header = withUser((props) => {
    return (
        <div className="x-top">
            <div className="x-container is-wide clearfix">
                <Link className="x-top--label hidden-xs hidden-sm" path="/">San Francisco Housing Forecast</Link>
                <Link className="x-top--label visible-xs visible-sm" path="/">SF Housing Forecast</Link>
                <a className="x-top--open visible-xs" href="#">{}</a>
                <div className="x-top--tabs hidden-xs">
                    <Link className="x-top--tab" path="/">Home</Link>
                    <Link className="x-top--tab is-active" path="/pipeline">Pipeline Explorer</Link>
                </div>
                <ul className="x-top--nav hidden-xs">
                    {props.user && (<li className="x-top--item"><span><img src={props.user.picture} alt="" />{props.user.firstName} {' '} {props.user.lastName}</span></li>)}
                    {props.user && (<li className="x-top--item is-join"><button onClick={e => { e.preventDefault(); A.logout(); }}>Sign Out</button></li>)}

                    {!props.user && (<li className="x-top--item"><button onClick={e => { e.preventDefault(); A.login(); }}>Sign In</button></li>)}
                    {!props.user && (<li className="x-top--item is-join"><a target="_blank" href="https://goo.gl/forms/YX8LSpH6jWLzbEj02">Join</a></li>)}
                </ul>
            </div>

            <div className="x-top--menu">
                <div className="x-top--tabs">
                    <Link className="x-top--tab" path="/">Home</Link>
                    <Link className="x-top--tab is-active" path="/pipeline">Pipeline Explorer</Link>
                </div>
                <ul className="x-top--nav">
                    {props.user && (<li className="x-top--item"><span><img src={props.user.picture} alt="" />{props.user.firstName} {' '} {props.user.lastName}</span></li>)}
                    {props.user && (<li className="x-top--item is-join"><button onClick={e => { e.preventDefault(); A.logout(); }}>Sign Out</button></li>)}

                    {!props.user && (<li className="x-top--item"><button onClick={e => { e.preventDefault(); A.login(); }}>Sign In</button></li>)}
                    {!props.user && (<li className="x-top--item is-join"><a target="_blank" href="https://goo.gl/forms/YX8LSpH6jWLzbEj02">Join</a></li>)}
                </ul>
            </div>
        </div>
    );
});