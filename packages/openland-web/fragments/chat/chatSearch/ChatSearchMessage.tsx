import * as React from 'react';
import { XViewRouterContext } from 'react-mental';
import { css, cx } from 'linaria';
import { buildBaseImageUrl } from 'openland-y-utils/photoRefUtils';
import { ConversationEngine } from 'openland-engines/messenger/ConversationEngine';
import { DataSourceWebMessageItem } from '../messenger/data/WebMessageItemDataSource';
import { MessageContent } from '../messenger/message/MessageContent';
import { UAvatar } from 'openland-web/components/unicorn/UAvatar';
import { MessageSenderContent, MessageTimeShort } from '../messenger/message/MessageComponent';
import { usePopper } from 'openland-web/components/unicorn/usePopper';
import { XLoader } from 'openland-x/XLoader';
import { MentionedUserPopperContent } from 'openland-web/components/EntityPopperContent';

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

    &:hover {
        cursor: pointer;
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
`;

interface MessageComponentProps {
    message: DataSourceWebMessageItem;
    engine: ConversationEngine;
}

export const ChatSearchMessage = React.memo((props: MessageComponentProps) => {
    const { message } = props;
    const containerRef = React.useRef<HTMLDivElement>(null);
    const router = React.useContext(XViewRouterContext);

    const attachesClassNames = cx(
        message.attachTop && 'message-attached-top',
        message.attachBottom && 'message-attached-bottom',
    );

    const attachesClassNamesRef = React.useRef(attachesClassNames);
    attachesClassNamesRef.current = attachesClassNames;

    const onSelect = React.useCallback(() => {
        if (router) {
            router.navigate('/message/' + message.id);
        }
    }, [router, message]);

    const Avatar = () => {
        const [, show] = usePopper(
            {
                placement: 'top',
                hideOnLeave: true,
                useObserve: true,
                borderRadius: 8,
                scope: 'entity-popper',
                useWrapper: false,
                showTimeout: 400,
                hideOnChildClick: false,
                hideOnClick: false,
            },
            (ctx) => (
                <React.Suspense fallback={<XLoader loading={true} transparentBackground={true} />}>
                    <MentionedUserPopperContent
                        userId={message.sender.id}
                        hide={ctx.hide}
                        noCardOnMe={false}
                    />
                </React.Suspense>
            ),
        );

        return (
            <div className={messageAvatarWrapper} onMouseEnter={show}>
                <UAvatar
                    id={message.sender.id}
                    photo={message.overrideAvatar
                        ? buildBaseImageUrl(message.overrideAvatar)
                        : message.sender.photo}
                    title={message.overrideName || message.sender.name}
                    titleEmoji={message.senderNameEmojify}
                />
            </div>
        );
    };

    const sender = (
        <MessageSenderContent
            sender={message.sender}
            date={message.date}
            overrideName={message.overrideName}
            mId={message.id}
        />
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

    return (
        <div
            ref={containerRef}
            onClick={onSelect}
            className={cx(
                messageContainerClass,
                attachesClassNames,
            )}
        >
            <div className={messageContentClass}>
                <div className={messageInnerContainerClass}>
                    {!message.attachTop && <Avatar />}
                    {message.attachTop && <MessageTimeShort mId={message.id} date={message.date} />}
                    <div
                        className={cx(
                            messageContentAreaClass,
                            message.attachTop && attachMessageContentAreaClass,
                        )}
                    >
                        {!message.attachTop && sender}

                        <div className={contentContainer}>
                            {content}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
});
