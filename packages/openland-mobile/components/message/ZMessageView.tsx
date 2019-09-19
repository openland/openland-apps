import * as React from 'react';
import { FullMessage_GeneralMessage_attachments_MessageAttachmentFile, FullMessage, FullMessage_GeneralMessage_attachments_MessageRichAttachment } from 'openland-api/Types';
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

    const handleDocumentPress = React.useCallback((document: FullMessage_GeneralMessage_attachments_MessageAttachmentFile) => {
        showFileModal({ uuid: document.fileId, name: document.fileMetadata.name, size: document.fileMetadata.size });
    }, []);

    let maxWidth = props.maxWidth || Dimensions.get('screen').width - 32;

    if (isPad) {
        maxWidth -= 320;
    }

    if (message.__typename === 'ServiceMessage') {
        return (
            <TextContent key={'msg-' + message.id + '-text'} message={message} onUserPress={handleUserPress} onGroupPress={handleGroupPress} wrapped={wrapped} theme={theme} />
        );
    }

    let attaches = (message.attachments || []);
    let mediaAttaches = attaches.filter(a => a.__typename === 'MessageAttachmentFile' && a.fileMetadata.isImage) as FullMessage_GeneralMessage_attachments_MessageAttachmentFile[] || [];
    let documentsAttaches = attaches.filter(a => a.__typename === 'MessageAttachmentFile' && !a.fileMetadata.isImage) as FullMessage_GeneralMessage_attachments_MessageAttachmentFile[] || [];
    let augmenationAttaches = attaches.filter(a => a.__typename === 'MessageRichAttachment') as FullMessage_GeneralMessage_attachments_MessageRichAttachment[] || [];

    let hasReply = !!(message.quotedMessages && message.quotedMessages.length > 0);
    let hasText = !!(message.message);

    let content: JSX.Element[] = [];

    if (hasReply) {
        content.push(<ReplyContent key={'msg-' + message.id + '-reply'} quotedMessages={message.quotedMessages} onUserPress={handleUserPress} onGroupPress={handleGroupPress} onDocumentPress={handleDocumentPress} theme={theme} />);
    }

    mediaAttaches.map((file, index) => {
        let imageLayout = layoutImage(file.fileMetadata, maxWidth);

        if (imageLayout) {
            content.push(<MediaContent key={'msg-' + message.id + '-media-' + index} imageLayout={imageLayout} message={message} attach={file} theme={theme} />);
        }
    });

    if (hasText) {
        content.push(<TextContent key={'msg-' + message.id + '-text'} message={message} onUserPress={handleUserPress} onGroupPress={handleGroupPress} wrapped={wrapped} theme={theme} />);
    }

    documentsAttaches.map((file, index) => {
        content.push(<DocumentContent key={'msg-' + message.id + '-document-' + index} attach={file} message={message} onDocumentPress={handleDocumentPress} theme={theme} />);
    });

    augmenationAttaches.map((attach, index) => {
        let imageLayout;

        if (attach.image && attach.image.metadata) {
            imageLayout = layoutImage(attach.image.metadata, maxWidth);
        }

        content.push(<RichAttachContent key={'msg-' + message.id + '-rich-' + index} maxWidth={maxWidth} attach={attach} imageLayout={imageLayout} message={message} wrapped={wrapped} theme={theme} />);
    });

    return (
        <View>
            {content}
        </View>
    );
});