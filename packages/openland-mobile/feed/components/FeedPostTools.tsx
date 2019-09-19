import * as React from 'react';
import { View, StyleSheet, ViewStyle, Text, TextStyle } from 'react-native';
import { MessageReactionType } from 'openland-api/Types';
import { plural } from 'openland-y-utils/plural';
import { ZIconButton } from 'openland-mobile/components/ZIconButton';
import { ThemeContext } from 'openland-mobile/themes/ThemeContext';
import { TextStyles } from 'openland-mobile/styles/AppStyles';
import { FeedHandlers } from '../FeedHandlers';
import { DataSourceFeedPostItem } from 'openland-engines/feed/types';
import { showReactionsList } from 'openland-mobile/components/message/showReactionsList';

const styles = StyleSheet.create({
    box: {
        height: 56,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 4
    } as ViewStyle,
    counterWrapper: {
        flexGrow: 1,
        paddingHorizontal: 4
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

    return (
        <View style={styles.box}>
            <ZIconButton src={myLike ? require('assets/ic-like-filled-24.png') : require('assets/ic-like-24.png')} style={myLike ? 'danger' : 'default'} onPress={() => FeedHandlers.Like(item)} />
            <View style={styles.counterWrapper}>
                {likesCount > 0 && (
                    <Text style={[styles.counter, { color: myLike ? theme.accentNegative : theme.foregroundSecondary }]} allowFontScaling={false} onPress={() => showReactionsList(reactions)}>
                        {plural(likesCount, ['like', 'likes'])}
                    </Text>
                )}
            </View>
            <ZIconButton src={require('assets/ic-forward-24.png')} onPress={() => FeedHandlers.Share(id)} />
            <ZIconButton src={require('assets/ic-more-24.png')} onPress={() => FeedHandlers.Manage(id, canEdit)} />
        </View>
    );
});