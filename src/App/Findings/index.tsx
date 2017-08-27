import * as React from 'react';
import * as Router from 'react-router';
import * as Edit from './Edit';
import * as View from './View';

export default function () {
    return (
        <Router.Switch>
            <Router.Route path="/findings/edit" component={Edit.default} />
            <Router.Route exact={true} path="/findings/" component={View.default} />
        </Router.Switch>
    );
}