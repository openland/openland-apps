import * as React from 'react';
import * as Router from 'react-router';

export const Button = Router.withRouter<{ path: string, className?: string, activeClassName?: string }>((props) => {
    var className = props.className;
    if (props.path === props.location.pathname) {
        if (props.activeClassName != null) {
            if (props.className != null) {
                className = props.className + ' ' + props.activeClassName;
            } else {
                className = props.activeClassName;
            }
        }
    }
    
    return (
        <a className={className} onClick={(e) => { e.preventDefault(); props.history.push(props.path); }} href={props.path} >
            {props.children}
        </a>);
});