import * as React from 'react';
import { View, StyleSheet, ViewStyle, Text, TextStyle } from 'react-native';
import { ReactionReduced } from 'openland-engines/reactions/types';
import { MessageReactionType } from 'openland-api/Types';
import { plural } from 'openland-y-utils/plural';
import { ZIconButton } from 'openland-mobile/components/ZIconButton';
import { ThemeContext } from 'openland-mobile/themes/ThemeContext';
import { TextStyles } from 'openland-mobile/styles/AppStyles';
import { FeedHandlers } from '../FeedHandlers';

const styles = StyleSheet.create({
    box: {
        height: 56,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 6
    } as ViewStyle,
    counterWrapper: {
        flexGrow: 1,
        paddingHorizontal: 6
    } as ViewStyle,
    counter: {
        ...TextStyles.Label1
    } as TextStyle,
});

interface FeedPostToolsProps {
    id: string;
    reactions: ReactionReduced[];
    canEdit: boolean;
}

export const FeedPostTools = React.memo((props: FeedPostToolsProps) => {
    const theme = React.useContext(ThemeContext);
    const { id, reactions, canEdit } = props;

    const likes = reactions.filter(r => r.reaction === MessageReactionType.LIKE);
    const likesCount = likes.length ? likes[0].count : 0;

    return (
        <View style={styles.box}>
            <ZIconButton src={require('assets/ic-like-24.png')} onPress={() => FeedHandlers.Like(id)} />
            <View style={styles.counterWrapper}>
                {likesCount > 0 && (
                    <Text style={[styles.counter, { color: theme.foregroundSecondary }]} allowFontScaling={false}>
                        {plural(likesCount, ['like', 'likes'])}
                    </Text>
                )}
            </View>
            <ZIconButton src={require('assets/ic-forward-24.png')} onPress={() => FeedHandlers.Share(id)} />
            <ZIconButton src={require('assets/ic-more-24.png')} onPress={() => FeedHandlers.Manage(id, canEdit)} />
        </View>
    );
});