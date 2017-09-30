import * as React from 'react';
import * as Router from 'react-router';
import * as Edit from './Edit';
import * as View from './View';

export default function () {
    return (
        <Router.Switch>
            <Router.Route path="/findings/edit" component={Edit.default} />
            <Router.Route path="/findings/charts" component={View.default} />
            <Router.Route path="/findings/recomendations" component={View.default} />
            <Router.Route exact={true} path="/findings/" component={View.default} />
            <Router.Redirect to="/404" />
        </Router.Switch>
    );
}