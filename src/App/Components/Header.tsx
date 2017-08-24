import * as React from 'react';
import * as Router from 'react-router';
import { User } from '../../api/';

export const Header = Router.withRouter<{ title: string, subtitle?: string, me?: User }>((props) => {
    return (
        <div>
            {props.title}
            {props.subtitle && <span>/{props.subtitle}</span>}
        </div>
    );
});