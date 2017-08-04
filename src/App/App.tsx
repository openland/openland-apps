import * as React from 'react';
import { Route, RouteComponentProps } from 'react-router-dom';

import { ApolloProvider } from 'react-apollo';
import * as api from '../api';

import AppHeader from './AppHeader';
import HousingHome from './Housing/Home';

export default function (props: RouteComponentProps<{}>) {
    return (
        <ApolloProvider client={api.default}>
            <div className="root">
                <AppHeader />
                <Route exact={true} path="/app/housing" component={HousingHome} />
            </div>
        </ApolloProvider>
    );
}