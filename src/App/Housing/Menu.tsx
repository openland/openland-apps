import * as React from 'react'
import { Menu, Icon } from 'antd'

export default function(props:any) {
    return (
        <Menu.Item key="/stats/housing" {...props}><Icon type="home"/>Housing</Menu.Item>
    );
}