import * as React from 'react';
import { XView } from 'react-mental';
import { MutationFunc } from 'react-apollo';
import {
    Room_room_PrivateRoom,
    Room_room_SharedRoom,
    Room_room_SharedRoom_pinnedMessage_GeneralMessage,
    RoomWithoutMembers_room_SharedRoom,
} from 'openland-api/Types';
import { XMutation } from 'openland-x/XMutation';
import { UserInfoContext } from 'openland-web/components/UserInfo';
import { getWelcomeMessageSenders } from 'openland-y-utils/getWelcomeMessageSenders';
import ExpandIcon from 'openland-icons/ic-expand-pinmessage.svg';
import { useClient } from 'openland-web/utils/useClient';
import { MessageModal } from './MessageModal';

const UnpinButton = (props: {
    variables: {
        chatId: string;
    };
}) => {
    const client = useClient();

    const unpinMessage = async () => await client.mutateUnpinMessage(props.variables);

    return (
        <XMutation mutation={unpinMessage as MutationFunc<{}>}>
            <XView
                marginRight={10}
                color="rgba(0, 0, 0, 0.5)"
                fontSize={13}
                marginTop={-4}
                cursor="pointer"
            >
                Unpin
            </XView>
        </XMutation>
    );
};

export interface PinMessageComponentProps {
    pinMessage: Room_room_SharedRoom_pinnedMessage_GeneralMessage;
    chatId: string;
    room: RoomWithoutMembers_room_SharedRoom | Room_room_PrivateRoom;
    target?: any;
}

export const PinMessageModal = React.memo((props: PinMessageComponentProps) => {
    const { room, pinMessage } = props;

    let sharedRoom =
        room.__typename === 'SharedRoom' ? (room as RoomWithoutMembers_room_SharedRoom) : null;
    const userContext = React.useContext(UserInfoContext);
    const myId = userContext!!.user!!.id!!;

    let usersCanUnpinMessage = [];
    let canMeUnpinMessage = false;
    if (sharedRoom) {
        usersCanUnpinMessage = getWelcomeMessageSenders({
            chat: sharedRoom as any,
        });
    }
    if (usersCanUnpinMessage.find(i => i.id === myId) !== undefined) {
        canMeUnpinMessage = true;
    }

    if ((room as Room_room_SharedRoom).kind === 'GROUP') {
        canMeUnpinMessage = true;
    }

    let target = (
        <XView cursor="pointer">
            <ExpandIcon />
        </XView>
    );

    if (props.target) {
        target = props.target;
    }

    return (
        <MessageModal
            nearCrossButtons={
                canMeUnpinMessage && <UnpinButton variables={{ chatId: props.chatId }} />
            }
            afterDateElems={
                <>
                    <XView
                        width={3}
                        height={3}
                        opacity={0.3}
                        backgroundColor="#000"
                        borderRadius="100%"
                        flexShrink={0}
                        marginHorizontal={5}
                    />
                    <XView>Pinned</XView>
                </>
            }
            target={target}
            generalMessage={pinMessage}
            footer={null}
        />
    );
});
