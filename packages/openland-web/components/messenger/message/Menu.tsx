import * as React from 'react';
import { XView } from 'react-mental';
import Glamorous from 'glamorous';
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
import { XButton } from 'openland-x/XButton';
import { showModalBox } from 'openland-x/showModalBox';
import { IsActiveContext } from 'openland-web/pages/main/mail/components/Components';

const DeleteMessageButton = ({ msgId, onSuccess }: { msgId: string; onSuccess: () => void }) => {
    const client = useClient();
    const pinMessage = async () => await client.mutateRoomDeleteMessages({ mids: [msgId] });

    return (
        <XMutation mutation={pinMessage as MutationFunc} onSuccess={onSuccess}>
            <XButton text="Delete" style="danger" />
        </XMutation>
    );
};

function ShowDeleteMessageModal(msgId: string) {
    showModalBox({}, ctx => (
        <XView borderRadius={8} overflow="hidden">
            <XView paddingHorizontal={24}>
                <XView
                    fontSize={18}
                    fontWeight="600"
                    color="rgba(0, 0, 0, 0.9)"
                    height={64}
                    alignItems="center"
                    flexDirection="row"
                    flexShrink={0}
                >
                    Delete message
                </XView>
                <XView paddingTop={6} paddingBottom={24}>
                    Delete selected messages for everyone? This cannot be undone.
                </XView>
            </XView>
            <XView height={1} flexShrink={0} backgroundColor="rgb(236, 236, 236)" />
            <XView
                paddingHorizontal={24}
                backgroundColor="rgb(249, 249, 249)"
                height={64}
                flexShrink={0}
                flexDirection="row"
                alignItems="center"
                justifyContent="flex-end"
            >
                <XHorizontal separator={6}>
                    <DeleteMessageButton msgId={msgId} onSuccess={ctx.hide} />
                    <XButton text="Cancel" style="ghost" onClick={ctx.hide} />
                </XHorizontal>
            </XView>
        </XView>
    ));
}

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

const PinButtonStyle = Glamorous(XButton)({
    fontSize: 14,
    lineHeight: '24px',
    padding: '7px 0 9px',
    fontWeight: 400,
    textAlign: 'left',
    justifyContent: 'flex-start',
    height: 40,
    backgroundColor: '#fff',
    color: '#000',
    borderRadius: 0,
    transition: 'none',
    '&:hover, &:active': {
        backgroundColor: 'rgba(23, 144, 255, 0.05)',
        color: '#1790ff',
    },
    '& > div': {
        padding: '0 16px',
        justifyContent: 'flex-start',
    },
});

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
            <PinButtonStyle text="Pin" />
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
        selectMessage,
        room,
    }: MenuProps) => {
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

        const out = message.isOut;

        const sharedRoom =
            room && room.__typename === 'SharedRoom' ? (room as RoomChat_room_SharedRoom) : null;
        let pinMessageAccess = sharedRoom && sharedRoom.canEdit && !message.isService;
        if (room && room.__typename === 'PrivateRoom') {
            pinMessageAccess = true;
        }
        const isChannel = sharedRoom && sharedRoom.isChannel;

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
                    <XView paddingTop={isComment ? 24 : 0} flexShrink={0}>
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
                                    content={
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
                                                    onClick={() =>
                                                        ShowDeleteMessageModal(message.id!!)
                                                    }
                                                >
                                                    Delete
                                                </XMenuItem>
                                            )}
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
