import * as React from 'react';
import { css, cx } from 'linaria';
import { XViewRouterContext } from 'react-mental';
import { TextBody } from 'openland-web/utils/TextStyles';
import PinIcon from 'openland-icons/s/ic-pin-24.svg';
import CloseIcon from 'openland-icons/s/ic-close-16.svg';
import { TextLabel1 } from 'openland-web/utils/TextStyles';
import { processSpans } from 'openland-y-utils/spans/processSpans';
import { MessageTextComponent } from './content/MessageTextComponent';
import { emoji } from 'openland-y-utils/emoji';
import {
    Room_room_SharedRoom_pinnedMessage_GeneralMessage,
    RoomChat_room_PrivateRoom_pinnedMessage_GeneralMessage,
} from 'openland-api/Types';
import { ThemeDefault } from 'openland-y-utils/themes';
import { UIcon } from 'openland-web/components/unicorn/UIcon';
import { ConversationEngine } from 'openland-engines/messenger/ConversationEngine';

interface PinMessageProps {
    engine: ConversationEngine;
    message:
    | Room_room_SharedRoom_pinnedMessage_GeneralMessage
    | RoomChat_room_PrivateRoom_pinnedMessage_GeneralMessage;
}

const pinMessageContainer = css`
    height: 40px;
    display: flex;
    flex-shrink: 0;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    background-color: #f2f3f5;
    cursor: pointer;
`;

const piMessageContent = css`
    max-width: 824px;
    display: flex;
    flex-direction: row;
    padding: 0 16px;
    align-items: center;
    justify-content: space-between;
    flex-grow: 1;
    flex-basis: 0;
`;

const pinMessageMainContent = css`
    display: flex;
    flex-direction: row;
    align-items: center;
    flex-grow: 1;
`;

const iconContainer = css`
    width: 40px;
    height: 40px;
    border-radius: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    margin-right: 16px;

    & svg {
        width: 20px;
        height: 20px;
    }
`;

const senderName = css`
    color: #171B1F;
    margin-right: 10px;
    white-space: nowrap;
`;

const pinMessageFallback = css`
    color: #171b1f;
    white-space: pre-wrap;
    text-overflow: ellipsis;
    overflow: hidden;
    height: 24px;
    pointer-events: none;
`;

const unpinIconContainer = css`
    width: 40px;
    height: 40px;
    border-radius: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    
    &:hover {
        opacity: 0.64;
    }
`;

export const PinMessageComponent = React.memo((props: PinMessageProps) => {
    const router = React.useContext(XViewRouterContext);
    const { message, engine } = props;

    const handlePinClick = React.useCallback(
        e => {
            if (router && message.id) {
                router.navigate(`/message/${message.id}`);
            }
        },
        [message.id],
    );

    let content =
        message.spans.length > 0 ? (
            <MessageTextComponent
                spans={processSpans(message.message || '', message.spans)}
                edited={false}
            />
        ) : (
            emoji(message.fallback)
        );

    return (
        <div className={pinMessageContainer} onClick={handlePinClick}>
            <div className={piMessageContent}>
                <div className={pinMessageMainContent}>
                    <div className={iconContainer}>
                        <UIcon icon={<PinIcon />} color={ThemeDefault.foregroundSecondary} />
                    </div>
                    <div className={cx(TextLabel1, senderName)}>{emoji(message.sender.name)}</div>
                    <div className={cx(pinMessageFallback, TextBody)}>{content}</div>
                </div>
                {engine.canPin && (
                    <div
                        className={unpinIconContainer}
                        onClick={(e: any) => {
                            e.stopPropagation();
                            e.preventDefault();
                            engine.engine.client.mutateUnpinMessage({
                                chatId: engine.conversationId,
                            });
                        }}
                    >
                        <UIcon icon={<CloseIcon />} color={ThemeDefault.foregroundSecondary} />
                    </div>
                )}
            </div>
        </div>
    );
});