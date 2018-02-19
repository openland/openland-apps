import * as React from 'react';
import Glamorous from 'glamorous';
import { XDocumentAppRootFullScreen } from '../X/Scaffold/XDocumentRoot';
import { AppSidebar } from './AppSidebar';
import { XHead } from '../X/XHead';
import { XMapLight } from '../X/XMapLight';
import { AppHeader } from './AppHeader';
import { AppNavigation } from './AppNavigation';

const ClassicalWrapper = Glamorous.div({
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    pointerEvents: 'none',
    zIndex: 1,
});
const ClassicalContainer = Glamorous.div({
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'stretch',

    minWidth: '1020px',
    maxWidth: '1400px',
    minHeight: '100vh',

    marginLeft: 'auto',
    marginRight: 'auto',
    pointerEvents: 'none'
})

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
            <XDocumentAppRootFullScreen>
                <XHead title="Dashboard" />

                <MapContainer>
                    <XMapLight mapStyle={'mapbox://styles/mapbox/light-v9'}>
                        {this.props.children}
                    </XMapLight>
                </MapContainer>

                <ClassicalWrapper>
                    <ClassicalContainer>
                        <AppSidebar asOverlay={true}>
                            <AppNavigation />
                        </AppSidebar>
                        <Container>
                            <AppHeader />
                        </Container>
                    </ClassicalContainer>
                </ClassicalWrapper>
            </XDocumentAppRootFullScreen>
        );
    }
}