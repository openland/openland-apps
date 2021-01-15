import * as React from 'react';
import { FontStyles } from 'openland-mobile/styles/AppStyles';
import { MessageReactionCounter } from 'openland-api/spacex.types';
import { View, Image, Text, TouchableWithoutFeedback } from 'react-native';
import { reactionsImagesMap } from 'openland-mobile/messenger/components/AsyncMessageReactionsView';
import { showReactionsList } from '../showReactionsList';
import { ThemeContext } from 'openland-mobile/themes/ThemeContext';

interface ReactionsViewProps {
    reactionCounters: MessageReactionCounter[];
    mId: string;
}

export const ReactionsView = React.memo<ReactionsViewProps>((props) => {
    const theme = React.useContext(ThemeContext);
    const { reactionCounters, mId } = props;

    if (reactionCounters.length === 0) {
        return null;
    }

    const count = reactionCounters.reduce((sum, r) => sum + r.count, 0);
    const likedByMe = !!reactionCounters.find((r) => r.setByMe);
    const otherLikes = !!reactionCounters.find((r) => (r.setByMe && r.count !== 1) || (!r.setByMe));

    return (
        <View style={{ marginBottom: -10 }}>
            <TouchableWithoutFeedback onPress={() => showReactionsList(mId)}>
                <View
                    style={{
                        alignItems: 'stretch',
                        justifyContent: 'flex-start',
                        flexDirection: 'row',
                        paddingVertical: 10
                    }}
                >
                    {reactionCounters.map((i) => (
                        <Image
                            key={'k' + i.reaction}
                            source={reactionsImagesMap[i.reaction]}
                            style={{ width: 20, height: 20, marginRight: 3 }}
                        />
                    ))}
                    {!!count && (
                        <Text
                            style={{
                                fontWeight: FontStyles.Weight.Medium,
                                marginLeft: 2,
                                marginRight: 7,
                                marginTop: 2,
                                fontSize: 13,
                                color: theme.foregroundTertiary,
                            }}
                            numberOfLines={1}
                            allowFontScaling={false}
                        >
                            {likedByMe && !otherLikes ? 'You' : likedByMe && otherLikes ? `You + ${count - 1}` : count}
                        </Text>
                    )}
                </View>
            </TouchableWithoutFeedback>
        </View>
    );
});
