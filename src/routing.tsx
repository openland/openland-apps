import * as React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { Loader } from 'semantic-ui-react';

import * as A from './auth';
import App from './App/App';

const handleAuthentication = (nextState: { location: { hash: string } }) => {
    if (/access_token|id_token|error/.test(nextState.location.hash)) {
        A.handleAuthentication();
    }
};

function Auth() {
    return (
        <Loader size="big" active={true}/>
    );
}

export default function () {
    return (
        <BrowserRouter>
            <Switch>
                <Redirect exact={true} from="/" to="/app/housing" />
                <Route path="/app" component={App} />
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