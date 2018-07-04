import * as React from 'react';
import Glamorous from 'glamorous';
import { withUserInfo } from '../UserInfo';
import { withChat } from '../../api/withChat';
import { withQueryLoader } from '../withQueryLoader';
import { withApollo, Mutation } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { MessageFullFragment } from 'openland-api/Types';
import { XScrollViewReversed } from 'openland-x/XScrollViewReversed';
import { XInput } from 'openland-x/XInput';
import { XButton } from 'openland-x/XButton';
import { XLoader } from 'openland-x/XLoader';
import { XHorizontal } from 'openland-x-layout/XHorizontal';
import { XContent } from 'openland-x-layout/XContent';
import { XAvatar } from 'openland-x/XAvatar';
import { XVertical } from 'openland-x-layout/XVertical';
import { XDate } from 'openland-x-format/XDate';
import { MessengerWatcher } from './MessengerWatcher';
import { SendMessageMutation } from 'openland-api';
import { MessengerReader } from './MessengerReader';

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

const Name = Glamorous.div({
    fontSize: '14px',
    fontWeight: 500,
});

const DateComponent = Glamorous.div({
    fontSize: '14px',
    fontWeight: 300,
    opacity: 0.4
});

const Image = Glamorous.img({
    width: 400,
    height: 400,
    objectFit: 'scale-down'
});

class MessageComponent extends React.Component<{ message: MessageFullFragment }> {

    shouldComponentUpdate(nextProps: { message: MessageFullFragment }) {
        return (this.props.message !== nextProps.message);
    }

    render() {
        let src = this.props.message.message;
        let message = <span>{src}</span>;
        if (src.endsWith('.gif')) {
            message = <Image src={src} />;
        }
        return (
            <XContent key={this.props.message.id}>
                <XHorizontal alignSelf="stretch">
                    <XAvatar cloudImageUuid={this.props.message.sender.picture ? this.props.message.sender.picture : undefined} path={'/mail/u/' + this.props.message.sender.id} />
                    <XVertical separator={'none'} flexGrow={1}>
                        <XHorizontal separator={4}>
                            <Name>{this.props.message.sender.name}</Name><DateComponent><XDate value={this.props.message.date} format="humanize" /></DateComponent>
                        </XHorizontal>
                        {message}
                    </XVertical>
                </XHorizontal>
            </XContent>
        );
    }
}

class MessageList extends React.Component<{ messages: MessageFullFragment[] }> {
    shouldComponentUpdate(nextProps: { messages: MessageFullFragment[] }) {
        return nextProps.messages !== this.props.messages;
    }
    render() {
        return (
            <XVertical>
                {[...this.props.messages].reverse().map((v) => (
                    <MessageComponent message={v} key={v.id} />
                ))}
            </XVertical>
        );
    }
}

interface MessagesComponentProps {
    sendMessage: (args: any) => any;
    conversationId: string;
    messages: MessageFullFragment[];
    loading: boolean;
    uid: string;
}

class MessagesComponent extends React.Component<MessagesComponentProps, { message: string, mounted: boolean }> {

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
                await this.props.sendMessage({ variables: { message: this.state.message.trim(), repeatKey: repeat, conversationId: this.props.conversationId } });
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
                            <MessageList messages={this.props.messages} />
                        </XScrollViewReversed>
                    </MessagesContainer>
                    <MessengerReader conversationId={this.props.conversationId} lastMessageId={this.props.messages.length > 0 ? this.props.messages[0].id : null} />
                    <SendMessageContainer>
                        <XInput placeholder="Write a message..." flexGrow={1} value={this.state.message} onChange={this.handleChange} onEnter={this.handleSend} />
                        <XButton text="Send" size="medium" action={this.handleSend} iconRight="send" />
                    </SendMessageContainer>
                </Container>
                <XLoader loading={!this.state.mounted} />
            </>
        );
    }
}

interface ConversationRootProps {
    conversationId: string;
    seq: number;
    client: ApolloClient<{}>;
    uid: string;
    messages: MessageFullFragment[];
}

class ConversationRoot extends React.Component<ConversationRootProps> {
    render() {
        return (
            <>
                <MessengerWatcher
                    conversationId={this.props.conversationId}
                    seq={this.props.seq}
                    client={this.props.client}
                    uid={this.props.uid}
                />
                <Mutation mutation={SendMessageMutation.document}>
                    {(mutation) => (
                        <MessagesComponent
                            messages={this.props.messages}
                            loading={false}
                            uid={this.props.uid}
                            sendMessage={mutation}
                            conversationId={this.props.conversationId}
                        />
                    )}
                </Mutation>
            </>
        );
    }
}

export const MessengerComponent = withChat(withApollo(withQueryLoader(withUserInfo((props) => {
    return (
        <ConversationRoot
            key={props.data.chat.id}
            conversationId={props.data.chat.id}
            seq={props.data.messages.seq}
            messages={props.data.messages.messages}
            client={props.client}
            uid={props.user!!.id}
        />
    );
}))));