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
import { XLoader } from 'openland-x/XLoader';
import { ConnectionStatus } from 'openland-x-graphql/apolloClient';
import { backoff } from 'openland-x-utils/timer';

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

interface ChatWatcherProps {
    conversationId: string;
    refetch: () => void;
    seq: number;
    client: ApolloClient<{}>;
    uid: string;
}

class ChatWatcher extends React.Component<ChatWatcherProps> {

    currentSeq: number;
    observable: ZenObservable.Subscription | null = null;
    _mounted = false;
    connectionStatusUnsubscribe: (() => void) | null = null;
    doingFullRefresh: boolean = false;
    pending: any[] = [];
    pendingTimeout: number | null = null;

    constructor(props: ChatWatcherProps) {
        super(props);
        this.currentSeq = props.seq;
    }

    handleNewMessage = () => {
        var audio = new Audio('/static/sounds/notification.mp3');
        audio.play();
    }

    componentDidMount() {
        this._mounted = true;
        this.startSubsctiption();
        this.connectionStatusUnsubscribe = ConnectionStatus.subscribe(this.handleConnectionChanged);
    }
    componentWillUnmount() {
        this._mounted = false;
        this.connectionStatusUnsubscribe!!();
        this.stopSubscription();
    }

    startSubsctiption = () => {
        if (!this._mounted) {
            return;
        }
        if (!ConnectionStatus.isConnected) {
            return;
        }
        this.stopSubscription();
        console.warn('Start Subscription starting from #' + this.currentSeq);
        let subscription = this.props.client.subscribe({
            query: CHAT_SUBSCRIPTION,
            variables: { conversationId: this.props.conversationId, seq: this.currentSeq }
        });
        this.observable = subscription.subscribe({
            error: this.handleError,
            next: this.handleUpdate
        });
    }

    stopSubscription = () => {
        if (this.observable) {
            console.warn('Stopping Subscription');
            this.observable.unsubscribe();
            this.observable = null;
        }
    }

    handleConnectionChanged = (isConnected: boolean) => {
        if (!this._mounted) {
            return;
        }
        if (isConnected) {
            if (!this.observable && !this.doingFullRefresh) {
                this.startSubsctiption();
            }
        } else {
            this.stopSubscription();
        }
    }

    handleError = (e: any) => {
        if (!this._mounted) {
            return;
        }
        console.warn(e);
        this.startSubsctiption();
    }

    tryFlushPending = (timeouted: boolean) => {
        if (this.pending.length > 0) {
            for (let update of this.pending) {
                let event = update.data.event;
                let seq = event.seq as number;
                if (seq === this.currentSeq + 1) {
                    // Our current update
                    let index = this.pending.indexOf(update);
                    this.pending = this.pending.splice(index, 1);
                    console.warn('Replay: ' + seq);
                    this.handleUpdate(update);
                    return;
                } else if (seq <= this.currentSeq) {
                    // Too old remove
                    let index = this.pending.indexOf(update);
                    this.pending = this.pending.splice(index, 1);
                }
            }

            if (timeouted && this.pending.length > 0) {
                // Reset pending storage in case if there will be some garbage events
                this.pending = [];
                // Subscription restart if updates not found
                if (timeouted && this._mounted && !this.doingFullRefresh) {
                    this.startSubsctiption();
                }
            }
        }
    }

    handleUpdate = (update: any) => {
        console.warn(update);
        if (!this._mounted) {
            return;
        }
        let event = update.data.event;
        let seq = event.seq as number;

        // Too old
        if (seq <= this.currentSeq) {
            console.warn('Too old seq #' + seq);
            return;
        }

        // Too new: invalidate
        if (seq > this.currentSeq + 1) {
            console.warn('Too new seq: ' + seq);

            // Too large
            if (seq > this.currentSeq + 2) {
                this.startSubsctiption();
            } else {
                this.pending.push(update);
                if (!this.pendingTimeout) {
                    this.pendingTimeout = window.setTimeout(
                        () => {
                            this.pendingTimeout = null;
                            this.tryFlushPending(true);
                        },
                        3000);
                }

            }
            return;
        }

        // Reset Pending Flush
        if (this.pendingTimeout) {
            window.clearTimeout(this.pendingTimeout);
            this.pendingTimeout = null;
        }

        console.warn('Next update #' + seq);

        if (event.__typename === 'ConversationEventMessage') {
            // Handle message
            console.warn('Received new message');
            let senderId = event.message.sender.id as string;
            if (senderId !== this.props.uid) {
                this.handleNewMessage();
            }

            // Update sequence number
            this.currentSeq = seq;

            // Write message to store
            let data = this.props.client.readQuery({
                query: ChatQuery.document,
                variables: { conversationId: this.props.conversationId }
            });
            (data as any).messages.seq = seq;
            (data as any).messages.messages = [event.message, ...(data as any).messages.messages];
            this.props.client.writeQuery({
                query: ChatQuery.document,
                variables: { conversationId: this.props.conversationId },
                data: data
            });
            this.tryFlushPending(false);
        } else {
            console.warn('Received unknown message');
            // Unknown message: Stop subscription and reload chat
            this.doingFullRefresh = true;
            this.stopSubscription();
            (async () => {
                let loaded = await backoff(() => this.props.client.query({
                    query: ChatQuery.document,
                    variables: { conversationId: this.props.conversationId },
                    fetchPolicy: 'network-only'
                }));
                if (!this._mounted) {
                    return;
                }
                this.currentSeq = (loaded.data as any).messages.seq;
                this.doingFullRefresh = false;
                this.tryFlushPending(false);
                this.startSubsctiption();
            })();
        }
    }

    render() {
        return null;
    }
}

const Name = Glamorous.div({
    fontSize: '14px',
    fontWeight: 500,
});

const DateComponent = Glamorous.div({
    fontSize: '14px',
    fontWeight: 300,
    opacity: 0.4
});

class MessageRender extends React.Component<{ message: MessageFullFragment }> {

    shouldComponentUpdate(nextProps: { message: MessageFullFragment }) {
        return (this.props.message !== nextProps.message);
    }

    render() {
        return (
            <XContent key={this.props.message.id}>
                <XHorizontal alignSelf="stretch">
                    <XAvatar cloudImageUuid={this.props.message.sender.picture ? this.props.message.sender.picture : undefined} />
                    <XVertical separator={'none'} flexGrow={1}>
                        <XHorizontal separator={4}>
                            <Name>{this.props.message.sender.name}</Name><DateComponent><XDate value={this.props.message.date} format="humanize" /></DateComponent>
                        </XHorizontal>
                        <span>{this.props.message.message}</span>
                    </XVertical>
                </XHorizontal>
            </XContent>
        );
    }
}

class MessageWrapper extends React.Component<{ messages: MessageFullFragment[] }> {
    shouldComponentUpdate(nextProps: { messages: MessageFullFragment[] }) {
        return nextProps.messages !== this.props.messages;
    }
    render() {
        return (
            <XVertical>
                {[...this.props.messages].reverse().map((v) => (
                    <MessageRender message={v} key={v.id} />
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
            try {
                let repeat = new Date().getTime();
                await this.props.sendMessage({ variables: { message: this.state.message.trim(), repeatKey: repeat } });
            } catch (e) {
                if (e.graphQLErrors && e.graphQLErrors.find((v: any) => v.doubleInvoke === true)) {
                    // Ignore
                } else {
                    // Just ignore for now
                    console.warn(e);
                }
            }
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