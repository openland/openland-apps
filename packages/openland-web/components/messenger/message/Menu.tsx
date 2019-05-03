import * as React from 'react';
import { XView } from 'react-mental';
import { css } from 'linaria';
import {
    FullMessage_GeneralMessage_attachments_MessageAttachmentFile,
    RoomChat_room,
    RoomChat_room_SharedRoom,
} from 'openland-api/Types';
import { CommentReactionButton, MessageReactionButton } from './reactions/ReactionButton';
import CommentIcon from 'openland-icons/ic-comment-channel.svg';
import { XHorizontal } from 'openland-x-layout/XHorizontal';
import { DataSourceWebMessageItem } from '../data/WebMessageItemDataSource';
import { MessagesStateContext } from '../MessagesStateContext';
import { XRouterContext } from 'openland-x-routing/XRouterContext';
import { openCommentsModal } from 'openland-web/components/messenger/message/content/comments/CommentsModalInner';
import { XOverflow, XOverflowDefalutTarget } from 'openland-web/components/XOverflow';
import { XMenuItem } from 'openland-x/XMenuItem';
import { XMutation } from 'openland-x/XMutation';
import { useClient } from 'openland-web/utils/useClient';
import { MutationFunc } from 'react-apollo';

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

const PinMessageButton = ({
    variables,
    onSuccess,
}: {
    variables: { chatId: string; messageId: string };
    onSuccess: () => void;
}) => {
    const client = useClient();
    const pinMessage = async () => await client.mutatePinMessage(variables);

    return (
        <XMutation mutation={pinMessage as MutationFunc} onSuccess={onSuccess}>
            <XMenuItem>Pin</XMenuItem>
        </XMutation>
    );
};

interface MenuProps {
    conversationId: string;
    message: DataSourceWebMessageItem;
    isModal: boolean;
    isComment: boolean;
    hover: boolean;
    selectMessage: () => void;
    room?: RoomChat_room;
}

export const Menu = React.memo(
    ({ conversationId, hover, message, isModal, isComment, selectMessage, room }: MenuProps) => {
        let router = React.useContext(XRouterContext)!;
        let [showMenu, setShowMenu] = React.useState<boolean>(false);

        const messagesContext = React.useContext(MessagesStateContext);
        const setEditMessage = (e: any) => {
            if (!message.isSending) {
                e.stopPropagation();
                messagesContext.resetAll();
                messagesContext.setEditMessage(message.id!, message.text!);
            }
        };

        React.useEffect(
            () => {
                if (!hover) {
                    setShowMenu(false);
                }
            },
            [hover],
        );

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

        const sharedRoom =
            room && room.__typename === 'SharedRoom' ? (room as RoomChat_room_SharedRoom) : null;
        const pinMessageAccess = out && sharedRoom && sharedRoom.canEdit && !message.isService;

        if (!message.isSending && !messagesContext.useForwardHeader && !isModal) {
            return (
                <XHorizontal
                    alignItems="center"
                    alignSelf="flex-start"
                    justifyContent={isComment ? 'flex-end' : 'flex-end'}
                    width={85}
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
                            {!isComment &&
                                hover && (
                                    <MessageReactionButton
                                        messageId={message.id!}
                                    />
                                )}
                            {hover &&
                                !isComment && (
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
                            {hover && (
                                <XOverflow
                                    show={showMenu}
                                    placement="bottom-end"
                                    useCustomTarget={true}
                                    target={
                                        <XOverflowDefalutTarget
                                            onClick={() => setShowMenu(!showMenu)}
                                            active={showMenu}
                                            marginLeft={0}
                                            flat={true}
                                        />
                                    }
                                    content={
                                        <>
                                            {out && (
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
                                                onClick={() => {
                                                    setShowMenu(false);
                                                    selectMessage();
                                                    messagesContext.forwardMessages();
                                                }}
                                            >
                                                Forward
                                            </XMenuItem>
                                            <XMenuItem
                                                onClick={(e: any) => {
                                                    setReplyMessages(e);
                                                    setShowMenu(false);
                                                }}
                                            >
                                                Reply
                                            </XMenuItem>
                                            <XMenuItem
                                                onClick={() => {
                                                    selectMessage();
                                                    setShowMenu(false);
                                                }}
                                            >
                                                Select
                                            </XMenuItem>
                                            {pinMessageAccess &&
                                                message.id &&
                                                room && (
                                                    <PinMessageButton
                                                        variables={{
                                                            chatId: room.id,
                                                            messageId: message.id,
                                                        }}
                                                        onSuccess={() => setShowMenu(false)}
                                                    />
                                                )}
                                            {/*<XMenuItem style="danger">Delete</XMenuItem>*/}
                                        </>
                                    }
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
