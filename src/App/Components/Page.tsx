import * as React from 'react';
import * as Router from 'react-router';
import { Header } from './Header';

export const Background = Router.withRouter((props) => {
    return <div className="st-page--bg" style={{ backgroundImage: 'url(/img/sf-bg.jpg)' }} />;
});

export const Content = Router.withRouter((props) => {
    return (
        <div className="st-page--wrap">
            <div className="st-box">
                {props.children}
            </div>
        </div>
    );
});

export const Page = Router.withRouter<{ title: string }>((props) => {
    return (
        <div className="st-page--box">
            <Header title={props.title} />
            <Background />
            <Content>
                {props.children}
            </Content>
        </div>
    );
});