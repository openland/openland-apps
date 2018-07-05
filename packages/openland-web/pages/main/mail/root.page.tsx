import '../../init';
import '../../../globals';
import * as React from 'react';
import Glamorous from 'glamorous';
import { withQueryLoader } from '../../../components/withQueryLoader';
import { withApp } from '../../../components/withApp';
import { XDocumentHead } from 'openland-x-routing/XDocumentHead';
import { Scaffold } from '../../../components/Scaffold';
import { MessengerComponent } from '../../../components/messenger/MessengerComponent';
import { XVertical } from 'openland-x-layout/XVertical';
import { XHeader } from 'openland-x/XHeader';
import { withAllChats } from '../../../api/withAllChats';
// import { makeNavigable } from 'openland-x/Navigable';
import { withChatPrivate } from '../../../api/withChatPrivate';
import { XPageRedirect } from 'openland-x-routing/XPageRedirect';
import { XLoader } from 'openland-x/XLoader';
import { withChatOrganization } from '../../../api/withChatOrganization';
import { withChat } from '../../../api/withChat';
import { ChatsComponent } from '../../../components/messenger/ChatsComponent';
import { XHorizontal } from 'openland-x-layout/XHorizontal';

let ChatContainer = Glamorous.div({
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: '#f9fafb',
    justifyContent: 'center',
    boxShadow: '0 2px 4px 1px rgba(0,0,0,.05), 0 4px 24px 2px rgba(0,0,0,.05)'
});

let Shadow = Glamorous.div({
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: '#f9fafb',
    flexGrow: 1,
    // maxWidth: '1200px',
    boxShadow: '0 2px 4px 1px rgba(0,0,0,.05), 0 4px 24px 2px rgba(0,0,0,.05)'
});

let ChatListContainer = Glamorous.div({
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    width: '300px',
    flexGrow: 0,
    flexShrink: 0,
    borderRightColor: '#e2e3e8',
    borderRightWidth: '1px',
    borderRightStyle: 'solid'
});

let ConversationContainer = Glamorous.div({
    display: 'flex',
    flexDirection: 'row',
    flexGrow: 1,
    height: '100vh',
    // maxWidth: '900px',
    backgroundColor: '#ffffff',
    justifyContent: 'center'
});

let ConversationWrapper = Glamorous.div({
    display: 'flex',
    flexDirection: 'row',
    flexGrow: 1,
    height: '100vh',
    justifyContent: 'center'
    // maxWidth: '900px'
});

// let ItemContainer = Glamorous.a({
//     fontSize: '15px',
//     color: '#fff'
// });

let PrivateConversation = withChatPrivate(withQueryLoader((props) => {
    return (
        <>
            <XLoader loading={true} />
            <XPageRedirect path={'/mail/' + props.data.chat.id} />
        </>
    );
}));

let OrganizationConversation = withChatOrganization(withQueryLoader((props) => {
    return (
        <>
            <XLoader loading={true} />
            <XPageRedirect path={'/mail/' + props.data.chat.id} />
        </>
    );
}));

let Conversation = withChat(withQueryLoader((props) => {
    return (
        <XVertical flexGrow={1} separator={'none'} maxWidth={1000}>
            <XHeader text={props.data.chat.title} separated={true} />
            <XHorizontal flexGrow={1} justifyContent="center">
                <MessengerComponent key={props.data.chat.id} variables={{ conversationId: props.data.chat.id }} />
            </XHorizontal>
        </XVertical>
    );
}));

export default withApp('Mail', 'viewer', withAllChats(withQueryLoader((props) => {
    return (
        <>
            <XDocumentHead title={'Mail'} />
            <Scaffold>
                <Scaffold.Content padding={false} bottomOffset={false}>
                    <ChatContainer>
                        <Shadow>
                            <ChatListContainer>
                                <ChatsComponent />
                            </ChatListContainer>
                            <ConversationContainer>
                                <ConversationWrapper>
                                    {props.router.routeQuery.conversationId && <Conversation variables={{ conversationId: props.router.routeQuery.conversationId }} />}
                                    {props.router.routeQuery.userId && <PrivateConversation variables={{ userId: props.router.routeQuery.userId }} />}
                                    {props.router.routeQuery.orgId && <OrganizationConversation variables={{ orgId: props.router.routeQuery.orgId }} />}
                                </ConversationWrapper>
                            </ConversationContainer>
                        </Shadow>
                    </ChatContainer>
                </Scaffold.Content>
            </Scaffold>
        </>
    );
})));