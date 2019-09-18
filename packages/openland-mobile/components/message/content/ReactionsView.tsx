
import * as React from 'react';
import { FontStyles } from 'openland-mobile/styles/AppStyles';
import { FullMessage_GeneralMessage_reactions } from 'openland-api/Types';
import { View, Image, Text, TouchableWithoutFeedback } from 'react-native';
import { reactionsImagesMap } from 'openland-mobile/messenger/components/AsyncMessageReactionsView';
import { showReactionsList } from '../showReactionsList';
import { reduceReactions } from 'openland-engines/reactions/reduceReactions';
import { getReactionsLabel } from 'openland-engines/reactions/getReactionsLabel';
import { getMessenger } from 'openland-mobile/utils/messenger';
import { ThemeContext } from 'openland-mobile/themes/ThemeContext';

interface ReactionsViewProps {
    reactions: FullMessage_GeneralMessage_reactions[];
}

export const ReactionsView = React.memo<ReactionsViewProps>((props) => {
    const theme = React.useContext(ThemeContext);
    const { reactions } = props;
    const myID = getMessenger().engine.user.id;

    if (!reactions || reactions!.length === 0) {
        return null;
    }

    const reactionsReduced = reduceReactions(reactions, myID);
    const reactionsLabel = getReactionsLabel(reactions, myID);

    return (
        <View marginBottom={-10}>
            <TouchableWithoutFeedback onPress={() => showReactionsList(reactions)}>
                <View alignItems="stretch" justifyContent="flex-start" flexDirection="row" paddingVertical={10}>
                    {reactionsReduced.map((i) => <Image key={'k' + i.reaction} marginRight={3} source={reactionsImagesMap[i.reaction]} style={{ width: 20, height: 20 }} />)}
                    {!!reactionsLabel && (
                        <Text
                            style={{
                                fontWeight: FontStyles.Weight.Medium,
                                marginLeft: 2,
                                marginRight: 7,
                                marginTop: 2,
                                fontSize: 13,
                                color: theme.foregroundTertiary
                            }}
                            numberOfLines={1}
                            allowFontScaling={false}
                        >
                            {reactionsLabel}
                        </Text>
                    )}
                </View>
            </TouchableWithoutFeedback>
        </View>
    );
});