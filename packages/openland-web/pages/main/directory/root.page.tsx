import * as React from 'react';
import { withRouter, XWithRouter } from 'openland-x-routing/withRouter';
import { withApp } from '../../../components/withApp';
import { XDocumentHead } from 'openland-x-routing/XDocumentHead';
import { Scaffold } from '../../../components/Scaffold';
import { RoomsExploreComponent } from '../../../components/messenger/RoomsExploreComponent';
import { MessengerComponent } from '../../../components/messenger/MessengerComponent';
import {
    RootWrapper,
    Sidebar,
    Container
} from './components/Layout';

class RootComponent extends React.Component<XWithRouter> {
    render() {
        let tab = 'rooms';

        if (this.props.router.routeQuery.conversationId) {
            tab = 'invite';
        }

        return (
            <RootWrapper>
                <Sidebar active="rooms" />
                <Container>
                    {tab === 'rooms' && <RoomsExploreComponent onDirectory={true}/>}
                    {tab === 'invite' && <MessengerComponent conversationId={this.props.router.routeQuery.conversationId} onDirectory={true} />}
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