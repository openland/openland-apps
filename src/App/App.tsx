import * as React from 'react';
import { Route, RouteComponentProps } from 'react-router-dom';
import { ApolloProvider } from 'react-apollo';

// import { Layout, Button } from 'antd';

// import * as Auth from '../auth';
import * as api from '../api';

// import Sidebar from './Sidebar';
import Navigation from './Navigation';
import TBD from './Pages/UnderDevelopment';
import HousingHome from './Housing/Home';
import HousingHomeless from './Housing/Homelessness';

// function doLogin(): void {
//     Auth.login();
// }

// function doLogout(): void {
//     Auth.logout();
// }

export default function (props: RouteComponentProps<{}>) {

    return (
        <ApolloProvider client={api.default}>
            <div className="root">
                 <Navigation/>
                 {/* Housing */}
                    <Route exact={true} path="/app/housing" component={HousingHome} />
                    <Route exact={true} path="/app/housing/zoning" component={TBD} />
                    <Route exact={true} path="/app/housing/pipeline" component={TBD} />
                    <Route exact={true} path="/app/housing/permits" component={TBD} />
                    <Route exact={true} path="/app/housing/finance" component={TBD} />
                    <Route exact={true} path="/app/housing/policy" component={TBD} />
                    <Route exact={true} path="/app/housing/homelessness" component={HousingHomeless} />

                    {/* Pending */}
                    <Route exact={true} path="/app/transport" component={TBD} />
                    <Route exact={true} path="/app/jobs" component={TBD} />
                    <Route exact={true} path="/app/environment" component={TBD} />
                    <Route exact={true} path="/app/utility" component={TBD} />
                    <Route exact={true} path="/app/health" component={TBD} />
                    <Route exact={true} path="/app/education" component={TBD} />
                    <Route exact={true} path="/app/infrastructure" component={TBD} />
                    <Route exact={true} path="/app/safety" component={TBD} />
                    <Route exact={true} path="/app/justice" component={TBD} />
            </div>
            {/* <Layout className="root">

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
                    <Navigation/>
                                    
                </Layout>
            </Layout> */}
        </ApolloProvider>
    );
}