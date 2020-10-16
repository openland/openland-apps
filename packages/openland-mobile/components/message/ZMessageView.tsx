import * as React from 'react';
import { FullMessage_GeneralMessage_attachments_MessageAttachmentFile, FullMessage, FullMessage_GeneralMessage_attachments_MessageRichAttachment, FullMessage_GeneralMessage_attachments_MessageAttachmentPurchase } from 'openland-api/spacex.types';
import { View, Dimensions } from 'react-native';
import { getMessenger } from 'openland-mobile/utils/messenger';
import { ThemeContext } from 'openland-mobile/themes/ThemeContext';
import { isPad } from 'openland-mobile/pages/Root';
import { TextContent } from './content/TextContent';
import { ReplyContent } from './content/ReplyContent';
import { DonationContent } from './content/DonationContent';
import { layoutImage } from 'openland-mobile/messenger/components/content/MediaContent';
import { MediaContent } from './content/MediaContent';
import { RichAttachContent } from './content/RichAttachContent';
import { DocumentContent } from './content/DocumentContent';
import { StickerContent } from './content/StickerContent';
import { showFileModal } from '../file/showFileModal';

export interface ZMessageViewProps {
    message: FullMessage;

    wrapped?: boolean;
    maxWidth?: number;
}

export const ZMessageView = React.memo<ZMessageViewProps>((props) => {
    const theme = React.useContext(ThemeContext);
    const messenger = getMessenger();

    const { message, wrapped } = props;

    const handleUserPress = React.useCallback((id: string) => messenger.handleUserPress(id), []);
    const handleGroupPress = React.useCallback((id: string) => messenger.handleGroupPress(id), []);
    const handleOrganizationPress = React.useCallback((id: string) => messenger.handleOrganizationPress(id), []);
    const handleHashtagPress = React.useCallback((tag?: string) => messenger.handleHashtagPress(tag), []);

    const handleDocumentPress = React.useCallback((document: FullMessage_GeneralMessage_attachments_MessageAttachmentFile) => {
        showFileModal({ uuid: document.fileId, name: document.fileMetadata.name, size: document.fileMetadata.size });
    }, []);

    const screenWidth = Dimensions.get('screen').width;
    let maxWidth = props.maxWidth || Dimensions.get('screen').width - 32;

    if (isPad && screenWidth > 375 * 2) {
        maxWidth -= screenWidth > 1000 ? 375 : 320;
    }

    if (message.__typename === 'ServiceMessage') {
        return (
            <TextContent key={'msg-' + message.id + '-text'} message={message} onUserPress={handleUserPress} onGroupPress={handleGroupPress} onOrganizationPress={handleOrganizationPress} onHashtagPress={handleHashtagPress} wrapped={wrapped} theme={theme} />
        );
    }

    const attaches = message.__typename === 'GeneralMessage' ? message.attachments : [];
    const mediaAttaches = attaches.filter(a => a.__typename === 'MessageAttachmentFile' && a.fileMetadata.isImage) as FullMessage_GeneralMessage_attachments_MessageAttachmentFile[] || [];
    const documentsAttaches = attaches.filter(a => a.__typename === 'MessageAttachmentFile' && !a.fileMetadata.isImage) as FullMessage_GeneralMessage_attachments_MessageAttachmentFile[] || [];
    const augmenationAttaches = attaches.filter(a => a.__typename === 'MessageRichAttachment') as FullMessage_GeneralMessage_attachments_MessageRichAttachment[] || [];
    const purchaseAttach = attaches.filter(a => a.__typename === 'MessageAttachmentPurchase') as FullMessage_GeneralMessage_attachments_MessageAttachmentPurchase[] || [];

    const replies = message.__typename === 'GeneralMessage' ? message.quotedMessages : [];
    const sticker = message.__typename === 'StickerMessage' && message.sticker.__typename === 'ImageSticker' ? message.sticker : undefined;
    const hasReply = !!(replies && replies.length > 0);
    const hasText = !!(message.message);

    let content: JSX.Element[] = [];

    if (hasReply) {
        content.push(<ReplyContent key={'msg-' + message.id + '-reply'} quotedMessages={replies} onUserPress={handleUserPress} onGroupPress={handleGroupPress} onOrganizationPress={handleOrganizationPress} onHashtagPress={handleHashtagPress} onDocumentPress={handleDocumentPress} theme={theme} />);
    }

    if (message.__typename === 'GeneralMessage' && mediaAttaches.length > 0) {
        content.push(<MediaContent key={'msg-' + message.id + '-media'} maxWidth={maxWidth} message={message} theme={theme} />);
    }

    if (message.__typename === 'GeneralMessage') {
        purchaseAttach.forEach(attach => {
            content.push(<DonationContent attach={attach} hasText={hasText} />);
        });
    }

    if (hasText) {
        content.push(<TextContent key={'msg-' + message.id + '-text'} message={message} onUserPress={handleUserPress} onGroupPress={handleGroupPress} onOrganizationPress={handleOrganizationPress} onHashtagPress={handleHashtagPress} wrapped={wrapped} theme={theme} />);
    }

    if (sticker) {
        content.push(<StickerContent key={'msg-' + message.id + '-sticker'} sticker={sticker} />);
    }

    if (message.__typename === 'GeneralMessage') {
        documentsAttaches.map((file, index) => {
            content.push(<DocumentContent key={'msg-' + message.id + '-document-' + index} attach={file} onDocumentPress={handleDocumentPress} theme={theme} />);
        });

        augmenationAttaches.map((attach, index) => {
            let imageLayout;

            if (attach.image && attach.image.metadata) {
                imageLayout = layoutImage(attach.image.metadata, maxWidth);
            }

            content.push(<RichAttachContent key={'msg-' + message.id + '-rich-' + index} maxWidth={maxWidth} attach={attach} imageLayout={imageLayout} message={message} wrapped={wrapped} theme={theme} />);
        });
    }

    return (
        <View>
            {content}
        </View>
    );
});