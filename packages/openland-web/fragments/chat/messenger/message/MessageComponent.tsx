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
import { TextCaption, TextLabel1 } from 'openland-web/utils/TextStyles';
import { useLayout } from 'openland-unicorn/components/utils/LayoutContext';
import { useCaptionPopper } from 'openland-web/components/CaptionPopper';
import { useUserPopper } from 'openland-web/components/UserPopper';

const senderContainer = css`
    display: flex;
    align-items: baseline;

    a:hover {
        text-decoration: none;
    }
`;

const senderNameStyle = css`
    color: #171b1f; // ThemeDefault.foregroundPrimary
`;

const senderOrgAndDateStyle = css`
    margin-left: 8px;
    color: #676d7a; // ThemeDefault.foregroundSecondary
`;

const senderBadgeStyle = css`
    display: flex;
    align-items: center;
    justify-content: center;
    align-self: center;
    cursor: pointer;
    margin-left: 4px;
`;

const botBadgeStyle = css`
    align-self: center;
    font-size: 11px;
    line-height: 13px;
    font-weight: 600;
    color: #248bf2;
    text-align: center;
    padding: 2px 5px;
    border-radius: 4px;
    background-color: #e7f3ff;
    margin-left: 8px;
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

const MessageSenderBadge = (props: { senderBadgeNameEmojify: string | JSX.Element }) => {
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
        className={cx(TextCaption, senderOrgAndDateStyle)}
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
        {props.sender.isBot && <div className={botBadgeStyle}>BOT</div>}
        {props.senderBadgeNameEmojify && (
            <MessageSenderBadge senderBadgeNameEmojify={props.senderBadgeNameEmojify} />
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
    padding: 4px;
    border-radius: 8px;
    margin: 4px 0;
    align-self: center;
    width: 100%;

    &:hover .hover-menu-container {
        opacity: 1;
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

// Message container seleciton
const messageContainerSelectedClass = css`
    background-color: #f0f2f5; // ThemeDefault.backgroundTertiary

    .message-buttons-wrapper,
    .message-rich-wrapper,
    .message-document-wrapper {
        background-color: #fff; // ThemeDefault.backgroundPrimary
    }

    .hover-menu-container {
        background-color: #f0f2f5; // ThemeDefault.backgroundTertiary
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
    const layout = useLayout();

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
            fallback={message.fallback}
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
            className={cx(messageContainerClass, attachesClassNames, noBorderRadiusMobile)}
        >
            <div className={messageContentClass}>
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
