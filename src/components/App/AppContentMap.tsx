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
})

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
})

export class AppContentMap extends React.Component {
    render() {
        return (
            <XDocumentAppRoot>
                <MapContainer>
                    {this.props.children}
                </MapContainer>

                <ClassicalWrapper>
                    <AppSidebar asOverlay={true}>
                        <AppNavigation />
                    </AppSidebar>

                    <Container>
                        <AppHeader />
                    </Container>
                </ClassicalWrapper>
            </XDocumentAppRoot>
        );
    }
}