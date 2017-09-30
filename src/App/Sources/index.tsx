import * as React from 'react';
import * as Router from 'react-router';
import * as All from './All';
import * as Create from './Create';
export default function () {
    return (
        <Router.Switch>
            <Router.Route path="/sources/new" component={Create.default} />
            <Router.Route exact={true} path="/sources" component={All.default} />
            <Router.Redirect to="/404" />
        </Router.Switch>
    );
}