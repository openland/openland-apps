import * as React from 'react';
import { Layout, Button } from 'antd';
import Sidebar from './Sidebar';
// import Homelessness from './Homelessness/Dash'
import HousingHome from './Housing/Home';
import HousingHomeless from './Housing/Homelessness';

import TBD from './UnderDevelopment';
import { Route, RouteComponentProps } from 'react-router-dom';
import * as Auth from '../auth';

function doLogin(): void {
    Auth.login();
}

function doLogout(): void {
    Auth.logout();
}

export default function (props: RouteComponentProps<{}>) {

    return (
        <Layout className="root">
            <Layout.Sider>
                <div className="logo">
                    Statecraft
                </div>
                <div>
                    {
                        !Auth.isAuthenticated() && (
                            <Button onClick={doLogin}>Login</Button>
                        )
                    }
                    {
                        Auth.isAuthenticated() && (
                            <Button onClick={doLogout}>Logout</Button>
                        )
                    }
                </div>
                <Sidebar {...props} />
            </Layout.Sider>
            <Layout>

                {/* Housing */}
                <Route exact={true} path="/stats/housing" component={HousingHome} />
                <Route exact={true} path="/stats/housing/zoning" component={TBD} />
                <Route exact={true} path="/stats/housing/pipeline" component={TBD} />
                <Route exact={true} path="/stats/housing/permits" component={TBD} />
                <Route exact={true} path="/stats/housing/finance" component={TBD} />
                <Route exact={true} path="/stats/housing/policy" component={TBD} />
                <Route exact={true} path="/stats/housing/homelessness" component={HousingHomeless} />

                {/* Pending */}
                <Route exact={true} path="/stats/transport" component={TBD} />
                <Route exact={true} path="/stats/jobs" component={TBD} />
                <Route exact={true} path="/stats/environment" component={TBD} />
                <Route exact={true} path="/stats/utility" component={TBD} />
                <Route exact={true} path="/stats/health" component={TBD} />
                <Route exact={true} path="/stats/education" component={TBD} />
                <Route exact={true} path="/stats/infrastructure" component={TBD} />
                <Route exact={true} path="/stats/safety" component={TBD} />
                <Route exact={true} path="/stats/justice" component={TBD} />
            </Layout>
        </Layout>
    );
}