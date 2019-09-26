import * as React from 'react';
import { View, StyleSheet, ViewStyle, Text, TextStyle, TouchableOpacity } from 'react-native';
import { MessageReactionType } from 'openland-api/Types';
import { plural } from 'openland-y-utils/plural';
import { ZIconButton } from 'openland-mobile/components/ZIconButton';
import { ThemeContext } from 'openland-mobile/themes/ThemeContext';
import { TextStyles, HighlightAlpha } from 'openland-mobile/styles/AppStyles';
import { FeedHandlers } from '../FeedHandlers';
import { DataSourceFeedPostItem } from 'openland-engines/feed/types';
import { showReactionsList } from 'openland-mobile/components/message/showReactionsList';
import { NON_PRODUCTION } from 'openland-mobile/pages/Init';

const styles = StyleSheet.create({
    box: {
        height: 56,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 4
    } as ViewStyle,
    counterWrapper: {
        flexGrow: 1,
        paddingHorizontal: 4,
        alignItems: 'flex-start'
    } as ViewStyle,
    counter: {
        ...TextStyles.Label1
    } as TextStyle,
});

interface FeedPostToolsProps {
    item: DataSourceFeedPostItem;
}

export const FeedPostTools = React.memo((props: FeedPostToolsProps) => {
    const theme = React.useContext(ThemeContext);
    const { item } = props;
    const { id, reactionsReduced, reactions, canEdit } = item;

    const likes = reactionsReduced.filter(r => r.reaction === MessageReactionType.LIKE);
    const likesCount = likes.length ? likes[0].count : 0;
    const myLike = likes.length ? likes[0].my : false;

    const handleLikeCountPress = React.useCallback(() => {
        if (likesCount > 0) {
            showReactionsList(reactions);
        } else {
            FeedHandlers.Like(item);
        }
    }, [item, likesCount, reactions]);

    return (
        <View style={styles.box}>
            <ZIconButton src={myLike ? require('assets/ic-like-filled-24.png') : require('assets/ic-like-24.png')} style={myLike ? 'danger' : 'default'} onPress={() => FeedHandlers.Like(item)} />
            <View style={styles.counterWrapper}>
                <TouchableOpacity onPress={handleLikeCountPress} activeOpacity={HighlightAlpha}>
                    <View>
                        <Text style={[styles.counter, { color: myLike ? theme.accentNegative : theme.foregroundSecondary }]} allowFontScaling={false}>
                            {likesCount > 0 ? plural(likesCount, ['like', 'likes']) : 'Like'}
                        </Text>
                    </View>
                </TouchableOpacity>
            </View>
            {NON_PRODUCTION && <ZIconButton src={require('assets/ic-forward-24.png')} onPress={() => FeedHandlers.Share(id)} />}
            <ZIconButton src={require('assets/ic-more-24.png')} onPress={() => FeedHandlers.Manage(id, canEdit)} />
        </View>
    );
});