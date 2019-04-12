
import * as React from 'react';
import { TextStyles } from 'openland-mobile/styles/AppStyles';
import { FullMessage_GeneralMessage_reactions } from 'openland-api/Types';
import { View, Image, Text, TextStyle } from 'react-native';
import { reactionsImagesMap, extractReactionsSorted } from 'openland-mobile/messenger/components/AsyncMessageReactionsView';

interface ReactionsViewProps {
    reactions: FullMessage_GeneralMessage_reactions[];
}

export const ReactionsView = React.memo<ReactionsViewProps>((props) => {
    if (!props.reactions || props.reactions!.length === 0) {
        return null;
    }

    const { reactionsSorted, usersString } = extractReactionsSorted(props.reactions!);

    return (
        <View alignItems="stretch" justifyContent="flex-start" flexDirection="row" marginTop={10}>
            {[...reactionsSorted].map((i) => <Image key={'k' + i.reaction} marginRight={3} source={reactionsImagesMap[i.reaction]} style={{ width: 20, height: 20 }} />)}

            {usersString.length > 0 && (
                <Text
                    style={{
                        fontWeight: TextStyles.weight.medium,
                        marginLeft: 2,
                        marginRight: 7,
                        marginTop: 2,
                        fontSize: 13,
                        color: '#99a2b0'
                    } as TextStyle}
                    numberOfLines={1}
                >
                    {usersString}
                </Text>
            )}
        </View>
    );
});