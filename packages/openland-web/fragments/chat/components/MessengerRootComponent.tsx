import * as React from 'react';
import { css } from 'linaria';
import { XView } from 'react-mental';
import { MessengerEngine, MessengerContext } from 'openland-engines/MessengerEngine';
import {
    ConversationEngine,
    ConversationStateHandler,
} from 'openland-engines/messenger/ConversationEngine';
import { ConversationState } from 'openland-engines/messenger/ConversationState';
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
import { showModalBox } from 'openland-x/showModalBox';
import { SendMessageComponent } from './SendMessageComponent';
import { PinMessageComponent } from 'openland-web/fragments/chat/messenger/message/PinMessageComponent';
import { pluralForm } from 'openland-y-utils/plural';
import { MessageListComponent } from '../messenger/view/MessageListComponent';
import { TypingsView } from '../messenger/typings/TypingsView';
import { XLoader } from 'openland-x/XLoader';
import { URickInputInstance, URickInputValue } from 'openland-web/components/unicorn/URickInput';
import { InputMessageActionComponent } from './InputMessageActionComponent';
import { SpanType, SpanUser } from 'openland-y-utils/spans/Span';
import { prepareLegacyMentionsForSend } from 'openland-engines/legacy/legacymentions';
import { findSpans } from 'openland-y-utils/findSpans';

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
    action?: () => void;
}) => {
    let client = useClient();
    return (
        <XView borderRadius={8}>
            <XModalContent>
                <XText>{`Are you sure you want to delete this ${pluralForm(messageIds.length, [
                    'message',
                    'messages',
                ])}? This cannot be undone.`}</XText>
            </XModalContent>
            <XModalFooter>
                <XView marginRight={12}>
                    <XButton text="Cancel" style="ghost" size="large" onClick={hide} />
                </XView>
                <XButton
                    text="Delete"
                    style="danger"
                    size="large"
                    onClick={async () => {
                        await client.mutateRoomDeleteMessages({ mids: messageIds });
                        if (action) {
                            action();
                        }
                        hide();
                    }}
                />
            </XModalFooter>
        </XView>
    );
};

export const showDeleteMessageModal = (messageIds: string[], action?: () => void) => {
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

const messengerContainer = css`
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    flex-shrink: 1;
    contain: content;
`;

const messagesListContainer = css`
    display: flex;
    flex-direction: column;
    position: relative;
    flex-grow: 1;
    flex-shrink: 1;
    overflow: hidden;
`;

const composeContainer = css`
    display: flex;
    flex-direction: row;
    align-self: stretch;
    justify-content: center;
    flex-grow: 0;
    flex-shrink: 0;
`;

const composeContent = css`
    min-height: 72px;
    max-width: 910px;
    display: flex;
    flex-direction: column;
    padding-left: 20px;
    padding-right: 20px;
    padding-top: 16px;
    padding-bottom: 16px;
    align-items: flex-start;
    justify-content: center;
    flex-grow: 1;
    flex-basis: 0;
`;

class MessagesComponent extends React.PureComponent<MessagesComponentProps, MessagesComponentState>
    implements ConversationStateHandler {
    messagesList = React.createRef<MessageListComponent>();
    rickRef = React.createRef<URickInputInstance>();
    private conversation: ConversationEngine | null;
    messageText: string = '';
    unmounter: (() => void) | null = null;
    unmounter2: (() => void) | null = null;
    unmounter3: (() => void) | null = null;
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
        this.unmounter = this.conversation!.engine.mountConversation(this.props.conversationId);
        this.unmounter2 = this.conversation!.subscribe(this);
        if (!this.conversation) {
            throw Error('conversation should be defined here');
        }
        let lastState: string | undefined = undefined;
        this.unmounter3 = this.conversation!.messagesActionsStateEngine.listen(state => {
            let message = state.messages[0];
            if (lastState === state.action || !this.rickRef.current) {
                return;
            }
            if (state.action === 'edit' && message && message.text) {
                let value: URickInputValue = [];
                let textStringTail = message.text;
                for (let absSpan of message.textSpans.filter(span => span.type === SpanType.mention_user)) {
                    let userSpan = absSpan as SpanUser;
                    let rawText = userSpan.textRaw || '';
                    let spanStart = textStringTail.indexOf(rawText);
                    if (spanStart === -1) {
                        continue;
                    }
                    if (spanStart !== 0) {
                        value.push(textStringTail.substring(0, spanStart));

                    }
                    value.push({ __typename: 'User', ...userSpan.user });

                    textStringTail = textStringTail.substring(spanStart + rawText.length, textStringTail.length);
                }
                value.push(textStringTail);

                this.rickRef.current.setContent(value);
            } else if (!state.action) {
                this.rickRef.current.setContent('');
            }
            lastState = state.action;
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
        if (this.unmounter3) {
            this.unmounter3();
            this.unmounter3 = null;
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
        const showInput = !this.state.hideInput && this.conversation.canSendMessage;
        return (
            <div className={messengerContainer}>
                {pin && !this.state.loading && (
                    <PinMessageComponent message={pin} />
                )}
                <div className={messagesListContainer}>
                    <MessageListComponent
                        ref={this.messagesList}
                        isChannel={isChannel}
                        me={this.props.me}
                        conversation={this.conversation}
                        conversationType={this.props.conversationType}
                        inputShower={this.handleShowIput}
                        conversationId={this.props.conversationId}
                        room={this.props.room}
                    />
                    <TypingsView conversationId={this.props.conversationId} />
                    {this.props.loading && <XLoader loading={this.props.loading} />}
                </div>

                {showInput && (
                    <div className={composeContainer}>
                        <div className={composeContent}>
                            <InputMessageActionComponent engine={this.conversation.messagesActionsStateEngine} />
                            <SendMessageComponent
                                rickRef={this.rickRef}
                                groupId={
                                    this.props.conversationType !== 'PRIVATE'
                                        ? this.props.conversationId
                                        : undefined
                                }
                                onTextSent={text => {
                                    let actionState = this.conversation!.messagesActionsStateEngine.getState();
                                    let actionMessage = actionState.messages[0];
                                    if (actionState.action === 'edit' && actionMessage && actionMessage.text && actionMessage.id!) {
                                        this.conversation!.messagesActionsStateEngine.clear();
                                        this.conversation!.engine.client.mutateEditMessage(
                                            {
                                                messageId: actionMessage.id!,
                                                message: text.text,
                                                mentions: prepareLegacyMentionsForSend(text.text, text.mentions || []),
                                                spans: findSpans(text.text)
                                            });
                                    } else {
                                        this.conversation!.sendMessage(text.text, text.mentions);
                                    }
                                }}
                                onTextChange={this.handleChange}
                            />
                        </div>
                    </div>
                )}
            </div>
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
