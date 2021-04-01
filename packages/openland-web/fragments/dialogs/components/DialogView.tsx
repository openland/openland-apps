import * as React from 'react';
import { css, cx } from 'linaria';
import { XView, XViewSelectedContext } from 'react-mental';
import Lottie from 'react-lottie';
import { XDate } from 'openland-x/XDate';
import IcLock from 'openland-icons/s/ic-lock-16.svg';
import IcReply from 'openland-icons/s/ic-reply-16.svg';
import IcMention from 'openland-icons/s/ic-mention-12.svg';
import IcCall from 'openland-icons/s/ic-call-12.svg';
import IcMic from 'openland-icons/s/ic-mic-12.svg';
import IcMuted from 'openland-icons/s/ic-muted-16.svg';
import IcFeatured from 'openland-icons/s/ic-verified-3-16.svg';
import { XCounter } from 'openland-x/XCounter';
import { DialogListWebItem } from './DialogListWebDataSource';
import { UAvatar } from 'openland-web/components/unicorn/UAvatar';
import { UIcon } from 'openland-web/components/unicorn/UIcon';
import { TextCaption, TextLabel1, TextDensed } from 'openland-web/utils/TextStyles';
import { getJSON } from 'openland-y-utils/lottie/getJSON';
import { TypingType } from 'openland-api/spacex.types';
import { PremiumBadge } from 'openland-web/components/PremiumBadge';

const dialogContainer = css`
    cursor: pointer;
    display: flex;
    flex-direction: row;
    padding: 8px 16px;
    height: 80px;
    min-width: 0;
    align-items: center;
`;

const dialogContainerWithHover = css`
    &:hover {
        background-color: var(--backgroundPrimaryHover);
    }
    
    &:hover .online-dot {
        border-color: var(--backgroundPrimaryHover);
    }
`;

const dialogHoveredContainer = css`
    background-color: var(--backgroundPrimaryHover);
    
    .online-dot {
        border-color: var(--backgroundPrimaryHover);
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
    color: var(--foregroundPrimary);
`;

const dialogTitle = css`
    text-overflow: ellipsis;
    overflow: hidden;
`;

const mutedIcon = css`
    margin-left: 4px;
`;

const featuredIcon = css`
    margin-left: 4px;
    margin-top: 0;
    display: var(--featured-icon-display);
`;

const highlightSecretChatColor = css`
    color: var(--secret-chat-title-color);
`;

const dialogDateContent = css`
    flex-shrink: 0;
    height: 18px;
    margin-left: 5px;
    white-space: nowrap;
    align-self: center;
    color: var(--foregroundTertiary);
`;

const dialogMessageContent = css`
    display: flex;
    flex-grow: 1;
    flex-shrink: 1;
    flex-basis: 0;
    height: 40px;
    min-width: 0;
    overflow: hidden;
    color: var(--foregroundSecondary);
`;

const dialogActiveColor = css`
    color: var(--foregroundContrast);
`;

const dialogUnreadContainer = css`
    display: flex;
    align-items: center;
    align-self: center;
    padding: 0 0 0 3px;
`;

const unreadCounterContainer = css`
    display: flex;
    align-items: center;
    align-self: center;
    margin-left: 6px;
`;

const mentionContainer = css`
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
    & svg path,
    & svg circle {
        stroke: var(--foregroundContrast);
    }
`;

const callBadgeContainer = css`
    background-color: var(--accentPositive);
    width: 22px;
    height: 22px;
    border-radius: 100%;

    display: flex;
    align-items: center;
    justify-content: center;

    & svg path {
        fill: var(--foregroundContrast);
        stroke: var(--foregroundContrast);
    }
`;

const mentionContainerActive = css`
    background-color: var(--foregroundContrast);

    & svg path,
    & svg circle {
        stroke: var(--accentMuted);
    }
`;

const callBadgeContainerActive = css`
    background-color: var(--foregroundContrast);

    & svg path,
    & svg circle {
        fill: var(--accentMuted);
        stroke: var(--accentMuted);
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
   display: var(--secret-chat-icon-display);
`;

interface DialogViewProps {
    item: DialogListWebItem;
    onPress?: (id: string) => void;
    onMouseOver?: () => void;
    onMouseMove?: () => void;
    selected?: boolean;
    hovered?: boolean;
    disableHover?: boolean;
    savedMessages?: boolean;
}

export const DialogView = React.memo<DialogViewProps>(props => {
    const containerRef = React.useRef<HTMLDivElement>(null);
    let dialog = props.item;
    let isPremium = dialog.isPremium;
    let isMuted = dialog.isMuted;
    let isService = dialog.isService;
    let haveMention = dialog.haveMention;
    let isPrivate = props.item.kind === 'PRIVATE';
    let isSavedMessages = !!props.savedMessages;
    let sender = isSavedMessages ? (
        ''
    ) : dialog.isOut ? (
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
                                color={active ? 'var(--foregroundContrast)' : 'var(--foregroundSecondary)'}
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

    React.useEffect(
        () => {
            if (containerRef.current && props.hovered) {
                containerRef.current.scrollIntoView({ behavior: 'auto', block: 'nearest' });
            }
        },
        [props.hovered],
    );

    const highlightSecretChat = dialog.kind === 'GROUP' && !isPremium;
    const highlightFeaturedChat = dialog.featured;

    return (
        <div className="x" ref={containerRef} onMouseOver={props.onMouseOver} onMouseMove={props.onMouseMove}>
            <XView
                selected={props.selected}
                onMouseDown={() => props.onPress && props.onPress(dialog.key)}
                linkSelectable={true}
            >
                <XViewSelectedContext.Consumer>
                    {active => (
                        <div className={cx(dialogContainer, !props.disableHover && dialogContainerWithHover, props.hovered && dialogHoveredContainer, active && dialogActiveContainer)}>
                            <UAvatar
                                title={dialog.title}
                                titleEmoji={dialog.titlePlaceholderEmojify}
                                id={dialog.kind === 'PRIVATE' ? dialog.flexibleId : dialog.key}
                                photo={dialog.photo}
                                online={dialog.online}
                                size="large"
                                selected={active}
                                savedMessages={isSavedMessages}
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
                                        {isPremium && <PremiumBadge active={active} />}
                                        {highlightSecretChat && (
                                            <div className={cx(dialogIconContainer, lockContainer)}>
                                                <UIcon
                                                    icon={<IcLock />}
                                                    color={active ? 'var(--foregroundContrast)' : 'var(--accentPositive)'}
                                                />
                                            </div>
                                        )}

                                        <span className={dialogTitle}>{isSavedMessages ? 'Saved messages' : dialog.titleEmojify}</span>
                                        {highlightFeaturedChat && (
                                            <div className={cx(dialogIconContainer, featuredIcon)}>
                                                <UIcon
                                                    size={16}
                                                    icon={<IcFeatured />}
                                                    color={active ? 'var(--foregroundContrast)' : '#3DA7F2' /* special: verified/featured color */}
                                                />
                                            </div>
                                        )}
                                        {dialog.isMuted && (
                                            <div className={cx(dialogIconContainer, mutedIcon)}>
                                                <UIcon
                                                    size={16}
                                                    icon={<IcMuted />}
                                                    color={active ? 'var(--foregroundContrast)' : 'var(--foregroundQuaternary)'}
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
                                    {(dialog.unread > 0 || dialog.hasActiveCall || dialog.hasActiveVoiceChat) && (
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
                                            {dialog.unread > 0 && (
                                                <div className={unreadCounterContainer}>
                                                    <XCounter
                                                        grey={isMuted}
                                                        count={dialog.unread}
                                                        active={active}
                                                        big={true}
                                                    />
                                                </div>
                                            )}
                                            {dialog.hasActiveCall && (
                                                <div
                                                    className={cx(
                                                        unreadCounterContainer,
                                                        callBadgeContainer,
                                                        active && callBadgeContainerActive
                                                    )}
                                                >
                                                    <UIcon icon={<IcCall />} color={'var(--foregroundContrast)'} />
                                                </div>
                                            )}
                                            {dialog.hasActiveVoiceChat && (
                                                <div
                                                    className={cx(
                                                        unreadCounterContainer,
                                                        callBadgeContainer,
                                                        active && callBadgeContainerActive
                                                    )}
                                                >
                                                    <UIcon icon={<IcMic />} color={'var(--foregroundContrast)'} />
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}
                </XViewSelectedContext.Consumer>
            </XView>
        </div>
    );
});

DialogView.displayName = 'DialogView';
