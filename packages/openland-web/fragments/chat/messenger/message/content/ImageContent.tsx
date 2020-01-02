import * as React from 'react';
import { css, cx } from 'linaria';
import {
    FullMessage_GeneralMessage_attachments_MessageAttachmentFile,
    UserShort,
} from 'openland-api/Types';
import { layoutMedia, uploadcareOptions } from 'openland-y-utils/MediaLayout';
import { showChatPicker } from 'openland-web/fragments/chat/showChatPicker';
import { showModalBox } from 'openland-x/showModalBox';
import { UIcon } from 'openland-web/components/unicorn/UIcon';
import IcDownload from 'openland-icons/s/ic-download-24.svg';
import IcForward from 'openland-icons/s/ic-forward-24.svg';
import IcClose from 'openland-icons/s/ic-close-24.svg';
import { formatDateTime } from 'openland-y-utils/formatTime';
import { TextCaption } from 'openland-web/utils/TextStyles';
import { XLoader } from 'openland-x/XLoader';
import { MessengerContext } from 'openland-engines/MessengerEngine';
import { ImgWithRetry } from 'openland-web/components/ImgWithRetry';

const modalImgContainer = css`
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

const imgContainer = css`
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 72px;
    min-width: 72px;
    max-width: 100%;
    // max-height: 600px;
    overflow: hidden;
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

const imgPreviewHiddenClass = css`
    opacity: 0;
`;

const imgAppearClass = css`
    opacity: 0;
    background-color: var(--backgroundPrimary);
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
`;

const imgAppearInstantClass = css`
    opacity: 1;
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

interface ModalProps {
    fileId: string;
    src: string;
    srcSet: string;
    width: number;
    height: number;
    preview?: string | null;
    sender?: UserShort;
    senderNameEmojify?: string | JSX.Element;
    date?: number;
}

const ModalContent = React.memo((props: ModalProps & { hide: () => void }) => {
    const messenger = React.useContext(MessengerContext);
    const imgRef = React.useRef<HTMLImageElement>(null);
    const loaderRef = React.useRef<HTMLDivElement>(null);
    const renderTime = new Date().getTime();

    const onLoad = React.useCallback(() => {
        let delta = new Date().getTime() - renderTime;
        if (imgRef.current && loaderRef.current) {
            if (delta < 50) {
                // show image instantly if loaded fast enough
                imgRef.current.classList.add(imgAppearInstantClass);
                loaderRef.current.style.opacity = '0';
            } else {
                // animate loaded via transition
                imgRef.current.style.opacity = '1';
                loaderRef.current.style.opacity = '0';
            }
        }
    }, []);

    const forwardCallback = React.useCallback(() => {
        showChatPicker((id: string) => {
            messenger.sender.shareFile(id, props.fileId);
        });
    }, []);

    return (
        <div className={modalImgContainer} onClick={props.hide}>
            <div className={modalToolbarContainer}>
                {(props.sender || props.senderNameEmojify) &&
                    props.date && (
                        <div className={modalInfoContainer}>
                            <div className={cx(TextCaption, modalSecondaryText)}>
                                {props.senderNameEmojify || (props.sender ? props.sender!!.name : '')}
                            </div>
                            <div className={cx(TextCaption, modalSecondaryText)}>
                                {formatDateTime(props.date)}
                            </div>
                        </div>
                    )}
                <div className={modalButtonsContainer} onClick={e => e.stopPropagation()}>
                    <a
                        className={modalButtonStyle}
                        href={
                            'https://ucarecdn.com/' +
                            props.fileId +
                            '/-/format/jpg/-/inline/no/pic.jpg'
                        }
                    >
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
            <div className={modalImgContent} style={{ maxWidth: props.width }}>
                <div
                    className={imgSpacer}
                    style={
                        {
                            width: props.width,
                            maxWidth: '100%',
                            margin: 'auto',
                            '--ratio': (props.height / props.width) * 100 + '%',
                        } as React.CSSProperties
                    }
                />
                {props.preview && (
                    <img
                        className={imgPreviewClass}
                        src={props.preview}
                        width={props.width}
                        height={props.height}
                        style={{ cursor: 'default' }}
                    />
                )}
                <XLoader loading={true} transparentBackground={true} ref={loaderRef} />
                <ImgWithRetry
                    ref={imgRef}
                    onLoad={onLoad}
                    src={props.src}
                    srcSet={props.srcSet}
                    className={imgAppearClass}
                    width={props.width}
                    height={props.height}
                    style={{ objectFit: 'contain', cursor: 'default' }}
                />
            </div>
        </div>
    );
});

export const showImageModal = (props: ModalProps) => {
    showModalBox({ fullScreen: true, darkOverlay: true, useTopCloser: false }, ctx => (
        <ModalContent {...props} hide={ctx.hide} />
    ));
};

const GifContent = React.memo(
    (props: { file: FullMessage_GeneralMessage_attachments_MessageAttachmentFile }) => {
        const gifRef = React.useRef<HTMLVideoElement>(null);
        const loaderRef = React.useRef<HTMLDivElement>(null);
        const renderTime = new Date().getTime();
        const onLoad = React.useCallback(() => {
            let delta = new Date().getTime() - renderTime;
            if (gifRef.current && loaderRef.current) {
                if (delta < 50) {
                    // show image instantly if loaded fast enough
                    gifRef.current.classList.add(imgAppearInstantClass);
                    loaderRef.current.style.opacity = '0';
                } else {
                    // animate loaded via transition
                    gifRef.current.style.opacity = '1';
                    loaderRef.current.style.opacity = '0';
                }
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
                <XLoader transparentBackground={true} ref={loaderRef} loading={true} />
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
}

export const ImageContent = React.memo((props: ImageContentProps) => {
    if (props.file.fileMetadata.imageFormat === 'GIF') {
        return <GifContent file={props.file} />;
    }

    const imgRef = React.useRef<HTMLImageElement>(null);
    const imgPrevRef = React.useRef<HTMLImageElement>(null);
    const loaderRef = React.useRef<HTMLDivElement>(null);
    const renderTime = new Date().getTime();

    const onLoad = React.useCallback(() => {
        let delta = new Date().getTime() - renderTime;
        if (imgRef.current && imgPrevRef.current && loaderRef.current) {
            if (delta < 50) {
                // show image instantly if loaded fast enough
                imgRef.current.classList.add(imgAppearInstantClass);
                imgPrevRef.current.classList.add(imgPreviewHiddenClass);
                loaderRef.current.style.opacity = '0';
            } else {
                // animate loaded via transition
                imgRef.current.style.opacity = '1';
                imgPrevRef.current.style.opacity = '0';
                loaderRef.current.style.opacity = '0';
            }
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

    const layoutModal = layoutMedia(
        props.file.fileMetadata.imageWidth || 0,
        props.file.fileMetadata.imageHeight || 0,
        window.innerWidth,
        window.innerHeight,
        32,
        32,
    );

    let modalOps = uploadcareOptions(layoutModal);
    return (
        <div
            className={imgContainer}
            style={{ width: layoutWidth }}
            onClick={(e: React.MouseEvent) => {
                e.stopPropagation();
                showImageModal({
                    fileId: props.file.fileId,
                    src: url + modalOps[0],
                    srcSet: url + modalOps[1],
                    width: layoutModal.width,
                    height: layoutModal.height,
                    preview: props.file.filePreview,
                    sender: props.sender,
                    senderNameEmojify: props.senderNameEmojify,
                    date: props.date,
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
