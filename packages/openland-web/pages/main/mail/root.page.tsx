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
                            <XVertical flexGrow={1}>
                                <XHeader text="Chat" />
                                <XVertical flexGrow={1}>
                                    {props.router.routeQuery.conversationId && <MessengerComponent key={props.router.routeQuery.conversationId} />}
                                </XVertical>
                            </XVertical>
                        </ConversationContainer>
                    </ChatContainer>
                </Scaffold.Content>
            </Scaffold>
        </>
    );
})));