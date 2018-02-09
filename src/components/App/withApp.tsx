import * as React from 'react';
import { withData } from '../../utils/withData';
import { XDocumentAppRoot } from '../X/Scaffold/XDocumentRoot';
import { withAccountQuery } from '../../api';
import { XHead } from '../X/XHead';
import { AppSidebar } from './AppSidebar';
import { AppContent } from './AppContent';
import { UserInfoProvider } from '../Base/UserInfo';

export function withApp(WrappedComponent: React.ComponentType<{}>) {
    return withData(withAccountQuery((props) => (
        <UserInfoProvider user={props.data.me} router={props.router}>
            <XDocumentAppRoot>
                <XHead title="Dashboard" />
                <AppSidebar>
                    <AppSidebar.Item title="Projects" />
                    <AppSidebar.Item title="Parcels" />
                    <AppSidebar.Item title="Zoning" />
                    <AppSidebar.Item title="Permits" />
                    <AppSidebar.Item title="Entitlements" />
                </AppSidebar>
                <AppContent>
                    <WrappedComponent />
                </AppContent>
            </XDocumentAppRoot>
        </UserInfoProvider>
    )));
};