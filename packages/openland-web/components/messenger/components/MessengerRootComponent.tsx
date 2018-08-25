import * as React from 'react';
import { SetTypingMutation } from 'openland-api';
import { canUseDOM } from 'openland-x-utils/canUseDOM';
import { XLoader } from 'openland-x/XLoader';
import { MessengerEngine, MessengerContext } from 'openland-engines/MessengerEngine';
import { ConversationEngine } from 'openland-engines/messenger/ConversationEngine';
import { MessageListComponent } from './view/MessageListComponent';
import { withChatHistory } from '../../../api/withChatHistory';
import { MessageComposeComponent } from './view/MessageComposeComponent';
import { ConversationMessagesComponent } from './ConversationMessagesComponent';
import { MessagesContainer } from './view/MessagesContainer';
import { ConversationContainer } from './view/ConversationContainer';
import { UplaodCareUploading } from '../UploadCareUploading';

interface MessagesComponentProps {
    conversationId: string;
    loading: boolean;
    messenger: MessengerEngine;
    conversationType?: string;
}

interface MessagesComponentState {
    mounted: boolean;
    hideInput: boolean;
}

class MessagesComponent extends React.Component<MessagesComponentProps, MessagesComponentState> {

    readonly conversation: ConversationEngine;
    messagesList = React.createRef<MessageListComponent>();

    constructor(props: MessagesComponentProps) {
        super(props);
        this.conversation = this.props.messenger.getConversation(this.props.conversationId);
        this.state = {
            mounted: false,
            hideInput: false
        };
    }

    //
    // Lifecycle
    //

    shouldComponentUpdate(nextProps: MessagesComponentProps, nextState: MessagesComponentState) {
        return this.state.mounted !== nextState.mounted || this.props.loading !== nextProps.loading || this.state.hideInput !== nextState.hideInput;
    }

    componentDidMount() {
        this.setState({ mounted: true });
    }

    handleChange = async (text: string) => {
        let res = await this.props.messenger.client.client.mutate({
            mutation: SetTypingMutation.document,
            variables: {
                conversationId: this.props.conversationId
            }
        });
    }

    handleSend = (text: string) => {
        this.conversation.sendMessage(text);
    }

    handleSendFile = (file: UploadCare.File) => {
        this.conversation.sendFile(new UplaodCareUploading(file));
    }

    handleShowIput = (show: boolean) => {
        this.setState({
            hideInput: !show
        });
    }

    // 
    // Rendering
    //

    render() {
        return (
            <ConversationContainer>
                <ConversationMessagesComponent
                    conversation={this.conversation}
                    conversationId={this.props.conversationId}
                    conversationType={this.props.conversationType}
                    inputShower={this.handleShowIput}
                />
                {this.state.hideInput === false && (
                    <MessageComposeComponent
                        onChange={this.handleChange}
                        onSend={this.handleSend}
                        onSendFile={this.handleSendFile}
                        enabled={this.state.mounted}
                        conversationType={this.props.conversationType}
                        conversationId={this.props.conversationId}
                    />
                )}
            </ConversationContainer>
        );
    }
}

const Placeholder = withChatHistory(() => {
    return (
        <ConversationContainer>
            <MessagesContainer>
                <XLoader loading={true} />
            </MessagesContainer>
            <MessageComposeComponent enabled={false} />
        </ConversationContainer>
    );
});

interface MessengerRootComponentProps {
    conversationId: string;
    conversationType?: string;
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
                        conversationType={this.props.conversationType}
                    />
                )}
            </MessengerContext.Consumer>
        );
    }
}