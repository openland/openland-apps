import * as React from 'react';
import { withApp } from '../../components/withApp';
import { XMemo } from 'openland-y-utils/XMemo';
import { PageProps } from 'openland-mobile/components/PageProps';
import { getMessenger } from 'openland-mobile/utils/messenger';
import { View, Text, TextStyle, NativeSyntheticEvent, TextInputSelectionChangeEventData, TouchableWithoutFeedback, Image, Platform, Clipboard, ScrollView, KeyboardAvoidingView, Keyboard, TextInput } from 'react-native';
import { SHeader } from 'react-native-s/SHeader';
import { TextStyles } from 'openland-mobile/styles/AppStyles';
import { MessageInputBar } from './components/MessageInputBar';
import { DefaultConversationTheme, ConversationTheme } from './themes/ConversationThemeResolver';
import { MessageComments_messageComments_comments, FullMessage_GeneralMessage, MessageComments_messageComments_comments_comment, CommentWatch_event_CommentUpdateSingle_update, RoomMembers_members_user, MentionInput, UserShort, RoomShort_SharedRoom } from 'openland-api/Types';
import { getClient } from 'openland-mobile/utils/apolloClient';
import { sortComments, getDepthOfComment } from 'openland-y-utils/sortComments';
import { MobileMessenger } from 'openland-mobile/messenger/MobileMessenger';
import { startLoader, stopLoader } from 'openland-mobile/components/ZGlobalLoader';
import { Alert } from 'openland-mobile/components/AlertBlanket';
import { SenderView } from 'openland-mobile/messenger/components/SenderView';
import { CommentView } from 'openland-mobile/messenger/components/CommentView';
import { SequenceModernWatcher } from 'openland-engines/core/SequenceModernWatcher';
import { findActiveWord } from 'openland-y-utils/findActiveWord';
import { EmojiRender, findEmojiByShortname } from './components/EmojiRender';
import { ActionSheetBuilder } from 'openland-mobile/components/ActionSheet';
import { Prompt } from 'openland-mobile/components/Prompt';
import { ZMessageView } from 'openland-mobile/components/message/ZMessageView';
import { ASSafeAreaContext } from 'react-native-async-view/ASSafeAreaContext';
import { MentionsRender } from './components/MentionsRender';
import { SHeaderButton } from 'react-native-s/SHeaderButton';

interface MessageCommentsInnerProps {
    message: FullMessage_GeneralMessage;
    comments: MessageComments_messageComments_comments[];
    messenger: MobileMessenger;

    room?: RoomShort_SharedRoom;
}

interface MessageCommentsInnerState {
    text: string;
    theme: ConversationTheme;
    replyTo: MessageComments_messageComments_comments_comment | undefined;
    inputFocused: boolean;
    selection: {
        start: number,
        end: number
    },
    sending: boolean,
    mentions: ({
        user: UserShort;
        offset: number;
        length: number;
    })[],
}

class MessageCommentsInner extends React.Component<MessageCommentsInnerProps, MessageCommentsInnerState> {
    private inputRef = React.createRef<TextInput>();

    constructor(props: MessageCommentsInnerProps) {
        super(props);
        this.state = {
            text: '',
            theme: DefaultConversationTheme,
            replyTo: undefined,
            selection: {
                start: 0,
                end: 0.
            },
            inputFocused: false,
            sending: false,
            mentions: [],
        };
    }

    handleAttach = () => {
        // temp ignore
    }

    handleSubmit = async () => {
        const text = this.state.text;

        if (text.trim().length > 0) {
            this.setState({ sending: true });

            let mentionsCleared: MentionInput[] = [];

            if (this.state.mentions.length > 0) {
                this.state.mentions.map(mention => {
                    if (text.indexOf(mention.user.name) >= 0) {
                        mentionsCleared.push({
                            userId: mention.user.id,
                            offset: mention.offset,
                            length: mention.length
                        });
                    }
                })
            }

            await getClient().mutateAddMessageComment({
                messageId: this.props.message.id,
                message: this.state.text,
                replyComment: this.state.replyTo ? this.state.replyTo.id : null,
                mentions: mentionsCleared.length > 0 ? mentionsCleared : null
            });

            this.setState({ text: '', replyTo: undefined, sending: false, mentions: [] });
        }
    }

    handleTextChange = (src: string) => {
        this.setState({ text: src });
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

    handleEmojiPress = (word: string | undefined, emoji: string) => {
        if (typeof word !== 'string') {
            return;
        }

        let { text, selection } = this.state;

        let newText = text.substring(0, selection.start - word.length) + emoji + ' ' + text.substring(selection.start, text.length);

        this.setState({ text: newText });
    }

    handleMentionPress = (word: string | undefined, user: RoomMembers_members_user) => {
        if (typeof word !== 'string') {
            return;
        }

        let { text, selection } = this.state;

        let newText = text.substring(0, selection.start - word.length) + '@' + user.name + ' ' + text.substring(selection.start, text.length);
        let mentionedUsers = this.state.mentions;

        mentionedUsers.push({
            user: user,
            offset: this.state.selection.start - 1,
            length: user.name.length + 1
        });

        this.setState({
            text: newText,
            mentions: mentionedUsers
        });
    }

    handleReplyPress = (comment: MessageComments_messageComments_comments_comment) => {
        this.setState({ replyTo: comment });

        if (this.inputRef.current) {
            this.inputRef.current.focus();
        }
    }

    handleCommentLongPress = (comment: MessageComments_messageComments_comments_comment) => {
        let engine = this.props.messenger.engine;
        let builder = new ActionSheetBuilder();

        if (comment.message) {
            if (comment.sender.id === engine.user.id) {
                builder.action('Edit', () => {
                    Prompt.builder()
                        .title('Edit comment')
                        .value(comment.message!)
                        .callback(async (text) => {
                            startLoader();
                            try {
                                await engine.client.mutateEditComment({ id: comment.id!, message: text });
                            } catch (e) {
                                Alert.alert(e.message);
                            }
                            stopLoader();
                        })
                        .show();
                });
            }

            builder.action('Copy', () => {
                Clipboard.setString(comment.message!!);
            });
        }
        
        if (comment.sender.id === engine.user.id) {
            builder.action('Delete', async () => {
                try {
                    Alert.builder()
                        .title('Delete comment')
                        .message('Delete this comment for everyone? This cannot be undone.')
                        .button('Cancel', 'cancel')
                        .action('Delete', 'destructive', async () => {
                            await engine.client.mutateDeleteComment({ id: comment.id! });
                        }).show();
                } catch (e) {
                    Alert.alert(e.message);
                }
            }, true);
        }

        builder.show();
    }

    handleReplyClear = () => {
        if (this.state.text.length <= 0) {
            Keyboard.dismiss();
        }

        this.setState({ replyTo: undefined });
    }

    handleManageClick = () => {
        let room = this.props.room;
        let messenger = this.props.messenger;
        let client = messenger.engine.client;
        let router = messenger.history.navigationManager;

        if (room) {
            let builder = new ActionSheetBuilder();
    
            if (room.canEdit) {
                builder.action('Unpin', async () => {
                    startLoader();
                    try {
                        await client.mutateUnpinMessage({ chatId: room!.id });
                        
                        router.pop();
                    } finally {
                        stopLoader();
                    }
                });
            }
    
            builder.show();
        }
    }

    render () {
        const { message, comments, room } = this.props;
        const { replyTo } = this.state;
        const commentsElements: JSX.Element[] = [];

        if (this.props.comments.length > 0) {
            const commentsMap = {};
    
            this.props.comments.forEach(comment => {
                commentsMap[comment.id] = comment;
            });
    
            const result = sortComments(comments, commentsMap);
    
            for (let commentEntry of result) {
                commentsElements.push(
                    <CommentView
                        key={commentEntry.id}
                        comment={commentEntry.comment}
                        deleted={commentEntry.deleted}
                        depth={getDepthOfComment(commentEntry, commentsMap)}
                        onReplyPress={this.handleReplyPress}
                        onLongPress={this.handleCommentLongPress}
                        highlighted={((this.state.replyTo && this.state.replyTo.id) === commentEntry.id) || false}
                    />
                );
            }
        }

        let suggestions = null;
        let activeWord = findActiveWord(this.state.text, this.state.selection);

        if (replyTo) {
            suggestions = (
                <View marginLeft={Platform.OS === 'android' ? 12 : 15} paddingLeft={8} marginRight={Platform.OS === 'android' ? 12 : 52} borderLeftColor="#0084fe" borderLeftWidth={2} marginTop={10} marginBottom={4} flexDirection="row">
                    <View flexGrow={1}>
                        <Text style={{ color: '#0084fe', fontSize: 14, lineHeight: 20, marginBottom: 1, fontWeight: TextStyles.weight.medium } as TextStyle} numberOfLines={1} allowFontScaling={false}>{replyTo.sender.name}</Text>
                        <Text style={{ color: '#99a2b0', fontSize: 14 }} numberOfLines={1} allowFontScaling={false}>{replyTo.message}</Text>
                    </View>
                    <TouchableWithoutFeedback onPress={this.handleReplyClear}>
                        <View marginLeft={11} width={18} height={38} alignItems="center" justifyContent="center">
                            <Image source={require('assets/ic-cancel-gray-18.png')} style={{ tintColor: '#b9c1cd', width: 18, height: 18 }} />
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            );
        }

        if (this.state.inputFocused && activeWord && activeWord.startsWith('@')) {
            suggestions = (
                <MentionsRender
                    activeWord={activeWord}
                    onMentionPress={this.handleMentionPress}
                    groupId={room!.id}
                />
            );
        }

        if (this.state.inputFocused && activeWord && activeWord.startsWith(':')) {
            let findedEmoji = findEmojiByShortname(activeWord);

            if (findedEmoji.length > 0) {
                suggestions = (
                    <EmojiRender
                        activeWord={activeWord}
                        onEmojiPress={this.handleEmojiPress}
                        redefineItems={findedEmoji}
                    />
                );
            }
        }

        let content = (
            <ScrollView flexGrow={1} keyboardDismissMode="interactive" keyboardShouldPersistTaps="always">
                <View paddingHorizontal={16} paddingBottom={Platform.OS === 'ios' ? 68 : undefined}>
                    <SenderView sender={message.sender} date={message.date} />
                    <ZMessageView message={message} showReactions={true} />

                    {comments.length > 0 && (
                        <>
                            <View height={1} backgroundColor="#eff0f2" marginTop={20} />

                            <View marginTop={20} marginBottom={20}>
                                <Text style={{ fontSize: 16, color: '#99a2b0', fontWeight: TextStyles.weight.medium } as TextStyle} allowFontScaling={false}>COMMENTS: <Text style={{ color: '#b9c1cd' }}>{this.props.comments.length}</Text></Text>
                            </View>

                            {commentsElements}
                        </>
                    )}

                    {comments.length === 0 && (
                        <View flexGrow={1} flexShrink={1} alignItems="center" justifyContent="center" paddingVertical={40}>
                            <Image source={require('assets/img-empty.png')} style={{ width: 224, height: 224, marginBottom: 30 }} />
                            <Text style={{ fontSize: 15, color: 'rgba(0, 0, 0, 0.4)' }} allowFontScaling={false}>Write the first comment</Text>
                        </View>
                    )}
                </View>
            </ScrollView>
        );

        let input = (
            <MessageInputBar
                attachesEnabled={false}
                onAttachPress={this.handleAttach}
                onSubmitPress={this.handleSubmit}
                onChangeText={this.handleTextChange}
                onSelectionChange={this.handleSelectionChange}
                onFocus={this.handleFocus}
                onBlur={this.handleBlur}
                text={this.state.text}
                theme={this.state.theme}
                placeholder="Write a comment..."
                topContent={suggestions}
                showLoader={this.state.sending}
                ref={this.inputRef}
            />
        );

        const manageIcon = Platform.OS === 'android' ? require('assets/ic-more-android-24.png') : require('assets/ic-more-24.png');

        return (
            <>
                <SHeader title="Comments" />

                {room && room.canEdit && room.pinnedMessage && (room.pinnedMessage.id === message.id) && <SHeaderButton title="Manage" icon={manageIcon} onPress={this.handleManageClick} />}

                <ASSafeAreaContext.Consumer>
                    {area => (
                        <>
                            <View flexGrow={1} flexShrink={1} paddingTop={area.top}>
                                {Platform.OS === 'ios' && (
                                    <KeyboardAvoidingView flexGrow={1} behavior="padding">
                                        {content}
                                    </KeyboardAvoidingView>
                                )}
                                {Platform.OS !== 'ios' && (
                                    <>
                                        {content}
                                    </>
                                )}
                            </View>

                            <View paddingBottom={Platform.OS === 'android' ? area.keyboardHeight : undefined}>
                                {input}
                            </View>
                        </>
                    )}
                </ASSafeAreaContext.Consumer>
            </>
        );
    }
}

const MessageCommentsComponent = XMemo<PageProps>((props) => {
    let chatId = props.router.params.chatId;
    let messageId = props.router.params.messageId;

    let messenger = getMessenger();
    let client = getClient();

    let message = client.useMessage({ messageId: messageId }).message as FullMessage_GeneralMessage;
    let comments = client.useMessageComments({ messageId: messageId }, { fetchPolicy: 'cache-and-network' }).messageComments.comments;

    let room = client.useRoomTiny({ id: chatId }).room;
    let sharedRoom = room && room.__typename === 'SharedRoom' ? room as RoomShort_SharedRoom : undefined;

    const updateHandler = async (event: CommentWatch_event_CommentUpdateSingle_update) => {
        if (event.__typename === 'CommentReceived') {
            await client.refetchMessageComments({ messageId });
        }
    };

    React.useEffect(() => {
        const watcher = new SequenceModernWatcher('comment messageId:' + messageId, client.subscribeCommentWatch({ peerId: messageId }), client.client, updateHandler, undefined, { peerId: messageId }, null );

        return () => {
            watcher.destroy();
        };
    });

    return (
        <MessageCommentsInner
            message={message}
            comments={comments}
            messenger={messenger}
            room={sharedRoom}
        />
    );
});

export const MessageComments = withApp(MessageCommentsComponent, { navigationAppearance: 'small' });
