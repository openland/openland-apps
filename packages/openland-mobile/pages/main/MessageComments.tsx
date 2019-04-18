import * as React from 'react';
import { withApp } from '../../components/withApp';
import { XMemo } from 'openland-y-utils/XMemo';
import { PageProps } from 'openland-mobile/components/PageProps';
import { getMessenger } from 'openland-mobile/utils/messenger';
import { View, NativeSyntheticEvent, TextInputSelectionChangeEventData, Platform, ScrollView, Keyboard, TextInput } from 'react-native';
import { SHeader } from 'react-native-s/SHeader';
import { MessageInputBar } from './components/MessageInputBar';
import { DefaultConversationTheme } from './themes/ConversationThemeResolver';
import { MessageComments_messageComments_comments, FullMessage_GeneralMessage, MessageComments_messageComments_comments_comment, CommentWatch_event_CommentUpdateSingle_update, RoomMembers_members_user, MentionInput, UserShort, RoomShort_SharedRoom, FileAttachmentInput } from 'openland-api/Types';
import { getClient } from 'openland-mobile/utils/apolloClient';
import { MobileMessenger } from 'openland-mobile/messenger/MobileMessenger';
import { startLoader, stopLoader } from 'openland-mobile/components/ZGlobalLoader';
import { SenderView } from 'openland-mobile/messenger/components/SenderView';
import { SequenceModernWatcher } from 'openland-engines/core/SequenceModernWatcher';
import { findActiveWord } from 'openland-y-utils/findActiveWord';
import { EmojiRender } from './components/EmojiRender';
import { ActionSheetBuilder } from 'openland-mobile/components/ActionSheet';
import { ZMessageView } from 'openland-mobile/components/message/ZMessageView';
import { ASSafeAreaContext } from 'react-native-async-view/ASSafeAreaContext';
import { MentionsRender } from './components/MentionsRender';
import { SHeaderButton } from 'react-native-s/SHeaderButton';
import { showAttachMenu } from '../../files/showAttachMenu';
import { CommentsList } from './components/comments/CommentsList';
import { ReplyView } from './components/comments/ReplyView';
import { SDevice } from 'react-native-s/SDevice';
import { UploadManagerInstance } from 'openland-mobile/files/UploadManager';
import { Alert } from 'openland-mobile/components/AlertBlanket';

interface MessageCommentsInnerProps {
    message: FullMessage_GeneralMessage;
    comments: MessageComments_messageComments_comments[];
    messenger: MobileMessenger;

    room?: RoomShort_SharedRoom;
}

const MessageCommentsInner = (props: MessageCommentsInnerProps) => {
    const inputRef = React.createRef<TextInput>();

    const { message, comments, room, messenger } = props;

    // state
    const [replied, setReplied] = React.useState<MessageComments_messageComments_comments_comment | undefined>(undefined);
    const [inputText, setInputText] = React.useState<string>('');
    const [inputFocused, setInputFocused] = React.useState<boolean>(false);
    const [inputSelection, setInputSelection] = React.useState<{ start: number, end: number }>({ start: 0, end: 0 });
    const [sending, setSending] = React.useState<boolean>(false);
    const [mentions, setMentions] = React.useState<({ user: UserShort, offset: number, length: number })[]>([]);

    // callbacks
    const handleSubmit = React.useCallback(async (attachment?: FileAttachmentInput) => {
        if (inputText.trim().length > 0 || attachment) {
            setSending(true);

            let mentionsCleared: MentionInput[] = [];

            if (mentions.length > 0) {
                mentions.map(mention => {
                    if (inputText.indexOf(mention.user.name) >= 0) {
                        mentionsCleared.push({
                            userId: mention.user.id,
                            offset: mention.offset,
                            length: mention.length
                        });
                    }
                });
            }

            await getClient().mutateAddMessageComment({
                messageId: message.id,
                message: inputText,
                replyComment: replied ? replied.id : null,
                mentions: mentionsCleared.length > 0 ? mentionsCleared : null,
                fileAttachments: attachment ? [attachment] : null
            });

            setInputText('');
            setReplied(undefined);
            setSending(false);
            setMentions([]);
        }
    }, [message, inputText, mentions, replied]);

    const handleEmojiPress = React.useCallback((word: string | undefined, emoji: string) => {
        if (typeof word !== 'string') {
            return;
        }

        let newText = inputText.substring(0, inputSelection.start - word.length) + emoji + ' ' + inputText.substring(inputSelection.start, inputText.length);

        setInputText(newText);
    }, [inputText, inputSelection]);

    const handleMentionPress = React.useCallback((word: string | undefined, user: RoomMembers_members_user) => {
        if (typeof word !== 'string') {
            return;
        }

        let newText = inputText.substring(0, inputSelection.start - word.length) + '@' + user.name + ' ' + inputText.substring(inputSelection.start, inputText.length);

        setInputText(newText);
        setMentions([...mentions, {
            user: user,
            offset: inputSelection.start - 1,
            length: user.name.length + 1
        }]);
    }, [inputText, inputSelection, mentions]);

    const handleManagePress = React.useCallback(() => {
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
    }, [messenger, room]);

    const handleAttach = React.useCallback(() => {
        showAttachMenu((type, name, path, size) => {
            setSending(true);

            UploadManagerInstance.registerSimpleUpload(
                name,
                path,
                {
                    onProgress: (progress: number) => {
                        // temp ignore
                    },
                    onDone: (fileId: string) => {
                        handleSubmit({ fileId });
                    },
                    onFail: () => {
                        setSending(false);

                        Alert.alert('Error while uploading file');
                    }
                },
                size
            )
        });
    }, [message, inputText, mentions, replied]);

    const handleReplyPress = React.useCallback((comment: MessageComments_messageComments_comments_comment) => {
        setReplied(comment);

        if (inputRef.current) {
            inputRef.current.focus();
        }
    }, [inputRef]);

    const handleReplyClear = React.useCallback(() => {
        if (inputText.length <= 0) {
            Keyboard.dismiss();
        }

        setReplied(undefined);
    }, [inputText]);

    const handleInputTextChange = React.useCallback((src: string) => {
        setInputText(src);
    }, []);

    const handleInputSelectionChange = React.useCallback((e: NativeSyntheticEvent<TextInputSelectionChangeEventData>) => {
        setInputSelection({
            start: e.nativeEvent.selection.start,
            end: e.nativeEvent.selection.end
        });
    }, []);

    const handleInputFocus = React.useCallback(() => { setInputFocused(true); }, []);
    const handleInputBlur = React.useCallback(() => { setInputFocused(false); }, []);

    const manageIcon = Platform.OS === 'android' ? require('assets/ic-more-android-24.png') : require('assets/ic-more-24.png');

    let activeWord = findActiveWord(inputText, inputSelection);

    let suggestions: JSX.Element[] = [];

    if (room && inputFocused && activeWord && activeWord.startsWith('@')) {
        suggestions.push(<MentionsRender activeWord={activeWord!} onMentionPress={handleMentionPress} groupId={room!.id} />);
    }

    if (inputFocused && activeWord && activeWord.startsWith(':')) {
        suggestions.push(<EmojiRender activeWord={activeWord!} onEmojiPress={handleEmojiPress} />);
    }

    if (replied) {
        suggestions.push(<ReplyView comment={[replied]} onClearPress={handleReplyClear} />);
    }

    let content = (
        <View paddingHorizontal={16} paddingBottom={Platform.OS === 'ios' ? 68 : undefined}>
            <SenderView sender={message.sender} date={message.date} />
            <ZMessageView message={message} showReactions={true} />
            <CommentsList
                comments={comments}
                onReplyPress={handleReplyPress}
                highlightedId={replied ? replied.id : undefined}
            />
        </View>
    );

    return (
        <>
            <SHeader title="Comments" />

            {room && room.canEdit && room.pinnedMessage && (room.pinnedMessage.id === message.id) && <SHeaderButton title="Manage" icon={manageIcon} onPress={handleManagePress} />}

            <ASSafeAreaContext.Consumer>
                {area => (
                    <>
                        <View flexGrow={1} flexShrink={1} paddingTop={area.top}>
                            {Platform.OS === 'ios' && (
                                <ScrollView flexGrow={1} keyboardDismissMode="interactive" keyboardShouldPersistTaps="always" contentContainerStyle={{ paddingBottom: area.bottom - SDevice.safeArea.bottom }} scrollIndicatorInsets={{ bottom: area.bottom - SDevice.safeArea.bottom }}>
                                    {content}
                                </ScrollView>
                            )}
                            {Platform.OS === 'android' && (
                                <ScrollView flexGrow={1} keyboardDismissMode="interactive" keyboardShouldPersistTaps="always">
                                    {content}
                                </ScrollView>
                            )}
                        </View>

                        <View paddingBottom={Platform.OS === 'android' ? area.keyboardHeight : undefined}>
                            <MessageInputBar
                                onAttachPress={handleAttach}
                                onSubmitPress={() => handleSubmit()}
                                onChangeText={handleInputTextChange}
                                onSelectionChange={handleInputSelectionChange}
                                onFocus={handleInputFocus}
                                onBlur={handleInputBlur}
                                text={inputText}
                                theme={DefaultConversationTheme}
                                placeholder="Write a comment..."
                                topContent={suggestions}
                                showLoader={sending}
                                ref={inputRef}
                            />
                        </View>
                    </>
                )}
            </ASSafeAreaContext.Consumer>
        </>
    );
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
        const watcher = new SequenceModernWatcher('comment messageId:' + messageId, client.subscribeCommentWatch({ peerId: messageId }), client.client, updateHandler, undefined, { peerId: messageId }, null);

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
