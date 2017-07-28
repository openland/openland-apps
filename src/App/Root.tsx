import * as React from 'react'
import {Layout} from 'antd'

export default function(props:{children:any}){
    return (
        <Layout className="root">
            <Layout.Sider>

            </Layout.Sider>
            <Layout>
                <Layout.Header>
                    Title
                </Layout.Header>
                {props.children}
            </Layout>
        </Layout>
    )
}