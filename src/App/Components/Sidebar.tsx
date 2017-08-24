import * as React from 'react';
import * as Router from 'react-router';

export const Sidebar = Router.withRouter<{ title: string, subtitle?: string, image: string }>((props) => {
    return (
        <div>
            <img src={props.image} style={{ width: 48, height: 48 }} />
            <div>
                Project: {props.title}

            </div>
            <div>
                City: {props.subtitle}
            </div>
            <div>
                {props.children}
            </div>
        </div>
    );
});