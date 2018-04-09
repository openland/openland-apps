import * as React from 'react';
import { AppSidebar } from './AppSidebar';
import Glamorous from 'glamorous';
import { withParcelsFavroutesCount } from '../../api/';
import { XWithRole } from '../X/XWithRole';

const Div = Glamorous.div({
    height: '16px'
});

export const AppNavigation = withParcelsFavroutesCount((props) => {
    return (
        <>
            <AppSidebar.Item path="/" title="Explore" icon="explore" />
            <XWithRole role={['super-admin', 'software-developer', 'feature-portfolio']}>
                <AppSidebar.Item path="/prospecting" title="Prospecting" icon="sort" activateForSubpaths={true} />
                <AppSidebar.Item path="/deals" title={props.data.dealsCount ? `Deals (${props.data.dealsCount})` : 'Deals'} icon="work" activateForSubpaths={true} />
            </XWithRole>
            <AppSidebar.Item path="/favorites" title={props.data.parcelFavoritesCount ? `Favorites (${props.data.parcelFavoritesCount})` : 'Favorites'} icon="favorite" />
            <XWithRole role={['super-admin', 'software-developer']}>
                <AppSidebar.Item path="/people" title="People" icon="group" activateForSubpaths={true} />
                <AppSidebar.Item path="/settings" title="Settings" icon="settings" />
            </XWithRole>

            <XWithRole role={['super-admin', 'software-developer']}>
                <Div />
            </XWithRole>
            <XWithRole role="super-admin">
                <AppSidebar.Item path="/super/admins" title="Super Admins" icon="domain" activateForSubpaths={true} />
                <AppSidebar.Item path="/super/orgs" title="Organizations" icon="recent_actors" activateForSubpaths={true} />
            </XWithRole>
            <XWithRole role={['super-admin', 'software-developer']}>
                <AppSidebar.Item path="/ui" title="UI" icon="color_lens" activateForSubpaths={true} />
                <AppSidebar.Item path="/super/features" title="Features" icon="playlist_add_check" activateForSubpaths={true} />
                <AppSidebar.Item path="/super/debug" title="Debug" icon="memory" activateForSubpaths={true} />
            </XWithRole>
        </>
    );
});