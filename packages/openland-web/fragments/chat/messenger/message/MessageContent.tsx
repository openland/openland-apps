import * as React from 'react';
import { DataSourceMessageItem } from "openland-engines/messenger/ConversationEngine";
import { FullMessage_GeneralMessage_attachments_MessageAttachmentFile, FullMessage_GeneralMessage_attachments_MessageRichAttachment } from 'openland-api/Types';
import { MessageTextComponent } from './content/MessageTextComponent';
import { messages } from 'openland-engines/mocks';
import { DataSourceWebMessageItem } from '../data/WebMessageItemDataSource';
import { SpanType } from 'openland-y-utils/spans/Span';
import { processSpans } from 'openland-y-utils/spans/processSpans';

export const MessageContent = (props: { message: DataSourceWebMessageItem }) => {
    let { message } = props;
    let attaches = (message.attachments || []);
    let mediaAttaches = attaches.filter(a => a.__typename === 'MessageAttachmentFile' && a.fileMetadata.isImage) as FullMessage_GeneralMessage_attachments_MessageAttachmentFile[] || [];
    let documentsAttaches = attaches.filter(a => a.__typename === 'MessageAttachmentFile' && !a.fileMetadata.isImage) as FullMessage_GeneralMessage_attachments_MessageAttachmentFile[] || [];
    let augmenationAttaches = attaches.filter(a => a.__typename === 'MessageRichAttachment') as FullMessage_GeneralMessage_attachments_MessageRichAttachment[] || [];

    let hasReply = !!(message.reply && message.reply.length > 0);
    let hasText = !!(message.text);

    let content: JSX.Element[] = [];

    // uncomment while implementing content

    // if (hasReply) {
    //     content.push(<ReplyContent key={'msg-' + message.id + '-reply'} quotedMessages={message.quotedMessages} onUserPress={props.onUserPress} onGroupPress={props.onGroupPress} onDocumentPress={props.onDocumentPress} theme={theme} />);
    // }

    // mediaAttaches.map((file, index) => {
    //     let imageLayout = layoutImage(file.fileMetadata, realMaxWidth);

    //     if (imageLayout) {
    //         content.push(<MediaContent key={'msg-' + message.id + '-media-' + index} imageLayout={imageLayout} message={message} attach={file} theme={theme} />);
    //     }
    // });

    if (hasText) {
        content.push(<MessageTextComponent spans={message.textSpans} isEdited={!!message.isEdited} />);
    }

    // documentsAttaches.map((file, index) => {
    //     content.push(<DocumentContent key={'msg-' + message.id + '-document-' + index} attach={file} message={message} onDocumentPress={props.onDocumentPress} theme={theme} />);
    // });

    // augmenationAttaches.map((attach, index) => {
    //     let imageLayout;

    //     if (attach.image && attach.image.metadata) {
    //         imageLayout = layoutImage(attach.image.metadata, realMaxWidth);
    //     }

    //     content.push(<RichAttachContent key={'msg-' + message.id + '-rich-' + index} maxWidth={realMaxWidth} attach={attach} imageLayout={imageLayout} message={message} isSmall={isSmall} theme={theme} />);
    // });

    if (!content.length) {
        let text = 'Unsupported content: ' + message.fallback;
        content.push(<MessageTextComponent spans={[{ type: SpanType.italic, offset: 0, length: text.length, childrens: [{ type: SpanType.text, text, offset: 0, length: text.length }] }]} isEdited={false} />);
    }

    return <>{content}</>;
};