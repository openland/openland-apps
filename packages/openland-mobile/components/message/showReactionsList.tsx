import * as React from 'react';
import { FullMessage_GeneralMessage_reactions, UserShort } from 'openland-api/Types';
import { ActionSheetBuilder } from '../ActionSheet';
import { ZModalController } from '../ZModal';
import { View, Image, Text, TextStyle } from 'react-native';
import { reactionsImagesMap } from 'openland-mobile/messenger/components/AsyncMessageReactionsView';
import { TextStyles } from 'openland-mobile/styles/AppStyles';
import { getMessenger } from 'openland-mobile/utils/messenger';
import { ZUserView } from '../ZUserView';
import { ThemeContext } from 'openland-mobile/themes/ThemeContext';

interface ReactionsListProps {
    ctx: ZModalController;
    list: {
        [key: string]: UserShort[];
    };
}

const ReactionsList = (props: ReactionsListProps) => {
    const theme = React.useContext(ThemeContext);
    const { list, ctx } = props;

    return (
        <View flexGrow={1} paddingHorizontal={16} paddingTop={5}>
            {Object.keys(list).map((r, i) => {
                let users = list[r];

                return (
                    <View key={'reaction-' + i} borderTopColor={theme.separatorColor} borderTopWidth={i > 0 ? 1 : undefined} paddingTop={15} paddingBottom={14}>
                        <View marginBottom={9} alignItems="center" flexDirection="row">
                            <Image source={reactionsImagesMap[r]} style={{ width: 20, height: 20 }} />

                            <View flexGrow={1} flexShrink={1} paddingLeft={8}>
                                <Text style={{ color: theme.textColor, fontWeight: TextStyles.weight.medium } as TextStyle} allowFontScaling={false}>
                                    {users.length > 1 ? (users.length + ' people') : '1 person'} reacted with :{r.toLowerCase()}:
                                </Text>
                            </View>
                        </View>

                        <View marginHorizontal={-16}>
                            {users.map((u) => (
                                <ZUserView user={u} onPress={(id) => { ctx.hide(); getMessenger().handleUserClick(id); }} />
                            ))}
                        </View>
                    </View>
                );
            })}
        </View>
    );
}

export const showReactionsList = (reactions: FullMessage_GeneralMessage_reactions[]) => {
    if (reactions.length === 0) {
        return;
    }

    let builder = new ActionSheetBuilder();

    builder.flat();

    let reactionList: { [key: string]: UserShort[]; } = {};

    reactions.map((r) => {
        if (!reactionList[r.reaction]) {
            reactionList[r.reaction] = [r.user];
        } else {
            reactionList[r.reaction] = [...reactionList[r.reaction], r.user];
        }
    });

    builder.view((ctx: ZModalController) => <ReactionsList ctx={ctx} list={reactionList} />);
    builder.show();
}