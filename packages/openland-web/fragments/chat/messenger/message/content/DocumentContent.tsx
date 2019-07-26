import * as React from 'react';
import { css } from 'linaria';
import { formatBytes } from 'openland-y-utils/formatBytes';
import { FullMessage_GeneralMessage_attachments_MessageAttachmentFile } from 'openland-api/Types';
import IconFile from 'openland-icons/ic-file.svg';
import IconDownload from 'openland-icons/ic-download.svg';

const fileContainer = css`
    display: flex;
    align-items: center;
    justify-content: flex-between;
    flex-shrink: 1;
    flex-grow: 1;
    align-self: stretch;
    background-color: #f0f2f5;
    border-radius: 8px;
    overflow: hidden;
    padding: 16px;
    margin-top: 8px;
    max-width: 480px;
`;

const infoContent = css`
    display: flex;
    align-items: center;
    flex-grow: 1;
    flex-shrink: 1;
`;

const iconContainer = css`
    width: 40px;
    height: 40px;
    border-radius: 40px;
    background-color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    margin-right: 12px;
`;

const downloadContainer = css`
    width: 40px;
    height: 40px;
    border-radius: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    
    &:hover {
        background-color: #fff;
    }
`;

const metadataContainer = css`
    display: flex;
    flex-direction: column;
`;

const title = css`
    font-size: 15px;
    font-weight: 600;
    color: #171b1f;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
`;

const subtitle = css`
    font-size: 14px;
    color: #171b1f;
`;

export const DocumentContent = ({
    file,
}: {
    file: FullMessage_GeneralMessage_attachments_MessageAttachmentFile;
}) => {
    return (
        <div className={fileContainer}>
            <div className={infoContent}>
                <div className={iconContainer}>
                    <IconFile />
                </div>
                <div className={metadataContainer}>
                    <div className={title + ' title'}>{file.fileMetadata.name}</div>
                    <div className={subtitle}>{formatBytes(file.fileMetadata.size)}</div>
                </div>
            </div>
            <a className={downloadContainer} href={`https://ucarecdn.com/${file.fileId}/`} title="doc">
                <IconDownload/>
            </a>
        </div>
    );
};
