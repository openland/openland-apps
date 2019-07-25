import * as React from 'react';
import { css } from 'linaria';
import { formatBytes } from 'openland-y-utils/formatBytes';
import { FullMessage_GeneralMessage_attachments_MessageAttachmentFile } from 'openland-api/Types';
import FileIcon from 'openland-icons/ic-file-3.svg';

const fileContainer = css`
    display: flex;
    align-items: center;
    flex-shrink: 1;
    align-self: flex-start;
    background-color: #f0f2f5;
    border-radius: 8px;
    overflow: hidden;
    padding: 8px 16px;
    max-width: 100%;
    &:hover {
        text-decoration: none;

        & .title {
            color: #1885f2;
        }
    }
`;

const iconContainer = css`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    margin-right: 12px;

    & svg * {
        fill: #969aa3;
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
    font-size: 13px;
    color: #171b1f;
`;

export const DocumentContent = ({
    file,
}: {
    file: FullMessage_GeneralMessage_attachments_MessageAttachmentFile;
}) => {
    return (
        <a className={fileContainer} href={`https://ucarecdn.com/${file.fileId}/`} title="doc">
            <div className={iconContainer}>
                <FileIcon />
            </div>
            <div className={metadataContainer}>
                <div className={title + ' title'}>{file.fileMetadata.name}</div>
                <div className={subtitle}>{formatBytes(file.fileMetadata.size)}</div>
            </div>
        </a>
    );
};
