import * as React from 'react';
import { withUser } from '../Components/UserProvider';
import * as A from '../../auth';
import { Link } from '../Components/Link';

export class Header extends React.Component<{}, {isShown: boolean}> {
    constructor (props: {}) {
        super(props);

        this.state = {
            isShown: false
        };
    }

    render () {
        return (
            <div className={'x-top' + (this.state.isShown ? ' is-shown' : '')}>
                <div className="x-container is-wide clearfix">
                    <Link className="x-top--label hidden-xs hidden-sm" path="/">San Francisco Housing Forecast</Link>
                    <Link className="x-top--label visible-xs visible-sm" path="/">SF Housing Forecast</Link>
                    <a className="x-top--open visible-xs" href="#" onClick={(e) => { e.preventDefault(); this.setState({ isShown: !this.state.isShown }); }}>{}</a>
                    <div className="x-top--tabs hidden-xs">
                        <Link className="x-top--tab" path="/">Home</Link>
                        <Link className="x-top--tab is-active" path="/pipeline">Pipeline Explorer</Link>
                    </div>

                    <div className="x-top--nav hidden-xs">
                        <HeaderNavItems />
                    </div>
                </div>

                <div className="x-top--menu">
                    <div className="x-container">
                        <div className="x-top--tabs">
                            <Link className="x-top--tab" path="/">Home</Link>
                            <Link className="x-top--tab is-active" path="/pipeline">Pipeline Explorer</Link>
                        </div>

                        <div className="x-top--nav">
                            <HeaderNavItems />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export const HeaderNavItems = withUser((props) => {
    return (
        <ul>
            {props.user && (<li className="x-top--item"><span><img src={props.user.picture} alt="" />{props.user.firstName} {' '} {props.user.lastName}</span></li>)}
            {props.user && (<li className="x-top--item is-join"><button onClick={e => { e.preventDefault(); A.logout(); }}>Sign Out</button></li>)}

            {!props.user && (<li className="x-top--item"><button onClick={e => { e.preventDefault(); A.login(); }}>Sign In</button></li>)}
            {!props.user && (<li className="x-top--item is-join"><a target="_blank" href="https://goo.gl/forms/YX8LSpH6jWLzbEj02">Join</a></li>)}
        </ul>
    );
});