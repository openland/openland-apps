import * as React from 'react';
import { canUseDOM } from 'openland-x-utils/canUseDOM';
import { MessageListComponent } from './view/MessageListComponent';
import { withChatHistory } from '../../../api/withChatHistory';
import { MessageComposeComponent } from './view/MessageComposeComponent';
import { ConversationMessagesComponent } from './ConversationMessagesComponent';
import { MessagesContainer } from './view/MessagesContainer';
import { XLoader } from 'openland-x/XLoader';
import { ConversationContainer } from './view/ConversationContainer';
import { MessengerEngine, MessengerContext } from 'openland-engines/MessengerEngine';
import { ConversationEngine } from 'openland-engines/messenger/ConversationEngine';
import { UplaodCareUploading } from '../UploadCareUploading';
import { SetTypingMutation } from 'openland-api';

interface MessagesComponentProps {
    conversationId: string;
    loading: boolean;
    messenger: MessengerEngine;
}

interface MessagesComponentState {
    mounted: boolean;
}

class MessagesComponent extends React.Component<MessagesComponentProps, MessagesComponentState> {

    readonly conversation: ConversationEngine;
    messagesList = React.createRef<MessageListComponent>();

    constructor(props: MessagesComponentProps) {
        super(props);
        this.conversation = this.props.messenger.getConversation(this.props.conversationId);
        this.state = {
            mounted: false,
        };
    }

    //
    // Lifecycle
    //

    shouldComponentUpdate(nextProps: MessagesComponentProps, nextState: MessagesComponentState) {
        return this.state.mounted !== nextState.mounted || this.props.loading !== nextProps.loading;
    }

    componentDidMount() {
        this.setState({ mounted: true });
    }

    handleChange = async (text: string) => {
        let res = await this.props .messenger.client.client.mutate({
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

    // 
    // Rendering
    //

    render() {
        return (
            <ConversationContainer>
                <ConversationMessagesComponent conversation={this.conversation} />
                <MessageComposeComponent onChange={this.handleChange} onSend={this.handleSend} onSendFile={this.handleSendFile} enabled={this.state.mounted} />
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