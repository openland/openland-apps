import * as React from 'react';
import Glamorous from 'glamorous';
import { findChild } from './utils';
import { XScrollView } from './X/XScrollView';
import { XVertical } from './X/XVertical';

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
    paddingRight: '8px',
    paddingTop: '8px',
    backgroundColor: '#E2E2E2',
    flexShrink: 0,
    borderRightColor: '#cecccc',
    borderRightStyle: 'solid',
    borderRightWidth: '1px'
});

const Logo = Glamorous.img({
    height: '28px',
    width: '28px',
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
    backgroundColor: '#cecccc'
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
    backgroundColor: '#E2E2E2',
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
                    <Logo src="/static/favicon-96.png" />
                    <NavigationDivider />
                </NavigationContainer>
                {menu}
                <ContentView>
                    {content}
                </ContentView>
            </RootContainer>
        );
    }
}