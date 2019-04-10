import * as React from 'react';
import { MessageComments_messageComments_comments_comment } from 'openland-api/Types';
import { View, Text, TextStyle, StyleSheet, Image, TouchableWithoutFeedback } from 'react-native';
import { MessageView } from './MessageView';
import { ZAvatar } from 'openland-mobile/components/ZAvatar';
import { TextStyles } from 'openland-mobile/styles/AppStyles';
import { formatDate } from 'openland-mobile/utils/formatDate';
import { getMessenger } from 'openland-mobile/utils/messenger';
import { startLoader, stopLoader } from 'openland-mobile/components/ZGlobalLoader';
import { Alert } from 'openland-mobile/components/AlertBlanket';
import { reactionMap } from './AsyncMessageReactionsView';
import { getClient } from 'openland-mobile/utils/apolloClient';

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
}

export const CommentView = React.memo<CommentViewProps>((props) => {
    const { comment, depth } = props;
    const { sender, date, reactions } = comment;

    let engine = getMessenger().engine;
    let client = getClient();

    const handleReactionPress = React.useCallback(() => {
        let r = 'LIKE';

        // startLoader();
        // try {
        //     let remove = comment.reactions && comment.reactions.filter(userReaction => userReaction.user.id === engine.user.id && userReaction.reaction === r).length > 0;
        //     if (remove) {
        //         client.mutateMessageUnsetReaction({ messageId: comment.id, reaction: reactionMap[r] });
        //     } else {
        //         client.mutateMessageSetReaction({ messageId: comment.id, reaction: reactionMap[r] });
        //     }
        // } catch (e) {
        //     Alert.alert(e.message);
        // }
        // stopLoader();
    }, [ comment ])

    const marginLeft = (depth > 0) ? ((15 * depth) + 57) : 0;

    let likesCount = comment.reactions.length;
    let myLike = false;

    comment.reactions.map(r => {
        if (r.user.id === getMessenger().engine.user.id) {
            myLike = true;
        }
    });

    let avatar = (
        <View marginRight={depth === 0 ? 10 : 6}>
            <ZAvatar
                size={depth === 0 ? 32 : 16}
                src={sender.photo}
                placeholderKey={sender.id}
                placeholderTitle={sender.name}
            />
        </View>
    );

    let tools = (
        <View flexDirection="row" marginTop={4}>
            <Text style={styles.date}>{formatDate(parseInt(comment.date, 10))}</Text>
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
                {likesCount > 0 && <Text style={{ fontSize: 12, fontWeight: TextStyles.weight.medium, color: myLike ? '#000000' : 'rgba(0, 0, 0, 0.6)' } as TextStyle}>{comment.reactions.length}</Text>}
            </View>
        </TouchableWithoutFeedback>
    );

    if (depth === 0) {
        return (
            <View marginLeft={marginLeft} flexDirection="row" marginBottom={16}>
                {avatar}

                <View flexGrow={1} flexShrink={1}>
                    <Text style={[styles.senderName, { marginBottom: 1 }]}>{sender.name}</Text>
                    <MessageView message={comment} />

                    {tools}
                </View>

                {likes}
            </View>
        );
    }

    return (
        <View marginLeft={marginLeft} flexDirection="row" marginBottom={16}>
            <View flexGrow={1} flexShrink={1}>
                <View flexDirection="row" marginBottom={3}>
                    {avatar}

                    <Text style={styles.senderName}>{sender.name}</Text>
                </View>
                <MessageView message={comment} />

                {tools}
            </View>

            {likes}
        </View>
    );
});