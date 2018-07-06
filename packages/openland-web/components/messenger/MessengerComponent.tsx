import * as React from 'react';
import * as UploadCare from 'uploadcare-widget';
import Glamorous from 'glamorous';
import { withUserInfo } from '../UserInfo';
import { withChat } from '../../api/withChat';
import { withQueryLoader } from '../withQueryLoader';
import { withApollo } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { MessageFullFragment, UserShortFragment } from 'openland-api/Types';
import { XInput } from 'openland-x/XInput';
import { XButton } from 'openland-x/XButton';
import { XLoader } from 'openland-x/XLoader';
import { XHorizontal } from 'openland-x-layout/XHorizontal';
import { MessengerWatcher } from './model/MessengerWatcher';
import { MessengerReader } from './model/MessengerReader';
import { MessengerContext, MessengerEngine } from './MessengerEngine';
import { canUseDOM } from 'openland-x-utils/canUseDOM';
import { getConfig } from '../../config';
import { MessageSendHandler } from './model/MessageSender';
import { MessageListComponent } from './components/MessageListComponent';

let Container = Glamorous.div({
    display: 'flex',
    flexBasis: 0,
    flexGrow: 1,
    flexDirection: 'column',
    maxWidth: '900px'
});

let MessagesContainer = Glamorous.div({
    display: 'flex',
    flexGrow: 1,
    flexDirection: 'column',
    justifyContent: 'flex-end'
});

let SendMessageContainer = Glamorous(XHorizontal)({
    height: '96px',
    flexDirection: 'row',
    flexShrink: 0,
    paddingTop: '0px',
    paddingLeft: '24px',
    paddingRight: '24px'
});

interface PendingMessage {
    key: string;
    progress: number;
    message: string | null;
    file: string | null;
    failed?: boolean;
}

interface MessagesComponentProps {
    conversationId: string;
    messages: MessageFullFragment[];
    loading: boolean;
    me: UserShortFragment;
    messenger: MessengerEngine;
}

interface MessagesComponentState {
    message: string;
    mounted: boolean;
    pending: PendingMessage[];
}

class MessagesComponent extends React.Component<MessagesComponentProps, MessagesComponentState> implements MessageSendHandler {

    state = {
        message: '',
        mounted: false,
        pending: []
    };
    messagesList = React.createRef<MessageListComponent>();
    unmounter: (() => void) | null = null;
    xinput: any | null = null;

    //
    // Message Sending
    //

    handleAttach = () => {
        let dialog = UploadCare.openDialog(null, {
            publicKey: getConfig().uploadcareKey!!,
            imageShrink: '1024x1024',
        });
        dialog.done((r) => {
            let isFirst = true;
            r.progress((v) => {
                if (!isFirst) {
                    return;
                }
                isFirst = false;
                console.warn(v.incompleteFileInfo);
                let name = v.incompleteFileInfo.name || 'image.jpg';
                let key = this.props.messenger.sender.sendFile(this.props.conversationId, r, this);
                this.messagesList.current!!.scrollToBottom();
                this.setState((src) => ({ ...src, pending: [...src.pending, { key: key, progress: 0, message: null, file: name }] }), () => {
                    this.xinput.focus();
                    this.messagesList.current!!.scrollToBottom();
                });
            });
        });
    }

    handleSend = () => {
        if (this.state.message.trim().length > 0) {
            let message = this.state.message.trim();
            let key = this.props.messenger.sender.sendMessage(this.props.conversationId, message, this);
            this.setState((src) => ({ ...src, message: '', pending: [...src.pending, { key: key, progress: 0, message: message, file: null, }] }), () => {
                this.xinput.focus();
                this.messagesList.current!!.scrollToBottom();
            });
        }
    }

    handleRetry = (key: string) => {
        console.warn(key + ': retry');
        this.props.messenger.sender.retryMessage(key, this);
        this.setState((src) => ({ ...src, pending: src.pending.map((v) => v.key === key ? ({ ...v, failed: false }) : v) }));
    }
    handleCancel = (key: string) => {
        console.warn(key + ': cancel');
        this.setState((src) => ({ ...src, pending: src.pending.filter((v) => v.key !== key) }));
    }

    onProgress = (key: string, progress: number) => {
        console.warn(key + ': ' + progress);
        this.setState((src) => ({ ...src, pending: src.pending.map((v) => v.key === key ? ({ ...v, progress: progress }) : v) }));
    }

    onCompleted = (key: string) => {
        console.warn(key + ': completed');
        this.setState((src) => ({ ...src, pending: src.pending.filter((v) => v.key !== key) }));
    }

    onFailed = (key: string) => {
        console.warn(key + ': failed');
        this.setState((src) => ({ ...src, pending: src.pending.map((v) => v.key === key ? ({ ...v, failed: true }) : v) }));
    }

    //
    // Input Handling
    //

    handleChange = (src: string) => {
        this.setState({ message: src });
    }

    handleRef = (src: any) => {
        if (src) {
            this.xinput = src;
        }
    }

    //
    // Lifecycle
    //

    shouldComponentUpdate(nextProps: MessagesComponentProps, nextState: MessagesComponentState) {
        return this.props.messages !== nextProps.messages || this.state.message !== nextState.message || this.state.mounted !== nextState.mounted || this.props.loading !== nextProps.loading || this.state.pending !== nextState.pending;
    }

    componentDidMount() {
        this.setState({ mounted: true });
        this.unmounter = this.props.messenger.openConversation(this.props.conversationId);
        this.xinput.focus();
    }

    componentWillUnmount() {
        if (this.unmounter) {
            this.unmounter();
            this.unmounter = null;
        }
    }

    // 
    // Rendering
    //

    render() {
        return (
            <>
                <Container>
                    <MessagesContainer>
                        <MessageListComponent
                            messages={this.props.messages}
                            pending={this.state.pending}
                            onCancel={this.handleCancel}
                            onRetry={this.handleRetry}
                            me={this.props.me}
                            ref={this.messagesList}
                        />
                    </MessagesContainer>
                    <MessengerReader conversationId={this.props.conversationId} lastMessageId={this.props.messages.length > 0 ? this.props.messages[0].id : null} />
                    <SendMessageContainer>
                        <XButton icon="add" size="medium" onClick={this.handleAttach} />
                        <XInput placeholder="Write a message..." flexGrow={1} value={this.state.message} onChange={this.handleChange} onEnter={this.handleSend} ref={this.handleRef} />
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
    me: UserShortFragment;
    messages: MessageFullFragment[];
}

class ConversationRoot extends React.Component<ConversationRootProps> {
    render() {
        if (!canUseDOM) {
            return null;
        }
        return (
            <>
                <MessengerWatcher
                    conversationId={this.props.conversationId}
                    seq={this.props.seq}
                    client={this.props.client}
                    uid={this.props.me.id}
                />
                <MessengerContext.Consumer>
                    {messenger => (
                        <MessagesComponent
                            messages={this.props.messages}
                            loading={false}
                            me={this.props.me}
                            conversationId={this.props.conversationId}
                            messenger={messenger}
                        />
                    )}
                </MessengerContext.Consumer>
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
            me={props.user!!}
        />
    );
}))));