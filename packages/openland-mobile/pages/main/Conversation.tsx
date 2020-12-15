import * as React from 'react';
import { withApp } from '../../components/withApp';
import { View, FlatList, AsyncStorage, Platform, TouchableOpacity, NativeSyntheticEvent, TextInputSelectionChangeEventData, TextInput, Linking } from 'react-native';
import { MessengerEngine } from 'openland-engines/MessengerEngine';
import { ConversationEngine, convertMessageBack } from 'openland-engines/messenger/ConversationEngine';
import { MessageInputBar } from './components/MessageInputBar';
import { ConversationView } from './components/ConversationView';
import { PageProps } from '../../components/PageProps';
import { SHeaderView } from 'react-native-s/SHeaderView';
import { ChatHeader } from './components/ChatHeader';
import { ChatHeaderAvatar, resolveConversationProfilePath } from './components/ChatHeaderAvatar';
import { getMessenger } from '../../utils/messenger';
import { UploadManagerInstance } from '../../files/UploadManager';
import { RoomTiny_room, RoomTiny_room_SharedRoom, RoomTiny_room_PrivateRoom, SharedRoomKind, TypingType, StickerFragment, RoomCallsMode, MessageAttachments_MessageAttachmentFile } from 'openland-api/spacex.types';
import { getClient } from 'openland-mobile/utils/graphqlClient';
import { SDeferred } from 'react-native-s/SDeferred';
import { CallBarComponent } from 'openland-mobile/calls/CallBar';
import { ASSafeAreaContext } from 'react-native-async-view/ASSafeAreaContext';
import { MentionsSuggestions } from './components/suggestions/MentionsSuggestions';
import { findActiveWord } from 'openland-y-utils/findActiveWord';
import Alert from 'openland-mobile/components/AlertBlanket';
import Toast from 'openland-mobile/components/Toast';
import { ThemeContext } from 'openland-mobile/themes/ThemeContext';
import { ChannelMuteButton, ChatInputPlaceholder, ChatInputBlockPlaceholder } from './components/InputPlaceholder';
import { SHeaderButton } from 'react-native-s/SHeaderButton';
import { useCallModal } from './Call';
import { EmojiSuggestions, EmojiSuggestionsRow } from './components/suggestions/EmojiSuggestions';
import { showAttachMenu } from 'openland-mobile/files/showAttachMenu';
import { ForwardReplyView } from 'openland-mobile/messenger/components/ForwardReplyView';
import { EditView } from 'openland-mobile/messenger/components/EditView';
import { ChatSelectedActions } from './components/ChatSelectedActions';
import { prepareLegacyMentionsForSend, convertMentionsFromMessage } from 'openland-engines/legacy/legacymentions';
import { findSpans } from 'openland-y-utils/findSpans';
import { throttle } from 'openland-y-utils/timer';
import { useUserBanInfo } from 'openland-y-utils/blacklist/LocalBlackList';
import { MentionToSend } from 'openland-engines/messenger/MessageSender';
import { ThemeGlobal } from 'openland-y-utils/themes/ThemeGlobal';
import { PinnedMessage, PINNED_MESSAGE_HEIGHT } from './components/PinnedMessage';
import { ChatAccessDenied } from './components/ChatAccessDenied';
import { ChatJoin } from './components/ChatJoin';
import { emojiWordMap } from 'openland-y-utils/emojiWordMap';
import { ReloadFromBottomButton } from './components/ReloadFromBottomButton';
import { ConversationManageButton } from './components/ConversationManageButton';
import { showNoiseWarning } from 'openland-mobile/messenger/components/showNoiseWarning';
import { plural } from 'openland-y-utils/plural';
import { SRouterMountedContext } from 'react-native-s/SRouterContext';
import { SUPER_ADMIN } from '../Init';
import { ChatMessagesActionsMethods, ConversationActionsState, setMessagesActionsUserChat } from 'openland-y-utils/MessagesActionsState';
import { useChatMessagesActionsState, useChatMessagesActionsMethods } from 'openland-y-utils/MessagesActionsState';
import { matchLinks } from 'openland-y-utils/TextProcessor';
import { StickerPicker } from './components/stickers/StickerPicker';
import { SDevice } from 'react-native-s/SDevice';
import { getCachedKeyboardHeight } from 'react-native-s/navigation/containers/PageKeyboard';

interface ConversationRootProps extends PageProps {
    engine: MessengerEngine;
    chat: RoomTiny_room;
    theme: ThemeGlobal;
    showCallModal: () => void;
    mountedRef: { mounted: string[] };
    messagesActionsState: ConversationActionsState;
    messagesActionsMethods: ChatMessagesActionsMethods;
    banInfo: { isBanned: boolean; isMeBanned: boolean } | undefined;
    hasNewStickers: boolean;
}

interface ConversationRootState {
    text: string;
    mentions: MentionToSend[];
    inputFocused: boolean;
    selection: {
        start: number,
        end: number
    };
    muted: boolean;
    stickerKeyboardShown: boolean;
    keyboardHeight: number;
    keyboardOpened: boolean;
    closingQuoted: boolean;
    hasStickerTranslation: boolean;
    isStickersOpaque: boolean;
}

class ConversationRoot extends React.Component<ConversationRootProps, ConversationRootState> {
    engine: ConversationEngine;
    listRef = React.createRef<FlatList<any>>();
    inputRef = React.createRef<TextInput>();
    waitingForKeyboard = false;
    waitingForKeyboardNative = false;
    shouldHideStickerKeyboard = true;
    stickerKeyboardHeight = 0;
    openKeyboardHeight = 0;
    cachedKeyboardHeight = 0;
    stickerButtonPressedCount = 0;
    prevScrollY = Infinity;

    private setTyping = throttle(() => {
        getMessenger().engine.client.mutateSetTyping({ conversationId: this.props.chat.id, type: TypingType.TEXT });
    }, 1000);

    constructor(props: ConversationRootProps) {
        super(props);
        this.engine = this.props.engine.getConversation(this.props.chat.id);
        this.state = {
            text: '',
            selection: {
                start: 0,
                end: 0.
            },
            mentions: [],
            inputFocused: false,
            muted: !!this.props.chat.settings.mute,
            stickerKeyboardShown: false,
            keyboardHeight: 0,
            keyboardOpened: false,
            closingQuoted: false,
            hasStickerTranslation: true,
            isStickersOpaque: false,
        };

        AsyncStorage.getItem('compose_draft_' + this.props.chat.id).then(s => this.setState({ text: s || '' }));
        AsyncStorage.getItem('compose_draft_mentions_v2_' + this.props.chat.id).then(s => this.setState({ mentions: JSON.parse(s) || [] }));
    }

    componentDidMount() {
        this.handleMessagesActions(this.props.messagesActionsState);
        (async () => {
            this.cachedKeyboardHeight = await getCachedKeyboardHeight();
        })();
    }

    componentDidUpdate(prevProps: ConversationRootProps, prevState: ConversationRootState) {
        if (this.props.banInfo) {
            this.engine.updateBanInfo(this.props.banInfo.isBanned || this.props.banInfo.isMeBanned);
        }
        if (prevProps.chat.settings.mute !== this.props.chat.settings.mute) {
            this.setState({
                muted: !!this.props.chat.settings.mute
            });
        }
        if (prevProps.messagesActionsState !== this.props.messagesActionsState) {
            this.handleMessagesActions(this.props.messagesActionsState);
        }
        if (!prevState.stickerKeyboardShown && this.state.stickerKeyboardShown) {
            (async () => {
                if (this.props.hasNewStickers) {
                    await getClient().mutateMarkStickersViewed();
                    getClient().refetchUnviewedStickers();
                }
            })();
        }
    }

    handleMessagesActions = (state: ConversationActionsState) => {
        let messages = state.messages;
        let action = state.action;
        if (messages.length > 0) {
            if (action === 'edit') {
                const editMessage = messages[0];

                this.setState({
                    text: editMessage.text || '',
                    mentions: convertMentionsFromMessage(editMessage.text, editMessage.spans)
                }, () => {
                    setTimeout(() => {
                        if (this.inputRef.current) {
                            this.inputRef.current.focus();
                        }
                    }, 100);
                });
            } else if (action === 'reply' && this.inputRef.current) {
                this.inputRef.current.focus();
            } else if (action === 'forward') {
                setTimeout(() => {
                    const isMounted = this.props.mountedRef.mounted.includes(this.props.router.key);
                    if (this.inputRef.current && isMounted) {
                        this.inputRef.current.focus();
                    }
                }, 500);
            }
        }
    }

    saveDraft = () => {
        AsyncStorage.multiSet([
            ['compose_draft_' + this.props.chat.id, this.state.text],
            ['compose_draft_mentions_v2_' + this.props.chat.id, JSON.stringify(this.state.mentions)],
        ]);
    }

    removeDraft = () => {
        AsyncStorage.multiRemove([
            'compose_draft_' + this.props.chat.id,
            'compose_draft_mentions_v2_' + this.props.chat.id
        ]);
    }

    handleTextChange = (src: string) => {
        this.setTyping();
        this.setState({ text: src }, () => {
            this.saveDraft();
        });
    }

    handleSelectionChange = (e: NativeSyntheticEvent<TextInputSelectionChangeEventData>) => {
        this.setState({
            selection: {
                start: e.nativeEvent.selection.start,
                end: e.nativeEvent.selection.end
            }
        });
    }

    handleFocus = () => {
        if (this.shouldHideStickerKeyboard) {
            this.waitingForKeyboardNative = true;
            this.setState({
                inputFocused: true,
                stickerKeyboardShown: false,
                keyboardHeight: this.stickerKeyboardHeight
            });
        } else {
            this.shouldHideStickerKeyboard = true;
            this.setState({ inputFocused: true });
        }
    }

    handleBlur = () => {
        this.setState({
            inputFocused: false
        });
    }

    handleSubmit = async () => {
        let { messagesActionsState: state, messagesActionsMethods } = this.props;
        let tx = this.state.text.trim();

        let mentions = prepareLegacyMentionsForSend(tx, this.state.mentions || []);

        if (state.action === 'edit' && state.messages.length > 0) {
            let messageToEdit = state.messages.map(convertMessageBack)[0];
            let fileAttachments = (state.messages[0].attachments?.filter(x => x.__typename === 'MessageAttachmentFile') || []) as MessageAttachments_MessageAttachmentFile[];
            const loader = Toast.loader();
            loader.show();
            try {
                await getClient().mutateEditMessage({
                    messageId: messageToEdit.id,
                    message: tx,
                    mentions,
                    spans: findSpans(tx),
                    fileAttachments: fileAttachments.map(x => ({ fileId: x.fileId })),
                });
            } catch (e) {
                Alert.alert(e.message);
            } finally {
                loader.hide();
            }
        } else {
            if (this.props.chat.__typename === 'SharedRoom' && mentions.filter(m => m.all === true).length) {
                try {
                    const chatType = this.props.chat.isChannel ? 'channel' : 'group';
                    const membersType = this.props.chat.isChannel ? ['follower', 'followers'] : ['member', 'members'];

                    await showNoiseWarning(
                        `Notify all ${!!this.props.chat.membersCount ? plural(this.props.chat.membersCount, membersType) : membersType[1]}?`,
                        `By using @All, you’re about to notify all ${chatType} ${membersType[1]} even when they muted this chat. Please use it only for important messages`
                    );
                } catch {
                    return;
                }
            }

            this.engine.sendMessage(tx, this.state.mentions, messagesActionsMethods.prepareToSend());
        }
        messagesActionsMethods.clear();

        this.setState({
            text: '',
            mentions: [],
        });

        this.removeDraft();
    }

    handleAttach = () => {
        let user = this.props.chat.__typename === 'PrivateRoom'
            ? this.props.chat.user
            : this.props.chat.owner;
        let isChannel = this.props.chat.__typename === 'SharedRoom' && this.props.chat.isChannel;
        let donationCb = user && user.id === this.props.engine.user.id || isChannel
            ? undefined
            : () => {
                if (user) {
                    this.props.router.push('Donation', { chatId: this.props.chat.id, name: user.firstName });
                }
            };
        showAttachMenu((filesMeta) => {
            UploadManagerInstance.registerMessageUploads(this.props.chat.id, filesMeta, this.props.messagesActionsMethods.prepareToSend());
        }, donationCb);
    }

    handleMentionPress = (word: string | undefined, mention: MentionToSend) => {
        if (typeof word !== 'string') {
            return;
        }

        let { text, selection } = this.state;
        let newText = '';

        if (mention.__typename === 'User') {
            newText = text.substring(0, selection.start - word.length) + '@' + mention.name + ' ' + text.slice(selection.start);
        } else if (mention.__typename === 'Organization') {
            newText = text.substring(0, selection.start - word.length) + '@' + mention.name + ' ' + text.slice(selection.start);
        } else if (mention.__typename === 'SharedRoom') {
            newText = text.substring(0, selection.start - word.length) + '@' + mention.title + ' ' + text.slice(selection.start);
        } else if (mention.__typename === 'AllMention') {
            newText = text.substring(0, selection.start - word.length) + '@All' + ' ' + text.slice(selection.start);
        }

        this.setState({
            text: newText,
            mentions: [...this.state.mentions, mention]
        }, () => {
            this.saveDraft();
        });
    }

    handleEmojiPress = (word: string | undefined, emoji: string) => {
        if (typeof word !== 'string') {
            return;
        }

        let { text, selection } = this.state;

        let newText = text.substring(0, selection.start - word.length) + emoji + ' ' + text.substring(selection.start, text.length);

        this.setState({ text: newText }, () => {
            this.saveDraft();
        });
    }

    handlePinnedMessagePress = (mid: string) => {
        this.props.router.push('Message', { messageId: mid });
    }

    handleStickerKeyboardButtonPress = () => {
        if (!this.state.keyboardOpened && !this.state.stickerKeyboardShown) {
            if (Platform.OS === 'ios') {
                this.waitingForKeyboard = true;
                this.shouldHideStickerKeyboard = false;
                this.inputRef.current?.focus();
                this.inputRef.current?.blur();
            } else {
                if (this.cachedKeyboardHeight > 0) {
                    this.stickerKeyboardHeight = this.cachedKeyboardHeight;
                    this.waitingForKeyboard = false;
                    this.setState({ keyboardHeight: 0, stickerKeyboardShown: true, isStickersOpaque: true, hasStickerTranslation: false }, () => {
                        if (this.inputRef.current && this.inputRef.current.isFocused()) {
                            this.inputRef.current.blur();
                        }
                    });
                } else {
                    this.inputRef.current?.focus();
                }
            }
            return;
        }
        let prevCount = ++this.stickerButtonPressedCount;
        if (this.state.stickerKeyboardShown) {
            this.waitingForKeyboardNative = true;
            this.setState({ stickerKeyboardShown: false, keyboardHeight: this.stickerKeyboardHeight }, () => {
                if (this.inputRef.current && !this.inputRef.current.isFocused()) {
                    this.inputRef.current.focus();
                }
            });
            setTimeout(() => {
                if (prevCount !== this.stickerButtonPressedCount) {
                    return;
                }
                this.setState({ isStickersOpaque: false });
            }, 400);
        } else {
            if (this.openKeyboardHeight > 0) {
                this.stickerKeyboardHeight = this.openKeyboardHeight;
                this.setState({ keyboardHeight: 0, stickerKeyboardShown: true, hasStickerTranslation: false, isStickersOpaque: true }, () => {
                    if (this.inputRef.current && this.inputRef.current.isFocused()) {
                        this.inputRef.current.blur();
                    }
                });
            } else if (this.inputRef.current) {
                if (this.inputRef.current.isFocused()) {
                    this.inputRef.current.blur();
                }
                this.waitingForKeyboard = true;
                this.shouldHideStickerKeyboard = false;
                this.inputRef.current.focus();
            }
        }
    }

    clearActionsBar = () => {
        this.setState({ closingQuoted: true });
        setTimeout(() => {
            this.props.messagesActionsMethods.clear();
            this.setState({ closingQuoted: false });
        }, 2000);
    }

    onQuotedClearPress = () => {
        this.clearActionsBar();
        this.removeDraft();
    }

    onEditedClearPress = () => {
        this.clearActionsBar();
        this.setState({
            text: '',
            mentions: []
        });

        this.removeDraft();
    }

    onMutedChange = () => {
        this.setState(prevState => ({ muted: !prevState.muted }));
    }

    onCustomCallPress = async () => {
        let customCallLink = this.props.chat?.__typename === 'SharedRoom' && this.props.chat?.callSettings.callLink;
        let matchedLink = customCallLink && matchLinks(customCallLink)?.[0].url;
        if (matchedLink) {
            try {
                await Linking.openURL(matchedLink);
            } catch (e) {
                /**/
            }
        }
    }

    handleScroll = (event: NativeSyntheticEvent<any>) => {
        if (this.stickerKeyboardHeight > 0 && event.nativeEvent.touchPositionY > 0 && this.state.stickerKeyboardShown && this.prevScrollY !== event.nativeEvent.touchPositionY) {
            let height = this.stickerKeyboardHeight;
            let newHeight = event.nativeEvent.touchPositionY - SDevice.safeArea.bottom;
            if (newHeight + 20 < height) {
                this.setState({ stickerKeyboardShown: false, hasStickerTranslation: true });
            }
        }
        if (event.nativeEvent.touchPositionY > 0) {
            this.prevScrollY = event.nativeEvent.touchPositionY;
        }
    }

    render() {
        let { messagesActionsState } = this.props;

        let isSavedMessages = this.props.chat.__typename === 'PrivateRoom' && this.props.engine.user.id === this.props.chat.user.id;

        let path = resolveConversationProfilePath(this.props.chat);
        let header = (
            <TouchableOpacity disabled={!path.path} onPress={() => this.props.router.push(path.path!, path.pathArgs)}>
                <View flexDirection="row" flexShrink={1} marginLeft={Platform.OS === 'android' ? -12 : 0}>
                    <ChatHeaderAvatar conversationId={this.engine.conversationId} router={this.props.router} />
                    <ChatHeader conversationId={this.engine.conversationId} router={this.props.router} muted={this.state.muted} />
                </View>
            </TouchableOpacity>
        );

        let suggestions = null;
        let activeWord = findActiveWord(this.state.text, this.state.selection);
        if (this.state.inputFocused && activeWord && activeWord.startsWith('@')) {
            suggestions = (
                <MentionsSuggestions
                    activeWord={activeWord}
                    onMentionPress={this.handleMentionPress}
                    groupId={this.props.chat.id}
                    isChannel={this.props.chat.__typename === 'SharedRoom' && this.props.chat.isChannel}
                    isPrivate={this.props.chat.__typename === 'PrivateRoom'}
                />
            );
        }

        if (this.state.inputFocused && activeWord && activeWord.startsWith(':')) {
            suggestions = (
                <EmojiSuggestions
                    activeWord={activeWord}
                    onEmojiPress={this.handleEmojiPress}
                />
            );
        }

        if (Platform.OS === 'android' && this.state.inputFocused && activeWord && emojiWordMap[activeWord.toLowerCase()]) {
            suggestions = (
                <EmojiSuggestionsRow
                    items={emojiWordMap[activeWord.toLowerCase()]}
                    activeWord={activeWord}
                    onEmojiPress={this.handleEmojiPress}
                />
            );
        }

        let quoted = null;
        let canSubmit = this.state.text.trim().length > 0;

        if (['reply', 'forward'].includes(messagesActionsState.action)) {
            if (messagesActionsState.action === 'forward') {
                canSubmit = true;
            }
            quoted = <ForwardReplyView isClosing={this.state.closingQuoted} onClearPress={this.onQuotedClearPress} messages={messagesActionsState.messages.map(convertMessageBack)} action={messagesActionsState.action === 'forward' ? 'forward' : 'reply'} />;
        }

        if (messagesActionsState.action === 'edit') {
            quoted = <EditView isClosing={this.state.closingQuoted} onClearPress={this.onEditedClearPress} message={messagesActionsState.messages.map(convertMessageBack)[0]} />;
        }

        let sharedRoom = this.props.chat.__typename === 'SharedRoom' ? this.props.chat : undefined;
        let privateRoom = this.props.chat.__typename === 'PrivateRoom' ? this.props.chat : undefined;
        const isBanned = this.props.banInfo ? this.props.banInfo.isBanned || this.props.banInfo.isMeBanned : false;
        let showInputBar = (sharedRoom ? (sharedRoom.kind === SharedRoomKind.INTERNAL || sharedRoom.canSendMessage) : true) && (privateRoom ? !privateRoom.user.isBot && !isBanned : true);
        let showPinAuthor = sharedRoom && (sharedRoom!.kind !== SharedRoomKind.PUBLIC);

        let showSelectedMessagesActions = messagesActionsState.action === 'selected';
        let pinnedMessage = this.props.chat.pinnedMessage;

        let inputPlaceholder = null;
        if (!showSelectedMessagesActions && sharedRoom && sharedRoom.isChannel) {
            inputPlaceholder = <ChannelMuteButton id={sharedRoom.id} muted={this.state.muted} onMutedChange={this.onMutedChange} />;
        }
        if (!showSelectedMessagesActions && privateRoom && privateRoom.user.isBot) {
            inputPlaceholder = <ChatInputPlaceholder text="View profile" onPress={() => this.props.router.push("ProfileUser", { id: privateRoom!.user.id })} />;
        }
        if (!showSelectedMessagesActions && privateRoom && !!this.props.banInfo && (this.props.banInfo.isBanned || this.props.banInfo.isMeBanned)) {
            inputPlaceholder = <ChatInputBlockPlaceholder banInfo={this.props.banInfo} />;
        }
        const reloadButton = <ReloadFromBottomButton conversation={this.engine} />;
        const isBot = privateRoom && privateRoom.user.isBot;
        const callMode = sharedRoom ? sharedRoom.callSettings.mode : RoomCallsMode.STANDARD;
        const showCallButton = !isSavedMessages && !isBot && !showSelectedMessagesActions && !sharedRoom?.isChannel;
        return (
            <>
                {!showSelectedMessagesActions && (
                    <SHeaderView>
                        {header}
                    </SHeaderView>
                )}
                {!isBanned && showCallButton && callMode === RoomCallsMode.STANDARD && (
                    <SHeaderButton
                        title="Call"
                        priority={1}
                        icon={require('assets/ic-call-24.png')}
                        onPress={this.props.showCallModal}
                    />
                )}
                {!isBanned && showCallButton && callMode === RoomCallsMode.LINK && (
                    <SHeaderButton
                        title="Call"
                        priority={1}
                        icon={require('assets/ic-call-external-24.png')}
                        onPress={this.onCustomCallPress}
                    />
                )}
                {!showSelectedMessagesActions && (
                    <ConversationManageButton
                        muted={this.state.muted}
                        onMutedChange={this.onMutedChange}
                        router={this.props.router}
                        room={this.props.chat}
                        isBanned={isBanned}
                    />
                )}
                <SDeferred>
                    <View style={{ height: '100%', flexDirection: 'column', position: 'relative' }}>
                        <View
                            style={{
                                flex: 1,
                                flexGrow: 1,
                                flexBasis: 1,
                                flexShrink: 0,
                                flexDirection: 'column',
                                paddingBottom: Platform.select({
                                    ios: 0,
                                    android: this.state.stickerKeyboardShown ? this.stickerKeyboardHeight : this.state.keyboardHeight,
                                })
                            }}
                        >
                            <ConversationView inverted={true} engine={this.engine} onScroll={this.handleScroll} isBanned={isBanned} />
                            {pinnedMessage && (
                                <PinnedMessage
                                    message={pinnedMessage}
                                    onPress={this.handlePinnedMessagePress}
                                    theme={this.props.theme}
                                    showAuthor={showPinAuthor}
                                    canUnpin={this.props.chat.__typename === 'PrivateRoom' || this.props.chat.canUnpinMessage || SUPER_ADMIN}
                                    chatId={this.props.chat.id}
                                />
                            )}
                            {showInputBar && !showSelectedMessagesActions && (
                                <MessageInputBar
                                    reloadButton={reloadButton}
                                    ref={this.inputRef}
                                    onAttachPress={this.handleAttach}
                                    onSubmitPress={this.handleSubmit}
                                    onChangeText={this.handleTextChange}
                                    onSelectionChange={this.handleSelectionChange}
                                    onFocus={this.handleFocus}
                                    onBlur={this.handleBlur}
                                    text={this.state.text}
                                    suggestions={suggestions}
                                    topView={quoted}
                                    placeholder={(sharedRoom && sharedRoom.isChannel) ? 'Broadcast something...' : 'Message'}
                                    canSubmit={canSubmit}
                                    onStickerKeyboardButtonPress={this.handleStickerKeyboardButtonPress}
                                    stickerKeyboardShown={this.state.stickerKeyboardShown}
                                    overrideTransform={this.state.stickerKeyboardShown ? (this.stickerKeyboardHeight + 0) : (this.state.keyboardHeight > 0 ? 0 : -1)}
                                    hasNewStickers={this.props.hasNewStickers}
                                    bottomView={
                                        Platform.OS === 'ios' && (
                                            <View
                                                style={{
                                                    top: '100%',
                                                    paddingBottom: SDevice.safeArea.bottom,
                                                    backgroundColor: this.props.theme.backgroundPrimary,
                                                    position: 'absolute',
                                                    zIndex: 4,
                                                    left: 0,
                                                    right: 0,
                                                    opacity: this.state.isStickersOpaque ? 1 : 0,
                                                }}
                                                transform={this.state.hasStickerTranslation ? [{ translateY: SDevice.safeArea.bottom }] : undefined}
                                            >
                                                <StickerPicker
                                                    onStickerSent={(sticker: StickerFragment) => this.engine.sendSticker(sticker, undefined)}
                                                    theme={this.props.theme}
                                                    height={this.stickerKeyboardHeight}
                                                />
                                            </View>
                                        )
                                    }
                                />
                            )}
                            {!showInputBar && reloadButton}
                            {!showInputBar && inputPlaceholder}
                            {showSelectedMessagesActions && <ChatSelectedActions conversation={this.engine} chat={this.props.chat} />}
                        </View>
                        {Platform.OS === 'android' && this.state.stickerKeyboardShown && (
                            <View
                                style={{
                                    bottom: SDevice.safeArea.bottom,
                                    position: 'absolute',
                                    zIndex: 4,
                                    left: 0,
                                    right: 0,
                                }}
                            >
                                <StickerPicker
                                    onStickerSent={(sticker: StickerFragment) => this.engine.sendSticker(sticker, undefined)}
                                    theme={this.props.theme}
                                    height={this.stickerKeyboardHeight}
                                />
                            </View>
                        )}
                    </View>
                    <ASSafeAreaContext.Consumer>
                        {context => {
                            const keyboardOpened = context.openKeyboardHeight > 0;
                            if (keyboardOpened) {
                                this.openKeyboardHeight = context.openKeyboardHeight;
                            }
                            if (this.waitingForKeyboard && keyboardOpened) {
                                this.stickerKeyboardHeight = this.openKeyboardHeight;
                                this.waitingForKeyboard = false;
                                this.setState({ keyboardHeight: 0, stickerKeyboardShown: true, isStickersOpaque: true, hasStickerTranslation: false }, () => {
                                    if (this.inputRef.current && this.inputRef.current.isFocused()) {
                                        this.inputRef.current.blur();
                                    }
                                });
                            } else if (this.state.keyboardHeight !== context.openKeyboardHeight || keyboardOpened !== this.state.keyboardOpened) {
                                if (!this.waitingForKeyboardNative) {
                                    this.setState({ keyboardHeight: context.openKeyboardHeight, keyboardOpened });
                                } else if (keyboardOpened) {
                                    this.waitingForKeyboardNative = false;
                                    this.setState({ keyboardHeight: context.openKeyboardHeight, keyboardOpened });
                                }
                            } else if (this.waitingForKeyboardNative && keyboardOpened) {
                                this.waitingForKeyboardNative = false;
                            }
                            return null;
                        }}
                    </ASSafeAreaContext.Consumer>
                </SDeferred>
            </>
        );
    }
}

const ConversationComponent = React.memo((props: PageProps) => {
    let theme = React.useContext(ThemeContext);
    let messenger = getMessenger();
    let room = getClient().useRoomTiny({ id: props.router.params.flexibleId || props.router.params.id }, { fetchPolicy: 'cache-and-network' }).room;
    let hasNewStickers = !!getClient().useUnviewedStickers({ suspense: false })?.stickers.unviewedCount;
    let mountedRef = React.useContext(SRouterMountedContext);
    let showCallModal = useCallModal({ id: room?.id! });
    let userId = room?.__typename === 'PrivateRoom' ? room.user.id : undefined;
    let messagesActionsState = useChatMessagesActionsState(room?.id);
    let messagesActionsMethods = useChatMessagesActionsMethods(room?.id);

    React.useEffect(() => {
        if (userId && room?.id) {
            setMessagesActionsUserChat(room.id, userId);
        }
    }, [userId, room?.id]);

    if (room === null) {
        return <ChatAccessDenied theme={theme} onPress={() => props.router.back()} />;
    }

    let sharedRoom = room.__typename === 'SharedRoom' ? room as RoomTiny_room_SharedRoom : null;
    let privateRoom = room.__typename === 'PrivateRoom' ? room as RoomTiny_room_PrivateRoom : null;
    let hasPinnedMessage = (sharedRoom || privateRoom)?.pinnedMessage;

    const banInfo = privateRoom
        ? useUserBanInfo(
            privateRoom.user.id,
            privateRoom.user.isBanned,
            privateRoom.user.isMeBanned,
        )
        : undefined;

    if (sharedRoom && sharedRoom.membership !== 'MEMBER') {
        return <ChatJoin room={sharedRoom!} theme={theme} router={props.router} />;
    }

    return (
        <View flexDirection="column" height="100%" width="100%">
            <ConversationRoot
                key={(sharedRoom || privateRoom)!.id}
                router={props.router}
                engine={messenger.engine}
                chat={(sharedRoom || privateRoom)!}
                showCallModal={showCallModal}
                theme={theme}
                mountedRef={mountedRef}
                messagesActionsState={messagesActionsState}
                messagesActionsMethods={messagesActionsMethods}
                banInfo={banInfo}
                hasNewStickers={hasNewStickers}
            />
            <ASSafeAreaContext.Consumer>
                {safe => (
                    <View
                        position="absolute"
                        top={hasPinnedMessage ? safe.top + PINNED_MESSAGE_HEIGHT : safe.top + 10}
                        right={0}
                        left={0}
                    >
                        <CallBarComponent id={(sharedRoom || privateRoom)!.id} showCallModal={showCallModal} />
                    </View>
                )}
            </ASSafeAreaContext.Consumer>
        </View>
    );
});

export const Conversation = withApp(ConversationComponent, { navigationAppearance: 'small', hideBackText: true, hideHairline: true });
