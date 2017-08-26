import * as React from 'react';
import * as Router from 'react-router';
import { User } from '../../api/';

export const Header = Router.withRouter<{ title: string, subtitle?: string, me?: User }>((props) => {
    if (props.subtitle != null) {
        return (
            <header className="st-header">
                <div className="st-header--title"><a href="#">{props.title}</a> / {props.subtitle}</div>
            </header>
        );
    } else {
        return (
            <header className="st-header">
                <div className="st-header--title">{props.title}</div>
            </header>
        );
    }
});