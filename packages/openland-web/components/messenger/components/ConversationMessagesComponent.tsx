import * as React from 'react';
import { MessageListComponent } from './view/MessageListComponent';
import { XLoader } from 'openland-x/XLoader';
import { ModelMessage } from '../model/types';
import { ConversationEngine, ConversationStateHandler } from '../model/ConversationEngine';
import { ConversationState } from '../model/ConversationState';
import { MessagesContainer } from './view/MessagesContainer';

export class ConversationMessagesComponent extends React.PureComponent<{ conversation: ConversationEngine }, { mounted: boolean, loading: boolean, messages: ModelMessage[] }> implements ConversationStateHandler {

    messagesList = React.createRef<MessageListComponent>();
    unmounter: (() => void) | null = null;
    unmounter2: (() => void) | null = null;

    constructor(props: { conversation: ConversationEngine }) {
        super(props);
        let convState = props.conversation.getState();
        this.state = {
            messages: convState.messages,
            loading: convState.loading,
            mounted: false
        };
    }

    componentDidMount() {
        this.setState({ mounted: true });
        this.unmounter = this.props.conversation.engine.mountConversation(this.props.conversation.conversationId);
        this.unmounter2 = this.props.conversation.subscribe(this);
    }

    onConversationUpdated = (state: ConversationState) => {
        this.setState({ loading: state.loading, messages: state.messages });
    }
    onMessageSend = () => {
        if (this.messagesList.current) {
            this.messagesList.current.scrollToBottom();
        }
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

    render() {
        return (
            <MessagesContainer>
                <MessageListComponent
                    conversation={this.props.conversation}
                    messages={this.state.messages}
                    ref={this.messagesList}
                />
                <XLoader loading={!this.state.mounted || this.state.loading} />
            </MessagesContainer>
        );
    }
}