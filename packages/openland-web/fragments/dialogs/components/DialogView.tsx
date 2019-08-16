import * as React from 'react';
import { css, cx } from 'linaria';
import { XView, XViewSelectedContext } from 'react-mental';
import { XDate } from 'openland-x/XDate';
import PhotoIcon from 'openland-icons/ic-photo.svg';
import FileIcon from 'openland-icons/ic-file-2.svg';
import ForwardIcon from 'openland-icons/ic-reply-2.svg';
import IcLock from 'openland-icons/s/ic-lock-16.svg';
import IcChannel from 'openland-icons/s/ic-channel-16.svg';
import IcMention from 'openland-icons/s/ic-mention-16.svg';
import { XCounter } from 'openland-x/XCounter';
import { DialogListWebItem } from './DialogListWebDataSource';
import { UAvatar } from 'openland-web/components/unicorn/UAvatar';
import { UIcon } from 'openland-web/components/unicorn/UIcon';
import { TextCaption, TextLabel1, TextDensed } from 'openland-web/utils/TextStyles';

const dialogContainer = css`
    cursor: pointer;
    display: flex;
    flex-direction: row;
    padding: 8px 16px;
    height: 80px;
    min-width: 0;
    align-items: center;

    &:hover {
        background-color: #f0f2f5;
    }
`;

const dialogActiveContainer = css`
    background-color: var(--accentMuted);

    &:hover {
        background-color: var(--accentMutedHover);
    }
`;

const dialogContentContainer = css`
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    flex-shrink: 1;
    margin-left: 16px;
    min-width: 0;
    height: 100%;
`;

const dialogIconContainer = css`
    display: flex;
    align-items: center;
    justify-content: center;
    align-self: center;
    flex-shrink: 0;
    width: 16px;
    height: 16px;
    margin-top: 2px;
`;

const dialogDataContainer = css`
    display: flex;
    flex-direction: row;
    min-width: 0;
    flex-grow: 1;
    flex-shrink: 1;
`;

const dialogTitleContent = css`
    align-items: center;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    color: #1c2229;
`;

const dialogTitle = css`
    text-overflow: ellipsis;
    overflow: hidden;
`;

const highlightSecretChatColor = css`
    color: #36b36a;
`;

const dialogDateContent = css`
    flex-shrink: 0;
    height: 18px;
    margin-left: 5px;
    white-space: nowrap;
    align-self: center;
    color: #a9aeb8;
`;

const dialogMessageContent = css`
    display: flex;
    flex-grow: 1;
    flex-shrink: 1;
    flex-basis: 0;
    height: 40px;
    min-width: 0;
    overflow: hidden;
    color: #78808f;
`;

const dialogActiveColor = css`
    color: #fff;
`;

const dialogUnreadContainer = css`
    display: flex;
    align-items: center;
    align-self: center;
`;

const unreadCounterContainer = css`
    display: flex;
    align-items: center;
    align-self: center;
    margin-left: 12px;
`;

const mentionContainer = css`
    margin-right: -6px;
`;

const iconClass = css`
    display: inline-block;
    vertical-align: top;
    margin: 2px 5px -1px 1px;

    path {
        fill: rgba(0, 0, 0, 0.3);
    }
`;

const iconActiveClass = css`
    path {
        fill: rgba(255, 255, 255, 0.9);
    }
`;

interface DialogViewProps {
    item: DialogListWebItem;
    onPress?: (id: string) => void;
    selected?: boolean;
}

export const DialogView = React.memo<DialogViewProps>(props => {
    let dialog = props.item;
    let isMuted = dialog.isMuted;
    let isService = dialog.isService;
    let haveMention = dialog.haveMention;
    let isPrivate = props.item.kind === 'PRIVATE';
    let sender = dialog.isOut ? (
        'You: '
    ) : isPrivate ? (
        ''
    ) : dialog.sender ? (
        <>{dialog.senderEmojify}: </>
    ) : (
        ''
    );
    let message: JSX.Element | null = null;

    if (dialog.typingEmojify) {
        message = <span>{dialog.typingEmojify}</span>;
    } else {
        message = <span>{dialog.fallback}</span>;
        if (dialog.message) {
            message = (
                <span>
                    {!isService && sender}
                    {dialog.messageEmojify}
                </span>
            );
        } else if (dialog.attachments && dialog.attachments.length === 1) {
            let attachment = dialog.attachments[0];
            if (attachment.__typename === 'MessageAttachmentFile') {
                if (attachment.fileMetadata.isImage) {
                    message = (
                        <span>
                            {sender}
                            <XViewSelectedContext.Consumer>
                                {active => (
                                    <PhotoIcon
                                        className={cx(iconClass, active && iconActiveClass)}
                                    />
                                )}
                            </XViewSelectedContext.Consumer>
                            Photo
                        </span>
                    );
                } else {
                    message = (
                        <span>
                            {sender}
                            <XViewSelectedContext.Consumer>
                                {active => (
                                    <FileIcon
                                        className={cx(iconClass, active && iconActiveClass)}
                                    />
                                )}
                            </XViewSelectedContext.Consumer>
                            Document
                        </span>
                    );
                }
            }
            message = message || attachment.fallback;
        } else if (dialog.forward) {
            message = (
                <span>
                    {sender}
                    <XViewSelectedContext.Consumer>
                        {active => (
                            <ForwardIcon className={cx(iconClass, active && iconActiveClass)} />
                        )}
                    </XViewSelectedContext.Consumer>
                    Forward
                </span>
            );
        }
    }

    const highlightSecretChat =
        localStorage.getItem('highlight_secret_chat') === 'true' && dialog.kind === 'GROUP';

    return (
        <XView
            selected={props.selected}
            onMouseDown={() => props.onPress && props.onPress(dialog.key)}
            linkSelectable={true}
        >
            <XViewSelectedContext.Consumer>
                {active => (
                    <div className={cx(dialogContainer, active && dialogActiveContainer)}>
                        <UAvatar
                            title={dialog.title}
                            titleEmoji={dialog.titlePlaceholderEmojify}
                            id={dialog.kind === 'PRIVATE' ? dialog.flexibleId : dialog.key}
                            photo={dialog.photo}
                            online={dialog.online}
                            size="large"
                        />
                        <div className={dialogContentContainer}>
                            <div className={dialogDataContainer}>
                                <div
                                    className={cx(
                                        TextLabel1,
                                        dialogDataContainer,
                                        dialogTitleContent,
                                        active && dialogActiveColor,
                                        highlightSecretChat && highlightSecretChatColor,
                                    )}
                                >
                                    {highlightSecretChat &&
                                        !dialog.isChannel && (
                                            <div className={dialogIconContainer}>
                                                <UIcon
                                                    icon={<IcLock />}
                                                    color={active ? '#fff' : '#36b36a'}
                                                />
                                            </div>
                                        )}
                                    {dialog.isChannel && (
                                        <div className={dialogIconContainer}>
                                            <UIcon
                                                icon={<IcChannel />}
                                                color={
                                                    active
                                                        ? '#fff'
                                                        : highlightSecretChat
                                                            ? '#36b36a'
                                                            : '#000'
                                                }
                                            />
                                        </div>
                                    )}
                                    <span className={dialogTitle}>{dialog.titleEmojify}</span>
                                </div>
                                {dialog.date && (
                                    <div
                                        className={cx(
                                            TextCaption,
                                            dialogDateContent,
                                            active && dialogActiveColor,
                                        )}
                                    >
                                        <XDate
                                            value={dialog.date.toString()}
                                            format="datetime_short"
                                        />
                                    </div>
                                )}
                            </div>
                            <div className={dialogDataContainer}>
                                <div
                                    className={cx(
                                        TextDensed,
                                        dialogMessageContent,
                                        active && dialogActiveColor,
                                    )}
                                >
                                    {message}
                                </div>
                                {dialog.unread > 0 && (
                                    <div className={dialogUnreadContainer}>
                                        {haveMention && (
                                            <div
                                                className={cx(
                                                    unreadCounterContainer,
                                                    mentionContainer,
                                                )}
                                            >
                                                <UIcon icon={<IcMention />} color={'#1885F2'} />
                                            </div>
                                        )}
                                        <div className={unreadCounterContainer}>
                                            <XCounter
                                                grey={isMuted}
                                                count={dialog.unread}
                                                active={active}
                                                big
                                            />
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </XViewSelectedContext.Consumer>
        </XView>
    );
});

DialogView.displayName = 'DialogView';
