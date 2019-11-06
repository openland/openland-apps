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
import { UserShort_primaryOrganization, UserShort } from 'openland-api/Types';
import { HoverMenu } from './Menu/HoverMenu';
import { ULink } from 'openland-web/components/unicorn/ULink';
import { TextCaption, TextLabel1, TextDensed } from 'openland-web/utils/TextStyles';
import { useLayout } from 'openland-unicorn/components/utils/LayoutContext';
import { useCaptionPopper } from 'openland-web/components/CaptionPopper';
import { useUserPopper } from 'openland-web/components/UserPopper';
import { defaultHover } from 'openland-web/utils/Styles';

const senderContainer = css`
    display: flex;
    align-items: baseline;

    a:hover {
        text-decoration: none;
    }
`;

const senderNameStyle = css`
    color: var(--foregroundPrimary);
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

const senderOrgAndDateStyle = css`
    margin-left: 8px;
    color: var(--foregroundSecondary);

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
        className={cx(TextDensed, senderOrgAndDateStyle, defaultHover)}
    >
        {props.organization.name}
    </ULink>
);

const MessageTime = (props: { time: number }) => (
    <div className={cx(TextCaption, senderOrgAndDateStyle)}>{formatTime(props.time)}</div>
);

interface MessageSenderContentProps {
    sender: UserShort;
    senderNameEmojify?: string | JSX.Element;
    senderBadgeNameEmojify?: string | JSX.Element;
    date: number;
}

export const MessageSenderContent = (props: MessageSenderContentProps) => (
    <div className={senderContainer}>
        <MessageSenderName sender={props.sender} senderNameEmojify={props.senderNameEmojify} />
        {props.sender.isBot && <span className={cx(TextDensed, senderOrgAndDateStyle)}>Bot</span>}
        {props.senderBadgeNameEmojify && (
            <MessageSenderFeatured senderBadgeNameEmojify={props.senderBadgeNameEmojify} />
        )}
        {props.sender.primaryOrganization && (
            <MessageSenderOrg organization={props.sender.primaryOrganization} />
        )}
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
    justify-content: space-between;
    align-items: center;
    padding: 4px 0;
    border-radius: 12px;
    align-self: center;
    width: calc(100% - 32px);

    border: 4px solid var(--backgroundPrimary);

    @media (max-width: 1282px) {
        padding: 4px 16px;
        width: 100%;
        border-radius: 0;
    }

    &:hover .hover-menu-container,
    &:hover .message-date {
        opacity: 1;
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

                &:before {
                    content: '';
                    position: absolute;
                    top: -16px;
                    left: 0;
                    width: 100%;
                    height: 23px;
                    background: var(--backgroundTertiary);
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

interface MessageComponentProps {
    message: DataSourceWebMessageItem;
    engine: ConversationEngine;
}

export const MessageComponent = React.memo((props: MessageComponentProps) => {
    const { message, engine } = props;
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
        props.engine.messagesActionsStateEngine.listenSelect(props.message, selected => {
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
    const onSelect = React.useCallback(
        () => {
            let selection = window.getSelection();
            if (selection && layout !== 'mobile') {
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
            sticker={message.sticker}
            fallback={message.fallback}
            isOut={message.isOut}
            attachTop={message.attachTop}
            chatId={message.chatId}
            sender={message.sender}
            senderNameEmojify={message.senderNameEmojify}
            date={message.date}
        />
    );

    const buttons = (
        <div className={buttonsClass}>
            <MessageReactions
                messageId={message.id}
                reactions={message.reactions}
                reactionsReduced={message.reactionsReducedEmojify}
                reactionsLabel={message.reactionsLabelEmojify}
            />
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
            sender={message.sender}
            senderNameEmojify={message.senderNameEmojify}
            senderBadgeNameEmojify={message.senderBadgeNameEmojify}
            date={message.date}
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
                    {!message.attachTop && avatar}
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
                        {content}
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
