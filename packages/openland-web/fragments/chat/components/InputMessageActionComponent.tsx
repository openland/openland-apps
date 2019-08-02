import * as React from 'react';
import { MessagesActionsStateEngine } from 'openland-engines/messenger/MessagesActionsState';
import { plural } from 'openland-y-utils/plural';
import { TextBody, TextLabel1 } from 'openland-web/utils/TextStyles';
import { MessageCompactComponent } from '../messenger/message/MessageCompactContent';
import ReplyIcon from 'openland-icons/s/ic-reply-24.svg';
import CloseIcon from 'openland-icons/s/ic-close-8.svg';
import { UIcon } from 'openland-web/components/unicorn/UIcon';
import EditIcon from 'openland-icons/s/ic-edit-24.svg';
import { emoji } from 'openland-y-utils/emoji';
import { css } from 'linaria';
import { useShortcuts } from 'openland-x/XShortcuts/useShortcuts';

const messageActonContainerClass = css`
    display: flex;
    flex-direction: row;
    align-self: stretch;
    justify-content: center;
    align-items: center;
    flex-shrink: 0;
    margin-bottom: 12px;
`;

const messageActonInnerContainerClass = css`
    display: flex;
    flex-direction: column;
    align-self: stretch;
    flex-grow: 1;
    max-width: 868px;
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

const messageActionCloseWrap = css`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    width: 24px;
    height: 24px;
    flex-shrink: 0;
    border-radius: 24px;
    cursor: pointer;
    background-color: #f2f3f5;
    margin-left: 16px;
    margin-right: 6px;

    & svg * {
        fill: #676d7a;
        stroke: #676d7a;
    }
`;

export const InputMessageActionComponent = (props: { engine: MessagesActionsStateEngine }) => {
    useShortcuts({
        keys: ['Escape'], callback: () => {
            if (props.engine.getState().action) {
                props.engine.clear();
                return true;
            } else {
                return false;
            }
        }
    });
    let state = props.engine.useState();
    let names = '';

    if (state.action === 'forward' || state.action === 'reply') {
        names = state.messages
            .reduce(
                (res, item) => {
                    if (!res.find(s => item.sender.id === s.id)) {
                        res.push({ id: item.sender.id, name: item.sender.name });
                    }
                    return res;
                },
                [] as { id: string; name: string }[],
            )
            .map(s => s.name)
            .join(', ');
    }

    let icon = <UIcon icon={<ReplyIcon />} color={'#676d7a'} />;
    if (state.action === 'edit') {
        icon = <UIcon icon={<EditIcon />} color={'#676d7a'} />;
    }

    let content;
    if (state.action === 'forward' || state.action === 'reply') {
        if (state.messages.length === 1) {
            content = <MessageCompactComponent message={state.messages[0]} />;
        } else {
            content = (
                <>
                    <span className={TextLabel1}> {names} </span>
                    <span className={TextBody}>
                        {' '}
                        {plural(state.messages.length, ['message', 'messages'])}{' '}
                    </span>
                </>
            );
        }
    } else if (state.action === 'edit' && state.messages.length === 1) {
        content = (
            <>
                <span className={TextLabel1}>Edit message</span>
                <span className={TextBody}>
                    {emoji(state.messages[0].fallback)}
                </span>
            </>
        );
    } else {
        return null;
    }

    return (
        <div className={messageActonContainerClass}>
            <div className={messageActionIconWrap}>
                {icon}
            </div>
            <div className={messageActonInnerContainerClass}>
                {content}
            </div>
            <div className={messageActionCloseWrap} onClick={props.engine.clear}>
                <CloseIcon />
            </div>
        </div>
    );
};