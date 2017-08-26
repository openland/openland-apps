import * as React from 'react';
import * as Router from 'react-router';

export const Sidebar = Router.withRouter<{ title: string, subtitle?: string, image: string }>((props) => {
    return (
        <div className="st-side">
            <div className="st-side--logo">
                <img src={props.image}/></div>
            <div className="st-side--title">{props.title}</div>
            <div className="st-side--text">{props.subtitle}</div>
            <ul className="st-side--nav">
                {props.children}
            </ul>
            <a className="st-side--powered" href="https://statecraft.one"><span>Powered by</span> Statecraft</a>
        </div>
    );
});