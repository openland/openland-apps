import * as React from 'react';
import { XViewRouterContext } from 'react-mental';
import PinIcon from 'openland-icons/s/ic-pin-24.svg';
import CloseIcon from 'openland-icons/s/ic-close-16.svg';
import { emoji } from 'openland-y-utils/emoji';
import {
    RoomChat_room_SharedRoom_pinnedMessage_GeneralMessage,
    RoomChat_room_PrivateRoom_pinnedMessage_GeneralMessage,
} from 'openland-api/spacex.types';
import { ConversationEngine } from 'openland-engines/messenger/ConversationEngine';
import { UTopBar } from 'openland-web/components/unicorn/UTopBar';

interface PinMessageProps {
    engine: ConversationEngine;
    canUnpin: boolean;
    message:
        | RoomChat_room_SharedRoom_pinnedMessage_GeneralMessage
        | RoomChat_room_PrivateRoom_pinnedMessage_GeneralMessage;
}

export const PinMessageComponent = React.memo((props: PinMessageProps) => {
    const router = React.useContext(XViewRouterContext);
    const { message, engine } = props;

    const handlePinClick = React.useCallback(() => {
        if (router && message.id) {
            router.navigate(`/message/${message.id}`);
        }
    }, [message.id]);

    return (
        <UTopBar
            type="light"
            leftIcon={<PinIcon />}
            title={emoji(message.sender.name)}
            subtitle={emoji(message.fallback)}
            onClick={handlePinClick}
            rightIcon={props.canUnpin ? <CloseIcon /> : undefined}
            onRightClick={
                props.canUnpin
                    ? (e: any) => {
                          e.stopPropagation();
                          e.preventDefault();
                          engine.engine.client.mutateUnpinMessage({
                              chatId: engine.conversationId,
                          });
                      }
                    : undefined
            }
        />
    );
});
