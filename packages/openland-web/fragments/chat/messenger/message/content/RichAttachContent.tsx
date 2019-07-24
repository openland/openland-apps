import * as React from 'react';
import { css } from 'linaria';
import { FullMessage_GeneralMessage_attachments_MessageRichAttachment } from 'openland-api/Types';
import { layoutMedia } from 'openland-web/utils/MediaLayout';

const richWrapper = css`
    display: flex;
    flex-direction: row;
    flex-grow: 1;
    flex-shrink: 1;
    max-width: 680px;
    background-color: #f0f2f5;
    border-radius: 8px;
    overflow: hidden;
`;

const richImageContainer = css`
    display: flex;
    flex-shrink: 0;
    flex-direction: row;
    align-items: center;
    min-height: 100%;
`;

const richImageStyle = css`
    object-fit: cover;
    flex-shrink: 0;
    min-width: 100%;
    min-height: 100%;
`;

const richContentContainer = css`
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    flex-shrink: 1;
    padding-top: 16px;
    padding-bottom: 16px;
    padding-left: 16px;
    padding-right: 16px;
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
    font-size: 13px;
    color: #676d7a;
`;

const titleStyle = css`
    font-size: 17px;
    line-height: 24px;
    font-weight: 600;
    color: #171b1f;
    margin-top: 2px;
`;

const textStyle = css`
    font-size: 15px;
    line-height: 24px;
    color: #171b1f;
    margin-top: 2px;
`;

export const RichAttachContent = ({
    attach,
}: {
    attach: FullMessage_GeneralMessage_attachments_MessageRichAttachment;
}) => {
    let img = null;
    let siteIcon = null;
    const text = attach.text && attach.text.length > 150 ? attach.text.slice(0, 130) + '...' : null;
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
            <div className={richImageContainer}>
                <img
                    className={richImageStyle}
                    width={layout.width}
                    height={layout.height}
                    src={attach.image.url}
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
        <div className={richWrapper}>
            {img}
            <div className={richContentContainer}>
                {(siteIcon || attach.titleLinkHostname) && (
                    <div className={linkHostnameContainer}>
                        {siteIcon}
                        <span>{attach.titleLinkHostname}</span>
                    </div>
                )}
                {attach.title && (
                    <div className={titleStyle}>
                        <span>{attach.title}</span>
                    </div>
                )}
                {text && (
                    <div className={textStyle}>
                        <span>{text}</span>
                    </div>
                )}
            </div>
        </div>
    );
};
