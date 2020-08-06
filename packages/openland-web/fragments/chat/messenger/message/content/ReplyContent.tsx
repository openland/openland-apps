import * as React from 'react';
import { css, cx } from 'linaria';
import { XViewRouterContext } from 'react-mental';
import { DataSourceWebMessageItem } from '../../data/WebMessageItemDataSource';
import { DataSourceMessageItem } from 'openland-engines/messenger/ConversationEngine';
import { MessageSenderContent } from '../MessageComponent';
import { DonationContent } from './DonationContent';
import { fileIcon, fileFormat } from './DocumentContent';
import { TextBody, TextLabel1 } from 'openland-web/utils/TextStyles';
import { ImgWithRetry } from 'openland-web/components/ImgWithRetry';
import { UIcon } from 'openland-web/components/unicorn/UIcon';
import { emoji } from 'openland-y-utils/emoji';
import IcLink from 'openland-icons/s/ic-link-24.svg';
import {
    FullMessage_GeneralMessage_attachments_MessageAttachmentFile,
    FullMessage_GeneralMessage_attachments_MessageAttachmentPurchase,
    FullMessage_GeneralMessage_attachments_MessageRichAttachment,
} from 'openland-api/spacex.types';

type MsgAttachFile = FullMessage_GeneralMessage_attachments_MessageAttachmentFile;
type MsgAttachRich = FullMessage_GeneralMessage_attachments_MessageRichAttachment;
type MsgAttachPurchase = FullMessage_GeneralMessage_attachments_MessageAttachmentPurchase;

const replyBasicStyle = css`
    display: flex;
    flex-direction: row;
    align-items: center;
    position: relative;
    user-select: none;
`;

const replyMessageGroupClass = css`
    cursor: pointer;
    display: flex;
    flex-direction: row;
    align-items: center;
    padding-left: 14px;
    position: relative;
    margin-bottom: 4px;

    &:last-child {
        margin-bottom: 0;
    }

    &::before {
        content: '';
        position: absolute;
        width: 2px;
        left: 0;
        top: 4px;
        bottom: 4px;
        background-color: #c4c7cc;
        border-radius: 2px;
    }
`;

const replyAttachPreviewClass = css`
    position: relative;
    margin-right: 12px;
    display: flex;
    flex-shrink: 0;
    align-items: center;
    justify-content: center;
    border-radius: 8px;
    overflow: hidden;
    width: 40px;
    height: 40px;
    font-size: 10px;
    font-weight: 600;
    line-height: 12px;
    color: #fff;

    & .format-text {
        position: absolute;
        left: 0;
        right: 0;
        margin: auto;
        text-align: center;
        bottom: 5px;
    }
`;

const replyAttachPreviewLinkClass = css`
    background-color: var(--backgroundTertiaryTrans);
`;

const replyAttachImageClass = css`
    &::after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        border: 1px solid var(--borderLight);
        border-radius: 8px;
    }
`;

const replyAttachContentClass = css`
    display: flex;
    flex-direction: column;
    justify-content: center;
`;

const ellipsisText = css`
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
`;

const attachTitleClass = css`
    color: var(--foregroundSecondary);
`;

const attachTextClass = css`
    color: var(--foregroundPrimary);
`;

const senderNameStyle = css`
    color: var(--foregroundPrimary);
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
`;

interface ShortSenderNameProps {
    name: string;
    overrideName?: string | null;
}

const ShortSenderName = React.memo((props: ShortSenderNameProps) => (
    <div className={cx(TextLabel1, senderNameStyle)}>{emoji(props.overrideName || props.name)}</div>
));

interface ReplyMessageProps {
    message: DataSourceMessageItem;
    isReplyAction?: boolean;
}

export const ReplyMessage = React.memo((props: ReplyMessageProps) => {
    const router = React.useContext(XViewRouterContext)!;

    const { message, isReplyAction = false } = props;
    const { id, text, fallback, date, sender, overrideName, attachments, sticker } = message;

    const onReplyClick = (e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();
        router.navigate(`/message/${id}`);
    };

    const attach = attachments && !!attachments.length && attachments[0];

    const imageAttach =
        attach && attach.__typename === 'MessageAttachmentFile' && attach.fileMetadata.isImage
            ? (attach as MsgAttachFile)
            : null;
    const documentAttach =
        attach && attach.__typename === 'MessageAttachmentFile' && !attach.fileMetadata.isImage
            ? (attach as MsgAttachFile)
            : null;
    const augmentAttach =
        attach && attach.__typename === 'MessageRichAttachment' ? (attach as MsgAttachRich) : null;
    const purchaseAttach =
        attach && attach.__typename === 'MessageAttachmentPurchase'
            ? (attach as MsgAttachPurchase)
            : null;

    const senderContent = isReplyAction ? (
        <ShortSenderName name={sender.name} overrideName={overrideName} />
    ) : (
        <MessageSenderContent sender={sender} date={date} />
    );

    const attachFile = (title: string) => (
        <div className={cx(attachTitleClass, ellipsisText, TextBody)}>{title}</div>
    );

    const attachText = (title: string) => (
        <div className={cx(attachTextClass, ellipsisText, TextBody)}>{emoji(title)}</div>
    );

    if (imageAttach) {
        const url = `https://ucarecdn.com/${imageAttach.fileId}/-/format/auto/-/`;
        const ops = `scale_crop/40x40/`;
        const opsRetina = `scale_crop/80x80/center/ 2x`;
        return (
            <div
                className={isReplyAction ? replyBasicStyle : replyMessageGroupClass}
                onClick={isReplyAction ? undefined : onReplyClick}
            >
                <div className={cx(replyAttachPreviewClass, replyAttachImageClass)}>
                    <ImgWithRetry src={url + ops} srcSet={url + opsRetina} width={40} height={40} />
                </div>
                <div className={replyAttachContentClass}>
                    {senderContent}
                    {attachFile('Photo')}
                </div>
            </div>
        );
    }

    if (documentAttach) {
        const isVideo =
            (documentAttach.fileMetadata.mimeType &&
                !!documentAttach.fileMetadata.mimeType.match('video')) ||
            fileFormat(name) === 'VIDEO';
        return (
            <div
                className={isReplyAction ? replyBasicStyle : replyMessageGroupClass}
                onClick={isReplyAction ? undefined : onReplyClick}
            >
                <div className={replyAttachPreviewClass}>
                    {fileIcon[fileFormat(documentAttach.fileMetadata.name)]}
                    <div className="format-text">{fileFormat(name)}</div>
                </div>
                <div className={replyAttachContentClass}>
                    {senderContent}
                    {attachFile(isVideo ? 'Video' : documentAttach.fileMetadata.name)}
                </div>
            </div>
        );
    }

    if (augmentAttach) {
        const ops = `-/format/auto/-/scale_crop/40x40/`;
        const opsRetina = `-/format/auto/-/scale_crop/80x80/center/ 2x`;
        return (
            <div
                className={isReplyAction ? replyBasicStyle : replyMessageGroupClass}
                onClick={isReplyAction ? undefined : onReplyClick}
            >
                {augmentAttach.image && augmentAttach.image.url ? (
                    <div
                        className={cx(
                            replyAttachPreviewClass,
                            replyAttachImageClass,
                            replyAttachPreviewLinkClass,
                        )}
                    >
                        <ImgWithRetry
                            src={augmentAttach.image.url + ops}
                            srcSet={augmentAttach.image.url + opsRetina}
                            width={40}
                            height={40}
                        />
                    </div>
                ) : (
                    <div className={cx(replyAttachPreviewClass, replyAttachPreviewLinkClass)}>
                        <UIcon color="var(--foregroundTertiary)" icon={<IcLink />} />
                    </div>
                )}
                <div className={replyAttachContentClass}>
                    {senderContent}
                    {attachText(text || 'Link')}
                </div>
            </div>
        );
    }

    if (purchaseAttach) {
        return (
            <div
                className={isReplyAction ? replyBasicStyle : replyMessageGroupClass}
                onClick={isReplyAction ? undefined : onReplyClick}
            >
                <div className={replyAttachContentClass}>
                    {senderContent}
                    <DonationContent
                        amount={purchaseAttach.purchase.amount}
                        state={purchaseAttach.purchase.state}
                    />
                </div>
            </div>
        );
    }

    if (sticker) {
        const url = `https://ucarecdn.com/${sticker.image.uuid}/-/format/auto/-/`;
        const ops = `scale_crop/40x40/`;
        const opsRetina = `scale_crop/80x80/center/ 2x`;
        return (
            <div
                className={isReplyAction ? replyBasicStyle : replyMessageGroupClass}
                onClick={isReplyAction ? undefined : onReplyClick}
            >
                <div className={cx(replyAttachPreviewClass, replyAttachImageClass)}>
                    <ImgWithRetry src={url + ops} srcSet={url + opsRetina} width={40} height={40} />
                </div>
                <div className={replyAttachContentClass}>
                    {senderContent}
                    {attachFile('Sticker')}
                </div>
            </div>
        );
    }

    if (text) {
        return (
            <div
                className={isReplyAction ? replyBasicStyle : replyMessageGroupClass}
                onClick={isReplyAction ? undefined : onReplyClick}
            >
                <div className={replyAttachContentClass}>
                    {senderContent}
                    {attachText(text)}
                </div>
            </div>
        );
    }

    if (fallback) {
        return (
            <div
                className={isReplyAction ? replyBasicStyle : replyMessageGroupClass}
                onClick={isReplyAction ? undefined : onReplyClick}
            >
                <div className={replyAttachContentClass}>
                    {senderContent}
                    {attachText(fallback)}
                </div>
            </div>
        );
    }

    return null;
});

interface ReplyGroupProps {
    quotedMessages: DataSourceWebMessageItem[];
}

export const ReplyContent = React.memo((props: ReplyGroupProps) => {
    return (
        <>
            {props.quotedMessages.map((i, j) => (
                <ReplyMessage key={j} message={i} />
            ))}
        </>
    );
});
