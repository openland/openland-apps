import * as React from 'react';
import { withCityQuery } from '../api/';
import { UserProvider } from './Components/UserProvider';
import { withRootLoader } from './Components/withLoader';
import { Dashboard } from './Dashboard/index';
import { Switch } from 'react-router';
import { Route, Redirect } from 'react-router-dom';
import { Pipeline } from './Pipeline';

export default withCityQuery(withRootLoader((props) => {
    return (
        <UserProvider user={props.data.me} account={props.data.account}>
            
                <Switch>
                    <Route exact={true} path="/" component={Dashboard} />
                    <Route path="/db/pipeline" component={Pipeline} />
                    <Redirect to="/404" />
                </Switch>
        </UserProvider>
    );
}));