import * as React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import Stats from './Stats';
import Auth from './Auth';
import * as A from '../auth';

const handleAuthentication = (nextState: { location: { hash: string } }) => {
    if (/access_token|id_token|error/.test(nextState.location.hash)) {
        A.handleAuthentication();
    }
};

export default function () {
    return (
        <BrowserRouter>
            <Switch>
                <Redirect exact={true} from="/" to="/stats/housing" />
                <Route path="/stats" component={Stats} />
                <Route
                    path="/auth_complete"
                    render={(props) => {
                        handleAuthentication(props);
                        return (
                            <Auth />
                        );
                    }}
                />
            </Switch>
        </BrowserRouter>
    );
}