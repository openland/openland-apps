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
    RoomChat_room_SharedRoom_pinnedMessage_GeneralMessage,
    RoomChat_room,
    RoomChat_room_PrivateRoom_pinnedMessage_GeneralMessage,
    StickerFragment,
    TypingType,
} from 'openland-api/spacex.types';
import { trackEvent } from 'openland-x-analytics';
import { throttle, delay } from 'openland-y-utils/timer';
import { SendMessageComponent } from './SendMessageComponent';
import { PinMessageComponent } from 'openland-web/fragments/chat/messenger/message/PinMessageComponent';
import { pluralForm, plural } from 'openland-y-utils/plural';
import { MessageListComponent } from '../messenger/view/MessageListComponent';
import { TypingsView } from '../messenger/typings/TypingsView';
import { XLoader } from 'openland-x/XLoader';
import {
    URickInputInstance,
    URickTextValue,
    convertToInputValue,
    convertFromInputValue,
} from 'openland-web/components/unicorn/URickInput';
import { InputMessageActionComponent } from './InputMessageActionComponent';
import { prepareLegacyMentionsForSend } from 'openland-engines/legacy/legacymentions';
import { findSpans } from 'openland-y-utils/findSpans';
import { DropZone } from './DropZone';
import { showAttachConfirm } from './AttachConfirm';
import AlertBlanket from 'openland-x/AlertBlanket';
import { OpenlandClient } from 'openland-api/spacex';
import { ReloadFromEndButton } from './ReloadFromEndButton';
import { showNoiseWarning } from './NoiseWarning';
import { TalkBarComponent } from 'openland-web/modules/conference/TalkBarComponent';
import { useAttachHandler } from 'openland-web/hooks/useAttachHandler';

interface MessagesComponentProps {
    onChatLostAccess?: Function;
    isActive: boolean;
    conversationId: string;
    messenger: MessengerEngine;
    conversationType?: SharedRoomKind | 'PRIVATE';
    me: UserShort | null;
    pinMessage:
    | RoomChat_room_SharedRoom_pinnedMessage_GeneralMessage
    | RoomChat_room_PrivateRoom_pinnedMessage_GeneralMessage
    | null;
    room: RoomChat_room;
    onAttach: (files: File[]) => void;
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
    overflow: hidden;
`;

const messagesListContainer = css`
    display: flex;
    position: relative;
    flex-direction: column;
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
            type: TypingType.TEXT
        });
    }, 1000);

    private setTypingRaw = () => {
        this.props.messenger.client.mutateSetTyping({
            conversationId: this.props.conversationId,
            type: TypingType.TEXT
        });
    }

    private setStickerPicking = () => {
        this.props.messenger.client.mutateSetTyping({
            conversationId: this.props.conversationId,
            type: TypingType.STICKER
        });
    }

    private unsetTyping = () => {
        this.props.messenger.client.mutateUnsetTyping({
            conversationId: this.props.conversationId
        });
    }

    // TODO remove any
    private stickerPickingMutationIntervals: any[] = [];
    private startStickerPicking = (stickers: boolean) => {
        const typingFunction = stickers ? this.setStickerPicking : this.setTypingRaw;

        typingFunction();
        this.stickerPickingMutationIntervals.push(setInterval(() => {
            console.log('From the interval');
            typingFunction();
        }, 3000));

        // clear typing after one minute in case it somehow stuck
        setTimeout(this.finishStickerPicking, 1000 * 60);
    }
    private finishStickerPicking = () => {
        this.stickerPickingMutationIntervals.forEach(clearInterval);
        this.unsetTyping();
    }

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
        trackEvent('mail_view');
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
        let hasPurchase = myMessage && myMessage.attachments && myMessage.attachments.some(a => a.__typename === 'MessageAttachmentPurchase');
        if (myMessage && !hasPurchase) {
            this.conversation!.messagesActionsStateEngine.edit(myMessage);
            return true;
        }
        return false;
    }

    onTextSend = async (data: URickTextValue) => {
        const actionState = this.conversation!.messagesActionsStateEngine.getState();
        const actionMessage = actionState.messages[0];

        const { text, mentions } = convertFromInputValue(data);
        const mentionsPrepared = prepareLegacyMentionsForSend(text, mentions);

        if (
            actionState.action === 'edit' &&
            actionMessage &&
            actionMessage.text &&
            actionMessage.id!
        ) {
            if (text.length > 0) {
                this.conversation!.messagesActionsStateEngine.clear();
                await this.conversation!.engine.client.mutateEditMessage({
                    messageId: actionMessage.id!,
                    message: text,
                    mentions: mentionsPrepared,
                    spans: findSpans(text),
                });
            }
        } else {
            if (
                text.length > 0 ||
                actionState.action === 'reply' ||
                actionState.action === 'forward'
            ) {
                if (this.props.room.__typename === 'SharedRoom' && mentionsPrepared.filter(m => m.all === true).length) {
                    try {
                        const chatType = this.props.room.isChannel ? 'channel' : 'group';
                        const membersType = this.props.room.isChannel ? ['follower', 'followers'] : ['member', 'members'];

                        await showNoiseWarning(
                            `Notify all ${!!this.props.room.membersCount ? plural(this.props.room.membersCount, membersType) : membersType[1]}?`,
                            `By using @All, you’re about to notify all ${chatType} ${membersType[1]} even when they muted this chat. Please use it only for important messages`
                        );
                    } catch {
                        return false;
                    }
                }

                localStorage.removeItem('drafts-' + this.props.conversationId);
                this.conversation!.sendMessage(text, mentions);
            }
        }

        return true;
    }

    onStickerSent = (sticker: StickerFragment) => {
        this.conversation!.sendSticker(sticker);
        this.finishStickerPicking();
    }

    onContentChange = (text: URickTextValue) => {
        let actionState = this.conversation!.messagesActionsStateEngine.getState();
        if (actionState.action !== 'edit') {
            this.initialContent = text;
            localStorage.setItem('drafts-' + this.props.conversationId, JSON.stringify(text));
        }
    }

    refreshFileUploadingTyping = (filename?: string) => {
        const lowercaseFilename = filename && filename.toLowerCase();
        let typingType = TypingType.FILE;

        if (lowercaseFilename) {
            if (lowercaseFilename.endsWith('.jpg') || lowercaseFilename.endsWith('.jpeg') || lowercaseFilename.endsWith('.png')) {
                typingType = TypingType.PHOTO;
            }

            if (lowercaseFilename.endsWith('.mp4') || lowercaseFilename.endsWith('.mov')) {
                typingType = TypingType.VIDEO;
            }
        }

        this.props.messenger.client.mutateSetTyping({
            conversationId: this.props.conversationId,
            type: typingType
        });
    }

    endFileUploadingTyping = () => {
        this.props.messenger.client.mutateUnsetTyping({
            conversationId: this.props.conversationId,
        });
    }

    onAttach = (files: File[]) => {
        if (files.length) {
            showAttachConfirm(
                files,
                res => res.map(({ file, localImage }) => this.conversation!.sendFile(file, localImage)),
                this.refreshFileUploadingTyping,
                this.endFileUploadingTyping
            );
        }
    }

    //
    // Rendering
    //

    render() {
        if (!this.conversation) {
            return <XLoader loading={true} static={true} />;
        }
        const isChannel =
            this.props.room &&
            this.props.room.__typename === 'SharedRoom' &&
            this.props.room.isChannel;

        const pin = this.props.pinMessage;
        const showInput = !this.state.hideInput && this.conversation.canSendMessage;
        const membersCount =
            this.props.room.__typename === 'SharedRoom' ? this.props.room.membersCount : undefined;
        const user = this.props.room.__typename === 'SharedRoom'
            ? this.props.room.owner
            : this.props.room.user;
        const userFirstName = user ? user.firstName : undefined;
        const isYou = user ? user.isYou : undefined;
        const canDonate = this.props.conversationId && !isChannel && !isYou;

        return (
            <div className={messengerContainer}>
                {this.state.loading && <XLoader loading={true} />}
                {!this.state.loading && (
                    <>
                        {pin && (
                            <PinMessageComponent message={pin} engine={this.conversation} />
                        )}
                        <TalkBarComponent chat={this.props.room} />
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
                        </div>
                        <ReloadFromEndButton conversation={this.conversation} showInput={!!showInput} />
                        {showInput && (
                            <div className={composeContainer}>
                                <div className={composeContent}>
                                    <InputMessageActionComponent
                                        engine={this.conversation.messagesActionsStateEngine}
                                    />
                                    <SendMessageComponent
                                        onAttach={this.props.onAttach}
                                        initialText={this.initialContent}
                                        onPressUp={this.onInputPressUp}
                                        rickRef={this.rickRef}
                                        groupId={this.props.conversationId}
                                        membersCount={membersCount}
                                        onTextSentAsync={this.onTextSend}
                                        onStickerSent={this.onStickerSent}
                                        onTextChange={this.handleChange}
                                        onContentChange={this.onContentChange}
                                        isChannel={isChannel}
                                        isPrivate={this.props.conversationType === 'PRIVATE'}
                                        autoFocus={true}
                                        ownerName={userFirstName}
                                        hideDonation={!canDonate}
                                        onEmojiPickerShow={this.startStickerPicking}
                                        onEmojiPickerHide={this.finishStickerPicking}
                                    />
                                </div>
                            </div>
                        )}
                        {showInput && <DropZone onDrop={this.props.onAttach} />}
                    </>
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
    | RoomChat_room_SharedRoom_pinnedMessage_GeneralMessage
    | RoomChat_room_PrivateRoom_pinnedMessage_GeneralMessage
    | null;
    room: RoomChat_room;
}

export const MessengerRootComponent = React.memo((props: MessengerRootComponentProps) => {
    let messenger = React.useContext(MessengerContext);
    const onAttach = useAttachHandler({ conversationId: props.conversationId });

    return (
        <MessagesComponent
            onChatLostAccess={props.onChatLostAccess}
            isActive={true}
            me={messenger.user}
            conversationId={props.conversationId}
            messenger={messenger}
            conversationType={props.conversationType}
            pinMessage={props.pinMessage}
            room={props.room}
            onAttach={onAttach}
        />
    );
});
