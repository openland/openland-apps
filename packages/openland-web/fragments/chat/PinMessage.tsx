import * as React from 'react';
import { css } from 'linaria';
import { XView } from 'react-mental';
import { IsMobileContext } from 'openland-web/components/Scaffold/IsMobileContext';
import { MessageTextComponent } from 'openland-web/components/messenger/message/content/MessageTextComponent';
import { PinMessageModal, PinMessageComponentProps } from './PinMessageModal';
import IconFile from 'openland-icons/ic-pinfile-doc.svg';
import IconImage from 'openland-icons/ic-pinfile-photo.svg';
import ForwardIcon from 'openland-icons/ic-reply-2.svg';
import PinIcon from 'openland-icons/ic-pinned-message.svg';

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
                        <PinMessageModal
                            pinMessage={pinMessage}
                            chatId={chatId}
                            room={room}
                            target={
                                <XView
                                    color="rgba(0, 0, 0, 0.8)"
                                    hoverColor="rgba(0, 0, 0, 0.8)"
                                    fontSize={14}
                                    cursor="pointer"
                                >
                                    {pinMessage.message && (
                                        <MessageTextComponent
                                            spans={pinMessage.spans}
                                            message={pinMessage.message}
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
                                    {attach && attach.__typename === 'MessageAttachmentFile' && (
                                        <>
                                            {attach.fileMetadata.isImage && (
                                                <XView flexDirection="row" alignItems="center">
                                                    <XView marginRight={6}>
                                                        <IconImage />
                                                    </XView>
                                                    <XView>Image</XView>
                                                </XView>
                                            )}
                                            {!attach.fileMetadata.isImage && (
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
