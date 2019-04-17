import * as React from 'react';
import { AppTheme } from 'openland-mobile/themes/themes';
import { FullMessage_GeneralMessage, FullMessage_GeneralMessage_attachments_MessageAttachmentFile, FullMessage_GeneralMessage_attachments_MessageRichAttachment } from 'openland-api/Types';
import { MediaContent } from './content/MediaContent';
import { ReplyContent } from './content/ReplyContent';
import { TextContent } from './content/TextContent';
import { DocumentContent } from './content/DocumentContent';
import { RichAttachContent } from './content/RichAttachContent';
import { layoutImage } from 'openland-mobile/messenger/components/content/MediaContent';
import { Dimensions } from 'react-native';

interface ExtractContentProps {
    message: FullMessage_GeneralMessage;

    onUserPress: (id: string) => void;
    onDocumentPress: (document: FullMessage_GeneralMessage_attachments_MessageAttachmentFile) => void;
}

export let extractContent = (props: ExtractContentProps, isSmall?: boolean, maxWidth?: number) => {
    let message = props.message;
    let realMaxWidth = maxWidth || Dimensions.get('screen').width - 32;

    let attaches = (message.attachments || []);
    let fileAttaches = attaches.filter(a => a.__typename === 'MessageAttachmentFile') as FullMessage_GeneralMessage_attachments_MessageAttachmentFile[] || [];
    let augmenationAttaches = attaches.filter(a => a.__typename === 'MessageRichAttachment') as FullMessage_GeneralMessage_attachments_MessageRichAttachment[] || [];

    let hasReply = !!(message.quotedMessages && message.quotedMessages.length > 0);
    let hasText = !!(message.message);

    let content: JSX.Element[] = [];

    if (hasReply) {
        content.push(<ReplyContent key="msg-reply" quotedMessages={message.quotedMessages} onUserPress={props.onUserPress} onDocumentPress={props.onDocumentPress} />);
    }
    if (hasText) {
        content.push(<TextContent key="msg-text" message={message} onUserPress={props.onUserPress} isSmall={isSmall} />);
    }

    fileAttaches.map((file, index) => {
        let isImage = file.fileMetadata.isImage;
    
        if (isImage) {
            let imageLayout = layoutImage(file.fileMetadata, realMaxWidth);
    
            if (imageLayout) {
                content.push(<MediaContent key={'msg-media-' + index} imageLayout={imageLayout} message={message} attach={file} />);
            }
        } else {
            content.push(<DocumentContent key={'msg-document-' + index} attach={file} message={message} onDocumentPress={props.onDocumentPress} />);
        }
    });

    augmenationAttaches.map((attach, index) => {
        let imageLayout;

        if (attach.image && attach.image.metadata) {
            imageLayout = layoutImage(attach.image.metadata, realMaxWidth);
        }

        content.push(<RichAttachContent key={'msg-rich-' + index} attach={attach} imageLayout={imageLayout} message={message} />);
    });

    return content;
}