import * as React from 'react';
import { XLink } from './X/XLink';
import { withRouter } from '../utils/withRouter';
import { XContainer } from './X/XContainer';
import { AuthenticationControlls } from './Login';
import { Navigation, NavigationHome } from './Navigation';

export class Header extends React.Component<{}, { isShown: boolean }> {
    constructor(props: {}) {
        super(props);

        this.state = {
            isShown: false
        };
    }

    render() {
        return (
            <div className={'x-header is-top' + (this.state.isShown ? ' is-shown' : '')}>
                <XContainer wide={true} clearfix={true}>
                    <div className="x-header--wrap">
                        <XLink className="x-header--label" path="/">San Francisco</XLink>

                        <a className="x-header--open visible-xs" href="#" onClick={(e) => {
                            e.preventDefault();
                            this.setState({isShown: !this.state.isShown});
                        }}>{}</a>

                        <div className="x-header--nav hidden-xs">
                            <Navigation/>
                        </div>

                        <div className="x-header--auth hidden-xs">
                            <AuthenticationControlls/>
                        </div>
                    </div>
                </XContainer>

                <div className="x-header--menu">
                    <div className="x-header--nav">
                        <Navigation/>
                    </div>

                    <div className="x-header--auth">
                        <AuthenticationControlls/>
                    </div>
                </div>
            </div>
        );
    }
}

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
                <div className={'x-header' + (this.state.isShown ? ' is-shown' : '')}>
                    <XContainer>
                        <div className="x-header--wrap">
                            <a className="x-header--logo" href="https://statecraft.one/">
                                <img src="/static/img/logotype.svg" alt=""/>
                            </a>

                            <a className="x-header--open visible-xs" href="#" onClick={(e) => {
                                e.preventDefault();
                                this.setState({isShown: !this.state.isShown});
                            }}>{}</a>

                            <div className="x-header--nav hidden-xs">
                                <NavigationHome/>
                            </div>

                            <div className="x-header--auth hidden-xs">
                                <AuthenticationControlls/>
                            </div>

                            <div className="x-header--menu">
                                <div className="x-header--nav">
                                    <NavigationHome/>
                                </div>

                                <div className="x-header--auth">
                                    <AuthenticationControlls/>
                                </div>
                            </div>
                        </div>
                    </XContainer>
                </div>

                <XContainer>
                    <div className="x-intro--wrap">
                        <div className="x-intro--in">
                            {this.props.children}
                        </div>
                        <div className="x-intro--city">
                            <img src="/static/img/intro-city.svg" alt="" />
                        </div>
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

export function HeaderLargeText(props: { title?: string, children?: any }) {
    return (
        <div className="x-intro--text">{props.title}{props.children}</div>
    );
}

export function HeaderLargeBox(props: { children?: any }) {
    return (
        <div className="x-intro--box">{props.children}</div>
    );
}

export const HeaderLargeForm = withRouter((props) => {

    // let shareText: string = 'San Francisco Housing Forecast 2017-18 ' + props.router.href + ' #housing #sf';
    // let shareUrl: string = props.router.href;

    return (
        <form className="x-intro--form"
                action="https://one.us15.list-manage.com/subscribe/post?u=b588cb73ec7bd801c3b609670&amp;id=c943356ada"
                method="post">
            <input type="hidden" name="b_b588cb73ec7bd801c3b609670_c943356ada" value=""/>

            <input className="x-intro--input" type="email" name="EMAIL" placeholder="Email"/>
            <button className="x-intro--button" type="submit">Subscribe to updates</button>
        </form>
    );
});