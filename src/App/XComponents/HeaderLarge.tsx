import * as React from 'react';
import { withUser } from '../Components/UserProvider';
import { Link } from '../Components/Link';
import * as A from '../../auth';


export class HeaderLarge extends React.Component<{children: any}, {isShown: boolean}> {
    constructor (props: {children: any}) {
        super(props);

        this.state = {
            isShown: false
        };
    }

    render () {
        return (
            <div className="x-intro">
                <div className="x-container">
                    <div className={'x-header' + (this.state.isShown ? ' is-shown' : '')}>
                        <a className="x-header--logo" href="https://statecraft.one/"><img src="/img/logotype.svg" alt="" /></a>
                        <a className="x-header--open visible-xs" href="#" onClick={(e) => { e.preventDefault(); this.setState({ isShown: !this.state.isShown }); }}>{}</a>

                        <div className="x-header--nav hidden-xs">
                            <HeaderLargeNavItems />
                        </div>

                        <div className="x-header--menu">
                            <div className="x-header--nav">
                                <HeaderLargeNavItems />
                            </div>
                        </div>
                    </div>
                    <div className="x-intro--in">
                        {this.props.children}
                    </div>
                </div>
            </div>
        );
    }
}

export const HeaderLargeNavItems = withUser((props) => {
    return (
        <ul>
            <li className="x-header--item is-block"><Link path="/pipeline">Explore Pipeline</Link></li>

            {props.user && (<li className="x-header--item"><span><img src={props.user.picture} alt="" />{props.user.firstName} {props.user.lastName}</span></li>)}
            {props.user && (<li className="x-header--item is-join"><button onClick={e => { e.preventDefault(); A.logout(); }}>Sign Out</button></li>)}
            {!props.user && (<li className="x-header--item"><button onClick={e => { e.preventDefault(); A.login(); }}>Sign In</button></li>)}
            {!props.user && (<li className="x-header--item is-join"><a target="_blank" href="https://goo.gl/forms/YX8LSpH6jWLzbEj02">Join</a></li>)}
        </ul>
    );
});