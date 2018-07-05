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
import UUID from 'uuid/v4';
import * as UploadCare from 'uploadcare-widget';
import { getConfig } from '../../config';

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

const PendingMessage = withUserInfo<{ message: string }>((props) => {
    return (
        <XContent>
            <XHorizontal alignSelf="stretch">
                <XAvatar cloudImageUuid={props.user!!.picture ? props.user!!.picture!! : undefined} />
                <XVertical separator={'none'} flexGrow={1}>
                    <XHorizontal separator={4}>
                        <Name>{props.user!!.name}</Name><DateComponent>Sending</DateComponent>
                    </XHorizontal>
                    {props.message}
                </XVertical>
            </XHorizontal>
        </XContent>
    );
});

class MessageList extends React.Component<{ messages: MessageFullFragment[], pending: { key: string, message: string }[] }> {
    shouldComponentUpdate(nextProps: { messages: MessageFullFragment[], pending: { key: string, message: string }[] }) {
        return nextProps.messages !== this.props.messages || nextProps.pending !== this.props.pending;
    }
    render() {
        return (
            <MessagesWrapper>
                {[...this.props.messages].reverse().map((v) => (
                    <MessageComponent message={v} key={v.id} />
                ))}
                {this.props.pending.map((v) => (
                    <PendingMessage key={v.key} message={v.message} />
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

class MessagesComponent extends React.Component<MessagesComponentProps, { message: string, mounted: boolean, sending: boolean, pending: { key: string, message: string }[] }> {

    scroller: any;
    state = {
        message: '',
        mounted: false,
        sending: false,
        pending: []
    };

    unmounter: (() => void) | null = null;
    xinput: any | null = null;

    handleScrollView = (src: any) => {
        if (src) {
            this.scroller = src;
        }
    }

    handleAttach = () => {
        let dialog = UploadCare.openDialog(null, {
            publicKey: getConfig().uploadcareKey!!,
            imageShrink: '1024x1024',
        });
        dialog.done((r) => {
            this.props.messenger.sendFile(this.props.conversationId, r, UUID());
        });
    }

    handleSend = async () => {
        if (this.state.message.trim().length > 0) {
            let key = UUID();
            let message = this.state.message.trim();
            try {
                this.setState((src) => ({ ...src, pending: [...src.pending, { key: key, message: message }] }));
                await this.props.messenger.sendMessage(this.props.conversationId, message, key);
            } catch (e) {
                if (e.graphQLErrors && e.graphQLErrors.find((v: any) => v.doubleInvoke === true)) {
                    // Ignore
                } else {
                    // Just ignore for now
                    console.warn(e);
                }
            }
            this.scroller.scrollToBottom();
            this.setState((src) => ({ ...src, message: '', pending: src.pending.filter((v) => v.key !== key) }), () => { this.xinput.focus(); });
        }
    }

    handleChange = (src: string) => {
        this.setState({ message: src });
    }

    handleRef = (src: any) => {
        if (src) {
            this.xinput = src;
        }
    }

    shouldComponentUpdate(nextProps: { messages: MessageFullFragment[], loading: boolean }, nextState: { message: string, mounted: boolean, sending: boolean, pending: { key: string, message: string }[] }) {
        return this.props.messages !== nextProps.messages || this.state.message !== nextState.message || this.state.mounted !== nextState.mounted || this.props.loading !== nextProps.loading || this.state.sending !== nextState.sending || this.state.pending !== nextState.pending;
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
                        <XInput placeholder="Write a message..." flexGrow={1} value={this.state.message} onChange={this.handleChange} onEnter={this.handleSend} disabled={this.state.sending} ref={this.handleRef} />
                        <XButton text="Send" size="medium" action={this.handleSend} iconRight="send" loading={this.state.sending} />
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