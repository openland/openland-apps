import '../../globals';
import * as React from 'react';
import Glamorous from 'glamorous';
import { withApp } from '../../components/withApp';
import { DevToolsScaffold } from './components/DevToolsScaffold';
import { XHeader } from 'openland-x/XHeader';
import { withQueryLoader } from '../../components/withQueryLoader';
import { withChat } from '../../api/withChat';
import { XInput } from 'openland-x/XInput';
import gql from 'graphql-tag';
import { Subscription } from 'react-apollo';
import { UserShort } from 'openland-api/fragments/UserShort';
import { ApolloClient } from 'apollo-client';
import { ChatQuery } from 'openland-api';
import { XHorizontal } from 'openland-x-layout/XHorizontal';
import { XAvatar } from 'openland-x/XAvatar';
import { XVertical } from 'openland-x-layout/XVertical';
import { XContent } from 'openland-x-layout/XContent';
import { XDate } from 'openland-x-format/XDate';
import { XScrollViewReversed } from 'openland-x/XScrollViewReversed';
import { XButton } from 'openland-x/XButton';
import { MessageFullFragment } from 'openland-api/Types';
import { withUserInfo } from '../../components/UserInfo';
import { canUseDOM } from 'openland-x-utils/canUseDOM';
import { XLoader } from 'openland-x/XLoader';

let Container = Glamorous.div({
    display: 'flex',
    flexBasis: 0,
    flexGrow: 1,
    flexDirection: 'column'
});

let MessagesContainer = Glamorous.div({
    display: 'flex',
    flexGrow: 1,
    flexDirection: 'column',
    justifyContent: 'flex-end'
});

let SendMessageContainer = Glamorous(XHorizontal)({
    height: '128px',
    flexDirection: 'row',
    flexShrink: 0,
    paddingTop: '8px',
    paddingLeft: '16px',
    paddingRight: '16px'
});

const CHAT_SUBSCRIPTION = gql`
  subscription ChatSubscription($conversationId: ID!, $seq: Int!) {
    event: alphaChatSubscribe(conversationId: $conversationId, fromSeq: $seq) {
      seq
      ... on ConversationEventMessage {
        message {
            id
            message
            sender {
                ...UserShort
            }
            date
        }
      }
    }
  }
  ${UserShort}
`;

class ChatWatcher extends React.Component<{ conversationId: string, refetch: () => void, seq: number, client: ApolloClient<{}>, uid: string }> {

    handleNewMessage = () => {
        var audio = new Audio('/static/sounds/notification.mp3');
        audio.play();
    }

    render() {
        if (!canUseDOM) {
            return null;
        }
        return (
            <Subscription
                subscription={CHAT_SUBSCRIPTION}
                variables={{ conversationId: this.props.conversationId, seq: this.props.seq }}
                shouldResubscribe={true}
            >
                {(result) => {
                    if (result.data && result.data.event) {
                        let seq = result.data.event.seq as number;
                        let shouldRefetch = false;
                        if (seq === this.props.seq + 1) {
                            if (result.data.event.__typename === 'ConversationEventMessage') {
                                console.warn('Received new message');
                                let senderId = result.data.event.message.sender.id as string;
                                if (senderId !== this.props.uid) {
                                    this.handleNewMessage();
                                }
                                let data = this.props.client.readQuery({
                                    query: ChatQuery.document,
                                    variables: { conversationId: this.props.conversationId }
                                });
                                (data as any).messages.seq = seq;
                                (data as any).messages.messages = [result.data.event.message, ...(data as any).messages.messages];
                                this.props.client.writeQuery({
                                    query: ChatQuery.document,
                                    variables: { conversationId: this.props.conversationId },
                                    data: data
                                });
                            } else {
                                shouldRefetch = true;
                            }
                        } else if (seq > this.props.seq + 1) {
                            shouldRefetch = true;
                        }
                        if (shouldRefetch) {
                            this.props.refetch();
                        }
                    } else if (result.error) {
                        console.warn(result.error);
                        this.props.refetch();
                    }
                    return null;
                }}
            </Subscription>
        );
    }
}

const Name = Glamorous.div({
    fontSize: '14px',
    fontWeight: 500,
});

const Date = Glamorous.div({
    fontSize: '14px',
    fontWeight: 300,
    opacity: 0.4
});

class MessageWrapper extends React.Component<{ messages: MessageFullFragment[] }> {
    shouldComponentUpdate(nextProps: { messages: MessageFullFragment[] }) {
        return nextProps.messages !== this.props.messages;
    }
    render() {
        return (
            <XVertical>
                {[...this.props.messages].reverse().map((v) => (
                    <XContent key={v.id}>
                        <XHorizontal alignSelf="stretch">
                            <XAvatar cloudImageUuid={v.sender.picture ? v.sender.picture : undefined} />
                            <XVertical separator={'none'} flexGrow={1}>
                                <XHorizontal separator={4}>
                                    <Name>{v.sender.name}</Name><Date><XDate value={v.date} format="humanize" /></Date>
                                </XHorizontal>
                                <span>{v.message}</span>
                            </XVertical>
                        </XHorizontal>
                    </XContent>
                ))}
            </XVertical>
        );
    }
}

class ChatComponent extends React.Component<{ sendMessage: (args: any) => any, messages: MessageFullFragment[], loading: boolean, uid: string }, { message: string, mounted: boolean }> {

    scroller: any;
    state = {
        message: '',
        mounted: false
    };

    handleScrollView = (src: any) => {
        if (src) {
            this.scroller = src;
        }
    }

    handleSend = async () => {
        if (this.state.message.trim().length > 0) {
            await this.props.sendMessage({ variables: { message: this.state.message.trim() } });
            this.scroller.scrollToBottom();
            this.setState({ message: '' });
        }
    }

    handleChange = (src: string) => {
        this.setState({ message: src });
    }

    shouldComponentUpdate(nextProps: { sendMessage: (args: any) => any, messages: MessageFullFragment[], loading: boolean }, nextState: { message: string, mounted: boolean }) {
        return this.props.messages !== nextProps.messages || this.state.message !== nextState.message || this.state.mounted !== nextState.mounted || this.props.loading !== nextProps.loading;
    }

    componentDidMount() {
        this.setState({ mounted: true });
    }

    render() {
        return (
            <>
                <Container>
                    <MessagesContainer>
                        <XScrollViewReversed ref={this.handleScrollView}>
                            <MessageWrapper messages={this.props.messages} />
                        </XScrollViewReversed>
                    </MessagesContainer>
                    <SendMessageContainer>
                        <XInput placeholder="Write a message..." flexGrow={1} value={this.state.message} onChange={this.handleChange} onEnter={this.handleSend} />
                        <XButton text="Send" size="medium" action={this.handleSend} />
                    </SendMessageContainer>
                </Container>
                <XLoader loading={!this.state.mounted || this.props.loading} />
            </>
        );
    }

}

export default withApp('Super Chat', 'super-admin', withChat(withQueryLoader(withUserInfo((props) => {
    return (
        <DevToolsScaffold title={props.data.chat.title}>
            <XHeader text={props.data.chat.title} />
            <ChatWatcher
                conversationId={props.data.chat.id}
                refetch={props.refetch}
                seq={props.data.messages.seq}
                client={(props as any).client}
                uid={props.user!!.id}
            />
            <ChatComponent sendMessage={props.sendMessage} messages={props.data.messages.messages} uid={props.user!!.id} loading={props.loading} />
        </DevToolsScaffold>
    );
}))));