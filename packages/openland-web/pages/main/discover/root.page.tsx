import * as React from 'react';
import { withRouter } from 'openland-x-routing/withRouter';
import { withApp } from 'openland-web/components/withApp';
import { RoomsExploreComponent } from './components/RoomsExploreComponent';
import { MessengerFragment } from 'openland-web/fragments/MessengerFragment';
import { DiscoverNavigation } from './components/DiscoverNavigation';
import { RoomProfile } from '../profile/components/RoomProfileComponent';
import { tabs } from './tabs';

export default withApp(
    'Discover',
    'viewer',
    withRouter(props => {
        const { router } = props;
        const {
            routeQuery: { conversationId },
            path,
        } = router;

        let tab = tabs.rooms;

        if (conversationId) {
            if (path.includes('/r/')) {
                tab = tabs.invite;
            } else if (path.includes('/p/')) {
                tab = tabs.profile;
            }
        }
        return (
            <DiscoverNavigation title={'Groups'}>
                {tab === tabs.invite && <MessengerFragment id={conversationId} />}
                {tab === tabs.profile && <RoomProfile conversationId={conversationId} />}
                {tab === tabs.rooms && <RoomsExploreComponent />}
            </DiscoverNavigation>
        );
    }),
);
