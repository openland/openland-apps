import * as React from 'react';
import { css, cx } from 'linaria';
import { XViewRouteContext } from 'react-mental';
import {
    FullMessage_GeneralMessage_attachments_MessageAttachmentFile,
    MessageSender,
} from 'openland-api/spacex.types';
import { useImageViewer, ImageViewerCb } from 'openland-x-utils/imageViewer';
import { layoutMedia, uploadcareOptions } from 'openland-y-utils/MediaLayout';
import { showChatPicker } from 'openland-web/fragments/chat/showChatPicker';
import { showModalBox } from 'openland-x/showModalBox';
import { UIcon } from 'openland-web/components/unicorn/UIcon';
import { formatDateTime } from 'openland-y-utils/formatTime';
import { TextCaption } from 'openland-web/utils/TextStyles';
import { useIsMobile } from 'openland-web/hooks/useIsMobile';
import { XLoader } from 'openland-x/XLoader';
import { useShortcuts } from 'openland-x/XShortcuts/useShortcuts';
import { MessengerContext } from 'openland-engines/MessengerEngine';
import { ImgWithRetry } from 'openland-web/components/ImgWithRetry';
import { emoji } from 'openland-y-utils/emoji';
import { useClient } from 'openland-api/useClient';
import { UToast } from 'openland-web/components/unicorn/UToast';
import IcDownload from 'openland-icons/s/ic-download-24.svg';
import IcForward from 'openland-icons/s/ic-forward-24.svg';
import IcClose from 'openland-icons/s/ic-close-24.svg';
import IcLeft from 'openland-icons/s/ic-back-24.svg';
import IcRight from 'openland-icons/s/ic-next-24.svg';
import { MediaLoader } from './MediaLoader';
import moment from 'moment';

const modalImgContainer = css`
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    user-select: none;
`;

const fadeoutStyle = css`
    opacity: 0 !important;
    transition: 500ms opacity ease !important;
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
    padding-left: 12px;
    padding-right: 12px;
    justify-content: center;
    top: 0;
    bottom: 0;
    width: 64px;
    transition: 200ms opacity ease;
    opacity: 0.56;
    & > div {
        flex-grow: 0;
        width: 40px;
        height: 40px;
        transition: 200ms all ease;
        border-radius: 100%;
    }
    :hover {
        opacity: 1;
    }
    :hover > div {
        background-color: rgba(0, 0, 0, 0.48);
    }
`;

const prevCursorContent = css`
    left: 0;
`;

const nextCursorContent = css`
    right: 0;
`;

const forwardToastClassName = css`
    position: absolute;
    z-index: 1;
    top: 65px;
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
    const router = React.useContext(XViewRouteContext);
    const invertedControl = router?.path.endsWith('/shared');

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

    React.useEffect(() => {
        (async () => {
            await client.refetchPicSharedMedia({
                chatId: props.cId,
                first: 1,
                around: props.cursor,
            });
            let viewerData;
            if (sharedInfo) {
                viewerData = useImageViewer(sharedInfo, props.cursor, invertedControl);
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
    }, [sharedInfo]);

    return null;
});

interface ModalProps {
    fileId: string;
    imageWidth: number;
    imageHeight: number;
    preview?: string | null;
    sender?: MessageSender;
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

    const [forwardToast, setForwardToast] = React.useState<{ title: string; show: boolean }>({
        title: 'Forwarded',
        show: false,
    });
    const [viewerState, setViewerState] = React.useState<ImageViewerCb | null>(null);
    const [loaded, setLoaded] = React.useState(false);
    const [cursor, setCursor] = React.useState(props.mId);
    const [fadeout, setFadeout] = React.useState(false);
    const [cursorData, setCursorData] = React.useState({ x: 0, y: 0 });

    useShortcuts([
        {
            keys: ['Escape'],
            callback: () => props.hide(),
        },
    ]);

    const onLoad = React.useCallback(() => {
        if (imgRef.current && loaderRef.current) {
            imgRef.current.style.opacity = '1';
            imgRef.current.style.visibility = 'visible';
            loaderRef.current.style.opacity = '0';
            loaderRef.current.style.display = 'none';
            setLoaded(true);
        }
    }, [viewerState]);

    React.useLayoutEffect(() => {
        if (imgRef.current && loaderRef.current && !loaded) {
            imgRef.current.style.opacity = '0';
            imgRef.current.style.visibility = 'hidden';
            loaderRef.current.style.opacity = '1';
            loaderRef.current.style.display = 'flex';
        }
    }, [viewerState]);

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
            if (messenger.user.id === id) {
                setForwardToast({ title: 'Added to saved messages', show: true });
            } else {
                setForwardToast({ title: 'Forwarded', show: true });
            }
        });
    }, [viewerState]);

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
        '/-/format/jpg/-/inline/no/Openland-' +
        moment(date).format('YYYY-MM-DD-HH-mm-ss') +
        '.jpg';

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

    const mouseMove = React.useCallback(
        (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
            const data = { x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY };
            setFadeout(false);
            setCursorData(data);
        },
        [fadeout, cursorData],
    );

    React.useLayoutEffect(() => {
        const timer = setTimeout(() => {
            setFadeout(true);
        }, 2000);
        return () => clearTimeout(timer);
    }, [cursorData]);

    return (
        <div className={modalImgContainer} onMouseMove={mouseMove} onClick={props.hide}>
            <UToast
                isVisible={forwardToast.show}
                type="success"
                text={forwardToast.title}
                className={forwardToastClassName}
                closeCb={() => setForwardToast({ title: 'Forwarded', show: false })}
            />
            <div
                className={cx(modalToolbarContainer, fadeout && fadeoutStyle)}
                onClick={(e) => e.preventDefault()}
            >
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
                        {!isMobile && (
                            <div className={cx(TextCaption, modalSecondaryText)}>{sender}</div>
                        )}
                        <div className={cx(TextCaption, modalSecondaryText)}>
                            {formatDateTime(date)}
                        </div>
                    </div>
                )}
                <div className={modalButtonsContainer}>
                    <a
                        className={modalButtonStyle}
                        href={downloadLink}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <UIcon icon={<IcDownload />} color="var(--foregroundContrast)" />
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
                    className={cx(cursorContainer, prevCursorContent, fadeout && fadeoutStyle)}
                    onClick={(e) => {
                        e.stopPropagation();
                        onPrevClick();
                    }}
                >
                    <UIcon icon={<IcLeft />} color={'var(--foregroundContrast)'} />
                </div>
            )}
            {viewerState && viewerState.hasNextPage && (
                <div
                    className={cx(cursorContainer, nextCursorContent, fadeout && fadeoutStyle)}
                    onClick={(e) => {
                        e.stopPropagation();
                        onNextClick();
                    }}
                >
                    <UIcon icon={<IcRight />} color={'var(--foregroundContrast)'} />
                </div>
            )}
        </div>
    );
});

export const showImageModal = (props: ModalProps) => {
    showModalBox(
        { fullScreen: true, darkOverlay: true, useTopCloser: false, hideOnEsc: false },
        (ctx) => <ModalContent {...props} hide={ctx.hide} />,
    );
};

const GifContent = React.memo(
    (props: { file: FullMessage_GeneralMessage_attachments_MessageAttachmentFile }) => {
        const gifRef = React.useRef<HTMLVideoElement>(null);
        const [isLoad, setIsLoad] = React.useState(false);
        const onLoad = React.useCallback(() => {
            if (gifRef.current) {
                gifRef.current.style.opacity = '1';
                setIsLoad(true);
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

        const webm =
            'https://ucarecdn.com/' + props.file.fileId + '/gif2video/-/format/webm/image.gif';
        const mp4 =
            'https://ucarecdn.com/' + props.file.fileId + '/gif2video/-/format/mp4/image.gif';
        const [srcWebm, setSrcWebm] = React.useState<string | undefined>(webm);
        const [srcMp4, setSrcMp4] = React.useState<string | undefined>(mp4);

        const onContinue = React.useCallback(() => {
            setSrcWebm(webm);
            setSrcMp4(mp4);
        }, [webm, mp4]);
        const onStop = React.useCallback(() => {
            setSrcWebm(undefined);
            setSrcMp4(undefined);
        }, [webm, mp4]);

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
                {!isLoad && (
                    <>
                        <img
                            className={imgPreviewClass}
                            width={layoutWidth}
                            height={layoutHeight}
                            src={props.file.filePreview || undefined}
                            style={{ top: imgPositionTop, left: imgPositionLeft }}
                        />
                        <MediaLoader onContinue={onContinue} onStop={onStop} />
                    </>
                )}
                <video
                    key={`${srcWebm}${srcMp4}`}
                    ref={gifRef}
                    onLoadedData={onLoad}
                    width={layoutWidth}
                    height={layoutHeight}
                    autoPlay={true}
                    loop={true}
                    muted={true}
                    className={imgAppearClass}
                >
                    <source src={srcWebm} type="video/webm" />
                    <source src={srcMp4} type="video/mp4" />
                </video>
            </div>
        );
    },
);

interface ImageContentProps {
    file: FullMessage_GeneralMessage_attachments_MessageAttachmentFile;
    sender?: MessageSender;
    senderNameEmojify?: string | JSX.Element;
    date?: number;
    chatId?: string;
    mId?: string;
    isPending?: boolean;
    progress?: number;
}

export const ImageContent = React.memo((props: ImageContentProps) => {
    if (props.file.fileMetadata.imageFormat === 'GIF') {
        return <GifContent file={props.file} />;
    }

    const [isLoad, setIsLoad] = React.useState(false);

    const imgRef = React.useRef<HTMLImageElement>(null);

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

    const [src, setSrc] = React.useState<string | undefined>(
        props.file.fileId ? url + ops : undefined,
    );
    const [srcSet, setSrcSet] = React.useState<string | undefined>(
        props.file.fileId ? url + opsRetina : undefined,
    );
    const [previewSrc] = React.useState(props.file.filePreview);

    React.useEffect(() => {
        if (!props.isPending) {
            setSrc(url + ops);
            setSrcSet(url + opsRetina);
        }
    }, [props.file.fileId, props.file.id]);

    const onContinue = React.useCallback(() => {
        setSrc(url + ops);
        setSrcSet(url + opsRetina);
    }, [props.file.fileId]);
    const onStop = React.useCallback(() => {
        setSrc(undefined);
        setSrcSet(undefined);
    }, [props.file.fileId]);

    const onLoad = React.useCallback(() => {
        if (imgRef.current) {
            imgRef.current.style.opacity = '1';
            setIsLoad(true);
        }
    }, []);

    const isUpload = !!props.progress && props.progress >= 0 && props.progress < 1;

    let uploadProgress = 90;
    if (isUpload) {
        uploadProgress = Math.round(props.progress! * 100);
    }

    return (
        <div
            className={imgContainer}
            style={{ width: layoutWidth }}
            onClick={(e: React.MouseEvent) => {
                e.stopPropagation();
                if (isUpload) {
                    return;
                }
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
            {(!isLoad || isUpload) && (
                <>
                    <ImgWithRetry
                        className={imgPreviewClass}
                        width={layoutWidth}
                        height={layoutHeight}
                        src={previewSrc || undefined}
                    />
                    <MediaLoader
                        onContinue={onContinue}
                        onStop={onStop}
                        progress={uploadProgress}
                    />
                </>
            )}
            <ImgWithRetry
                ref={imgRef}
                key={src}
                onLoad={onLoad}
                className={imgAppearClass}
                width={layoutWidth}
                height={layoutHeight}
                src={src}
                srcSet={srcSet}
            />
        </div>
    );
});
