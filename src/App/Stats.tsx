import * as React from 'react'
import { Layout } from 'antd'
import Sidebar from './Sidebar'
import Homelessness from './Homelessness/Dash'
import Housing from './Housing/Dash'
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
                <Layout.Header>
                    
                </Layout.Header>
                <Route path="/stats/homelessness" component={Homelessness} />
                <Route path="/stats/housing" component={Housing} />
            </Layout>
        </Layout>
    )
}