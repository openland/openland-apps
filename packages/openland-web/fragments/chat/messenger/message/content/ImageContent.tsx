import * as React from 'react';
import { FullMessage_GeneralMessage_attachments_MessageAttachmentFile } from 'openland-api/Types';
import { layoutMedia } from 'openland-web/utils/MediaLayout';
import { showModalBox } from 'openland-x/showModalBox';
import { css } from 'linaria';

const modalImgContainer = css`
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
`;

const modalImgContent = css`
    position: relative;
    max-width: 95vw;
    flex-grow: 1;
    flex-shrink: 1;
`;

const imgContainer = css`
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 72px;
    min-width: 72px;
    max-width: 100%;
    max-height: 600px;
    overflow: hidden;
    border-radius: 8px;
    background-color: #f0f2f5;
    z-index: 0;
    cursor: pointer;

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
    max-width: 100%;
    max-height: 100%;
    z-index: 0;
`;

const imgAppearClass = css`
    opacity: 0;
    background-color: var(--backgroundPrimary);
    transition: opacity 150ms cubic-bezier(0.4, 0, 0.2, 1);
    position: absolute;
    max-width: 100%;
    max-height: 100%;
    height: auto;
    will-change: opacity;
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
    src: string;
    srcSet: string;
    width: number;
    height: number;
    preview: string;
}

const ModalContent = React.memo((props: ModalProps & { hide: () => void }) => {
    const imgRef = React.useRef<HTMLImageElement>(null);
    const renderTime = new Date().getTime();

    const onLoad = React.useCallback(() => {
        let delta = new Date().getTime() - renderTime;
        if (imgRef.current) {
            if (delta < 50) {
                // show image instantly if loaded fast enough
                imgRef.current.classList.add(imgAppearInstantClass);
            } else {
                // animate loaded via transition
                imgRef.current.style.opacity = '1';
            }
        }
    }, []);

    return (
        <div className={modalImgContainer} onClick={props.hide}>
            <div className={modalImgContent}>
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
                <img
                    className={imgPreviewClass}
                    src={props.preview}
                    style={{
                        width: props.width,
                        height: props.height,
                        top: 0,
                        left: 0,
                        right: 0,
                        margin: 'auto',
                    }}
                />
                <img
                    ref={imgRef}
                    onLoad={onLoad}
                    src={props.src}
                    srcSet={props.srcSet}
                    className={imgAppearClass}
                    style={{
                        width: props.width,
                        height: props.height,
                        top: 0,
                        left: 0,
                        right: 0,
                        margin: 'auto',
                    }}
                />
            </div>
        </div>
    );
});

const showImageModal = (props: ModalProps) => {
    showModalBox({ fullScreen: true, darkOverlay: true, useTopCloser: false }, ctx => (
        <ModalContent {...props} hide={ctx.hide} />
    ));
};

const GifContent = React.memo(
    (props: { file: FullMessage_GeneralMessage_attachments_MessageAttachmentFile }) => {
        const gifRef = React.useRef<HTMLVideoElement>(null);
        const renderTime = new Date().getTime();
        const onLoad = React.useCallback(() => {
            let delta = new Date().getTime() - renderTime;
            if (gifRef.current) {
                if (delta < 50) {
                    // show image instantly if loaded fast enough
                    gifRef.current.classList.add(imgAppearInstantClass);
                } else {
                    // animate loaded via transition
                    gifRef.current.style.opacity = '1';
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

export const ImageContent = React.memo(
    (props: { file: FullMessage_GeneralMessage_attachments_MessageAttachmentFile }) => {
        if (props.file.fileMetadata.imageFormat === 'GIF') {
            return <GifContent file={props.file} />;
        }

        const imgRef = React.useRef<HTMLImageElement>(null);
        const renderTime = new Date().getTime();

        const onLoad = React.useCallback(() => {
            let delta = new Date().getTime() - renderTime;
            if (imgRef.current) {
                if (delta < 50) {
                    // show image instantly if loaded fast enough
                    imgRef.current.classList.add(imgAppearInstantClass);
                } else {
                    // animate loaded via transition
                    imgRef.current.style.opacity = '1';
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

        const url = `https://ucarecdn.com/${props.file.fileId}/-/format/auto/-/`;
        const ops = `scale_crop/${layoutWidth}x${layoutHeight}/`;
        const opsRetina = `scale_crop/${layoutWidth * 2}x${layoutHeight * 2}/center/ 2x`;

        const layoutModal = layoutMedia(
            props.file.fileMetadata.imageWidth || 0,
            props.file.fileMetadata.imageHeight || 0,
            (window.innerWidth / 100) * 80,
            (window.innerHeight / 100) * 80,
            32,
            32,
        );

        const opsModal = `scale_crop/${layoutModal.width}x${layoutModal.height}/`;
        const opsRetinaModal = `scale_crop/${layoutModal.width * 2}x${layoutModal.height *
            2}/center/ 2x`;

        return (
            <div
                className={imgContainer}
                style={{ width: layoutWidth }}
                onClick={(e: React.MouseEvent) => {
                    e.stopPropagation();
                    showImageModal({
                        src: url + opsModal,
                        srcSet: url + opsRetinaModal,
                        width: layoutModal.width,
                        height: layoutModal.height,
                        preview: props.file.filePreview || '',
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
                <img
                    className={imgPreviewClass}
                    width={layoutWidth}
                    height={layoutHeight}
                    src={props.file.filePreview || undefined}
                    style={{ top: imgPositionTop, left: imgPositionLeft }}
                />
                <img
                    ref={imgRef}
                    onLoad={onLoad}
                    className={imgAppearClass}
                    width={layoutWidth}
                    height={layoutHeight}
                    src={url + ops}
                    srcSet={url + opsRetina}
                    style={{ top: imgPositionTop, left: imgPositionLeft }}
                />
            </div>
        );
    },
);
