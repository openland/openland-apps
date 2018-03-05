import * as React from 'react';
import { AppSidebar } from './AppSidebar';
import Glamorous from 'glamorous';
import { withParcelsFavroutesCount } from '../../api';

const Div = Glamorous.div({
    height: '16px'
})

export const AppNavigation = withParcelsFavroutesCount((props) => {
    return (
        <>
            <AppSidebar.Item path="/" title="Explore" icon="explore" />
            <AppSidebar.Item path="/parcels" title="Parcels" icon="layers" activateForSubpaths={true} />
            <AppSidebar.Item href="https://statecraft.one/sf" title="Insights" icon="show_chart" />
            <AppSidebar.Item title="Owners" icon="lock" disabled={true} />
            <Div />
            <AppSidebar.Item path="/favorites" title={props.data.parcelFavoritesCount ? `Favorites (${props.data.parcelFavoritesCount})` : 'Favorites'} icon="favorite" />
            <AppSidebar.Item title="Due Dilligence" icon="lock" disabled={true} />
            <AppSidebar.Item title="Notifications" icon="lock" disabled={true} />
            <AppSidebar.Item title="Support" icon="lock" disabled={true} />
        </>
    );
});