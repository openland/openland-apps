import * as React from 'react';
import { CommentEntryFragment_comment, MessageReactionType } from 'openland-api/Types';
import { View, Text, TextStyle, StyleSheet, Image, TouchableWithoutFeedback, Dimensions, LayoutChangeEvent } from 'react-native';
import { ZAvatar } from 'openland-mobile/components/ZAvatar';
import { FontStyles } from 'openland-mobile/styles/AppStyles';
import { getMessenger } from 'openland-mobile/utils/messenger';
import { startLoader, stopLoader } from 'openland-mobile/components/ZGlobalLoader';
import Alert from 'openland-mobile/components/AlertBlanket';
import { getClient } from 'openland-mobile/utils/graphqlClient';
import { ZMessageView } from 'openland-mobile/components/message/ZMessageView';
import { ZRelativeDate } from 'openland-mobile/components/ZRelativeDate';
import { showReactionsList } from 'openland-mobile/components/message/showReactionsList';
import { ThemeGlobal } from 'openland-y-utils/themes/ThemeGlobal';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';

const styles = StyleSheet.create({
    senderName: {
        fontSize: 13,
        fontWeight: FontStyles.Weight.Medium,
        lineHeight: 15
    } as TextStyle,
    editedLabel: {
        fontSize: 13,
        lineHeight: 15,
        paddingLeft: 3,
    } as TextStyle,
    date: {
        fontSize: 13,
        fontWeight: FontStyles.Weight.Medium,
        lineHeight: 15,
    } as TextStyle,
    reply: {
        fontSize: 13,
        fontWeight: FontStyles.Weight.Medium,
        lineHeight: 15,
        marginLeft: 6,
    } as TextStyle
});

export interface CommentViewProps {
    comment: CommentEntryFragment_comment;
    depth: number;
    deleted: boolean;
    highlighted: boolean;
    theme: ThemeGlobal;

    onReplyPress: (comment: CommentEntryFragment_comment) => void;
    onLongPress: (comment: CommentEntryFragment_comment) => void;
    onLayout?: (e: LayoutChangeEvent) => void;
}

export const CommentView = React.memo<CommentViewProps>((props) => {
    const { comment, deleted, depth, highlighted, theme, onLayout } = props;
    const { sender, date, reactions } = comment;

    let messenger = getMessenger();
    let engine = messenger.engine;
    let client = getClient();
    let router = messenger.history.navigationManager;
    let lastTap: number = 0;

    const handleReactionPress = React.useCallback(async () => {
        let r = MessageReactionType.LIKE;

        startLoader();
        try {
            let remove = reactions && reactions.filter(userReaction => userReaction.user.id === engine.user.id && userReaction.reaction === r).length > 0;
            if (remove) {
                await client.mutateCommentUnsetReaction({ commentId: comment.id, reaction: r });
            } else {
                await client.mutateCommentSetReaction({ commentId: comment.id, reaction: r });
            }
        } catch (e) {
            Alert.alert(e.message);
        } finally {
            stopLoader();
        }
    }, [comment, reactions]);

    const handleReactionLongPress = React.useCallback(() => {
        showReactionsList(reactions);
    }, [comment, reactions]);

    const handleDoublePress = React.useCallback(() => {
        const now = Date.now();
        const DOUBLE_PRESS_DELAY = 300;

        if (now - lastTap < DOUBLE_PRESS_DELAY) {
            ReactNativeHapticFeedback.trigger('impactLight', { ignoreAndroidSystemSettings: false });

            client.mutateCommentSetReaction({ commentId: comment.id, reaction: MessageReactionType.LIKE });
        } else {
            lastTap = now;
        }
    }, [comment, lastTap]);

    const branchIndent = (depth > 0) ? ((15 * depth) + 16) : 16;
    const likesCount = reactions.length;
    const myLike = reactions.filter(r => r.user.id === messenger.engine.user.id).length > 0;

    let avatar = (
        <View marginRight={6}>
            {deleted && (
                <View width={16} height={16} borderRadius={8} backgroundColor={theme.foregroundPrimary} opacity={0.4} />
            )}
            {!deleted && (
                <ZAvatar
                    size="xx-small"
                    src={sender.photo}
                    placeholderKey={sender.id}
                    placeholderTitle={sender.name}
                />
            )}
        </View>
    );

    let tools = (
        <View flexDirection="row" marginTop={4}>
            <ZRelativeDate style={[styles.date, { color: theme.foregroundSecondary }]} date={date} />

            {!deleted && (
                <View marginLeft={12}>
                    {depth === 0 && (
                        <TouchableWithoutFeedback onPress={() => props.onReplyPress(comment)}>
                            <View flexDirection="row">
                                <Image source={require('assets/ic-reply-16.png')} style={{ tintColor: theme.foregroundPrimary, width: 16, height: 16, opacity: 0.7 }} />
                                <Text style={[styles.reply, { color: theme.foregroundPrimary }]} allowFontScaling={false}>Reply</Text>
                            </View>
                        </TouchableWithoutFeedback>
                    )}

                    {depth !== 0 && (
                        <TouchableWithoutFeedback onPress={() => props.onReplyPress(comment)}>
                            <Image source={require('assets/ic-reply-16.png')} style={{ tintColor: theme.foregroundPrimary, width: 16, height: 16, opacity: 0.7 }} />
                        </TouchableWithoutFeedback>
                    )}
                </View>
            )}
        </View>
    );

    let likes = !deleted ? (
        <TouchableWithoutFeedback onPress={handleReactionPress} onLongPress={handleReactionLongPress}>
            <View width={34} alignItems="center" justifyContent="center" paddingRight={4}>
                <Image source={require('assets/ic-likes-full-24.png')} style={{ tintColor: myLike ? theme.accentNegative : theme.foregroundQuaternary, width: 18, height: 18 }} />
                {likesCount > 0 && <Text style={{ fontSize: 12, fontWeight: FontStyles.Weight.Medium, color: myLike ? theme.foregroundPrimary : theme.foregroundPrimary }} allowFontScaling={false}>{likesCount}</Text>}
            </View>
        </TouchableWithoutFeedback>
    ) : undefined;

    let lines: JSX.Element[] = [];

    for (var i = 1; i <= depth; i++) {
        lines.push(<View key={'comment-line-' + i} width={1} backgroundColor={theme.separatorColor} position="absolute" left={15 * i} top={0} bottom={-8} />);
    }

    return (
        <TouchableWithoutFeedback disabled={deleted} onPress={handleDoublePress} onLongPress={() => props.onLongPress(comment)}>
            <View onLayout={onLayout} style={{ backgroundColor: highlighted ? theme.backgroundTertiary : theme.backgroundPrimary, marginVertical: -8, marginBottom: 8, paddingLeft: branchIndent, paddingVertical: 8 }}>
                {lines}

                <View flexDirection="row">
                    <View flexGrow={1} flexShrink={1}>
                        <TouchableWithoutFeedback disabled={deleted} onPress={() => router.push('ProfileUser', { id: sender.id })}>
                            <View flexDirection="row" marginBottom={3}>
                                {avatar}

                                <Text style={[styles.senderName, { color: !deleted ? theme.foregroundPrimary : theme.foregroundSecondary }]} allowFontScaling={false}>{sender.name}</Text>

                                {comment.edited && <Text style={[styles.editedLabel, { color: theme.foregroundSecondary }]} allowFontScaling={false}>• Edited</Text>}
                            </View>
                        </TouchableWithoutFeedback>

                        <View style={{ opacity: deleted ? 0.5 : undefined }}>
                            <ZMessageView message={comment} small={true} maxWidth={Dimensions.get('screen').width - branchIndent - 34} />
                        </View>

                        {tools}
                    </View>

                    {likes}
                </View>
            </View>
        </TouchableWithoutFeedback>
    );
});