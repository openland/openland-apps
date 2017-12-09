import * as React from 'react';
import { withUserInfo } from './UserInfo';
import { Link } from './Link';
import { withRouter } from '../utils/withRouter';

export class Header extends React.Component<{}, { isShown: boolean }> {
    constructor(props: {}) {
        super(props);

        this.state = {
            isShown: false
        };
    }

    render() {
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

const HeaderNavItems = withUserInfo((props) => {
    return (
        <ul>
            {props.user && (<li className="x-top--item"><span><img src={props.user.picture} alt="" />{props.user.firstName} {' '} {props.user.lastName}</span></li>)}
            {props.user && (<li className="x-top--item is-join"><button onClick={e => {  props.doLogout(); }}>Sign Out</button></li>)}

            {!props.user && (<li className="x-top--item"><button onClick={e => { props.doLogin(); }}>Sign In</button></li>)}
            {!props.user && (<li className="x-top--item is-join"><a target="_blank" href="https://goo.gl/forms/YX8LSpH6jWLzbEj02">Join</a></li>)}
        </ul>
    );
});

export const HeaderLargeNavItems = withUserInfo((props) => {
    return (
        <ul>
            <li className="x-header--item is-block"><Link path="/pipeline">Explore Pipeline</Link></li>

            {props.user && (<li className="x-header--item"><span><img src={props.user.picture} alt="" />{props.user.firstName} {props.user.lastName}</span></li>)}
            {props.user && (<li className="x-header--item is-join"><button onClick={e => { props.doLogout(); }}>Sign Out</button></li>)}
            {!props.user && (<li className="x-header--item"><button onClick={e => { props.doLogin(); }}>Sign In</button></li>)}
            {!props.user && (<li className="x-header--item is-join"><a target="_blank" href="https://goo.gl/forms/YX8LSpH6jWLzbEj02">Join</a></li>)}
        </ul>
    );
});

export class HeaderLarge extends React.Component<{ children: any }, { isShown: boolean }> {
    constructor(props: { children: any }) {
        super(props);

        this.state = {
            isShown: false
        };
    }

    render() {
        return (
            <div className="x-intro">
                <div className="x-container">
                    <div className={'x-header' + (this.state.isShown ? ' is-shown' : '')}>
                        <a className="x-header--logo" href="https://statecraft.one/"><img src="/static/img/logotype.svg" alt="" /></a>
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

export function HeaderLargeTitle(props: { title?: string, children?: any }) {
    return (
        <div className="x-intro--title">{props.title}{props.children}</div>
    );
}

export const HeaderLargeSocial = withRouter((props) => {

    var shareText: string = 'San Francisco Housing Forecast 2017-18 ' + props.router.href + ' #housing #sf';
    var shareUrl: string = props.router.href;

    return (
        <div className="x-intro--tools">
            <form className="x-intro--form" action="https://one.us15.list-manage.com/subscribe/post?u=b588cb73ec7bd801c3b609670&amp;id=c943356ada" method="post">
                <input type="hidden" name="b_b588cb73ec7bd801c3b609670_c943356ada" value="" />

                <input className="x-intro--input" type="email" name="EMAIL" placeholder="Email" />
                <button className="x-intro--button" type="submit">Subscribe to updates</button>
            </form>
            <div className="x-intro--socials">
                <div className="x-intro--label">Share</div>
                <a className="x-intro--social" target="_blank" href={'https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent(shareUrl)}><i className="icon-fb">{}</i></a>
                <a className="x-intro--social" target="_blank" href={'https://twitter.com/intent/tweet?text=' + encodeURIComponent(shareText)}><i className="icon-tw">{}</i></a>
            </div>
        </div>
    );
});