import * as React from 'react';
import * as Router from 'react-router';

export const SidebarMenu = Router.withRouter<{ title: string, path?: string }>((props) => {
    if (props.path != null) {
        return (
            <div>
                <a
                    href={props.path}
                    onClick={(event: {}) => {
                        (event as Event).preventDefault();
                        props.history.push(props.path!);
                    }}
                >
                    {props.title}: {(props.location.pathname === props.path).toString()}
                </a>
            </div>
        );
    } else {
        return (
            <div>
                <div>{props.title}: {(props.location.pathname === props.path).toString()}</div>
                <div style={{ paddingLeft: 16 }}>{props.children}</div>
            </div>
        );
    }
});

export const SidebarSubmenu = Router.withRouter<{ title: string, path: string }>((props) => {
    return (
        <a
            href={props.path}
            onClick={(event: {}) => {
                (event as Event).preventDefault();
                props.history.push(props.path!);
            }}
        >
            {props.title}: {(props.location.pathname === props.path).toString()}
        </a>
    );
});