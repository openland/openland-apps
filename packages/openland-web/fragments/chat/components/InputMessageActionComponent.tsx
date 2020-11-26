import * as React from 'react';
import { plural } from 'openland-y-utils/plural';
import { TextBody, TextLabel1 } from 'openland-web/utils/TextStyles';
import { ReplyMessage } from '../messenger/message/content/ReplyContent';
import ReplyIcon from 'openland-icons/s/ic-reply-24.svg';
import ForwardIcon from 'openland-icons/s/ic-forward-24.svg';
import CloseIcon from 'openland-icons/s/ic-close-8.svg';
import { UIcon } from 'openland-web/components/unicorn/UIcon';
import { css, cx } from 'linaria';
import { useShortcuts } from 'openland-x/XShortcuts/useShortcuts';
import { defaultHover } from 'openland-web/utils/Styles';
import { useChatMessagesActionsState, useChatMessagesActionsMethods } from 'openland-y-utils/MessagesActionsState';

const messageActonContainerClass = css`
    display: flex;
    flex-direction: row;
    align-self: stretch;
    align-items: center;
    flex-shrink: 0;
    margin-bottom: 12px;
    margin-top: -4px;
`;

const messageActonInnerContainerClass = css`
    display: flex;
    flex-direction: column;
    align-self: stretch;
    flex-grow: 1;
    max-width: 868px;
`;

const messageActionInnerContainerEdit = css`
    flex-grow: 0;
    margin-left: 55px;
`;

const messageActionIconWrap = css`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    margin-right: 16px;
    flex-shrink: 0;
`;

const messageActionCloseWrapper = css`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    width: 40px;
    height: 40px;
    cursor: pointer;
`;

const messageActionCloseWrap = css`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    width: 24px;
    height: 24px;
    border-radius: 24px;
    background-color: var(--backgroundTertiary);

    & svg * {
        fill: var(--foregroundSecondary);
        stroke: var(--foregroundSecondary);
    }
`;

const contentTitleClass = css`
    color: var(--foregroundPrimary);
`;

const contentSubtitleClass = css`
    color: var(--foregroundSecondary);
`;

const messageActionCloseWrapEdit = css`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    width: 24px;
    height: 24px;
    margin: 0 4px;

    /* optical compensation */
    position: relative;
    top: 1px;

    & svg * {
        fill: var(--foregroundTertiary);
        stroke: var(--foregroundTertiary);
    }
`;

export const InputMessageActionComponent = (props: { chatId: string; userId?: string }) => {
    const state = useChatMessagesActionsState(props.chatId);
    const { clear } = useChatMessagesActionsMethods(props.chatId);
    useShortcuts({
        keys: ['Escape'],
        callback: () => {
            if (state.action !== 'none') {
                clear();
                return true;
            } else {
                return false;
            }
        },
    });
    let names = '';

    if (state.action === 'forward' || state.action === 'reply') {
        names = state
            .messages.reduce((res, item) => {
                if (!res.find((s) => item.sender.id === s.id)) {
                    res.push({ id: item.sender.id, name: item.sender.name });
                }
                return res;
            }, [] as { id: string; name: string }[])
            .map((s) => s.name)
            .join(', ');
    }

    let content;
    if (state.action === 'forward' || state.action === 'reply') {
        if (state.messages.length === 1) {
            content = <ReplyMessage message={state.messages[0]} isReplyAction={true} />;
        } else {
            content = (
                <>
                    <span className={cx(contentTitleClass, TextLabel1)} style={{ userSelect: 'none' }}>
                        {names}
                    </span>
                    <span className={cx(contentSubtitleClass, TextBody)} style={{ userSelect: 'none' }}>
                        {' '}
                        {plural(state.messages.length, ['message', 'messages'])}{' '}
                    </span>
                </>
            );
        }
    } else if (state.action === 'edit' && state.messages.length === 1) {
        content = <span className={cx(contentTitleClass, TextLabel1)}>Edit message</span>;
    } else {
        return null;
    }

    let ActionIcon;

    if (state.action === 'forward') {
        ActionIcon = ForwardIcon;
    }

    if (state.action === 'reply') {
        ActionIcon = ReplyIcon;
    }

    return (
        <div className={messageActonContainerClass}>
            {!!ActionIcon && (
                <div className={messageActionIconWrap}>
                    <UIcon icon={<ActionIcon />} color="var(--foregroundSecondary)" />
                </div>
            )}
            <div
                className={cx(
                    messageActonInnerContainerClass,
                    !ActionIcon && messageActionInnerContainerEdit,
                )}
            >
                {content}
            </div>
            <div
                className={cx(
                    state.action === 'edit' ? null : messageActionCloseWrapper,
                    defaultHover,
                )}
                onClick={clear}
            >
                <div
                    className={
                        state.action === 'edit'
                            ? messageActionCloseWrapEdit
                            : messageActionCloseWrap
                    }
                >
                    <UIcon icon={<CloseIcon />} color="var(--foregroundSecondary)" />
                </div>
            </div>
        </div>
    );
};
