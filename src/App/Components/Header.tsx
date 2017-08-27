import * as React from 'react';
import * as Router from 'react-router';
import { withUser } from './UserProvider';
import * as A from '../../auth';
export const Header = Router.withRouter<{ title: string, subtitle?: string }>(withUser((props) => {
    return (
        <header className="st-header">
            {props.subtitle && (
                <div className="st-header--title"><a href="#">{props.title}</a> / {props.subtitle}</div>
            )}
            {!props.subtitle && (
                <div className="st-header--title">{props.title}</div>
            )}
            {props.user && (
                <div className="st-header--auth">
                    <button className="st-btn is-sm is-outline" onClick={() => A.logout()}>Sign Out</button>
                </div>
            )}
            {props.user && (
                <a className="st-header--user" href="#">
                    <img src={props.user.picture} alt="" />{props.user.firstName + ' ' + props.user.lastName} 
                </a>
            )}
            {!props.user && (
                <div className="st-header--auth">
                    <button className="st-btn is-sm" onClick={() => A.login()}>Sign in</button>
                </div>
            )}
        </header>
    );
}));