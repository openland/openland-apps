import * as React from 'react';
import Glamorous from 'glamorous';
import { XLink } from '../X/XLink';
import XStyled from '../X/XStyled';
import { XIcon } from '../X/XIcon';
import { withRouter } from '../../utils/withRouter';

let Container = Glamorous.div<{ asOverlay?: boolean }>((props) => ({
    display: 'flex',
    flexDirection: 'column',
    width: '208px',
    alignSelf: props.asOverlay ? 'flex-start' : 'stretch',
    flexShrink: 0,
    pointerEvents: 'auto',
    backgroundColor: props.asOverlay ? 'rgb(245, 246, 248)' : undefined,
    boxShadow: props.asOverlay ? '0 7px 14px 0 rgba(50,50,93,.1), 0 3px 6px 0 rgba(0,0,0,.07)' : undefined,
    paddingTop: props.asOverlay ? '8px' : '20px',
    paddingBottom: props.asOverlay ? '8px' : '16px',
    marginLeft: '24px',
    marginRight: '16px',
    marginTop: props.asOverlay ? '12px' : undefined,
    borderRadius: props.asOverlay ? '4px' : undefined
}));

let SidebarContainer = Glamorous.div<{ count: number }>((props) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
    alignSelf: 'stretch',
    height: props.count * 32,
    overflow: 'hidden',
    transition: 'height 0.3s ease-out'
}));

let SidebarItemDiv = XStyled(XLink)({
    display: 'flex',
    flexDirection: 'row',
    alignSelf: 'stretch',
    height: '32px',
    paddingTop: '4px',
    paddingBottom: '4px',
    paddingLeft: '8px',
    paddingRight: '8px',
    alignItems: 'center',
    flexShrink: 0,

    fontWeight: 500,

    '.is-active': {
        color: '#4428e0'
    }
});

let SidebarTitleDiv = Glamorous.div({
    display: 'flex',
    alignItems: 'center',
    height: '32px',
    paddingLeft: '16px',
    paddingRight: '16px',
    fontWeight: 600,
    fontSize: '16px',
    marginBottom: '16px'
})

let Icon = Glamorous.img({
    borderRadius: '50%',
    height: '24px',
    width: '24px',
    marginRight: '8px',
    boxShadow: '0 2px 5px 0 rgba(49,49,93,.1), 0 1px 2px 0 rgba(0,0,0,.08)'
})

let ItemIcon = Glamorous(XIcon)({
    marginLeft: '8px',
    width: '32px',
    fontSize: '18px'
})

let ItemPaddingIcon = Glamorous.div({
    marginLeft: '8px',
    width: '32px',
    fontSize: '18px'
})

export class AppSidebarItem extends React.Component<{ title: string, icon?: string, path: string, activateForSubpaths?: boolean }> {
    render() {
        return (
            <SidebarItemDiv path={this.props.path} activateForSubpaths={this.props.activateForSubpaths}>
                {this.props.icon && <ItemIcon icon={this.props.icon} />}
                {!this.props.icon && <ItemPaddingIcon />}
                {this.props.title}
            </SidebarItemDiv>
        )
    }
}

export const AppSidebarGroup = withRouter<{ paths: string[] }>((props) => {
    let size = React.Children.count(props.children);
    let isActive = props.paths.indexOf(props.router.pathname!!) >= 0;
    let shownHeight = isActive ? size : 1;
    return (
        <SidebarContainer count={shownHeight}>
            {props.children}
        </SidebarContainer>
    );
});

export class AppSidebar extends React.Component<{ asOverlay?: boolean }> {
    static Item = AppSidebarItem;
    static Group = AppSidebarGroup;

    render() {
        return (
            <Container asOverlay={this.props.asOverlay}>
                <SidebarTitleDiv><Icon src="/static/img/areas/sf.jpg" /> San Francisco</SidebarTitleDiv>
                {this.props.children}
            </Container>
        )
    }
}