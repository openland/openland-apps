import * as React from 'react';
import { Switch, Redirect, Route } from 'react-router';
import Permits from './Permits/';
export default function () {
    return (
        <Switch>
            <Route path="/db/permits" component={Permits} />
            <Redirect to="/db/permits" />
        </Switch>
    );
}