import * as React from 'react';
import { withRouter, XWithRouter } from 'openland-x-routing/withRouter';
import { withApp } from '../../../components/withApp';
import { XDocumentHead } from 'openland-x-routing/XDocumentHead';
import { Scaffold } from '../../../components/Scaffold';
import { RoomsExploreComponent } from '../../../components/messenger/RoomsExploreComponent';
import { MessengerComponent } from '../../../components/messenger/MessengerComponent';
import { RoomGroupProfile } from '../profile/RoomGroupProfileComponent';
import {
    RootWrapper,
    Sidebar,
    Container
} from './components/Layout';

class RootComponent extends React.Component<XWithRouter> {
    render() {
        const router = this.props.router;
        let tab = 'rooms';

        if (router.routeQuery.conversationId) {
            if (router.path.includes('/r/')) {
                tab = 'invite';
            } else if (router.path.includes('/p/')) {
                tab = 'profile';
            }
        }

        return (
            <RootWrapper>
                <Sidebar active="rooms" />
                <Container>
                    {tab === 'rooms' && <RoomsExploreComponent />}
                    {tab === 'invite' && <MessengerComponent conversationId={router.routeQuery.conversationId} />}
                    {tab === 'profile' && <RoomGroupProfile conversationId={router.routeQuery.conversationId} />}
                </Container>
            </RootWrapper>
        );
    }
}

export default withApp('Directory', 'viewer', withRouter((props) => {
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
}));