import * as React from 'react';
import { FullMessage_GeneralMessage_attachments_MessageAttachmentFile } from 'openland-api/Types';
import { CommentReactionButton, MessageReactionButton } from './reactions/ReactionButton';
import ReplyIcon from 'openland-icons/ic-reply1.svg';
import EditIcon from 'openland-icons/ic-edit.svg';
import { XHorizontal } from 'openland-x-layout/XHorizontal';
import Glamorous from 'glamorous';
import { DataSourceWebMessageItem } from '../data/WebMessageItemDataSource';
import { MessagesStateContext } from '../../messenger/MessagesStateContext';
import { XView } from 'react-mental';

const IconButton = Glamorous.div({
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 6,
    '&:hover svg path:last-child': {
        fill: '#1790ff',
        opacity: 1,
    },
});

export const Menu = ({
    hover,
    message,
    isModal,
    hasComments,
    isChannel,
    isComment,
}: {
    message: DataSourceWebMessageItem;
    hasComments: boolean;
    isModal: boolean;
    isComment: boolean;
    isChannel: boolean;
    hover: boolean;
}) => {
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
                justifyContent={isComment ? 'flex-end' : 'flex-start'}
                width={83}
                flexShrink={0}
                separator={5}
                className="menu-wrapper"
            >
                <XView paddingTop={isComment ? 24 : 0}>
                    <XHorizontal alignItems="center" separator={8}>
                        {!hasComments && isComment && (
                            <CommentReactionButton
                                hover={hover}
                                id={message.id!}
                                reactions={message.reactions}
                            />
                        )}
                        {!hasComments && !isComment && hover && (
                            <MessageReactionButton messageId={message.id!} />
                        )}
                        {hover && !isChannel && (
                            <IconButton onClick={setReplyMessages}>
                                <ReplyIcon />
                            </IconButton>
                        )}
                        {hover && !isComment && out && message.text && (
                            <IconButton onClick={setEditMessage}>
                                <EditIcon />
                            </IconButton>
                        )}
                    </XHorizontal>
                </XView>
            </XHorizontal>
        );
    } else {
        return null;
    }
};
