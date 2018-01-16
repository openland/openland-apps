import * as React from 'react';
import { withRouter } from '../utils/withRouter';
import { XContainer } from './X/XContainer';
import { XLink } from './X/XLink';
import { Header } from './Header';

export class Intro extends React.Component<{ children: any }, { isShown: boolean }> {
    constructor(props: { children: any }) {
        super(props);

        this.state = {
            isShown: false
        };
    }

    render() {
        return (
            <div className="x-intro">
                <Header home={true} />

                <XContainer wide={true}>
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

export function IntroTitle(props: { title?: string, children?: any }) {
    return (
        <div className="x-intro--title">
            {props.title}
            {props.children}
        </div>
    );
}

export function IntroCols(props: { children?: any }) {
    return (
        <div className="x-intro--cols">
            {props.children}
        </div>
    );
}

export function IntroCol(props: { title?: string, children?: any }) {
    return (
        <div className="x-intro--col">
            <div className="x-intro--ctitle">{props.title}</div>

            {props.children}
        </div>
    );
}

export function IntroLink(props: { counter?: number, label?: string, title?: string, path?: string, href?: string }) {
    return (
        <div className="x-intro--link">
            {props.title && (<XLink path={props.path} href={props.href}>{props.title}</XLink>)}

            {props.counter && (<XLink path={props.path} href={props.href}>
                {props.counter.toString().replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1,')}
                {' ' + props.label}
            </XLink>)}
        </div>
    );
}

export function IntroBox(props: { children?: any }) {
    return (
        <div className="x-intro--box">
            {props.children}
        </div>
    );
}

export const IntroForm = withRouter((props) => {

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