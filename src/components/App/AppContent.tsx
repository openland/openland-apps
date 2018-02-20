import * as React from 'react';
import Glamorous from 'glamorous';
import { XVertical } from '../X/XVertical';
import { AppHeader } from './AppHeader';
import { XDocumentAppRoot } from '../X/Scaffold/XDocumentRoot';
import { AppSidebar } from './AppSidebar';
import { XHead } from '../X/XHead';
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
    paddingBottom: '32px',
})

export class AppContent extends React.Component {
    render() {
        return (
            <XDocumentAppRoot>
                <XHead title={['Statecraft', 'App']} />
                <AppSidebar>
                    <AppNavigation />
                </AppSidebar>
                <Container>
                    <XVertical>
                        <AppHeader key="header" />
                        {this.props.children}
                    </XVertical>
                </Container>
            </XDocumentAppRoot>
        );
    }
}