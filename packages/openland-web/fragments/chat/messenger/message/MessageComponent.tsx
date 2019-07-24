import * as React from 'react';
import { DataSourceWebMessageItem } from '../data/WebMessageItemDataSource';
import { MessageReactions } from './reactions/MessageReactions';
import { MessageContent } from './MessageContent';
import { MAvatar } from './MAvatar';
import { css, cx } from 'linaria';
import { ConversationEngine } from 'openland-engines/messenger/ConversationEngine';
import { MessageCommentsButton } from './comments/MessageCommentsButton';
import { useMessageSelected } from 'openland-engines/messenger/MessagesActionsState';

const messageContainerClass = css`
    display: flex;
    flex-direction: row;
    flex-grow: 1;
    flex-shrink: 1;
    display: flex;
    max-width: 984px;
    padding-left: 50px;
    padding-right: 50px;
    padding-top: 4px;
    padding-bottom: 4px;
    margin: 0 16px;
    border-radius: 8px;
`;

const messageContainerSelectedClass = css`
    background-color: #F0F2F5; //ThemeDefault.backgroundTertiary
`;

const messageContainerAttachClass = css`
    margin-top: 8px;
`;

const messageAvatarWrapper = css`
    display: flex;
    align-items: flex-start;
    flex-direction: row;
    justify-content: center;
    flex-shrink: 0;
`;

const messageContentAreaClass = css`
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    padding-left: 16px;
`;

const noAvatarPlaceholder = css`
    padding-left: 56px;
`;

const buttonsClass = css`
    display: flex;
    flex-direction: row;
`;

interface MessageComponentProps {
    message: DataSourceWebMessageItem;
    engine: ConversationEngine;
}

export const MessageComponent = (props: MessageComponentProps) => {
    const { message, engine } = props;
    const [selected, toggleSelect] = useMessageSelected(engine.messagesActionsState, message);
    const onSelect = React.useCallback(toggleSelect, [message.id]);
    const content = (
        <>
            <MessageContent message={message} />
            <div className={buttonsClass}>
                <MessageReactions messageId={message.id} reactions={message.reactions} selected={selected} />
                {(engine.isChannel || message.commentsCount > 0) && message.id && (
                    <MessageCommentsButton messageId={message.id} count={message.commentsCount} selected={selected} />
                )}
            </div>
        </>
    );

    return (
        <div onClick={onSelect} className={cx(messageContainerClass, !message.attachTop && messageContainerAttachClass, selected && messageContainerSelectedClass)}>
            {!message.attachTop && (
                <div className={messageAvatarWrapper}>
                    <MAvatar
                        senderPhoto={message.senderPhoto}
                        senderNameEmojify={message.senderNameEmojify}
                        senderName={message.senderName}
                        senderId={message.senderId}
                    />
                </div>
            )}
            <div className={cx(messageContentAreaClass, message.attachTop && noAvatarPlaceholder)}>
                {props.message.senderNameEmojify}
                {content}
            </div>
        </div>
    );
};
