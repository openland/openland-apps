import * as React from 'react';
import Glamorous from 'glamorous';
import { withUserInfo } from '../UserInfo';
import { withChat } from '../../api/withChat';
import { withQueryLoader } from '../withQueryLoader';
import { withApollo } from 'react-apollo';
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
import { MessengerReader } from './MessengerReader';
import { MessengerContext, MessengerEngine } from './MessengerEngine';
import { canUseDOM } from 'openland-x-utils/canUseDOM';
import * as UploadCare from 'uploadcare-widget';
import { getConfig } from '../../config';
import { MessageSendHandler } from './MessageSender';

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

const MessagesWrapper = Glamorous(XVertical)({
    paddingTop: '96px',
    paddingLeft: '16px',
    paddingRight: '16px',
    paddingBottom: '24px'
});

class MessageComponent extends React.Component<{ message: MessageFullFragment }> {

    shouldComponentUpdate(nextProps: { message: MessageFullFragment }) {
        return (this.props.message !== nextProps.message);
    }

    render() {
        let src = this.props.message.message;
        let message = <span>{src}</span>;
        if (this.props.message.file) {
            if (this.props.message.fileMetadata!!.isImage) {
                if (this.props.message.fileMetadata!!.imageFormat === 'GIF') {
                    message = (
                        <video width="400" height="400" autoPlay={true} loop={true} muted={true} webkit-playsinline={true} playsinline={true}>
                            <source src={'https://ucarecdn.com/' + this.props.message.file + '/gif2video/-/format/webm/road.gif'} type="video/webm" />
                            <source src={'https://ucarecdn.com/' + this.props.message.file + '/gif2video/-/format/mp4/road.gif'} type="video/mp4" />
                        </video>
                    );
                } else {
                    message = (
                        <Image src={'https://ucarecdn.com/' + this.props.message.file + '/' + this.props.message.fileMetadata!!.name} />
                    );
                }
            } else {
                message = (
                    <>
                        <XButton
                            href={'https://ucarecdn.com/' + this.props.message.file + '/' + this.props.message.fileMetadata!!.name}
                            text={this.props.message.fileMetadata!!.name}
                            alignSelf="flex-start"
                        />
                        <span>{this.props.message.fileMetadata!!.size}</span>
                    </>
                );
            }
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
interface PendingMessage {
    key: string;
    progress: number;
    message: string | null;
    file: string | null;
    failed?: boolean;
}

const PendingMessageComponent = withUserInfo<{ message: PendingMessage }>((props) => {
    return (
        <XContent>
            <XHorizontal alignSelf="stretch">
                <XAvatar cloudImageUuid={props.user!!.picture ? props.user!!.picture!! : undefined} />
                <XVertical separator={'none'} flexGrow={1}>
                    <XHorizontal separator={4}>
                        <Name>{props.user!!.name}</Name><DateComponent>{props.message.failed ? 'Failed' : 'Sending'}</DateComponent>
                    </XHorizontal>
                    {!props.message.message && <span>{props.message.file} {props.message.progress < 1 ? props.message.progress.toString() : null}</span>}
                    {props.message.message && <span>{props.message.message}</span>}
                    {props.message.failed && (
                        <XHorizontal>
                            <XButton onClick={() => console.info('cancel')} text="Cancel" />
                            <XButton onClick={() => console.info('retry')} text="Try Again" />
                        </XHorizontal>
                    )}
                </XVertical>
            </XHorizontal>
        </XContent>
    );
});

class MessageList extends React.Component<{ messages: MessageFullFragment[], pending: PendingMessage[] }> {
    shouldComponentUpdate(nextProps: { messages: MessageFullFragment[], pending: PendingMessage[] }) {
        return nextProps.messages !== this.props.messages || nextProps.pending !== this.props.pending;
    }
    render() {
        return (
            <MessagesWrapper>
                {[...this.props.messages].reverse().map((v) => (
                    <MessageComponent message={v} key={v.id} />
                ))}
                {this.props.pending.map((v) => (
                    <PendingMessageComponent key={v.key} message={v} />
                ))}
            </MessagesWrapper>
        );
    }
}

interface MessagesComponentProps {
    conversationId: string;
    messages: MessageFullFragment[];
    loading: boolean;
    uid: string;
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
    scroller: any;
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
                this.scroller.scrollToBottom();
                this.setState((src) => ({ ...src, pending: [...src.pending, { key: key, progress: 0, message: null, file: name }] }));
            });
        });
    }

    handleSend = () => {
        if (this.state.message.trim().length > 0) {
            let message = this.state.message.trim();
            let key = this.props.messenger.sender.sendMessage(this.props.conversationId, message, this);
            this.scroller.scrollToBottom();
            this.setState((src) => ({ ...src, message: '', pending: [...src.pending, { key: key, progress: 0, message: message, file: null, }] }), () => { this.xinput.focus(); });
        }
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
    // Scroll Handler
    //

    handleScrollView = (src: any) => {
        if (src) {
            this.scroller = src;
        }
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
                        <XScrollViewReversed ref={this.handleScrollView}>
                            <MessageList messages={this.props.messages} pending={this.state.pending} />
                        </XScrollViewReversed>
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
    uid: string;
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
                    uid={this.props.uid}
                />
                <MessengerContext.Consumer>
                    {messenger => (
                        <MessagesComponent
                            messages={this.props.messages}
                            loading={false}
                            uid={this.props.uid}
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
            uid={props.user!!.id}
        />
    );
}))));