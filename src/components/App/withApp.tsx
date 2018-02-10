import * as React from 'react';
import { withData } from '../../utils/withData';
import { XDocumentAppRoot } from '../X/Scaffold/XDocumentRoot';
import { withAccountQuery } from '../../api';
import { XHead } from '../X/XHead';
import { AppSidebar } from './AppSidebar';
import { UserInfoProvider } from '../Base/UserInfo';
import { AuthenticationRequired } from './AuthenticationRequired';

export function withApp(WrappedComponent: React.ComponentType<{}>) {
    return withData(withAccountQuery((props) => (
        <UserInfoProvider user={props.data.me} router={props.router}>
            <XDocumentAppRoot>
                <AuthenticationRequired>
                    <XHead title="Dashboard" />
                    <AppSidebar>
                        <AppSidebar.Item path="/app" title="Home" icon="home" />
                        <AppSidebar.Item path="/app/projects" title="Projects" icon="folder" />
                        <AppSidebar.Item path="/app/parcels" title="Parcels" icon="layers" />
                        <AppSidebar.Item path="/app/zoning" title="Zoning" icon="dashboard" />
                    </AppSidebar>
                    <WrappedComponent />
                </AuthenticationRequired>
            </XDocumentAppRoot>
        </UserInfoProvider>
    )));
};