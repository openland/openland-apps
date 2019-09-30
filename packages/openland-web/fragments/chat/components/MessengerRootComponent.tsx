import * as React from 'react';
import { css } from 'linaria';
import { MessengerEngine, MessengerContext } from 'openland-engines/MessengerEngine';
import {
    ConversationEngine,
    ConversationStateHandler,
    DataSourceMessageItem,
} from 'openland-engines/messenger/ConversationEngine';
import { ConversationState } from 'openland-engines/messenger/ConversationState';
import {
    UserShort,
    SharedRoomKind,
    Room_room_SharedRoom_pinnedMessage_GeneralMessage,
    RoomChat_room,
    RoomChat_room_PrivateRoom_pinnedMessage_GeneralMessage,
    UserForMention,
    StickerFragment
} from 'openland-api/Types';
import { trackEvent } from 'openland-x-analytics';
import { throttle, delay } from 'openland-y-utils/timer';
import { SendMessageComponent } from './SendMessageComponent';
import { PinMessageComponent } from 'openland-web/fragments/chat/messenger/message/PinMessageComponent';
import { pluralForm } from 'openland-y-utils/plural';
import { MessageListComponent } from '../messenger/view/MessageListComponent';
import { TypingsView } from '../messenger/typings/TypingsView';
import { XLoader } from 'openland-x/XLoader';
import {
    URickInputInstance,
    URickTextValue,
    AllMention,
    convertToInputValue,
} from 'openland-web/components/unicorn/URickInput';
import { InputMessageActionComponent } from './InputMessageActionComponent';
import { prepareLegacyMentionsForSend } from 'openland-engines/legacy/legacymentions';
import { findSpans } from 'openland-y-utils/findSpans';
import { DropZone } from './DropZone';
import { showAttachConfirm } from './AttachConfirm';
import AlertBlanket from 'openland-x/AlertBlanket';
import { OpenlandClient } from 'openland-api/OpenlandClient';
import { ReloadFromEndButton } from './ReloadFromEndButton';

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

export const showDeleteMessageModal = (
    messageIds: string[],
    client: OpenlandClient,
    action?: () => void,
) => {
    AlertBlanket.builder()
        .title(`Delete ${pluralForm(messageIds.length, ['message', 'messages'])}`)
        .message(
            `Are you sure you want to delete ${pluralForm(messageIds.length, [
                'this message',
                'these messages',
            ])}? This cannot be undone.`,
        )
        .action(
            'Delete',
            async () => {
                await client.mutateRoomDeleteMessages({ mids: messageIds });
                if (action) {
                    action();
                }
            },
            'danger',
        )
        .show();
};

const messengerContainer = css`
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    flex-shrink: 1;
    contain: content;
`;

const messagesListContainer = css`
    display: flex;
    position: relative;
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
    max-width: 824px;
    display: flex;
    flex-direction: column;
    padding: 16px;
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
    initialContent?: URickTextValue;

    constructor(props: MessagesComponentProps) {
        super(props);

        this.conversation = null;

        this.vars = {
            roomId: this.props.conversationId,
            conversationId: this.props.conversationId,
        };

        this.conversation = props.messenger.getConversation(props.conversationId);
        this.state = { hideInput: false, loading: this.conversation.getState().loading };

        let ex = localStorage.getItem('drafts-' + props.conversationId);
        if (ex) {
            try {
                this.initialContent = JSON.parse(ex);
            } catch (e) {
                console.warn(e);
            }
        }
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
        this.unmounter3 = this.conversation!.messagesActionsStateEngine.listen(async state => {
            let message = state.messages[0];
            if (lastState === state.action || !this.rickRef.current) {
                return;
            }
            if (state.action === 'edit' && message && message.text) {
                const value = convertToInputValue(message.text, message.textSpans);

                this.rickRef.current.setContent(value);
                this.rickRef.current.focus();
            } else if (state.action === 'forward' || state.action === 'reply') {
                await delay(10);
                this.rickRef.current.focus();
            } else if (!state.action) {
                if (this.initialContent) {
                    this.rickRef.current.setContent(this.initialContent);
                } else {
                    this.rickRef.current.setContent(['']);
                }
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

    handleChange = (text: string) => {
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

    handleShowIput = (show: boolean) => {
        this.setState({
            hideInput: !show,
        });
    }

    onInputPressUp = () => {
        if (
            this.rickRef.current &&
            this.rickRef.current
                .getText()
                .map(c => (typeof c === 'string' ? c : c.__typename === 'User' ? c.name : 'All'))
                .join()
                .trim()
        ) {
            return false;
        }
        let myMessages = this.conversation!.dataSource.getItems().filter(
            m => m.type === 'message' && m.isOut && m.text && !m.isSending && !m.isService,
        );
        let myMessage = myMessages[0] as DataSourceMessageItem | undefined;
        if (myMessage) {
            this.conversation!.messagesActionsStateEngine.edit(myMessage);
            return true;
        }
        return false;
    }

    onTextSend = (text: URickTextValue) => {
        let actionState = this.conversation!.messagesActionsStateEngine.getState();
        let actionMessage = actionState.messages[0];

        let textValue = '';
        let mentions: (UserForMention | AllMention)[] = [];
        for (let t of text) {
            if (typeof t === 'string') {
                textValue += t;
            } else if (t.__typename === 'User') {
                textValue += '@' + t.name;
                mentions.push(t);
            } else if (t.__typename === 'AllMention') {
                textValue += '@All';
                mentions.push(t);
            }
        }
        textValue = textValue.trim();

        if (
            actionState.action === 'edit' &&
            actionMessage &&
            actionMessage.text &&
            actionMessage.id!
        ) {
            if (textValue.length > 0) {
                this.conversation!.messagesActionsStateEngine.clear();
                this.conversation!.engine.client.mutateEditMessage({
                    messageId: actionMessage.id!,
                    message: textValue,
                    mentions: prepareLegacyMentionsForSend(textValue, mentions),
                    spans: findSpans(textValue),
                });
            }
        } else {
            if (
                textValue.length > 0 ||
                actionState.action === 'reply' ||
                actionState.action === 'forward'
            ) {
                localStorage.removeItem('drafts-' + this.props.conversationId);
                this.conversation!.sendMessage(textValue, mentions);
            }
        }
    }

    onStickerSent = (sticker: StickerFragment) => {
        this.conversation!.sendSticker(sticker);
    }

    onContentChange = (text: URickTextValue) => {
        let actionState = this.conversation!.messagesActionsStateEngine.getState();
        if (actionState.action !== 'edit') {
            this.initialContent = text;
            localStorage.setItem('drafts-' + this.props.conversationId, JSON.stringify(text));
        }
    }

    onAttach = (files: File[]) => {
        if (files.length) {
            showAttachConfirm(files, res => {
                res.map(this.conversation!.sendFile);
            });
        }
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
        const groupId =
            this.props.conversationType !== 'PRIVATE' ? this.props.conversationId : undefined;
        return (
            <div className={messengerContainer}>
                {pin &&
                    !this.state.loading && (
                        <PinMessageComponent message={pin} engine={this.conversation} />
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
                    <ReloadFromEndButton conversation={this.conversation} />
                    {this.props.loading && <XLoader loading={this.props.loading} />}
                </div>

                {showInput && (
                    <div className={composeContainer}>
                        <div className={composeContent}>
                            <InputMessageActionComponent
                                engine={this.conversation.messagesActionsStateEngine}
                            />
                            <SendMessageComponent
                                onAttach={this.onAttach}
                                initialText={this.initialContent}
                                onPressUp={this.onInputPressUp}
                                rickRef={this.rickRef}
                                groupId={groupId}
                                onTextSent={this.onTextSend}
                                onStickerSent={this.onStickerSent}
                                onTextChange={this.handleChange}
                                onContentChange={this.onContentChange}
                            />
                        </div>
                    </div>
                )}
                {showInput && <DropZone onDrop={this.onAttach} />}
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
