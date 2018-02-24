import * as React from 'react';
import { AppSidebar } from './AppSidebar';
import Glamorous from 'glamorous';

const Div = Glamorous.div({
    height: '16px'
})

export function AppNavigation(props: {}) {
    return (
        <>
            <AppSidebar.Item path="/app" title="Explore" icon="explore" />
            <AppSidebar.Item path="/app/parcels" title="Parcels" icon="layers" activateForSubpaths={true} />
            <AppSidebar.Item title="Insights" icon="lock" disabled={true} />
            <AppSidebar.Item title="Owners" icon="lock" disabled={true} />
            <Div />
            <AppSidebar.Item path="/app/favorites" title="Favorites" icon="favorite" />
            <AppSidebar.Item title="Due Dilligence" icon="lock" disabled={true} />
            <AppSidebar.Item title="Support" icon="lock" disabled={true} />
        </>
    );
}