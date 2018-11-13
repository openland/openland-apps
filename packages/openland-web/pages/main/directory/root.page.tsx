import * as React from 'react';
import { withRouter, XWithRouter } from 'openland-x-routing/withRouter';
import { withApp } from '../../../components/withApp';
import { XDocumentHead } from 'openland-x-routing/XDocumentHead';
import { Scaffold, CreateOrganization } from '../../../components/Scaffold';
import { ChannelsExploreComponent } from '../../../components/messenger/ChannelsExploreComponent';
import { MessengerComponent } from '../../../components/messenger/MessengerComponent';
import {
    RootWrapper,
    Sidebar,
    Container
} from './components/Layout';

class RootComponent extends React.Component<XWithRouter> {
    render() {
        let tab = 'channels';

        if (this.props.router.routeQuery.conversationId) {
            tab = 'invite';
        }

        return (
            <RootWrapper>
                <Sidebar active="channels" />
                <Container>
                    {tab === 'channels' && <ChannelsExploreComponent onDirectory={true}/>}
                    {tab === 'invite' && <MessengerComponent conversationId={this.props.router.routeQuery.conversationId} onDirectory={true} />}
                </Container>
            </RootWrapper>
        );
    }
}

export default withApp('Directory', 'viewer', withRouter((props) => {
    return (
        <>
            <XDocumentHead title="Channels Directory" />
            <Scaffold>
                <Scaffold.Content padding={false} bottomOffset={false}>
                    <RootComponent router={props.router} />
                </Scaffold.Content>
            </Scaffold>
        </>
    );
}));