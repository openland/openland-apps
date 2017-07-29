import * as React from 'react'
import { Menu, Icon} from 'antd'
import { SelectParam } from 'antd/lib/menu'
import { RouteComponentProps } from 'react-router-dom'

function redirect(props:RouteComponentProps<any>, params:SelectParam){
    props.history.push(params.key)
}

export default function (props:RouteComponentProps<any>) {
    return (
        <Menu selectedKeys={[props.location.pathname]} theme="dark" onSelect={ (params:SelectParam) =>redirect(props,params) }>
            <Menu.Item key="/stats/housing"><Icon type="home"/>Housing</Menu.Item>
            <Menu.Item key="/stats/homelessness"><Icon type="home"/>Homelesness</Menu.Item>
        </Menu>
    );
}