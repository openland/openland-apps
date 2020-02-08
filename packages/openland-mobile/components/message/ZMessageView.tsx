import * as React from 'react';
import { FullMessage_GeneralMessage_attachments_MessageAttachmentFile, FullMessage, FullMessage_GeneralMessage_attachments_MessageRichAttachment } from 'openland-api/spacex.types';
import { View, Dimensions } from 'react-native';
import { getMessenger } from 'openland-mobile/utils/messenger';
import { ThemeContext } from 'openland-mobile/themes/ThemeContext';
import { isPad } from 'openland-mobile/pages/Root';
import { TextContent } from './content/TextContent';
import { ReplyContent } from './content/ReplyContent';
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
    const router = getMessenger().history.navigationManager;

    const { message, wrapped } = props;

    const handleUserPress = React.useCallback((id: string) => {
        router.push('ProfileUser', { id });
    }, []);

    const handleGroupPress = React.useCallback((id: string) => {
        router.push('ProfileGroup', { id });
    }, []);

    const handleOrganizationPress = React.useCallback((id: string) => {
        router.push('ProfileOrganization', { id });
    }, []);

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
            <TextContent key={'msg-' + message.id + '-text'} message={message} onUserPress={handleUserPress} onGroupPress={handleGroupPress} onOrganizationPress={handleOrganizationPress} wrapped={wrapped} theme={theme} />
        );
    }

    const attaches = message.__typename === 'GeneralMessage' ? message.attachments : [];
    const mediaAttaches = attaches.filter(a => a.__typename === 'MessageAttachmentFile' && a.fileMetadata.isImage) as FullMessage_GeneralMessage_attachments_MessageAttachmentFile[] || [];
    const documentsAttaches = attaches.filter(a => a.__typename === 'MessageAttachmentFile' && !a.fileMetadata.isImage) as FullMessage_GeneralMessage_attachments_MessageAttachmentFile[] || [];
    const augmenationAttaches = attaches.filter(a => a.__typename === 'MessageRichAttachment') as FullMessage_GeneralMessage_attachments_MessageRichAttachment[] || [];

    const replies = message.__typename === 'GeneralMessage' ? message.quotedMessages : [];
    const sticker = message.__typename === 'StickerMessage' && message.sticker.__typename === 'ImageSticker' ? message.sticker : undefined;
    const hasReply = !!(replies && replies.length > 0);
    const hasText = !!(message.message);

    let content: JSX.Element[] = [];

    if (hasReply) {
        content.push(<ReplyContent key={'msg-' + message.id + '-reply'} quotedMessages={replies} onUserPress={handleUserPress} onGroupPress={handleGroupPress} onOrganizationPress={handleOrganizationPress} onDocumentPress={handleDocumentPress} theme={theme} />);
    }

    if (message.__typename === 'GeneralMessage') {
        mediaAttaches.map((file, index) => {
            let imageLayout = layoutImage(file.fileMetadata, maxWidth);

            if (imageLayout) {
                content.push(<MediaContent key={'msg-' + message.id + '-media-' + index} imageLayout={imageLayout} message={message} attach={file} theme={theme} />);
            }
        });
    }

    if (hasText) {
        content.push(<TextContent key={'msg-' + message.id + '-text'} message={message} onUserPress={handleUserPress} onGroupPress={handleGroupPress} onOrganizationPress={handleOrganizationPress} wrapped={wrapped} theme={theme} />);
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