import * as React from 'react';
import { XContainer } from './X/XContainer';
import { NavigationFooter } from './Navigation';

export class Footer extends React.Component {
    render() {
        return (
            <div className="x-footer">
                <XContainer clearfix={true}>
                    <div className="x-footer--title">
                        <div className="x-footer--logo">
                            <img src="/static/img/logotype.svg" alt=""/>
                        </div>

                        <div className="x-footer--city">San Francisco</div>
                    </div>

                    <NavigationFooter/>

                    <div className="x-footer--box">
                        <form className="x-intro--form"
                              action="https://one.us15.list-manage.com/subscribe/post?u=b588cb73ec7bd801c3b609670&amp;id=c943356ada"
                              method="post">
                            <input type="hidden" name="b_b588cb73ec7bd801c3b609670_c943356ada" value=""/>

                            <input className="x-intro--input" type="email" name="EMAIL" placeholder="Email"/>
                            <button className="x-intro--button" type="submit">Subscribe to updates</button>
                        </form>
                    </div>
                </XContainer>
            </div>
        );
    }
}