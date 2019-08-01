import * as React from 'react';
import { css, cx } from 'linaria';
import { XViewRouterContext } from 'react-mental';
import { TextBody } from 'openland-web/utils/TextStyles';
import PinIcon from 'openland-icons/s/ic-pin-24.svg';
import GoIcon from 'openland-icons/s/ic-ahead-24.svg';
import { processSpans } from 'openland-y-utils/spans/processSpans';
import { MessageTextComponent } from './content/MessageTextComponent';
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
`;

const aheadIcon = css`
    margin-right: 0;
    margin-left: 16px;
    cursor: pointer;

    &:hover {
        background-color: #f2f3f5;
    }
`;

const pinMessageFallback = css`
    color: #171b1f;
    white-space: pre-wrap;
    text-overflow: ellipsis;
    overflow: hidden;
    height: 24px;
`;

export const PinMessageComponent = React.memo((props: PinMessageProps) => {
    const router = React.useContext(XViewRouterContext);
    const { message } = props;

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
            message.fallback
        );

    return (
        <div className={pinMessageContainer}>
            <div className={piMessageContent}>
                <div className={pinMessageMainContent}>
                    <div className={iconContainer}>
                        <PinIcon />
                    </div>
                    <div className={cx(pinMessageFallback, TextBody)}>{content}</div>
                </div>
                <div className={cx(iconContainer, aheadIcon)} onClick={handlePinClick}>
                    <GoIcon />
                </div>
            </div>
        </div>
    );
});
