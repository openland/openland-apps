import * as React from 'react';
import { css, cx } from 'linaria';
import { XView, XViewSelectedContext } from 'react-mental';
import { XDate } from 'openland-x/XDate';
import IcLock from 'openland-icons/s/ic-lock-16.svg';
import IcReply from 'openland-icons/s/ic-reply-16.svg';
import IcChannel from 'openland-icons/s/ic-channel-16.svg';
import IcMention from 'openland-icons/s/ic-mention-12.svg';
import IcMuted from 'openland-icons/s/ic-muted-16.svg';
import { XCounter } from 'openland-x/XCounter';
import { DialogListWebItem } from './DialogListWebDataSource';
import { UAvatar } from 'openland-web/components/unicorn/UAvatar';
import { UIcon } from 'openland-web/components/unicorn/UIcon';
import { TextCaption, TextLabel1, TextDensed } from 'openland-web/utils/TextStyles';
import Lottie from 'react-lottie';
import { getJSON } from 'openland-y-utils/lottie/getJSON';
import { TypingType } from 'openland-api/spacex.types';

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
    
    &:hover .online-dot {
        border-color: #f0f2f5;
    }
`;

const dialogActiveContainer = css`
    background-color: var(--accentMuted);

    &:hover {
        background-color: var(--accentMutedHover);
    }
    
    &:hover .online-dot {
        border-color: var(--accentMutedHover);
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

const mutedIcon = css`
    margin-left: 4px;
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

    background-color: var(--accentPrimary);
    width: 22px;
    height: 22px;
    border-radius: 100%;

    display: flex;
    align-items: center;
    justify-content: center;

    /* override UIcon's white fill */
    & svg path {
        fill: none;
    }
`;

const mentionContainerActive = css`
    background-color: var(--backgroundPrimary);

    & svg path,
    & svg circle {
        stroke: var(--accentPrimary);
    }
`;

const replyStyle = css`
    display: flex;
    align-items: flex-start;
`;

const replyIconStyle = css`
    margin: 2px;
`;

const lockContainer = css`
   margin-right: 3px;
   opacity: 0.72; 
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
    
    let typingAnimation: string;

    switch (dialog.typingType) {
        case TypingType.TEXT: typingAnimation = 'typing'; break;
        case TypingType.FILE: typingAnimation = 'file'; break;
        case TypingType.PHOTO: typingAnimation = 'file'; break;
        case TypingType.VIDEO: typingAnimation = 'file'; break;
        case TypingType.STICKER: typingAnimation = 'sticker'; break;
        default: typingAnimation = 'typing'; break;
    }

    if (dialog.typingEmojify) {
        message = (
            <XViewSelectedContext.Consumer>
                {active => (
                    <>
                        <XView width={20} marginRight={8} alignItems="center">
                            <Lottie
                                isStopped={false}
                                isPaused={false}
                                height={20}
                                width={20}
                                options={{
                                    animationData: getJSON(typingAnimation, active ? '#FFFFFF' : '#878A91'),
                                    loop: true
                                }}
                            />
                        </XView>
                        <span>{dialog.typingEmojify}</span>
                    </>
                )}
            </XViewSelectedContext.Consumer>
        );
    } else {
        if (dialog.message) {
            if (isService) {
                message = <span>{dialog.fallbackEmojify}</span>;
            } else if (!isService) {
                message = (
                    <span>
                        {sender}
                        {dialog.messageEmojify}
                    </span>
                );
            }
        } else if (dialog.forward) {
            message = (
                <span className={replyStyle}>
                    {sender}
                    <XViewSelectedContext.Consumer>
                        {active => (
                            <UIcon
                                icon={<IcReply className={replyIconStyle} />}
                                color={active ? '#fff' : '#78808f'}
                            />
                        )}
                    </XViewSelectedContext.Consumer>
                    Forward
                </span>
            );
        } else {
            message = (
                <span>
                    {sender}
                    {dialog.fallbackEmojify}
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
                            selected={active}
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
                                            <div className={cx(dialogIconContainer, lockContainer)}>
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
                                    {dialog.isMuted && (
                                        <div className={cx(dialogIconContainer, mutedIcon)}>
                                            <UIcon
                                                size={16}
                                                icon={<IcMuted />}
                                                color={active ? 'var(--foregroundInverted)' : 'var(--foregroundQuaternary)'}
                                            />
                                        </div>
                                    )}
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
                                                    active && mentionContainerActive
                                                )}
                                            >
                                                <UIcon icon={<IcMention />} color={'var(--foregroundContrast)'} />
                                            </div>
                                        )}
                                        <div className={unreadCounterContainer}>
                                            <XCounter
                                                grey={isMuted}
                                                count={dialog.unread}
                                                active={active}
                                                big={true}
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
