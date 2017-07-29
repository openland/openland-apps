import * as React from 'react'
import { Menu, Icon} from 'antd'
import { SelectParam } from 'antd/lib/menu'
import { RouteComponentProps } from 'react-router-dom'

function redirect(props:RouteComponentProps<any>, params:SelectParam){
    props.history.push(params.key)
}

export default function (props:RouteComponentProps<any>) {
    return (
        <Menu selectedKeys={[props.location.pathname]} theme="dark" mode="inline" onSelect={ (params:SelectParam) =>redirect(props,params) }>
            <Menu.SubMenu key="/stats/housing" title="Housing">
                <Menu.Item key="/stats/housing"><Icon type="home"/>Home</Menu.Item>
                <Menu.Item key="/stats/housing/zoning"><Icon type="home"/>Zoning</Menu.Item>
                <Menu.Item key="/stats/housing/pipeline"><Icon type="home"/>Pipeline</Menu.Item>
                <Menu.Item key="/stats/housing/permits"><Icon type="home"/>Permits</Menu.Item>
                <Menu.Item key="/stats/housing/finance"><Icon type="home"/>Finance</Menu.Item>
                <Menu.Item key="/stats/housing/policy"><Icon type="home"/>Policy</Menu.Item>
                <Menu.Item key="/stats/housing/homelessness"><Icon type="home"/>Homeless</Menu.Item>
            </Menu.SubMenu>
            <Menu.Item key="/stats/transport"><Icon type="home"/>Transportation</Menu.Item>
            <Menu.Item key="/stats/jobs"><Icon type="home"/>Jobs</Menu.Item>
            <Menu.Item key="/stats/environment"><Icon type="home"/>Environment</Menu.Item>
            <Menu.Item key="/stats/utility"><Icon type="home"/>Utility</Menu.Item>
            <Menu.Item key="/stats/health"><Icon type="home"/>Health</Menu.Item>
            <Menu.Item key="/stats/education"><Icon type="home"/>Education</Menu.Item>
            <Menu.Item key="/stats/infrastructure"><Icon type="home"/>Infratstructire</Menu.Item>
            <Menu.Item key="/stats/safety"><Icon type="home"/>Safety</Menu.Item>
            <Menu.Item key="/stats/justice"><Icon type="home"/>Justice</Menu.Item>
        </Menu>
    );
}