import * as React from 'react';
import { css, cx } from 'linaria';
import { formatBytes } from 'openland-y-utils/formatBytes';
import IconFile from 'openland-icons/ic-file.svg';
import { TextDensed, TextLabel1 } from 'openland-web/utils/TextStyles';
import { XLoader } from 'openland-x/XLoader';

const fileContainer = css`
    display: flex;
    align-items: center;
    justify-content: flex-between;
    flex-shrink: 1;
    align-self: flex-start;
    background-color: var(--backgroundTertiary);
    border-radius: 8px;
    overflow: hidden;
    padding: 16px;
    padding-right: 24px;
    margin-top: 8px;
    max-width: 480px;
    transition: background-color 250ms cubic-bezier(0.29, 0.09, 0.24, 0.99);

    @media (max-width: 1010px) {
        max-width: 100%;
    }

    &:hover {
        text-decoration: none;
        background-color: var(--backgroundTertiaryHover);
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
    color: var(--foregroundPrimary);
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
`;

const subtitle = css`
    color: var(--foregroundPrimary);
`;

const videoContainer = css`
    display: flex;
    flex-direction: column;
    flex-shrink: 0;
    flex-grow: 1;
    min-width: 250px;
    max-width: 550px;
    min-height: 300px;
    max-height: 300px;
    height: 300px;
`;

const videoStyle = css`
    height: 100%;
`;

const VideoContent = React.memo(
    (props: {
        file: { fileId?: string; fileMetadata: { name: string; size: number }; uri?: string };
    }) => {
        return (
            <div className={videoContainer}>
                <video controls={true} className={videoStyle}>
                    <source src={`https://ucarecdn.com/${props.file.fileId}/`} type="video/mp4" />
                </video>
            </div>
        );
    },
);

export const DocumentContent = React.memo(
    (props: {
        file: {
            fileId?: string;
            fileMetadata: { name: string; size: number; mimeType: string | null };
            uri?: string;
        };
        onClick?: (ev: React.MouseEvent) => void;
    }) => {
        const { file } = props;

        if (
            file.fileMetadata.mimeType &&
            (!!file.fileMetadata.mimeType.match('video') ||
                !!file.fileMetadata.mimeType.match('mp4') ||
                !!file.fileMetadata.name.match('.mp4'))
        ) {
            return <VideoContent file={props.file} />;
        }

        const onClick = React.useCallback((ev: React.MouseEvent) => {
            if (props.onClick) {
                props.onClick(ev);
            } else {
                ev.stopPropagation();
            }
        }, []);

        return (
            <a
                className={cx(fileContainer, 'message-document-wrapper')}
                onClick={onClick}
                href={
                    !props.onClick
                        ? file.fileId && `https://ucarecdn.com/${file.fileId}/`
                        : undefined
                }
            >
                <div className={infoContent}>
                    <div className={iconContainer}>
                        {file.uri ? (
                            <XLoader size="small" transparentBackground={true} />
                        ) : (
                            <IconFile />
                        )}
                    </div>
                    <div className={metadataContainer}>
                        <div className={cx(title + ' title', TextLabel1)}>
                            {file.fileMetadata.name}
                        </div>
                        <div className={cx(subtitle, TextDensed)}>
                            {formatBytes(file.fileMetadata.size)}
                        </div>
                    </div>
                </div>
            </a>
        );
    },
);
