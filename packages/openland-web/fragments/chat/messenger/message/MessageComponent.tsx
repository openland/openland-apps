import * as React from 'react';
import { DataSourceWebMessageItem } from '../data/WebMessageItemDataSource';
import { MessageReactions } from './reactions/MessageReactions';
import { MessageContent } from './MessageContent';
import { MAvatar } from './MAvatar';
import { css, cx } from 'linaria';
import { ConversationEngine } from 'openland-engines/messenger/ConversationEngine';
import { MessageCommentsButton } from './comments/MessageCommentsButton';
import { formatTime } from 'openland-y-utils/formatTime';
import { UserShort_primaryOrganization } from 'openland-api/Types';
import { HoverMenu } from './Menu/HoverMenu';

const senderContainer = css`
    display: flex;
    align-items: center;
`;

const senderNameStyle = css`
    font-size: 15px;
    font-weight: 600;
    line-height: 24px;
    color: #171b1f; // ThemeDefault.foregroundPrimary
`;

const senderOrgAndDateStyle = css`
    font-size: 13px;
    line-height: 18px;
    margin-left: 8px;
    color: #676d7a; // ThemeDefault.foregroundSecondary
`;

const MessageSenderName = (props: { name: string | JSX.Element }) => (
    <div className={senderNameStyle}>{props.name}</div>
);

const MessageSenderOrg = (props: { org: string }) => (
    <div className={senderOrgAndDateStyle}>{props.org}</div>
);

const MessageTime = (props: { time: number }) => (
    <div className={senderOrgAndDateStyle}>{formatTime(props.time)}</div>
);

interface MessageSenderContentProps {
    name?: string | JSX.Element;
    org: UserShort_primaryOrganization | null;
    date: number;
}

export const MessageSenderContent = (props: MessageSenderContentProps) => (
    <div className={senderContainer}>
        {props.name && <MessageSenderName name={props.name} />}
        {props.org && <MessageSenderOrg org={props.org.name} />}
        <MessageTime time={props.date} />
    </div>
);

////
// Message container
////
const messageContainerClass = css`
    display: flex;
    flex-direction: row;
    flex-grow: 1;
    justify-content: center;
    align-items: center;
    padding: 4px 8px;
    border-radius: 8px;
    margin: 4px 0;
    max-width: 880px;
    align-self: center;
    width: 100%;

    &:hover .hover-menu-button {
        opacity: 1;
        transform: translateX(0);
    }
`;

const messageInnerContainerClass = css`
    display: flex;
    flex-direction: row;
    max-width: 950px;
    flex-grow: 1;
    justify-content: start;
    align-items: start;
`;

// Message container seleciton
const messageContainerSelectedClass = css`
    background-color: #f0f2f5; // ThemeDefault.backgroundTertiary

    .message-buttons-wrapper,
    .message-rich-wrapper,
    .message-document-wrapper {
        background-color: #fff; // ThemeDefault.backgroundPrimary
    }
`;

const attachTop = css`
    margin-top: 0;
    border-top-left-radius: 0;
    border-top-right-radius: 0;
`;

const attachBottom = css`
    margin-bottom: 0;
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
`;

const noBorderRadiusMobile = css`
    @media (max-width: 750px) {
        border-radius: 0;
    }
`;

////
// Message content
////
const buttonsClass = css`
    margin-top: 8px;
    display: flex;
    flex-direction: row;
`;

const messageContentAreaClass = css`
    display: flex;
    flex-direction: column;
    padding-left: 16px;
    flex-grow: 1;
`;

const messageAvatarWrapper = css`
    padding-top: 6px;
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
        message.attachTop && attachTop,
        message.attachBottom && attachBottom,
    );

    React.useEffect(() => {
        props.engine.messagesActionsStateEngine.listenSelect(props.message, selected => {
            if (containerRef.current) {
                containerRef.current.className = cx(
                    messageContainerClass,
                    attachesClassNames,
                    noBorderRadiusMobile,
                    selected && messageContainerSelectedClass,
                );
            }
        });
    }, []);
    const onSelect = React.useCallback(
        () => {
            let selection = window.getSelection();
            if (selection) {
                let range = selection.getRangeAt(0);
                if (range.startOffset !== range.endOffset) {
                    return;
                }
            }
            props.engine.messagesActionsStateEngine.selectToggle(props.message);
        },
        [message.id],
    );

    const content = (
        <MessageContent
            id={message.id}
            text={message.text}
            textSpans={message.textSpans}
            edited={message.isEdited}
            reply={message.replyWeb}
            attachments={message.attachments}
            fallback={message.fallback}
        />
    );

    const buttons = (
        <div className={buttonsClass}>
            <MessageReactions messageId={message.id} reactions={message.reactions} />
            <MessageCommentsButton message={message} isChannel={engine.isChannel || false} />
        </div>
    );

    const avatar = (
        <div className={messageAvatarWrapper}>
            <MAvatar
                senderPhoto={message.senderPhoto}
                senderNameEmojify={message.senderNameEmojify}
                senderName={message.senderName}
                senderId={message.senderId}
            />
        </div>
    );

    const sender = (
        <MessageSenderContent
            name={message.senderNameEmojify}
            org={message.sender.primaryOrganization}
            date={message.date}
        />
    );

    return (
        <div
            ref={containerRef}
            onClick={onSelect}
            className={cx(messageContainerClass, attachesClassNames, noBorderRadiusMobile)}
        >
            <div className={messageInnerContainerClass}>
                {!message.attachTop && avatar}
                <div
                    className={cx(
                        messageContentAreaClass,
                        message.attachTop && noAvatarPlaceholder,
                    )}
                >
                    {!message.attachTop && sender}
                    {content}
                    {(message.commentsCount > 0 || engine.isChannel || message.reactions.length > 0) && buttons}
                </div>
            </div>

            <HoverMenu message={message} />
        </div>
    );
});
