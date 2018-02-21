import * as React from 'react';
import Glamorous from 'glamorous';
import { XDocumentAppRoot } from '../X/Scaffold/XDocumentRoot';
import { AppSidebar } from './AppSidebar';
import { AppHeader } from './AppHeader';
import { AppNavigation } from './AppNavigation';

const ClassicalWrapper = Glamorous.div({
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'stretch',
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    pointerEvents: 'none',
    zIndex: 1,
});

const MapContainer = Glamorous.div({
    alignSelf: 'stretch',
    flexGrow: 1,
    minWidth: '1020px'
});

let Container = Glamorous.div({
    display: 'flex',
    flexDirection: 'column',
    alignSelf: 'stretch',
    flexGrow: 1,
    flexShrink: 1,
    overflow: 'hidden',
    paddingLeft: '16px',
    paddingRight: '32px',
    paddingBottom: '32px'
});

export class XAppBarItem extends React.Component {
    static defaultProps = {
        _isAppBarItem: true
    }
    render() {
        return (
            <>
                {this.props.children}
            </>
        )
    }
}

export class AppContentMap extends React.Component {
    static Item = XAppBarItem;

    render() {
        let childArray = React.Children.toArray(this.props.children);
        let menus = childArray
            .filter((v) => React.isValidElement(v) && (v.props as any)._isAppBarItem === true);
        let content = childArray
            .filter((v) => !React.isValidElement(v) || !(v.props as any)._isAppBarItem);
        return (
            <XDocumentAppRoot>
                <MapContainer key="container">
                    {content}
                </MapContainer>

                <ClassicalWrapper key="controls">
                    <AppSidebar asOverlay={true}>
                        <AppNavigation />
                    </AppSidebar>

                    <Container>
                        <AppHeader>
                            {menus}
                        </AppHeader>
                    </Container>
                </ClassicalWrapper>
            </XDocumentAppRoot>
        );
    }
}