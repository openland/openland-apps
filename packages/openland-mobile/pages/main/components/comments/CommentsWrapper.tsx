import * as React from 'react';
import { View, NativeSyntheticEvent, TextInputSelectionChangeEventData, Platform, ScrollView, Keyboard, TextInput } from 'react-native';
import { MessageInputBar } from '../MessageInputBar';
import { CommentEntryFragment_comment, FileAttachmentInput, Message_message_GeneralMessage_source_MessageSourceChat_chat, CommentEntryFragment, CommentWatch_event_CommentUpdateSingle_update } from 'openland-api/Types';
import { getClient } from 'openland-mobile/utils/graphqlClient';
import { findActiveWord } from 'openland-y-utils/findActiveWord';
import { EmojiSuggestions, EmojiSuggestionsRow } from '../suggestions/EmojiSuggestions';
import { ASSafeAreaContext } from 'react-native-async-view/ASSafeAreaContext';
import { MentionsSuggestions } from '../suggestions/MentionsSuggestions';
import { CommentsList } from '../comments/CommentsList';
import { SDevice } from 'react-native-s/SDevice';
import { UploadManagerInstance } from 'openland-mobile/files/UploadManager';
import Alert from 'openland-mobile/components/AlertBlanket';
import { ForwardReplyView } from 'openland-mobile/messenger/components/ForwardReplyView';
import { EditView } from 'openland-mobile/messenger/components/EditView';
import { findSpans } from 'openland-y-utils/findSpans';
import { MentionToSend } from 'openland-engines/messenger/MessageSender';
import { prepareLegacyMentionsForSend, convertMentionsFromMessage } from 'openland-engines/legacy/legacymentions';
import { trackEvent } from 'openland-mobile/analytics';
import { getDepthOfCommentByID } from 'openland-y-utils/sortComments';
import UUID from 'uuid/v4';
import { emojiWordMap } from 'openland-y-utils/emojiWordMap';
import { showAttachMenu } from 'openland-mobile/files/showAttachMenu';
import { useClient } from 'openland-mobile/utils/useClient';
import { SequenceModernWatcher } from 'openland-engines/core/SequenceModernWatcher';
import { showNoiseWarning } from 'openland-mobile/messenger/components/showNoiseWarning';

interface CommentsWrapperProps {
    peerView: JSX.Element;
    peerId: string;
    chat?: Message_message_GeneralMessage_source_MessageSourceChat_chat;
    highlightId?: string;
}

const CommentsWrapperInner = (props: CommentsWrapperProps & { comments: CommentEntryFragment[] }) => {
    const inputRef = React.createRef<TextInput>();
    const scrollRef = React.createRef<ScrollView>();
    const area = React.useContext(ASSafeAreaContext);

    const { peerView, peerId, comments, chat, highlightId } = props;

    // state
    const [replied, setReplied] = React.useState<CommentEntryFragment_comment | undefined>(undefined);
    const [edited, setEdited] = React.useState<CommentEntryFragment_comment | undefined>(undefined);
    const [inputText, setInputText] = React.useState<string>('');
    const [inputFocused, setInputFocused] = React.useState<boolean>(false);
    const [inputSelection, setInputSelection] = React.useState<{ start: number, end: number }>({ start: 0, end: 0 });
    const [sending, setSending] = React.useState<boolean>(false);
    const [mentions, setMentions] = React.useState<(MentionToSend)[]>([]);

    const handleSubmit = React.useCallback(async (attachment?: FileAttachmentInput) => {
        let text = inputText.trim();

        if (text.length > 0 || attachment) {
            setSending(true);

            let mentionsPrepared = prepareLegacyMentionsForSend(text, mentions);

            if (edited) {
                await getClient().mutateEditComment({
                    id: edited.id,
                    message: text,
                    spans: findSpans(text),
                    mentions: mentionsPrepared,
                });
            } else {
                if (chat && chat.__typename === 'SharedRoom' && mentionsPrepared.filter(m => m.all === true).length) {
                    try {
                        await showNoiseWarning(
                            `Notify all members?`,
                            'By using @All, you’re about to notify all group members even when they muted this chat. Please use it only for important messages'
                        );
                    } catch {
                        setSending(false);

                        return;
                    }
                }

                let newCommentDepth = 0;

                if (replied) {
                    newCommentDepth = getDepthOfCommentByID(replied.id, comments) + 1;
                }

                trackEvent('comment_sent', { comment_level: newCommentDepth });

                const repeatKey = UUID();

                await getClient().mutateAddComment({
                    peerId,
                    repeatKey,
                    message: text,
                    replyComment: replied ? replied.id : null,
                    mentions: mentionsPrepared,
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
    }, [inputText, mentions, replied, edited, comments]);

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

    const handleAttach = React.useCallback(() => {
        showAttachMenu((type, name, path, size) => {
            setSending(true);

            UploadManagerInstance.registerUpload(
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
            );
        });
    }, [inputText, mentions, replied, edited]);

    const handleReplyPress = React.useCallback((comment: CommentEntryFragment_comment) => {
        setReplied(comment);

        if (edited) {
            setEdited(undefined);
            setInputText('');
        }

        if (inputRef.current) {
            inputRef.current.focus();
        }
    }, [inputRef, edited, replied]);

    const handleEditPress = React.useCallback((comment: CommentEntryFragment_comment) => {
        setReplied(undefined);
        setEdited(comment);
        setInputText(comment.message || '');
        setMentions(convertMentionsFromMessage(comment.message, comment.spans));

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
                setReplied(filteredComments[0].comment);
            }
        }
    }, []);

    let activeWord = findActiveWord(inputText, inputSelection);

    let suggestions: JSX.Element | null = null;
    let quoted: JSX.Element | null = null;

    if (chat && chat.__typename === 'SharedRoom' && inputFocused && activeWord && activeWord.startsWith('@')) {
        suggestions = <MentionsSuggestions activeWord={activeWord!} onMentionPress={handleMentionPress} groupId={chat.id} />;
    }

    if (inputFocused && activeWord && activeWord.startsWith(':')) {
        suggestions = <EmojiSuggestions activeWord={activeWord!} onEmojiPress={handleEmojiPress} />;
    }

    if (Platform.OS === 'android' && inputFocused && activeWord && emojiWordMap[activeWord.toLowerCase()]) {
        suggestions = <EmojiSuggestionsRow items={emojiWordMap[activeWord.toLowerCase()]} activeWord={activeWord} onEmojiPress={handleEmojiPress} />;
    }

    if (replied) {
        quoted = <ForwardReplyView messages={[replied]} onClearPress={handleReplyClear} />;
    }

    if (edited) {
        quoted = <EditView message={edited} isComment={true} onClearPress={handleEditClear} />;
    }

    let content = (
        <View paddingBottom={Platform.OS === 'ios' ? 68 : undefined}>
            {peerView}

            <CommentsList
                comments={comments}
                onReplyPress={handleReplyPress}
                onEditPress={handleEditPress}
                highlightedId={replied ? replied.id : undefined}
                scrollRef={scrollRef}
            />
        </View>
    );

    return (
        <>
            {Platform.OS === 'ios' && (
                <ScrollView ref={scrollRef} flexGrow={1} flexShrink={1} keyboardDismissMode="interactive" keyboardShouldPersistTaps="always" contentContainerStyle={{ paddingTop: area.top, paddingBottom: (area.bottom - SDevice.safeArea.bottom <= 0) ? 80 : area.bottom - SDevice.safeArea.bottom }} scrollIndicatorInsets={{ top: area.top, bottom: (area.bottom - SDevice.safeArea.bottom <= 0) ? 80 : area.bottom - SDevice.safeArea.bottom }}>
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
                    placeholder="Comment"
                    suggestions={suggestions}
                    topView={quoted}
                    showLoader={sending}
                    ref={inputRef}
                    canSubmit={inputText.trim().length > 0}
                />
            </View>
        </>
    );
};

export const CommentsWrapper = React.memo((props: CommentsWrapperProps) => {
    const client = useClient();
    const { peerId } = props;
    const comments = client.useComments({ peerId }, { fetchPolicy: 'cache-and-network' }).comments.comments;

    const updateHandler = async (event: CommentWatch_event_CommentUpdateSingle_update) => {
        await client.refetchComments({ peerId });
    };

    React.useEffect(() => {
        const watcher = new SequenceModernWatcher('comment peerId:' + peerId, client.subscribeCommentWatch({ peerId }), client.client, updateHandler, undefined, { peerId }, null);

        return () => {
            watcher.destroy();
        };
    });

    return <CommentsWrapperInner {...props} comments={comments} />;
});