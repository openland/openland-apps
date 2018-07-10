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
import { XLink } from 'openland-x/XLink';
import { XIcon } from 'openland-x/XIcon';
import { canUseDOM } from 'openland-x-utils/canUseDOM';

let ChatContainer = Glamorous.div({
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'stretch',
    backgroundColor: '#f9fafb',
    boxShadow: '0 2px 4px 1px rgba(0,0,0,.05), 0 4px 24px 2px rgba(0,0,0,.05)',
    alignSelf: 'stretch',
    flexBasis: 0,
    flexGrow: 1,
    overflow: 'hidden'
});

let ChatListContainer = Glamorous.div({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
    width: 300,
    flexShrink: 0,
    borderRightColor: '#e2e3e8',
    borderRightWidth: '1px',
    borderRightStyle: 'solid',
    '@media (max-width: 950px)': {
        width: 200
    }
});

let ConversationContainer = Glamorous.div({
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    flexBasis: '0px',
    alignItems: 'stretch',
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    position: 'relative',
});

let Header = Glamorous.div({
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 48,
    paddingLeft: 16,
    paddingRight: 16,
    marginTop: 16,
    marginBottom: 16,
    fontSize: 18,
    fontWeight: 600,
    lineHeight: 1.11,
    letterSpacing: -0.3,
    color: '#334562',
    '& > a': {
        display: 'flex',
        alignItems: 'center',
        color: '#BEC3CA',
        '&:hover': {
            color: '#334562'
        },
        '& > i': {
            fontSize: 30
        }
    }
});

export default withApp('Mail', 'viewer', withAllChats(withQueryLoader((props) => {

    let isCompose = props.router.path.endsWith('/new');

    return (
        <>
            <XDocumentHead title={isCompose ? 'Compose' : 'Mail'} />
            <Scaffold overflow={true}>
                <Scaffold.Content padding={false} bottomOffset={false}>
                    <ChatContainer>
                        <ChatListContainer>
                            <Header>
                                <span>Messages</span>
                                <XLink path="/mail/new">
                                    <XIcon icon="add" />
                                </XLink>
                            </Header>
                            <ChatsComponent />
                        </ChatListContainer>
                        <ConversationContainer>
                            {isCompose && canUseDOM && (
                                <MessengerContainer>
                                    <ComposeComponent />
                                </MessengerContainer>
                            )}
                            {!isCompose && !props.router.routeQuery.conversationId && (
                                <MessengerContainer>
                                    No chat selected!
                                </MessengerContainer>
                            )}
                            {!isCompose && props.router.routeQuery.conversationId && (
                                <MessengerComponent conversationId={props.router.routeQuery.conversationId} />
                            )}
                        </ConversationContainer>
                    </ChatContainer>
                </Scaffold.Content>
            </Scaffold>
        </>
    );
})));