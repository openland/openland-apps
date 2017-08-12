import * as React from 'react';
import { Route, Switch } from 'react-router-dom';

import City from './City/';
import './Styles.css';

export default function() {
    return (
        <Switch>
            <Route path="/city/:cityId/:projectId" component={City} />
        </Switch>
    );
}