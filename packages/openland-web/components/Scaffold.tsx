import * as React from 'react';
import Glamorous from 'glamorous';
import { findChild } from './utils';
import { XScrollView } from './X/XScrollView';
import { XVertical } from './X/XVertical';
import { XPicture } from './X/XPicture';
import { XLink } from './X/XLink';
import { XIcon } from './X/XIcon';
import { withUserInfo } from './UserInfo';
import { XPopover } from './X/XPopover';
import { XMenu } from './X/XMenu';

//
// Root
//

const RootContainer = Glamorous.div({
    display: 'flex',
    flexDirection: 'row',
    height: '100vh',
    width: '100vw'
});

// 
// Navigation
//

const NavigationContainer = Glamorous.div({
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    width: '72px',
    paddingTop: '8px',
    backgroundColor: '#FAFAFC',
    flexShrink: 0,
    borderRightColor: 'rgba(0,0,0, 0.05)',
    borderRightStyle: 'solid',
    borderRightWidth: '1px',
    alignItems: 'center'
});

const Logo = Glamorous(XPicture)({
    height: '48px',
    width: '48px',
    marginTop: '12px',
    marginBottom: '12px',
    alignSelf: 'center',
    flexShrink: 0
});

const NavigationDivider = Glamorous.div({
    width: '36px',
    height: '1px',
    marginTop: '4px',
    marginBottom: '4px',
    alignSelf: 'center',
    backgroundColor: '#000000',
    opacity: 0.05
});

const NavigatorIcon = Glamorous(XIcon)({
    fontSize: '28px',
    textAlign: 'center'
});

const NavigatorItem = Glamorous.div({
    display: 'flex',
    flexDirection: 'column',
    alignSelf: 'stretch',
    alignItems: 'center',
    paddingTop: '16px',
    paddingBottom: '16px',
    flexShrink: 0
});

const NavigatorTitle = Glamorous.div({
    display: 'flex',
    flexDirection: 'row',
    fontSize: '14px',
    fontWeight: 700,
    paddingTop: '4px'
});

const BottomNavigation = Glamorous.div({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    flexGrow: 1,
    flexShrink: 0
});

const AvatarImg = Glamorous.img({
    overflow: 'hidden',
    borderRadius: '14px',
    marginLeft: 16,
    marginRight: 8,
    width: '36px',
    height: '36px',
    boxShadow: '0 2px 5px 0 rgba(49,49,93,.1), 0 1px 2px 0 rgba(0,0,0,.08)',
    cursor: 'pointer'
});

let UserProfile = withUserInfo<{ onClick?: any }>((props) => {
    return (
        <XPopover placement="right">
            <XPopover.Target>
                <AvatarImg src={props.user!!.picture} />
                {/* <UserInfoDiv><AvatarImg src={props.user!!.picture} /> {props.user!!.name}</UserInfoDiv> */}
            </XPopover.Target>
            <XPopover.Content>
                <XMenu>
                    <XMenu.Item path="/auth/logout">Sign Out</XMenu.Item>
                </XMenu>
            </XPopover.Content>
        </XPopover>
    );
});

//
// Content
//

const ContentView = Glamorous(XScrollView)({
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#ffffff',
    flexGrow: 1,
    marginLeft: '-8px',
    borderRadius: '8px',
    boxShadow: '0 2px 4px 1px rgba(0,0,0,.05), 0 4px 24px 2px rgba(0,0,0,.05)',
    overflowY: 'scroll',
});

//
// Menu
//

const MenuView = Glamorous.div({
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#FAFAFC',
});

class ScaffoldMenu extends React.Component {
    static defaultProps = {
        _isSidebarMenu: true
    };
    render() {
        if (React.Children.count(this.props.children) === 0) {
            return null;
        }
        return (
            <MenuView>
                {this.props.children}
            </MenuView>
        );
    }
}

class ScaffoldContent extends React.Component {
    static defaultProps = {
        _isSidebarContent: true
    };
    render() {
        if (React.Children.count(this.props.children) === 0) {
            return null;
        }
        return (
            <XVertical>
                {this.props.children}
            </XVertical>
        );
    }
}

export class Scaffold extends React.Component {
    static Menu = ScaffoldMenu;
    static Content = ScaffoldContent;

    render() {
        let menu = findChild(this.props.children, '_isSidebarMenu');
        let content = findChild(this.props.children, '_isSidebarContent');

        return (
            <RootContainer>
                <NavigationContainer>
                    <XLink path="/">
                        <Logo picture={{ url: '/static/branding/logo_inverted_squared.png', retina: '/static/branding/logo_inverted_squared@2x.png' }} />
                    </XLink>
                    <NavigationDivider />
                    <NavigatorItem>
                        <NavigatorIcon icon="explore" />
                        <NavigatorTitle>Explore</NavigatorTitle>
                    </NavigatorItem>
                    <NavigatorItem>
                        <NavigatorIcon icon="sort" />
                        <NavigatorTitle>Prospecting</NavigatorTitle>
                    </NavigatorItem>
                    <NavigatorItem>
                        <NavigatorIcon icon="work" />
                        <NavigatorTitle>Deals</NavigatorTitle>
                    </NavigatorItem>
                    <BottomNavigation>
                        <NavigatorItem>
                            <NavigatorIcon icon="playlist_add_check" />
                            <NavigatorTitle>Features</NavigatorTitle>
                        </NavigatorItem>
                        <NavigatorItem>
                            <UserProfile />
                        </NavigatorItem>
                    </BottomNavigation>
                </NavigationContainer>
                {menu}
                <ContentView>
                    {content}
                </ContentView>
            </RootContainer>
        );
    }
}