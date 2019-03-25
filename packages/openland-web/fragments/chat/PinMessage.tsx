import * as React from 'react';
import { css } from 'linaria';
import { XView } from 'react-mental';
import { XAvatar } from 'openland-x/XAvatar';
import { emoji } from 'openland-y-utils/emoji';
import { XModal, XModalCloser } from 'openland-x-modal/XModal';
import { IsMobileContext } from 'openland-web/components/Scaffold/IsMobileContext';
import {
    Room_room_PrivateRoom,
    Room_room_SharedRoom,
    Room_room_SharedRoom_pinnedMessage_GeneralMessage,
    Room_room_SharedRoom_pinnedMessage_GeneralMessage_attachments_MessageAttachmentFile,
} from 'openland-api/Types';
import { XDate } from 'openland-x/XDate';
import { MessageTextComponent } from 'openland-web/components/messenger/message/content/MessageTextComponent';
import { niceBytes } from 'openland-web/components/messenger/message/content/MessageFileComponent';
import { withUnpinMessage } from 'openland-web/api/withPinMessage';
import { XMutation } from 'openland-x/XMutation';
import { UserInfoContext } from 'openland-web/components/UserInfo';
import { getWelcomeMessageSenders } from 'openland-y-utils/getWelcomeMessageSenders';
import IconFile from 'openland-icons/ic-pinfile-doc.svg';
import IconImage from 'openland-icons/ic-pinfile-photo.svg';
import PinIcon from 'openland-icons/ic-pinned-message.svg';
import ExpandIcon from 'openland-icons/ic-expand-pinmessage.svg';
import AttachIcon from 'openland-icons/ic-attach-doc-blue.svg';

interface UnpinButtonProps {
    variables: {
        chatId: string;
    };
}

const ImageClassName = css`
    max-height: 40vh;
    max-width: 100%;
    object-fit: contain;
`;

const UnpinButton = withUnpinMessage(props => (
    <XMutation mutation={props.unpinMessage}>
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
)) as React.ComponentType<UnpinButtonProps>;

type attachmentType = Room_room_SharedRoom_pinnedMessage_GeneralMessage_attachments_MessageAttachmentFile;

export interface PinMessageComponentProps {
    pinMessage: Room_room_SharedRoom_pinnedMessage_GeneralMessage;
    chatId: string;
    room: Room_room_SharedRoom | Room_room_PrivateRoom;
}

const PinMessageModal = (props: PinMessageComponentProps) => {
    const { room } = props;
    const { pinMessage } = props;
    const { sender, message } = pinMessage;
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

    if ((room as Room_room_SharedRoom).kind === 'GROUP' && pinMessage.sender.id === myId) {
        canMeUnpinMessage = true;
    }

    let attachment: attachmentType | null = null;

    if (
        pinMessage.attachments.length > 0 &&
        pinMessage.attachments[0].__typename === 'MessageAttachmentFile'
    ) {
        attachment = pinMessage.attachments[0] as attachmentType;
    }

    const body = (
        <XView padding={32} flexDirection="column">
            <XView flexDirection="row" alignItems="center" justifyContent="space-between">
                <XView flexDirection="row" alignItems="center" flexGrow={1}>
                    <XView flexDirection="row" alignItems="center" marginRight={12}>
                        <XAvatar
                            style="user"
                            src={sender.photo || undefined}
                            objectId={sender.id}
                            objectName={sender.name}
                        />
                    </XView>
                    <XView flexDirection="column" flexGrow={1}>
                        <XView
                            flexDirection="row"
                            alignItems="center"
                            justifyContent="space-between"
                        >
                            <XView flexDirection="row" alignItems="center">
                                <XView
                                    as="a"
                                    path={'/mail/u/' + sender.id}
                                    color="rgba(0, 0, 0, 0.8)"
                                    hoverTextDecoration="none"
                                    fontWeight="600"
                                    fontSize={14}
                                >
                                    {sender.name}
                                </XView>
                                {sender.primaryOrganization && (
                                    <XView
                                        as="a"
                                        path={'/mail/o/' + sender.primaryOrganization.id}
                                        hoverTextDecoration="none"
                                        color="rgba(0, 0, 0, 0.4)"
                                        hoverColor="#1790ff"
                                        fontWeight="600"
                                        fontSize={12}
                                        marginLeft={8}
                                    >
                                        {sender.primaryOrganization.name}
                                    </XView>
                                )}
                            </XView>
                            <XView flexDirection="row" alignItems="center">
                                {canMeUnpinMessage && (
                                    <UnpinButton variables={{ chatId: props.chatId }} />
                                )}
                                <XModalCloser autoClose={true} />
                            </XView>
                        </XView>
                        <XView
                            flexDirection="row"
                            alignItems="center"
                            color="rgba(0, 0, 0, 0.4)"
                            fontWeight="600"
                            fontSize={12}
                        >
                            <XDate value={pinMessage.date} format="humanize" />
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
                        </XView>
                    </XView>
                </XView>
            </XView>
            <XView marginTop={12}>
                {message && <MessageTextComponent message={message} isEdited={false} />}
                {attachment && attachment.fileMetadata.isImage && (
                    <img
                        src={'https://ucarecdn.com/' + attachment.fileId + '/'}
                        className={ImageClassName}
                    />
                )}
                {attachment && !attachment.fileMetadata.isImage && (
                    <XView flexDirection="column">
                        <XView
                            height={1}
                            backgroundColor="#ececec"
                            width="100%"
                            flexShrink={0}
                            marginBottom={12}
                        />
                        <XView
                            flexDirection="row"
                            alignItems="center"
                            as="a"
                            hoverTextDecoration="none"
                            href={`https://ucarecdn.com/${attachment.fileId}/${
                                attachment.fileMetadata.name ? attachment.fileMetadata.name : ''
                            }`}
                        >
                            <XView
                                alignItems="center"
                                flexDirection="row"
                                flexShrink={0}
                                marginRight={8}
                            >
                                <AttachIcon />
                            </XView>
                            <XView flexDirection="row" alignItems="center">
                                <XView fontSize={13} color="#1790ff">
                                    {attachment.fileMetadata.name}
                                </XView>
                                <XView
                                    width={3}
                                    height={3}
                                    opacity={0.3}
                                    backgroundColor="#000"
                                    borderRadius="100%"
                                    flexShrink={0}
                                    marginHorizontal={5}
                                />
                                <XView fontSize={13} color="rgba(0, 0, 0, 0.5)">
                                    {niceBytes(Number(attachment.fileMetadata.size))}
                                </XView>
                            </XView>
                        </XView>
                    </XView>
                )}
            </XView>
        </XView>
    );

    const target = (
        <XView cursor="pointer">
            <ExpandIcon />
        </XView>
    );

    return <XModal body={body} target={target} footer={null} />;
};

const PinMessageText = (props: { message: string }) => (
    <span
        style={{
            display: 'block',
            whiteSpace: 'nowrap',
            textOverflow: 'ellipsis',
            maxWidth: '100%',
            overflow: 'hidden',
        }}
    >
        {emoji({ src: props.message, size: 14 })}
    </span>
);

export const PinMessageComponent = (props: PinMessageComponentProps) => {
    const isMobile = React.useContext(IsMobileContext);
    const { attachments } = props.pinMessage;
    const attach = attachments[0];
    return (
        <XView
            flexDirection="column"
            flexGrow={1}
            maxHeight={61}
            alignItems="center"
            backgroundColor="#fbfbfb"
        >
            <XView
                maxWidth={970}
                width="100%"
                height={60}
                flexShrink={0}
                flexGrow={1}
                paddingHorizontal={isMobile ? 34 : 74}
                alignItems="center"
                flexDirection="row"
                justifyContent="space-between"
            >
                <XView alignItems="center" flexDirection="row" maxWidth="100%" flexGrow={1}>
                    <XView
                        backgroundColor="#E4F0FB"
                        width={36}
                        height={36}
                        borderRadius="100%"
                        flexShrink={0}
                        marginRight={16}
                        flexDirection="row"
                        alignItems="center"
                        justifyContent="center"
                    >
                        <PinIcon />
                    </XView>
                    <XView flexDirection="column" maxWidth="70%">
                        <XView flexDirection="row" maxWidth="100%">
                            <XView
                                as="a"
                                path={'/mail/u/' + props.pinMessage.sender.id}
                                color="rgba(0, 0, 0, 0.8)"
                                hoverTextDecoration="none"
                                fontWeight="600"
                                fontSize={13}
                            >
                                {props.pinMessage.sender.name}
                            </XView>
                            {props.pinMessage.sender.primaryOrganization && (
                                <XView
                                    as="a"
                                    path={
                                        '/mail/o/' + props.pinMessage.sender.primaryOrganization.id
                                    }
                                    hoverTextDecoration="none"
                                    color="rgba(0, 0, 0, 0.4)"
                                    hoverColor="#1790ff"
                                    fontWeight="600"
                                    fontSize={13}
                                    marginLeft={8}
                                >
                                    {props.pinMessage.sender.primaryOrganization.name}
                                </XView>
                            )}
                        </XView>
                        <XView color="rgba(0, 0, 0, 0.8)" fontSize={14}>
                            {props.pinMessage.message && (
                                <PinMessageText message={props.pinMessage.message} />
                            )}
                            {attach.__typename === 'MessageAttachmentFile' && (
                                <>
                                    {attach && attach.fileMetadata.isImage && (
                                        <XView flexDirection="row" alignItems="center">
                                            <XView marginRight={6}>
                                                <IconImage />
                                            </XView>
                                            <XView>Image</XView>
                                        </XView>
                                    )}
                                    {attach && !attach.fileMetadata.isImage && (
                                        <XView flexDirection="row" alignItems="center">
                                            <XView marginRight={6}>
                                                <IconFile />
                                            </XView>
                                            <XView>Document</XView>
                                        </XView>
                                    )}
                                </>
                            )}
                        </XView>
                    </XView>
                </XView>
                <PinMessageModal
                    pinMessage={props.pinMessage}
                    chatId={props.chatId}
                    room={props.room}
                />
            </XView>
            <XView height={1} width="100%" flexShrink={0} backgroundColor="#ececec" />
        </XView>
    );
};
