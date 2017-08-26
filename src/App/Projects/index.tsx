import * as React from 'react';
import { Route, Switch, Redirect } from 'react-router';
import View from './View';
import Edit from './Edit';
export default function () {
    return (
        <Switch>
            <Route path="/projects/:projectId/edit" component={Edit} />
            <Route path="/projects/:projectId" component={View} />
            <Redirect to="/" />
        </Switch>
    );
}