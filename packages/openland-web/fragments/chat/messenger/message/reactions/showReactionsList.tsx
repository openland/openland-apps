import * as React from 'react';
import { css, cx } from 'linaria';
import { useClient } from 'openland-api/useClient';
import { XView, XViewRouterContext } from 'react-mental';
import { UButton } from 'openland-web/components/unicorn/UButton';
import {
    MessageUsersReactions,
    MessageReactionType,
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
            title={props.user.name}
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

const ReactionsList = React.memo((props: ReactionsListProps) => {
    const client = useClient();
    const router = React.useContext(XViewRouterContext)!;
    const { hide, mId, isComment } = props;
    const message = isComment
        ? client.useCommentFullReactions({ id: mId }, { fetchPolicy: 'network-only' }).commentEntry
        : client.useMessageFullReactions({ id: mId }, { fetchPolicy: 'network-only' }).message;

    // this huck because updating reactions dont updated list
    React.useEffect(() => {
        (async () => {
            if (isComment) {
                await client.refetchCommentFullReactions({ id: mId });
            } else {
                await client.refetchMessageFullReactions({ id: mId });
            }
        })();
    }, []);

    if (!message) {
        return null;
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
        <React.Suspense
            fallback={
                <XView flexGrow={1} flexShrink={0} height={50}>
                    <XLoader loading={true} />
                </XView>
            }
        >
            <ReactionsList mId={mId} isComment={isComment} hide={ctx.hide} />
        </React.Suspense>
    ));
};
