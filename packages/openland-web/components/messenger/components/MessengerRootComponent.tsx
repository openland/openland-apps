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
import { withUserInfo } from '../../UserInfo';
import { UserShort } from 'openland-api/Types';
import { XText } from 'openland-x/XText';
import { withDeleteMessage } from '../../../api/withDeleteMessage';
import { withDeleteUrlAugmentation } from '../../../api/withDeleteUrlAugmentation';
import { withChatLeave } from '../../../api/withChatLeave';
import { XModalForm } from 'openland-x-modal/XModalForm2';
import { EditMessageContext, EditMessageContextProps } from './EditMessageContext';
import { ReplyMessageComponent } from './view/content/ReplyMessageModal';

interface MessagesComponentProps {
    conversationId: string;
    loading: boolean;
    messenger: MessengerEngine;
    conversationType?: string;
    me: UserShort | null;
}

interface MessagesComponentState {
    mounted: boolean;
    hideInput: boolean;
}

const DeleteMessageComponent = withDeleteMessage((props) => {
    let id = props.router.query.deleteMessage;
    return (
        <XModalForm
            title="Delete message"
            targetQuery="deleteMessage"
            submitBtnText="Delete"
            defaultAction={(data) => {
                props.deleteMessage({ variables: { messageId: id } });
            }}
            submitProps={{ succesText: 'Deleted!', style: 'danger' }}
        >
            <XText>Are you sure you want to delete this message? This cannot be undone.</XText>
        </XModalForm >
    );
});

const DeleteUrlAugmentationComponent = withDeleteUrlAugmentation((props) => {
    let id = props.router.query.deleteUrlAugmentation;
    return (
        <XModalForm
            title="Delete url augmentation"
            targetQuery="deleteUrlAugmentation"
            submitBtnText="Delete"
            defaultAction={(data) => {
                props.deleteUrlAugmentation({ variables: { messageId: id } });
            }}
            submitProps={{ succesText: 'Deleted!', style: 'danger' }}
        >
            <XText>Are you sure you want to delete this url preview? This cannot be undone.</XText>
        </XModalForm >
    );
});

const LeaveChatComponent = withChatLeave((props) => {
    let id = props.router.query.leaveFromChat;
    return (
        <XModalForm
            title="Leave the chat"
            targetQuery="leaveFromChat"
            submitBtnText="Leave"
            defaultAction={(data) => {
                props.leaveFromChat({ variables: { conversationId: id } });
            }}
            submitProps={{ succesText: 'Done!', style: 'danger' }}
        >
            <XText>Are you sure you want to leave? You will need to request access to join it again in the future.</XText>
        </XModalForm >
    );
});

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
                    me={this.props.me}
                    conversation={this.conversation}
                    conversationId={this.props.conversationId}
                    conversationType={this.props.conversationType}
                    inputShower={this.handleShowIput}
                />
                {this.state.hideInput === false && (
                    <MessageComposeComponent
                        conversation={this.conversation}
                        onChange={this.handleChange}
                        onSend={this.handleSend}
                        onSendFile={this.handleSendFile}
                        enabled={this.state.mounted}
                        conversationType={this.props.conversationType}
                        conversationId={this.props.conversationId}
                    />
                )}
                <DeleteUrlAugmentationComponent/>
                <DeleteMessageComponent />
                <LeaveChatComponent />
                <ReplyMessageComponent />
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

const MessagesWithUser = withUserInfo((props) => (
    <MessagesComponent
        me={props.user}
        loading={false}
        conversationId={props.conversationId}
        messenger={props.messenger}
        conversationType={props.conversationType}
    />
)) as React.ComponentType<{ conversationId: string, messenger: any, conversationType?: string }>;

export class MessengerRootComponent extends React.Component<MessengerRootComponentProps, EditMessageContextProps> {
    constructor(props: MessengerRootComponentProps) {
        super(props);

        this.state = {
            editMessageId: null,
            editMessage: null,
            setEditMessage: this.setEditMessage
        };
    }

    setEditMessage = (id: string | null, message: string | null) => {
        this.setState({
            editMessageId: id,
            editMessage: message
        });
    }

    render() {
        // We are not allowing messenger to be rendered on server side: just preload history and that's all
        if (!canUseDOM) {
            return <Placeholder variables={{ conversationId: this.props.conversationId }} />;
        }
        return (
            <EditMessageContext.Provider value={this.state}>
                <MessengerContext.Consumer>
                    {messenger => (
                        <MessagesWithUser
                            conversationId={this.props.conversationId}
                            messenger={messenger}
                            conversationType={this.props.conversationType}
                        />
                    )}
                </MessengerContext.Consumer>
            </EditMessageContext.Provider>
        );
    }
}