import * as React from 'react';
import {
    MessageReactionType,
    MessageUsersReactions,
    MessageUsersReactions_user,
} from 'openland-api/spacex.types';
import { QueryCacheProvider } from '@openland/spacex';
import { useClient } from 'openland-api/useClient';
import { ActionSheetBuilder } from '../ActionSheet';
import { ZModalController } from '../ZModal';
import { View, Image, Text } from 'react-native';
import { reactionsImagesMap } from 'openland-mobile/messenger/components/AsyncMessageReactionsView';
import { TextStyles } from 'openland-mobile/styles/AppStyles';
import { getMessenger } from 'openland-mobile/utils/messenger';
import { ZUserView } from '../ZUserView';
import { ThemeContext } from 'openland-mobile/themes/ThemeContext';
import { ZLoader } from '../ZLoader';

interface ReactionsListProps {
    ctx: ZModalController;
    mId: string;
    isComment?: boolean;
}

const ReactionLabel: { [key in MessageReactionType]: string } = {
    ANGRY: 'Angry',
    CRYING: 'Sad',
    JOY: 'Haha',
    LIKE: 'Love',
    SCREAM: 'Wow',
    THUMB_UP: 'Thumbs Up',
    DONATE: 'Donate',
};

const ReactionsList = (props: ReactionsListProps) => {
    const theme = React.useContext(ThemeContext);
    const client = useClient();
    const [loading, setLoading] = React.useState(true);
    const { ctx, mId, isComment } = props;
    const message = isComment
        ? client.useCommentFullReactions({ id: mId }).commentEntry
        : client.useMessageFullReactions({ id: mId }).message;

    // this huck because updating reactions dont updated list
    React.useEffect(() => {
        (async () => {
            if (isComment) {
                await client.refetchCommentFullReactions({ id: mId });
                setLoading(false);
            } else {
                await client.refetchMessageFullReactions({ id: mId });
                setLoading(false);
            }
        })();
    }, []);

    // show loader instead of a jumping list
    if (loading) {
        return (
            <View height={40}>
                <ZLoader />
            </View>
        );
    }

    if (!message) {
        return null;
    }

    const generalMessage = message.__typename === 'GeneralMessage' && message;
    const stickerMessage = message.__typename === 'StickerMessage' && message;
    const commentMessage = message.__typename === 'CommentEntry' && message;

    let reactions: MessageUsersReactions[] = generalMessage
        ? generalMessage.reactions
        : stickerMessage
            ? stickerMessage.reactions
            : commentMessage
                ? commentMessage.comment.reactions
                : [];

    let reactionList: { [key: string]: MessageUsersReactions_user[] } = {};

    reactions.map((r) => {
        if (!reactionList[r.reaction]) {
            reactionList[r.reaction] = [r.user];
        } else {
            reactionList[r.reaction] = [...reactionList[r.reaction], r.user];
        }
    });

    return (
        <View flexGrow={1}>
            {Object.keys(reactionList).map((r, i, arr) => {
                const users = reactionList[r];

                return (
                    <View key={'reaction-' + i} paddingBottom={i === arr.length - 1 ? 0 : 16}>
                        <View
                            height={48}
                            paddingHorizontal={16}
                            alignItems="center"
                            flexDirection="row"
                        >
                            <Image
                                source={reactionsImagesMap[r]}
                                style={{ width: 24, height: 24 }}
                            />

                            <View flexGrow={1} flexShrink={1} paddingLeft={16}>
                                <Text
                                    style={{ ...TextStyles.Title2, color: theme.foregroundPrimary }}
                                    allowFontScaling={false}
                                >
                                    {ReactionLabel[r]}
                                    {'  '}
                                    <Text
                                        style={{
                                            ...TextStyles.Label1,
                                            color: theme.foregroundTertiary,
                                        }}
                                        allowFontScaling={false}
                                    >
                                        {users.length}
                                    </Text>
                                </Text>
                            </View>
                        </View>

                        {users.map((u) => (
                            <ZUserView
                                key={'user-' + u.id + r}
                                user={u}
                                onPress={(id) => {
                                    ctx.hide();
                                    getMessenger().handleUserClick(id);
                                }}
                            />
                        ))}
                    </View>
                );
            })}
        </View>
    );
};

export const showReactionsList = (mId: string, isComment?: boolean) => {
    let builder = new ActionSheetBuilder();

    builder.view((ctx: ZModalController) => (
        <QueryCacheProvider>
            <ReactionsList ctx={ctx} mId={mId} isComment={isComment} />
        </QueryCacheProvider>
    ));
    builder.cancelable(false);
    builder.show();
};
