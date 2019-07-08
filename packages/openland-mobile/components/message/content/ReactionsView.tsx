
import * as React from 'react';
import { TextStyles } from 'openland-mobile/styles/AppStyles';
import { FullMessage_GeneralMessage_reactions } from 'openland-api/Types';
import { View, Image, Text, TouchableWithoutFeedback } from 'react-native';
import { reactionsImagesMap, extractReactionsSorted } from 'openland-mobile/messenger/components/AsyncMessageReactionsView';
import { showReactionsList } from '../showReactionsList';
import { AppTheme } from 'openland-mobile/themes/themes';

interface ReactionsViewProps {
    reactions: FullMessage_GeneralMessage_reactions[];
    theme: AppTheme;
}

export const ReactionsView = React.memo<ReactionsViewProps>((props) => {
    if (!props.reactions || props.reactions!.length === 0) {
        return null;
    }

    const { reactionsSorted, usersString } = extractReactionsSorted(props.reactions!);

    return (
        <View marginBottom={-10}>
            <TouchableWithoutFeedback onPress={() => showReactionsList(props.reactions)}>
                <View alignItems="stretch" justifyContent="flex-start" flexDirection="row" paddingVertical={10}>
                    {[...reactionsSorted].map((i) => <Image key={'k' + i.reaction} marginRight={3} source={reactionsImagesMap[i.reaction]} style={{ width: 20, height: 20 }} />)}

                    {usersString.length > 0 && (
                        <Text
                            style={{
                                fontWeight: TextStyles.weight.medium,
                                marginLeft: 2,
                                marginRight: 7,
                                marginTop: 2,
                                fontSize: 13,
                                color: props.theme.textLabelColor
                            }}
                            numberOfLines={1}
                            allowFontScaling={false}
                        >
                            {usersString}
                        </Text>
                    )}
                </View>
            </TouchableWithoutFeedback>
        </View>
    );
});