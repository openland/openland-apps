import * as React from 'react';
import { FullMessage_GeneralMessage_attachments_MessageAttachmentFile, FullMessage_GeneralMessage_attachments_MessageRichAttachment } from 'openland-api/Types';
import { MessageTextComponent } from './content/MessageTextComponent';
import { DataSourceWebMessageItem } from '../data/WebMessageItemDataSource';
import { SpanType } from 'openland-y-utils/spans/Span';
import { ReplyContent } from './content/ReplyContent';
import { ImageContent } from './content/ImageContent';

export const MessageContent = (props: { message: DataSourceWebMessageItem }) => {
    let { message } = props;
    let attaches = (message.attachments || []);
    let imageAttaches = attaches.filter(a => a.__typename === 'MessageAttachmentFile' && a.fileMetadata.isImage) as FullMessage_GeneralMessage_attachments_MessageAttachmentFile[] || [];
    let documentsAttaches = attaches.filter(a => a.__typename === 'MessageAttachmentFile' && !a.fileMetadata.isImage) as FullMessage_GeneralMessage_attachments_MessageAttachmentFile[] || [];
    let augmenationAttaches = attaches.filter(a => a.__typename === 'MessageRichAttachment') as FullMessage_GeneralMessage_attachments_MessageRichAttachment[] || [];

    let hasReply = !!(message.reply && message.reply.length > 0);
    let hasText = !!(message.text);

    // TODO: implement upper, forward here
    let onUserPress = (uid: string) => {
        //
    };

    let onGroupPress = (gid: string) => {
        //
    };

    let content: JSX.Element[] = [];

    if (message.reply) {
        content.push(<ReplyContent key={'msg-' + message.id + '-reply'} quotedMessages={message.replyWeb} onUserPress={onUserPress} onGroupPress={onGroupPress} />);
    }

    imageAttaches.map((file) => {
        content.push(<ImageContent key={'msg-' + message.id + '-media-' + file.fileId} message={message} file={file} />);
    });

    if (hasText) {
        content.push(<MessageTextComponent spans={message.textSpans} isEdited={!!message.isEdited} />);
    }

    // documentsAttaches.map((file, index) => {
    //     content.push(<DocumentContent key={'msg-' + message.id + '-document-' + file.fileId} attach={file} message={message} />);
    // });

    // augmenationAttaches.map((attach, index) => {

    //     content.push(<RichAttachContent key={'msg-' + message.id + '-rich-' + attach.id} attach={attach} message={message} />);
    // });

    if (!content.length) {
        let text = 'Unsupported content: ' + message.fallback;
        content.push(<MessageTextComponent spans={[{ type: SpanType.italic, offset: 0, length: text.length, childrens: [{ type: SpanType.text, text, offset: 0, length: text.length }] }]} isEdited={false} />);
    }

    return <>{content}</>;
};