import * as React from 'react';
import Glamorous from 'glamorous';
import { XLink } from '../X/XLink';
import XStyled from '../X/XStyled';
import { XIcon } from '../X/XIcon';

let Container = Glamorous.div({
    display: 'flex',
    flexDirection: 'column',
    width: '240px',
    alignSelf: 'stretch',
    flexShrink: 0
});

let SidebarItemDiv = XStyled(XLink)({
    display: 'flex',
    flexDirection: 'row',
    alignSelf: 'stretch',
    height: '24px',
    marginTop: '4px',
    marginBottom: '4px',
    paddingLeft: '16px',
    paddingRight: '32px',
    alignItems: 'center',

    fontWeight: 500,
});

let SidebarTitleDiv = Glamorous.div({
    display: 'flex',
    alignItems: 'center',
    marginTop: '16px',
    height: '32px',
    marginBottom: '24px',
    paddingLeft: '32px',
    paddingRight: '32px',
    fontWeight: 600,
    fontSize: '16px'
})

let Icon = Glamorous.img({
    borderRadius: '50%',
    height: '28px',
    width: '28px',
    marginRight: '8px',
    boxShadow: '0 2px 5px 0 rgba(49,49,93,.1), 0 1px 2px 0 rgba(0,0,0,.08)'
})

let ItemIcon = Glamorous(XIcon)({
    marginLeft: '20px',
    width: '32px',
    fontSize: '18px'
})

export class AppSidebarItem extends React.Component<{ title: string, icon: string, path: string }> {
    render() {
        return (
            <SidebarItemDiv path={this.props.path}>
                <ItemIcon icon={this.props.icon} />
                {this.props.title}
            </SidebarItemDiv>
        )
    }
}

export class AppSidebar extends React.Component {
    static Item = AppSidebarItem;

    render() {
        return (
            <Container>
                <SidebarTitleDiv><Icon src="/static/img/areas/sf.jpg" /> San Francisco</SidebarTitleDiv>
                {this.props.children}
            </Container>
        )
    }
}