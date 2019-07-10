import * as React from 'react';
import { FullMessage_GeneralMessage, FullMessage_GeneralMessage_attachments_MessageAttachmentFile, FullMessage_GeneralMessage_attachments_MessageRichAttachment } from 'openland-api/Types';
import { MediaContent } from './content/MediaContent';
import { ReplyContent } from './content/ReplyContent';
import { TextContent } from './content/TextContent';
import { DocumentContent } from './content/DocumentContent';
import { RichAttachContent } from './content/RichAttachContent';
import { layoutImage } from 'openland-mobile/messenger/components/content/MediaContent';
import { Dimensions } from 'react-native';
import { isPad } from 'openland-mobile/pages/Root';
import { ThemeGlobal } from 'openland-y-utils/themes/types';

interface ExtractContentProps {
    message: FullMessage_GeneralMessage;
    theme: ThemeGlobal;

    onUserPress: (id: string) => void;
    onGroupPress: (id: string) => void;
    onDocumentPress: (document: FullMessage_GeneralMessage_attachments_MessageAttachmentFile) => void;
}

export let extractContent = (props: ExtractContentProps, isSmall?: boolean, maxWidth?: number) => {
    const { theme, message } = props;
    let realMaxWidth = maxWidth || Dimensions.get('screen').width - 32;

    if (isPad) {
        realMaxWidth -= 320;
    }

    let attaches = (message.attachments || []);
    let mediaAttaches = attaches.filter(a => a.__typename === 'MessageAttachmentFile' && a.fileMetadata.isImage) as FullMessage_GeneralMessage_attachments_MessageAttachmentFile[] || [];
    let documentsAttaches = attaches.filter(a => a.__typename === 'MessageAttachmentFile' && !a.fileMetadata.isImage) as FullMessage_GeneralMessage_attachments_MessageAttachmentFile[] || [];
    let augmenationAttaches = attaches.filter(a => a.__typename === 'MessageRichAttachment') as FullMessage_GeneralMessage_attachments_MessageRichAttachment[] || [];

    let hasReply = !!(message.quotedMessages && message.quotedMessages.length > 0);
    let hasText = !!(message.message);

    let content: JSX.Element[] = [];

    if (hasReply) {
        content.push(<ReplyContent key={'msg-' + message.id + '-reply'} quotedMessages={message.quotedMessages} onUserPress={props.onUserPress} onGroupPress={props.onGroupPress} onDocumentPress={props.onDocumentPress} theme={theme} />);
    }

    mediaAttaches.map((file, index) => {
        let imageLayout = layoutImage(file.fileMetadata, realMaxWidth);

        if (imageLayout) {
            content.push(<MediaContent key={'msg-' + message.id + '-media-' + index} imageLayout={imageLayout} message={message} attach={file} theme={theme} />);
        }
    });

    if (hasText) {
        content.push(<TextContent key={'msg-' + message.id + '-text'} message={message} onUserPress={props.onUserPress} onGroupPress={props.onGroupPress} isSmall={isSmall} theme={theme} />);
    }

    documentsAttaches.map((file, index) => {
        content.push(<DocumentContent key={'msg-' + message.id + '-document-' + index} attach={file} message={message} onDocumentPress={props.onDocumentPress} theme={theme} />);
    });

    augmenationAttaches.map((attach, index) => {
        let imageLayout;

        if (attach.image && attach.image.metadata) {
            imageLayout = layoutImage(attach.image.metadata, realMaxWidth);
        }

        content.push(<RichAttachContent key={'msg-' + message.id + '-rich-' + index} maxWidth={realMaxWidth} attach={attach} imageLayout={imageLayout} message={message} isSmall={isSmall} theme={theme} />);
    });

    return content;
};