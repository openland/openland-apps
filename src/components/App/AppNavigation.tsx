import * as React from 'react';
import { AppSidebar } from './AppSidebar';

export function AppNavigation(props: {}) {
    return (
        <>
            <AppSidebar.Item path="/app" title="Explore" icon="explore" />
            <AppSidebar.Item path="/app/underdeveloped" title="Underdeveloped" icon="explore" />
            <AppSidebar.Item path="/app/projects" title="Projects" icon="folder" activateForSubpaths={true} />
            <AppSidebar.Item path="/app/parcels" title="Parcels" icon="layers" activateForSubpaths={true} />
            <AppSidebar.Item path="/app/blocks" title="Blocks" icon="layers" activateForSubpaths={true} />
        </>
    )
}