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
import { ComposeComponent } from '../../../components/messenger/ComposeComponent';
import { canUseDOM } from 'openland-x-utils/canUseDOM';
import { XButton } from 'openland-x/XButton';
import { XHorizontal } from 'openland-x-layout/XHorizontal';
import { ChannelsExploreComponent } from '../../../components/messenger/ChannelsExploreComponent';

let ChatContainer = Glamorous.div({
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: '#f9fafb',
    boxShadow: '0 2px 4px 1px rgba(0,0,0,.05), 0 4px 24px 2px rgba(0,0,0,.05)',
    height: '100vh',
    width: '100%',
    flexGrow: 1,
    flexShrink: 0,
    overflow: 'hidden'
});

let ChatListContainer = Glamorous.div({
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    width: 300,
    flexShrink: 0,
    borderRight: '1px solid #e2e3e8',
    backgroundColor: '#f9fafb',
    '@media (max-width: 950px)': {
        width: 200
    }
});

let ConversationContainer = Glamorous.div({
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    flexShrink: 0,
    height: '100vh',
    width: 'calc(100% - 300px)',
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    position: 'relative',
    '@media (max-width: 950px)': {
        width: 'calc(100% - 200px)',
    }
});

const Header = Glamorous(XHorizontal)({
    height: 48,
    paddingLeft: 16,
    paddingRight: 16,
    marginTop: 6,
    marginBottom: 6,
});

const Title = Glamorous.div({
    fontSize: 18,
    fontWeight: 500,
    lineHeight: 1.33,
    letterSpacing: -0.4,
    color: '#334562'
});

const EmptyDiv = Glamorous.div({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
    flexGrow: 1,
    flexBasis: '100%'
});

const ComposeText = Glamorous.div({
    fontSize: 14,
    letterSpacing: -0.3,
    color: '#99a2b0',
    marginTop: 10
});

export default withApp('Mail', 'viewer', withAllChats(withQueryLoader((props) => {

    let isCompose = props.router.path.endsWith('/new');
    let isChannels = props.router.path.endsWith('/channels');

    let tab: 'empty' | 'conversation' | 'compose' | 'channels' = 'empty';

    if (isCompose && canUseDOM) {
        tab = 'compose';
    }

    if (!isCompose && !props.router.routeQuery.conversationId) {
        tab = 'empty';

    }

    if (!isCompose && props.router.routeQuery.conversationId) {
        tab = 'conversation';

    }

    if (isChannels) {
        tab = 'channels';
    }

    return (
        <>
            <XDocumentHead title={isCompose ? 'Compose' : 'Mail'} />
            <Scaffold>
                <Scaffold.Content padding={false} bottomOffset={false}>
                    <ChatContainer>
                        <ChatListContainer>
                            <Header alignItems="center" justifyContent="space-between">
                                <Title>Messenger</Title>
                                <XButton
                                    path="/mail/new"
                                    text="New chat"
                                    icon="add"
                                    size="r-small"
                                />
                            </Header>
                            <ChatsComponent />
                        </ChatListContainer>
                        <ConversationContainer>
                            {tab === 'compose' && (
                                <MessengerContainer>
                                    <ComposeComponent conversationId={props.router.routeQuery.conversationId} />
                                </MessengerContainer>
                            )}
                            {tab === 'empty' && (
                                <MessengerContainer>
                                    <EmptyDiv>
                                        <img src={'/static/X/chat-compose.svg'} />
                                        <ComposeText>Select a chat to start messaging</ComposeText>
                                    </EmptyDiv>
                                </MessengerContainer>
                            )}
                            {tab === 'conversation' && (
                                <MessengerComponent conversationId={props.router.routeQuery.conversationId} />
                            )}
                            {tab === 'channels' && (
                                <ChannelsExploreComponent />
                            )}
                        </ConversationContainer>
                    </ChatContainer>
                </Scaffold.Content>
            </Scaffold>
        </>
    );
})));