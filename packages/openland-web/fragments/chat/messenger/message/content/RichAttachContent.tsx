import * as React from 'react';
import { css, cx } from 'linaria';
import { FullMessage_GeneralMessage_attachments_MessageRichAttachment } from 'openland-api/Types';
import { layoutMedia, MediaLayout } from 'openland-y-utils/MediaLayout';
import { isInternalLink } from 'openland-web/utils/isInternalLink';
import { TextTitle3, TextBody, TextLabel2 } from 'openland-web/utils/TextStyles';
import { AlertBlanketBuilder } from 'openland-x/AlertBlanket';
import { useClient } from 'openland-web/utils/useClient';
import DeleteIcon from 'openland-icons/s/ic-close-16.svg';
import ZoomIcon from 'openland-icons/s/ic-zoom-16.svg';
import { UIcon } from 'openland-web/components/unicorn/UIcon';
import { InternalAttachContent } from './InternalAttachContent';
import { ImgWithRetry } from 'openland-web/components/ImgWithRetry';
import { showImageModal } from './ImageContent';

type messageRichAttach = FullMessage_GeneralMessage_attachments_MessageRichAttachment;

const richWrapper = css`
    display: flex;
    flex-direction: row;
    flex-shrink: 1;
    max-width: 680px;
    background-color: var(--backgroundTertiary);
    border-radius: 8px;
    overflow: hidden;
    position: relative;

    &:hover .message-rich-delete,
    &:hover .message-rich-zoom {
        opacity: 1;
        transform: translateX(0);
    }

    @media (max-width: 1100px) {
        flex-direction: column;
        max-width: 360px;
    }
`;

const richImageContainer = css`
    position: relative;
    overflow: hidden;
    display: flex;
    flex-shrink: 0;
    flex-direction: row;
    align-items: center;
    min-height: 120px;
    max-width: 50%;
    cursor: pointer;
    min-width: var(--image-width);
    min-height: var(--image-height);

    border: 1px solid var(--borderLight);
    border-top-left-radius: 8px;
    border-bottom-left-radius: 8px;

    @media (max-width: 1100px) {
        flex-direction: column;
        border-top-right-radius: 8px;
        border-bottom-left-radius: 0;

        min-width: 100%;
    }
`;

const richImageStyle = css`
    position: absolute;
    left: 0;
    top: var(--image-top-position);
    object-fit: cover;
    flex-shrink: 0;
    width: 100%;
    height: 100%;

    @media (max-width: 1100px) {
        position: initial;
        height: auto;
    }
`;

const imgContentContainer = css`
    display: flex;
    flex-direction: row;
    justify-content: center;
    flex-grow: 1;
    flex-shrink: 1;

    color: var(--foregroundPrimary);
    &:hover {
        text-decoration: none;
        background-color: var(--backgroundTertiaryHover);
    }

    @media (max-width: 1100px) {
        flex-direction: column;
    }
`;

const textContentContainer = css`
    padding-top: 12px;
    padding-bottom: 16px;
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
    margin-top: 2px;
    -webkit-line-clamp: 3;
`;

const textStyle = css`
    color: var(--foregroundPrimary);
    margin-top: 2px;
    -webkit-line-clamp: 4;
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
}

export const RichAttachContent = (props: RichAttachContentProps) => {
    const { attach, canDelete, messageId } = props;
    const titleRef = React.useRef<HTMLDivElement>(null);
    const textRef = React.useRef<HTMLDivElement>(null);
    const client = useClient();

    if (!attach.title && !attach.titleLink && !attach.subTitle && !attach.keyboard) {
        return null;
    }

    if ((isInternalLink(attach.titleLink || '') && attach.imageFallback) || attach.keyboard) {
        return <InternalAttachContent attach={attach} />;
    }

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
                        await client.mutateRoomDeleteUrlAugmentation({
                            messageId,
                        });
                    },
                    'danger',
                );
                builder.show();
            }
        },
        [messageId],
    );

    let img = null;
    let siteIcon = null;
    let layout: MediaLayout | undefined;
    if (attach.image && attach.image.metadata && attach.image.url) {
        layout = layoutMedia(
            attach.image.metadata.imageWidth || 0,
            attach.image.metadata.imageHeight || 0,
            300,
            300,
            24,
            24,
        );
        img = (
            <div
                className={richImageContainer}
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
                    src={attach.image.url}
                    style={
                        {
                            '--image-top-position': `calc(50% - ${layout.height / 2})`,
                        } as React.CSSProperties
                    }
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
                onClick={e => e.stopPropagation()}
                className={imgContentContainer}
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
                            src: attach.image!!.url,
                            srcSet: attach.image!!.url,
                            width: layout!.width * 2,
                            height: layout!.height * 2,
                        });
                    }}
                >
                    <UIcon icon={<ZoomIcon />} color={'var(--foregroundContrast)'} />
                </button>
            )}

            {canDelete &&
                !!messageId && (
                    <div
                        className={cx(deleteButton, 'message-rich-delete')}
                        onClick={handleDeleteClick}
                    >
                        <UIcon icon={<DeleteIcon />} />
                    </div>
                )}
        </div>
    );
};
