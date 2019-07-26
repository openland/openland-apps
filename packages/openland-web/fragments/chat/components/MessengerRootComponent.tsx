import * as React from 'react';
import { css } from 'linaria';
import { XView } from 'react-mental';
import { MessengerEngine, MessengerContext } from 'openland-engines/MessengerEngine';
import {
    ConversationEngine,
    ConversationStateHandler,
} from 'openland-engines/messenger/ConversationEngine';
import { ConversationState } from 'openland-engines/messenger/ConversationState';
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
import { withRouter } from 'openland-x-routing/withRouter';
import { useClient } from 'openland-web/utils/useClient';
import { trackEvent } from 'openland-x-analytics';
import { throttle } from 'openland-y-utils/timer';
import { XModalContent } from 'openland-web/components/XModalContent';
import { XModalFooter } from 'openland-web/components/XModalFooter';
import { XButton } from 'openland-x/XButton';
import { MessageContent } from '../messenger/message/MessageContent';
import { showModalBox } from 'openland-x/showModalBox';
import { SendMessageComponent } from './SendMessageComponent';
import { processSpans } from 'openland-y-utils/spans/processSpans';
import { MessagesActionsStateEngine } from 'openland-engines/messenger/MessagesActionsState';
import { plural, pluralForm } from 'openland-y-utils/plural';
import { TextBody, TextLabel1 } from 'openland-web/utils/TextStyles';
import { MessageCompactComponent } from '../messenger/message/MessageCompactContent';

export interface File {
    uuid: string;
    name: string;
    size: string;
    isImage: boolean;
}

interface MessagesComponentProps {
    onChatLostAccess?: Function;
    isActive: boolean;
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
    messageIds,
    hide,
    action,
}: {
    messageIds: string[];
    hide: () => void;
    action: () => void;
}) => {
    return (
        <XView borderRadius={8}>
            <XModalContent>
                <XText>{`Are you sure you want to delete this ${pluralForm(messageIds.length, ['message', 'messages'])}? This cannot be undone.`}</XText>
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
                        await action();
                        hide();
                    }}
                />
            </XModalFooter>
        </XView>
    );
};

export const showDeleteMessageModal = (messageIds: string[], action: () => void) => {
    showModalBox(
        {
            title: `Delete ${pluralForm(messageIds.length, ['message', 'messages'])}`,
        },
        ctx => <DeleteMessageComponent messageIds={messageIds} hide={ctx.hide} action={action} />,
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

const messageActonContainerClass = css`
    display: flex;
    flex-direction: row;
    align-self: stretch;
    justify-content: center;
    align-items: 'center';
    flex-shrink: 0;
    margin-left: 16px;

`;
const messageActonInnerContainerClass = css`
    display: flex;
    flex-direction: column;
    border-left: 2px solid #C4C7CC;
    align-self: 'stretch';
    flex-grow: 1;
    padding-left: 16px;
    max-width: 868px;
`;
const MessageAction = (props: { engine: MessagesActionsStateEngine }) => {
    let state = props.engine.useState();
    let names = '';

    if (state.action === 'forward' || state.action === 'reply') {
        names = state.messages.reduce((res, item) => {
            if (!res.find(s => item.sender.id === s.id)) {
                res.push({ id: item.sender.id, name: item.sender.name });
            }
            return res;
        }, [] as { id: string, name: string }[]).map(s => s.name).join(', ');
    }
    if (state.action === 'forward' || state.action === 'reply') {
        return (
            <div className={messageActonContainerClass} onClick={props.engine.clear}>
                <div className={messageActonInnerContainerClass}>
                    {state.messages.length === 1 && (
                        <MessageCompactComponent message={state.messages[0]} />
                    )}
                    {state.messages.length !== 1 && (
                        <>
                            <span className={TextLabel1}>  {names}  </span>
                            <span className={TextBody}> {plural(state.messages.length, ['message', 'messages'])} </span>
                        </>
                    )}
                </div>
            </div>
        );
    } else {
        return null;
    }
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
        // this.activeSubscription = this.props.isActive.listen(acitive => {
        //     if (acitive) {
        //         this.unmounter = this.conversation!.engine.mountConversation(
        //             this.props.conversationId,
        //         );
        //         this.unmounter2 = this.conversation!.subscribe(this);
        //         if (!this.conversation) {
        //             throw Error('conversation should be defined here');
        //         }
        //     } else {
        //         this.unsubscribe();
        //     }
        // });
        this.unmounter = this.conversation!.engine.mountConversation(
            this.props.conversationId,
        );
        this.unmounter2 = this.conversation!.subscribe(this);
        if (!this.conversation) {
            throw Error('conversation should be defined here');
        }
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

        const pin = this.props.pinMessage;

        return (
            <XView flexDirection="column" flexGrow={1} flexShrink={1} contain="content">
                {pin &&
                    !this.state.loading && (
                        <MessageContent
                            id={pin.id}
                            text={pin.message}
                            textSpans={processSpans(pin.message || '', pin.spans)}
                            attachments={pin.attachments}
                            fallback={pin.fallback}
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

                <MessageAction engine={this.conversation.messagesActionsStateEngine} />

                {!this.state.hideInput && this.conversation.canSendMessage && (
                    <XView
                        flexDirection="row"
                        alignSelf="stretch"
                        justifyContent="center"
                    >
                        <XView
                            minHeight={100}
                            maxWidth={900}
                            flexDirection="row"
                            paddingHorizontal={16}
                            alignItems="flex-start"
                            justifyContent="center"
                            flexGrow={1}
                            flexBasis={0}
                        >
                            <SendMessageComponent
                                groupId={this.props.conversationType !== 'PRIVATE' ? this.props.conversationId : undefined}
                                onTextSent={(text) => this.conversation!.sendMessage(text.text, text.mentions)}
                            />
                        </XView>
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

    return (
        <MessagesComponent
            onChatLostAccess={props.onChatLostAccess}
            isActive={true}
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
