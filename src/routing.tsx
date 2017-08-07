import * as React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { Loader } from 'semantic-ui-react';
import { ApolloProvider } from 'react-apollo';
import * as api from './api';

import * as A from './auth';
import City from './App/City';

const handleAuthentication = (nextState: { location: { hash: string } }) => {
    if (/access_token|id_token|error/.test(nextState.location.hash)) {
        A.handleAuthentication();
    }
};

function Auth() {
    return (
        <Loader size="big" active={true} />
    );
}

export default function () {
    return (
        <ApolloProvider client={api.default}>
            <BrowserRouter>
                <Switch>
                    <Redirect exact={true} from="/" to="/city/sf/housing" />
                    <Route path="/city/:city" component={City} />
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
        </ApolloProvider>
    );
}