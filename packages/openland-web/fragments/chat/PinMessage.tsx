import * as React from 'react';
import { css } from 'linaria';
import Glamorous from 'glamorous';
import { XView } from 'react-mental';
import { XLink2 } from 'openland-x/XLink2';
import { XAvatar } from 'openland-x/XAvatar';
import { XModal, XModalCloser } from 'openland-x-modal/XModal';
import { IsMobileContext } from 'openland-web/components/Scaffold/IsMobileContext';
import {
    FullMessage_GeneralMessage_attachments_MessageAttachmentFile,
    Room_room_SharedRoom_pinnedMessage_GeneralMessage,
    Room_room_SharedRoom_pinnedMessage_GeneralMessage_attachments_MessageAttachmentFile,
    RoomChat_room,
    RoomChat_room_PrivateRoom_pinnedMessage_GeneralMessage,
    RoomChat_room_SharedRoom,
} from 'openland-api/Types';
import { XDate } from 'openland-x/XDate';
import { MessageTextComponent } from 'openland-web/components/messenger/message/content/MessageTextComponent';
import { niceBytes } from 'openland-web/components/messenger/message/content/MessageFileComponent';
import { XMutation } from 'openland-x/XMutation';
import IconFile from 'openland-icons/ic-pinfile-doc.svg';
import IconImage from 'openland-icons/ic-pinfile-photo.svg';
import ForwardIcon from 'openland-icons/ic-reply-2.svg';
import PinIcon from 'openland-icons/ic-pinned-message.svg';
import ExpandIcon from 'openland-icons/ic-expand-pinmessage.svg';
import AttachIcon from 'openland-icons/ic-attach-doc-blue.svg';
import CloseIcon from 'openland-icons/ic-close.svg';
import { MessageReplyComponent } from 'openland-web/components/messenger/message/content/MessageReplyComponent';
import { XLink } from 'openland-x/XLink';
import { useClient } from 'openland-web/utils/useClient';
import { MutationFunc } from 'react-apollo';
import { processSpans } from 'openland-y-utils/spans/processSpans';

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
    pinMessage:
    | Room_room_SharedRoom_pinnedMessage_GeneralMessage
    | RoomChat_room_PrivateRoom_pinnedMessage_GeneralMessage;
    chatId: string;
    room: RoomChat_room;
    target?: any;
}

const PinMessageModal = React.memo((props: PinMessageComponentProps) => {
    const isMobile = React.useContext(IsMobileContext);
    const { room, pinMessage } = props;
    const { sender, message } = pinMessage;
    const privateRoom = room.__typename === 'PrivateRoom';
    let sharedRoom = room.__typename === 'SharedRoom' ? (room as RoomChat_room_SharedRoom) : null;
    let canMeUnpinMessage = sharedRoom && sharedRoom.canEdit;
    let attachment: attachmentType | null = null;

    if (
        pinMessage.attachments.length > 0 &&
        pinMessage.attachments[0].__typename === 'MessageAttachmentFile'
    ) {
        attachment = pinMessage.attachments[0] as attachmentType;
    }

    if (privateRoom) {
        canMeUnpinMessage = true;
    }

    let quotedMessages = [];

    if (pinMessage.quotedMessages && pinMessage.quotedMessages!.length > 0) {
        quotedMessages.push(
            <ReplyMessageWrapper key={'reply_message' + pinMessage.id}>
                {pinMessage.quotedMessages!.map((item, index, array) => {
                    let attachments:
                        | FullMessage_GeneralMessage_attachments_MessageAttachmentFile
                        | undefined = undefined;

                    let isCompact =
                        index > 0 ? array[index - 1].sender.id === item.sender.id : false;

                    if (
                        item &&
                        (item as any).attachments[0] &&
                        !(item as any).attachments[0].title &&
                        !(item as any).attachments[0].titleLink
                    ) {
                        attachments = {
                            __typename: (item as any).attachments[0].__typename,
                            fallback: (item as any).attachments[0].fallback,
                            id: (item as any).attachments[0].fileId,
                            fileId: (item as any).attachments[0].fileId,
                            fileMetadata: (item as any).attachments[0].fileMetadata,
                            filePreview: (item as any).attachments[0].filePreview,
                        };
                    }

                    return (
                        <MessageReplyComponent
                            spans={processSpans(item.message || '', pinMessage.spans)}
                            sender={item.sender}
                            date={item.date}
                            message={item.message}
                            id={item.id}
                            key={'reply_message' + item.id + index}
                            edited={false}
                            attach={attachments}
                            startSelected={false}
                            compact={isCompact || undefined}
                        />
                    );
                })}
            </ReplyMessageWrapper>,
        );
    }

    const body = (
        <XView
            paddingHorizontal={32}
            paddingTop={isMobile ? 0 : 30}
            paddingBottom={30}
            flexDirection="column"
        >
            {isMobile && (
                <XView
                    height={52}
                    marginBottom={8}
                    flexDirection="row"
                    alignItems="center"
                    justifyContent="space-between"
                >
                    <XView color="rgba(0, 0, 0, 0.9)" fontSize={20} fontWeight="600">
                        Pinned message
                    </XView>
                    <Close autoClose={true}>
                        <CloseIcon />
                    </Close>
                </XView>
            )}
            <XView flexDirection="row" alignItems="center" justifyContent="space-between">
                <XView flexDirection="row" alignItems="center" flexGrow={1}>
                    <XView flexDirection="row" alignItems="center" marginRight={12}>
                        <XAvatar
                            style="user"
                            src={sender.photo || undefined}
                            objectId={sender.id}
                            objectName={sender.name}
                            online={false}
                        />
                    </XView>
                    <XView flexDirection="column" flexGrow={1}>
                        <XView
                            flexDirection="row"
                            alignItems="center"
                            justifyContent="space-between"
                        >
                            <XView flexDirection="row" alignItems="center">
                                <XLink2
                                    path={'/mail/u/' + sender.id}
                                    color="rgba(0, 0, 0, 0.8)"
                                    hoverTextDecoration="none"
                                    fontWeight="600"
                                    fontSize={14}
                                    autoClose={true}
                                >
                                    {sender.name}
                                </XLink2>
                                {sender.primaryOrganization && (
                                    <XLink2
                                        path={'/mail/o/' + sender.primaryOrganization.id}
                                        hoverTextDecoration="none"
                                        color="rgba(0, 0, 0, 0.4)"
                                        hoverColor="#1790ff"
                                        fontWeight="600"
                                        fontSize={12}
                                        marginLeft={8}
                                        marginBottom={-2}
                                        autoClose={true}
                                    >
                                        {sender.primaryOrganization.name}
                                    </XLink2>
                                )}
                            </XView>
                            <XView flexDirection="row" alignItems="center">
                                {canMeUnpinMessage && (
                                    <UnpinButton variables={{ chatId: props.chatId }} />
                                )}
                                {!isMobile && <XModalCloser autoClose={true} />}
                            </XView>
                        </XView>
                        <XView
                            flexDirection="row"
                            alignItems="center"
                            color="rgba(0, 0, 0, 0.4)"
                            fontWeight="600"
                            fontSize={12}
                        >
                            <XDate value={pinMessage.date} format="datetime_short" />
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
                {message && (
                    <MessageTextComponent
                        spans={processSpans(message, pinMessage.spans)}
                        isEdited={false}
                    />
                )}
                {attachment &&
                    attachment.fileMetadata.isImage && (
                        <img
                            src={'https://ucarecdn.com/' + attachment.fileId + '/'}
                            className={ImageClassName}
                        />
                    )}
                {attachment &&
                    !attachment.fileMetadata.isImage && (
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
                {quotedMessages}
            </XView>
        </XView>
    );

    let target = (
        <XView cursor="pointer">
            <ExpandIcon />
        </XView>
    );

    if (props.target) {
        target = props.target;
    }

    return <XModal body={body} target={target} footer={null} />;
});

const ForwardIconClassName = css`
    path {
        fill: rgba(0, 0, 0, 0.2);
    }
`;

export const PinMessageComponent = React.memo((props: PinMessageComponentProps) => {
    const isMobile = React.useContext(IsMobileContext);
    const { pinMessage, chatId, room } = props;
    const { attachments, sender } = pinMessage;
    const attach = attachments[0];
    const privateRoom = room.__typename === 'PrivateRoom';
    let hideSender = room.__typename === 'SharedRoom' && room.kind === 'GROUP';
    if (privateRoom) {
        hideSender = false;
    }
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
                paddingHorizontal={isMobile ? 20 : 80}
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
                    <XView flexDirection="column" maxWidth="calc(100% - 70px)">
                        {!hideSender && (
                            <XView flexDirection="row" maxWidth="100%">
                                <XView
                                    as="a"
                                    path={'/mail/u/' + sender.id}
                                    color="rgba(0, 0, 0, 0.8)"
                                    hoverTextDecoration="none"
                                    fontWeight="600"
                                    fontSize={13}
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
                                        fontSize={13}
                                        marginLeft={8}
                                    >
                                        {sender.primaryOrganization.name}
                                    </XView>
                                )}
                            </XView>
                        )}
                        <PinMessageModal
                            pinMessage={pinMessage}
                            chatId={chatId}
                            room={room}
                            target={
                                <XView fontSize={14} cursor="pointer">
                                    {pinMessage.message && (
                                        <MessageTextComponent
                                            spans={processSpans(
                                                pinMessage.message,
                                                pinMessage.spans,
                                                true,
                                            )}
                                            isEdited={false}
                                            asPinMessage={true}
                                            shouldCrop
                                        />
                                    )}
                                    {pinMessage.quotedMessages &&
                                        pinMessage.quotedMessages!.length > 0 &&
                                        !pinMessage.message && (
                                            <XView flexDirection="row" alignItems="center">
                                                <XView marginRight={6}>
                                                    <ForwardIcon className={ForwardIconClassName} />
                                                </XView>
                                                <XView color="rgba(0, 0, 0, 0.5)">Forward</XView>
                                            </XView>
                                        )}
                                    {attach &&
                                        attach.__typename === 'MessageAttachmentFile' && (
                                            <>
                                                {attach.fileMetadata.isImage && (
                                                    <XView flexDirection="row" alignItems="center">
                                                        <XView marginRight={6}>
                                                            <IconImage />
                                                        </XView>
                                                        <XView color="rgba(0, 0, 0, 0.5)">
                                                            Image
                                                        </XView>
                                                    </XView>
                                                )}
                                                {!attach.fileMetadata.isImage && (
                                                    <XView flexDirection="row" alignItems="center">
                                                        <XView marginRight={6}>
                                                            <IconFile />
                                                        </XView>
                                                        <XView color="rgba(0, 0, 0, 0.5)">
                                                            Document
                                                        </XView>
                                                    </XView>
                                                )}
                                            </>
                                        )}
                                </XView>
                            }
                        />
                    </XView>
                </XView>
                <PinMessageModal pinMessage={pinMessage} chatId={chatId} room={room} />
            </XView>
            <XView height={1} width="100%" flexShrink={0} backgroundColor="#ececec" />
        </XView>
    );
});
