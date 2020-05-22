import * as React from 'react';
import {
    FullMessage_GeneralMessage_attachments_MessageAttachmentFile,
    FullMessage_GeneralMessage_attachments_MessageRichAttachment,
    FullMessage_GeneralMessage_attachments_MessageAttachmentPurchase,
    FullMessage_GeneralMessage_attachments,
    MyStickers_stickers_packs_stickers,
    UserShort,
} from 'openland-api/spacex.types';
import { MessageTextComponent } from './content/MessageTextComponent';
import { DataSourceWebMessageItem } from '../data/WebMessageItemDataSource';
import { SpanType, Span } from 'openland-y-utils/spans/Span';
import { ReplyContent } from './content/ReplyContent';
import { ImageContent } from './content/ImageContent';
import { DocumentContent } from './content/DocumentContent';
import { RichAttachContent } from './content/RichAttachContent';
import { DonationContent } from './content/DonationContent';
import { StickerContent } from './content/StickerContent';
import { css, cx } from 'linaria';
import { createSimpleSpan } from 'openland-y-utils/spans/processSpans';
import { XViewRouterContext } from 'react-mental';

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

const replyContentWrapper = css`
    &:hover {
        cursor: pointer;
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

const ContentWrapper = React.memo(
    (props: { className: string; isReply?: boolean; id?: string; children: any }) => {
        const router = React.useContext(XViewRouterContext)!;
        const onContentClick = (e: React.MouseEvent<HTMLDivElement>) => {
            e.stopPropagation();
            router.navigate(`/message/${props.id}`);
        };

        return (
            <div
                className={cx(props.className, props.isReply && replyContentWrapper)}
                onClick={props.isReply ? onContentClick : undefined}
            >
                {props.children}
            </div>
        );
    },
);

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
    sender?: UserShort;
    senderNameEmojify?: string | JSX.Element;
    date?: number;
    fileProgress?: number;
    isReply?: boolean;
    isForward?: boolean;
    isPending?: boolean;
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
        isReply = false,
        isForward = false,
        isPending,
    } = props;
    const isReplyOnly = isReply && !isForward;

    const imageAttaches = attachments.filter(
        (a) => a.__typename === 'MessageAttachmentFile' && a.fileMetadata.isImage,
    ) as MsgAttachFile[];

    const documentsAttaches = attachments.filter(
        (a) => a.__typename === 'MessageAttachmentFile' && !a.fileMetadata.isImage,
    ) as MsgAttachFile[];

    const augmenationAttaches = attachments.filter(
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
            <ContentWrapper
                key={'msg-' + id + '-media-' + file.fileId}
                className={extraClassName}
                id={id}
                isReply={isReplyOnly}
            >
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
            <ContentWrapper
                key="msg-donation"
                className={donationWrapper}
                id={id}
                isReply={isReplyOnly}
            >
                <DonationContent amount={attach.purchase.amount} state={attach.purchase.state} />
            </ContentWrapper>,
        );
    });

    if (hasText) {
        content.push(
            <ContentWrapper key="msg-text" className={textClassName} id={id} isReply={isReplyOnly}>
                <MessageTextComponent
                    spans={textSpans}
                    edited={!!edited}
                    shouldCrop={isReplyOnly}
                />
            </ContentWrapper>,
        );
    }

    documentsAttaches.map((file) => {
        content.push(
            <ContentWrapper
                key={'msg-' + id + '-document-' + file.fileId}
                className={extraClassName}
                id={id}
                isReply={isReplyOnly}
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

    augmenationAttaches.map((attach) => {
        content.push(
            <ContentWrapper
                key={'msg-' + id + '-rich-' + attach.id}
                className={extraClassName}
                id={id}
                isReply={isReplyOnly}
            >
                <RichAttachContent attach={attach} canDelete={isOut} messageId={id} />
            </ContentWrapper>,
        );
    });

    if (sticker) {
        content.push(
            <ContentWrapper
                key={'msg-' + id + '-sticker-' + sticker.id}
                className={extraClassName}
                id={id}
                isReply={isReplyOnly}
            >
                <StickerContent sticker={sticker} />
            </ContentWrapper>,
        );
    }

    if (reply && reply.length) {
        const hasForward =
            props.chatId && reply[0].source && reply[0].source.chat.id !== props.chatId;

        const replySection = (
            <div key={'msg-' + id + '-forward'} className={cx(extraClassName, replySectionWrapper)}>
                <ReplyContent quotedMessages={reply} isForward={!!hasForward} />
            </div>
        );

        if (hasForward) {
            content.push(replySection);
        } else {
            content.unshift(replySection);
        }
    }

    if (!content.length) {
        const unsupportedText = 'Unsupported content' + (fallback ? ': ' + fallback : '');

        content.push(
            <ContentWrapper key={'unsupported-' + id} className={textClassName}>
                <MessageTextComponent spans={createSimpleSpan(unsupportedText, SpanType.italic)} />
            </ContentWrapper>,
        );
    }

    return <div className={cx('x', wrapper)}>{content}</div>;
});
