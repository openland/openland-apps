import * as React from 'react';
import { FullMessage_GeneralMessage_attachments_MessageAttachmentFile, FullMessage_GeneralMessage_attachments_MessageRichAttachment, FullMessage_GeneralMessage_attachments } from 'openland-api/Types';
import { MessageTextComponent } from './content/MessageTextComponent';
import { DataSourceWebMessageItem } from '../data/WebMessageItemDataSource';
import { SpanType, Span, SpanText } from 'openland-y-utils/spans/Span';
import { ReplyContent } from './content/ReplyContent';
import { ImageContent } from './content/ImageContent';
import { DocumentContent } from './content/DocumentContent';
import { RichAttachContent } from './content/RichAttachContent';

interface MessageContentProps {
    id?: string;
    text?: string | null;
    textSpans?: Span[];
    edited?: boolean;
    reply?: DataSourceWebMessageItem[];
    attachments?: (FullMessage_GeneralMessage_attachments & { uri?: string })[];
    fallback?: string;
    isOut?: boolean;
}

export const MessageContent = (props: MessageContentProps) => {
    const { id, text, textSpans = [], edited, reply, attachments = [], fallback, isOut = false } = props;
    const imageAttaches = attachments.filter(a => a.__typename === 'MessageAttachmentFile' && a.fileMetadata.isImage) as FullMessage_GeneralMessage_attachments_MessageAttachmentFile[] || [];
    const documentsAttaches = attachments.filter(a => a.__typename === 'MessageAttachmentFile' && !a.fileMetadata.isImage) as FullMessage_GeneralMessage_attachments_MessageAttachmentFile[] || [];
    const augmenationAttaches = attachments.filter(a => a.__typename === 'MessageRichAttachment') as FullMessage_GeneralMessage_attachments_MessageRichAttachment[] || [];

    const hasText = !!text;

    const content: JSX.Element[] = [];

    if (reply && reply.length) {
        content.push(<ReplyContent key={'msg-' + id + '-reply'} quotedMessages={reply} />);
    }

    imageAttaches.map((file) => {
        content.push(<ImageContent key={'msg-' + id + '-media-' + file.fileId} file={file} />);
    });

    if (hasText) {
        content.push(<MessageTextComponent key="msg-text" spans={textSpans} edited={!!edited} />);
    }

    documentsAttaches.map(file => {
        content.push(<DocumentContent key={'msg-' + id + '-document-' + file.fileId} file={file} />);
    });

    augmenationAttaches.map(attach => {
        content.push(<RichAttachContent key={'msg-' + id + '-rich-' + attach.id} attach={attach} canDelete={isOut} messageId={id} />);
    });

    if (!content.length) {
        const unsupportedText = 'Unsupported content' + (fallback ? ': ' + fallback : '');
        content.push(<MessageTextComponent key="msg-text-unsupported" spans={[{ type: SpanType.italic, offset: 0, length: unsupportedText.length, childrens: [{ type: SpanType.text, text: unsupportedText, offset: 0, length: unsupportedText.length } as SpanText] }]} edited={false} />);
    }

    return <>{content}</>;
};