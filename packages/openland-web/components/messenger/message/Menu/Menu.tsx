import * as React from 'react';
import { XView } from 'react-mental';
import { css } from 'linaria';
import {
    FullMessage_GeneralMessage_attachments_MessageAttachmentFile,
    RoomChat_room,
    RoomChat_room_SharedRoom,
} from 'openland-api/Types';
import { CommentReactionButton, MessageReactionButton } from '../reactions/ReactionButton';
import CommentIcon from 'openland-icons/ic-comment-channel.svg';
import { XHorizontal } from 'openland-x-layout/XHorizontal';
import { DataSourceWebMessageItem } from '../../data/WebMessageItemDataSource';
import { MessagesStateContext } from '../../MessagesStateContext';
import { openCommentsModal } from 'openland-web/components/messenger/message/content/comments/CommentsModalInner';
import { XOverflow, XOverflowDefalutTarget } from 'openland-web/components/XOverflow';
import { XMenuItem } from 'openland-x/XMenuItem';
import { FollowUnfollowMenuButton } from './FollowUnfollowMenuButton';
import { PinMessageButton } from './PinMessageButton';
import { ShowDeleteMessageModal } from './ShowDeleteMessageModal';
import { useClient } from 'openland-web/utils/useClient';

let commentsIconWrapperClass = css`
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    padding-top: 6;

    & svg g path {
        fill: #000;
        opacity: 0.2;
    }

    &:hover svg g path {
        fill: #1790ff;
        opacity: 1;
    }
`;

const CommentsIconWrapper = ({
    children,
    onClick,
}: {
    children: any;
    onClick: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}) => {
    return (
        <div className={commentsIconWrapperClass} onClick={onClick}>
            {children}
        </div>
    );
};

interface MenuProps {
    conversationId: string;
    message: DataSourceWebMessageItem;
    isModal: boolean;
    isComment: boolean;
    isCommentNotification: boolean;
    hover: boolean;
    selectMessage: () => void;
    room?: RoomChat_room;
    deleted?: boolean;
}

export const Menu = React.memo(
    ({
        conversationId,
        hover,
        message,
        deleted,
        isModal,
        isComment,
        isCommentNotification,
        selectMessage,
        room,
    }: MenuProps) => {
        const client = useClient();
        let [showMenu, setShowMenu] = React.useState<boolean>(false);

        const messagesContext = React.useContext(MessagesStateContext);

        const commentsClick = React.useCallback(() => {
            openCommentsModal({
                messageId: message.id!!,
                conversationId,
            });
        }, []);

        const setEditMessage = (e: any) => {
            if (!message.isSending) {
                e.stopPropagation();
                messagesContext.resetAll();
                messagesContext.setEditMessage(message.id!, message.text!);
            }
        };

        const setReplyMessages = (e: any) => {
            if (!message.isSending) {
                e.stopPropagation();
                messagesContext.resetAll();
                let singleReplyMessageMessage = new Set<string>().add(message.text!!);
                let singleReplyMessageId = new Set<string>().add(message.id!!);
                let singleReplyMessageSender = new Set<string>().add(message.sender.name);

                let fileAttach = (message.attachments || []).filter(
                    a => a.__typename === 'MessageAttachmentFile',
                )[0] as FullMessage_GeneralMessage_attachments_MessageAttachmentFile | undefined;
                let richAttach = (message.attachments || []).filter(
                    a => a.__typename === 'MessageRichAttachment',
                )[0];

                if (fileAttach && !richAttach) {
                    singleReplyMessageMessage = new Set<string>().add('File');
                    if (fileAttach.fileMetadata.isImage) {
                        singleReplyMessageMessage = new Set<string>().add('Photo');
                    }
                }
                messagesContext.setReplyMessages(
                    singleReplyMessageId,
                    singleReplyMessageMessage,
                    singleReplyMessageSender,
                );
            }
        };

        const out = message.isOut;

        const sharedRoom =
            room && room.__typename === 'SharedRoom' ? (room as RoomChat_room_SharedRoom) : null;
        let pinMessageAccess = sharedRoom && sharedRoom.canEdit && !message.isService;
        if (room && room.__typename === 'PrivateRoom') {
            pinMessageAccess = true;
        }
        const isChannel = sharedRoom && sharedRoom.isChannel;
        let contentElem;

        if (isCommentNotification) {
            contentElem = (
                <>
                    <FollowUnfollowMenuButton
                        isSubscribedMessageComments={!!message.isSubscribedMessageComments}
                        messageId={message.peerRootId!!}
                        onSuccess={() => setShowMenu(false)}
                    />

                    <XMenuItem
                        style="danger"
                        onClick={async () => {
                            await client.mutateDeleteNotification({
                                notificationId: message.notificationId!!,
                            });
                        }}
                    >
                        Clear
                    </XMenuItem>
                </>
            );
        } else {
            contentElem = (
                <>
                    {out && !deleted && (
                        <XMenuItem
                            onClick={(e: any) => {
                                setEditMessage(e);
                                setShowMenu(false);
                            }}
                        >
                            Edit
                        </XMenuItem>
                    )}
                    <XMenuItem
                        onClick={(e: any) => {
                            setReplyMessages(e);
                            setShowMenu(false);
                        }}
                    >
                        Reply
                    </XMenuItem>
                    {pinMessageAccess && message.id && room && (
                        <PinMessageButton
                            variables={{
                                chatId: room.id,
                                messageId: message.id,
                            }}
                            onSuccess={() => setShowMenu(false)}
                        />
                    )}
                    <XMenuItem
                        onClick={() => {
                            setShowMenu(false);
                            selectMessage();
                            messagesContext.forwardMessages();
                        }}
                    >
                        Forward
                    </XMenuItem>
                    {message.id && out && (
                        <XMenuItem
                            style="danger"
                            onClick={() => ShowDeleteMessageModal(message.id!!)}
                        >
                            Delete
                        </XMenuItem>
                    )}
                </>
            );
        }

        if (!message.isSending && !messagesContext.useForwardHeader && !isModal) {
            return (
                <XHorizontal
                    alignItems="center"
                    alignSelf="flex-start"
                    justifyContent={isComment ? 'flex-end' : 'flex-end'}
                    width={isCommentNotification ? 7 : 85}
                    flexShrink={0}
                    separator={5}
                    className="menu-wrapper"
                >
                    <XView paddingTop={isComment ? 24 : 0} flexShrink={0}>
                        <XHorizontal alignItems="center" separator={8}>
                            {isComment && (
                                <CommentReactionButton
                                    hover={hover}
                                    id={message.id!}
                                    reactions={message.reactions}
                                />
                            )}
                            {!isComment && !isCommentNotification && hover && (
                                <MessageReactionButton messageId={message.id!} />
                            )}
                            {hover && !isCommentNotification && !isComment && !isChannel && (
                                <CommentsIconWrapper onClick={commentsClick}>
                                    <CommentIcon />
                                </CommentsIconWrapper>
                            )}
                            {!isComment && (
                                <XOverflow
                                    show={showMenu}
                                    placement="bottom-end"
                                    useCustomTarget={true}
                                    onClickOutside={() => setShowMenu(false)}
                                    target={
                                        <XOverflowDefalutTarget
                                            onClick={() => setShowMenu(!showMenu)}
                                            active={showMenu}
                                            marginLeft={0}
                                            flat={true}
                                            opacity={hover || showMenu ? 1 : 0}
                                        />
                                    }
                                    content={contentElem}
                                />
                            )}
                        </XHorizontal>
                    </XView>
                </XHorizontal>
            );
        } else {
            return null;
        }
    },
);
