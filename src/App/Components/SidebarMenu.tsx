import * as React from 'react';
import * as Router from 'react-router';
import { Icons } from './Icons';
export interface SidebarMenuProps {
    title: string;
    icon: Icons;
    path: string;
    defaultPath?: string;
    expanded?: boolean;
}

export const SidebarMenu = Router.withRouter<SidebarMenuProps>((props) => {
    var isActive = props.location.pathname === props.path;
    var path = props.path;
    if (React.Children.count(props.children) !== 0) {
        isActive = isActive || props.location.pathname.startsWith(props.path);
        if (props.defaultPath != null) {
            path = props.defaultPath;
        }
    }

    var style = 'st-side--item';
    if (isActive) {
        style += ' is-active';
    }

    if (props.expanded) {
        style += ' is-expanded';
    }

    return (
        <li className={style}>
            <a
                className="st-side--link"
                href={path}
                onClick={(event: {}) => {
                    (event as Event).preventDefault();
                    props.history.push(path);
                }}
            >
                <i className={'icon-' + props.icon}>{}</i>{props.title}
            </a>
            {React.Children.count(props.children) !== 0 && (
                <ul className="st-side--sub">
                    {props.children}
                </ul>
            )}
        </li>
    );
});

export const SidebarSubmenu = Router.withRouter<{ title: string, path: string }>((props) => {

    var isActive = props.location.pathname === props.path;
    var style = '';
    if (isActive) {
        style = 'is-active';
    }

    return (
        <li className={style}>
            <a
                href={props.path}
                onClick={(event: {}) => {
                    (event as Event).preventDefault();
                    props.history.push(props.path!);
                }}
            >
                {props.title}
            </a>
        </li>
    );
});