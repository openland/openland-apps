import * as React from 'react';
import { withData } from '../../utils/withData';
import { XDocumentAppRoot } from '../X/Scaffold/XDocumentRoot';
import { withAccountQuery } from '../../api';
import { XHead } from '../X/XHead';
import { AppSidebar } from './AppSidebar';
import { AppContent } from './AppContent';
import { UserInfoProvider } from '../Base/UserInfo';
import { AuthenticationRequired } from './AuthenticationRequired';

export function withApp(WrappedComponent: React.ComponentType<{}>) {
    return withData(withAccountQuery((props) => (
        <UserInfoProvider user={props.data.me} router={props.router}>
            <XDocumentAppRoot>
                <AuthenticationRequired>
                    <XHead title="Dashboard" />
                    <AppSidebar>
                        <AppSidebar.Item path="/app">Home</AppSidebar.Item>
                        <AppSidebar.Item path="/app/projects">Projects</AppSidebar.Item>
                        {/* <AppSidebar.Item>Parcels</AppSidebar.Item> */}
                        {/* <AppSidebar.Item>Zoning</AppSidebar.Item> */}
                        {/* <AppSidebar.Item>Permits</AppSidebar.Item> */}
                    </AppSidebar>
                    <AppContent>
                        <WrappedComponent />
                    </AppContent>
                </AuthenticationRequired>
            </XDocumentAppRoot>
        </UserInfoProvider>
    )));
};