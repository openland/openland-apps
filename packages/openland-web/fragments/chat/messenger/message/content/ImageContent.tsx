import * as React from 'react';
import { css, cx } from 'linaria';
import {
    FullMessage_GeneralMessage_attachments_MessageAttachmentFile,
    UserShort,
} from 'openland-api/spacex.types';
import { useImageViewer, ImageViewerCb } from 'openland-x-utils/imageViewer';
import { layoutMedia, uploadcareOptions } from 'openland-y-utils/MediaLayout';
import { showChatPicker } from 'openland-web/fragments/chat/showChatPicker';
import { showModalBox } from 'openland-x/showModalBox';
import { UIcon } from 'openland-web/components/unicorn/UIcon';
import { formatDateTime } from 'openland-y-utils/formatTime';
import { TextCaption, TextLabel1 } from 'openland-web/utils/TextStyles';
import { useIsMobile } from 'openland-web/hooks/useIsMobile';
import { XLoader } from 'openland-x/XLoader';
import { useShortcuts } from 'openland-x/XShortcuts/useShortcuts';
import { MessengerContext } from 'openland-engines/MessengerEngine';
import { ImgWithRetry } from 'openland-web/components/ImgWithRetry';
import { emoji } from 'openland-y-utils/emoji';
import { useClient } from 'openland-api/useClient';
import IcDownload from 'openland-icons/s/ic-download-24.svg';
import IcForward from 'openland-icons/s/ic-forward-24.svg';
import IcClose from 'openland-icons/s/ic-close-24.svg';
import IcLeft from 'openland-icons/s/ic-arrow-left-16.svg';
import IcRight from 'openland-icons/s/ic-arrow-right-16.svg';

const modalImgContainer = css`
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    user-select: none;
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

const modalImgContent = css`
    position: relative;
    flex-grow: 1;
    flex-shrink: 1;
    overflow: hidden;
    max-height: 100%;
`;

const modalInfoContainer = css`
    padding: 16px;
    display: flex;
    align-items: center;
    pointer-events: none;
    margin-right: auto;
    white-space: nowrap;
`;

const modalPrimaryText = css`
    color: var(--backgroundPrimary);
    margin-right: 16px;
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

const imgContainer = css`
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 72px;
    min-width: 72px;
    max-width: 100%;
    border-radius: 8px;
    background-color: #f0f2f5;
    z-index: 0;
    cursor: pointer;
    overflow: hidden;

    &:after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        border: 1px solid var(--borderLight);
        border-radius: 8px;
    }
`;

const imgPreviewClass = css`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    max-width: 100%;
    z-index: 0;
    filter: blur(5px);
    background: transparent;
    transition: opacity 150ms cubic-bezier(0.4, 0, 0.2, 1);
`;

const imgAppearClass = css`
    opacity: 0;
    transition: opacity 150ms cubic-bezier(0.4, 0, 0.2, 1);
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    max-width: 100%;
    max-height: 100%;
    height: auto;
    will-change: opacity;
    background: transparent;
    object-fit: contain;
    cursor: pointer;
`;

const imgSpacer = css`
    &:before {
        content: '';
        display: block;
        padding-top: var(--ratio);
        width: 100%;
    }
`;

const cursorContainer = css`
    display: flex;
    flex-direction: row;
    align-items: center;
    position: absolute;
    cursor: pointer;
    padding-top: 56px;
    top: 0;
    bottom: 0;
    width: 20%;
    transition: 200ms opacity ease;
    opacity: 0.56;
    & > div {
        flex-grow: 0;
    }
    :hover {
        opacity: 1;
    }
`;

const prevCursorContent = css`
    left: 0;
    justify-content: flex-start;
    padding-left: 16px;
    background: linear-gradient(90deg, rgba(0, 0, 0, 0.48) 0%, rgba(0, 0, 0, 0) 100%);
`;

const nextCursorContent = css`
    right: 0;
    justify-content: flex-end;
    padding-right: 16px;
    background: linear-gradient(270deg, rgba(0, 0, 0, 0.48) 0%, rgba(0, 0, 0, 0) 100%);
`;

interface ModalControllerProps {
    cId: string;
    cursor: string;
    setViewerState: (data: ImageViewerCb) => void;
    hide: () => void;
    onPrevClick: () => void;
    onNextClick: () => void;
}

const ModalController = React.memo((props: ModalControllerProps) => {
    const client = useClient();

    const sharedInfo = client.usePicSharedMedia(
        {
            chatId: props.cId,
            first: 1,
            around: props.cursor,
        },
        { fetchPolicy: 'cache-and-network' },
    ).chatSharedMedia;

    useShortcuts([
        {
            keys: ['Escape'],
            callback: () => props.hide(),
        },
        {
            keys: ['ArrowLeft'],
            callback: props.onPrevClick,
        },
        {
            keys: ['ArrowRight'],
            callback: props.onNextClick,
        },
    ]);

    React.useEffect(
        () => {
            (async () => {
                await client.refetchPicSharedMedia({
                    chatId: props.cId,
                    first: 1,
                    around: props.cursor,
                });
                let viewerData;
                if (sharedInfo) {
                    viewerData = useImageViewer(sharedInfo, props.cursor);
                    props.setViewerState(viewerData);
                }
                if (viewerData && viewerData.prevCursor) {
                    await client.refetchPicSharedMedia({
                        chatId: props.cId,
                        first: 1,
                        around: viewerData.prevCursor,
                    });
                }
                if (viewerData && viewerData.nextCursor) {
                    await client.refetchPicSharedMedia({
                        chatId: props.cId,
                        first: 1,
                        around: viewerData.nextCursor,
                    });
                }
            })();
        },
        [sharedInfo],
    );

    return null;
});

interface ModalProps {
    fileId: string;
    imageWidth: number;
    imageHeight: number;
    preview?: string | null;
    sender?: UserShort;
    senderNameEmojify?: string | JSX.Element;
    date?: number;
    chatId?: string;
    mId?: string;
}

const ModalContent = React.memo((props: ModalProps & { hide: () => void }) => {
    const isMobile = useIsMobile();
    const messenger = React.useContext(MessengerContext);
    const imgRef = React.useRef<HTMLImageElement>(null);
    const loaderRef = React.useRef<HTMLDivElement>(null);

    const [viewerState, setViewerState] = React.useState<ImageViewerCb | null>(null);
    const [loaded, setLoaded] = React.useState(false);
    const [cursor, setCursor] = React.useState(props.mId);

    const onLoad = React.useCallback(
        () => {
            if (imgRef.current && loaderRef.current) {
                imgRef.current.style.opacity = '1';
                imgRef.current.style.visibility = 'visible';
                loaderRef.current.style.opacity = '0';
                loaderRef.current.style.display = 'none';
                setLoaded(true);
            }
        },
        [viewerState],
    );

    React.useLayoutEffect(
        () => {
            if (imgRef.current && loaderRef.current && !loaded) {
                imgRef.current.style.opacity = '0';
                imgRef.current.style.visibility = 'hidden';
                loaderRef.current.style.opacity = '1';
                loaderRef.current.style.display = 'flex';
            }
        },
        [viewerState],
    );

    const onPrevClick = () => {
        if (viewerState && viewerState.prevCursor) {
            setCursor(viewerState.prevCursor);
            setLoaded(false);
        }
    };
    const onNextClick = () => {
        if (viewerState && viewerState.nextCursor) {
            setCursor(viewerState.nextCursor);
            setLoaded(false);
        }
    };

    const forwardCallback = React.useCallback(() => {
        showChatPicker((id: string) => {
            messenger.sender.shareFile(id, viewerState ? viewerState.current.fileId : props.fileId);
        });
    }, []);

    const sender = viewerState
        ? viewerState.current.senderName
        : props.senderNameEmojify
        ? props.senderNameEmojify
        : props.sender
        ? emoji(props.sender.name)
        : '';

    const date = viewerState ? viewerState.current.date : props.date;
    const downloadLink =
        'https://ucarecdn.com/' +
        (viewerState ? viewerState.current.fileId : props.fileId) +
        '/-/format/jpg/-/inline/no/pic.jpg';

    const url = `https://ucarecdn.com/${
        viewerState ? viewerState.current.fileId : props.fileId
    }/-/format/auto/-/`;

    const layoutModal = layoutMedia(
        viewerState ? viewerState.current.imageWidth : props.imageWidth,
        viewerState ? viewerState.current.imageHeight : props.imageHeight,
        window.innerWidth,
        window.innerHeight,
        32,
        32,
    );

    const modalOps = uploadcareOptions(layoutModal);

    const src = url + modalOps[0];
    const srcSet = url + modalOps[1];
    const width = layoutModal.width;
    const height = layoutModal.height;

    const preview = viewerState ? viewerState.current.filePreview : props.preview;

    return (
        <div className={modalImgContainer} onClick={props.hide}>
            <div className={modalToolbarContainer} onClick={e => e.preventDefault()}>
                {cursor && props.chatId && (
                    <React.Suspense fallback={null}>
                        <ModalController
                            cId={props.chatId}
                            cursor={cursor || ''}
                            setViewerState={setViewerState}
                            hide={props.hide}
                            onPrevClick={onPrevClick}
                            onNextClick={onNextClick}
                        />
                    </React.Suspense>
                )}
                {sender && date && (
                    <div className={modalInfoContainer}>
                        {viewerState && (
                            <div className={cx(TextLabel1, modalPrimaryText)}>
                                {isMobile ? (
                                    <>
                                        {viewerState.index} of {viewerState.count}
                                    </>
                                ) : (
                                    <>
                                        Media {viewerState.index} of {viewerState.count}
                                    </>
                                )}
                            </div>
                        )}
                        {!isMobile && (
                            <div className={cx(TextCaption, modalSecondaryText)}>{sender}</div>
                        )}
                        <div className={cx(TextCaption, modalSecondaryText)}>
                            {formatDateTime(date)}
                        </div>
                    </div>
                )}
                <div className={modalButtonsContainer}>
                    <a className={modalButtonStyle} href={downloadLink} onClick={e => e.stopPropagation()}>
                        <UIcon icon={<IcDownload />} color="var(--backgroundPrimary)" />
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
            <div className={modalImgContent} style={{ maxWidth: width }}>
                <div
                    className={imgSpacer}
                    style={
                        {
                            width: width,
                            maxWidth: '100%',
                            margin: 'auto',
                            '--ratio': (height / width) * 100 + '%',
                        } as React.CSSProperties
                    }
                />
                {preview && (
                    <img
                        className={imgPreviewClass}
                        src={preview}
                        width={width}
                        height={height}
                        style={{ cursor: 'default' }}
                    />
                )}
                <XLoader
                    loading={true}
                    transparentBackground={true}
                    ref={loaderRef}
                    contrast={true}
                />
                <ImgWithRetry
                    ref={imgRef}
                    onLoad={onLoad}
                    src={src}
                    srcSet={srcSet}
                    className={imgAppearClass}
                    width={width}
                    height={height}
                    style={{ objectFit: 'contain', cursor: 'default' }}
                />
            </div>
            {viewerState && viewerState.hasPrevPage && (
                <div
                    className={cx(cursorContainer, prevCursorContent)}
                    onClick={e => {
                        e.stopPropagation();
                        onPrevClick();
                    }}
                >
                    <UIcon icon={<IcLeft />} size={24} color={'var(--backgroundPrimary)'} />
                </div>
            )}
            {viewerState && viewerState.hasNextPage && (
                <div
                    className={cx(cursorContainer, nextCursorContent)}
                    onClick={e => {
                        e.stopPropagation();
                        onNextClick();
                    }}
                >
                    <UIcon icon={<IcRight />} size={24} color={'var(--backgroundPrimary)'} />
                </div>
            )}
        </div>
    );
});

export const showImageModal = (props: ModalProps) => {
    showModalBox(
        { fullScreen: true, darkOverlay: true, useTopCloser: false, hideOnEsc: false },
        ctx => <ModalContent {...props} hide={ctx.hide} />,
    );
};

const GifContent = React.memo(
    (props: { file: FullMessage_GeneralMessage_attachments_MessageAttachmentFile }) => {
        const gifRef = React.useRef<HTMLVideoElement>(null);
        const loaderRef = React.useRef<HTMLDivElement>(null);
        const onLoad = React.useCallback(() => {
            if (gifRef.current && loaderRef.current) {
                gifRef.current.style.opacity = '1';
                loaderRef.current.style.opacity = '0';
            }
        }, []);

        const layout = layoutMedia(
            props.file.fileMetadata.imageWidth || 0,
            props.file.fileMetadata.imageHeight || 0,
            680,
            360,
            32,
            32,
        );

        const layoutWidth = layout.width;
        const layoutHeight = layout.height;

        const imgPositionLeft = layoutWidth < 72 ? `calc(50% - ${layoutWidth / 2}px)` : '0';
        const imgPositionTop = layoutHeight < 72 ? `calc(50% - ${layoutHeight / 2}px)` : '0';

        return (
            <div className={imgContainer} style={{ width: layoutWidth }}>
                <div
                    className={imgSpacer}
                    style={
                        {
                            width: layoutWidth,
                            '--ratio': (layoutHeight / layoutWidth) * 100 + '%',
                        } as React.CSSProperties
                    }
                />
                <img
                    className={imgPreviewClass}
                    width={layoutWidth}
                    height={layoutHeight}
                    src={props.file.filePreview || undefined}
                    style={{ top: imgPositionTop, left: imgPositionLeft }}
                />
                <XLoader
                    transparentBackground={true}
                    ref={loaderRef}
                    loading={true}
                    contrast={true}
                />
                <video
                    ref={gifRef}
                    onLoadStart={onLoad}
                    width={layoutWidth}
                    height={layoutHeight}
                    autoPlay={true}
                    loop={true}
                    muted={true}
                    className={imgAppearClass}
                >
                    <source
                        src={
                            'https://ucarecdn.com/' +
                            props.file.fileId +
                            '/gif2video/-/format/webm/image.gif'
                        }
                        type="video/webm"
                    />
                    <source
                        src={
                            'https://ucarecdn.com/' +
                            props.file.fileId +
                            '/gif2video/-/format/mp4/image.gif'
                        }
                        type="video/mp4"
                    />
                </video>
            </div>
        );
    },
);

interface ImageContentProps {
    file: FullMessage_GeneralMessage_attachments_MessageAttachmentFile;
    sender?: UserShort;
    senderNameEmojify?: string | JSX.Element;
    date?: number;
    chatId?: string;
    mId?: string;
}

export const ImageContent = React.memo((props: ImageContentProps) => {
    if (props.file.fileMetadata.imageFormat === 'GIF') {
        return <GifContent file={props.file} />;
    }

    const imgRef = React.useRef<HTMLImageElement>(null);
    const imgPrevRef = React.useRef<HTMLImageElement>(null);
    const loaderRef = React.useRef<HTMLDivElement>(null);

    const onLoad = React.useCallback(() => {
        if (imgRef.current && imgPrevRef.current && loaderRef.current) {
            imgRef.current.style.opacity = '1';
            imgPrevRef.current.style.opacity = '0';
            imgPrevRef.current.style.visibility = 'hidden';
            loaderRef.current.style.opacity = '0';
        }
    }, []);

    const layout = layoutMedia(
        props.file.fileMetadata.imageWidth || 0,
        props.file.fileMetadata.imageHeight || 0,
        680,
        360,
        32,
        32,
    );

    const layoutWidth = layout.width;
    const layoutHeight = layout.height;

    const url = `https://ucarecdn.com/${props.file.fileId}/-/format/auto/-/`;
    const ops = `scale_crop/${layoutWidth}x${layoutHeight}/`;
    const opsRetina = `scale_crop/${layoutWidth * 2}x${layoutHeight * 2}/center/ 2x`;

    return (
        <div
            className={imgContainer}
            style={{ width: layoutWidth }}
            onClick={(e: React.MouseEvent) => {
                e.stopPropagation();
                showImageModal({
                    fileId: props.file.fileId,
                    imageWidth: props.file.fileMetadata.imageWidth || 0,
                    imageHeight: props.file.fileMetadata.imageHeight || 0,
                    preview: props.file.filePreview,
                    sender: props.sender,
                    senderNameEmojify: props.senderNameEmojify,
                    date: props.date,
                    chatId: props.chatId,
                    mId: props.mId,
                });
            }}
        >
            <div
                className={imgSpacer}
                style={
                    {
                        width: layoutWidth,
                        '--ratio': (layoutHeight / layoutWidth) * 100 + '%',
                    } as React.CSSProperties
                }
            />
            <ImgWithRetry
                ref={imgPrevRef}
                className={imgPreviewClass}
                width={layoutWidth}
                height={layoutHeight}
                src={props.file.filePreview || undefined}
            />
            <XLoader loading={true} transparentBackground={true} ref={loaderRef} />
            <ImgWithRetry
                ref={imgRef}
                onLoad={onLoad}
                className={imgAppearClass}
                width={layoutWidth}
                height={layoutHeight}
                src={url + ops}
                srcSet={url + opsRetina}
            />
        </div>
    );
});
