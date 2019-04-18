import * as React from 'react';
import { css } from 'linaria';
import Glamorous from 'glamorous';
import { XView } from 'react-mental';
import { MutationFunc } from 'react-apollo';
import { XAvatar } from 'openland-x/XAvatar';
import { XModal, XModalCloser } from 'openland-x-modal/XModal';
import { IsMobileContext } from 'openland-web/components/Scaffold/IsMobileContext';
import {
    FullMessage_GeneralMessage_attachments_MessageAttachmentFile,
    Room_room_SharedRoom_pinnedMessage_GeneralMessage_attachments_MessageAttachmentFile,
    Room_room_PrivateRoom,
    Room_room_SharedRoom,
    Room_room_SharedRoom_pinnedMessage_GeneralMessage,
} from 'openland-api/Types';
import { XDate } from 'openland-x/XDate';
import { MessageTextComponent } from 'openland-web/components/messenger/message/content/MessageTextComponent';
import { niceBytes } from 'openland-web/components/messenger/message/content/MessageFileComponent';
import { XMutation } from 'openland-x/XMutation';
import { UserInfoContext } from 'openland-web/components/UserInfo';
import { getWelcomeMessageSenders } from 'openland-y-utils/getWelcomeMessageSenders';
import ExpandIcon from 'openland-icons/ic-expand-pinmessage.svg';
import AttachIcon from 'openland-icons/ic-attach-doc-blue.svg';
import CloseIcon from 'openland-icons/ic-close.svg';
import { MessageReplyComponent } from 'openland-web/components/messenger/message/content/MessageReplyComponent';
import { XLink } from 'openland-x/XLink';
import { useClient } from 'openland-web/utils/useClient';
import { MessageModal } from './MessageModal';

const ReplyMessageWrapper = Glamorous.div({
    position: 'relative',
    '&::before': {
        display: 'block',
        content: ' ',
        position: 'absolute',
        left: 0,
        top: 0,
        bottom: 4,
        width: 3,
        borderRadius: 3,
        backgroundColor: '#1790ff',
    },
});

const Close = Glamorous(XLink)({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: 32,
    height: 32,
    borderRadius: 50,
    '&:hover': {
        backgroundColor: '#ecedf0',
    },
    '& svg path': {
        fill: '#CCCCCC',
    },
});

const ImageClassName = css`
    max-height: 40vh;
    max-width: 100%;
    object-fit: contain;
`;

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

type attachmentType = Room_room_SharedRoom_pinnedMessage_GeneralMessage_attachments_MessageAttachmentFile;

export interface PinMessageComponentProps {
    pinMessage: Room_room_SharedRoom_pinnedMessage_GeneralMessage;
    chatId: string;
    room: Room_room_SharedRoom | Room_room_PrivateRoom;
    target?: any;
}

export const PinMessageModal = React.memo((props: PinMessageComponentProps) => {
    const isMobile = React.useContext(IsMobileContext);
    const { room, pinMessage } = props;

    let sharedRoom = room.__typename === 'SharedRoom' ? (room as Room_room_SharedRoom) : null;
    const userContext = React.useContext(UserInfoContext);
    const myId = userContext!!.user!!.id!!;

    let usersCanUnpinMessage = [];
    let canMeUnpinMessage = false;
    if (sharedRoom) {
        usersCanUnpinMessage = getWelcomeMessageSenders({
            chat: sharedRoom,
        });
    }
    if (usersCanUnpinMessage.find(i => i.id === myId) !== undefined) {
        canMeUnpinMessage = true;
    }

    if ((room as Room_room_SharedRoom).kind === 'GROUP') {
        canMeUnpinMessage = true;
    }

    // nearCrossButtons: any;
    // generalMessage: FullMessage_GeneralMessage;
    // chatId: string;
    // room: Room_room_SharedRoom | Room_room_PrivateRoom;
    // target?: any;

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
            chatId={props.chatId}
            target={target}
            room={room}
            generalMessage={pinMessage}
        />
    );
});
