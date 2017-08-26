import * as React from 'react';
import * as Router from 'react-router';
import * as All from './All';
export default function () {
    
    return (
        <Router.Switch>
            <Router.Route exact={true} path="/sources" component={All.default} />
        </Router.Switch>
    );
}