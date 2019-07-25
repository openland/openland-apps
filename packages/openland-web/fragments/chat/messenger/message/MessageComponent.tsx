import * as React from 'react';
import { DataSourceWebMessageItem } from '../data/WebMessageItemDataSource';
import { MessageReactions } from './reactions/MessageReactions';
import { MessageContent } from './MessageContent';
import { MAvatar } from './MAvatar';
import { css, cx } from 'linaria';
import { ConversationEngine } from 'openland-engines/messenger/ConversationEngine';
import { MessageCommentsButton } from './comments/MessageCommentsButton';

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
    border-radius: 8px;
    margin: 0 16px;
`;

const buttonsClass = css`
    display: flex;
    flex-direction: row;
`;

const messageContentAreaClass = css`
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    padding-left: 16px;
`;

const messageContainerSelectedClass = css`
    background-color: #F0F2F5; // ThemeDefault.backgroundTertiary
   
    .message-buttons-wrapper {
        background-color: #fff; // ThemeDefault.backgroundPrimary
    }
`;

const attachClass = css`
    border-top-left-radius: 0;
    border-top-right-radius: 0;
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
`;

const noAttach = css`
    margin-top: 8px;
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
    border-bottom-left-radius: 8px;
    border-bottom-right-radius: 8px;
`;

const bottomAttach = css`
    margin-top: 8px;
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
`;

const topAttach = css`
    border-top-left-radius: 0;
    border-top-right-radius: 0;
`;

const messageAvatarWrapper = css`
    display: flex;
    align-items: flex-start;
    flex-direction: row;
    justify-content: center;
    flex-shrink: 0;
`;

const noAvatarPlaceholder = css`
    padding-left: 56px;
`;

interface MessageComponentProps {
    message: DataSourceWebMessageItem;
    engine: ConversationEngine;
}

export const MessageComponent = React.memo((props: MessageComponentProps) => {
    const { message, engine } = props;
    const containerRef = React.useRef<HTMLDivElement>(null);

    const attachesClassNames = cx(
        message.attachTop && message.attachBottom && attachClass,
        !message.attachTop && !message.attachBottom && noAttach,
        !message.attachTop && message.attachBottom && bottomAttach,
        message.attachTop && !message.attachBottom && topAttach,
    );

    React.useEffect(() => {
        props.engine.messagesActionsStateEngine.listenSelect(props.message, selected => {
            if (containerRef.current) {
                containerRef.current.className = cx(
                    messageContainerClass,
                    attachesClassNames,
                    selected && messageContainerSelectedClass,
                );
            }
        });
    }, []);
    const toggleSelect = React.useCallback(() => {
        props.engine.messagesActionsStateEngine.selectToggle(props.message);
    }, []);
    const onSelect = React.useCallback(toggleSelect, [message.id]);
    const content = (
        <>
            <MessageContent
                id={message.id}
                text={message.text}
                textSpans={message.textSpans}
                edited={message.isEdited}
                reply={message.replyWeb}
                attachments={message.attachments}
                fallback={message.fallback}
            />
            <div className={buttonsClass}>
                <MessageReactions message={message} />
                <MessageCommentsButton message={message} isChannel={engine.isChannel || false} />
            </div>
        </>
    );

    return (
        <div
            ref={containerRef}
            onClick={onSelect}
            className={cx(messageContainerClass, attachesClassNames)}
        >
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
});
