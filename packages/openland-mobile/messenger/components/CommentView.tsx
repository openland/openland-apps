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
    onReplyPress: (comment: MessageComments_messageComments_comments_comment) => void;
    onLongPress: (comment: MessageComments_messageComments_comments_comment) => void;
}

export const CommentView = React.memo<CommentViewProps>((props) => {
    const { comment, depth } = props;
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

    const marginLeft = (depth > 0) ? ((15 * depth) + 57) : 0;

    let likesCount = reactions.length;
    let myLike = false;

    reactions.map(r => {
        if (r.user.id === getMessenger().engine.user.id) {
            myLike = true;
        }
    });

    let avatar = (
        <View marginRight={depth === 0 ? 10 : 6}>
            <TouchableWithoutFeedback onPress={() => router.push('ProfileUser', { id: sender.id })}>
                <ZAvatar
                    size={depth === 0 ? 32 : 16}
                    src={sender.photo}
                    placeholderKey={sender.id}
                    placeholderTitle={sender.name}
                />
            </TouchableWithoutFeedback>
        </View>
    );

    let tools = (
        <View flexDirection="row" marginTop={4}>
            <Text style={styles.date}>{formatDate(parseInt(date, 10))}</Text>
            <View marginLeft={12}>
                {depth === 0 && (
                    <TouchableWithoutFeedback onPress={() => props.onReplyPress(comment)}>
                        <View flexDirection="row">
                            <Image source={require('assets/ic-reply-16.png')} style={{ tintColor: '#0084fe', width: 16, height: 16 }} />
                            <Text style={styles.reply}>Reply</Text>
                        </View>
                    </TouchableWithoutFeedback>
                )}

                {depth !== 0 && (
                    <TouchableWithoutFeedback onPress={() => props.onReplyPress(comment)}>
                        <Image source={require('assets/ic-reply-16.png')} style={{ tintColor: '#0084fe', width: 16, height: 16 }} />
                    </TouchableWithoutFeedback>
                )}
            </View>
        </View>
    );

    let likes = (
        <TouchableWithoutFeedback onPress={handleReactionPress}>
            <View width={44} marginRight={-16} alignItems="center" justifyContent="center">
                <Image source={require('assets/ic-likes-full-24.png')} style={{ tintColor: myLike ? '#f6564e' : 'rgba(129, 137, 149, 0.3)', width: 18, height: 18 }} />
                {likesCount > 0 && <Text style={{ fontSize: 12, fontWeight: TextStyles.weight.medium, color: myLike ? '#000000' : 'rgba(0, 0, 0, 0.6)' } as TextStyle}>{likesCount}</Text>}
            </View>
        </TouchableWithoutFeedback>
    );

    if (depth === 0) {
        return (
            <TouchableWithoutFeedback onLongPress={() => props.onLongPress(comment)}>
                <View marginLeft={marginLeft} flexDirection="row" marginBottom={16}>
                    {avatar}

                    <View flexGrow={1} flexShrink={1}>
                        <Text style={[styles.senderName, { marginBottom: 1 }]} onPress={() => router.push('ProfileUser', { id: sender.id })}>{sender.name}</Text>
                        <ZMessageView message={comment} size="small" />

                        {tools}
                    </View>

                    {likes}
                </View>
            </TouchableWithoutFeedback>
        );
    }

    return (
        <TouchableWithoutFeedback onLongPress={() => props.onLongPress(comment)}>
            <View marginLeft={marginLeft} flexDirection="row" marginBottom={16}>
                <View flexGrow={1} flexShrink={1}>
                    <TouchableWithoutFeedback onPress={() => router.push('ProfileUser', { id: sender.id })}>
                        <View flexDirection="row" marginBottom={3}>
                            {avatar}

                            <Text style={styles.senderName}>{sender.name}</Text>
                        </View>
                    </TouchableWithoutFeedback>

                    <ZMessageView message={comment} size="small" />

                    {tools}
                </View>

                {likes}
            </View>
        </TouchableWithoutFeedback>
    );
});