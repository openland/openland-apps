import * as React from 'react';
import { Route } from 'react-router';
import All from './All';
import View from './View';
export default function () {
    return (
        <div>
            <Route exact={true} path="/projects" component={All} />
            <Route path="/projects/:projectId" component={View} />
        </div>
    );
}