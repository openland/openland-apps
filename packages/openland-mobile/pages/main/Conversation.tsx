import * as React from 'react';
import { withApp } from '../../components/withApp';
import { View, FlatList, AsyncStorage, Platform, TouchableOpacity, NativeSyntheticEvent, TextInputSelectionChangeEventData, TextInput } from 'react-native';
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
import { KeyboardSafeAreaView } from 'react-native-async-view/ASSafeAreaView';
import { Room_room, Room_room_SharedRoom, Room_room_PrivateRoom, SharedRoomKind } from 'openland-api/Types';
import { getClient } from 'openland-mobile/utils/graphqlClient';
import { SDeferred } from 'react-native-s/SDeferred';
import { CallBarComponent } from 'openland-mobile/calls/CallBar';
import { ASSafeAreaContext } from 'react-native-async-view/ASSafeAreaContext';
import { XMemo } from 'openland-y-utils/XMemo';
import { MentionsRender } from './components/MentionsRender';
import { findActiveWord } from 'openland-y-utils/findActiveWord';
import Alert from 'openland-mobile/components/AlertBlanket';
import { ThemeContext } from 'openland-mobile/themes/ThemeContext';
import { startLoader, stopLoader } from 'openland-mobile/components/ZGlobalLoader';
import { ChannelMuteButton, ChatInputPlaceholder } from './components/ChannelMuteButton';
import { SHeaderButton } from 'react-native-s/SHeaderButton';
import { showCallModal } from './Call';
import { EmojiRender } from './components/EmojiRender';
import { showAttachMenu } from 'openland-mobile/files/showAttachMenu';
import { MessagesActionsState } from 'openland-engines/messenger/MessagesActionsState';
import { ForwardReplyView } from 'openland-mobile/messenger/components/ForwardReplyView';
import { EditView } from 'openland-mobile/messenger/components/EditView';
import { ChatSelectedActions } from './components/ChatSelectedActions';
import { prepareLegacyMentionsForSend, convertMentionsFromMessage } from 'openland-engines/legacy/legacymentions';
import { findSpans } from 'openland-y-utils/findSpans';
import { throttle } from 'openland-y-utils/timer';
import { MentionToSend } from 'openland-engines/messenger/MessageSender';
import { ThemeGlobal } from 'openland-y-utils/themes/ThemeGlobal';
import { PinnedMessage } from './components/PinnedMessage';
import { ChatAccessDenied } from './components/ChatAccessDenied';
import { ChatJoin } from './components/ChatJoin';

interface ConversationRootProps extends PageProps {
    engine: MessengerEngine;
    chat: Room_room;
    theme: ThemeGlobal;
}

interface ConversationRootState {
    text: string;
    mentions: MentionToSend[];
    inputFocused: boolean;
    selection: {
        start: number,
        end: number
    };
    messagesActionsState: MessagesActionsState;
}

class ConversationRoot extends React.Component<ConversationRootProps, ConversationRootState> {
    engine: ConversationEngine;
    listRef = React.createRef<FlatList<any>>();
    inputRef = React.createRef<TextInput>();

    private setTyping = throttle(() => {
        getMessenger().engine.client.mutateSetTyping({ conversationId: this.props.chat.id });
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
            messagesActionsState: { messages: [] }
        };

        AsyncStorage.getItem('compose_draft_' + this.props.chat.id).then(s => this.setState({ text: s || '' }));
        AsyncStorage.getItem('compose_draft_mentions_v2_' + this.props.chat.id).then(s => this.setState({ mentions: JSON.parse(s) || [] }));
    }

    componentWillMount() {
        this.engine.messagesActionsState.listen(state => {
            this.setState({ messagesActionsState: state });

            if (state.messages && state.messages.length > 0) {
                if (state.action === 'edit') {
                    const editMessage = state.messages[0];

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
                } else if (state.action === 'reply' && this.inputRef.current) {
                    this.inputRef.current.focus();
                } else if (state.action === 'forward') {
                    setTimeout(() => {
                        if (this.inputRef.current) {
                            this.inputRef.current.focus();
                        }
                    }, 500);
                }
            }
        });
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
        this.setState({
            inputFocused: true
        });
    }

    handleBlur = () => {
        this.setState({
            inputFocused: false
        });
    }

    handleSubmit = async () => {
        let { messagesActionsState } = this.state;
        let tx = this.state.text.trim();

        if (messagesActionsState.messages && messagesActionsState.messages.length > 0 && messagesActionsState.action === 'edit') {
            let messageToEdit = messagesActionsState.messages.map(convertMessageBack)[0];

            startLoader();
            try {
                await getClient().mutateEditMessage({
                    messageId: messageToEdit.id,
                    message: tx,
                    mentions: prepareLegacyMentionsForSend(tx, this.state.mentions || []),
                    spans: findSpans(tx)
                });
            } catch (e) {
                Alert.alert(e.message);
            } finally {
                stopLoader();
            }
        } else {
            this.engine.sendMessage(tx, this.state.mentions);
        }

        this.engine.messagesActionsState.clear();

        this.setState({
            text: '',
            mentions: [],
        });

        this.removeDraft();
    }

    handleAttach = () => {
        showAttachMenu((type, name, path, size) => {
            UploadManagerInstance.registerUpload(this.props.chat.id, name, path, size);
        });
    }

    handleMentionPress = (word: string | undefined, mention: MentionToSend) => {
        if (typeof word !== 'string') {
            return;
        }

        let { text, selection } = this.state;
        let newText = '';

        if (mention.__typename === 'User') {
            newText = text.substring(0, selection.start - word.length) + '@' + mention.name + ' ' + text.slice(selection.start);
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
        this.props.router.push('MessageComments', { messageId: mid });
    }

    onQuotedClearPress = () => {
        this.engine.messagesActionsState.clear();

        this.removeDraft();
    }

    onEditedClearPress = () => {
        this.engine.messagesActionsState.clear();

        this.setState({
            text: '',
            mentions: []
        });

        this.removeDraft();
    }

    render() {
        let { messagesActionsState } = this.state;

        let path = resolveConversationProfilePath(this.props.chat);
        let header = (
            <TouchableOpacity disabled={!path.path} onPress={() => this.props.router.push(path.path!, path.pathArgs)}>
                <View flexDirection="row" flexShrink={1} marginLeft={Platform.OS === 'android' ? -12 : 0}>
                    <ChatHeaderAvatar conversationId={this.engine.conversationId} router={this.props.router} />
                    <ChatHeader conversationId={this.engine.conversationId} router={this.props.router} />
                </View>
            </TouchableOpacity>
        );

        let suggestions = null;
        let activeWord = findActiveWord(this.state.text, this.state.selection);
        if (this.props.chat.__typename === 'SharedRoom' && this.state.inputFocused && activeWord && activeWord.startsWith('@')) {
            suggestions = (
                <MentionsRender
                    activeWord={activeWord}
                    onMentionPress={this.handleMentionPress}
                    groupId={this.props.chat.id}
                />
            );
        }

        if (this.state.inputFocused && activeWord && activeWord.startsWith(':')) {
            suggestions = (
                <EmojiRender
                    activeWord={activeWord}
                    onEmojiPress={this.handleEmojiPress}
                />
            );
        }

        let quoted = null;
        let canSubmit = this.state.text.trim().length > 0;

        if (messagesActionsState.messages && messagesActionsState.messages.length > 0 && ['reply', 'forward'].includes(messagesActionsState.action || '')) {
            canSubmit = true;
            quoted = <ForwardReplyView onClearPress={this.onQuotedClearPress} messages={messagesActionsState.messages.map(convertMessageBack)} action={messagesActionsState.action === 'forward' ? 'forward' : 'reply'} />;
        }

        if (messagesActionsState.messages && messagesActionsState.messages.length > 0 && messagesActionsState.action === 'edit') {
            quoted = <EditView onClearPress={this.onEditedClearPress} message={messagesActionsState.messages.map(convertMessageBack)[0]} />;
        }

        let sharedRoom = this.props.chat.__typename === 'SharedRoom' ? this.props.chat : undefined;
        let privateRoom = this.props.chat.__typename === 'PrivateRoom' ? this.props.chat : undefined;
        let showInputBar = (sharedRoom ? (sharedRoom.kind === SharedRoomKind.INTERNAL || sharedRoom.canSendMessage) : true) && (privateRoom ? !privateRoom.user.isBot : true);

        let showPinAuthor = sharedRoom && (sharedRoom!.kind !== SharedRoomKind.PUBLIC);

        let showSelectedMessagesActions = this.state.messagesActionsState.messages.length > 0 && !this.state.messagesActionsState.action;
        let pinnedMessage = this.props.chat.pinnedMessage;

        let inputPlaceholder = null;
        if (!showSelectedMessagesActions && sharedRoom && sharedRoom.isChannel) {
            inputPlaceholder = <ChannelMuteButton id={sharedRoom.id} mute={!!sharedRoom.settings.mute} />;
        }
        if (!showSelectedMessagesActions && privateRoom && privateRoom.user.isBot) {
            inputPlaceholder = <ChatInputPlaceholder text="View profile" onPress={() => this.props.router.push("ProfileUser", { id: privateRoom!.user.id })} />;
        }

        return (
            <>
                <SHeaderView>
                    {header}
                </SHeaderView>
                {(privateRoom ? !privateRoom.user.isBot : true) && (
                    <SHeaderButton
                        title="Call"
                        icon={require('assets/ic-call-24.png')}
                        onPress={async () => { showCallModal(this.props.chat.id); }}
                    />
                )}
                <SDeferred>
                    <KeyboardSafeAreaView>
                        <View style={{ height: '100%', flexDirection: 'column' }}>
                            <ConversationView inverted={true} engine={this.engine} />
                            {pinnedMessage && (
                                <PinnedMessage
                                    message={pinnedMessage}
                                    onPress={this.handlePinnedMessagePress}
                                    theme={this.props.theme}
                                    showAuthor={showPinAuthor}
                                />
                            )}
                            {showInputBar && !showSelectedMessagesActions && (
                                <MessageInputBar
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
                                    placeholder={(sharedRoom && sharedRoom.isChannel) ? 'Broadcast something...' : 'Message...'}
                                    canSubmit={canSubmit}
                                />
                            )}
                            {!showInputBar && inputPlaceholder}
                            {showSelectedMessagesActions && <ChatSelectedActions conversation={this.engine} />}
                        </View>
                    </KeyboardSafeAreaView>
                </SDeferred>
            </>
        );
    }
}

const ConversationComponent = XMemo<PageProps>((props) => {
    let theme = React.useContext(ThemeContext);
    let messenger = getMessenger();
    let room = getClient().useRoomTiny({ id: props.router.params.flexibleId || props.router.params.id }, { fetchPolicy: 'cache-and-network' }).room;

    if (room === null) {
        return <ChatAccessDenied theme={theme} onPress={() => props.router.back()} />;
    }

    let sharedRoom = room.__typename === 'SharedRoom' ? room as Room_room_SharedRoom : null;
    let privateRoom = room.__typename === 'PrivateRoom' ? room as Room_room_PrivateRoom : null;

    if (sharedRoom && sharedRoom.membership !== 'MEMBER' && sharedRoom.kind === 'PUBLIC') {
        return <ChatJoin room={sharedRoom!} router={props.router} theme={theme} />;
    }

    return (
        <View flexDirection="column" height="100%" width="100%">
            <ConversationRoot key={(sharedRoom || privateRoom)!.id} router={props.router} engine={messenger.engine} chat={(sharedRoom || privateRoom)!} theme={theme} />
            <ASSafeAreaContext.Consumer>
                {safe => <View position="absolute" top={safe.top} right={0} left={0}><CallBarComponent id={(sharedRoom || privateRoom)!.id} /></View>}
            </ASSafeAreaContext.Consumer>
        </View>
    );
});

export const Conversation = withApp(ConversationComponent, { navigationAppearance: 'small', hideBackText: true, hideHairline: true });