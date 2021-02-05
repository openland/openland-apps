import * as React from 'react';
import { css, cx } from 'linaria';
import { showModalBox } from 'openland-x/showModalBox';
import { formatBytes } from 'openland-y-utils/formatBytes';
import { formatDateTime } from 'openland-y-utils/formatTime';
import { TextCaption, TextLabel1 } from 'openland-web/utils/TextStyles';
import { showChatPicker } from 'openland-web/fragments/chat/showChatPicker';
import { MessengerContext } from 'openland-engines/MessengerEngine';
import { UIcon } from 'openland-web/components/unicorn/UIcon';
import IcClose from 'openland-icons/s/ic-close-24.svg';
import IcDownload from 'openland-icons/s/ic-down-24.svg';
import IcDownloadModal from 'openland-icons/s/ic-download-24.svg';
import IcForward from 'openland-icons/s/ic-forward-24.svg';
import IcSearch from 'openland-icons/s/ic-search-24.svg';
import IcBlue from 'openland-icons/files/blue.svg';
import IcGreen from 'openland-icons/files/green.svg';
import IcRed from 'openland-icons/files/red.svg';
import IcViolet from 'openland-icons/files/violet.svg';
import IcYellow from 'openland-icons/files/yellow.svg';
import { isElectron } from 'openland-y-utils/isElectron';
import { MediaLoader } from './MediaLoader';
import { layoutMedia } from 'openland-y-utils/MediaLayout';
import { isChrome } from 'openland-y-utils/isChrome';

const modalContainer = css`
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
`;

const modalToolbarContainer = css`
    width: 100%;
    height: 56px;
    position: absolute;
    left: 0;
    top: 0;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    z-index: 1;
    transition: 200ms opacity ease;
    opacity: 0.56;
    background: linear-gradient(180deg, rgba(0, 0, 0, 0.48) 0%, rgba(0, 0, 0, 0) 100%);
    :hover {
        opacity: 1;
    }
`;

const modalInfoContainer = css`
    padding: 16px;
    display: flex;
    align-items: flex-end;
    pointer-events: none;
    margin-right: auto;
`;

const modalSecondaryText = css`
    color: var(--foregroundContrast);
    margin-right: 12px;
`;

const modalButtonsContainer = css`
    display: flex;
    align-items: center;
`;

const modalButtonStyle = css`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    width: 48px;
    height: 48px;
    opacity: 0.72;
    cursor: pointer;
    &:hover {
        opacity: 1;
    }
`;

const modalContent = css`
    display: flex;
    justify-content: center;
    height: 100%;
    padding-top: 40px;
    padding-bottom: 20px;
    max-width: 80%;
    flex-grow: 1;
    flex-shrink: 1;
    overflow: hidden;
`;

interface ModalProps {
    fileId: string;
    fileName: string;
    sender?: { name: string };
    senderNameEmojify?: string | JSX.Element;
    date?: number;
}

const ModalContent = React.memo((props: ModalProps & { hide: () => void; url?: string }) => {
    const messenger = React.useContext(MessengerContext);

    const forwardCallback = React.useCallback(() => {
        showChatPicker((id: string) => {
            messenger.sender.shareFile(id, props.fileId);
        });
    }, []);

    return (
        <div className={modalContainer} onClick={props.hide}>
            <div className={modalToolbarContainer}>
                {(props.sender || props.senderNameEmojify) && props.date && (
                    <div className={modalInfoContainer}>
                        <div className={cx(TextCaption, modalSecondaryText)}>
                            {props.senderNameEmojify || props.sender ? props.sender!!.name : ''}
                        </div>
                        <div className={cx(TextCaption, modalSecondaryText)}>
                            {formatDateTime(props.date)}
                        </div>
                    </div>
                )}
                <div className={modalButtonsContainer} onClick={(e) => e.stopPropagation()}>
                    <a className={modalButtonStyle} href={`https://ucarecdn.com/${props.fileId}/`}>
                        <UIcon icon={<IcDownloadModal />} color="var(--foregroundContrast)" />
                    </a>
                    <div
                        className={modalButtonStyle}
                        onClick={(e) => {
                            e.stopPropagation();
                            forwardCallback();
                        }}
                    >
                        <UIcon icon={<IcForward />} color="var(--foregroundContrast)" />
                    </div>
                    <div className={modalButtonStyle} onClick={props.hide}>
                        <UIcon icon={<IcClose />} color="var(--foregroundContrast)" />
                    </div>
                </div>
            </div>
            <div className={modalContent} onClick={(e) => e.stopPropagation()}>
                <embed
                    src={`https://ucarecdn.com/${props.fileId}/-/inline/yes/${props.fileName}`}
                    width="100%"
                    height="100%"
                    type="application/pdf"
                />
            </div>
        </div>
    );
});

const showPdfModal = (props: ModalProps, url?: string) => {
    showModalBox({ fullScreen: true, darkOverlay: true, useTopCloser: false }, (ctx) => {
        return <ModalContent {...props} hide={ctx.hide} url={url} />;
    });
};

const fileContainer = css`
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-shrink: 1;
    align-self: flex-start;
    background-color: var(--backgroundTertiary);
    border-radius: 8px;
    overflow: hidden;
    padding: 16px;
    padding-right: 24px;
    max-width: 480px;
    transition: background-color 250ms cubic-bezier(0.29, 0.09, 0.24, 0.99);

    @media (max-width: 1010px) {
        max-width: 100%;
    }

    &:hover {
        text-decoration: none;
        background-color: var(--backgroundTertiaryHover);
    }

    & .icon-info .format-text {
        transition: all 150ms;
        transform: translateY(0);
        opacity: 1;
        margin-top: 2px;
    }

    & .icon-info .download-icon {
        transition: all 150ms;
        transform: translateY(-20px);
        opacity: 0;
    }
    &:hover .icon-info .download-icon {
        opacity: 1;
        transform: translateY(8px);
    }
    &:hover .icon-info .format-text {
        opacity: 0;
        transform: translateY(20px);
    }
`;

const infoContent = css`
    display: flex;
    align-items: center;
    flex-shrink: 1;
`;

const fileIconContainer = css`
    position: relative;
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    margin-right: 12px;
    & > svg {
        position: absolute;
        top: 0;
        left: 0;
    }
`;

const iconInfo = css`
    position: relative;
    flex-grow: 1;
    flex-shrink: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-size: 10px;
    font-weight: 600;
    line-height: 12px;
    color: #fff;
`;

const metadataContainer = css`
    display: flex;
    flex-direction: column;
    margin-bottom: 2px;
    padding-right: 24px;
`;

const title = css`
    color: var(--foregroundPrimary);
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
`;

const subtitle = css`
    color: var(--foregroundSecondary);
`;

const videoContainer = css`
    display: flex;
    flex-direction: column;
    flex-shrink: 0;
    flex-grow: 1;
    opacity: 0;
    padding: 1px;
    position: relative;
    justify-content: center;
    align-items: center;
`;

const videoContainerSize = css`
    max-width: 680px;
    min-height: 302px;
    max-height: 302px;
`;

const videoStyle = css`
    border-radius: 8px;
    width: 100%;
    min-height: 200px;
    object-fit: contain;
    position: relative;

    &::before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        border-radius: 8px;
        border: 1px solid var(--borderLight);
        pointer-events: none;
    }
`;
const minWidth = 204;
const minHeight = 200;
const getLayout = (w: number, h: number, maxW: number = 680, maxH: number = 360) => {
    const layout = layoutMedia(w, h, maxW, maxH, minWidth, minHeight);
    const width = Math.max(layout.width, minWidth);
    const height = Math.max(layout.height, minHeight);
    return { width, height };
};

type VideoProps = React.VideoHTMLAttributes<HTMLVideoElement> & { src?: string, maxWidth?: number, maxHeight?: number };

const VideoContent = React.memo(
    (props: {
        file: {
            fileId?: string;
            fileMetadata: { name: string; size: number };
            uri?: string;
            previewFileId?: string | null;
            previewFileMetadata?: { name: string; imageWidth: number | null; imageHeight: number | null; mimeType: string | null } | null;
            filePreview?: string;
        };
        videoProps?: VideoProps;
    }) => {
        const { src, onClick, onLoadedMetadata, maxWidth, maxHeight, ...otherVideoProps } = props.videoProps || {};
        const videoRef = React.useRef<HTMLVideoElement>(null);
        const wrapperRef = React.useRef<HTMLDivElement>(null);
        const previewHeight = props.file.previewFileMetadata?.imageHeight;
        const previewWidth = props.file.previewFileMetadata?.imageWidth;
        const previewLayout = previewHeight && previewWidth
            ? getLayout(previewWidth, previewHeight, maxWidth, maxHeight)
            : undefined;
        const videoSrc = props.file.fileId ? `https://ucarecdn.com/${props.file.fileId}/` : (props.file.uri || src);

        const handleLoadedMetadata = React.useCallback((e: React.SyntheticEvent<HTMLVideoElement, Event>) => {
            if (videoRef.current) {
                const { width, height } = getLayout(videoRef.current.videoWidth, videoRef.current.videoHeight, maxWidth, maxHeight);
                wrapperRef.current!.style.maxWidth = `${width}px`;
                wrapperRef.current!.style.height = `${height}px`;
                wrapperRef.current!.style.opacity = '1';
            }
            if (onLoadedMetadata) {
                onLoadedMetadata(e);
            }
        }, []);
        const handleClick = React.useCallback((e: React.MouseEvent<HTMLVideoElement>) => {
            e.stopPropagation();
            if (onClick) {
                onClick(e);
            }
        }, []);

        return (
            <div
                className={cx(videoContainer, !previewLayout && !maxWidth && !maxHeight && videoContainerSize)}
                ref={wrapperRef}
                style={previewLayout ? { maxWidth: previewLayout.width, height: previewLayout.height } : {}}
            >
                <video
                    {...otherVideoProps}
                    controls={true}
                    className={videoStyle}
                    ref={videoRef}
                    onClick={handleClick}
                    onLoadedMetadata={handleLoadedMetadata}
                    {...isChrome && { disablePictureInPicture: true, controlsList: 'nodownload' }}
                >
                    <source src={videoSrc} type="video/mp4" />
                </video>
            </div>
        );
    },
);

export const fileIcon = {
    FILE: <IcBlue />,
    PNG: <IcBlue />,
    JPG: <IcBlue />,
    GIF: <IcBlue />,
    SVG: <IcBlue />,
    WEBP: <IcBlue />,
    PDF: <IcRed />,
    ZIP: <IcViolet />,
    VIDEO: <IcViolet />,
    DOCX: <IcBlue />,
    PAGES: <IcBlue />,
    XLSX: <IcGreen />,
    NUMB: <IcGreen />,
    PPTX: <IcYellow />,
    KEY: <IcYellow />,
};

export const fileColor = {
    FILE: '#248BF2',
    PDF: '#E52243',
    ZIP: '#8518F2',
    VIDEO: '#8518F2',
    DOCX: '#248BF2',
    PAGES: '#248BF2',
    XLSX: '#3EB265',
    NUMB: '#3EB265',
    PPTX: '#FFAE0D',
    KEY: '#FFAE0D',
    PNG: '#248BF2',
    JPG: '#248BF2',
    GIF: '#248BF2',
    SVG: '#248BF2',
    WEBP: '#248BF2',
};

export const fileFormat = (name: string) => {
    let format = 'FILE';
    if (name.endsWith('.pdf')) {
        format = 'PDF';
    }
    if (name.endsWith('.zip')) {
        format = 'ZIP';
    }
    if (name.endsWith('.mp4') || name.endsWith('.mov')) {
        format = 'VIDEO';
    }
    if (name.endsWith('.doc') || name.endsWith('.docx')) {
        format = 'DOCX';
    }
    if (name.endsWith('.pages')) {
        format = 'PAGES';
    }
    if (name.endsWith('.xls') || name.endsWith('.xlsx')) {
        format = 'XLSX';
    }
    if (name.endsWith('.numbers')) {
        format = 'NUMB';
    }
    if (name.endsWith('.ppt') || name.endsWith('.pptx')) {
        format = 'PPTX';
    }
    if (name.endsWith('.key')) {
        format = 'KEY';
    }
    if (name.endsWith('.png')) {
        format = 'PNG';
    }
    if (name.endsWith('.jpg') || name.endsWith('.jpeg')) {
        format = 'JPG';
    }
    if (name.endsWith('.gif')) {
        format = 'GIF';
    }
    if (name.endsWith('.svg')) {
        format = 'SVG';
    }
    if (name.endsWith('.webp')) {
        format = 'WEBP';
    }
    return format;
};

interface DocumentContentProps {
    file: {
        fileId?: string;
        fileMetadata: { name: string; size: number; mimeType: string | null };
        uri?: string;
        previewFileMetadata?: { name: string; imageWidth: number | null; imageHeight: number | null; mimeType: string | null } | null;
    };
    sender?: { name: string };
    senderNameEmojify?: string | JSX.Element;
    date?: number;
    onClick?: (ev: React.MouseEvent) => void;
    progress?: number;
    className?: string;
    inlineVideo?: boolean;
    videoProps?: VideoProps;
}

export const DocumentContent = React.memo((props: DocumentContentProps) => {
    const { file, progress, videoProps } = props;
    const { name, size } = file.fileMetadata;
    const isSafari = (window as any).safari !== undefined;

    const applyShowPdfModal =
        fileFormat(name) === 'PDF' &&
        (file.fileMetadata.mimeType === 'application/pdf' || isSafari);

    if (
        props.inlineVideo &&
        (!!file.fileMetadata.mimeType?.match('video') || fileFormat(name) === 'VIDEO')
    ) {
        return <VideoContent file={props.file} videoProps={videoProps} />;
    }

    let fileSrc: undefined | string = `https://ucarecdn.com/${file.fileId}/`;
    const isUpload = !!progress && (progress >= 0 && progress < 1);

    const onClick = React.useCallback((ev: React.MouseEvent) => {
        if (props.onClick) {
            props.onClick(ev);
        } else {
            ev.stopPropagation();
            if (applyShowPdfModal && !isElectron && !isUpload) {
                showPdfModal(
                    {
                        fileId: file.fileId || '',
                        fileName: file.fileMetadata.name,
                        sender: props.sender,
                        senderNameEmojify: props.senderNameEmojify,
                        date: props.date,
                    },
                    fileSrc,
                );
            }
        }
    }, [applyShowPdfModal, isUpload]);

    if (applyShowPdfModal && !isElectron) {
        fileSrc = undefined;
    }

    const fileSender = props.senderNameEmojify
        ? props.senderNameEmojify
        : props.sender && props.sender.name
            ? props.sender.name
            : '';

    const uploadStyles = {
        borderRadius: '8px',
        backgroundColor: fileColor[fileFormat(name)],
    } as React.CSSProperties;

    return (
        <a
            className={cx(fileContainer, 'message-document-wrapper', props.className)}
            onClick={onClick}
            href={!props.onClick && !isUpload ? fileSrc : undefined}
            target="_blank"
        >
            <div className={infoContent}>
                <div className={fileIconContainer} style={isUpload ? uploadStyles : undefined}>
                    {!isUpload && fileIcon[fileFormat(name)]}
                    {isUpload ? (
                        <MediaLoader
                            size="small"
                            transparent={true}
                            progress={Math.round(progress! * 100)}
                            cancelable={!isUpload}
                        />
                    ) : (
                            <div className={cx(iconInfo, 'icon-info')}>
                                <UIcon
                                    icon={applyShowPdfModal && !isElectron ? <IcSearch /> : <IcDownload />}
                                    color="#fff"
                                    size={16}
                                    className="download-icon"
                                />
                                <div className="format-text">{fileFormat(name)}</div>
                            </div>
                        )}
                </div>
                <div className={metadataContainer}>
                    <div className={cx(title + ' title', TextLabel1)}>{name}</div>
                    <div className={cx(subtitle, TextCaption)}>
                        {`${formatBytes(size)}${fileSender ? `  ·  ` : ''}`}
                        {fileSender ? fileSender : ''}
                    </div>
                </div>
            </div>
        </a>
    );
});
