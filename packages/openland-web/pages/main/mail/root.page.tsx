import '../../init';
import '../../../globals';
import * as React from 'react';
import Glamorous from 'glamorous';
import { withQueryLoader } from '../../../components/withQueryLoader';
import { withApp } from '../../../components/withApp';
import { XDocumentHead } from 'openland-x-routing/XDocumentHead';
import { Scaffold } from '../../../components/Scaffold';
import { MessengerComponent } from '../../../components/messenger/MessengerComponent';
import { withAllChats } from '../../../api/withAllChats';
import { ChatsComponent } from '../../../components/messenger/ChatsComponent';
import { MessengerContainer } from '../../../components/messenger/MessengerContainer';

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
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    position: 'relative'
});

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
                                {!props.router.routeQuery.conversationId && (
                                    <MessengerContainer>
                                        No chat selected!
                                    </MessengerContainer>
                                )}
                                {props.router.routeQuery.conversationId && (
                                    <MessengerComponent conversationId={props.router.routeQuery.conversationId} />
                                )}
                            </ConversationContainer>
                        </Shadow>
                    </ChatContainer>
                </Scaffold.Content>
            </Scaffold>
        </>
    );
})));