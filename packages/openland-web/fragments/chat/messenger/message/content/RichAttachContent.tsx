import * as React from 'react';
import { css, cx } from 'linaria';
import { showModalBox } from 'openland-x/showModalBox';
import { FullMessage_GeneralMessage_attachments_MessageRichAttachment } from 'openland-api/Types';
import { layoutMedia } from 'openland-web/utils/MediaLayout';
import { isInternalLink } from 'openland-web/utils/isInternalLink';
import { TextCaption, TextTitle3, TextBody } from 'openland-web/utils/TextStyles';
import { AlertBlanketBuilder } from 'openland-x/AlertBlanket';
import { useClient } from 'openland-web/utils/useClient';
import DeleteIcon from 'openland-icons/s/ic-close-16.svg';
import { UIcon } from 'openland-web/components/unicorn/UIcon';
import { InternalAttachContent } from './InternalAttachContent';

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

    &:hover .message-rich-delete {
        opacity: 1;
        transform: translateX(0);
    }

    @media (max-width: 1100px) {
        flex-direction: column;
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
    width: var(--image-width);

    @media (max-width: 1100px) {
        flex-direction: column;
        min-width: 100%;
        max-height: 162px;
        height: var(--image-height);
    }
`;

const richImageStyle = css`
    position: absolute;
    left: 0;
    top: var(--image-top-position);
    object-fit: cover;
    flex-shrink: 0;
    min-width: 100%;
    min-height: 100%;
`;

const richContentContainer = css`
    display: flex;
    flex-direction: column;
    justify-content: center;
    flex-grow: 1;
    flex-shrink: 1;
    padding-top: 16px;
    padding-bottom: 16px;
    padding-left: 16px;
    padding-right: 16px;
    color: var(--foregroundPrimary);
    &:hover {
        color: #248bf2;
        text-decoration: none;
    }
`;

const siteIconContainer = css`
    width: 15px;
    height: 15px;
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
    margin-top: 2px;
    -webkit-line-clamp: 3;
`;

const textStyle = css`
    color: var(--foregroundPrimary);
    margin-top: 2px;
    -webkit-line-clamp: 5;
`;

const text2line = css`
    -webkit-line-clamp: 2;
`;

const text3line = css`
    -webkit-line-clamp: 3;
`;

const text4line = css`
    -webkit-line-clamp: 4;
`;

const deleteButton = css`
    opacity: 0;
    transform: translateX(100%);
    transition: 150ms opacity ease, 150ms transform ease;
    width: 40px;
    height: 40px;
    background: var(--backgroundTertiary);
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

const modalImgContainer = css`
    background-color: #000;
    flex-shrink: 0;
    flex-grow: 1;
    display: flex;
    width: 100%;
    height: 100%;
`;

const modalImgStyle = css`
    flex-shrink: 0;
    object-fit: contain;
    width: 100%;
    max-height: 80vh;
`;

const showImageModal = (src: string, width: number, height: number) => {
    showModalBox({ width: 600 }, () => (
        <div className={modalImgContainer}>
            <img src={src} className={modalImgStyle} width={width} height={height} />
        </div>
    ));
};

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

    React.useLayoutEffect(() => {
        let titleHeight;
        let textHeight;
        if (titleRef.current) {
            titleHeight = titleRef.current.clientHeight;
        }
        if (textRef.current) {
            textHeight = textRef.current.clientHeight;
        }
        if (titleHeight && textHeight) {
            if (titleHeight === 24) {
                textRef.current!!.classList.add(text4line);
            }
            if (titleHeight === 48) {
                textRef.current!!.classList.add(text3line);
            }
            if (titleHeight === 72) {
                textRef.current!!.classList.add(text2line);
            }
        }
    });

    let img = null;
    let siteIcon = null;
    if (attach.image && attach.image.metadata) {
        let layout = layoutMedia(
            attach.image.metadata.imageWidth || 0,
            attach.image.metadata.imageHeight || 0,
            300,
            200,
            24,
            24,
        );
        img = (
            <div
                className={richImageContainer}
                style={
                    {
                        '--image-width': `${layout.width}px`,
                        '--image-height': `${layout.width}px`,
                    } as React.CSSProperties
                }
                onClick={(e: React.MouseEvent) => {
                    e.stopPropagation();
                    showImageModal(attach.image!!.url, layout.width * 2, layout.height * 2);
                }}
            >
                <img
                    className={richImageStyle}
                    width={layout.width}
                    height={layout.height}
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
                <img className={siteIconImageStyle} src={attach.icon.url} />
            </div>
        );
    }
    return (
        <div className={cx(richWrapper, 'message-rich-wrapper')}>
            {img}
            <a
                target="_blank"
                href={attach.titleLink || ''}
                onClick={e => e.stopPropagation()}
                className={richContentContainer}
            >
                {(siteIcon || attach.titleLinkHostname) && (
                    <div className={cx(linkHostnameContainer, TextCaption)}>
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
            </a>

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
