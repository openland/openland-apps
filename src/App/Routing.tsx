import * as React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import Stats from './Stats';
export default function () {
    return (
        <BrowserRouter>
            <Switch>
                <Redirect exact={true} from="/" to="/stats/housing" />
                <Route path="/stats" component={Stats}/>
            </Switch>
        </BrowserRouter>
    );
}