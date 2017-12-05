import * as React from 'react';
import { withCityQuery } from '../api/';
import { UserProvider } from './Components/UserProvider';
import { withRootLoader } from './Components/withLoader';
import { Dashboard } from './Dashboard/index';
import { Switch } from 'react-router';
import { Route, Redirect } from 'react-router-dom';
import { Pipeline } from './Pipeline';
import Obsolete from './Obsolete/';

export default withCityQuery(withRootLoader((props) => {
    return (
        <UserProvider user={props.data.me} account={props.data.account}>
            {props.data.account.generation === 2 && (
                <Switch>
                    <Route exact={true} path="/" component={Dashboard} />
                    <Route path="/db/pipeline" component={Pipeline} />
                    <Redirect to="/404" />
                </Switch>
            )}
            {props.data.account.generation === 1 && (
                <Obsolete />
            )}
            {props.data.account.generation !== 1 && props.data.account.generation !== 2 && (
                <Redirect to="/404" />
            )}
        </UserProvider>
    );
}));