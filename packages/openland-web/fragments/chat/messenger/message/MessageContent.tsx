import * as React from 'react';
import {
    FullMessage_GeneralMessage_attachments_MessageAttachmentFile,
    FullMessage_GeneralMessage_attachments_MessageRichAttachment,
    FullMessage_GeneralMessage_attachments,
    UserShort,
} from 'openland-api/Types';
import { MessageTextComponent } from './content/MessageTextComponent';
import { DataSourceWebMessageItem } from '../data/WebMessageItemDataSource';
import { SpanType, Span } from 'openland-y-utils/spans/Span';
import { ReplyContent } from './content/ReplyContent';
import { ImageContent } from './content/ImageContent';
import { DocumentContent } from './content/DocumentContent';
import { RichAttachContent } from './content/RichAttachContent';
import { css, cx } from 'linaria';
import { createSimpleSpan } from 'openland-y-utils/spans/processSpans';

const textWrapper = css`
    margin-top: 4px;

    &:first-child {
        margin-top: 0;
    }
`;

const extraWrapper = css`
    padding: 4px 0;
    margin-top: 4px;
`;

const extraInCompactWrapper = css`
    &:first-child {
        margin-top: 0;
    }
`;

const replyWrapper = css`
    padding: 0;
`;

interface MessageContentProps {
    id?: string;
    text?: string | null;
    textSpans?: Span[];
    edited?: boolean;
    reply?: DataSourceWebMessageItem[];
    attachments?: (FullMessage_GeneralMessage_attachments & { uri?: string })[];
    fallback?: string;
    isOut?: boolean;
    attachTop?: boolean;
    chatId?: string;
    sender?: UserShort;
    senderNameEmojify?: string | JSX.Element;
    date?: number;
}

export const MessageContent = (props: MessageContentProps) => {
    const { id, text, textSpans = [], edited, reply, attachments = [], fallback, isOut = false, attachTop = false } = props;
    const imageAttaches = attachments.filter(a => a.__typename === 'MessageAttachmentFile' && a.fileMetadata.isImage) as FullMessage_GeneralMessage_attachments_MessageAttachmentFile[] || [];
    const documentsAttaches = attachments.filter(a => a.__typename === 'MessageAttachmentFile' && !a.fileMetadata.isImage) as FullMessage_GeneralMessage_attachments_MessageAttachmentFile[] || [];
    const augmenationAttaches = attachments.filter(a => a.__typename === 'MessageRichAttachment') as FullMessage_GeneralMessage_attachments_MessageRichAttachment[] || [];
    const hasText = !!text;
    const content: JSX.Element[] = [];

    const extraClassName = cx('x', extraWrapper, attachTop && extraInCompactWrapper);
    const textClassName = cx('x', textWrapper);

    imageAttaches.map(file => {
        content.push(
            <div key={'msg-' + id + '-media-' + file.fileId} className={extraClassName}>
                <ImageContent
                    file={file}
                    sender={props.sender}
                    senderNameEmojify={props.senderNameEmojify}
                    date={props.date}
                />
            </div>
        );
    });

    if (hasText) {
        content.push(
            <div key="msg-text" className={textClassName}>
                <MessageTextComponent spans={textSpans} edited={!!edited} />
            </div>
        );
    }

    documentsAttaches.map(file => {
        content.push(
            <div key={'msg-' + id + '-document-' + file.fileId} className={extraClassName}>
                <DocumentContent file={file} />
            </div>
        );
    });

    augmenationAttaches.map(attach => {
        content.push(
            <div key={'msg-' + id + '-rich-' + attach.id} className={extraClassName}>
                <RichAttachContent attach={attach} canDelete={isOut} messageId={id} />
            </div>
        );
    });

    if (reply && reply.length) {
        const replyContent = (
            <div key={'msg-' + id + '-forward'} className={cx(extraClassName, replyWrapper)}>
                <ReplyContent quotedMessages={reply} />
            </div>
        );

        const isForward = props.chatId && reply[0].source && reply[0].source.chat.id !== props.chatId;

        if (isForward) {
            content.push(replyContent);
        } else {
            content.unshift(replyContent);
        }
    }

    if (!content.length) {
        const unsupportedText = 'Unsupported content' + (fallback ? ': ' + fallback : '');

        content.push(
            <div key="msg-text-unsupported" className={textClassName}>
                <MessageTextComponent spans={createSimpleSpan(unsupportedText, SpanType.italic)} />
            </div>
        );
    }

    return (
        <div className="x">
            {content}
        </div>
    );
};