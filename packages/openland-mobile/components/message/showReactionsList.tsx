import * as React from 'react';
import {
    CommentFullReactions,
    MessageFullReactions,
    MessageReactionType,
    MessageUsersReactions,
    CommentFullReactions_commentEntry,
    MessageFullReactions_message,
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
import { useText } from 'openland-mobile/text/useText';

interface ReactionsListProps {
    ctx: ZModalController;
    mId: string;
    isComment?: boolean;
}

const useReactionLabel = () => {
    const { t } = useText();
    const ReactionLabel: { [key in MessageReactionType]: string } = {
        ANGRY: t('angry', 'Angry'),
        CRYING: t('sad', 'Sad'),
        JOY: t('haha', 'Haha'),
        LIKE: t('love', 'Love'),
        SCREAM: t('wow', 'Wow'),
        THUMB_UP: t('thumbsUp', 'Thumbs Up'),
        DONATE: t('donate', 'Donate'),
    };
    return (k: string): string => {
        return ReactionLabel[k] || '';
    };
};

type DataType = CommentFullReactions | MessageFullReactions | null;
type MessageType = CommentFullReactions_commentEntry | MessageFullReactions_message | null;

const ReactionsList = (props: ReactionsListProps) => {
    const { ctx, mId, isComment } = props;
    const theme = React.useContext(ThemeContext);
    const client = useClient();
    const getLabel = useReactionLabel();
    const [loading, setLoading] = React.useState(true);
    const [message, setMessage] = React.useState<MessageType>(null);

    const data: DataType = isComment
        ? client.useCommentFullReactions(
            { id: mId },
            { fetchPolicy: 'network-only', suspense: false },
        )
        : client.useMessageFullReactions(
            { id: mId },
            { fetchPolicy: 'network-only', suspense: false },
        );

    React.useLayoutEffect(() => {
        if (data) {
            if (isComment && (data as CommentFullReactions).commentEntry) {
                setMessage((data as CommentFullReactions).commentEntry);
            }
            if (!isComment && (data as MessageFullReactions).message) {
                setMessage((data as MessageFullReactions).message);
            }
            setLoading(false);
        }
    }, [data]);

    if (!message || loading) {
        return (
            <View style={{ height: 40 }}>
                <ZLoader />
            </View>
        );
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
        <View style={{ flexGrow: 1 }}>
            {Object.keys(reactionList).map((r, i, arr) => {
                const users = reactionList[r];

                return (
                    <View key={'reaction-' + i} style={{ paddingBottom: i === arr.length - 1 ? 0 : 16 }}>
                        <View
                            style={{
                                height: 48,
                                paddingHorizontal: 16,
                                alignItems: 'center',
                                flexDirection: 'row'
                            }}
                        >
                            <Image
                                source={reactionsImagesMap[r]}
                                style={{ width: 24, height: 24 }}
                            />

                            <View style={{ flexGrow: 1, flexShrink: 1, paddingLeft: 16 }}>
                                <Text
                                    style={{ ...TextStyles.Title2, color: theme.foregroundPrimary }}
                                    allowFontScaling={false}
                                >
                                    {getLabel(r)}
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
                                    getMessenger().handleUserPress(id);
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
