import * as React from 'react';
import { css } from 'linaria';
import { XView } from 'react-mental';
import { MessengerEngine, MessengerContext } from 'openland-engines/MessengerEngine';
import {
    ConversationEngine,
    ConversationStateHandler,
} from 'openland-engines/messenger/ConversationEngine';
import { ConversationState } from 'openland-engines/messenger/ConversationState';
import { IsMobileContext } from 'openland-web/components/Scaffold/IsMobileContext';
import { ConversationMessagesComponent } from '../messenger/ConversationMessagesComponent';
import { UploadCareUploading } from '../../../utils/UploadCareUploading';
import {
    UserShort,
    SharedRoomKind,
    Room_room_SharedRoom_pinnedMessage_GeneralMessage,
    RoomChat_room,
    RoomChat_room_PrivateRoom_pinnedMessage_GeneralMessage,
    FullMessage_GeneralMessage_spans_MessageSpanUserMention,
    FullMessage_GeneralMessage_spans_MessageSpanAllMention,
} from 'openland-api/Types';
import { XText } from 'openland-x/XText';
import { XModalForm } from 'openland-x-modal/XModalForm2';
import { XMemo } from 'openland-y-utils/XMemo';
import { UploadContextProvider } from 'openland-web/modules/FileUploading/UploadContext';
import { withRouter } from 'openland-x-routing/withRouter';
import { useClient } from 'openland-web/utils/useClient';
import { useXRouter } from 'openland-x-routing/useXRouter';
import { trackEvent } from 'openland-x-analytics';
import { ContextStateInterface } from 'openland-x/createPoliteContext';
import { IsActivePoliteContext } from 'openland-web/pages/main/mail/components/CacheComponent';
import throttle from 'lodash/throttle';
import { XErrorMessage } from 'openland-x/XErrorMessage';
import { XModalContent } from 'openland-web/components/XModalContent';
import { XModalFooter } from 'openland-web/components/XModalFooter';
import { XButton } from 'openland-x/XButton';
import { XLoader } from 'openland-x/XLoader';
import { useForm } from 'openland-form/useForm';
import { XModalController } from 'openland-x/showModal';
import { MessageContent } from '../messenger/message/MessageContent';
import { convertMessage } from 'openland-engines/utils/convertMessage';
import { convertDsMessage } from '../messenger/data/WebMessageItemDataSource';
import { showModalBox } from 'openland-x/showModalBox';
import { URickInput } from 'openland-web/components/unicorn/URickInput';

export interface File {
    uuid: string;
    name: string;
    size: string;
    isImage: boolean;
}

interface MessagesComponentProps {
    onChatLostAccess?: Function;
    isActive: ContextStateInterface<boolean>;
    conversationId: string;
    loading: boolean;
    messenger: MessengerEngine;
    conversationType?: SharedRoomKind | 'PRIVATE';
    me: UserShort | null;
    pinMessage:
    | Room_room_SharedRoom_pinnedMessage_GeneralMessage
    | RoomChat_room_PrivateRoom_pinnedMessage_GeneralMessage
    | null;
    room: RoomChat_room;
}

interface MessagesComponentState {
    hideInput: boolean;
    loading: boolean;
}

export const DeleteMessageComponent = ({
    messageId,
    hide,
}: {
    messageId: string;
    hide: () => void;
}) => {
    const client = useClient();

    return (
        <XView borderRadius={8}>
            <XModalContent>
                <XText>Are you sure you want to delete this message? This cannot be undone.</XText>
            </XModalContent>
            <XModalFooter>
                <XView marginRight={12}>
                    <XButton text="Cancel" style="ghost" size="large" onClick={hide} />
                </XView>
                <XButton
                    text="Delete"
                    style="danger"
                    size="large"
                    onClick={async data => {
                        await client.mutateRoomDeleteMessage({ messageId });
                        hide();
                    }}
                />
            </XModalFooter>
        </XView>
    );
};

export const showDeleteMessageModal = (messageId: string) => {
    showModalBox(
        {
            title: 'Delete message',
        },
        ctx => <DeleteMessageComponent messageId={messageId} hide={ctx.hide} />,
    );
};

export const DeleteUrlAugmentationComponent = withRouter(props => {
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

const cancelButtonClassName = css`
    border: 1px solid #e7e7e7 !important;
    background-color: rgb(242, 243, 244) !important;
`;

export const LeaveChatComponent = (props: { id: string; ctx: XModalController }) => {
    const client = useClient();
    const form = useForm();
    const createAction = () => {
        form.doAction(async () => {
            await client.mutateRoomLeave({ roomId: props.id });
            props.ctx.hide();
        });
    };
    return (
        <XView borderRadius={8}>
            {form.loading && <XLoader loading={form.loading} />}
            {form.error && <XErrorMessage message={form.error} />}
            <XModalContent>
                <XText>
                    Are you sure you want to leave? You will need to request access to join it again
                    in the future.
                </XText>
            </XModalContent>
            <XModalFooter>
                <XView marginRight={12}>
                    <XButton
                        text="Cancel"
                        size="large"
                        className={cancelButtonClassName}
                        onClick={props.ctx.hide}
                    />
                </XView>
                <XButton text="Leave" style="danger" size="large" onClick={createAction} />
            </XModalFooter>
        </XView>
    );
};

class MessagesComponent extends React.PureComponent<MessagesComponentProps, MessagesComponentState>
    implements ConversationStateHandler {
    messagesList = React.createRef<ConversationMessagesComponent>();
    private conversation: ConversationEngine | null;
    messageText: string = '';
    unmounter: (() => void) | null = null;
    unmounter2: (() => void) | null = null;
    vars: {
        roomId: string;
        conversationId: string;
    };

    private setTyping = throttle(() => {
        this.props.messenger.client.mutateSetTyping({
            conversationId: this.props.conversationId,
        });
    }, 1000);

    activeSubscription?: () => void;

    constructor(props: MessagesComponentProps) {
        super(props);

        this.conversation = null;

        this.vars = {
            roomId: this.props.conversationId,
            conversationId: this.props.conversationId,
        };

        this.conversation = props.messenger.getConversation(props.conversationId);
        this.state = { hideInput: false, loading: this.conversation.getState().loading };
    }

    componentDidMount() {
        this.activeSubscription = this.props.isActive.listen(acitive => {
            if (acitive) {
                this.unmounter = this.conversation!.engine.mountConversation(
                    this.props.conversationId,
                );
                this.unmounter2 = this.conversation!.subscribe(this);
                if (!this.conversation) {
                    throw Error('conversation should be defined here');
                }
            } else {
                this.unsubscribe();
            }
        });
    }

    scrollToBottom = () => {
        if (this.messagesList.current) {
            this.messagesList.current.scrollToBottom();
        }
    }

    onMessageSend = () => {
        trackEvent('message_sent');

        this.scrollToBottom();
    }

    onChatLostAccess = () => {
        if (this.props.onChatLostAccess) {
            this.unsubscribe();
            this.props.messenger.removeConversation(this.props.conversationId);
            this.props.onChatLostAccess();
        }
    }

    //
    // Lifecycle
    //

    onConversationUpdated = (state: ConversationState) => {
        this.setState({ loading: state.loading });
    }

    unsubscribe = () => {
        if (this.unmounter) {
            this.unmounter();
            this.unmounter = null;
        }
        if (this.unmounter2) {
            this.unmounter2();
            this.unmounter2 = null;
        }
    }

    componentWillUnmount() {
        this.unsubscribe();
        if (this.activeSubscription) {
            this.activeSubscription();
        }
    }

    handleChange = async (text: string) => {
        let prevLength = this.messageText.length;
        let curLength = text.length;

        if (prevLength < curLength) {
            this.setTyping();
        }

        if (prevLength > 0 && curLength <= 0) {
            // UnSetTyping MUTATION
        }

        this.messageText = text;
    }

    handleSend = (
        text: string,
        mentions:
            | (
                | FullMessage_GeneralMessage_spans_MessageSpanUserMention
                | FullMessage_GeneralMessage_spans_MessageSpanAllMention)[]
            | null,
    ) => {
        if (!this.conversation) {
            throw Error('conversation should be defined here');
        }

        this.conversation.sendMessage(
            text,
            mentions
                ? mentions.map(mention => {
                    if (mention.__typename === 'MessageSpanUserMention') {
                        return mention.user;
                    }
                    return { __typename: 'AllMention' as 'AllMention' };
                })
                : null,
        );
    }

    handleSendFile = (file: UploadCare.File) => {
        if (!this.conversation) {
            throw Error('conversation should be defined here');
        }

        this.conversation.sendFile(new UploadCareUploading(file));
    }

    handleShowIput = (show: boolean) => {
        this.setState({
            hideInput: !show,
        });
    }

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
            <XView flexDirection="column" flexGrow={1} flexShrink={1} contain="content">
                {this.props.pinMessage &&
                    !this.state.loading && (
                        <MessageContent
                            message={convertDsMessage(convertMessage(this.props.pinMessage))}
                        />
                    )}
                <ConversationMessagesComponent
                    isChannel={isChannel}
                    ref={this.messagesList}
                    key={this.props.conversationId}
                    me={this.props.me}
                    loading={this.state.loading}
                    conversation={this.conversation}
                    conversationId={this.props.conversationId}
                    conversationType={this.props.conversationType}
                    inputShower={this.handleShowIput}
                    room={this.props.room}
                />

                {!this.state.hideInput && this.conversation.canSendMessage && (
                    <XView minHeight={100} flexDirection="row" marginHorizontal={64} alignItems="flex-start" justifyContent="center">
                        <URickInput onEnterPress={(text) => this.conversation!.sendMessage(text, [])} />
                    </XView>
                )}
            </XView>
        );
    }
}

interface MessengerRootComponentProps {
    onChatLostAccess?: Function;
    conversationId: string;
    conversationType: SharedRoomKind | 'PRIVATE';
    pinMessage:
    | Room_room_SharedRoom_pinnedMessage_GeneralMessage
    | RoomChat_room_PrivateRoom_pinnedMessage_GeneralMessage
    | null;
    room: RoomChat_room;
}

export const MessengerRootComponent = React.memo((props: MessengerRootComponentProps) => {
    let messenger = React.useContext(MessengerContext);
    let isActive = React.useContext(IsActivePoliteContext);
    // useCheckPerf({ name: `MessengerRootComponent: ${props.conversationId}` });

    return (
        <MessagesComponent
            onChatLostAccess={props.onChatLostAccess}
            isActive={isActive}
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
