import * as React from 'react';
import {
    FullMessage_GeneralMessage_attachments_MessageAttachmentFile,
    FullMessage_GeneralMessage_attachments_MessageRichAttachment,
    FullMessage_GeneralMessage_attachments_MessageAttachmentPurchase,
    FullMessage_GeneralMessage_attachments,
    MyStickers_stickers_packs_stickers,
    MessageSender,
} from 'openland-api/spacex.types';
import { MessageTextComponent } from './content/MessageTextComponent';
import { DataSourceWebMessageItem } from '../data/WebMessageItemDataSource';
import { SpanType, Span } from 'openland-y-utils/spans/Span';
import { ForwardContent } from './content/ForwardContent';
import { ReplyContent } from './content/ReplyContent';
import { ImageContent } from './content/ImageContent';
import { DocumentContent } from './content/DocumentContent';
import { RichAttachContent } from './content/RichAttachContent';
import { DonationContent } from './content/DonationContent';
import { StickerContent } from './content/StickerContent';
import { css, cx } from 'linaria';
import { createSimpleSpan } from 'openland-y-utils/spans/processSpans';

type MsgAttachFile = FullMessage_GeneralMessage_attachments_MessageAttachmentFile;
type MsgAttachRich = FullMessage_GeneralMessage_attachments_MessageRichAttachment;
type MsgAttachPurchase = FullMessage_GeneralMessage_attachments_MessageAttachmentPurchase;

const wrapper = css`
    flex-grow: 1;
    flex-shrink: 1;
`;

const textWrapper = css`
    margin-top: 4px;

    &:first-child {
        margin-top: 0;
    }
`;

const donationWrapper = css`
    align-self: flex-start;
    margin: 8px 0;
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

const replySectionWrapper = css`
    padding: 0;
`;

interface ContentWrapperProps {
    className: string;
    children: any;
}

const ContentWrapper = React.memo((props: ContentWrapperProps) => (
    <div className={props.className}>{props.children}</div>
));

interface MessageContentProps {
    id?: string;
    text?: string | null;
    textSpans?: Span[];
    edited?: boolean;
    reply?: DataSourceWebMessageItem[];
    attachments?: (FullMessage_GeneralMessage_attachments & { uri?: string })[];
    sticker?: MyStickers_stickers_packs_stickers;
    fallback?: string;
    isOut?: boolean;
    attachTop?: boolean;
    chatId?: string;
    sender?: MessageSender;
    senderNameEmojify?: string | JSX.Element;
    date?: number;
    fileProgress?: number;
    isPending?: boolean;
    isComment?: boolean;
}

export const MessageContent = React.memo((props: MessageContentProps) => {
    const {
        id,
        text,
        textSpans = [],
        edited,
        reply,
        attachments = [],
        sticker,
        fallback,
        isOut = false,
        attachTop = false,
        fileProgress,
        isPending,
        isComment = false,
    } = props;

    const imageAttaches = attachments.filter(
        (a) => a.__typename === 'MessageAttachmentFile' && a.fileMetadata.isImage,
    ) as MsgAttachFile[];

    const documentsAttaches = attachments.filter(
        (a) => a.__typename === 'MessageAttachmentFile' && !a.fileMetadata.isImage,
    ) as MsgAttachFile[];

    const augmentationAttaches = attachments.filter(
        (a) => a.__typename === 'MessageRichAttachment',
    ) as MsgAttachRich[];

    const purchaseAttaches = attachments.filter(
        (a) => a.__typename === 'MessageAttachmentPurchase',
    ) as MsgAttachPurchase[];

    const hasText = !!text;
    const content: JSX.Element[] = [];

    const extraClassName = cx('x', extraWrapper, attachTop && extraInCompactWrapper);
    const textClassName = cx('x', textWrapper);

    imageAttaches.map((file) => {
        content.push(
            <ContentWrapper key={'msg-' + id + '-media-' + file.fileId} className={extraClassName}>
                <ImageContent
                    file={file}
                    sender={props.sender}
                    senderNameEmojify={props.senderNameEmojify}
                    date={props.date}
                    chatId={props.chatId}
                    mId={id}
                    isPending={isPending}
                    progress={fileProgress}
                />
            </ContentWrapper>,
        );
    });

    purchaseAttaches.forEach((attach) => {
        content.push(
            <ContentWrapper key="msg-donation" className={donationWrapper}>
                <DonationContent amount={attach.purchase.amount} state={attach.purchase.state} />
            </ContentWrapper>,
        );
    });

    if (hasText) {
        content.push(
            <ContentWrapper key="msg-text" className={textClassName}>
                <MessageTextComponent spans={textSpans} edited={!!edited} mId={id} />
            </ContentWrapper>,
        );
    }

    documentsAttaches.map((file) => {
        content.push(
            <ContentWrapper
                key={'msg-' + id + '-document-' + file.fileId}
                className={extraClassName}
            >
                <DocumentContent
                    file={file}
                    sender={props.sender}
                    senderNameEmojify={props.senderNameEmojify}
                    date={props.date}
                    progress={fileProgress}
                    inlineVideo={true}
                />
            </ContentWrapper>,
        );
    });

    augmentationAttaches.map((attach) => {
        content.push(
            <ContentWrapper key={'msg-' + id + '-rich-' + attach.id} className={extraClassName}>
                <RichAttachContent
                    attach={attach}
                    canDelete={isOut}
                    messageId={id}
                    isComment={isComment}
                />
            </ContentWrapper>,
        );
    });

    if (sticker) {
        content.push(
            <ContentWrapper key={'msg-' + id + '-sticker-' + sticker.id} className={extraClassName}>
                <StickerContent sticker={sticker} />
            </ContentWrapper>,
        );
    }

    if (reply && !!reply.length) {
        const isForwardMessage = !!(
            props.chatId &&
            reply[0].source &&
            reply[0].source.__typename === 'MessageSourceChat' &&
            reply[0].source.chat.id !== props.chatId
        );

        if (isForwardMessage) {
            content.push(
                <div
                    key={'msg-' + id + '-forward'}
                    className={cx(extraClassName, replySectionWrapper)}
                >
                    <ForwardContent quotedMessages={reply} />
                </div>,
            );
        } else {
            content.unshift(
                <div
                    key={'msg-' + id + '-forward'}
                    className={cx(extraClassName, replySectionWrapper)}
                >
                    <ReplyContent quotedMessages={reply} />
                </div>,
            );
        }
    }

    if (!content.length) {
        const unsupportedText = 'Unsupported content' + (fallback ? ': ' + fallback : '');

        content.push(
            <ContentWrapper key={'unsupported-' + id} className={textClassName}>
                <MessageTextComponent
                    spans={createSimpleSpan(unsupportedText, SpanType.italic)}
                    mId={id}
                />
            </ContentWrapper>,
        );
    }

    return <div className={cx('x', wrapper)}>{content}</div>;
});
