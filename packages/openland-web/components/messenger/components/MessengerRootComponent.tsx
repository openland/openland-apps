import * as React from 'react';
import { SetTypingMutation } from 'openland-api';
import { canUseDOM } from 'openland-x-utils/canUseDOM';
import { XLoader } from 'openland-x/XLoader';
import { MessengerEngine, MessengerContext } from 'openland-engines/MessengerEngine';
import { ConversationEngine, ConversationStateHandler } from 'openland-engines/messenger/ConversationEngine';
import { ModelMessage } from 'openland-engines/messenger/types';
import { ConversationState } from 'openland-engines/messenger/ConversationState';
import { withChatHistory } from '../../../api/withChatHistory';
import { MessageComposeComponentDraft } from './view/MessageComposeComponent';
import { ConversationMessagesComponent } from './ConversationMessagesComponent';
import { MessagesContainer } from './view/MessagesContainer';
import { ConversationContainer } from './view/ConversationContainer';
import { UplaodCareUploading } from '../UploadCareUploading';
import { withUserInfo } from '../../UserInfo';
import { UserShort, SharedRoomKind } from 'openland-api/Types';
import { XText } from 'openland-x/XText';
import { withDeleteMessage } from '../../../api/withDeleteMessage';
import { withDeleteUrlAugmentation } from '../../../api/withDeleteUrlAugmentation';
import { XModalForm } from 'openland-x-modal/XModalForm2';
import {
    MessageFull_mentions
} from 'openland-api/Types';
import { MessagesStateContext, MessagesStateContextProps } from './MessagesStateContext';
import { withChatLeave } from '../../../api/withChatLeave';

interface MessagesComponentProps {
    conversationId: string;
    loading: boolean;
    messenger: MessengerEngine;
    conversationType?: SharedRoomKind | 'PRIVATE';
    me: UserShort | null;
}

interface MessagesComponentState {
    hideInput: boolean;
    loading: boolean;
    messages: ModelMessage[];
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

export const LeaveChatComponent = withChatLeave((props) => {
    let id = props.router.query.leaveFromChat;
    return (
        <XModalForm
            title="Leave the chat"
            targetQuery="leaveFromChat"
            submitBtnText="Leave"
            defaultAction={(data) => {
                props.leaveFromChat({ variables: { roomId: id } });
            }}
            submitProps={{ succesText: 'Done!', style: 'danger' }}
        >
            <XText>Are you sure you want to leave? You will need to request access to join it again in the future.</XText>
        </XModalForm >
    );
});

class MessagesComponent extends React.Component<MessagesComponentProps, MessagesComponentState> implements ConversationStateHandler {
    messagesList = React.createRef<ConversationMessagesComponent>();
    private conversation: ConversationEngine | null;
    messageText: string = '';
    unmounter: (() => void) | null = null;
    unmounter2: (() => void) | null = null;

    constructor(props: MessagesComponentProps) {
        super(props);

        this.conversation = null;
        this.state = {
            hideInput: false,
            messages: [],
            loading: true
        };
    }

    onMessageSend = () => {
        if (this.messagesList.current) {
            this.messagesList.current.scrollToBottom();
        }
    }

    //
    // Lifecycle
    //

    onConversationUpdated = (state: ConversationState) => {
        this.setState({ loading: state.loading, messages: state.messages });
    }

    updateConversation = (props: MessagesComponentProps) => {
        if (this.unmounter) {
            this.unmounter();
        }
        if (this.unmounter2) {
            this.unmounter2();
        }

        this.conversation = props.messenger.getConversation(props.conversationId);
        this.unmounter = this.conversation.engine.mountConversation(props.conversationId);
        this.unmounter2 = this.conversation.subscribe(this);

        if (!this.conversation) {
            throw Error('conversation should be defined here');
        }
        let convState = this.conversation.getState();

        this.setState({
            messages: convState.messages,
            loading: convState.loading
        });
    }

    componentWillUnmount() {
        if (this.unmounter) {
            this.unmounter();
        }
        if (this.unmounter2) {
            this.unmounter2();
        }
    }

    componentWillMount() {
        this.updateConversation(this.props);
    }

    componentWillReceiveProps(props: MessagesComponentProps) {
        this.updateConversation(props);
    }

    handleChange = async (text: string) => {
        let prevLength = this.messageText.length;
        let curLength = text.length;

        if (prevLength < curLength) {
            await this.props.messenger.client.client.mutate({
                mutation: SetTypingMutation.document,
                variables: {
                    conversationId: this.props.conversationId
                }
            });
        }

        if (prevLength > 0 && curLength <= 0) {
            // UnSetTyping MUTATION
        }

        this.messageText = text;
    }

    handleSend = (text: string, mentions: MessageFull_mentions[] | null) => {
        if (!this.conversation) {
            throw Error('conversation should be defined here');
        }

        this.conversation.sendMessage(text, mentions);
    }

    handleSendFile = (file: UploadCare.File) => {
        if (!this.conversation) {
            throw Error('conversation should be defined here');
        }
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
        if (!this.conversation) {
            throw Error('conversation should be defined here');
        }
        return (
            <ConversationContainer>
                <ConversationMessagesComponent
                    ref={this.messagesList}
                    key={this.props.conversationId}
                    me={this.props.me}
                    messages={this.state.messages}
                    loading={this.state.loading}
                    conversation={this.conversation}
                    conversationId={this.props.conversationId}
                    conversationType={this.props.conversationType}
                    inputShower={this.handleShowIput}
                />
                {this.state.hideInput === false && (
                    <MessageComposeComponentDraft
                        conversation={this.conversation}
                        onChange={this.handleChange}
                        onSend={this.handleSend}
                        onSendFile={this.handleSendFile}
                        enabled={true}
                        conversationType={this.props.conversationType}
                        conversationId={this.props.conversationId}
                        variables={{
                            roomId: this.props.conversationId,
                            conversationId: this.props.conversationId,
                        }}
                    />
                )}
                <DeleteUrlAugmentationComponent />
                <DeleteMessageComponent />
                <LeaveChatComponent />
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
            <MessageComposeComponentDraft enabled={false} />
        </ConversationContainer>
    );
});

interface MessengerRootComponentProps {
    conversationId: string;
    conversationType: SharedRoomKind | 'PRIVATE';
}

const MessagesWithUser = withUserInfo((props) => (
    <MessagesComponent
        me={props.user}
        loading={false}
        conversationId={props.conversationId}
        messenger={props.messenger}
        conversationType={props.conversationType}
    />
)) as React.ComponentType<{ conversationId: string, messenger: any, conversationType: SharedRoomKind | 'PRIVATE' }>;

export const MessengerRootComponent = (props: MessengerRootComponentProps) => {
    // We are not allowing messenger to be rendered on server side: just preload history and that's all
    if (!canUseDOM) {
        return <Placeholder variables={{ roomId: props.conversationId }} />;
    }
    return (
        <MessengerContext.Consumer>
            {messenger => (
                <MessagesWithUser
                    conversationId={props.conversationId}
                    messenger={messenger}
                    conversationType={props.conversationType}
                />
            )}
        </MessengerContext.Consumer>
    );
};
