import * as React from 'react';
import { withRouter, XWithRouter } from 'openland-x-routing/withRouter';
import { withApp } from '../../../components/withApp';
import { XDocumentHead } from 'openland-x-routing/XDocumentHead';
import { Scaffold } from '../../../components/Scaffold';
import { MainLayout } from '../../../components/MainLayout';
import { RoomsExploreComponent } from '../../../fragments/RoomsExploreComponent';
import { MessengerFragment } from '../../../fragments/MessengerFragment';
import { DirectoryNavigation } from './components/Navigation';
import { RoomProfile } from '../profile/RoomProfileComponent';
import { tabs } from './tabs';

class RootComponent extends React.Component<XWithRouter> {
    render() {
        const { router } = this.props;
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
            <MainLayout>
                <MainLayout.Menu>
                    <DirectoryNavigation route="Rooms" />
                </MainLayout.Menu>
                <MainLayout.Content>
                    {tab === tabs.invite && <MessengerFragment id={conversationId} />}
                    {tab === tabs.profile && <RoomProfile conversationId={conversationId} />}
                    {tab === tabs.rooms && <RoomsExploreComponent />}
                </MainLayout.Content>
            </MainLayout>
        );
    }
}

export default withApp(
    'Directory',
    'viewer',
    withRouter(props => {
        return (
            <>
                <XDocumentHead title="Rooms Directory" />
                <Scaffold>
                    <Scaffold.Content padding={false} bottomOffset={false}>
                        <RootComponent router={props.router} />
                    </Scaffold.Content>
                </Scaffold>
            </>
        );
    }),
);
