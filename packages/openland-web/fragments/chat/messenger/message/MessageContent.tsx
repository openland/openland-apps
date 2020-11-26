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
import { ImagePileContent } from './content/ImagePileContent';
import { MAX_FILES_PER_MESSAGE } from 'openland-engines/messenger/MessageSender';

type MsgAttachFile = FullMessage_GeneralMessage_attachments_MessageAttachmentFile & { progress?: number };
type MsgAttachRich = FullMessage_GeneralMessage_attachments_MessageRichAttachment;
type MsgAttachPurchase = FullMessage_GeneralMessage_attachments_MessageAttachmentPurchase;

const wrapper = css`
    flex-grow: 1;
    flex-shrink: 1;
    overflow: hidden;
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

const imageColumn = css`
    height: 360px;
    flex: 1;
    flex-direction: column;

    &:not(:last-child) {
        margin-right: 8px;
    }
`;

const imagesWrapper = css`
    flex-direction: row;
    max-width: 680px;
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
    attachments?: (FullMessage_GeneralMessage_attachments & { uri?: string, progress?: number })[];
    sticker?: MyStickers_stickers_packs_stickers;
    fallback?: string;
    isOut?: boolean;
    attachTop?: boolean;
    chatId?: string;
    sender?: MessageSender;
    senderNameEmojify?: string | JSX.Element;
    date?: number;
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
        chatId,
        attachTop = false,
        isPending,
        isComment = false,
    } = props;

    const imageAttaches = attachments.filter(
        (a) => a.__typename === 'MessageAttachmentFile' && a.fileMetadata.isImage,
    ).slice(0, MAX_FILES_PER_MESSAGE) as MsgAttachFile[];

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
    const imagesWrapperClassName = cx(extraClassName, imagesWrapper);

    if (imageAttaches.length > 0) {
        let imagesContent;
        if (imageAttaches.length === 1) {
            imagesContent = imageAttaches.map(file => (
                <ImageContent
                    key={'msg-' + id + '-media-' + file.fileId}
                    file={file}
                    sender={props.sender}
                    senderNameEmojify={props.senderNameEmojify}
                    date={props.date}
                    chatId={props.chatId}
                    mId={id}
                    isPending={isPending}
                    progress={file.progress}
                />
            ));
        } else {
            imagesContent = imageAttaches
                .reduce((acc, file, i) => {
                    if (acc.length < 2) {
                        acc.push([(
                            <ImagePileContent
                                key={'msg-' + id + '-media-' + (file.fileId || file.id) + i}
                                file={file}
                                sender={props.sender}
                                senderNameEmojify={props.senderNameEmojify}
                                date={props.date}
                                chatId={props.chatId}
                                mId={id}
                                isPending={isPending}
                                progress={file.progress}
                                isHalf={imageAttaches.length === 3 && i === 1 || imageAttaches.length === 4}
                            />
                        )]);
                    } else {
                        let el = (
                            <ImagePileContent
                                key={'msg-' + id + '-media-' + (file.fileId || file.id) + i}
                                file={file}
                                sender={props.sender}
                                senderNameEmojify={props.senderNameEmojify}
                                date={props.date}
                                chatId={props.chatId}
                                mId={id}
                                isPending={isPending}
                                progress={file.progress}
                                isHalf={true}
                            />
                        );
                        if (i === 2) {
                            acc[1].push(el);
                        } else if (i === 3) {
                            let prevLast = acc[1].pop();
                            acc[0].push(prevLast!);
                            acc[1].push(el);
                        }
                    }
                    return acc;
                }, [] as JSX.Element[][])
                .map((column, i) => (
                    <div className={imageColumn} key={column.length + i}>
                        {column}
                    </div>
                ));
        }
        content.push(
            <ContentWrapper className={imagesWrapperClassName}>
                {imagesContent}
            </ContentWrapper>
        );
    }

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
                <MessageTextComponent spans={textSpans} edited={!!edited} mId={id} chatId={chatId} />
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
                    progress={file.progress}
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
