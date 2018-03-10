import * as React from 'react';
import { AppSidebar } from './AppSidebar';
import Glamorous from 'glamorous';
import { withParcelsFavroutesCount } from '../../api';
import { XWithRole } from '../X/XWithRole';

const Div = Glamorous.div({
    height: '16px'
});

export const AppNavigation = withParcelsFavroutesCount((props) => {
    return (
        <>
            <AppSidebar.Item path="/" title="Explore" icon="explore" />
            <AppSidebar.Item path="/parcels" title="Parcels" icon="layers" activateForSubpaths={true} />
            <AppSidebar.Item href="https://statecraft.one/sf" title="Insights" icon="show_chart" />
            <AppSidebar.Item title="Owners" icon="lock" disabled={true} />
            <AppSidebar.Item title="Deals" icon="lock" disabled={true} />
            <Div />
            <AppSidebar.Item path="/favorites" title={props.data.parcelFavoritesCount ? `Favorites (${props.data.parcelFavoritesCount})` : 'Favorites'} icon="favorite" />
            
            <XWithRole role="super-admin">
                <AppSidebar.Item path="/projects" title="Projects" icon="work" />
                <AppSidebar.Item path="/team" title="People" icon="group" />
                <AppSidebar.Item path="/settings" title="Settings" icon="settings" />
            </XWithRole>

            <XWithRole role="super-admin">
                <Div />
                <AppSidebar.Item path="/super/admins" title="Super Admins" icon="domain" activateForSubpaths={true} />
                <AppSidebar.Item path="/super/orgs" title="Organizations" icon="recent_actors" activateForSubpaths={true} />
                <AppSidebar.Item path="/super/debug" title="Debug" icon="memory" activateForSubpaths={true} />
            </XWithRole>
        </>
    );
});