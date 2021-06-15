import * as React from 'react';
import { css, cx } from 'linaria';
import { useClient } from 'openland-api/useClient';
import { XView, XViewRouterContext } from 'react-mental';
import { QueryCacheProvider } from '@openland/spacex';
import { UButton } from 'openland-web/components/unicorn/UButton';
import {
    CommentFullReactions,
    MessageFullReactions,
    MessageReactionType,
    MessageUsersReactions,
    CommentFullReactions_commentEntry,
    MessageFullReactions_message,
    MessageUsersReactions_user,
} from 'openland-api/spacex.types';
import { emoji } from 'openland-y-utils/emoji';
import { showModalBox } from 'openland-x/showModalBox';
import { TextLabel1, TextTitle3 } from 'openland-web/utils/TextStyles';
import { XScrollView3 } from 'openland-x/XScrollView3';
import { XModalContent } from 'openland-web/components/XModalContent';
import { XModalFooter } from 'openland-web/components/XModalFooter';
import { XLoader } from 'openland-x/XLoader';
import { UAvatar } from 'openland-web/components/unicorn/UAvatar';
import { reactionImage } from './MessageReactions';
import { reactionLabel } from './ReactionPicker';

const userContainer = css`
    display: flex;
    align-items: center;
    flex-grow: 1;
    height: 40px;
    padding-left: 24px;
    padding-right: 24px;
    justify-content: start;
    overflow: hidden;
    cursor: pointer;
    &:hover {
        background-color: var(--backgroundTertiaryTrans);
    }
`;

const userDataWrap = css`
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-left: 16px;
`;

const userName = css`
    color: var(--foregroundPrimary);
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
`;

const reactionImageStyle = css`
    width: 24px;
    height: 24px;
    object-fit: contain;
    margin-right: 16px;
`;

const reactionLabelStyle = css`
    color: var(--foregroundPrimary);
    margin-right: 8px;
`;

const reactionCountStyle = css`
    color: var(--foregroundTertiary);
`;

export const ReactionItemUser = (props: {
    user: MessageUsersReactions_user;
    onClick: () => void;
}) => (
        <div className={userContainer} onClick={props.onClick}>
            <UAvatar
                id={props.user.id}
                photo={props.user.photo}
                size="x-small"
            />
            <div className={userDataWrap}>
                <div className={cx(userName, TextLabel1)}>{emoji(props.user.name)}</div>
            </div>
        </div>
    );

interface ReactionsListProps {
    hide: () => void;
    mId: string;
    isComment?: boolean;
}

type DataType = CommentFullReactions | MessageFullReactions | null;
type MessageType = CommentFullReactions_commentEntry | MessageFullReactions_message | null;

const ReactionsList = React.memo((props: ReactionsListProps) => {
    const { hide, mId, isComment } = props;
    const client = useClient();
    const router = React.useContext(XViewRouterContext)!;
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
            <XView flexGrow={1} flexShrink={0} height={50}>
                <XLoader loading={true} transparentBackground={true} />
            </XView>
        );
    }

    const onUserPress = (id: string) => {
        hide();
        router.navigate(`/${id}`);
    };

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
        <>
            <XModalContent paddingBottom={0}>
                <XView flexGrow={1} flexShrink={1} marginHorizontal={-24} maxHeight="65vh">
                    <XScrollView3
                        flexGrow={1}
                        flexShrink={1}
                        paddingTop={20}
                        useDefaultScroll={true}
                    >
                        {Object.keys(reactionList).map((r, i) => {
                            const users = reactionList[r];

                            return (
                                <XView key={'reaction' + i} marginBottom={24}>
                                    <XView
                                        flexDirection="row"
                                        alignItems="center"
                                        paddingHorizontal={24}
                                        paddingBottom={8}
                                    >
                                        <img
                                            className={reactionImageStyle}
                                            src={reactionImage(r as MessageReactionType)}
                                        />
                                        <div className={cx(reactionLabelStyle, TextTitle3)}>
                                            {reactionLabel[r]}
                                        </div>
                                        <div className={cx(reactionCountStyle, TextLabel1)}>
                                            {users.length}
                                        </div>
                                    </XView>
                                    {users.map((u) => (
                                        <ReactionItemUser
                                            key={'user-' + u.id + r}
                                            user={u}
                                            onClick={() => onUserPress(u.id)}
                                        />
                                    ))}
                                </XView>
                            );
                        })}
                    </XScrollView3>
                </XView>
            </XModalContent>
            <XModalFooter>
                <UButton text="Close" onClick={hide} size="large" />
            </XModalFooter>
        </>
    );
});

export const showReactionsList = (mId: string, isComment?: boolean) => {
    showModalBox({ title: 'Reactions', width: 400 }, (ctx) => (
        <QueryCacheProvider>
            <ReactionsList mId={mId} isComment={isComment} hide={ctx.hide} />
        </QueryCacheProvider>
    ));
};
