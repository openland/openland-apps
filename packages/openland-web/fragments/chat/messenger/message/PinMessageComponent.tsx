import * as React from 'react';
import { css, cx } from 'linaria';
// import { MessageContent } from './MessageContent';
// import PinIcon from 'openland-icons/s/ic-pin-24.svg';
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

export const PinMessageComponent = React.memo((props: PinMessageProps) => {
    // console.log(props);
    return (
        <div className={pinMessageContainer}>
            <div>asd</div>
        </div>
    );
});
