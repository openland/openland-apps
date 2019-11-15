import * as React from 'react';
import { css, cx } from 'linaria';
import { XLoader } from 'openland-x/XLoader';
import { UserShort } from 'openland-api/Types';
import { showModalBox } from 'openland-x/showModalBox';
import { formatBytes } from 'openland-y-utils/formatBytes';
import { formatDateTime } from 'openland-y-utils/formatTime';
import { TextCaption, TextDensed, TextLabel1 } from 'openland-web/utils/TextStyles';
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
    color: var(--backgroundPrimary);
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
    sender?: UserShort;
    senderNameEmojify?: string | JSX.Element;
    date?: number;
}

let PdfDocument: any;
let PdfPage: any;
const ReactPdf = (props: { path: string }) => {
    
    const [ready, setReaady] = React.useState(false);
    React.useEffect(() => {
        (async () => {
            const { Document, Page } = await import(/* webpackMode: "lazy" */'react-pdf');
            PdfDocument = Document;
            PdfPage = Page;
            setReaady(true);
        })();
    }, []);
    const [numPages, setNumPages] = React.useState<number>();

    const onDocumentLoadSuccess = React.useCallback((document: any) => {
        setNumPages(document.numPages);
    }, []);
    return (
        <div style={{ overflow: 'scroll' }}>
            {ready ?
                <PdfDocument
                    file={props.path}
                    onLoadSuccess={onDocumentLoadSuccess}
                    loading={<XLoader transparentBackground={true} size="medium" />}
                >
                    {Array.from(
                        new Array(numPages),
                        (el, index) => (
                            <PdfPage
                                key={`page_${index + 1}`}
                                pageNumber={index + 1}
                            />
                        ),
                    )}
                </PdfDocument> :
                <XLoader transparentBackground={true} size="medium" />
            }

        </div>
    );
};

const ModalContent = (props: ModalProps & { hide: () => void }) => {
    const messenger = React.useContext(MessengerContext);

    const forwardCallback = React.useCallback(() => {
        showChatPicker((id: string) => {
            messenger.sender.shareFile(id, props.fileId);
        });
    }, []);

    return (
        <div className={modalContainer} onClick={props.hide}>
            <div className={modalToolbarContainer}>
                {(props.sender || props.senderNameEmojify) &&
                    props.date && (
                        <div className={modalInfoContainer}>
                            <div className={cx(TextCaption, modalSecondaryText)}>
                                {props.senderNameEmojify || props.sender ? props.sender!!.name : ''}
                            </div>
                            <div className={cx(TextCaption, modalSecondaryText)}>
                                {formatDateTime(props.date)}
                            </div>
                        </div>
                    )}
                <div className={modalButtonsContainer} onClick={e => e.stopPropagation()}>
                    <a className={modalButtonStyle} href={`https://ucarecdn.com/${props.fileId}/`}>
                        <UIcon icon={<IcDownloadModal />} color="var(--backgroundPrimary)" />
                    </a>
                    <div
                        className={modalButtonStyle}
                        onClick={e => {
                            e.stopPropagation();
                            forwardCallback();
                        }}
                    >
                        <UIcon icon={<IcForward />} color="var(--backgroundPrimary)" />
                    </div>
                    <div className={modalButtonStyle} onClick={props.hide}>
                        <UIcon icon={<IcClose />} color="var(--backgroundPrimary)" />
                    </div>
                </div>
            </div>
            <div className={modalContent} onClick={e => e.stopPropagation()}>

                {isElectron ?
                    <ReactPdf path={`https://ucarecdn.com/${props.fileId}/-/inline/yes/${props.fileName}`} /> :
                    <embed
                        src={`https://ucarecdn.com/${props.fileId}/-/inline/yes/${props.fileName}`}
                        width="100%"
                        height="100%"
                        type="application/pdf"
                    />}
            </div>
        </div>
    );
};

const showPdfModal = (props: ModalProps) => {
    showModalBox({ fullScreen: true, darkOverlay: true, useTopCloser: false }, ctx => (
        <ModalContent {...props} hide={ctx.hide} />
    ));
};

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

const iconContainer = css`
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
            <div className={videoContainer} onClick={e => e.stopPropagation()}>
                <video controls={true} className={videoStyle}>
                    <source src={`https://ucarecdn.com/${props.file.fileId}/`} type="video/mp4" />
                </video>
            </div>
        );
    },
);

const fileIcon = {
    FILE: <IcBlue />,
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

const fileFormat = (name: string) => {
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
    return format;
};

interface DocumentContentProps {
    file: {
        fileId?: string;
        fileMetadata: { name: string; size: number; mimeType: string | null };
        uri?: string;
    };
    sender?: UserShort;
    senderNameEmojify?: string | JSX.Element;
    date?: number;
    onClick?: (ev: React.MouseEvent) => void;
}

export const DocumentContent = React.memo((props: DocumentContentProps) => {
    const { file } = props;
    const { name, size } = file.fileMetadata;
    const isSafari = (window as any).safari !== undefined;

    const applyShowPdfModal =
        fileFormat(name) === 'PDF' &&
        (file.fileMetadata.mimeType === 'application/pdf' || isSafari);

    if (
        file.fileMetadata.mimeType &&
        (!!file.fileMetadata.mimeType.match('video') || fileFormat(name) === 'VIDEO')
    ) {
        return <VideoContent file={props.file} />;
    }

    const onClick = React.useCallback((ev: React.MouseEvent) => {
        if (props.onClick) {
            props.onClick(ev);
        } else {
            ev.stopPropagation();
            if (applyShowPdfModal) {
                showPdfModal({
                    fileId: file.fileId || '',
                    fileName: file.fileMetadata.name,
                    sender: props.sender,
                    senderNameEmojify: props.senderNameEmojify,
                    date: props.date,
                });
            }
        }
    }, []);

    let fileSrc: undefined | string = `https://ucarecdn.com/${file.fileId}/`;

    if (applyShowPdfModal) {
        fileSrc = undefined;
    }

    return (
        <a
            className={cx(fileContainer, 'message-document-wrapper')}
            onClick={onClick}
            href={!props.onClick ? fileSrc : undefined}
        >
            <div className={infoContent}>
                <div className={iconContainer}>
                    {fileIcon[fileFormat(name)]}
                    {file.uri ? (
                        <XLoader size="small" color="#fff" transparentBackground={true} />
                    ) : (
                            <div className={cx(iconInfo, 'icon-info')}>
                                <UIcon
                                    icon={applyShowPdfModal ? <IcSearch /> : <IcDownload />}
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
                    <div className={cx(subtitle, TextDensed)}>{formatBytes(size)}</div>
                </div>
            </div>
        </a>
    );
});
