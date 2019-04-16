import * as React from 'react';
import { MessageComments_messageComments_comments_comment, MessageReactionType } from 'openland-api/Types';
import { View, Text, TextStyle, StyleSheet, Image, TouchableWithoutFeedback } from 'react-native';
import { ZAvatar } from 'openland-mobile/components/ZAvatar';
import { TextStyles } from 'openland-mobile/styles/AppStyles';
import { formatDate } from 'openland-mobile/utils/formatDate';
import { getMessenger } from 'openland-mobile/utils/messenger';
import { startLoader, stopLoader } from 'openland-mobile/components/ZGlobalLoader';
import { Alert } from 'openland-mobile/components/AlertBlanket';
import { getClient } from 'openland-mobile/utils/apolloClient';
import { ZMessageView } from 'openland-mobile/components/message/ZMessageView';

const styles = StyleSheet.create({
    senderName: {
        fontSize: 13,
        fontWeight: TextStyles.weight.medium,
        color: '#0084fe',
        lineHeight: 15
    } as TextStyle,
    senderNameDeleted: {
        fontSize: 13,
        fontWeight: TextStyles.weight.medium,
        color: 'rgba(0, 0, 0, 0.5)',
        lineHeight: 15
    } as TextStyle,
    date: {
        color: '#99a2b0',
        fontSize: 13,
        fontWeight: TextStyles.weight.medium,
        lineHeight: 15,
    } as TextStyle,
    reply: {
        color: '#0084fe',
        fontSize: 13,
        fontWeight: TextStyles.weight.medium,
        lineHeight: 15,
        marginLeft: 6,
    } as TextStyle
});

export interface CommentViewProps {
    comment: MessageComments_messageComments_comments_comment;
    depth: number;
    deleted: boolean;
    highlighted: boolean;

    onReplyPress: (comment: MessageComments_messageComments_comments_comment) => void;
    onLongPress: (comment: MessageComments_messageComments_comments_comment) => void;
}

export const CommentView = React.memo<CommentViewProps>((props) => {
    const { comment, deleted, depth, highlighted } = props;
    const { sender, date, reactions } = comment;

    let messenger = getMessenger();
    let engine = messenger.engine;
    let client = getClient();
    let router = messenger.history.navigationManager;

    const handleReactionPress = React.useCallback(() => {
        let r = MessageReactionType.LIKE;

        startLoader();
        try {
            let remove = reactions && reactions.filter(userReaction => userReaction.user.id === engine.user.id && userReaction.reaction === r).length > 0;        
            if (remove) {
                client.mutateCommentUnsetReaction({ commentId: comment.id, reaction: r });
            } else {
                client.mutateCommentSetReaction({ commentId: comment.id, reaction: r });
            }
        } catch (e) {
            Alert.alert(e.message);
        }
        stopLoader();
    }, [ comment, reactions ])

    const branchIndent = (depth > 0) ? ((15 * depth) + 16) : 16;

    let likesCount = reactions.length;
    let myLike = false;

    reactions.map(r => {
        if (r.user.id === getMessenger().engine.user.id) {
            myLike = true;
        }
    });

    let avatar = (
        <View marginRight={6}>
            {deleted && (
                <View width={16} height={16} borderRadius={8} backgroundColor="rgba(0, 0, 0, 0.05)" />
            )}
            {!deleted && (
                <TouchableWithoutFeedback onPress={() => router.push('ProfileUser', { id: sender.id })}>
                    <View>
                        <ZAvatar
                            size={16}
                            src={sender.photo}
                            placeholderKey={sender.id}
                            placeholderTitle={sender.name}
                        />
                    </View>
                </TouchableWithoutFeedback>
            )}
        </View>
    );

    let tools = (
        <View flexDirection="row" marginTop={4}>
            <Text style={styles.date}>{formatDate(parseInt(date, 10))}</Text>
            <View marginLeft={12}>
                {depth === 0 && (
                    <TouchableWithoutFeedback onPress={() => props.onReplyPress(comment)}>
                        <View flexDirection="row">
                            <Image source={require('assets/ic-reply-16.png')} style={{ tintColor: '#0084fe', width: 16, height: 16, opacity: 0.7 }} />
                            <Text style={styles.reply} allowFontScaling={false}>Reply</Text>
                        </View>
                    </TouchableWithoutFeedback>
                )}

                {depth !== 0 && (
                    <TouchableWithoutFeedback onPress={() => props.onReplyPress(comment)}>
                        <Image source={require('assets/ic-reply-16.png')} style={{ tintColor: '#0084fe', width: 16, height: 16, opacity: 0.7}} />
                    </TouchableWithoutFeedback>
                )}
            </View>
        </View>
    );

    let likes =  !deleted ? (
        <TouchableWithoutFeedback onPress={handleReactionPress}>
            <View width={46} alignItems="center" justifyContent="center" paddingLeft={8}>
                <Image source={require('assets/ic-likes-full-24.png')} style={{ tintColor: myLike ? '#f6564e' : 'rgba(129, 137, 149, 0.3)', width: 18, height: 18 }} />
                {likesCount > 0 && <Text style={{ fontSize: 12, fontWeight: TextStyles.weight.medium, color: myLike ? '#000000' : 'rgba(0, 0, 0, 0.6)' } as TextStyle} allowFontScaling={false}>{likesCount}</Text>}
            </View>
        </TouchableWithoutFeedback>
    ) : undefined;

    return (
        <View style={ highlighted ? { backgroundColor: 'rgba(255, 255, 102, 0.15)', marginVertical: -8, marginBottom: 8, paddingLeft: branchIndent, paddingVertical: 8 } : { marginBottom: 16, paddingLeft: branchIndent }}>
            <TouchableWithoutFeedback onLongPress={!deleted ? () => props.onLongPress(comment) : undefined}>
                <View flexDirection="row">
                    <View flexGrow={1} flexShrink={1}>
                        <TouchableWithoutFeedback onPress={!deleted ? () => router.push('ProfileUser', { id: sender.id }) : undefined}>
                            <View flexDirection="row" marginBottom={3}>
                                {avatar}

                                <Text style={!deleted ? styles.senderName : styles.senderNameDeleted} allowFontScaling={false}>{sender.name}</Text>
                            </View>
                        </TouchableWithoutFeedback>

                        <View style={{ opacity: deleted ? 0.5 : undefined }}>
                            <ZMessageView message={comment} small={true} />
                        </View>

                        {tools}
                    </View>

                    {likes}
                </View>
            </TouchableWithoutFeedback>
        </View>
    );
});