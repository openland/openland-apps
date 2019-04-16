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
import { AppTheme } from 'openland-mobile/themes/themes';

const styles = StyleSheet.create({
    senderName: {
        fontSize: 13,
        fontWeight: TextStyles.weight.medium,
        lineHeight: 15
    } as TextStyle,
    date: {
        color: '#99a2b0',
        fontSize: 13,
        fontWeight: TextStyles.weight.medium,
        lineHeight: 15,
    } as TextStyle,
    reply: {
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
    theme: AppTheme;

    onReplyPress: (comment: MessageComments_messageComments_comments_comment) => void;
    onLongPress: (comment: MessageComments_messageComments_comments_comment) => void;
}

export const CommentView = React.memo<CommentViewProps>((props) => {
    const { comment, deleted, depth, highlighted, theme } = props;
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
                <ZAvatar
                    size={16}
                    src={sender.photo}
                    placeholderKey={sender.id}
                    placeholderTitle={sender.name}
                />
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
                            <Image source={require('assets/ic-reply-16.png')} style={{ tintColor: theme.accentColor, width: 16, height: 16, opacity: 0.7 }} />
                            <Text style={[styles.reply, { color: theme.accentColor }]} allowFontScaling={false}>Reply</Text>
                        </View>
                    </TouchableWithoutFeedback>
                )}

                {depth !== 0 && (
                    <TouchableWithoutFeedback onPress={() => props.onReplyPress(comment)}>
                        <Image source={require('assets/ic-reply-16.png')} style={{ tintColor: theme.accentColor, width: 16, height: 16, opacity: 0.7}} />
                    </TouchableWithoutFeedback>
                )}
            </View>
        </View>
    );

    let likes = !deleted ? (
        <TouchableWithoutFeedback onPress={handleReactionPress}>
            <View width={46} alignItems="center" justifyContent="center" paddingLeft={8}>
                <Image source={require('assets/ic-likes-full-24.png')} style={{ tintColor: myLike ? '#f6564e' : 'rgba(129, 137, 149, 0.3)', width: 18, height: 18 }} />
                {likesCount > 0 && <Text style={{ fontSize: 12, fontWeight: TextStyles.weight.medium, color: myLike ? '#000000' : 'rgba(0, 0, 0, 0.6)' } as TextStyle} allowFontScaling={false}>{likesCount}</Text>}
            </View>
        </TouchableWithoutFeedback>
    ) : undefined;

    let lines: JSX.Element[] = [];

    for (var i = 1; i <= depth; i++) {
        lines.push(<View width={1} backgroundColor={theme.separatorColor} position="absolute" left={16 * i} top={0} bottom={-8} />);
    }

    return (
        <TouchableWithoutFeedback onLongPress={!deleted ? () => props.onLongPress(comment) : undefined}>
            <View style={{ backgroundColor: highlighted ? 'rgba(255, 255, 102, 0.15)' : theme.backgroundColor, marginVertical: -8, marginBottom: 8, paddingLeft: branchIndent, paddingVertical: 8 }}>
                {lines}

                <View flexDirection="row">
                    <View flexGrow={1} flexShrink={1}>
                        <TouchableWithoutFeedback onPress={!deleted ? () => router.push('ProfileUser', { id: sender.id }) : undefined}>
                            <View flexDirection="row" marginBottom={3}>
                                {avatar}

                                <Text style={[styles.senderName, { color: !deleted ? theme.accentColor : 'rgba(0, 0, 0, 0.5)' }]} allowFontScaling={false}>{sender.name}</Text>
                            </View>
                        </TouchableWithoutFeedback>

                        <View style={{ opacity: deleted ? 0.5 : undefined }}>
                            <ZMessageView message={comment} small={true} />
                        </View>

                        {tools}
                    </View>

                    {likes}
                </View>
            </View>
        </TouchableWithoutFeedback>
    );
});