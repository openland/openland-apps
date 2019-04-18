import * as React from 'react';
import { XView } from 'react-mental';
import Glamorous from 'glamorous';
import { css } from 'linaria';
import { XAvatar } from 'openland-x/XAvatar';
import { XModal, XModalCloser } from 'openland-x-modal/XModal';
import { IsMobileContext } from 'openland-web/components/Scaffold/IsMobileContext';
import {
    FullMessage_GeneralMessage,
    FullMessage_GeneralMessage_attachments_MessageAttachmentFile,
    Room_room_PrivateRoom,
    Room_room_SharedRoom,
} from 'openland-api/Types';
import { XDate } from 'openland-x/XDate';
import { MessageTextComponent } from 'openland-web/components/messenger/message/content/MessageTextComponent';
import { niceBytes } from 'openland-web/components/messenger/message/content/MessageFileComponent';
import ExpandIcon from 'openland-icons/ic-expand-pinmessage.svg';
import AttachIcon from 'openland-icons/ic-attach-doc-blue.svg';
import CloseIcon from 'openland-icons/ic-close.svg';
import { XLink } from 'openland-x/XLink';
import { MessageReplyComponent } from 'openland-web/components/messenger/message/content/MessageReplyComponent';

export interface MessageComponentProps {
    nearCrossButtons: any;
    generalMessage: FullMessage_GeneralMessage;
    chatId: string;
    room: Room_room_SharedRoom | Room_room_PrivateRoom;
    target?: any;
}

const ImageClassName = css`
    max-height: 40vh;
    max-width: 100%;
    object-fit: contain;
`;

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

type attachmentType = FullMessage_GeneralMessage_attachments_MessageAttachmentFile;

// {canMeUnpinMessage && (
//     <UnpinButton variables={{ chatId: props.chatId }} />
// )}

// let canMeUnpinMessage = false;
// if ((room as Room_room_SharedRoom).kind === 'GROUP') {
//     canMeUnpinMessage = true;
// }

export const MessageModal = React.memo((props: MessageComponentProps) => {
    const isMobile = React.useContext(IsMobileContext);
    const { generalMessage, nearCrossButtons } = props;
    const { sender, message } = generalMessage;

    let attachment: attachmentType | null = null;

    if (
        generalMessage.attachments.length > 0 &&
        generalMessage.attachments[0].__typename === 'MessageAttachmentFile'
    ) {
        attachment = generalMessage.attachments[0] as attachmentType;
    }

    let target = (
        <XView cursor="pointer">
            <ExpandIcon />
        </XView>
    );

    if (props.target) {
        target = props.target;
    }

    let quotedMessages = [];

    if (generalMessage.quotedMessages && generalMessage.quotedMessages!.length > 0) {
        quotedMessages.push(
            <ReplyMessageWrapper key={'reply_message' + generalMessage.id}>
                {generalMessage.quotedMessages!.map((item, index, array) => {
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
                            spans={generalMessage.spans}
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

    return (
        <XModal
            body={
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
                                                marginBottom={-2}
                                            >
                                                {sender.primaryOrganization.name}
                                            </XView>
                                        )}
                                    </XView>
                                    <XView flexDirection="row" alignItems="center">
                                        {nearCrossButtons}
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
                                    <XDate value={generalMessage.date} format="datetime_short" />
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
                                spans={generalMessage.spans}
                                message={message}
                                isEdited={false}
                            />
                        )}
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
                                        attachment.fileMetadata.name
                                            ? attachment.fileMetadata.name
                                            : ''
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
            }
            target={target}
            footer={null}
        />
    );
});
