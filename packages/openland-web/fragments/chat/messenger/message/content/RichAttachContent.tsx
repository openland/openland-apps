import * as React from 'react';
import { css, cx } from 'linaria';
import { FullMessage_GeneralMessage_attachments_MessageRichAttachment } from 'openland-api/spacex.types';
import { layoutMedia, MediaLayout } from 'openland-y-utils/MediaLayout';
import { isInternalLink } from 'openland-y-utils/isInternalLink';
import { TextTitle3, TextBody, TextLabel2 } from 'openland-web/utils/TextStyles';
import { AlertBlanketBuilder } from 'openland-x/AlertBlanket';
import { useClient } from 'openland-api/useClient';
import { UIcon } from 'openland-web/components/unicorn/UIcon';
import { InternalAttachContent } from './InternalAttachContent';
import { ImgWithRetry } from 'openland-web/components/ImgWithRetry';
import { showImageModal } from './ImageContent';
import DeleteIcon from 'openland-icons/s/ic-close-16.svg';
import ZoomIcon from 'openland-icons/s/ic-zoom-16.svg';

type messageRichAttach = FullMessage_GeneralMessage_attachments_MessageRichAttachment;

const richWrapper = css`
    display: flex;
    flex-direction: row;
    flex-shrink: 1;
    max-width: 680px;
    min-height: 144px;
    max-height: 192px;
    background-color: var(--backgroundTertiary);
    border-radius: 8px;
    overflow: hidden;
    position: relative;

    &:hover {
        background-color: var(--backgroundTertiaryHover);
    }

    &:hover .message-rich-delete,
    &:hover .message-rich-zoom {
        opacity: 1;
        transform: translateX(0);
    }

    &:hover .image-container::after {
        background-color: rgba(0, 0, 0, 0.04);
        border: none;
    }

    @media (max-width: 1100px) {
        flex-direction: column;
        max-width: 360px;
        max-height: 400px;
    }
`;

const richImageContainer = css`
    position: relative;
    overflow: hidden;
    display: flex;
    flex-shrink: 0;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    width: var(--image-width);
    height: var(--image-height);
    max-width: 50%;
    min-height: 100%;
    border-top-left-radius: 8px;
    border-bottom-left-radius: 8px;

    &::after {
        content: '';
        display: block;
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        border: 1px solid var(--borderLight);
        box-sizing: border-box;
        border-top-left-radius: 8px;
        border-bottom-left-radius: 8px;
        border-right: none;
    }

    @media (max-width: 1100px) {
        flex-direction: column;
        border-top-right-radius: 8px;
        border-bottom-left-radius: 0;
        min-width: 100%;
        max-height: 50%;
        
        &::after {
          border-top-right-radius: 8px;
          border-bottom-left-radius: 0;
          border-right: 1px solid var(--borderLight);
          border-bottom: none;
        }
    }
`;

const richImageStyle = css`
    object-fit: cover;
    flex-shrink: 0;
    width: 100%;
    height: 100%;

    @media (max-width: 1100px) {
        position: initial;
        height: auto;
        min-height: 100%;
    }
`;

const contentContainer = css`
    display: flex;
    flex-direction: row;
    justify-content: center;
    flex-grow: 1;
    flex-shrink: 1;
    color: var(--foregroundPrimary);
    &:hover {
        text-decoration: none;
    }
    @media (max-width: 1100px) {
        flex-direction: column;
    }
`;

const textContentContainer = css`
    padding-top: 12px;
    padding-bottom: 12px;
    padding-left: 16px;
    padding-right: 24px;
    width: 100%;
`;

const siteIconContainer = css`
    width: 16px;
    height: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 6px;
    border-radius: 2px;
    overflow: hidden;
`;

const siteIconImageStyle = css`
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
`;

const linkHostnameContainer = css`
    display: flex;
    align-items: center;
    color: var(--foregroundSecondary);
`;

const textInner = css`
    display: -webkit-box;
    -webkit-box-orient: vertical;
    overflow: hidden;
`;

const titleStyle = css`
    color: var(--foregroundPrimary);
    margin-top: 4px;
    -webkit-line-clamp: 3;
`;

const textStyle = css`
    color: var(--foregroundPrimary);
    margin-top: 2px;
    -webkit-line-clamp: 3;
`;

const deleteButton = css`
    opacity: 0;
    transition: 150ms opacity ease;
    width: 40px;
    height: 40px;
    position: absolute;
    top: 0;
    right: 0;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 8px;

    &:hover svg {
        opacity: 0.64;
    }
`;

const zoomButton = css`
    opacity: 0;
    transition: 150ms opacity ease;
    width: 32px;
    height: 32px;
    position: absolute;
    top: 9px;
    left: 9px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 4px;

    background-color: var(--overlayMedium);

    &:hover svg {
        opacity: 0.64;
    }
`;

interface RichAttachContentProps {
    attach: messageRichAttach;
    canDelete: boolean;
    messageId?: string;
    isComment: boolean;
}

export const RichAttachContent = React.memo((props: RichAttachContentProps) => {
    const { attach, canDelete, messageId, isComment } = props;
    const titleRef = React.useRef<HTMLDivElement>(null);
    const textRef = React.useRef<HTMLDivElement>(null);
    const client = useClient();

    if (!attach.title && !attach.titleLink && !attach.subTitle && !attach.keyboard) {
        return null;
    }

    if ((isInternalLink(attach.titleLink || '') && attach.imageFallback) || attach.keyboard) {
        return <InternalAttachContent attach={attach} />;
    }

    const isShortView =
        !attach.title || !attach.text || attach.title.length < 80 || attach.text.length < 105;
    const isXShortView = !attach.title || !attach.text || attach.title.length < 55;

    const handleDeleteClick = React.useCallback(
        (e: React.MouseEvent) => {
            e.stopPropagation();

            if (messageId) {
                const builder = new AlertBlanketBuilder();

                builder.title('Remove attachment');
                builder.message('Remove this attachment from the message?');
                builder.action(
                    'Remove',
                    async () => {
                        if (isComment) {
                            await client.mutateCommentDeleteUrlAugmentation({ id: messageId });
                        } else {
                            await client.mutateRoomDeleteUrlAugmentation({ messageId });
                        }
                    },
                    'danger',
                );
                builder.show();
            }
        },
        [messageId, isComment],
    );

    let img = null;
    let siteIcon = null;
    let layout: MediaLayout | undefined;
    if (attach.image && attach.image.metadata && attach.image.url) {
        layout = layoutMedia(
            attach.image.metadata.imageWidth || 0,
            attach.image.metadata.imageHeight || 0,
            336,
            isXShortView ? 144 : isShortView ? 160 : 192,
            24,
            24,
        );

        const ops = '-/format/auto/-/scale_crop/' + (layout.width + 'x' + layout.height) + '/center/-/quality/best/-/progressive/yes/';
        const opsRetina = '-/format/auto/-/scale_crop/' + (layout.width * 2 + 'x' + layout.height * 2) + '/center/-/quality/best/-/progressive/yes/ 2x';

        img = (
            <div
                className={cx(richImageContainer, 'image-container')}
                style={
                    {
                        '--image-width': `${layout.width}px`,
                        '--image-height': `${layout.height}px`,
                    } as React.CSSProperties
                }
            >
                <ImgWithRetry
                    className={richImageStyle}
                    // width={layout.width}
                    // height={layout.height}
                    src={attach.image.url + ops}
                    srcSet={attach.image.url + opsRetina}
                />
            </div>
        );
    }
    if (attach.icon && attach.icon.url) {
        siteIcon = (
            <div className={siteIconContainer}>
                <ImgWithRetry className={siteIconImageStyle} src={attach.icon.url} />
            </div>
        );
    }
    return (
        <div className={cx(richWrapper, 'message-rich-wrapper')}>
            <a
                target="_blank"
                href={attach.titleLink || ''}
                onClick={(e) => e.stopPropagation()}
                className={contentContainer}
            >
                {img}
                <div className={textContentContainer}>
                    {(siteIcon || attach.titleLinkHostname) && (
                        <div className={cx(linkHostnameContainer, TextLabel2)}>
                            {siteIcon}
                            <span>{attach.titleLinkHostname}</span>
                        </div>
                    )}
                    {attach.title && (
                        <div className={cx(textInner, titleStyle, TextTitle3)} ref={titleRef}>
                            <span>{attach.title}</span>
                        </div>
                    )}
                    {attach.text && (
                        <div className={cx(textInner, textStyle, TextBody)} ref={textRef}>
                            <span>{attach.text}</span>
                        </div>
                    )}
                </div>
            </a>

            {img && (
                <button
                    className={cx(zoomButton, 'message-rich-zoom')}
                    onClick={(e: React.MouseEvent) => {
                        e.stopPropagation();
                        showImageModal({
                            fileId: attach
                                .image!!.url.split('https://ucarecdn.com/')
                                .pop()!
                                .slice(0, -1),
                            imageWidth: attach.image!!.metadata!!.imageWidth!! * 2 || 0,
                            imageHeight: attach.image!!.metadata!!.imageHeight!! * 2 || 0,
                        });
                    }}
                >
                    <UIcon icon={<ZoomIcon />} color={'var(--foregroundContrast)'} />
                </button>
            )}

            {canDelete && !!messageId && (
                <div
                    className={cx(deleteButton, 'message-rich-delete')}
                    onClick={handleDeleteClick}
                >
                    <UIcon icon={<DeleteIcon />} />
                </div>
            )}
        </div>
    );
});
