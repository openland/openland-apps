import * as React from 'react';
import { withRouter } from 'openland-x-routing/withRouter';
import { withApp } from '../../../components/withApp';
import { RoomsExploreComponent } from '../../../fragments/RoomsExploreComponent';
import { MessengerFragment } from '../../../fragments/MessengerFragment';
import { DirectoryUniversalNavigation } from './components/DirectoryUniversalNavigation';
import { RoomProfile } from '../profile/RoomProfileComponent';
import { tabs } from './tabs';

export default withApp(
    'Directory',
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
            <DirectoryUniversalNavigation title={'Rooms Directory'}>
                {tab === tabs.invite && <MessengerFragment id={conversationId} />}
                {tab === tabs.profile && <RoomProfile conversationId={conversationId} />}
                {tab === tabs.rooms && <RoomsExploreComponent />}
            </DirectoryUniversalNavigation>
        );
    }),
);
