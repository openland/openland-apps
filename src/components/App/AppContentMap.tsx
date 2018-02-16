import * as React from 'react';
import Glamorous from 'glamorous';
// import { XVertical } from '../X/XVertical';
// import { AppHeader } from './AppHeader';
import { XDocumentAppRootFullScreen } from '../X/Scaffold/XDocumentRoot';
import { AppSidebar } from './AppSidebar';
import { XHead } from '../X/XHead';
import { XMapLight } from '../X/XMapLight';
import { AppHeader } from './AppHeader';

const ClassicalWrapper = Glamorous.div({
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    pointerEvents: 'none'
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
    paddingLeft: '32px',
    paddingRight: '32px',
    paddingBottom: '32px',
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
                            <AppSidebar.Item path="/app" title="Explore" icon="explore" />
                            <AppSidebar.Item path="/app/projects" title="Projects" icon="folder" activateForSubpaths={true} />
                            <AppSidebar.Item path="/app/parcels" title="Parcels" icon="layers" activateForSubpaths={true} />
                            <AppSidebar.Item path="/app/blocks" title="Blocks" icon="layers" activateForSubpaths={true} />
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