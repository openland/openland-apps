import * as React from 'react';
import { XLink } from './X/XLink';
import { withRouter } from '../utils/withRouter';
import { XContainer } from './X/XContainer';
import { AuthenticationControlls } from './Login';
import { Navigation } from './Navigation';

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
                <XContainer wide={true} clearfix={true}>
                    <XLink className="x-top--label hidden-xs hidden-sm" path="/">San Francisco Housing Forecast</XLink>
                    <XLink className="x-top--label visible-xs visible-sm" path="/">SF Housing Forecast</XLink>
                    <a className="x-top--open visible-xs" href="#" onClick={(e) => { e.preventDefault(); this.setState({ isShown: !this.state.isShown }); }}>{}</a>
                    <div className="x-top--tabs hidden-xs">
                        <Navigation />
                    </div>

                    <div className="x-top--nav hidden-xs">
                        <HeaderNavItems />
                    </div>
                </XContainer>

                <div className="x-top--menu">
                    <XContainer>
                        <div className="x-top--tabs">
                            <Navigation />
                        </div>

                        <div className="x-top--nav">
                            <HeaderNavItems />
                        </div>
                    </XContainer>
                </div>
            </div>
        );
    }
}

const HeaderNavItems = () => {
    return (
        <ul>
            <AuthenticationControlls className="x-top--item" />
        </ul>
    );
};

const HeaderLargeNavItems = () => {
    return (
        <ul>
            <li className="x-header--item is-block"><XLink path="/pipeline">Explore Pipeline</XLink></li>

            <AuthenticationControlls className="x-header--item" />
        </ul>
    );
};

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
                <XContainer>
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
                </XContainer>
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