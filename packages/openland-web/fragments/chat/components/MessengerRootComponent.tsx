import * as React from 'react';
import { css, cx } from 'linaria';
import { TextBody } from 'openland-web/utils/TextStyles';
import { MessengerEngine, MessengerContext } from 'openland-engines/MessengerEngine';
import {
    ConversationEngine,
    ConversationStateHandler,
    DataSourceMessageItem,
} from 'openland-engines/messenger/ConversationEngine';
import { ConversationState } from 'openland-engines/messenger/ConversationState';
import {
    Account_me,
    SharedRoomKind,
    RoomChat_room_SharedRoom_pinnedMessage_GeneralMessage,
    RoomChat_room,
    RoomChat_room_PrivateRoom_pinnedMessage_GeneralMessage,
    StickerFragment,
    TypingType,
    MessageAttachments_MessageAttachmentFile,
} from 'openland-api/spacex.types';
import { trackEvent } from 'openland-x-analytics';
import { throttle } from 'openland-y-utils/timer';
import { SendMessageComponent } from './SendMessageComponent';
import { PinMessageComponent } from 'openland-web/fragments/chat/messenger/message/PinMessageComponent';
import { pluralForm, plural } from 'openland-y-utils/plural';
import { MessageListComponent } from '../messenger/view/MessageListComponent';
import { TypingsView } from '../messenger/typings/TypingsView';
import { XLoader } from 'openland-x/XLoader';
import {
    URickInputInstance,
    URickTextValue
} from 'openland-web/components/unicorn/URickInput';
import { InputMessageActionComponent } from './InputMessageActionComponent';
import { prepareLegacyMentionsForSend } from 'openland-engines/legacy/legacymentions';
import { findSpans } from 'openland-y-utils/findSpans';
import { DropZone } from './DropZone';
import AlertBlanket from 'openland-x/AlertBlanket';
import { OpenlandClient } from 'openland-api/spacex';
import { ReloadFromEndButton } from './ReloadFromEndButton';
import { showNoiseWarning } from './NoiseWarning';
import { TalkBarComponent } from 'openland-web/modules/conference/TalkBarComponent';
import { useAttachHandler } from 'openland-web/hooks/useAttachHandler';
import { AppConfig } from 'openland-y-runtime-web/AppConfig';
import {
    extractTextAndMentions,
    convertToInputValue,
} from 'openland-web/utils/convertTextAndMentions';
import { convertServerSpan } from 'openland-y-utils/spans/utils';
import { UIcon } from 'openland-web/components/unicorn/UIcon';
import {
    useChatMessagesActionsState,
    useChatMessagesActionsMethods,
    ConversationActionsState,
    ChatMessagesActionsMethods,
    setMessagesActionsUserChat,
} from 'openland-y-utils/MessagesActionsState';
import { isFileImage } from 'openland-web/utils/UploadCareUploading';
import IcWarning from 'openland-icons/s/ic-warning-16.svg';

interface MessagesComponentProps {
    onChatLostAccess?: Function;
    isActive: boolean;
    conversationId: string;
    messenger: MessengerEngine;
    conversationType?: SharedRoomKind | 'PRIVATE';
    me: Account_me | null;
    pinMessage:
    | RoomChat_room_SharedRoom_pinnedMessage_GeneralMessage
    | RoomChat_room_PrivateRoom_pinnedMessage_GeneralMessage
    | null;
    room: RoomChat_room;
    onAttach: (files: File[], text?: URickTextValue, isImage?: boolean) => void;
    messagesActionsState: ConversationActionsState;
    messagesActionsMethods: ChatMessagesActionsMethods;
    isAttachModalOpen: boolean;
    banInfo: { isBanned: boolean; isMeBanned: boolean } | undefined;
    hasNewStickers: boolean;
}

interface MessagesComponentState {
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
    background-color: var(--backgroundPrimary);
`;

const blockContainer = css`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    align-self: stretch;
    flex-shrink: 0;
    height: 72px;
    & > div {
      flex-grow: 0;
    }
`;

const blockTitle = css`
    color: var(--foregroundSecondary);
    margin-left: 8px;
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
    vars: {
        roomId: string;
        conversationId: string;
    };

    private setTyping = throttle(() => {
        this.props.messenger.client.mutateSetTyping({
            conversationId: this.props.conversationId,
            type: TypingType.TEXT,
        });
    }, 1000);

    private setTypingRaw = () => {
        this.props.messenger.client.mutateSetTyping({
            conversationId: this.props.conversationId,
            type: TypingType.TEXT,
        });
    }

    private setStickerPicking = () => {
        this.props.messenger.client.mutateSetTyping({
            conversationId: this.props.conversationId,
            type: TypingType.STICKER,
        });
    }

    private unsetTyping = () => {
        this.props.messenger.client.mutateUnsetTyping({
            conversationId: this.props.conversationId,
        });
    }

    // TODO remove any
    private stickerPickingMutationIntervals: any[] = [];
    private startStickerPicking = (stickers: boolean) => {
        const typingFunction = stickers ? this.setStickerPicking : this.setTypingRaw;

        typingFunction();
        this.stickerPickingMutationIntervals.push(
            setInterval(() => {
                console.log('From the interval');
                typingFunction();
            }, 3000),
        );

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
        this.state = { loading: this.conversation.getState().loading };

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
        trackEvent('mail_view');
        this.unmounter = this.conversation!.engine.mountConversation(this.props.conversationId);
        this.unmounter2 = this.conversation!.subscribe(this);
        if (!this.conversation) {
            throw Error('conversation should be defined here');
        }
        let state = this.props.messagesActionsState;
        if (state) {
            this.handleMessagesActions(state);
        }
    }

    componentDidUpdate(prevProps: MessagesComponentProps) {
        if (this.props.banInfo && this.conversation) {
            this.conversation.updateBanInfo(this.props.banInfo.isBanned || this.props.banInfo.isMeBanned);
        }
        let state = this.props.messagesActionsState;
        if (prevProps.messagesActionsState.action !== state.action) {
            this.handleMessagesActions(state);
        }
    }

    handleMessagesActions = (state: ConversationActionsState) => {
        let message = state.messages[0];
        if (state.action === 'edit' && message && message.text) {
            const spans = (message.spans || []).map(span => convertServerSpan(message.text || '', span));
            const value = convertToInputValue(message.text, spans);

            this.rickRef.current?.setContent(value);
            this.rickRef.current?.focus();
        } else if (state.action === 'forward' || state.action === 'reply') {
            // await delay(10);
            this.rickRef.current?.focus();
        } else if (state.action === 'none') {
            if (this.initialContent) {
                this.rickRef.current?.setContent(this.initialContent);
            } else {
                this.rickRef.current?.setContent(['']);
            }
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

    onInputPressUp = () => {
        if (
            this.rickRef.current &&
            this.rickRef.current
                .getText()
                .map((c) => (typeof c === 'string' ? c : c.__typename === 'User' ? c.name : 'All'))
                .join()
                .trim()
        ) {
            return false;
        }
        let myMessages = this.conversation!.dataSource.getItems().filter(
            (m) => m.type === 'message' && m.isOut && m.text && !m.isSending && !m.isService,
        );
        let myMessage = myMessages[0] as DataSourceMessageItem | undefined;
        let hasPurchase =
            myMessage &&
            myMessage.attachments &&
            myMessage.attachments.some((a) => a.__typename === 'MessageAttachmentPurchase');
        if (myMessage && !hasPurchase) {
            this.props.messagesActionsMethods.edit(myMessage);
            return true;
        }
        return false;
    }

    onTextSend = async (data: URickTextValue) => {
        const { messagesActionsState, messagesActionsMethods } = this.props;
        const actionState = messagesActionsState;
        const actionMessage = actionState.messages[0];

        const { text, mentions } = extractTextAndMentions(data);
        const mentionsPrepared = prepareLegacyMentionsForSend(text, mentions);

        if (
            actionState.action === 'edit' &&
            actionMessage &&
            actionMessage.text &&
            actionMessage.id!
        ) {
            if (text.length > 0) {
                messagesActionsMethods.clear();
                let fileAttachments = (actionMessage.attachments?.filter(
                    (x) => x.__typename === 'MessageAttachmentFile',
                ) || []) as MessageAttachments_MessageAttachmentFile[];
                await this.conversation!.engine.client.mutateEditMessage({
                    messageId: actionMessage.id!,
                    message: text,
                    mentions: mentionsPrepared,
                    spans: findSpans(text),
                    fileAttachments: fileAttachments.map((x) => ({ fileId: x.fileId })),
                });
            }
        } else {
            if (
                text.length > 0 ||
                actionState.action === 'reply' ||
                actionState.action === 'forward'
            ) {
                if (
                    this.props.room.__typename === 'SharedRoom' &&
                    mentionsPrepared.filter((m) => m.all === true).length
                ) {
                    try {
                        const chatType = this.props.room.isChannel ? 'channel' : 'group';
                        const membersType = this.props.room.isChannel
                            ? ['follower', 'followers']
                            : ['member', 'members'];

                        await showNoiseWarning(
                            `Notify all ${!!this.props.room.membersCount
                                ? plural(this.props.room.membersCount, membersType)
                                : membersType[1]
                            }?`,
                            `By using @All, you’re about to notify all ${chatType} ${membersType[1]} even when they muted this chat. Please use it only for important messages`,
                        );
                    } catch {
                        return false;
                    }
                }

                localStorage.removeItem('drafts-' + this.props.conversationId);
                this.conversation!.sendMessage(
                    text,
                    mentions,
                    messagesActionsMethods.prepareToSend(),
                );
            }
        }

        return true;
    }

    onStickerSent = (sticker: StickerFragment) => {
        this.conversation!.sendSticker(sticker, this.props.messagesActionsMethods.prepareToSend());
        this.finishStickerPicking();
    }

    onContentChange = (text: URickTextValue) => {
        let actionState = this.props.messagesActionsState;
        if (actionState.action !== 'edit') {
            this.initialContent = text;
            localStorage.setItem('drafts-' + this.props.conversationId, JSON.stringify(text));
        }
    }

    handleAttach = (files: File[], isImage?: boolean) => {
        this.props.onAttach(
            files,
            this.rickRef.current?.getText(),
            typeof isImage === 'undefined' ? files.every(f => isFileImage(f)) : isImage
        );
        this.rickRef.current?.clear();
    }

    onAttach = (files: File[], text: URickTextValue, isImage: boolean) => {
        this.handleAttach(files, isImage);
    }

    //
    // Rendering
    //

    render() {
        const { props } = this;
        if (!this.conversation) {
            return <XLoader loading={true} static={true} />;
        }
        const isChannel =
            props.room && props.room.__typename === 'SharedRoom' && props.room.isChannel;

        const pin = props.pinMessage;

        const isBanned = props.banInfo ? props.banInfo.isMeBanned || props.banInfo.isBanned : false;

        const showInput =
            props.room.__typename === 'SharedRoom'
                ? this.conversation.canSendMessage
                : !isBanned;

        const membersCount =
            props.room.__typename === 'SharedRoom' ? props.room.membersCount : undefined;
        const user = props.room.__typename === 'SharedRoom' ? props.room.owner : props.room.user;
        const userFirstName = user ? user.firstName : undefined;
        const isYou = user ? user.isYou : undefined;
        const canDonate = props.conversationId && !isChannel && !isYou;
        const chatTitle = props.room.__typename === 'SharedRoom' ? props.room.title : undefined;
        const isEditing = props.messagesActionsState.action === 'edit';

        return (
            <div className={messengerContainer}>
                {this.state.loading && <XLoader loading={true} />}
                {!this.state.loading && (
                    <>
                        {pin && !isBanned && (
                            <PinMessageComponent
                                canUnpin={
                                    this.props.room.__typename === 'PrivateRoom' ||
                                    this.props.room.canUnpinMessage ||
                                    AppConfig.isSuperAdmin()
                                }
                                message={pin}
                                engine={this.conversation}
                            />
                        )}
                        <TalkBarComponent chat={this.props.room} />
                        <div className={messagesListContainer}>
                            <MessageListComponent
                                ref={this.messagesList}
                                isChannel={isChannel}
                                me={props.me}
                                conversation={this.conversation}
                                conversationType={props.conversationType}
                                conversationId={props.conversationId}
                                room={props.room}
                            />
                            <TypingsView conversationId={props.conversationId} />
                        </div>
                        <ReloadFromEndButton
                            conversation={this.conversation}
                            showInput={!!showInput}
                        />
                        {showInput && (
                            <div className={composeContainer}>
                                <div className={composeContent}>
                                    <InputMessageActionComponent
                                        chatId={props.conversationId}
                                        userId={
                                            props.room.__typename === 'PrivateRoom'
                                                ? props.room.user.id
                                                : undefined
                                        }
                                    />
                                    <SendMessageComponent
                                        onAttach={this.onAttach}
                                        initialText={this.initialContent}
                                        onPressUp={this.onInputPressUp}
                                        rickRef={this.rickRef}
                                        groupId={props.conversationId}
                                        isEditing={isEditing}
                                        chatTitle={chatTitle}
                                        membersCount={membersCount}
                                        onTextSentAsync={this.onTextSend}
                                        onStickerSent={this.onStickerSent}
                                        onTextChange={this.handleChange}
                                        onContentChange={this.onContentChange}
                                        isChannel={isChannel}
                                        isPrivate={props.conversationType === 'PRIVATE'}
                                        autoFocus={true}
                                        ownerName={userFirstName}
                                        hideDonation={!canDonate}
                                        onEmojiPickerShow={this.startStickerPicking}
                                        onEmojiPickerHide={this.finishStickerPicking}
                                        hasNewStickers={props.hasNewStickers}
                                    />
                                </div>
                            </div>
                        )}
                        {showInput && (
                            <DropZone
                                isHidden={this.props.isAttachModalOpen}
                                onDrop={this.handleAttach}
                            />
                        )}
                        {!showInput && !!props.banInfo && (
                            <div className={blockContainer}>
                                <UIcon icon={<IcWarning />} />
                                <div className={cx(blockTitle, TextBody)}>
                                    {props.banInfo.isBanned ? 'You blocked this person' : 'You are blocked'}
                                </div>
                            </div>
                        )}
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
    banInfo: { isBanned: boolean; isMeBanned: boolean } | undefined;
}

export const MessengerRootComponent = React.memo((props: MessengerRootComponentProps) => {
    const messenger = React.useContext(MessengerContext);
    const [isAttachModalOpen, setAttachModalOpen] = React.useState(false);
    const onAttach = useAttachHandler({ conversationId: props.conversationId, onOpen: () => setAttachModalOpen(true), onClose: () => setAttachModalOpen(false) });
    const userId = props.room.__typename === 'PrivateRoom' ? props.room.user.id : undefined;
    const messagesActionsState = useChatMessagesActionsState(props.conversationId);
    const messagesActionsMethods = useChatMessagesActionsMethods(props.conversationId);
    const hasNewStickers = !!messenger.client.useUnviewedStickers({ suspense: false })?.stickers.unviewedCount;

    React.useEffect(() => {
        if (userId && props.conversationId) {
            setMessagesActionsUserChat(props.conversationId, userId);
        }
    }, [userId, props.conversationId]);

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
            messagesActionsState={messagesActionsState}
            messagesActionsMethods={messagesActionsMethods}
            isAttachModalOpen={isAttachModalOpen}
            banInfo={props.banInfo}
            hasNewStickers={hasNewStickers}
        />
    );
});
