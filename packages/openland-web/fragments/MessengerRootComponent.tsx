import * as React from 'react';
import { XView } from 'react-mental';
import { MessengerEngine, MessengerContext } from 'openland-engines/MessengerEngine';
import {
    ConversationEngine,
    ConversationStateHandler,
} from 'openland-engines/messenger/ConversationEngine';
import { ModelMessage } from 'openland-engines/messenger/types';
import { ConversationState } from 'openland-engines/messenger/ConversationState';
import { IsMobileContext } from 'openland-web/components/Scaffold/IsMobileContext';
import {
    MessageComposeComponentDraft,
    MessageComposeComponentProps,
} from './MessageComposeComponent/MessageComposeComponentDesktop';
import { MobileMessageCompose } from './MessageComposeComponent/MessageComposeComponentMobile';
import { ConversationMessagesComponent } from '../components/messenger/ConversationMessagesComponent';
import { UplaodCareUploading } from '../utils/UploadCareUploading';
import {
    UserShort,
    SharedRoomKind,
    PostMessageType,
    Room_room_SharedRoom_pinnedMessage_GeneralMessage,
    Room_room_SharedRoom,
    Room_room_PrivateRoom,
} from 'openland-api/Types';
import { XText } from 'openland-x/XText';
import { withDeleteMessage } from '../api/withDeleteMessage';
import { withDeleteUrlAugmentation } from '../api/withDeleteUrlAugmentation';
import { XModalForm } from 'openland-x-modal/XModalForm2';
import { withChatLeave } from '../api/withChatLeave';
import { CreatePostComponent } from './post/CreatePostComponent';
import { XMemo } from 'openland-y-utils/XMemo';
import { UploadContextProvider } from './MessageComposeComponent/FileUploading/UploadContext';
import { PinMessageComponent } from 'openland-web/fragments/chat/PinMessage';

export interface File {
    uuid: string;
    name: string;
    size: string;
    isImage: boolean;
}

export interface EditPostProps {
    title: string;
    text: string;
    postTipe: PostMessageType | null;
    files: Set<File> | null;
    messageId: string;
}

interface MessagesComponentProps {
    onConversationLostAccess?: Function;
    isActive: boolean;
    organizationId: string | null;
    conversationId: string;
    loading: boolean;
    messenger: MessengerEngine;
    conversationType?: SharedRoomKind | 'PRIVATE';
    me: UserShort | null;
    objectName: string;
    objectId?: string;
    cloudImageUuid?: string;
    pinMessage: Room_room_SharedRoom_pinnedMessage_GeneralMessage | null;
    room: Room_room_SharedRoom | Room_room_PrivateRoom;
}

interface MessagesComponentState {
    hideInput: boolean;
    loading: boolean;
    messages: ModelMessage[];
    hideChat: boolean;
    postType: PostMessageType | null;
    postEditData: EditPostProps | null;
    messageListScrollPosition: number;
}

const DeleteMessageComponent = withDeleteMessage(props => {
    let id = props.router.query.deleteMessage;
    return (
        <XModalForm
            title="Delete message"
            targetQuery="deleteMessage"
            submitBtnText="Delete"
            defaultAction={data => {
                props.deleteMessage({ variables: { messageId: id } });
            }}
            submitProps={{ successText: 'Deleted!', style: 'danger' }}
        >
            <XText>Are you sure you want to delete this message? This cannot be undone.</XText>
        </XModalForm>
    );
});

const DeleteUrlAugmentationComponent = withDeleteUrlAugmentation(props => {
    let id = props.router.query.deleteUrlAugmentation;
    return (
        <XModalForm
            title="Delete link preview"
            targetQuery="deleteUrlAugmentation"
            submitBtnText="Delete"
            defaultAction={data => {
                props.deleteUrlAugmentation({ variables: { messageId: id } });
            }}
            submitProps={{ successText: 'Deleted!', style: 'danger' }}
        >
            <XText>Are you sure you want to delete this url preview? This cannot be undone.</XText>
        </XModalForm>
    );
});

export const LeaveChatComponent = withChatLeave(props => {
    let id = props.router.query.leaveFromChat;
    return (
        <XModalForm
            title="Leave the chat"
            targetQuery="leaveFromChat"
            submitBtnText="Leave"
            defaultAction={data => {
                props.leaveFromChat({ variables: { roomId: id } });
            }}
            submitProps={{ successText: 'Done!', style: 'danger' }}
        >
            <XText>
                Are you sure you want to leave? You will need to request access to join it again in
                the future.
            </XText>
        </XModalForm>
    );
});

interface ComposeHandlerProps extends MessageComposeComponentProps {
    isActive: boolean;
    variables?: {
        roomId?: string;
        conversationId?: string;
        organizationId: string | null;
    };
}

const MessageComposeHandler = XMemo<ComposeHandlerProps>(props => {
    const isMobile = React.useContext(IsMobileContext);
    if (isMobile) {
        return <MobileMessageCompose {...props} />;
    }
    return <MessageComposeComponentDraft {...props} />;
});

class MessagesComponent extends React.Component<MessagesComponentProps, MessagesComponentState>
    implements ConversationStateHandler {
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
            loading: true,
            hideChat: false,
            postType: null,
            postEditData: null,
            messageListScrollPosition: 0,
        };
    }

    onMessageSend = () => {
        if (this.messagesList.current) {
            this.messagesList.current.scrollToBottom();
        }
    };

    onConversationLostAccess = () => {
        if (this.props.onConversationLostAccess) {
            this.unsubscribe();
            this.props.messenger.removeConversation(this.props.conversationId);
            this.props.onConversationLostAccess();
        }
    };

    onMessageListScroll = (scrollPosition: number) => {
        this.setState({
            messageListScrollPosition: scrollPosition,
        });
    };

    //
    // Lifecycle
    //

    onConversationUpdated = (state: ConversationState) => {
        this.setState({ loading: state.loading, messages: state.messages });
    };

    unsubscribe = () => {
        if (this.unmounter) {
            this.unmounter();
            this.unmounter = null;
        }
        if (this.unmounter2) {
            this.unmounter2();
            this.unmounter2 = null;
        }
    };

    updateConversation = (props: MessagesComponentProps) => {
        this.unsubscribe();

        if (props.isActive) {
            this.conversation = props.messenger.getConversation(props.conversationId);
            this.unmounter = this.conversation.engine.mountConversation(props.conversationId);

            this.unmounter2 = this.conversation.subscribe(this);

            if (!this.conversation) {
                throw Error('conversation should be defined here');
            }
            let convState = this.conversation.getState();

            this.setState({
                messages: convState.messages,
                loading: convState.loading,
            });
        }
    };

    componentWillUnmount() {
        this.unsubscribe();
    }

    componentWillMount() {
        this.updateConversation(this.props);
    }

    componentWillReceiveProps(props: MessagesComponentProps) {
        this.updateConversation(props);

        if (this.props.conversationId !== props.conversationId) {
            this.setState({
                hideChat: false,
            });
        }
    }

    handleChange = async (text: string) => {
        if (this.state.messageListScrollPosition < 40) {
            if (this.messagesList.current) {
                this.messagesList.current.scrollToBottom();
            }
        }
        let prevLength = this.messageText.length;
        let curLength = text.length;

        if (prevLength < curLength) {
            await this.props.messenger.client.mutateSetTyping({
                conversationId: this.props.conversationId,
            });
        }

        if (prevLength > 0 && curLength <= 0) {
            // UnSetTyping MUTATION
        }

        this.messageText = text;
    };

    handleSend = (text: string, mentions: UserShort[] | null) => {
        if (!this.conversation) {
            throw Error('conversation should be defined here');
        }

        this.conversation.sendMessage(text, mentions);
    };

    handleSendFile = (file: UploadCare.File) => {
        if (!this.conversation) {
            throw Error('conversation should be defined here');
        }
        this.conversation.sendFile(new UplaodCareUploading(file));
    };

    handleShowIput = (show: boolean) => {
        this.setState({
            hideInput: !show,
        });
    };

    handleHideChat = (show: boolean, postTipe: PostMessageType | null) => {
        this.setState({
            hideChat: show,
            postType: postTipe,
            postEditData: null,
        });
    };

    editPostHandler = (data: EditPostProps) => {
        this.setState({
            hideChat: true,
            postType: data.postTipe,
            postEditData: data,
        });
    };

    getMessages = () => {
        return this.state.messages;
    };

    //
    // Rendering
    //

    render() {
        // console.log('render MessagesComponent');
        if (!this.conversation) {
            return null;
        }

        return (
            <XView flexDirection="column" flexGrow={1} flexShrink={1}>
                {this.state.hideChat && (
                    <CreatePostComponent
                        handleHideChat={this.handleHideChat}
                        conversationId={this.props.conversationId}
                        postType={this.state.postType}
                        editData={this.state.postEditData}
                        objectName={this.props.objectName}
                        objectId={this.props.objectId}
                        cloudImageUuid={this.props.cloudImageUuid}
                    />
                )}
                {!this.state.hideChat && (
                    <>
                        {this.props.pinMessage && (
                            <PinMessageComponent
                                pinMessage={this.props.pinMessage}
                                chatId={this.props.conversationId}
                                room={this.props.room}
                            />
                        )}
                        <ConversationMessagesComponent
                            isActive={this.props.isActive}
                            ref={this.messagesList}
                            key={this.props.conversationId}
                            me={this.props.me}
                            messages={this.state.messages}
                            loading={this.state.loading}
                            conversation={this.conversation}
                            conversationId={this.props.conversationId}
                            conversationType={this.props.conversationType}
                            inputShower={this.handleShowIput}
                            editPostHandler={this.editPostHandler}
                            scrollPosition={this.onMessageListScroll}
                        />

                        {!this.state.hideInput && (
                            <UploadContextProvider>
                                <MessageComposeHandler
                                    isActive={this.props.isActive}
                                    getMessages={this.getMessages}
                                    conversation={this.conversation}
                                    onChange={this.handleChange}
                                    onSend={this.handleSend}
                                    onSendFile={this.handleSendFile}
                                    enabled={true}
                                    conversationType={this.props.conversationType}
                                    conversationId={this.props.conversationId}
                                    handleHideChat={this.handleHideChat}
                                    variables={{
                                        roomId: this.props.conversationId,
                                        conversationId: this.props.conversationId,
                                        organizationId: this.props.organizationId,
                                    }}
                                />
                            </UploadContextProvider>
                        )}
                        <DeleteUrlAugmentationComponent />
                        <DeleteMessageComponent />
                        <LeaveChatComponent />
                    </>
                )}
            </XView>
        );
    }
}

interface MessengerRootComponentProps {
    onConversationLostAccess?: Function;
    isActive: boolean;
    organizationId: string | null;
    conversationId: string;
    conversationType: SharedRoomKind | 'PRIVATE';
    objectName: string;
    objectId?: string;
    cloudImageUuid?: string;
    pinMessage: Room_room_SharedRoom_pinnedMessage_GeneralMessage | null;
    room: Room_room_SharedRoom | Room_room_PrivateRoom;
}

export const MessengerRootComponent = (props: MessengerRootComponentProps) => {
    let messenger = React.useContext(MessengerContext);
    // console.log('MessengerRootComponent', props.isActive);
    return (
        <MessagesComponent
            onConversationLostAccess={props.onConversationLostAccess}
            isActive={props.isActive}
            me={messenger.user}
            loading={false}
            organizationId={props.organizationId}
            conversationId={props.conversationId}
            messenger={messenger}
            conversationType={props.conversationType}
            objectName={props.objectName}
            objectId={props.objectId}
            cloudImageUuid={props.cloudImageUuid}
            pinMessage={props.pinMessage}
            room={props.room}
        />
    );
};
