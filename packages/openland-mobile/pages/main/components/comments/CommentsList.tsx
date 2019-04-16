import * as React from 'react';
import { MessageComments_messageComments_comments, MessageComments_messageComments_comments_comment } from 'openland-api/Types';
import { View, Image, Text, TextStyle, Clipboard } from 'react-native';
import { TextStyles } from 'openland-mobile/styles/AppStyles';
import { sortComments, getDepthOfComment } from 'openland-y-utils/sortComments';
import { CommentView } from 'openland-mobile/pages/main/components/comments/CommentView';
import { getMessenger } from 'openland-mobile/utils/messenger';
import { ActionSheetBuilder } from 'openland-mobile/components/ActionSheet';
import { Prompt } from 'openland-mobile/components/Prompt';
import { startLoader, stopLoader } from 'openland-mobile/components/ZGlobalLoader';
import { Alert } from 'openland-mobile/components/AlertBlanket';

interface CommentsListProps {
    comments: MessageComments_messageComments_comments[];
    highlightedId?: string;

    onReplyPress: (comment: MessageComments_messageComments_comments_comment) => void;
}

export const CommentsList = (props: CommentsListProps) => {
    const { comments, highlightedId, onReplyPress } = props;

    const handleLongPress = React.useCallback((comment: MessageComments_messageComments_comments_comment) => {
        let engine = getMessenger().engine;
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
    }, []);

    if (comments.length === 0) {
        return (
            <View flexGrow={1} flexShrink={1} alignItems="center" justifyContent="center" paddingVertical={40}>
                <Image source={require('assets/img-empty.png')} style={{ width: 224, height: 224, marginBottom: 30 }} />
                <Text style={{ fontSize: 15, color: 'rgba(0, 0, 0, 0.4)' }} allowFontScaling={false}>Write the first comment</Text>
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
            <View height={1} backgroundColor="#eff0f2" marginTop={20} />

            <View marginTop={20} marginBottom={20}>
                <Text style={{ fontSize: 16, color: '#99a2b0', fontWeight: TextStyles.weight.medium } as TextStyle} allowFontScaling={false}>COMMENTS <Text style={{ color: '#b9c1cd' }}>{comments.length}</Text></Text>
            </View>

            <View marginHorizontal={-16}>
                {commentsSorted.map(commentEntry => (
                    <CommentView
                        comment={commentEntry.comment}
                        deleted={commentEntry.deleted}
                        depth={getDepthOfComment(commentEntry, commentsMap)}
                        onReplyPress={onReplyPress}
                        onLongPress={handleLongPress}
                        highlighted={(typeof highlightedId === 'string' && highlightedId === commentEntry.id) ? true : false}
                    />
                ))}
            </View>
        </>
    );
}