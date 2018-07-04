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
import { makeNavigable } from 'openland-x/Navigable';
import { withChatPrivate } from '../../../api/withChatPrivate';
import { XPageRedirect } from 'openland-x-routing/XPageRedirect';
import { XLoader } from 'openland-x/XLoader';
import { withChatOrganization } from '../../../api/withChatOrganization';
import { withChat } from '../../../api/withChat';

let ChatContainer = Glamorous.div({
    display: 'flex',
    flexDirection: 'row'
});

let ChatListContainer = Glamorous.div({
    display: 'flex',
    flexDirection: 'column',
    width: '300px',
    flexGrow: 0,
    flexShrink: 0,
    backgroundColor: '#522BFF'
});

let ConversationContainer = Glamorous.div({
    display: 'flex',
    flexDirection: 'row',
    flexGrow: 1,
    height: '100vh'
});

let ItemContainer = Glamorous.a({
    fontSize: '15px',
    color: '#fff'
});

let Item = makeNavigable((props) => {
    return <ItemContainer href={props.href} target={props.hrefTarget} onClick={props.onClick}>{props.children}</ItemContainer>;
});

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
        <XVertical flexGrow={1}>
            <XHeader text={props.data.chat.title} />
            <XVertical flexGrow={1}>
                <MessengerComponent key={props.data.chat.id} variables={{ conversationId: props.data.chat.id }} />
            </XVertical>
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
                        <ChatListContainer>
                            {props.data.chats.map((v) => (
                                <Item path={'/mail/' + v.id}>{v.title}</Item>
                            ))}
                        </ChatListContainer>
                        <ConversationContainer>
                            {props.router.routeQuery.conversationId && <Conversation variables={{ conversationId: props.router.routeQuery.conversationId }} />}
                            {props.router.routeQuery.userId && <PrivateConversation variables={{ userId: props.router.routeQuery.userId }} />}
                            {props.router.routeQuery.orgId && <OrganizationConversation variables={{ orgId: props.router.routeQuery.orgId }} />}
                        </ConversationContainer>
                    </ChatContainer>
                </Scaffold.Content>
            </Scaffold>
        </>
    );
})));