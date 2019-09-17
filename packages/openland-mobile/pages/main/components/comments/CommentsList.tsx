import * as React from 'react';
import { View, Image, Text, Clipboard, LayoutChangeEvent } from 'react-native';
import { FontStyles, TextStyles } from 'openland-mobile/styles/AppStyles';
import { sortComments, getDepthOfComment } from 'openland-y-utils/sortComments';
import { CommentView } from 'openland-mobile/pages/main/components/comments/CommentView';
import { getMessenger } from 'openland-mobile/utils/messenger';
import { ActionSheetBuilder } from 'openland-mobile/components/ActionSheet';
import Alert from 'openland-mobile/components/AlertBlanket';
import { ThemeContext } from 'openland-mobile/themes/ThemeContext';
import { CommentEntryFragment, CommentEntryFragment_comment } from 'openland-api/Types';

interface CommentsListProps {
    comments: CommentEntryFragment[];
    highlightedId?: string;

    onReplyPress: (comment: CommentEntryFragment_comment) => void;
    onEditPress: (comment: CommentEntryFragment_comment) => void;
    handleScrollTo: (y: number) => void;
}

export const CommentsList = (props: CommentsListProps) => {
    const { comments, highlightedId, onReplyPress, onEditPress, handleScrollTo } = props;

    const theme = React.useContext(ThemeContext);

    const handleLongPress = React.useCallback((comment: CommentEntryFragment_comment) => {
        let engine = getMessenger().engine;
        let builder = new ActionSheetBuilder();

        if (comment.message) {
            if (comment.sender.id === engine.user.id) {
                builder.action('Edit', () => {
                    onEditPress(comment);
                }, false, require('assets/ic-edit-24.png'));
            }

            builder.action('Copy', () => {
                Clipboard.setString(comment.message!!);
            }, false, require('assets/ic-copy-24.png'));
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
            }, false, require('assets/ic-delete-24.png'));
        }

        builder.show();
    }, []);

    const handleLayout = (e: LayoutChangeEvent) => {
        handleScrollTo(e.nativeEvent.layout.y);
    };

    if (comments.length === 0) {
        return (
            <View flexGrow={1} flexShrink={1} alignItems="center" justifyContent="center" paddingVertical={40} paddingHorizontal={16}>
                <Image source={theme.type === 'Light' ? require('assets/img-empty.png') : require('assets/img-empty-dark.png')} style={{ width: 224, height: 224, marginBottom: 30 }} />
                <Text style={{ ...TextStyles.Body, color: theme.foregroundSecondary }} allowFontScaling={false}>Write the first comment</Text>
            </View>
        );
    }

    const commentsMap = {};

    comments.map(comment => {
        commentsMap[comment.id] = comment;
    });

    const commentsSorted = sortComments(comments, commentsMap);

    return (
        <View>
            <View height={48} justifyContent="center" paddingHorizontal={16}>
                <Text style={{ ...TextStyles.Title2, color: theme.foregroundPrimary }} allowFontScaling={false}>
                    Comments{'  '}
                    <Text style={{ ...TextStyles.Label1, color: theme.foregroundTertiary }} allowFontScaling={false}>
                        {comments.length}
                    </Text>
                </Text>
            </View>

            {commentsSorted.map((commentEntry, index) => {
                const isHighlighted = (typeof highlightedId === 'string' && highlightedId === commentEntry.comment.id) ? true : false;

                return (
                    <CommentView
                        key={'comment-' + index}
                        onLayout={isHighlighted ? handleLayout : undefined}
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
        </View>
    );
};