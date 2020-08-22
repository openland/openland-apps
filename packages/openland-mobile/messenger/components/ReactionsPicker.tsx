import * as React from 'react';
import { Platform, View, TouchableOpacity, Image } from 'react-native';
import { MessageReactionType, MessageReactionCounter } from 'openland-api/spacex.types';
import { reactionsImagesMap } from './AsyncMessageReactionsView';

const SortedReactions = [
    MessageReactionType.LIKE,
    MessageReactionType.THUMB_UP,
    MessageReactionType.JOY,
    MessageReactionType.SCREAM,
    MessageReactionType.CRYING,
];

if (Platform.OS !== 'ios') {
    SortedReactions.push(MessageReactionType.DONATE);
} else {
    SortedReactions.push(MessageReactionType.ANGRY);
}

export const ReactionsPicker = React.memo((props: { reactionCounters: MessageReactionCounter[], onPress: (reaction: MessageReactionType) => void }) => {
    return (
        <View flexGrow={1} justifyContent="space-evenly" alignItems="center" flexDirection="row" height={52} paddingHorizontal={10}>
            {SortedReactions.map(reaction => {
                const remove = !!props.reactionCounters.find(r => r.reaction === reaction && r.setByMe);
                const isDisabled = reaction === MessageReactionType.DONATE && remove;
                return (
                    <TouchableOpacity
                        key={reaction}
                        style={{ opacity: isDisabled ? 0.35 : undefined }}
                        disabled={isDisabled}
                        onPress={() => props.onPress(reaction)}
                    >
                        <View style={{ width: 52, height: 52, alignItems: 'center', justifyContent: 'center' }}>
                            <Image source={reactionsImagesMap[reaction]} style={{ width: 36, height: 36 }} />
                        </View>
                    </TouchableOpacity>
                );
            })}
        </View>
    );
});