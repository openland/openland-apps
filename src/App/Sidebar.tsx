import * as React from 'react';
import { Menu, Icon } from 'antd';
import { SelectParam } from 'antd/lib/menu';
import { RouteComponentProps } from 'react-router-dom';

function redirect(props: RouteComponentProps<{}>, params: SelectParam) {
    props.history.push(params.key);
}

export default function (props: RouteComponentProps<{}>) {
    return (
        <Menu
            selectedKeys={[props.location.pathname]}
            theme="dark"
            mode="inline"
            onSelect={(params: SelectParam) => redirect(props, params)}
        >
            <Menu.SubMenu key="/app/housing" title="Housing">
                <Menu.Item key="/app/housing"><Icon type="home" />Home</Menu.Item>
                <Menu.Item key="/app/housing/zoning"><Icon type="home" />Zoning</Menu.Item>
                <Menu.Item key="/app/housing/pipeline"><Icon type="home" />Pipeline</Menu.Item>
                <Menu.Item key="/app/housing/permits"><Icon type="home" />Permits</Menu.Item>
                <Menu.Item key="/app/housing/finance"><Icon type="home" />Finance</Menu.Item>
                <Menu.Item key="/app/housing/policy"><Icon type="home" />Policy</Menu.Item>
                <Menu.Item key="/app/housing/homelessness"><Icon type="home" />Homeless</Menu.Item>
            </Menu.SubMenu>
            <Menu.Item key="/app/transport"><Icon type="home" />Transportation</Menu.Item>
            <Menu.Item key="/app/jobs"><Icon type="home" />Jobs</Menu.Item>
            <Menu.Item key="/app/environment"><Icon type="home" />Environment</Menu.Item>
            <Menu.Item key="/app/utility"><Icon type="home" />Utility</Menu.Item>
            <Menu.Item key="/app/health"><Icon type="home" />Health</Menu.Item>
            <Menu.Item key="/app/education"><Icon type="home" />Education</Menu.Item>
            <Menu.Item key="/app/infrastructure"><Icon type="home" />Infratstructire</Menu.Item>
            <Menu.Item key="/app/safety"><Icon type="home" />Safety</Menu.Item>
            <Menu.Item key="/app/justice"><Icon type="home" />Justice</Menu.Item>
        </Menu>
    );
}