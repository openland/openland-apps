import * as React from 'react';
import { withApp } from '../../components/withApp';
import { XMemo } from 'openland-y-utils/XMemo';
import { PageProps } from 'openland-mobile/components/PageProps';
import { getMessenger } from 'openland-mobile/utils/messenger';
import { View, NativeSyntheticEvent, TextInputSelectionChangeEventData, Platform, ScrollView, Keyboard, TextInput } from 'react-native';
import { SHeader } from 'react-native-s/SHeader';
import { MessageInputBar } from './components/MessageInputBar';
import { MessageComments_messageComments_comments, FullMessage_GeneralMessage, MessageComments_messageComments_comments_comment, CommentWatch_event_CommentUpdateSingle_update, FileAttachmentInput, RoomShort } from 'openland-api/Types';
import { getClient } from 'openland-mobile/utils/graphqlClient';
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
import { SDevice } from 'react-native-s/SDevice';
import { UploadManagerInstance } from 'openland-mobile/files/UploadManager';
import { Alert } from 'openland-mobile/components/AlertBlanket';
import { ForwardReplyView } from 'openland-mobile/messenger/components/ForwardReplyView';
import { EditView } from 'openland-mobile/messenger/components/EditView';
import { findSpans } from 'openland-y-utils/findSpans';
import { MentionToSend } from 'openland-engines/messenger/MessageSender';
import { prepareLegacyMentionsForSend, convertMentionsFromMessage } from 'openland-engines/legacy/legacymentions';
import { trackEvent } from 'openland-mobile/analytics';
import { getDepthOfCommentByID } from 'openland-y-utils/sortComments';

interface MessageCommentsInnerProps {
    message: FullMessage_GeneralMessage;
    comments: MessageComments_messageComments_comments[];
    messenger: MobileMessenger;
    chat: RoomShort;

    highlightId?: string;
}

const MessageCommentsInner = (props: MessageCommentsInnerProps) => {
    const inputRef = React.createRef<TextInput>();
    const scrollRef = React.createRef<ScrollView>();

    const { message, comments, chat, messenger, highlightId } = props;

    // state
    const [replied, setReplied] = React.useState<MessageComments_messageComments_comments_comment | undefined>(undefined);
    const [edited, setEdited] = React.useState<MessageComments_messageComments_comments_comment | undefined>(undefined);
    const [inputText, setInputText] = React.useState<string>('');
    const [inputFocused, setInputFocused] = React.useState<boolean>(false);
    const [inputSelection, setInputSelection] = React.useState<{ start: number, end: number }>({ start: 0, end: 0 });
    const [sending, setSending] = React.useState<boolean>(false);
    const [mentions, setMentions] = React.useState<(MentionToSend)[]>([]);
    const [needScrollTo, setNeedScrollTo] = React.useState<boolean>(false);

    const canPin = (chat.__typename === 'PrivateRoom') || (chat.__typename === 'SharedRoom' && chat.canEdit);

    // callbacks
    const handleScrollToView = (y: number) => {
        if (scrollRef.current && needScrollTo) {
            scrollRef.current.scrollTo(y);

            setNeedScrollTo(false);
        }
    };

    const handleSubmit = React.useCallback(async (attachment?: FileAttachmentInput) => {
        let text = inputText.trim();

        if (text.length > 0 || attachment) {
            setSending(true);

            if (edited) {
                await getClient().mutateEditComment({
                    id: edited.id,
                    message: text,
                    spans: findSpans(text),
                    mentions: prepareLegacyMentionsForSend(text, mentions),
                });
            } else {
                let newCommentDepth = 0;

                if (replied) {
                    newCommentDepth = getDepthOfCommentByID(replied.id, comments) + 1;
                }

                trackEvent('comment_sent', { comment_level: newCommentDepth });

                await getClient().mutateAddMessageComment({
                    messageId: message.id,
                    message: text,
                    replyComment: replied ? replied.id : null,
                    mentions: prepareLegacyMentionsForSend(text, mentions),
                    fileAttachments: attachment ? [attachment] : null,
                    spans: findSpans(text)
                });
            }

            setInputText('');
            setReplied(undefined);
            setEdited(undefined);
            setSending(false);
            setMentions([]);
        }
    }, [message, inputText, mentions, replied, edited, comments]);

    const handleEmojiPress = React.useCallback((word: string | undefined, emoji: string) => {
        if (typeof word !== 'string') {
            return;
        }

        let newText = inputText.substring(0, inputSelection.start - word.length) + emoji + ' ' + inputText.substring(inputSelection.start, inputText.length);

        setInputText(newText);
    }, [inputText, inputSelection]);

    const handleMentionPress = React.useCallback((word: string | undefined, mention: MentionToSend) => {
        if (typeof word !== 'string') {
            return;
        }

        let newText = '';

        if (mention.__typename === 'User') {
            newText = inputText.substring(0, inputSelection.start - word.length) + '@' + mention.name + ' ' + inputText.slice(inputSelection.start);
        } else if (mention.__typename === 'AllMention') {
            newText = inputText.substring(0, inputSelection.start - word.length) + '@All' + ' ' + inputText.slice(inputSelection.start);
        }

        setInputText(newText);
        setMentions([...mentions, mention]);
    }, [inputText, inputSelection, mentions]);

    const handleManagePress = React.useCallback(() => {
        let client = messenger.engine.client;
        let router = messenger.history.navigationManager;

        let builder = new ActionSheetBuilder();

        if (canPin) {
            builder.action('Unpin', async () => {
                startLoader();
                try {
                    await client.mutateUnpinMessage({ chatId: chat.id });

                    router.pop();
                } finally {
                    stopLoader();
                }
            });
        }

        builder.show();
    }, [messenger, chat]);

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
    }, [message, inputText, mentions, replied, edited]);

    const handleReplyPress = React.useCallback((comment: MessageComments_messageComments_comments_comment) => {
        setReplied(comment);

        if (edited) {
            setEdited(undefined);
            setInputText('');
        }

        if (inputRef.current) {
            inputRef.current.focus();
        }
    }, [inputRef, edited, replied]);

    const handleEditPress = React.useCallback((comment: MessageComments_messageComments_comments_comment) => {
        setReplied(undefined);
        setEdited(comment);
        setInputText(comment.message || '');
        setMentions(convertMentionsFromMessage(comment.message, comment.spans))

        if (inputRef.current) {
            inputRef.current.focus();
        }
    }, [inputRef, edited, replied]);

    const handleReplyClear = React.useCallback(() => {
        if (inputText.length <= 0) {
            Keyboard.dismiss();
        }

        setReplied(undefined);
    }, [inputText]);

    const handleEditClear = React.useCallback(() => {
        setInputText('');
        setEdited(undefined);
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

    React.useEffect(() => {
        if (highlightId) {
            const filteredComments = comments.filter(c => c.comment.id === highlightId);

            if (filteredComments.length > 0) {
                setNeedScrollTo(true);
                setReplied(filteredComments[0].comment);
            }
        }
    }, []);

    const manageIcon = Platform.OS === 'android' ? require('assets/ic-more-android-24.png') : require('assets/ic-more-24.png');

    let activeWord = findActiveWord(inputText, inputSelection);

    let suggestions: JSX.Element;
    let quoted: JSX.Element;

    if (chat.__typename === 'SharedRoom' && inputFocused && activeWord && activeWord.startsWith('@')) {
        suggestions = <MentionsRender activeWord={activeWord!} onMentionPress={handleMentionPress} groupId={chat.id} />;
    }

    if (inputFocused && activeWord && activeWord.startsWith(':')) {
        suggestions = <EmojiRender activeWord={activeWord!} onEmojiPress={handleEmojiPress} />;
    }

    if (replied) {
        quoted = <ForwardReplyView messages={[replied]} onClearPress={handleReplyClear} />;
    }

    if (edited) {
        quoted = <EditView message={edited} isComment={true} onClearPress={handleEditClear} />;
    }

    let content = (
        <View paddingHorizontal={16} paddingBottom={Platform.OS === 'ios' ? 68 : undefined}>
            <SenderView sender={message.sender} date={message.date} edited={message.edited} />
            <ZMessageView message={message} showReactions={true} />
            <CommentsList
                comments={comments}
                onReplyPress={handleReplyPress}
                onEditPress={handleEditPress}
                highlightedId={replied ? replied.id : undefined}
                handleScrollTo={handleScrollToView}
            />
        </View>
    );

    return (
        <>
            <SHeader title="Comments" />

            {canPin && chat.pinnedMessage && (chat.pinnedMessage.id === message.id) && <SHeaderButton title="Manage" icon={manageIcon} onPress={handleManagePress} />}

            <ASSafeAreaContext.Consumer>
                {area => (
                    <>
                        {Platform.OS === 'ios' && (
                            <ScrollView ref={scrollRef} flexGrow={1} flexShrink={1} keyboardDismissMode="interactive" keyboardShouldPersistTaps="always" contentContainerStyle={{ paddingTop: area.top, paddingBottom: area.bottom - SDevice.safeArea.bottom }} scrollIndicatorInsets={{ top: area.top, bottom: area.bottom - SDevice.safeArea.bottom }}>
                                {content}
                            </ScrollView>
                        )}
                        {Platform.OS === 'android' && (
                            <ScrollView ref={scrollRef} flexGrow={1} flexShrink={1} keyboardDismissMode="interactive" keyboardShouldPersistTaps="always">
                                {content}
                            </ScrollView>
                        )}

                        <View paddingBottom={Platform.OS === 'android' ? area.keyboardHeight : undefined}>
                            <MessageInputBar
                                onAttachPress={handleAttach}
                                onSubmitPress={() => handleSubmit()}
                                onChangeText={handleInputTextChange}
                                onSelectionChange={handleInputSelectionChange}
                                onFocus={handleInputFocus}
                                onBlur={handleInputBlur}
                                text={inputText}
                                placeholder="Write a comment..."
                                suggestions={suggestions}
                                topView={quoted}
                                showLoader={sending}
                                ref={inputRef}
                                canSubmit={inputText.trim().length > 0}
                            />
                        </View>
                    </>
                )}
            </ASSafeAreaContext.Consumer>
        </>
    );
}

const MessageCommentsComponent = XMemo<PageProps>((props) => {
    const chatId = props.router.params.chatId;
    const messageId = props.router.params.messageId;
    const highlightId = props.router.params.highlightCommentId;

    const messenger = getMessenger();
    const client = getClient();

    const message = client.useMessage({ messageId: messageId }, { fetchPolicy: 'cache-and-network' }).message as FullMessage_GeneralMessage;
    const comments = client.useMessageComments({ messageId: messageId }, { fetchPolicy: 'cache-and-network' }).messageComments.comments;

    const room = client.useRoomTiny({ id: chatId }).room!;

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
            chat={room}
            highlightId={highlightId}
        />
    );
});

export const MessageComments = withApp(MessageCommentsComponent, { navigationAppearance: 'small' });
