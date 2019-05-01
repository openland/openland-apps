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
} from './MessageComposeComponent/components/MessageComposeComponentDesktop';
import { MobileMessageCompose } from './MessageComposeComponent/components/MessageComposeComponentMobile';
import { ConversationMessagesComponent } from '../components/messenger/ConversationMessagesComponent';
import { UploadCareUploading } from '../utils/UploadCareUploading';
import {
    UserShort,
    SharedRoomKind,
    PostMessageType,
    Room_room_SharedRoom_pinnedMessage_GeneralMessage,
    RoomChat_room,
} from 'openland-api/Types';
import { XText } from 'openland-x/XText';
import { XModalForm } from 'openland-x-modal/XModalForm2';
import { XMemo } from 'openland-y-utils/XMemo';
import { UploadContextProvider } from 'openland-web/modules/FileUploading/UploadContext';
import { PinMessageComponent } from 'openland-web/fragments/chat/PinMessage';
import { withRouter } from 'openland-x-routing/withRouter';
import { useClient } from 'openland-web/utils/useClient';
import { useXRouter } from 'openland-x-routing/useXRouter';
import { IsActiveContext } from 'openland-web/pages/main/mail/components/Components';
import { trackEvent } from 'openland-x-analytics';
import { UserWithOffset } from 'openland-y-utils/mentionsConversion';

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
    onChatLostAccess?: Function;
    isActive: boolean;
    conversationId: string;
    loading: boolean;
    messenger: MessengerEngine;
    conversationType?: SharedRoomKind | 'PRIVATE';
    me: UserShort | null;
    pinMessage: Room_room_SharedRoom_pinnedMessage_GeneralMessage | null;
    room: RoomChat_room;
}

interface MessagesComponentState {
    hideInput: boolean;
    loading: boolean;
    messages: ModelMessage[];
}

const DeleteMessageComponent = () => {
    const router = useXRouter();
    const client = useClient();
    let id = router.routeQuery.deleteMessage;
    return (
        <XModalForm
            title="Delete message"
            targetQuery="deleteMessage"
            submitBtnText="Delete"
            defaultAction={async data => {
                await client.mutateRoomDeleteMessage({ messageId: id });
            }}
            submitProps={{ successText: 'Deleted!', style: 'danger' }}
        >
            <XText>Are you sure you want to delete this message? This cannot be undone.</XText>
        </XModalForm>
    );
};

const DeleteUrlAugmentationComponent = withRouter(props => {
    const client = useClient();
    let id = props.router.query.deleteUrlAugmentation;
    return (
        <XModalForm
            title="Remove attachment"
            targetQuery="deleteUrlAugmentation"
            submitBtnText="Remove"
            defaultAction={async () => {
                await client.mutateRoomDeleteUrlAugmentation({ messageId: id });
            }}
            submitProps={{ successText: 'Removed!', style: 'danger' }}
        >
            <XText>Remove this attachment from the message?</XText>
        </XModalForm>
    );
});

export const LeaveChatComponent = withRouter(props => {
    let client = useClient();
    let id = props.router.query.leaveFromChat;
    return (
        <XModalForm
            title="Leave the chat"
            targetQuery="leaveFromChat"
            submitBtnText="Leave"
            defaultAction={async data => {
                await client.mutateRoomLeave({ roomId: id });
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
        };
    }

    scrollToBottom = () => {
        if (this.messagesList.current) {
            this.messagesList.current.scrollToBottom();
        }
    };

    onMessageSend = () => {
        trackEvent('message_sent');

        this.scrollToBottom();
    };

    onChatLostAccess = () => {
        if (this.props.onChatLostAccess) {
            this.unsubscribe();
            this.props.messenger.removeConversation(this.props.conversationId);
            this.props.onChatLostAccess();
        }
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
            this.unmounter = this.conversation!.engine.mountConversation(props.conversationId);

            this.unmounter2 = this.conversation!.subscribe(this);

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
    }

    handleChange = async (text: string) => {
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

    handleSend = (text: string, mentions: UserWithOffset[] | null) => {
        if (!this.conversation) {
            throw Error('conversation should be defined here');
        }

        this.conversation.sendMessage(
            text,
            mentions ? mentions.map(mention => mention.user) : null,
        );
    };

    handleSendFile = (file: UploadCare.File) => {
        if (!this.conversation) {
            throw Error('conversation should be defined here');
        }

        this.conversation.sendFile(new UploadCareUploading(file));
    };

    handleShowIput = (show: boolean) => {
        this.setState({
            hideInput: !show,
        });
    };

    getMessages = () => {
        return this.state.messages;
    };

    //
    // Rendering
    //

    render() {
        if (!this.conversation) {
            return null;
        }

        const isChannel =
            this.props.room &&
            this.props.room.__typename === 'SharedRoom' &&
            this.props.room.isChannel;

        return (
            <XView flexDirection="column" flexGrow={1} flexShrink={1}>
                {this.props.pinMessage && !this.state.loading && (
                    <PinMessageComponent
                        pinMessage={this.props.pinMessage}
                        chatId={this.props.conversationId}
                        room={this.props.room}
                    />
                )}
                <ConversationMessagesComponent
                    isChannel={isChannel}
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

                {!this.state.hideInput && this.conversation.canSendMessage && (
                    <UploadContextProvider>
                        <MessageComposeHandler
                            isActive={this.props.isActive}
                            getMessages={this.getMessages}
                            conversation={this.conversation}
                            onChange={this.handleChange}
                            onSend={this.handleSend}
                            onSendFile={this.handleSendFile}
                            scrollToBottom={this.scrollToBottom}
                            enabled={true}
                            conversationType={this.props.conversationType}
                            conversationId={this.props.conversationId}
                            variables={{
                                roomId: this.props.conversationId,
                                conversationId: this.props.conversationId,
                            }}
                        />
                    </UploadContextProvider>
                )}
                {this.props.isActive && <DeleteUrlAugmentationComponent />}
                {this.props.isActive && <DeleteMessageComponent />}
                {this.props.isActive && <LeaveChatComponent />}
            </XView>
        );
    }
}

interface MessengerRootComponentProps {
    onChatLostAccess?: Function;
    conversationId: string;
    conversationType: SharedRoomKind | 'PRIVATE';
    pinMessage: Room_room_SharedRoom_pinnedMessage_GeneralMessage | null;
    room: RoomChat_room;
}

export const MessengerRootComponent = React.memo((props: MessengerRootComponentProps) => {
    let messenger = React.useContext(MessengerContext);
    let isActive = React.useContext(IsActiveContext);

    return (
        <MessagesComponent
            onChatLostAccess={props.onChatLostAccess}
            isActive={!!isActive}
            me={messenger.user}
            loading={false}
            conversationId={props.conversationId}
            messenger={messenger}
            conversationType={props.conversationType}
            pinMessage={props.pinMessage}
            room={props.room}
        />
    );
});
