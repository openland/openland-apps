import * as React from 'react';
import { withApp } from '../../components/withApp';
import { View, Text, FlatList, AsyncStorage, Platform, TouchableOpacity, NativeSyntheticEvent, TextInputSelectionChangeEventData, Image, TouchableWithoutFeedback, TextStyle } from 'react-native';
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
import { KeyboardSafeAreaView, ASSafeAreaView } from 'react-native-async-view/ASSafeAreaView';
import { Room_room, Room_room_SharedRoom, Room_room_PrivateRoom, SharedRoomKind } from 'openland-api/Types';
import { getClient } from 'openland-mobile/utils/graphqlClient';
import { SDeferred } from 'react-native-s/SDeferred';
import { CallBarComponent } from 'openland-mobile/calls/CallBar';
import { ASSafeAreaContext } from 'react-native-async-view/ASSafeAreaContext';
import { XMemo } from 'openland-y-utils/XMemo';
import { MentionsRender } from './components/MentionsRender';
import { findActiveWord } from 'openland-y-utils/findActiveWord';
import { Alert } from 'openland-mobile/components/AlertBlanket';
import { TextStyles } from 'openland-mobile/styles/AppStyles';
import { ZAvatar } from 'openland-mobile/components/ZAvatar';
import { ThemeContext } from 'openland-mobile/themes/ThemeContext';
import { ZRoundedButton } from 'openland-mobile/components/ZRoundedButton';
import { startLoader, stopLoader } from 'openland-mobile/components/ZGlobalLoader';
import { ChannelMuteButton } from './components/ChannelMuteButton';
import { SHeaderButton } from 'react-native-s/SHeaderButton';
import { showCallModal } from './Call';
import { EmojiRender } from './components/EmojiRender';
import { showAttachMenu } from 'openland-mobile/files/showAttachMenu';
import { MessagesActionsState } from 'openland-engines/messenger/MessagesActionsState';
import { ForwardReplyView } from 'openland-mobile/messenger/components/ForwardReplyView';
import { AppTheme } from 'openland-mobile/themes/themes';
import { SBlurView } from 'react-native-s/SBlurView';
import { EditView } from 'openland-mobile/messenger/components/EditView';
import { SHeader } from 'react-native-s/SHeader';
import { ChatSelectedActions } from './components/ChatSelectedActions';
import { prepareLegacyMentionsForSend, convertMentionsFromMessage } from 'openland-engines/legacy/legacymentions';
import { findSpans } from 'openland-y-utils/findSpans';
import throttle from 'lodash/throttle';
import { MentionToSend } from 'openland-engines/messenger/MessageSender';

interface ConversationRootProps extends PageProps {
    engine: MessengerEngine;
    chat: Room_room;
    theme: AppTheme;
}

interface ConversationRootState {
    text: string;
    mentions: MentionToSend[];
    inputFocused: boolean;
    selection: {
        start: number,
        end: number
    },
    messagesActionsState: MessagesActionsState,
}

class ConversationRoot extends React.Component<ConversationRootProps, ConversationRootState> {
    engine: ConversationEngine;
    listRef = React.createRef<FlatList<any>>();
    private themeSub?: () => void;

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

    componentWillUnmount() {
        if (this.themeSub) {
            this.themeSub();
        }
    }

    componentWillMount() {
        this.engine.messagesActionsState.listen(state => {
            this.setState({ messagesActionsState: state })

            if (state.messages && state.messages.length > 0 && state.action === 'edit') {
                const editMessage = state.messages[0];

                this.setState({
                    text: editMessage.text || '',
                    mentions: convertMentionsFromMessage(editMessage.text, editMessage.spans)
                })
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
        this.props.router.push('MessageComments', { messageId: mid, chatId: this.props.chat.id });
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
            quoted = <ForwardReplyView onClearPress={this.onQuotedClearPress} messages={messagesActionsState.messages.map(convertMessageBack)} action={messagesActionsState.action === 'forward' ? 'forward' : 'reply'} />
        }

        if (messagesActionsState.messages && messagesActionsState.messages.length > 0 && messagesActionsState.action === 'edit') {
            quoted = <EditView onClearPress={this.onEditedClearPress} message={messagesActionsState.messages.map(convertMessageBack)[0]} />
        }

        let sharedRoom = this.props.chat.__typename === 'SharedRoom' ? this.props.chat : undefined;
        let showInputBar = !sharedRoom || sharedRoom.kind === SharedRoomKind.INTERNAL || sharedRoom.canSendMessage;

        let showPinAuthor = sharedRoom && (sharedRoom!.kind !== SharedRoomKind.PUBLIC);

        let showSelectedMessagesActions = this.state.messagesActionsState.messages.length > 0 && !this.state.messagesActionsState.action;
        let pinnedMessage = this.props.chat.pinnedMessage;

        return (
            <>
                <SHeaderView>
                    {header}
                </SHeaderView>
                <SHeaderButton
                    title="Call"
                    icon={require('assets/ic-call-26.png')}
                    onPress={async () => { showCallModal(this.props.chat.id); }}
                />
                <SDeferred>
                    <KeyboardSafeAreaView>
                        <View style={{ height: '100%', flexDirection: 'column' }}>
                            <ConversationView inverted={true} engine={this.engine} />

                            {pinnedMessage && (
                                <ASSafeAreaContext.Consumer>
                                    {area => (
                                        <SBlurView blurType={this.props.theme.blurType} color={this.props.theme.headerColor} position="absolute" top={area.top} left={0} right={0} zIndex={2} borderBottomColor={this.props.theme.separatorColor} borderBottomWidth={1}>
                                            <TouchableWithoutFeedback onPress={() => this.handlePinnedMessagePress(pinnedMessage!.id)}>
                                                <View flexDirection="row" paddingRight={16} alignItems="center">
                                                    <View width={50} height={showPinAuthor ? 52 : 44} alignItems="center" justifyContent="center">
                                                        <Image style={{ width: 16, height: 16, tintColor: this.props.theme.accentColor }} source={require('assets/ic-pinned.png')} />
                                                    </View>

                                                    <View height={showPinAuthor ? 52 : 44} flexGrow={1} flexShrink={1} paddingTop={9} >
                                                        {showPinAuthor && <View flexDirection="row">
                                                            <Text numberOfLines={1} style={{ fontSize: 13, color: this.props.theme.textColor, fontWeight: TextStyles.weight.medium }}>
                                                                {pinnedMessage!.sender.name}
                                                            </Text>

                                                            {sharedRoom!.pinnedMessage!.sender.primaryOrganization &&
                                                                <Text numberOfLines={1} style={{ fontSize: 13, color: this.props.theme.textLabelColor, marginLeft: 8, fontWeight: TextStyles.weight.medium }}>
                                                                    {pinnedMessage!.sender.primaryOrganization!.name}
                                                                </Text>
                                                            }
                                                        </View>}
                                                        <Text numberOfLines={1} style={{ fontSize: 14, fontWeight: TextStyles.weight.regular, marginTop: showPinAuthor ? 1 : 3, opacity: 0.8, lineHeight: 21, color: this.props.theme.textColor }}>
                                                            {pinnedMessage!.fallback}
                                                        </Text>
                                                    </View>
                                                </View>
                                            </TouchableWithoutFeedback>
                                        </SBlurView>
                                    )}
                                </ASSafeAreaContext.Consumer>
                            )}

                            {showInputBar && !showSelectedMessagesActions && (
                                <MessageInputBar
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
                            {!showInputBar && !showSelectedMessagesActions && sharedRoom && sharedRoom.isChannel && <ChannelMuteButton id={sharedRoom.id} mute={!!sharedRoom.settings.mute} />}
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
    let room = getClient().useRoomTiny({ id: props.router.params.flexibleId || props.router.params.id }, { fetchPolicy: 'cache-and-network' });

    if (room.room === null) {
        // access denied view
        return (
            <>
                <SHeader title="Access Denied" />
                <SHeaderButton />
                <ASSafeAreaView flexGrow={1} paddingHorizontal={16}>
                    <View height="73%" alignItems="center" justifyContent="center">
                        <Image source={theme.imageEmpty} style={{ width: 224, height: 224, marginBottom: 30 }} />
                        <Text style={{ textAlign: 'center', fontSize: 22, lineHeight: 28, color: theme.textColor, marginBottom: 10, fontWeight: TextStyles.weight.medium } as TextStyle} allowFontScaling={false}>Cannot view group</Text>
                        <Text style={{ textAlign: 'center', fontSize: 16, lineHeight: 24, color: theme.textColor, opacity: 0.6 }} allowFontScaling={false}>This group doesn't exist or you don't have permission to view it</Text>
                    </View>
                    <View height="27%" alignItems="center" justifyContent="center">
                        <View width={118}>
                            <ZRoundedButton
                                size="large"
                                title="Go back"
                                uppercase={false}
                                style="secondary"
                                onPress={() => props.router.back()}
                            />
                        </View>
                    </View>
                </ASSafeAreaView>
            </>
        );
    }

    let sharedRoom = room.room!.__typename === 'SharedRoom' ? room.room! as Room_room_SharedRoom : null;
    let privateRoom = room.room!.__typename === 'PrivateRoom' ? room.room! as Room_room_PrivateRoom : null;

    if (sharedRoom && sharedRoom.membership !== 'MEMBER' && sharedRoom.kind === 'PUBLIC') {
        // not a member - show preview with join/request access button
        return (
            <View flexDirection="column" height="100%" width="100%">
                <SHeaderView>
                    <ChatHeader conversationId={sharedRoom.id} router={props.router} />
                </SHeaderView>
                <SHeaderButton />
                <ASSafeAreaView width="100%" height="100%" justifyContent="center" >
                    <View alignSelf="center" alignItems="center" justifyContent="center" flexDirection="column" flexGrow={1}>
                        <ZAvatar
                            src={sharedRoom.photo}
                            size={100}
                            placeholderKey={sharedRoom.id}
                            placeholderTitle={sharedRoom.title}

                        />
                        <View flexDirection="column" zIndex={- 1}>
                            <Text style={{ fontSize: 20, fontWeight: '500', color: theme.textColor, textAlign: 'center', marginTop: 22, marginLeft: 32, marginRight: 32 }} >{sharedRoom.title}</Text>
                            <Text style={{ fontSize: 15, color: theme.textLabelColor, textAlign: 'center', marginTop: 7, marginLeft: 32, marginRight: 32, lineHeight: 22 }} >{sharedRoom.description}</Text>
                            <Text style={{ fontSize: 14, color: theme.textLabelColor, textAlign: 'center', marginTop: 10, marginLeft: 32, marginRight: 32, lineHeight: 18 }} >{sharedRoom.membersCount + ' members'}</Text>
                        </View>
                    </View>
                    <View alignSelf="center" marginBottom={46}>
                        <ZRoundedButton
                            size="big"
                            uppercase={false}
                            title="Join"
                            onPress={async () => {
                                startLoader();
                                try {
                                    await getClient().mutateRoomJoin({ roomId: sharedRoom!.id });
                                } catch (e) {
                                    Alert.alert(e.message);
                                } finally {
                                    stopLoader();
                                }
                            }}
                        />
                    </View>

                </ASSafeAreaView>
            </View>
        );
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