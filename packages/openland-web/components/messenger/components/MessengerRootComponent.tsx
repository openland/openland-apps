import * as React from 'react';
import * as UploadCare from 'uploadcare-widget';
import Glamorous from 'glamorous';
import { MessageFullFragment } from 'openland-api/Types';
import { XInput } from 'openland-x/XInput';
import { XButton } from 'openland-x/XButton';
import { XLoader } from 'openland-x/XLoader';
import { XHorizontal } from 'openland-x-layout/XHorizontal';
import { MessengerContext, MessengerEngine } from '../model/MessengerEngine';
import { canUseDOM } from 'openland-x-utils/canUseDOM';
import { getConfig } from '../../../config';
import { MessageSendHandler } from '../model/MessageSender';
import { MessageListComponent } from './MessageListComponent';
import { ConversationEngine } from '../model/ConversationEngine';
import { ConversationState } from '../model/ConversationState';
import { withChatHistory } from '../../../api/withChatHistory';

const ChatWrapper = Glamorous.div({
    width: '100%',
    maxHeight: '100%',
    flexGrow: 1,
    // display: 'flex',
    // flexDirection: 'column',
    // alignItems: 'center',
    overflow: 'hidden'
});

let ChatContainer = Glamorous.div({
    display: 'flex',
    flexBasis: '100%',
    height: 'calc(100% - 96px)',
    maxHeight: 'calc(100% - 96px)',
    flexGrow: 1,
    flexDirection: 'column',
    maxWidth: 900,
    margin: 'auto',
    width: '100%'
});

let MessagesContainer = Glamorous.div({
    display: 'flex',
    flexGrow: 1,
    flexDirection: 'column',
    justifyContent: 'flex-end',
    position: 'relative',
    maxHeight: '100%',
    overflow: 'hidden',
    '& > div:first-child': {
        width: '100%',
        maxWidth: '100%',
        '& > .simplebar-scroll-content > .simplebar-content': {
            overflowX: 'unset !important',
            overflowY: 'unset !important',
            width: '100%'
        }
    }
});

let SendMessageContainer = Glamorous(XHorizontal)({
    // flexGrow: 1,
    width: '100%',
    height: 96,
    flexDirection: 'row',
    alignItems: 'center',
    flexShrink: 0,
    flexBasis: 96,
    paddingLeft: 24,
    paddingRight: 24,
    borderTop: '1px solid rgba(229, 233, 242, 0.5)',
    zIndex: 10
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
    loading: boolean;
    messenger: MessengerEngine;
}

interface MessagesComponentState {
    message: string;
    mounted: boolean;
    loading: boolean;
    pending: PendingMessage[];
    messages: MessageFullFragment[];
}

class MessagesComponent extends React.Component<MessagesComponentProps, MessagesComponentState> implements MessageSendHandler {

    messagesList = React.createRef<MessageListComponent>();
    unmounter: (() => void) | null = null;
    unmounter2: (() => void) | null = null;
    xinput: any | null = null;
    isFocused: boolean = false;
    readonly conversation: ConversationEngine;

    constructor(props: MessagesComponentProps) {
        super(props);
        this.conversation = this.props.messenger.getConversation(this.props.conversationId);
        this.state = {
            message: '',
            mounted: false,
            pending: [],
            messages: this.conversation.getState().messages,
            loading: this.conversation.getState().loading,
        };
    }

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
        return this.state.messages !== nextState.messages || this.state.message !== nextState.message || this.state.mounted !== nextState.mounted || this.props.loading !== nextProps.loading || this.state.pending !== nextState.pending;
    }

    componentDidMount() {
        this.setState({ mounted: true });
        this.unmounter = this.props.messenger.mountConversation(this.props.conversationId);
        this.unmounter2 = this.conversation.subscribe(this.handleUpdates);
        // this.xinput.focus();
    }

    handleUpdates = (state: ConversationState) => {
        this.setState({ messages: state.messages, loading: state.loading }, () => {
            if (!state.loading && this.state.mounted) {
                if (!this.isFocused) {
                    this.isFocused = true;
                    this.xinput.focus();
                }
            }
        });
    }

    componentWillUnmount() {
        if (this.unmounter) {
            this.unmounter();
            this.unmounter = null;
        }
        if (this.unmounter2) {
            this.unmounter2();
            this.unmounter2 = null;
        }
    }

    // 
    // Rendering
    //

    render() {
        let isLoading = !this.state.mounted || this.state.loading;
        return (
            <ChatWrapper>
                <ChatContainer>
                    <MessagesContainer>
                        <MessageListComponent
                            conversation={this.conversation}
                            messages={this.state.messages}
                            pending={this.state.pending}
                            onCancel={this.handleCancel}
                            onRetry={this.handleRetry}
                            ref={this.messagesList}
                        />
                        <XLoader loading={isLoading} />
                    </MessagesContainer>
                </ChatContainer>
                <SendMessageContainer>
                    <XButton icon="add" size="medium" onClick={this.handleAttach} enabled={!isLoading} />
                    <XInput placeholder="Write a message..." flexGrow={1} value={this.state.message} onChange={this.handleChange} onEnter={this.handleSend} ref={this.handleRef} disabled={isLoading} />
                    <XButton text="Send" size="medium" action={this.handleSend} iconRight="send" enabled={isLoading} />
                </SendMessageContainer>
            </ChatWrapper>
        );
    }
}

const Placeholder = withChatHistory(() => {
    return (
        <ChatWrapper>
            <ChatContainer>
                <MessagesContainer>
                    <XLoader loading={true} />
                </MessagesContainer>
            </ChatContainer>
            <SendMessageContainer>
                <XButton icon="add" size="medium" enabled={false} />
                <XInput placeholder="Write a message..." flexGrow={1} disabled={true} />
                <XButton text="Send" size="medium" iconRight="send" enabled={false} />
            </SendMessageContainer>
        </ChatWrapper>
    );
});

interface MessengerRootComponentProps {
    conversationId: string;
}
export class MessengerRootComponent extends React.Component<MessengerRootComponentProps> {
    render() {
        // We are not allowing messenger to be rendered on server side: just preload history and that's all
        if (!canUseDOM) {
            return <Placeholder variables={{ conversationId: this.props.conversationId }} />;
        }
        return (
            <MessengerContext.Consumer>
                {messenger => (
                    <MessagesComponent
                        loading={false}
                        conversationId={this.props.conversationId}
                        messenger={messenger}
                    />
                )}
            </MessengerContext.Consumer>
        );
    }
}