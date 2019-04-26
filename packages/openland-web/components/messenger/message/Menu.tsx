import * as React from 'react';
import { XView } from 'react-mental';
import { css } from 'linaria';
import { FullMessage_GeneralMessage_attachments_MessageAttachmentFile } from 'openland-api/Types';
import { CommentReactionButton, MessageReactionButton } from './reactions/ReactionButton';
import ReplyIcon from 'openland-icons/ic-reply1.svg';
import EditIcon from 'openland-icons/ic-edit.svg';
import CommentIcon from 'openland-icons/ic-comment-channel.svg';
import { XHorizontal } from 'openland-x-layout/XHorizontal';
import { DataSourceWebMessageItem } from '../data/WebMessageItemDataSource';
import { MessagesStateContext } from '../../messenger/MessagesStateContext';
import { XRouterContext } from 'openland-x-routing/XRouterContext';
import { openCommentsModal } from 'openland-web/components/messenger/message/content/comments/CommentsModalInner';

let iconButtonClass = css`
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    padding-top: 6;

    &:hover svg path {
        fill: #1790ff;
        opacity: 1;
    }
`;

const IconButton = ({
    children,
    onClick,
}: {
    children: any;
    onClick: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}) => {
    return (
        <div className={iconButtonClass} onClick={onClick}>
            {children}
        </div>
    );
};

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

export const Menu = React.memo(
    ({
        conversationId,
        hover,
        message,
        isModal,
        isChannel,
        isComment,
    }: {
        conversationId: string;
        message: DataSourceWebMessageItem;
        isModal: boolean;
        isComment: boolean;
        isChannel: boolean;
        hover: boolean;
    }) => {
        let router = React.useContext(XRouterContext)!;

        const messagesContext = React.useContext(MessagesStateContext);
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
                let singleReplyMessageMessage = new Set().add(message.text);
                let singleReplyMessageId = new Set().add(message.id);
                let singleReplyMessageSender = new Set().add(message.sender.name);

                let fileAttach = (message.attachments || []).filter(
                    a => a.__typename === 'MessageAttachmentFile',
                )[0] as FullMessage_GeneralMessage_attachments_MessageAttachmentFile | undefined;
                let richAttach = (message.attachments || []).filter(
                    a => a.__typename === 'MessageRichAttachment',
                )[0];

                if (fileAttach && !richAttach) {
                    singleReplyMessageMessage = new Set().add('File');
                    if (fileAttach.fileMetadata.isImage) {
                        singleReplyMessageMessage = new Set().add('Photo');
                    }
                }
                messagesContext.setReplyMessages(
                    singleReplyMessageId,
                    singleReplyMessageMessage,
                    singleReplyMessageSender,
                );
            }
        };

        let out = message.isOut;

        if (!message.isSending && !messagesContext.useForwardHeader && !isModal) {
            return (
                <XHorizontal
                    alignItems="center"
                    alignSelf="flex-start"
                    justifyContent={isComment ? 'flex-end' : 'flex-end'}
                    width={83}
                    flexShrink={0}
                    separator={5}
                    className="menu-wrapper"
                >
                    <XView paddingTop={isComment ? 24 : 0}>
                        <XHorizontal alignItems="center" separator={8}>
                            {isComment && (
                                <CommentReactionButton
                                    hover={hover}
                                    id={message.id!}
                                    reactions={message.reactions}
                                />
                            )}
                            {!isComment && hover && (
                                <MessageReactionButton messageId={message.id!} />
                            )}
                            {hover && !isComment && !isChannel && (
                                <IconButton onClick={setReplyMessages}>
                                    <ReplyIcon />
                                </IconButton>
                            )}
                            {hover && !isComment && out && message.text && (
                                <IconButton onClick={setEditMessage}>
                                    <EditIcon />
                                </IconButton>
                            )}
                            {hover && !isComment && (
                                <CommentsIconWrapper
                                    onClick={() => {
                                        openCommentsModal({
                                            router,
                                            messageId: message.id!!,
                                            conversationId,
                                        });
                                    }}
                                >
                                    <CommentIcon />
                                </CommentsIconWrapper>
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
