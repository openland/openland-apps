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

    const likedByMe = !!reactionCounters.find(r => r.setByMe);
    let reactionsCount: number = 0;
    reactionCounters.forEach((r) => (reactionsCount += r.count));

    return (
        <View marginBottom={-10}>
            <TouchableWithoutFeedback onPress={() => showReactionsList(mId)}>
                <View
                    alignItems="stretch"
                    justifyContent="flex-start"
                    flexDirection="row"
                    paddingVertical={10}
                >
                    {reactionCounters.map((i) => (
                        <Image
                            key={'k' + i.reaction}
                            marginRight={3}
                            source={reactionsImagesMap[i.reaction]}
                            style={{ width: 20, height: 20 }}
                        />
                    ))}
                    {!!reactionsCount && (
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
                            {likedByMe && reactionsCount === 1 ? 'You' : likedByMe ? `You + ${reactionsCount - 1}` : reactionsCount}
                        </Text>
                    )}
                </View>
            </TouchableWithoutFeedback>
        </View>
    );
});
