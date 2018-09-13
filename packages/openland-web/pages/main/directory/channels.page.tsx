import '../../init';
import '../../../globals';
import * as React from 'react';
import { withRouter, XWithRouter } from 'openland-x-routing/withRouter';
import { withApp } from '../../../components/withApp';
import { XDocumentHead } from 'openland-x-routing/XDocumentHead';
import { Scaffold, CreateOrganization } from '../../../components/Scaffold';
import { XVertical } from 'openland-x-layout/XVertical';
import { ChannelsExploreComponent } from '../../../components/messenger/ChannelsExploreComponent';
import { MessengerComponent } from '../../../components/messenger/MessengerComponent';
import {
    RootWrapper,
    Sidebar,
    SidebarHeader,
    SidebarItemWrapper,
    Container,
    SidebarItemHeadLink
} from './components/Layout';

class RootComponent extends React.Component<XWithRouter> {

    render() {
        let tab = 'channels';

        if (this.props.router.routeQuery.conversationId) {
            tab = 'invite';
        }

        console.log(this.props.router);
        return (
            <RootWrapper>
                <Sidebar>
                    <SidebarHeader>Directory</SidebarHeader>
                    <XVertical separator={0}>
                        <SidebarItemWrapper>
                            <SidebarItemHeadLink
                                path="/directory"
                                title="Organizations"
                                icon="organizations"
                            />
                        </SidebarItemWrapper>
                        <SidebarItemWrapper>
                            <SidebarItemHeadLink
                                path="/directory/communities"
                                title="Communities"
                                icon="communities"
                            />
                        </SidebarItemWrapper>
                        <SidebarItemWrapper active={true}>
                            <SidebarItemHeadLink
                                path="/directory/channels"
                                title="Channels"
                                icon="channels"
                            />
                        </SidebarItemWrapper>
                    </XVertical>
                </Sidebar>
                <Container>
                    {tab === 'channels' && <ChannelsExploreComponent onDirectory={true}/>}
                    {tab === 'invite' && <MessengerComponent conversationId={this.props.router.routeQuery.conversationId} onDirectory={true}/>}
                </Container>
                <CreateOrganization />
            </RootWrapper>
        );
    }
}

export default withApp('Directory', 'viewer', withRouter((props) => {
    return (
        <>
            <XDocumentHead title="Directory" />
            <Scaffold>
                <Scaffold.Content padding={false} bottomOffset={false}>
                    <RootComponent router={props.router} />
                </Scaffold.Content>
            </Scaffold>
        </>
    );
}));