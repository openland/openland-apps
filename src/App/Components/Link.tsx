import * as React from 'react';
import { withRouter } from 'react-router';

export const Link = withRouter<{ path: string, className?: string }>((props) => (
    <a
        href={props.path}
        onClick={(e: React.MouseEvent<{}>) => {
            e.preventDefault();
            props.history.push(props.path);
        }}
        className={props.className}
    >
        {props.children}
    </a>
));