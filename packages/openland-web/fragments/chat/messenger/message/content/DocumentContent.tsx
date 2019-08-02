import * as React from 'react';
import { css, cx } from 'linaria';
import { formatBytes } from 'openland-y-utils/formatBytes';
import { FullMessage_GeneralMessage_attachments_MessageAttachmentFile } from 'openland-api/Types';
import IconFile from 'openland-icons/ic-file.svg';
import { TextDensed, TextLabel1 } from 'openland-web/utils/TextStyles';
import { XLoader } from 'openland-x/XLoader';

const fileContainer = css`
    display: flex;
    align-items: center;
    justify-content: flex-between;
    flex-shrink: 1;
    align-self: flex-start;
    background-color: #F2F3F5; // ThemeDefault.backgroundTertiary
    border-radius: 8px;
    overflow: hidden;
    padding: 16px;
    padding-right: 24px;
    margin-top: 8px;
    max-width: 480px;
    transition: background-color 250ms cubic-bezier(.29, .09, .24, .99);
     
    &:hover {
       text-decoration: none;
       background-color: #EBEDF0; // ThemeDefault.backgroundTertiaryHover
    }
`;

const infoContent = css`
    display: flex;
    align-items: center;
    flex-shrink: 1;
`;

const iconContainer = css`
    position: relative;
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

const metadataContainer = css`
    display: flex;
    flex-direction: column;
`;

const title = css`
    color: #171b1f;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
`;

const subtitle = css`
    color: #171b1f;
`;

export const DocumentContent = React.memo(({
    file,
}: {
    file: FullMessage_GeneralMessage_attachments_MessageAttachmentFile & { uri?: string };
}) => {
    let onClick = React.useCallback((ev: React.MouseEvent) => {
        ev.stopPropagation();
    }, []);
    return (
        <a className={cx(fileContainer, 'message-document-wrapper')} href={file.fileId && `https://ucarecdn.com/${file.fileId}/`} onClick={onClick} >
            <div className={infoContent}>
                <div className={iconContainer}>
                    {file.uri ? <XLoader size="small" transparentBackground={true} /> : <IconFile />}
                </div>
                <div className={metadataContainer}>
                    <div className={cx(title + ' title', TextLabel1)}>{file.fileMetadata.name}</div>
                    <div className={cx(subtitle, TextDensed)}>{formatBytes(file.fileMetadata.size)}</div>
                </div>
            </div>
        </a>
    );
});
