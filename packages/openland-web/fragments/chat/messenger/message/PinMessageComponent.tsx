import * as React from 'react';
import { css, cx } from 'linaria';
import { TextBody } from 'openland-web/utils/TextStyles';
import PinIcon from 'openland-icons/s/ic-pin-24.svg';
import {
    Room_room_SharedRoom_pinnedMessage_GeneralMessage,
    RoomChat_room_PrivateRoom_pinnedMessage_GeneralMessage,
} from 'openland-api/Types';

interface PinMessageProps {
    message:
        | Room_room_SharedRoom_pinnedMessage_GeneralMessage
        | RoomChat_room_PrivateRoom_pinnedMessage_GeneralMessage;
}

const pinMessageContainer = css`
    height: 56px;
    display: flex;
    flex-shrink: 0;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    border-top: 1px solid #f2f3f5;
    border-bottom: 1px solid #f2f3f5;
`;

const piMessageContent = css`
    max-width: 910px;
    display: flex;
    flex-direction: row;
    padding-left: 20px;
    padding-right: 20px;
    align-items: center;
    justify-content: stretch;
    flex-grow: 1;
    flex-basis: 0;
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
`;

const pinMessageFallback = css`
    color: #171b1f;
    white-space: pre-wrap;
    text-overflow: ellipsis;
    overflow: hidden;
    height: 24px;
`;

export const PinMessageComponent = React.memo((props: PinMessageProps) => {
    return (
        <div className={pinMessageContainer}>
            <div className={piMessageContent}>
                <div className={iconContainer}>
                    <PinIcon />
                </div>
                <div className={cx(pinMessageFallback, TextBody)}>{props.message.fallback}</div>
            </div>
        </div>
    );
});
