import * as React from 'react';
import { XHorizontal } from 'openland-x-layout/XHorizontal';
import { UserShort } from 'openland-api/Types';
import { Reactions } from './reactions/MessageReaction';
import { DataSourceWebMessageItem } from '../data/WebMessageItemDataSource';
import { XView } from 'react-mental';
import { XDate } from 'openland-x/XDate';
import CommentChannelIcon from 'openland-icons/ic-comment-channel.svg';
import CommentEmptyChannelIcon from 'openland-icons/ic-comment-empty-channel.svg';
import { XRouterContext } from 'openland-x-routing/XRouterContext';

type PostMessageButtonsT = {
    showNumberOfComments?: boolean;
    isComment: boolean;
    isChannel: boolean;
    onlyLikes: boolean;
    message: DataSourceWebMessageItem;
    onCommentReplyClick?: (event: React.MouseEvent<any>) => void;
    conversationId?: string;
    me?: UserShort | null;
};

const DiscussButton = React.memo(
    ({
        commentsCount,
        messageId,
        conversationId,
    }: {
        commentsCount: number | null;
        messageId: string;
        conversationId: string;
    }) => {
        let router = React.useContext(XRouterContext)!;

        return (
            <XView
                cursor="pointer"
                borderRadius={14}
                backgroundColor="rgba(23, 144, 255, 0.1)"
                height={28}
                fontSize={13}
                justifyContent="center"
                alignItems="center"
                color="#1790ff"
                paddingLeft={12}
                paddingRight={12}
                onClick={() => {
                    router.pushQuery('comments', `${messageId}&${conversationId}`);
                }}
            >
                {commentsCount ? (
                    <XView flexDirection="row">
                        <CommentChannelIcon />{' '}
                        <XView marginLeft={4}>{commentsCount} comments</XView>
                    </XView>
                ) : (
                    <XView flexDirection="row">
                        <CommentEmptyChannelIcon /> <XView marginLeft={4}>Discuss</XView>
                    </XView>
                )}
            </XView>
        );
    },
);

export const PostMessageButtons = React.memo(
    ({
        isComment,
        isChannel,
        onlyLikes,
        message,
        onCommentReplyClick,
        conversationId,
        me,
        showNumberOfComments,
    }: PostMessageButtonsT) => {
        let showDiscussButton = false;

        if (isChannel) {
            showDiscussButton = true;
        }

        if (!isChannel && message.commentsCount !== null && message.commentsCount !== 0) {
            showDiscussButton = true;
        }

        if (showNumberOfComments !== undefined) {
            showDiscussButton = showNumberOfComments;
        }

        return (
            <>
                {isComment && (
                    <>
                        <XView flexDirection="row" marginTop={4}>
                            <XView
                                paddingRight={12}
                                fontSize={12}
                                opacity={0.4}
                                color="#000"
                                fontWeight="600"
                            >
                                <XDate value={message.date.toString()} format="time" />
                            </XView>
                            <XView
                                color="#1790ff"
                                fontWeight="600"
                                fontSize={12}
                                cursor="pointer"
                                onClick={onCommentReplyClick}
                            >
                                Reply
                            </XView>
                        </XView>
                    </>
                )}
                {!isComment && (
                    <XView flexDirection="row">
                        <XHorizontal alignItems="center" separator={5}>
                            {showDiscussButton && (
                                <XView paddingTop={6}>
                                    <DiscussButton
                                        commentsCount={message.commentsCount}
                                        messageId={message.id!!}
                                        conversationId={conversationId!!}
                                    />
                                </XView>
                            )}

                            {!message.isSending &&
                            ((message.reactions && message.reactions.length) || isChannel) ? (
                                <XView paddingTop={4}>
                                    <Reactions
                                        onlyLikes={onlyLikes}
                                        messageId={message.id!}
                                        reactions={message.reactions || []}
                                        meId={(me && me.id) || ''}
                                    />
                                </XView>
                            ) : null}
                        </XHorizontal>
                    </XView>
                )}
            </>
        );
    },
);
