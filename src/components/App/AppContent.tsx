import * as React from 'react';
import Glamorous from 'glamorous';
import { XVertical } from '../X/XVertical';
import { AppHeader } from './AppHeader';
import { XDocumentAppRoot } from '../X/Scaffold/XDocumentRoot';
import { AppSidebar } from './AppSidebar';
import { XHead } from '../X/XHead';

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

export class AppContent extends React.Component {
    render() {
        return (
            <XDocumentAppRoot>
                <XHead title="Dashboard" />
                <AppSidebar>
                    <AppSidebar.Item path="/app" title="Home" icon="home" />
                    <AppSidebar.Item path="/app/projects" title="Projects" icon="folder" activateForSubpaths={true} />
                    <AppSidebar.Item path="/app/parcels" title="Parcels" icon="layers" activateForSubpaths={true} />
                    <AppSidebar.Item path="/app/blocks" title="Blocks" icon="layers" activateForSubpaths={true} />
                    <AppSidebar.Item path="/app/zoning" title="Zoning" icon="dashboard" activateForSubpaths={true} />
                </AppSidebar>
                <Container>
                    <XVertical>
                        <AppHeader />
                        {this.props.children}
                    </XVertical>
                </Container>
            </XDocumentAppRoot>
        );
    }
}