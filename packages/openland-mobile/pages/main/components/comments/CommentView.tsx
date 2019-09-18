import * as React from 'react';
import { CommentEntryFragment_comment, MessageReactionType } from 'openland-api/Types';
import { View, Text, TextStyle, StyleSheet, Image, TouchableWithoutFeedback, Dimensions, LayoutChangeEvent, TouchableOpacity } from 'react-native';
import { ZAvatar } from 'openland-mobile/components/ZAvatar';
import { TextStyles } from 'openland-mobile/styles/AppStyles';
import { getMessenger } from 'openland-mobile/utils/messenger';
import { startLoader, stopLoader } from 'openland-mobile/components/ZGlobalLoader';
import Alert from 'openland-mobile/components/AlertBlanket';
import { getClient } from 'openland-mobile/utils/graphqlClient';
import { ZMessageView } from 'openland-mobile/components/message/ZMessageView';
import { ZRelativeDate } from 'openland-mobile/components/ZRelativeDate';
import { showReactionsList } from 'openland-mobile/components/message/showReactionsList';
import { ThemeGlobal } from 'openland-y-utils/themes/ThemeGlobal';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';
import { ZLabelButton } from 'openland-mobile/components/ZLabelButton';
import { plural } from 'openland-y-utils/plural';

const styles = StyleSheet.create({
    senderName: {
        ...TextStyles.Label2,
        paddingBottom: 2,
    } as TextStyle,
    editedLabel: {
        fontSize: 13,
        lineHeight: 15,
        paddingLeft: 3,
    } as TextStyle,
    date: {
        ...TextStyles.Subhead,
        paddingVertical: 2,
        paddingRight: 8
    } as TextStyle,
    likesCount: {
        ...TextStyles.Label2,
        paddingVertical: 2,
        paddingLeft: 8
    } as TextStyle,
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
    const { sender, date, reactions, edited } = comment;

    let messenger = getMessenger();
    let engine = messenger.engine;
    let client = getClient();
    let router = messenger.history.navigationManager;
    let lastTap: number = 0;

    const handleReactionPress = React.useCallback(async (useLoader: boolean) => {
        let r = MessageReactionType.LIKE;

        if (useLoader) {
            startLoader();
        }
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

    const handleReactionListPress = React.useCallback(() => {
        showReactionsList(reactions);
    }, [comment, reactions]);

    const handleDoublePress = React.useCallback(() => {
        const now = Date.now();
        const DOUBLE_PRESS_DELAY = 300;

        if (now - lastTap < DOUBLE_PRESS_DELAY) {
            ReactNativeHapticFeedback.trigger('impactLight', { ignoreAndroidSystemSettings: false });

            handleReactionPress(false);
        } else {
            lastTap = now;
        }
    }, [comment, lastTap]);

    const branchIndent = (depth > 0) ? (((16 + 24) * Math.min(depth, 2)) + 16) : 16;
    const likesCount = reactions.length;
    const myLike = reactions.filter(r => r.user.id === messenger.engine.user.id).length > 0;

    let avatar = (
        <View marginRight={16}>
            {deleted && (
                <View width={24} height={24} borderRadius={12} backgroundColor={theme.backgroundTertiary} alignItems="center" justifyContent="center">
                    <Image
                        source={require('assets/ic-delete-12.png')}
                        style={{ width: 12, height: 12, tintColor: theme.foregroundTertiary }}
                    />
                </View>
            )}
            {!deleted && (
                <TouchableOpacity activeOpacity={0.6} onPress={() => router.push('ProfileUser', { id: sender.id })}>
                    <View>
                        <ZAvatar
                            size="x-small"
                            src={sender.photo}
                            placeholderKey={sender.id}
                            placeholderTitle={sender.name}
                        />
                    </View>
                </TouchableOpacity>

            )}
        </View>
    );

    let tools = (
        <View flexDirection="row" alignItems="center">
            {!deleted && edited && (
                <Image
                    source={require('assets/ic-edited-16.png')}
                    style={{ width: 16, height: 16, tintColor: theme.foregroundTertiary, marginRight: 2, marginTop: 0.5 }}
                />
            )}

            <ZRelativeDate style={[styles.date, { color: theme.foregroundSecondary }]} date={date} />

            {!deleted && (
                <>
                    <ZLabelButton label="Reply" onPress={() => props.onReplyPress(comment)} />
                    <ZLabelButton label={myLike ? 'Liked' : 'Like'} style={myLike ? 'danger' : 'default'} onPress={() => handleReactionPress(true)} />

                    {likesCount > 0 && <ZLabelButton label={plural(likesCount, ['like', 'likes'])} onPress={handleReactionListPress} />}
                </>
            )}
        </View>
    );

    return (
        <TouchableWithoutFeedback disabled={deleted} onPress={handleDoublePress} onLongPress={() => props.onLongPress(comment)}>
            <View onLayout={onLayout} style={{ backgroundColor: highlighted ? theme.backgroundTertiary : undefined, paddingLeft: branchIndent, paddingTop: 8, paddingBottom: 6, paddingRight: 16 }}>
                <View flexDirection="row">
                    {avatar}

                    <View flexGrow={1} flexShrink={1}>
                        <TouchableOpacity activeOpacity={0.6} disabled={deleted} onPress={() => router.push('ProfileUser', { id: sender.id })}>
                            <Text style={[styles.senderName, { color: theme.foregroundPrimary }]} allowFontScaling={false}>
                                {sender.name}
                            </Text>
                        </TouchableOpacity>

                        <View style={{ opacity: deleted ? 0.5 : undefined }}>
                            <ZMessageView message={comment} wrapped={true} maxWidth={Dimensions.get('screen').width - branchIndent - 40 - 16} />
                        </View>

                        {tools}
                    </View>
                </View>
            </View>
        </TouchableWithoutFeedback>
    );
});