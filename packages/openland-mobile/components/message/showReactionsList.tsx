import * as React from 'react';
import { FullMessage_GeneralMessage_reactions, UserShort, MessageReactionType } from 'openland-api/Types';
import { ActionSheetBuilder } from '../ActionSheet';
import { ZModalController } from '../ZModal';
import { View, Image, Text } from 'react-native';
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

const ReactionLabel: { [key in MessageReactionType]: string } = {
    ANGRY: 'Angry',
    CRYING: 'Crying',
    JOY: 'Joy',
    LIKE: 'Like',
    SCREAM: 'Scream',
    THUMB_UP: 'Thumb Up',
};

const ReactionsList = (props: ReactionsListProps) => {
    const theme = React.useContext(ThemeContext);
    const { list, ctx } = props;

    return (
        <View flexGrow={1}>
            {Object.keys(list).map((r, i) => {
                const users = list[r];

                return (
                    <View key={'reaction-' + i} paddingBottom={16}>
                        <View height={48} paddingHorizontal={16} alignItems="center" flexDirection="row">
                            <Image source={reactionsImagesMap[r]} style={{ width: 24, height: 24 }} />

                            <View flexGrow={1} flexShrink={1} paddingLeft={16}>
                                <Text style={{ ...TextStyles.Title2, color: theme.foregroundPrimary }} allowFontScaling={false}>
                                    {ReactionLabel[r]}{'   '}
                                    <Text style={{ ...TextStyles.Label1, color: theme.foregroundTertiary }} allowFontScaling={false}>{users.length}</Text>
                                </Text>

                            </View>
                        </View>

                        {users.map((u) => (
                            <ZUserView key={'user-' + u.name} user={u} onPress={(id) => { ctx.hide(); getMessenger().handleUserClick(id); }} />
                        ))}
                    </View>
                );
            })}
        </View>
    );
};

export const showReactionsList = (reactions: FullMessage_GeneralMessage_reactions[]) => {
    if (reactions.length === 0) {
        return;
    }

    let builder = new ActionSheetBuilder();
    let reactionList: { [key: string]: UserShort[]; } = {};

    reactions.map((r) => {
        if (!reactionList[r.reaction]) {
            reactionList[r.reaction] = [r.user];
        } else {
            reactionList[r.reaction] = [...reactionList[r.reaction], r.user];
        }
    });

    builder.view((ctx: ZModalController) => <ReactionsList ctx={ctx} list={reactionList} />);
    builder.cancelable(false);
    builder.show();
};