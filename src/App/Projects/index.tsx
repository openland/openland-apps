import * as React from 'react';
import { Route, Switch, Redirect } from 'react-router';
import View from './View';
export default function () {
    return (
        <Switch>
            <Route path="/projects/:projectId" component={View} />
            <Redirect to="/" />
        </Switch>
    );
}