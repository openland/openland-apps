import * as React from 'react';
import { Header } from './Header';
import { withComponent } from './withComponent';
import { Icons } from './Icons';

export const Background = withComponent((props) => {
    return <div className="st-page--bg" style={{ backgroundImage: 'url(/img/sf-bg.jpg)' }} />;
});

export const Content = withComponent((props) => {
    return (
        <div className="st-page--wrap">
            <div className="st-box">
                {props.children}
            </div>
        </div>
    );
});

export const Grid = withComponent((props) => {
    return (
        <div className="st-page--grid">
            {props.children}
        </div>
    );
});

export const Column = withComponent((props) => {
    return (
        <div className="st-page--col">
            {props.children}
        </div>
    );
});

export const Row = withComponent((props) => {
    return (
        <div className="st-box in-grid">
            <div className="st-data">
                {props.children}
            </div>
        </div>
    );
});

export const RowTitle = withComponent<{ title: string, icon: Icons }>((props) => {
    return (
        <div className="st-data--title"><i className={'icon-' + props.icon + '-c'}>{}</i>{props.title}</div>
    );
});

export const Page = withComponent<{ title: string }>((props) => {
    return (
        <div className="st-page--box">
            <Header title={props.title} />
            <Background />
            {props.children}
        </div>
    );
});