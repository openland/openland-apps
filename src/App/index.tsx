import * as React from 'react';
import { withCityQuery } from '../api/';
import { Page } from './XComponents/Page';
import { UserProvider } from './Components/UserProvider';
import { withRootLoader } from './Components/withLoader';
import { Dashboard } from './Dashboard/index';

export default withCityQuery(withRootLoader((props) => {
    return (
        <UserProvider user={props.data.me} account={props.data.account}>
            <Page>
                <Dashboard />
            </Page>
        </UserProvider>
    );
}));