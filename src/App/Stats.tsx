import * as React from 'react'
import { Layout } from 'antd'
import Sidebar from './Sidebar'
// import Homelessness from './Homelessness/Dash'
import HousingHome from './Housing/Home'
import HousingHomeless from './Housing/Homelessness'

import TBD from './UnderDevelopment'
import { Route, RouteComponentProps } from 'react-router-dom'
export default function (props:RouteComponentProps<any>) {
    return (
        <Layout className="root">
            <Layout.Sider>
                <div className="logo">
                    Statecraft
                </div>
                <Sidebar {...props}/>
            </Layout.Sider>
            <Layout>
                
                {/* Housing */}
                <Route exact path="/stats/housing" component={HousingHome} />
                <Route exact path="/stats/housing/zoning" component={TBD} />
                <Route exact path="/stats/housing/pipeline" component={TBD} />
                <Route exact path="/stats/housing/permits" component={TBD} />
                <Route exact path="/stats/housing/finance" component={TBD} />
                <Route exact path="/stats/housing/policy" component={TBD} />
                <Route exact path="/stats/housing/homelessness" component={HousingHomeless} />

                {/* Pending */}
                <Route exact path="/stats/transport" component={TBD} />
                <Route exact path="/stats/jobs" component={TBD} />
                <Route exact path="/stats/environment" component={TBD} />
                <Route exact path="/stats/utility" component={TBD} />
                <Route exact path="/stats/health" component={TBD} />
                <Route exact path="/stats/education" component={TBD} />
                <Route exact path="/stats/infrastructure" component={TBD} />
                <Route exact path="/stats/safety" component={TBD} />
                <Route exact path="/stats/justice" component={TBD} />
            </Layout>
        </Layout>
    )
}