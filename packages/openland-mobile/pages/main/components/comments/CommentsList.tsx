import * as React from 'react';
import { View, Text, Clipboard, ScrollView } from 'react-native';
import { TextStyles } from 'openland-mobile/styles/AppStyles';
import { sortComments, getDepthOfComment } from 'openland-y-utils/sortComments';
import { CommentView } from 'openland-mobile/pages/main/components/comments/CommentView';
import { getMessenger } from 'openland-mobile/utils/messenger';
import { ActionSheetBuilder } from 'openland-mobile/components/ActionSheet';
import Alert from 'openland-mobile/components/AlertBlanket';
import { ThemeContext } from 'openland-mobile/themes/ThemeContext';
import { CommentEntryFragment, CommentEntryFragment_comment, RoomMemberRole } from 'openland-api/spacex.types';
import { SUPER_ADMIN } from 'openland-mobile/pages/Init';
import Toast from 'openland-mobile/components/Toast';
import { useText } from 'openland-mobile/text/useText';

interface CommentsListProps {
    comments: CommentEntryFragment[];
    role: RoomMemberRole | undefined;
    highlightedId?: string;
    scrollRef?: React.RefObject<ScrollView>;

    onReplyPress?: (comment: CommentEntryFragment_comment) => void;
    onEditPress: (comment: CommentEntryFragment_comment) => void;
}

export const CommentsList = (props: CommentsListProps) => {
    const { comments, role, highlightedId, onReplyPress, onEditPress, scrollRef } = props;
    const theme = React.useContext(ThemeContext);
    const { t } = useText();

    const handleLongPress = React.useCallback((comment: CommentEntryFragment_comment) => {
        let engine = getMessenger().engine;

        if (comment.message || comment.sender.id === engine.user.id) {
            let builder = new ActionSheetBuilder();

            if (comment.message) {
                if (comment.sender.id === engine.user.id) {
                    builder.action(t('edit', 'Edit'), () => {
                        onEditPress(comment);
                    }, false, require('assets/ic-edit-24.png'));
                }

                builder.action(t('copy', 'Copy'), () => {
                    Clipboard.setString(comment.message!!);
                    Toast.showCopied();
                }, false, require('assets/ic-copy-24.png'));
            }
            const canDelete = comment.sender.id === engine.user.id || role === RoomMemberRole.ADMIN || role === RoomMemberRole.OWNER || SUPER_ADMIN;

            if (canDelete) {
                builder.action(t('delete', 'Delete'), async () => {
                    try {
                        Alert.builder()
                            .title(t('commentDelete', 'Delete comment'))
                            .message(t('commentDeleteDescription', 'Delete this comment for everyone? This cannot be undone.'))
                            .button(t('cancel', 'Cancel'), 'cancel')
                            .action(t('delete', 'Delete'), 'destructive', async () => {
                                await engine.client.mutateDeleteComment({ id: comment.id! });
                            }).show();
                    } catch (e) {
                        Alert.alert(e.message);
                    }
                }, false, require('assets/ic-delete-24.png'));
            }

            builder.show(true);
        }
    }, []);

    if (comments.length === 0) {
        return <View />;
    }

    const commentsMap = {};

    comments.forEach(comment => {
        commentsMap[comment.id] = comment;
    });

    const commentsSorted = sortComments(comments, commentsMap);

    return (
        <>
            <View style={{ height: 48, justifyContent: 'center', paddingHorizontal: 16 }}>
                <Text style={{ ...TextStyles.Title2, color: theme.foregroundPrimary }} allowFontScaling={false}>
                    {t('comments', 'Comments')}{'  '}
                    <Text style={{ ...TextStyles.Label1, color: theme.foregroundTertiary }} allowFontScaling={false}>
                        {comments.length}
                    </Text>
                </Text>
            </View>

            {commentsSorted.map(commentEntry => {
                const isHighlighted = (typeof highlightedId === 'string' && highlightedId === commentEntry.comment.id);

                return (
                    <CommentView
                        key={`comment-${commentEntry.comment.id}`}
                        entryId={commentEntry.id}
                        scrollRef={scrollRef}
                        comment={commentEntry.comment}
                        deleted={commentEntry.deleted}
                        depth={getDepthOfComment(commentEntry, commentsMap)}
                        onReplyPress={onReplyPress}
                        onLongPress={handleLongPress}
                        highlighted={isHighlighted}
                        theme={theme}
                    />
                );
            })}
        </>
    );
};