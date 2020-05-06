import * as React from 'react';
import { DataSourceWebMessageItem } from '../data/WebMessageItemDataSource';
import { MessageReactions } from './reactions/MessageReactions';
import { MessageContent } from './MessageContent';
import { MAvatar } from './MAvatar';
import { css, cx } from 'linaria';
import { ConversationEngine } from 'openland-engines/messenger/ConversationEngine';
import { MessageCommentsButton } from './comments/MessageCommentsButton';
import StarIcon from 'openland-icons/s/ic-star-16.svg';
import { formatTime } from 'openland-y-utils/formatTime';
import { UserShort_primaryOrganization, UserShort } from 'openland-api/spacex.types';
import { HoverMenu } from './Menu/HoverMenu';
import { ULink } from 'openland-web/components/unicorn/ULink';
import { TextCaption, TextLabel1, TextDensed } from 'openland-web/utils/TextStyles';
import { useLayout } from 'openland-unicorn/components/utils/LayoutContext';
import { useCaptionPopper } from 'openland-web/components/CaptionPopper';
import { useUserPopper } from 'openland-web/components/EntityPoppers';
import { defaultHover } from 'openland-web/utils/Styles';
import { XView } from 'react-mental';

import IcPending from 'openland-icons/s/ic-pending-16.svg';
import IcSuccess from 'openland-icons/s/ic-success-16.svg';
import { isPendingAttach } from 'openland-engines/messenger/ConversationEngine';

const senderContainer = css`
    display: flex;
    align-items: baseline;

    a:hover {
        text-decoration: none;
    }
`;

const senderNameStyle = css`
    color: var(--foregroundPrimary);
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
`;

const dateStyle = css`
    width: 56px;
    opacity: 0;
    color: var(--foregroundTertiary);
    position: relative;
    flex-shrink: 0;

    span {
        position: absolute;
        top: 4px;
        right: 16px;
        white-space: nowrap;

        @media (max-width: 1280px) {
            right: 8px;
        }
    }
`;

const senderDateStyle = css`
    flex-shrink: 0;
    margin-left: 8px;
    color: var(--foregroundSecondary);
`;

const senderOrgStyle = css`
    flex-shrink: 1;
    margin-left: 8px;
    color: var(--foregroundSecondary);
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    &:hover {
        color: var(--foregroundSecondary);
    }
`;

const senderBadgeStyle = css`
    display: flex;
    align-items: center;
    justify-content: center;
    align-self: center;
    cursor: pointer;
    margin-left: 4px;
`;

const MessageSenderName = (props: {
    sender: UserShort;
    senderNameEmojify?: string | JSX.Element;
}) => {
    const [show] = useUserPopper({
        user: props.sender,
        isMe: props.sender.isYou,
        noCardOnMe: false,
    });
    return (
        <ULink
            path={`/${props.sender.shortname || props.sender.id}`}
            className={cx(TextLabel1, senderNameStyle)}
        >
            <span onMouseEnter={show}>{props.senderNameEmojify || props.sender.name}</span>
        </ULink>
    );
};

const MessageSenderFeatured = (props: { senderBadgeNameEmojify: string | JSX.Element }) => {
    const [show] = useCaptionPopper({ text: props.senderBadgeNameEmojify });
    return (
        <div className={senderBadgeStyle} onMouseEnter={show}>
            <StarIcon />
        </div>
    );
};

const MessageSenderOrg = (props: { organization: UserShort_primaryOrganization }) => (
    <ULink
        path={`/${props.organization.shortname || props.organization.id}`}
        className={cx(TextDensed, senderOrgStyle, defaultHover)}
    >
        {props.organization.name}
    </ULink>
);

const MessageTime = (props: { time: number }) => (
    <div className={cx(TextCaption, senderDateStyle)}>{formatTime(props.time)}</div>
);

interface MessageSenderContentProps {
    sender: UserShort;
    senderNameEmojify?: string | JSX.Element;
    senderBadgeNameEmojify?: string | JSX.Element;
    date?: number;
}

export const MessageSenderContent = (props: MessageSenderContentProps) => (
    <div className={senderContainer}>
        <MessageSenderName sender={props.sender} senderNameEmojify={props.senderNameEmojify} />
        {props.sender.isBot && <span className={cx(TextDensed, senderDateStyle)}>Bot</span>}
        {props.senderBadgeNameEmojify && (
            <MessageSenderFeatured senderBadgeNameEmojify={props.senderBadgeNameEmojify} />
        )}
        {props.sender.primaryOrganization && (
            <MessageSenderOrg organization={props.sender.primaryOrganization} />
        )}
        {props.date && <MessageTime time={props.date} />}
    </div>
);

////
// Message container
////
const messageContainerClass = css`
    position: relative;
    display: flex;
    flex-direction: row;
    flex-grow: 1;
    justify-content: space-between;
    align-items: center;
    padding: 4px 0;
    border-radius: 8px;
    align-self: center;
    width: calc(100% - 32px);

    @media (max-width: 1282px) {
        padding: 4px 16px;
        width: 100%;
        border-radius: 0;
        border-left: none;
        border-right: none;
    }

    &:hover .hover-menu-container,
    &:hover .message-date {
        opacity: 1;
    }

    &:not(.message-attached-top) {
        margin-top: 4px;

        /* clickable area for margin */
        &:before {
            display: block;
            content: '';
            width: 100%;
            height: 8px;

            position: absolute;
            left: 0;
            top: -8px;
        }
    }

    &:not(.message-attached-bottom) {
        margin-bottom: 4px;
    }

    &.message-selected {
        background-color: var(--backgroundTertiary);

        .message-buttons-wrapper,
        .message-rich-wrapper,
        .message-document-wrapper {
            background-color: var(--backgroundPrimary);
        }

        .hover-menu-container {
            background-color: var(--backgroundTertiary);
        }

        @media (min-width: 751px) {
            & + .message-selected.message-attached-top {
                position: relative;

                border-top-left-radius: 0;
                border-top-right-radius: 0;

                &:before {
                    display: block;
                    content: '';
                    width: 15px;
                    height: 15px;

                    background-color: var(--backgroundTertiary);
                    position: absolute;
                    left: 0;
                    top: -15px;
                }

                &:after {
                    display: block;
                    content: '';
                    width: 15px;
                    height: 15px;

                    background-color: var(--backgroundTertiary);
                    position: absolute;
                    right: 0;
                    top: -15px;
                }
            }
        }
    }
`;

const messageContentClass = css`
    display: flex;
    flex-direction: row;
    flex-grow: 1;
    flex-shrink: 1;
    justify-content: center;
    align-items: center;
    max-width: 870px;
    margin: auto;
`;

const messageInnerContainerClass = css`
    position: relative;
    display: flex;
    flex-direction: row;
    max-width: 792px;
    flex-grow: 1;
    justify-content: start;
    align-items: start;
`;

////
// Message content
////
const buttonsClass = css`
    margin-top: 4px;
    display: flex;
    flex-direction: row;
    padding: 4px 0;
`;

const messageContentAreaClass = css`
    display: flex;
    flex-direction: column;
    padding-left: 16px;
    flex-grow: 1;
`;

const attachMessageContentAreaClass = css`
    padding-left: 0;
`;

const messageAvatarWrapper = css`
    padding-top: 4px;
    display: flex;
    align-items: flex-start;
    flex-direction: row;
    justify-content: center;
    flex-shrink: 0;
`;

const contentContainer = css`
    display: flex;
    flex-wrap: nowrap;
    justify-content: space-between;
    flex-shrink: 1;

    & > .x {
        flex-shrink: 1;
    }
`;
interface MessageComponentProps {
    message: DataSourceWebMessageItem;
    engine: ConversationEngine;
}

export const MessageComponent = React.memo((props: MessageComponentProps) => {
    const { engine, message } = props;
    const containerRef = React.useRef<HTMLDivElement>(null);
    const layout = useLayout();

    const attachesClassNames = cx(
        message.attachTop && 'message-attached-top',
        message.attachBottom && 'message-attached-bottom',
    );

    const attachesClassNamesRef = React.useRef(attachesClassNames);
    attachesClassNamesRef.current = attachesClassNames;

    const selectedRef = React.useRef(false);

    React.useEffect(() => {
        return engine.messagesActionsStateEngine.listenSelect(message, (selected) => {
            selectedRef.current = selected;

            if (containerRef.current) {
                containerRef.current.className = cx(
                    messageContainerClass,
                    attachesClassNamesRef.current,
                    selected && 'message-selected',
                );
            }
        });
    }, []);
    const onSelect = React.useCallback(() => {
        let selection = window.getSelection();
        if (selection && layout !== 'mobile') {
            let range = selection.getRangeAt(0);
            if (range.startOffset !== range.endOffset) {
                return;
            }
        }
        engine.messagesActionsStateEngine.selectToggle(message);
    }, [message.id]);

    const buttons = (
        <div className={buttonsClass}>
            <MessageReactions message={message} engine={engine} />
            <MessageCommentsButton message={message} isChannel={engine.isChannel || false} />
        </div>
    );

    const Avatar = () => {
        const [show] = useUserPopper({
            user: message.sender,
            isMe: message.sender.isYou,
            noCardOnMe: false,
        });

        return (
            <div className={messageAvatarWrapper} onMouseEnter={show}>
                <MAvatar
                    senderPhoto={message.senderPhoto}
                    senderNameEmojify={message.senderNameEmojify}
                    senderName={message.senderName}
                    senderId={message.senderId}
                />
            </div>
        );
    };

    const sender = (
        <MessageSenderContent
            sender={message.sender}
            senderNameEmojify={message.senderNameEmojify}
            senderBadgeNameEmojify={message.senderBadgeNameEmojify}
            date={message.date}
        />
    );

    const [isSendingShown, setSendingShown] = React.useState<boolean>(false);
    const [hadLag, setLag] = React.useState<boolean>(false);
    const [isSentShown, setSentShown] = React.useState<boolean>(false);

    React.useEffect(() => {
        const timeout = setTimeout(() => {
            if (message.isSending) {
                setSendingShown(true);
                setLag(true);
            }
        }, 500);

        return () => {
            clearInterval(timeout);
            setSendingShown(false);
        };
    }, [message.isSending]);

    React.useEffect(() => {
        if (hadLag) {
            setSentShown(true);
        }

        const timeout = setTimeout(() => {
            setSentShown(false);
        }, 250);

        return () => clearInterval(timeout);
    }, [hadLag]);

    const content = (
        <MessageContent
            id={message.id}
            text={message.text}
            textSpans={message.textSpans}
            edited={message.isEdited}
            reply={message.replyWeb}
            attachments={message.attachments}
            sticker={message.sticker}
            fallback={message.fallback}
            isOut={message.isOut}
            attachTop={message.attachTop}
            chatId={message.chatId}
            sender={message.sender}
            senderNameEmojify={message.senderNameEmojify}
            date={message.date}
            fileProgress={message.progress}
            isPending={isPendingAttach(message)}
        />
    );

    return (
        <div
            ref={containerRef}
            onClick={onSelect}
            className={cx(
                messageContainerClass,
                attachesClassNames,
                selectedRef.current && 'message-selected',
            )}
        >
            <div className={messageContentClass}>
                <div className={messageInnerContainerClass}>
                    {!message.attachTop && <Avatar />}
                    {message.attachTop && (
                        <div className={cx(dateStyle, 'message-date')}>
                            <span className={TextCaption}>{formatTime(message.date)}</span>
                        </div>
                    )}
                    <div
                        className={cx(
                            messageContentAreaClass,
                            message.attachTop && attachMessageContentAreaClass,
                        )}
                    >
                        {!message.attachTop && sender}

                        <div className={contentContainer}>
                            {content}
                            <XView marginHorizontal={24} width={16} height={16}>
                                {isSendingShown && !isSentShown && <IcPending />}
                                {isSentShown && !isSendingShown && <IcSuccess />}
                            </XView>
                        </div>
                        {(message.commentsCount > 0 ||
                            engine.isChannel ||
                            message.reactions.length > 0) &&
                            buttons}
                    </div>
                    {layout !== 'mobile' && <HoverMenu message={message} engine={engine} />}
                </div>
            </div>
        </div>
    );
});
