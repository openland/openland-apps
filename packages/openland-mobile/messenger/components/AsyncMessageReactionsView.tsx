import * as React from 'react';
import { ASFlex } from 'react-native-async-view/ASFlex';
import { ASText } from 'react-native-async-view/ASText';
import { DataSourceMessageItem } from 'openland-engines/messenger/ConversationEngine';
import { FontStyles } from 'openland-mobile/styles/AppStyles';
import { ASImage } from 'react-native-async-view/ASImage';
import { MessageReactionType } from 'openland-api/spacex.types';
import { ThemeGlobal } from 'openland-y-utils/themes/ThemeGlobal';
import { rm } from 'react-native-async-view/internals/baseStyleProcessor';
import { useText } from 'openland-mobile/text/useText';

export const reactionsImagesMap: { [key in MessageReactionType]: NodeRequire } = {
    'LIKE': require('assets/reactions/ic-reaction-like-36.png'),
    'THUMB_UP': require('assets/reactions/ic-reaction-thumbsup-36.png'),
    'JOY': require('assets/reactions/ic-reaction-lol-36.png'),
    'SCREAM': require('assets/reactions/ic-reaction-wow-36.png'),
    'CRYING': require('assets/reactions/ic-reaction-sad-36.png'),
    'ANGRY': require('assets/reactions/ic-reaction-angry-36.png'),
    'DONATE': require('assets/reactions/ic-reaction-donate-36.png'),
};

interface AsyncMessageReactionsViewProps {
    theme: ThemeGlobal;
    message: DataSourceMessageItem;
    isChannel?: boolean;

    onLikePress: (message: DataSourceMessageItem) => void;
    onCommentsPress: () => void;
    onReactionsPress: () => void;
}

export const AsyncMessageReactionsView = React.memo<AsyncMessageReactionsViewProps>((props) => {
    const { t } = useText();
    const { theme, message, isChannel, onLikePress, onCommentsPress, onReactionsPress } = props;
    const {
        reactionCounters,
        commentsCount,
        isOut
    } = message;

    const count = reactionCounters.reduce((sum, r) => sum + r.count, 0);
    const likedByMe = !!reactionCounters.find((r) => r.setByMe);
    const otherLikes = !!reactionCounters.find((r) => (r.setByMe && r.count !== 1) || (!r.setByMe));

    return (
        <ASFlex alignItems="stretch" flexDirection="row" maxHeight={33} renderModes={rm({ 'banned': { opacity: 0, width: 0, height: 0 } })}>
            <ASFlex
                renderModes={isOut ? undefined : rm({ 'selection': { marginLeft: 60 + 30 } })}
                flexGrow={1}
                justifyContent={isOut ? 'flex-end' : 'flex-start'}
                flexDirection="row"
                marginRight={isOut ? 16 : 0}
                marginLeft={isOut ? 0 : 60}
                marginTop={0}
                alignItems="center"
            >
                {reactionCounters.length > 0 && (
                    <ASFlex onPress={onReactionsPress}>
                        <ASFlex marginLeft={4} marginRight={8} height={28} marginTop={4} alignItems="center" justifyContent="center">
                            {reactionCounters.map((i) => (
                                <ASImage key={'k' + i.reaction} marginLeft={4} source={reactionsImagesMap[i.reaction]} width={20} height={20} />
                            ))}

                            {!!count && (
                                <ASText key={'users'} fontWeight={FontStyles.Weight.Medium} marginLeft={4} fontSize={13} color={theme.foregroundTertiary}>
                                    {likedByMe && !otherLikes ? t('you', 'You') : likedByMe && otherLikes ? t('you', 'You') + ` + ${count - 1}` : count}
                                </ASText>
                            )}
                        </ASFlex>
                    </ASFlex>
                )}

                {isChannel && reactionCounters.length === 0 && (
                    <ASFlex onPress={() => onLikePress(message)} height={28} marginLeft={8} marginTop={4} marginRight={8} alignItems="center" justifyContent="center">
                        <ASImage source={require('assets/ic-like-24.png')} width={20} height={20} tintColor={theme.foregroundSecondary} />
                    </ASFlex>
                )}

                {(isChannel || commentsCount > 0) && (
                    <ASFlex onPress={onCommentsPress}>
                        <ASFlex marginLeft={8} marginRight={8} height={28} marginTop={4} alignItems="center" justifyContent="center">
                            {commentsCount <= 0 && <ASImage source={require('assets/ic-message-24.png')} tintColor={theme.foregroundSecondary} width={20} height={20} />}
                            {commentsCount > 0 && <ASImage source={require('assets/ic-message-filled-24.png')} tintColor={theme.accentPrimary} width={20} height={20} />}
                            {commentsCount > 0 && <ASText fontSize={13} fontWeight={FontStyles.Weight.Medium} marginLeft={4} color={theme.foregroundTertiary}>{commentsCount}</ASText>}
                        </ASFlex>
                    </ASFlex>
                )}
            </ASFlex>
        </ ASFlex>
    );
});