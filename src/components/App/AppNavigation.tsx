import * as React from 'react';
import { AppSidebar } from './AppSidebar';

export function AppNavigation(props: {}) {
    return (
        <>
            <AppSidebar.Item path="/app" title="Explore" icon="explore" />
            <AppSidebar.Item path="/app/favorites" title="Favorites" icon="favorite" />
            <AppSidebar.Item path="/app/inquiries" title="Search Inquiries" icon="location_searching" />
            <AppSidebar.Item path="/app/parcels" title="Parcels Database" icon="layers" activateForSubpaths={true} />

            <AppSidebar.Item title="Owners" icon="lock" disabled={true} />
            <AppSidebar.Item title="Organizations" icon="lock" disabled={true} />
            <AppSidebar.Item title="Entitlements" icon="lock" disabled={true} />
            <AppSidebar.Item title="Permits" icon="lock" disabled={true} />
            <AppSidebar.Item title="Messages" icon="lock" disabled={true} />
        </>
    );
}