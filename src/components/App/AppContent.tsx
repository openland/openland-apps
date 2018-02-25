import * as React from 'react';
import Glamorous from 'glamorous';
import { XVertical } from '../X/XVertical';
import { XDocumentAppRoot } from '../X/Scaffold/XDocumentRoot';
import { AppSidebar } from './AppSidebar';
import { AppNavigation } from './AppNavigation';

let Container = Glamorous.div({
    display: 'flex',
    flexDirection: 'column',
    alignSelf: 'stretch',
    flexGrow: 1,
    flexShrink: 1,
    overflow: 'hidden',
    paddingLeft: '16px',
    paddingRight: '32px',
    paddingTop: '24px',
    paddingBottom: '128px',
});

export class AppContent extends React.Component {
    render() {
        return (
            <XDocumentAppRoot>
                <AppSidebar>
                    <AppNavigation />
                </AppSidebar>
                <Container>
                    <XVertical>
                        {this.props.children}
                    </XVertical>
                </Container>
            </XDocumentAppRoot>
        );
    }
}