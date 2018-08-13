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
import { ChannelsList } from './components/channelsList';
import { MessengerContainer } from '../../../components/messenger/MessengerContainer';
import { XIcon } from 'openland-x/XIcon';
import { TextChannel } from 'openland-text/TextChannel';
import { XButton } from 'openland-x/XButton';

let ChannelsContainer = Glamorous.div({
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

let ChannelsListContainer = Glamorous.div({
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    width: 300,
    flexShrink: 0,
    borderRightColor: 'rgba(216, 218, 229, 0.82)',
    borderRightWidth: '1px',
    borderRightStyle: 'solid',
    '@media (max-width: 1200px)': {
        width: 280
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
    '@media (max-width: 1200px)': {
        width: 'calc(100% - 280px)',
    }
});

let ChannelsHeader = Glamorous.div({
    display: 'flex',
    flexDirection: 'row',
    height: 40,
    paddingLeft: 16,
    marginTop: 8,
    marginBottom: 8,
});

let ChannelsHeaderCaption = Glamorous.div({
    flexGrow: 1,
    fontSize: 18,
    fontWeight: 500,
    lineHeight: '40px',
    letterSpacing: 0.6,
    color: '#334562',
});

let ChannelsHeaderIcon = Glamorous(XIcon)({
    fontSize: 20,
    lineHeight: '40px',
    paddingLeft: 10,
    paddingRight: 10,
    cursor: 'pointer',
    color: '#bcc3cc',
    transition: '300ms all ease',
    '&:hover': {
        color: '#5c6a81',
    },
    '&:active': {
        color: '#1790ff',
    }
});

let ChannelsBottomContainer = Glamorous.div({
    padding: 16
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

export default withApp('Channel', 'viewer', withAllChats(withQueryLoader((props) => {

    return (
        <>
            <XDocumentHead title="Channel" />
            <Scaffold>
                <Scaffold.Content padding={false} bottomOffset={false}>
                    <ChannelsContainer>
                        <ChannelsListContainer>
                            <ChannelsHeader>
                                <ChannelsHeaderCaption>{TextChannel.headerTitle}</ChannelsHeaderCaption>
                                <ChannelsHeaderIcon icon="search" />
                            </ChannelsHeader>
                            <ChannelsList />
                            <ChannelsBottomContainer>
                                <XButton size="r-default" text={TextChannel.buttonCreateChannel} icon="add" />
                            </ChannelsBottomContainer>
                        </ChannelsListContainer>
                        <ConversationContainer>
                            {!props.router.routeQuery.conversationId && (
                                <MessengerContainer>
                                    <EmptyDiv>
                                        <img src={'/static/X/chat-compose.svg'} />
                                        <ComposeText>Select a chat to start messaging</ComposeText>
                                    </EmptyDiv>
                                </MessengerContainer>
                            )}
                            {props.router.routeQuery.conversationId && (
                                <MessengerComponent conversationId={props.router.routeQuery.conversationId} />
                            )}
                        </ConversationContainer>
                    </ChannelsContainer>
                </Scaffold.Content>
            </Scaffold>
        </>
    );
})));