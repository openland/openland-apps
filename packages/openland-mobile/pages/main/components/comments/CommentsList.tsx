import * as React from 'react';
import { MessageComments_messageComments_comments, MessageComments_messageComments_comments_comment } from 'openland-api/Types';
import { View, Image, Text, Clipboard, LayoutChangeEvent } from 'react-native';
import { TextStyles } from 'openland-mobile/styles/AppStyles';
import { sortComments, getDepthOfComment } from 'openland-y-utils/sortComments';
import { CommentView } from 'openland-mobile/pages/main/components/comments/CommentView';
import { getMessenger } from 'openland-mobile/utils/messenger';
import { ActionSheetBuilder } from 'openland-mobile/components/ActionSheet';
import { Alert } from 'openland-mobile/components/AlertBlanket';
import { ThemeContext } from 'openland-mobile/themes/ThemeContext';

interface CommentsListProps {
    comments: MessageComments_messageComments_comments[];
    highlightedId?: string;

    onReplyPress: (comment: MessageComments_messageComments_comments_comment) => void;
    onEditPress: (comment: MessageComments_messageComments_comments_comment) => void;
    handleScrollTo: (y: number) => void;
}

export const CommentsList = (props: CommentsListProps) => {
    const { comments, highlightedId, onReplyPress, onEditPress, handleScrollTo } = props;

    const theme = React.useContext(ThemeContext);

    const handleLongPress = React.useCallback((comment: MessageComments_messageComments_comments_comment) => {
        let engine = getMessenger().engine;
        let builder = new ActionSheetBuilder();

        if (comment.message) {
            if (comment.sender.id === engine.user.id) {
                builder.action('Edit', () => {
                    onEditPress(comment);
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
    }, []);

    const handleLayout = (e: LayoutChangeEvent) => {
        handleScrollTo(e.nativeEvent.layout.y);
    };

    if (comments.length === 0) {
        return (
            <View flexGrow={1} flexShrink={1} alignItems="center" justifyContent="center" paddingVertical={40}>
                <Image source={theme.type === 'Light' ? require('assets/img-empty.png') : require('assets/img-empty-dark.png')} style={{ width: 224, height: 224, marginBottom: 30 }} />
                <Text style={{ fontSize: 15, color: theme.foregroundPrimary }} allowFontScaling={false}>Write the first comment</Text>
            </View>
        );
    }

    const commentsMap = {};

    comments.map(comment => {
        commentsMap[comment.id] = comment;
    });

    const commentsSorted = sortComments(comments, commentsMap);

    return (
        <>
            <View height={1} backgroundColor={theme.separatorColor} marginTop={15} />

            <View marginTop={20} marginBottom={15}>
                <Text style={{ fontSize: 16, color: theme.foregroundPrimary, fontWeight: TextStyles.weight.medium }} allowFontScaling={false}>COMMENTS <Text style={{ color: '#b9c1cd' }}>{comments.length}</Text></Text>
            </View>

            <View marginHorizontal={-16}>
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
                    )
                })}

                <View backgroundColor={theme.backgroundPrimary} height={8} zIndex={2} marginTop={-8} marginBottom={8} />
            </View>
        </>
    );
}