import * as React from 'react';
import { XHorizontal } from 'openland-x-layout/XHorizontal';
import { UserShort } from 'openland-api/Types';
import { Reactions } from './reactions/MessageReaction';
import { DataSourceWebMessageItem } from '../data/WebMessageItemDataSource';
import { XView } from 'react-mental';
import CommentIcon from 'openland-icons/ic-comment-channel2.svg';
import RepliedIcon from 'openland-icons/ic-replied.svg';
import { openCommentsModal } from 'openland-web/components/messenger/message/content/comments/CommentsModalInner';
import { XWithRole } from 'openland-x-permissions/XWithRole';
import { RoomChat_room } from 'openland-api/Types';
import { ZRelativeDate } from 'openland-mobile/components/ZRelativeDate';

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
        let openModal = React.useCallback(() => {
            openCommentsModal({
                messageId: messageId,
                conversationId,
            });
        }, []);
        return (
            <XView
                cursor="pointer"
                borderRadius={14}
                backgroundColor="#f4f4f4"
                height={28}
                fontSize={13}
                justifyContent="center"
                alignItems="center"
                color="#7A7A7A"
                paddingLeft={12}
                paddingRight={12}
                onClick={openModal}
            >
                {commentsCount ? (
                    <XView flexDirection="row">
                        <CommentIcon />{' '}
                        <XView marginLeft={4}>
                            {commentsCount} {commentsCount === 1 ? 'comment' : 'comments'}
                        </XView>
                    </XView>
                ) : (
                    <XView flexDirection="row">
                        <CommentIcon /> <XView marginLeft={4}>Comment</XView>
                    </XView>
                )}
            </XView>
        );
    },
);

export type CommentPropsT = {
    messageId: string;
    onCommentReplyClick: (event: React.MouseEvent<any>) => void;
    onCommentEditClick: (event: React.MouseEvent<any, MouseEvent>) => void;
    onCommentDeleteClick: (event: React.MouseEvent<any, MouseEvent>) => void;
};

type PostMessageButtonsT = {
    isCommentNotification?: boolean;
    showNumberOfComments?: boolean;
    isComment: boolean;
    isChannel?: boolean;
    isModal?: boolean;
    onlyLikes: boolean;
    message: DataSourceWebMessageItem;
    usernameOfRepliedUser?: string;
    conversationId?: string | null;
    me?: UserShort | null;
    commentProps?: CommentPropsT;
    room?: RoomChat_room;
    onCommentBackToUserMessageClick?: (event: React.MouseEvent<any>) => void;
    onCommentNotificationsReplyClick?: (event: React.MouseEvent<any>) => void;
};

export const PostMessageButtons = React.memo(
    ({
        isCommentNotification,
        isComment,
        isChannel,
        isModal,
        onlyLikes,
        message,
        commentProps,
        usernameOfRepliedUser,
        conversationId,
        me,
        showNumberOfComments,
        room,
        onCommentBackToUserMessageClick,
        onCommentNotificationsReplyClick,
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

        const showReactionsButton =
            isChannel ||
            (!message.isSending && message.reactions && message.reactions.length !== 0);

        const showPostMessageButtons =
            showReactionsButton || showDiscussButton || isComment || isCommentNotification;

        let canDelete = !!message.isOut;
        if (room && room.__typename === 'SharedRoom' && room.kind === 'GROUP') {
            canDelete = room.role === 'OWNER';
        }

        if (room && room.__typename === 'SharedRoom' && room.kind === 'PUBLIC') {
            canDelete = room.role === 'ADMIN' || room.role === 'OWNER' || room.canEdit;
        }

        const postMessageButtons = (
            <>
                {(isComment || isCommentNotification) &&
                    message.notificationType !== 'unsupported' && (
                        <>
                            <XView flexDirection="row" marginTop={4}>
                                <XView
                                    paddingRight={12}
                                    fontSize={12}
                                    opacity={0.4}
                                    color="#000"
                                    fontWeight="600"
                                >
                                    <ZRelativeDate
                                        style={
                                            {
                                                fontSize: '100%',
                                                color: '#000',
                                                fontWeight: '600',
                                            } as any
                                        }
                                        date={message.date.toString()}
                                    />
                                </XView>
                                {isCommentNotification && (
                                    <XView
                                        color="#1790ff"
                                        fontWeight="600"
                                        fontSize={12}
                                        cursor="pointer"
                                        onClick={onCommentNotificationsReplyClick}
                                    >
                                        Reply
                                    </XView>
                                )}
                                {commentProps && (
                                    <>
                                        <XView
                                            color="#1790ff"
                                            fontWeight="600"
                                            fontSize={12}
                                            cursor="pointer"
                                            onClick={commentProps.onCommentReplyClick}
                                        >
                                            Reply
                                        </XView>

                                        {me && message.senderId === me.id && (
                                            <XView
                                                marginLeft={12}
                                                color="rgba(0, 0, 0, 0.4)"
                                                fontWeight="600"
                                                fontSize={12}
                                                cursor="pointer"
                                                onClick={commentProps.onCommentEditClick}
                                            >
                                                Edit
                                            </XView>
                                        )}

                                        <XWithRole role="super-admin" or={canDelete}>
                                            <XView
                                                marginLeft={12}
                                                color="rgba(0, 0, 0, 0.4)"
                                                fontWeight="600"
                                                fontSize={12}
                                                cursor="pointer"
                                                onClick={commentProps.onCommentDeleteClick}
                                            >
                                                Delete
                                            </XView>
                                        </XWithRole>
                                    </>
                                )}

                                {usernameOfRepliedUser && (
                                    <XView
                                        alignItems="center"
                                        flexDirection="row"
                                        marginLeft={12}
                                        color="rgba(0, 0, 0, 0.4)"
                                        fontWeight="600"
                                        fontSize={12}
                                        cursor="pointer"
                                        onClick={onCommentBackToUserMessageClick}
                                    >
                                        <RepliedIcon />
                                        <XView marginLeft={4}>{usernameOfRepliedUser}</XView>
                                    </XView>
                                )}
                            </XView>
                        </>
                    )}
                {!isComment && (showReactionsButton || showDiscussButton) && (
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

                            {showReactionsButton ? (
                                <XView paddingTop={isModal ? 0 : 4}>
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

        return (
            <>
                {isModal && showPostMessageButtons && (
                    <XView paddingTop={12}>{postMessageButtons}</XView>
                )}
                {!isModal && showPostMessageButtons && postMessageButtons}
            </>
        );
    },
);
